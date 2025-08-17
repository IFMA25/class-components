/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    domains: ['flagcdn.com', 'rs.school'],
    unoptimized: true,
  },
};

export default nextConfig;
