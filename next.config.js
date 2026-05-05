/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages deployment
  output: 'export',
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  // Allow dev server access from network
  allowedDevOrigins: ['172.20.20.20'],
  // Disable API routes for static export
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
