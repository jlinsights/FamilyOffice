/** @type {import('next').NextConfig} */
// const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // 개발 성능 최적화
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      'recharts',
      '@clerk/nextjs',
      '@supabase/supabase-js',
      'framer-motion',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'clsx',
      'class-variance-authority',
      'tailwind-merge'
    ],
    // Enable server components optimization
    serverComponentsExternalPackages: ['@clerk/nextjs', '@supabase/supabase-js'],
    // Better tree shaking
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint validation during builds
  },
  typescript: {
    ignoreBuildErrors: false,  // Enable TypeScript error checking during builds
  },

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['familyoffices.vip', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'familyoffices.vip',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 실험적 기능 제거 (안정성을 위해)
  // experimental: {
  //   optimizeCss: true,
  // },

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 성능 설정
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,
  
  // 정적 자산 경로 설정
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : undefined,

  // 웹팩 설정 최적화
  webpack: (config, { dev, isServer }) => {
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
      };
    }

    // Suppress punycode deprecation warnings
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Can't resolve 'punycode'/,
      { module: /node_modules\/punycode/ },
    ];

    // Optimize chunk splitting with granular vendor splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Split out React and related packages
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          // Split out UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 15,
          },
          // Split out Clerk
          clerk: {
            test: /[\\/]node_modules[\\/]@clerk[\\/]/,
            name: 'clerk',
            chunks: 'async',
            priority: 18,
          },
          // Split out Supabase
          supabase: {
            test: /[\\/]node_modules[\\/]@supabase[\\/]/,
            name: 'supabase',
            chunks: 'async',
            priority: 17,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // 환경 변수
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
    // Vercel Toolbar 비활성화
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_FLAGS_vercel_toolbar: 'false',
    VERCEL_TOOLBAR: 'false',
  },

  // Vercel Toolbar 완전 비활성화
  experimental: {
    ...nextConfig.experimental,
    // Vercel Toolbar 제거
    webpackBuildWorker: true,
  },

  // Output 설정 제거 (빌드 시간 단축)
  // output: 'standalone',
  
  // 도메인 리다이렉트 및 HTTPS 강제
  async redirects() {
    return [
      // /blog를 /insights/market-intelligence로 301 리다이렉트
      {
        source: '/blog',
        destination: '/insights/market-intelligence',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/market-intelligence/:slug',
        permanent: true,
      },
      // 기존 도메인에서 새 도메인으로 301 리다이렉트
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'samsunglife.vip',
          },
        ],
        destination: 'https://familyoffices.vip/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.samsunglife.vip',
          },
        ],
        destination: 'https://www.familyoffices.vip/:path*',
        permanent: true,
      },
      // HTTPS 강제 리다이렉트
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: '(?!https).*',
          },
        ],
        destination: 'https://familyoffices.vip/:path*',
        permanent: true,
      },
      // 🔄 중복 페이지 통합 리다이렉트 
      {
        source: '/inheritance-gift',
        destination: '/inheritance-gift-tax',
        permanent: true,
      },
      {
        source: '/estate-planning',
        destination: '/inheritance-gift-tax',
        permanent: true,
      },
      {
        source: '/business-succession',
        destination: '/business-succession-strategy',
        permanent: true,
      },
      {
        source: '/tax-planning',
        destination: '/tax-strategy',
        permanent: true,
      },
      {
        source: '/family-office',
        destination: '/family-office-center',
        permanent: true,
      },
      {
        source: '/labor-management',
        destination: '/hr-labor-management',
        permanent: true,
      },
    ];
  },

  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://js.hs-scripts.com https://forms.hubspot.com https://app.cal.com https://cal.com 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://js.hs-scripts.com https://forms.hubspot.com https://api.github.com https://vitals.vercel-insights.com; frame-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://app.cal.com https://cal.com https://js.stripe.com https://checkout.stripe.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://familyoffices.vip'
          },
        ],
      },
    ];
  },
};

// Sentry 설정 비활성화 (배포 안정성을 위해)
export default withBundleAnalyzer(nextConfig);
