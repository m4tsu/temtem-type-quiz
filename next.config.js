/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'temtem-api.mael.tech',
        pathname: '/images/portraits/temtem/**',
      },
    ],
  },
}

module.exports = nextConfig
