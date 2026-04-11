/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Set basePath if deploying to a sub-path e.g. /osrs-leagues-guide
  // basePath: '/osrs-leagues-guide',
};

export default nextConfig;
