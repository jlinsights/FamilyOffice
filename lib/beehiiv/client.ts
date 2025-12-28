// Beehiiv API Client for Newsletter Integration
// https://newsletter.familyoffices.vip - 매주 월요일 오전 7:30, 금요일 오전 7:30 발송

interface BeehiivConfig {
  apiKey: string;
  publicationId: string;
  baseUrl: string;
}

interface BeehiivSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  customFields?: Record<string, any>;
  tags?: string[];
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  referrer?: string;
}

export class BeehiivClient {
  private config: BeehiivConfig;

  constructor(config: BeehiivConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl || 'https://api.beehiiv.com/v2',
      apiKey: process.env.BEEHIIV_API_KEY! || config.apiKey,
      publicationId:
        process.env.BEEHIIV_PUBLICATION_ID! || config.publicationId,
    };
  }

  // 구독자 추가
  async addSubscriber(subscriber: BeehiivSubscriber): Promise<any> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/subscriptions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: subscriber.email,
            reactivate_existing: true,
            send_welcome_email: true,
            custom_fields: subscriber.customFields || {},
            tags: subscriber.tags || ['blog-reader'],
            utm_source: subscriber.utmSource || 'familyoffice-blog',
            utm_campaign: subscriber.utmCampaign || 'blog-subscription',
            utm_medium: subscriber.utmMedium || 'website',
            referring_site:
              subscriber.referrer || 'https://familyoffices.vercel.app/blog',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Beehiiv API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding subscriber to Beehiiv:', error);
      throw error;
    }
  }

  // 구독자 확인
  async checkSubscriber(email: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/subscriptions?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.data && data.data.length > 0;
    } catch (error) {
      console.error('Error checking subscriber:', error);
      return false;
    }
  }

  // 구독자 태그 업데이트 (블로그 읽기 행동 추적)
  async updateSubscriberTags(email: string, tags: string[]): Promise<any> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/subscriptions`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            tags,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Beehiiv API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating subscriber tags:', error);
      throw error;
    }
  }

  // 최근 뉴스레터 가져오기
  async getRecentPosts(limit: number = 5): Promise<any> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/posts?status=published&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Beehiiv API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw error;
    }
  }

  // Webhook 이벤트 검증
  verifyWebhook(signature: string, body: string): boolean {
    // Beehiiv webhook signature verification logic
    // Implementation depends on Beehiiv's specific signature method
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.BEEHIIV_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    return signature === expectedSignature;
  }

  // 구독자 통계 가져오기
  async getSubscriberStats(): Promise<any> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/stats`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Beehiiv API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriber stats:', error);
      throw error;
    }
  }

  // ==========================================
  // Email Automation Methods (Week 5-8)
  // ==========================================

  /**
   * Start email automation sequence for lead nurturing
   * @param email - Subscriber email
   * @param automationId - Beehiiv automation ID (defaults to env variable)
   */
  async startAutomation(email: string, automationId?: string): Promise<any> {
    const autoId = automationId || process.env.BEEHIIV_AUTOMATION_ID;

    if (!autoId) {
      throw new Error('BEEHIIV_AUTOMATION_ID not configured');
    }

    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/automations/${autoId}/subscribers`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            start_immediately: true,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to start automation: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error starting automation:', error);
      throw error;
    }
  }

  /**
   * Add subscriber with calculator-specific data
   * Enhanced version for inheritance tax calculator leads
   */
  async addCalculatorLead(data: {
    email: string;
    name?: string | undefined;
    totalAssets: number;
    estimatedTax: number;
    hasSpouse: boolean;
    numChildren: number;
    source: string;
    utm?: {
      source?: string;
      medium?: string;
      campaign?: string;
      content?: string;
    } | undefined;
  }): Promise<any> {
    try {
      // Determine asset size tag
      const assetTag =
        data.totalAssets < 1_000_000_000
          ? 'asset_under_10b'
          : data.totalAssets < 5_000_000_000
            ? 'asset_10b_50b'
            : 'asset_over_50b';

      // Determine value tier
      const valueTier =
        data.estimatedTax < 500_000_000
          ? 'value_standard'
          : data.estimatedTax < 2_000_000_000
            ? 'value_high'
            : 'value_premium';

      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/subscriptions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            reactivate_existing: false,
            send_welcome_email: true,
            custom_fields: {
              total_assets: data.totalAssets.toString(),
              estimated_tax: data.estimatedTax.toString(),
              has_spouse: data.hasSpouse ? 'yes' : 'no',
              num_children: data.numChildren.toString(),
              lead_source: data.source,
            },
            tags: [
              'calculator_user',
              assetTag,
              valueTier,
              'week1_started',
            ],
            utm_source: data.utm?.source || 'calculator',
            utm_medium: data.utm?.medium || 'website',
            utm_campaign: data.utm?.campaign || 'inheritance_tax',
            referring_site: 'https://familyoffices.vip/calculators/inheritance-tax',
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add calculator lead: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding calculator lead:', error);
      throw error;
    }
  }

  /**
   * Get subscriber by email (returns subscription details)
   */
  async getSubscriber(email: string): Promise<any | null> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/subscriptions?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.data && data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error('Error getting subscriber:', error);
      return null;
    }
  }

  /**
   * Unsubscribe a user
   */
  async unsubscribeUser(subscriptionId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/publications/${this.config.publicationId}/subscriptions/${subscriptionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to unsubscribe: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error unsubscribing user:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const beehiiv = new BeehiivClient({
  apiKey: process.env.BEEHIIV_API_KEY!,
  publicationId: process.env.BEEHIIV_PUBLICATION_ID!,
  baseUrl: 'https://api.beehiiv.com/v2',
});
