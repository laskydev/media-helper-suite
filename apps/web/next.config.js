/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pdfcraft/ui', '@pdfcraft/types', '@pdfcraft/pdf-engine'],

  // Optimize for production
  swcMinify: true,

  // Configure output (default for Vercel)
  output: 'standalone',

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'PDFCraft',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@pdfcraft/ui', '@pdfcraft/pdf-engine'],
  },
};

module.exports = nextConfig;
