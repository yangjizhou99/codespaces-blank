import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUTDIR = 'artifacts';
fs.mkdirSync(OUTDIR, { recursive: true });

const ports = [3001];
const name = process.env.CODESPACE_NAME;
function previewUrl(port) {
  // Always use localhost in Codespaces
  return `http://localhost:${port}`;
}

async function probe() {
  for (const p of ports) {
    const url = previewUrl(p);
    // Try multiple times with delay and better error handling
    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Accept': 'text/html' },
          timeout: 5000
        });
        if (res.ok) return { port: p, url };
      } catch (e) {
        console.log(`Attempt ${i+1}: ${e.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  console.error(`Failed to connect to server after multiple attempts`);
  return null;
}

(async () => {
  const target = await probe();
  if (!target) {
    console.error('No dev server detected on port 3000');
    process.exit(2);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const logs = [];
  page.on('console', m => logs.push(`[console:${m.type()}] ${m.text()}`));
  page.on('requestfailed', r => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));

  try {
    await page.goto(target.url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // Verify page loaded successfully
    const title = await page.title();
    if (!title || title.includes('Error')) {
      logs.push('[check] Page failed to load properly');
    }

    const logPath = path.join(OUTDIR, `smoke-${Date.now()}.log`);
    fs.writeFileSync(logPath, logs.join('\n'), 'utf8');

    // Only fail on actual errors (ignore info/debug logs)
    const errorLogs = logs.filter(log => 
      log.includes('[pageerror]') || 
      log.includes('[requestfailed]') ||
      log.includes('[check]')
    );
    
    if (errorLogs.length > 0) {
      console.error(`Smoke issues found. See ${logPath}`);
      process.exit(1);
    }
    console.log(`Smoke passed. See ${logPath}`);
  } catch (e) {
    console.error(`Test failed: ${e.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
