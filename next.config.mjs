/** @type {import('next').NextConfig} */
// Static export is only enabled for GitHub Pages builds (NEXT_PUBLIC_BASE_PATH is set).
// Local dev omits it so that API routes (e.g. /api/bake-edits) work.
const isPagesBuild = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig = {
  ...(isPagesBuild ? { output: 'export' } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
