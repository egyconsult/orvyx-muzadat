/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel-safe: no experimental، webpack stable
  swcMinify: true,
  transpilePackages: ['@supabase/supabase-js'],
};

module.exports = nextConfig;
