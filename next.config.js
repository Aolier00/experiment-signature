/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // start aplication in a subdomain before localhost
  // subdomain: 'app',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/upload',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
