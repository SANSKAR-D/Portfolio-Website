/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  headers: async () => [
    {
      source: '/:path*.glb',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};

export default nextConfig;
