/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.clerk.accounts.dev *.googletagmanager.com *.google-analytics.com *.hubspot.com js.hs-scripts.com cdn.channel.io *.channel.io app.cal.com *.cal.com embed.typeform.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: blob: *.clerk.accounts.dev",
              "connect-src 'self' *.clerk.accounts.dev *.google-analytics.com *.hubspot.com *.channel.io *.cal.com api.cal.com",
              "frame-src 'self' *.cal.com app.cal.com *.typeform.com",
              "object-src 'none'",
              "base-uri 'self'"
            ].join('; ')
          },
        ],
      },
    ]
  },
}

export default nextConfig
