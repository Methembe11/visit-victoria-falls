/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'visitzimbabwe.b-cdn.net' },
      { protocol: 'https', hostname: '**.visitzimbabwe.com' },
      { protocol: 'https', hostname: 'visitzimbabwe.com' },
      { protocol: 'https', hostname: '**.victoriafalls-guide.net' },
      { protocol: 'https', hostname: '**.victoriafallszimbabwe.org' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
