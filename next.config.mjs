// next.config.mjs
import createMDX from '@next/mdx';

const withMDX = createMDX({
  // 可在此配置 remark/rehype 外掛；MVP 先留空
});

const nextConfig = {
  experimental: { mdxRs: true },
  // pageExtensions 在 App Router 不是必需，但保留兼容
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  compilerOptions: {
    paths: {
      '@/lib': ['src/lib'],
      '@/components': ['src/components'],
      '@/types': ['src/types']
    }
  }
};

export default withMDX(nextConfig);
