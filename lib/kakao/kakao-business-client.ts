/**
 * Kakao Business Client 초기화 서비스
 * 환경변수 기반으로 Kakao Business API 클라이언트를 초기화하고 관리
 */
import {
  KakaoBusinessAPI,
  createKakaoBusinessClient,
  type KakaoBusinessConfig,
} from './business-api';

// Kakao Business 클라이언트 인스턴스
let kakaoClient: KakaoBusinessAPI | null = null;

/**
 * 환경변수에서 Kakao Business 설정을 가져오는 함수
 */
function getKakaoBusinessConfig(): KakaoBusinessConfig | null {
  const config: KakaoBusinessConfig = {
    apiKey: process.env.KAKAO_BUSINESS_API_KEY || '',
    pixelId: process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID || '',
    channelId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || '',
    appKey: process.env.KAKAO_APP_KEY || '',
    restApiKey: process.env.KAKAO_REST_API_KEY || '',
    javascriptKey:
      process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ||
      process.env.KAKAO_JAVASCRIPT_KEY ||
      '',
    ...(process.env.KAKAO_ADMIN_KEY && {
      adminKey: process.env.KAKAO_ADMIN_KEY,
    }),
  };

  // 최소 필수 값들이 있는지 확인
  if (!config.channelId && !config.javascriptKey && !config.appKey) {
    console.warn('Kakao Business: 필수 환경변수가 설정되지 않았습니다.');
    return null;
  }

  return config;
}

/**
 * Kakao Business 클라이언트를 초기화하는 함수
 */
export function initializeKakaoBusinessClient(): KakaoBusinessAPI | null {
  try {
    // 이미 초기화된 클라이언트가 있으면 반환
    if (kakaoClient) {
      return kakaoClient;
    }

    const config = getKakaoBusinessConfig();
    if (!config) {
      return null;
    }

    // 새 클라이언트 생성
    kakaoClient = createKakaoBusinessClient(config);

    // 설정 검증
    if (!kakaoClient.validateConfig()) {
      console.warn('Kakao Business: 클라이언트 설정이 불완전합니다.');
    }

    console.log('✅ Kakao Business 클라이언트가 성공적으로 초기화되었습니다.');
    return kakaoClient;
  } catch (error) {
    console.error('❌ Kakao Business 클라이언트 초기화 실패:', error);
    return null;
  }
}

/**
 * 초기화된 Kakao Business 클라이언트를 가져오는 함수
 */
export function getKakaoBusinessClient(): KakaoBusinessAPI | null {
  if (!kakaoClient) {
    return initializeKakaoBusinessClient();
  }

  return kakaoClient;
}

/**
 * Kakao Business 서비스 상태를 확인하는 함수
 */
export function checkKakaoBusinessStatus(): {
  isConfigured: boolean;
  hasApiKey: boolean;
  hasPixelId: boolean;
  hasChannelId: boolean;
  hasJavaScriptKey: boolean;
  hasAppKey: boolean;
  hasRestApiKey: boolean;
  isClientReady: boolean;
} {
  const config = getKakaoBusinessConfig();
  const client = getKakaoBusinessClient();

  return {
    isConfigured: !!config,
    hasApiKey: !!config?.apiKey,
    hasPixelId: !!config?.pixelId,
    hasChannelId: !!config?.channelId,
    hasJavaScriptKey: !!config?.javascriptKey,
    hasAppKey: !!config?.appKey,
    hasRestApiKey: !!config?.restApiKey,
    isClientReady: !!client && client.validateConfig(),
  };
}

/**
 * 개발 환경에서 Kakao Business 설정 정보를 출력하는 함수
 */
export function debugKakaoBusinessConfig() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const status = checkKakaoBusinessStatus();
  console.log('🔍 Kakao Business 설정 상태:');
  console.log(`  - 설정 완료: ${status.isConfigured ? '✅' : '❌'}`);
  console.log(`  - API Key: ${status.hasApiKey ? '✅' : '❌'}`);
  console.log(`  - Pixel ID: ${status.hasPixelId ? '✅' : '❌'}`);
  console.log(`  - Channel ID: ${status.hasChannelId ? '✅' : '❌'}`);
  console.log(`  - JavaScript Key: ${status.hasJavaScriptKey ? '✅' : '❌'}`);
  console.log(`  - App Key: ${status.hasAppKey ? '✅' : '❌'}`);
  console.log(`  - REST API Key: ${status.hasRestApiKey ? '✅' : '❌'}`);
  console.log(`  - 클라이언트 준비: ${status.isClientReady ? '✅' : '❌'}`);

  const config = getKakaoBusinessConfig();
  if (config) {
    console.log('📝 Kakao Business 환경변수:');
    console.log(
      `  - KAKAO_BUSINESS_API_KEY: ${config.apiKey ? `${config.apiKey.substring(0, 10)}...` : 'N/A'}`
    );
    console.log(`  - NEXT_PUBLIC_KAKAO_PIXEL_ID: ${config.pixelId || 'N/A'}`);
    console.log(
      `  - NEXT_PUBLIC_KAKAO_CHANNEL_ID: ${config.channelId || 'N/A'}`
    );
    console.log(
      `  - KAKAO_APP_KEY: ${config.appKey ? `${config.appKey.substring(0, 10)}...` : 'N/A'}`
    );
    console.log(
      `  - KAKAO_REST_API_KEY: ${config.restApiKey ? `${config.restApiKey.substring(0, 10)}...` : 'N/A'}`
    );
    console.log(
      `  - KAKAO_JAVASCRIPT_KEY: ${config.javascriptKey ? `${config.javascriptKey.substring(0, 10)}...` : 'N/A'}`
    );
    console.log(
      `  - KAKAO_ADMIN_KEY: ${config.adminKey ? `${config.adminKey.substring(0, 10)}...` : 'N/A'}`
    );
  }
}

/**
 * Kakao Business API 간편 사용을 위한 헬퍼 함수들
 */
export const kakaoBusinessHelpers = {
  /**
   * 캠페인 성과를 가져오는 헬퍼 함수
   */
  async getCampaignPerformance(dateRange: { start: string; end: string }) {
    const client = getKakaoBusinessClient();
    if (!client) {
      console.warn('Kakao Business 클라이언트가 초기화되지 않았습니다.');
      return null;
    }

    try {
      return await client.getAnalytics({
        dateRange,
        metrics: [
          'impressions',
          'clicks',
          'conversions',
          'cost',
          'ctr',
          'cpc',
          'roas',
        ],
        dimensions: ['campaign'],
      });
    } catch (error) {
      console.error('캠페인 성과 조회 실패:', error);
      return null;
    }
  },

  /**
   * 전환 이벤트를 추적하는 헬퍼 함수
   */
  async trackConversion(
    eventName: 'Contact' | 'Lead' | 'Purchase' | 'CompleteRegistration',
    params: {
      userId?: string;
      sessionId: string;
      value?: number;
      contentCategory?: string;
      contentIds?: string[];
    }
  ) {
    const client = getKakaoBusinessClient();
    if (!client) {
      console.warn('Kakao Business 클라이언트가 초기화되지 않았습니다.');
      return false;
    }

    try {
      if (!params.userId) {
        console.warn('userId가 필요합니다.');
        return false;
      }

      await client.trackConversion({
        eventName,
        userId: params.userId,
        sessionId: params.sessionId,
        parameters: {
          ...(params.contentCategory && {
            content_category: params.contentCategory as any,
          }),
          ...(params.contentIds && { content_ids: params.contentIds }),
          ...(params.value !== undefined && { value: params.value }),
          currency: 'KRW',
          page_url: window.location.href,
          ...(document.referrer && { referrer: document.referrer }),
          user_agent: navigator.userAgent,
        },
        timestamp: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error('전환 추적 실패:', error);
      return false;
    }
  },

  /**
   * 메시지 템플릿을 생성하는 헬퍼 함수
   */
  async createMessageTemplate(template: {
    type: 'alimtalk' | 'friendtalk';
    title: string;
    content: string;
    variables?: string[];
    buttons?: Array<{
      type: 'url' | 'phone' | 'app';
      title: string;
      value: string;
    }>;
  }) {
    const client = getKakaoBusinessClient();
    if (!client) {
      console.warn('Kakao Business 클라이언트가 초기화되지 않았습니다.');
      return null;
    }

    try {
      return await client.createMessageTemplate({
        ...template,
        variables: template.variables || [],
        status: 'draft',
      });
    } catch (error) {
      console.error('메시지 템플릿 생성 실패:', error);
      return null;
    }
  },
};

// 개발 환경에서 자동으로 설정 정보 출력
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  // 서버 사이드에서만 실행
  setTimeout(() => {
    debugKakaoBusinessConfig();
  }, 1000);
}
