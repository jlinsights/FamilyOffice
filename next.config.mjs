/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // 이미지 최적화 강화
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30일 캐시
  },
  
  // 실험적 기능 확장
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
    optimizeServerReact: true,
    memoryBasedWorkersCount: true,
  },
  
  // 서버 외부 패키지
  serverExternalPackages: ['@clerk/nextjs'],
  
  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 성능 설정
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,
  
  // 웹팩 설정 최적화
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
        })
      )
    }

    // Tree shaking 최적화 (Next.js 15.2.4+ 호환)
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      }
    }

    // 청크 분할 최적화
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Framework 청크
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // UI 라이브러리 청크
          ui: {
            name: 'ui-lib',
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/,
            priority: 30,
            enforce: true,
          },
          // 인증 청크
          auth: {
            name: 'auth-lib',
            test: /[\\/]node_modules[\\/](@clerk)[\\/]/,
            priority: 25,
            enforce: true,
          },
          // 차트 라이브러리
          charts: {
            name: 'charts-lib',
            test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
            priority: 20,
            enforce: true,
          },
          // 외부 라이브러리
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
          },
          // 공통 컴포넌트
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }

    return config
  },
  
  // 캐싱 및 보안 헤더 강화
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 보안 헤더
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
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
      // 정적 자산 캐싱
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // API 응답 캐싱
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600'
          }
        ]
      }
    ]
  },
  
  // Force dynamic rendering globally
  output: 'standalone',
  
  // 환경 변수
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },
  
  // Global dynamic rendering configuration
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
    optimizeServerReact: true,
    memoryBasedWorkersCount: true,
  },
}

export default nextConfig
