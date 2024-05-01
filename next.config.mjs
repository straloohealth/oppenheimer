/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  headers () {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
