/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
    ],
  },
  experimental: {
    // This ensures certain pages are client-side rendered
    runtime: 'nodejs',
    serverComponents: true,
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    // Ensure proper module resolution
    config.resolve.modules.push(__dirname)
    return config
  },
}

module.exports = nextConfig