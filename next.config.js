/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
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
