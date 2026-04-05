/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'hctg-images.imgix.net' },
            { protocol: 'https', hostname: 'theriverslodge.com' },
      { protocol: 'https', hostname: 'imagedelivery.net' },
    ],
  },
}

export default nextConfig
