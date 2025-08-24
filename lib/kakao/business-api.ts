/**
 * 카카오비즈니스 API 통합 클라이언트
 * 광고, 메시징, 분석 기능을 통합 제공
 */

export interface KakaoBusinessConfig {
  apiKey: string;
  pixelId: string;
  channelId: string;
  appKey: string;
  restApiKey: string;
  javascriptKey: string;
  adminKey?: string;
}

export interface CampaignConfig {
  name: string;
  type: 'display' | 'search' | 'video' | 'retargeting';
  targetAudience: {
    demographics: {
      ageRange: [number, number];
      gender: 'all' | 'male' | 'female';
      location: string[];
    };
    interests: string[];
    behaviors: string[];
  };
  budget: {
    daily: number;
    total: number;
    bidStrategy: 'CPC' | 'CPM' | 'CPA';
  };
  creative: {
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
    landingUrl: string;
  };
  schedule: {
    startDate: string;
    endDate: string;
    timezone: string;
  };
}

export interface ConversionEvent {
  eventName: 'PageView' | 'CompleteRegistration' | 'Contact' | 'Purchase' | 'Lead';
  userId?: string;
  sessionId: string;
  kclid?: string; // Kakao Click ID
  parameters: {
    content_category?: 'consultation' | 'seminar' | 'newsletter' | 'calculator';
    content_ids?: string[];
    value?: number;
    currency?: 'KRW';
    page_url: string;
    referrer?: string;
    user_agent: string;
  };
  timestamp: string;
}

export interface AnalyticsParams {
  dateRange: {
    start: string;
    end: string;
  };
  metrics: ('impressions' | 'clicks' | 'conversions' | 'cost' | 'ctr' | 'cpc' | 'roas')[];
  dimensions?: ('campaign' | 'ad_group' | 'keyword' | 'audience')[];
  filters?: Record<string, any>;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    cpc: number;
    conversionRate: number;
    roas: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  summary: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
    roas: number;
  };
  breakdown: Array<{
    dimension: string;
    value: string;
    metrics: Record<string, number>;
  }>;
  trends: Array<{
    date: string;
    metrics: Record<string, number>;
  }>;
}

export interface AudienceConfig {
  name: string;
  type: 'custom' | 'lookalike' | 'retargeting';
  source: {
    type: 'pixel' | 'customer_list' | 'app_event';
    conditions: Record<string, any>;
  };
  size?: number;
  validityPeriod: number; // days
}

export interface MessagingTemplate {
  id?: string;
  type: 'alimtalk' | 'friendtalk';
  title: string;
  content: string;
  variables: string[];
  buttons?: Array<{
    type: 'url' | 'phone' | 'app';
    title: string;
    value: string;
  }>;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

export class KakaoBusinessAPI {
  private config: KakaoBusinessConfig;
  private baseURL = 'https://apis.business.kakao.com';

  constructor(config: KakaoBusinessConfig) {
    this.config = config;
  }

  // 캠페인 관리
  async createCampaign(campaignConfig: CampaignConfig): Promise<Campaign> {
    try {
      const response = await fetch(`${this.baseURL}/v1/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          ...campaignConfig,
          pixel_id: this.config.pixelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Campaign creation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.campaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const response = await fetch(`${this.baseURL}/v1/campaigns`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch campaigns: ${response.statusText}`);
      }

      const data = await response.json();
      return data.campaigns;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  async updateCampaign(campaignId: string, updates: Partial<CampaignConfig>): Promise<Campaign> {
    try {
      const response = await fetch(`${this.baseURL}/v1/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Campaign update failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.campaign;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }

  // 전환 추적
  async trackConversion(event: ConversionEvent): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/v1/pixel/${this.config.pixelId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          event_name: event.eventName,
          event_time: Math.floor(new Date(event.timestamp).getTime() / 1000),
          user_data: {
            user_id: event.userId,
            session_id: event.sessionId,
          },
          custom_data: event.parameters,
          action_source: 'website',
        }),
      });

      if (!response.ok) {
        throw new Error(`Conversion tracking failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error tracking conversion:', error);
      throw error;
    }
  }

  // 분석 데이터
  async getAnalytics(params: AnalyticsParams): Promise<Analytics> {
    try {
      const queryParams = new URLSearchParams({
        start_date: params.dateRange.start,
        end_date: params.dateRange.end,
        metrics: params.metrics.join(','),
        ...(params.dimensions && { dimensions: params.dimensions.join(',') }),
        ...(params.filters && { filters: JSON.stringify(params.filters) }),
      });

      const response = await fetch(`${this.baseURL}/v1/analytics?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.analytics;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  // 오디언스 관리
  async createAudience(audienceConfig: AudienceConfig): Promise<{ id: string; size: number }> {
    try {
      const response = await fetch(`${this.baseURL}/v1/audiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          ...audienceConfig,
          pixel_id: this.config.pixelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Audience creation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.audience;
    } catch (error) {
      console.error('Error creating audience:', error);
      throw error;
    }
  }

  // 메시징 템플릿
  async createMessageTemplate(template: MessagingTemplate): Promise<MessagingTemplate> {
    try {
      const endpoint = template.type === 'alimtalk' ? 'alimtalk/templates' : 'friendtalk/templates';
      const response = await fetch(`${this.baseURL}/v1/messaging/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          ...template,
          channel_id: this.config.channelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Template creation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.template;
    } catch (error) {
      console.error('Error creating message template:', error);
      throw error;
    }
  }

  async sendMessage(templateId: string, recipient: string, variables: Record<string, string>): Promise<{ messageId: string }> {
    try {
      const response = await fetch(`${this.baseURL}/v1/messaging/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          template_id: templateId,
          recipient,
          variables,
          channel_id: this.config.channelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Message sending failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // 유틸리티 메서드
  generateKclid(campaignId: string, userId?: string): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    return `${campaignId}_${timestamp}_${userId || 'anonymous'}_${randomId}`;
  }

  validateConfig(): boolean {
    const required = ['pixelId', 'channelId', 'appKey', 'restApiKey', 'javascriptKey'];
    return required.every(key => this.config[key as keyof KakaoBusinessConfig]);
  }
}

// 싱글톤 인스턴스 생성
let kakaoBusinessInstance: KakaoBusinessAPI | null = null;

export function createKakaoBusinessClient(config: KakaoBusinessConfig): KakaoBusinessAPI {
  if (!kakaoBusinessInstance) {
    kakaoBusinessInstance = new KakaoBusinessAPI(config);
  }
  return kakaoBusinessInstance;
}

export function getKakaoBusinessClient(): KakaoBusinessAPI {
  if (!kakaoBusinessInstance) {
    throw new Error('Kakao Business client not initialized. Call createKakaoBusinessClient first.');
  }
  return kakaoBusinessInstance;
}

// 타입 내보내기
export type {
  KakaoBusinessConfig,
  CampaignConfig,
  ConversionEvent,
  AnalyticsParams,
  Campaign,
  Analytics,
  AudienceConfig,
  MessagingTemplate,
};