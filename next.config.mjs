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

  // 실험적 기능 확장 (안정성을 위해 일부 비활성화)
  experimental: {
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
  },

  // 서버 외부 패키지 (Clerk 관련 문제 해결) - 임시 비활성화
  // serverExternalPackages: ['@clerk/nextjs', 'yahoo-finance2'],

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 성능 설정
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,

  // 웹팩 설정 최적화 (ChunkLoadError 해결)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // backend 디렉토리 제외 (개발 환경에서는 제거)
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        backend: false,
      };
    }

    // Tree shaking 최적화 (Next.js 15.2.4+ 호환)
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }

    // React Server Components 관련 설정
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        querystringify: false,
        'requires-port': false,
        'punycode/': false,
      };
    }

    // Node.js 전용 모듈들을 클라이언트에서 제외
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'yahoo-finance2': false,
        'node-cache': false,
        fs: false,
        stream: false,
        path: false,
        os: false,
        crypto: false,
      };
    }

    // ChunkLoadError 해결을 위한 청크 분할 최적화
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          // 기본 벤더 청크
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
            chunks: 'all',
          },
          // 공통 컴포넌트
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Clerk 관련 청크
          clerk: {
            name: 'clerk',
            test: /[\\/]node_modules[\\/]@clerk[\\/]/,
            priority: 20,
            enforce: true,
          },
          // UI 컴포넌트 청크
          ui: {
            name: 'ui',
            test: /[\\/]components[\\/]ui[\\/]/,
            priority: 15,
            enforce: true,
          },
        },
      };
    }

    // 청크 로딩 실패 시 재시도 설정
    config.output = {
      ...config.output,
      chunkFilename: dev
        ? 'static/chunks/[name].js'
        : 'static/chunks/[name].[contenthash].js',
    };

    return config;
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
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
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
              "font-src 'self' data:",
              "img-src 'self' data: blob: *.clerk.accounts.dev https:",
              "connect-src 'self' *.clerk.accounts.dev *.google-analytics.com *.hubspot.com *.channel.io *.cal.com api.cal.com wss:",
              "frame-src 'self' *.cal.com app.cal.com *.typeform.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'payment=()',
              'usb=()',
              'screen-wake-lock=()',
              'web-share=()',
            ].join(', '),
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
      // 정적 자산 캐싱
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API 응답 캐싱
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },

  // Force dynamic rendering globally (개발 환경에서는 제거)
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // 환경 변수
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },
};

export default nextConfig;
