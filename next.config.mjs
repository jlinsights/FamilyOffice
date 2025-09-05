/** @type {import('next').NextConfig} */
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
    ],
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

    // Optimize chunk splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
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
  },

  // Output 설정 제거 (빌드 시간 단축)
  // output: 'standalone',
  
  // 도메인 리다이렉트 및 HTTPS 강제
  async redirects() {
    return [
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
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.cal.com https://app.cal.com 'nonce-*'; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://api.beehiiv.com https://api.cal.com https://vitals.vercel-insights.com https://www.google-analytics.com https://api.anthropic.com wss: https:; frame-src https://cal.com https://app.cal.com; object-src 'none'; base-uri 'self'; form-action 'self';"
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

export default withBundleAnalyzer(nextConfig);
