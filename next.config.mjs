import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Externalize packages that use native Node.js APIs or runtime file access
  // jsdom (via isomorphic-dompurify) loads browser/default-stylesheet.css at runtime
  serverExternalPackages: ['isomorphic-dompurify', 'jsdom', 'dompurify'],

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
      'tailwind-merge',
    ],
  },
  // Next.js 16: eslint configuration moved to eslint.config.js
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript validation for production safety
  },

  // Next.js 16: Turbopack configuration (empty config to silence warning)
  turbopack: {},

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Next.js 16: domains deprecated, use remotePatterns instead
    remotePatterns: [
      // Localhost for development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.daumcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.tistory.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.naver.com',
        port: '',
        pathname: '/**',
      },
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
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.beehiiv.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 성능 설정
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,

  // webpack config: suppress optional dependency warnings
  webpack: (config) => {
    // Suppress warnings for optional dependencies
    config.ignoreWarnings = [
      {
        module: /node_modules\/punycode/,
      },
      {
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
      {
        message: /export 'default'.*imported as indirect dependency/,
      },
    ];

    return config;
  },

  // 환경 변수
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
    // Vercel Toolbar 완전 비활성화
    NEXT_PUBLIC_VERCEL_ENV: 'production',
    NEXT_PUBLIC_FLAGS_vercel_toolbar: 'false',
    VERCEL_TOOLBAR: 'false',
    VERCEL_TOOLBAR_ENABLED: 'false',
    FLAGS_vercel_toolbar: 'false',
    DISABLE_VERCEL_TOOLBAR: 'true',
  },

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
      {
        source: '/services',
        destination: '/solutions',
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'development'
                ? "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:; connect-src *; frame-src *; worker-src 'self' blob:;"
                : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com https://*.clerk.services https://frontend-api.clerk.services https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://js.hs-scripts.com https://forms.hubspot.com https://app.cal.com https://cal.com https://t1.kakaocdn.net https://developers.kakao.com https://cdn.channel.io https://js.tosspayments.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.channel.io; img-src 'self' data: blob: https://*.clerk.com https://*.clerk.services https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://fonts.googleapis.com https://img.clerk.com https://lu.ma https://*.lu.ma https://luma.com https://*.luma.com https://images.unsplash.com https://*.pstatic.net https://*.daumcdn.net https://*.kakaocdn.net https://*.tistory.com https://blog.naver.com https://cdn.channel.io https://*.channel.io https://substackcdn.com https://*.tosspayments.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://*.clerk.com https://*.clerk.services https://frontend-api.clerk.services https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://js.hs-scripts.com https://forms.hubspot.com https://api.github.com https://vitals.vercel-insights.com https://cdn.channel.io https://*.channel.io wss://*.channel.io https://*.tosspayments.com; frame-src 'self' data: blob: https://*.clerk.accounts.dev https://*.clerk.com https://*.clerk.services https://www.googletagmanager.com https://www.google-analytics.com https://app.cal.com https://cal.com https://js.stripe.com https://checkout.stripe.com https://www.youtube.com https://open.spotify.com https://lu.ma https://*.lu.ma https://luma.com https://*.luma.com https://*.youtube.com https://*.spotify.com https://cdn.channel.io https://*.channel.io https://*.tosspayments.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://familyoffices.vip',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
