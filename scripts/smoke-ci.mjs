// scripts/smoke-ci.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUTDIR = 'artifacts';
fs.mkdirSync(OUTDIR, { recursive: true });

const ports = [3000, 5173];
const name = process.env.CODESPACE_NAME;
function previewUrl(port) {
  if (name) return `https://${port}-${name}.githubpreview.dev`;
  return `http://localhost:${port}`;
}

async function probe() {
  for (const p of ports) {
    const url = previewUrl(p);
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return { port: p, url };
    } catch {}
  }
  return null;
}

(async () => {
  const target = await probe();
  if (!target) {
    console.error('No dev server detected on 3000/5173');
    process.exit(2);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const logs = [];
  page.on('console', m => logs.push(`[console:${m.type()}] ${m.text()}`));
  page.on('requestfailed', r => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));

  const nav = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => {
    logs.push(`[goto-error] ${e.message}`);
  });

  if (nav) {
    // 简单首屏检查：存在 <body> 且非空
    const bodyText = await page.textContent('body').catch(() => '');
    if (!bodyText || bodyText.trim().length === 0) {
      logs.push('[check] empty body content');
    }
  }

  const logPath = path.join(OUTDIR, `smoke-${Date.now()}.log`);
  fs.writeFileSync(logPath, logs.join('\n'), 'utf8');

  await browser.close();

  const hasError = logs.some(l => /\[(pageerror|requestfailed)\]/.test(l)) || logs.length === 0;
  if (hasError) {
    console.error(`Smoke check found issues. See ${logPath}`);
    process.exit(1);
  } else {
    console.log(`Smoke check passed. See ${logPath}`);
  }
})();
