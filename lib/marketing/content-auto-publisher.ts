/**
 * 콘텐츠 자동 게시 시스템
 * 캘린더 기반 자동 게시, 승인 워크플로우, SEO 메타데이터 자동 설정, 소셜 미디어 연동
 */
import {
    ContentCalendar,
    generateContentCalendar,
} from '@/lib/marketing/inbound-marketing-automation';

export type ContentStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'failed'
  | 'archived';
export type ContentType =
  | 'blog'
  | 'case-study'
  | 'guide'
  | 'whitepaper'
  | 'news'
  | 'tutorial';
export type SocialPlatform = 'twitter' | 'linkedin' | 'facebook' | 'instagram';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: ContentType;
  status: ContentStatus;

  // SEO 메타데이터
  seoMetadata: SEOMetadata;

  // 스케줄링
  scheduledDate?: Date;
  publishedDate?: Date;

  // 승인 워크플로우
  createdBy: string;
  createdAt: Date;
  approvalRequests: ApprovalRequest[];
  approvedBy?: string;
  approvedAt?: Date;

  // 소셜 미디어
  socialPosts: SocialMediaPost[];

  // 태그 & 카테고리
  tags: string[];
  categories: string[];

  // 통계
  views?: number;
  shares?: number;
  engagementRate?: number;

  metadata?: Record<string, unknown>;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
  structuredData?: Record<string, unknown>;
  focusKeyword: string;
  readabilityScore?: number;
  seoScore?: number;
}

export interface ApprovalRequest {
  id: string;
  requestedBy: string;
  requestedAt: Date;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  respondedAt?: Date;
  comments?: string;
}

export interface SocialMediaPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  hashtags: string[];
  scheduledDate?: Date;
  publishedDate?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  postUrl?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  };
}

export interface PublishingConfig {
  autoPublish: boolean;
  requireApproval: boolean;
  approvers: string[];
  notifyOnPublish: boolean;
  notificationEmails: string[];
  socialAutoPost: boolean;
  socialPlatforms: SocialPlatform[];
  seoAutoOptimize: boolean;
}

export interface PublishingResult {
  success: boolean;
  contentId: string;
  publishedUrl?: string;
  socialPosts?: SocialMediaPost[];
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
  publishedAt: Date;
}

/**
 * 콘텐츠 자동 게시 엔진 클래스
 */
export class ContentAutoPublisher {
  private contents: Map<string, ContentItem> = new Map();
  private config: PublishingConfig;

  constructor(config: Partial<PublishingConfig> = {}) {
    this.config = {
      autoPublish: config.autoPublish ?? false,
      requireApproval: config.requireApproval ?? true,
      approvers: config.approvers ?? [],
      notifyOnPublish: config.notifyOnPublish ?? true,
      notificationEmails: config.notificationEmails ?? [],
      socialAutoPost: config.socialAutoPost ?? true,
      socialPlatforms: config.socialPlatforms ?? ['twitter', 'linkedin'],
      seoAutoOptimize: config.seoAutoOptimize ?? true,
    };
  }

  /**
   * 콘텐츠 생성 (드래프트)
   */
  createContent(params: {
    title: string;
    content: string;
    type: ContentType;
    createdBy: string;
    scheduledDate?: Date;
    tags?: string[];
    categories?: string[];
  }): ContentItem {
    const slug = this.generateSlug(params.title);
    const seoMetadata = this.autoGenerateSEOMetadata({
      title: params.title,
      content: params.content,
      slug,
    });

    const content: ContentItem = {
      id: this.generateContentId(),
      title: params.title,
      slug,
      content: params.content,
      excerpt: this.generateExcerpt(params.content),
      type: params.type,
      status: 'draft',
      seoMetadata,
      createdBy: params.createdBy,
      createdAt: new Date(),
      approvalRequests: [],
      socialPosts: [],
      tags: params.tags || [],
      categories: params.categories || [],
    };

    // Conditionally add optional property
    if (params.scheduledDate !== undefined) {
      content.scheduledDate = params.scheduledDate;
    }

    this.contents.set(content.id, content);

    console.log(
      `[ContentPublisher] Content created: ${content.title} (${content.id})`
    );

    return content;
  }

  /**
   * 승인 요청
   */
  requestApproval(
    contentId: string,
    requestedBy: string,
    approver: string
  ): ApprovalRequest {
    const content = this.contents.get(contentId);
    if (!content) {
      throw new Error(`Content not found: ${contentId}`);
    }

    if (content.status !== 'draft') {
      throw new Error(
        `Content must be in draft status to request approval: ${content.status}`
      );
    }

    const approvalRequest: ApprovalRequest = {
      id: this.generateApprovalId(),
      requestedBy,
      requestedAt: new Date(),
      approver,
      status: 'pending',
    };

    content.approvalRequests.push(approvalRequest);
    content.status = 'pending_approval';
    this.contents.set(contentId, content);

    console.log(
      `[ContentPublisher] Approval requested: ${content.title} → ${approver}`
    );

    // Email notification integration: https://github.com/jlinsights/FamilyOffice/issues/6
    // await this.sendApprovalNotification(approver, content);

    return approvalRequest;
  }

  /**
   * 승인 처리
   */
  approveContent(
    contentId: string,
    approvalRequestId: string,
    approvedBy: string,
    comments?: string
  ): ContentItem {
    const content = this.contents.get(contentId);
    if (!content) {
      throw new Error(`Content not found: ${contentId}`);
    }

    const approvalRequest = content.approvalRequests.find(
      r => r.id === approvalRequestId
    );
    if (!approvalRequest) {
      throw new Error(`Approval request not found: ${approvalRequestId}`);
    }

    if (approvalRequest.approver !== approvedBy) {
      throw new Error(
        `Only the assigned approver can approve: ${approvalRequest.approver}`
      );
    }

    approvalRequest.status = 'approved';
    approvalRequest.respondedAt = new Date();

    // Conditionally add optional property
    if (comments !== undefined) {
      approvalRequest.comments = comments;
    }

    content.status = 'approved';
    content.approvedBy = approvedBy;
    content.approvedAt = new Date();

    this.contents.set(contentId, content);

    console.log(
      `[ContentPublisher] Content approved: ${content.title} by ${approvedBy}`
    );

    // 자동 게시가 활성화되어 있고 스케줄이 없으면 즉시 게시
    if (this.config.autoPublish && !content.scheduledDate) {
      this.publishContent(contentId);
    }

    return content;
  }

  /**
   * 승인 거부
   */
  rejectContent(
    contentId: string,
    approvalRequestId: string,
    rejectedBy: string,
    comments: string
  ): ContentItem {
    const content = this.contents.get(contentId);
    if (!content) {
      throw new Error(`Content not found: ${contentId}`);
    }

    const approvalRequest = content.approvalRequests.find(
      r => r.id === approvalRequestId
    );
    if (!approvalRequest) {
      throw new Error(`Approval request not found: ${approvalRequestId}`);
    }

    approvalRequest.status = 'rejected';
    approvalRequest.respondedAt = new Date();
    approvalRequest.comments = comments;

    content.status = 'draft';

    this.contents.set(contentId, content);

    console.log(
      `[ContentPublisher] Content rejected: ${content.title} by ${rejectedBy}`
    );

    return content;
  }

  /**
   * 콘텐츠 스케줄링
   */
  scheduleContent(contentId: string, scheduledDate: Date): ContentItem {
    const content = this.contents.get(contentId);
    if (!content) {
      throw new Error(`Content not found: ${contentId}`);
    }

    if (content.status !== 'approved') {
      throw new Error(
        `Content must be approved before scheduling: ${content.status}`
      );
    }

    content.scheduledDate = scheduledDate;
    content.status = 'scheduled';

    this.contents.set(contentId, content);

    console.log(
      `[ContentPublisher] Content scheduled: ${content.title} at ${scheduledDate.toISOString()}`
    );

    return content;
  }

  /**
   * 콘텐츠 게시
   */
  async publishContent(contentId: string): Promise<PublishingResult> {
    const content = this.contents.get(contentId);
    if (!content) {
      throw new Error(`Content not found: ${contentId}`);
    }

    if (content.status !== 'approved' && content.status !== 'scheduled') {
      throw new Error(
        `Content must be approved or scheduled before publishing: ${content.status}`
      );
    }

    try {
      console.log(`[ContentPublisher] Publishing content: ${content.title}`);

      // SEO 최적화
      if (this.config.seoAutoOptimize) {
        content.seoMetadata = this.optimizeSEOMetadata(
          content.seoMetadata,
          content.content
        );
      }

      // 소셜 미디어 포스트 생성 및 게시
      if (this.config.socialAutoPost) {
        const socialPosts = await this.createAndPublishSocialPosts(content);
        content.socialPosts = socialPosts;
      }

      // 게시 처리
      content.status = 'published';
      content.publishedDate = new Date();
      this.contents.set(contentId, content);

      // CMS integration: https://github.com/jlinsights/FamilyOffice/issues/6
      // await this.publishToCMS(content);

      // Database persistence: https://github.com/jlinsights/FamilyOffice/issues/6
      // await this.saveToDatabase(content);

      const publishedUrl = this.generatePublishedUrl(content.slug);

      console.log(
        `[ContentPublisher] Content published successfully: ${publishedUrl}`
      );

      // 알림 전송
      if (this.config.notifyOnPublish) {
        await this.sendPublishNotification(content, publishedUrl);
      }

      return {
        success: true,
        contentId: content.id,
        publishedUrl,
        socialPosts: content.socialPosts,
        publishedAt: content.publishedDate,
      };
    } catch (error) {
      content.status = 'failed';
      this.contents.set(contentId, content);

      console.error(
        `[ContentPublisher] Failed to publish content: ${content.title}`,
        error
      );

      return {
        success: false,
        contentId: content.id,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'PUBLISH_FAILED',
          details: error,
        },
        publishedAt: new Date(),
      };
    }
  }

  /**
   * 스케줄된 콘텐츠 자동 게시 (Cron Job에서 호출)
   */
  async publishScheduledContents(): Promise<PublishingResult[]> {
    const now = new Date();
    const results: PublishingResult[] = [];

    for (const [, content] of this.contents) {
      if (
        content.status === 'scheduled' &&
        content.scheduledDate &&
        content.scheduledDate <= now
      ) {
        const result = await this.publishContent(content.id);
        results.push(result);
      }
    }

    if (results.length > 0) {
      console.log(
        `[ContentPublisher] Published ${results.length} scheduled contents`
      );
    }

    return results;
  }

  /**
   * SEO 메타데이터 자동 생성
   */
  private autoGenerateSEOMetadata(params: {
    title: string;
    content: string;
    slug: string;
  }): SEOMetadata {
    const { title, content, slug } = params;

    // 본문에서 첫 160자 추출하여 description 생성
    const description =
      content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';

    // 키워드 추출 (간단한 버전 - 실제로는 NLP 사용)
    const keywords = this.extractKeywords(content);

    // Focus Keyword (제목의 첫 번째 주요 단어)
    const focusKeyword = keywords[0] || title.split(' ')[0] || 'default';

    const canonicalUrl = `https://familyoffice.com/blog/${slug}`;

    return {
      metaTitle: `${title} | Family Office`,
      metaDescription: description,
      keywords,
      canonicalUrl,
      ogTitle: title,
      ogDescription: description,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      focusKeyword,
      seoScore: 75, // 초기 점수
      readabilityScore: 80, // 초기 점수
    };
  }

  /**
   * SEO 메타데이터 최적화
   */
  private optimizeSEOMetadata(
    metadata: SEOMetadata,
    content: string
  ): SEOMetadata {
    // 키워드 밀도 체크
    const keywordDensity = this.calculateKeywordDensity(
      content,
      metadata.focusKeyword
    );

    // SEO 점수 계산
    const seoScore = this.calculateSEOScore({
      titleLength: metadata.metaTitle.length,
      descriptionLength: metadata.metaDescription.length,
      keywordDensity,
      hasStructuredData: !!metadata.structuredData,
      hasOGImage: !!metadata.ogImage,
    });

    metadata.seoScore = seoScore;

    console.log(
      `[ContentPublisher] SEO optimized: ${metadata.focusKeyword} (score: ${seoScore})`
    );

    return metadata;
  }

  /**
   * 소셜 미디어 포스트 생성 및 게시
   */
  private async createAndPublishSocialPosts(
    content: ContentItem
  ): Promise<SocialMediaPost[]> {
    const posts: SocialMediaPost[] = [];

    for (const platform of this.config.socialPlatforms) {
      const post = this.generateSocialPost(content, platform);
      posts.push(post);

      // Social media API integration: https://github.com/jlinsights/FamilyOffice/issues/6
      // await this.publishToSocialMedia(post);
    }

    console.log(
      `[ContentPublisher] Created ${posts.length} social media posts`
    );

    return posts;
  }

  /**
   * 플랫폼별 소셜 미디어 포스트 생성
   */
  private generateSocialPost(
    content: ContentItem,
    platform: SocialPlatform
  ): SocialMediaPost {
    const baseUrl = `https://familyoffice.com/blog/${content.slug}`;
    const hashtags = this.generateHashtags(content.tags, platform);

    let postContent = '';

    switch (platform) {
      case 'twitter':
        // 트위터: 280자 제한
        postContent = `${content.title}\n\n${content.excerpt.substring(0, 120)}...\n\n${baseUrl}`;
        break;

      case 'linkedin':
        // 링크드인: 전문적인 톤
        postContent = `${content.title}\n\n${content.excerpt}\n\n더 자세한 내용은 링크에서 확인하세요: ${baseUrl}`;
        break;

      case 'facebook':
        // 페이스북: 친근한 톤
        postContent = `${content.title}\n\n${content.excerpt}\n\n자세히 보기: ${baseUrl}`;
        break;

      case 'instagram':
        // 인스타그램: 짧고 임팩트 있게
        postContent = `${content.title}\n\n링크는 프로필에서 확인하세요! 👆`;
        break;
    }

    return {
      id: this.generateSocialPostId(),
      platform,
      content: postContent,
      hashtags,
      status: 'draft',
    };
  }

  /**
   * 해시태그 생성
   */
  private generateHashtags(tags: string[], platform: SocialPlatform): string[] {
    const hashtags = tags.map(tag => `#${tag.replace(/\s+/g, '')}`);

    // 플랫폼별 해시태그 제한
    const maxHashtags =
      platform === 'twitter' ? 3 : platform === 'instagram' ? 30 : 5;

    return hashtags.slice(0, maxHashtags);
  }

  /**
   * 캘린더 기반 콘텐츠 일괄 생성
   */
  async generateContentFromCalendar(
    targetAudience: 'ceo' | 'high-net-worth' | 'mid-market',
    monthsAhead: number = 3
  ): Promise<ContentItem[]> {
    // Generate calendar with proper date range
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + monthsAhead);

    const calendarItems = generateContentCalendar(startDate, endDate);
    const contents: ContentItem[] = [];

    for (const item of calendarItems) {
      // Build params object with conditional scheduledDate
      const params: {
        title: string;
        content: string;
        type: ContentType;
        createdBy: string;
        scheduledDate?: Date;
        tags: string[];
        categories: string[];
      } = {
        title: item.title,
        content: this.generateContentFromTemplate(item),
        type: this.mapContentType(item.type),
        createdBy: 'system',
        tags: [item.bmadCategory, item.targetAudience].filter(
          (tag): tag is string => tag !== undefined
        ),
        categories: [item.type],
      };

      // Conditionally add scheduledDate if publishDate is defined
      if (item.publishDate !== undefined) {
        params.scheduledDate = item.publishDate;
      }

      const content = this.createContent(params);

      contents.push(content);
    }

    console.log(
      `[ContentPublisher] Generated ${contents.length} contents from calendar for ${targetAudience}`
    );

    return contents;
  }

  /**
   * 콘텐츠 조회
   */
  getContent(contentId: string): ContentItem | undefined {
    return this.contents.get(contentId);
  }

  /**
   * 상태별 콘텐츠 조회
   */
  getContentsByStatus(status: ContentStatus): ContentItem[] {
    return Array.from(this.contents.values()).filter(c => c.status === status);
  }

  /**
   * 스케줄된 콘텐츠 조회 (다가오는 7일)
   */
  getUpcomingScheduledContents(days: number = 7): ContentItem[] {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return Array.from(this.contents.values())
      .filter(
        c =>
          c.status === 'scheduled' &&
          c.scheduledDate &&
          c.scheduledDate >= now &&
          c.scheduledDate <= futureDate
      )
      .sort((a, b) => {
        if (!a.scheduledDate || !b.scheduledDate) return 0;
        return a.scheduledDate.getTime() - b.scheduledDate.getTime();
      });
  }

  /**
   * 승인 대기 중인 콘텐츠 조회
   */
  getPendingApprovals(approver?: string): ContentItem[] {
    return Array.from(this.contents.values()).filter(c => {
      if (c.status !== 'pending_approval') return false;
      if (!approver) return true;

      return c.approvalRequests.some(
        r => r.approver === approver && r.status === 'pending'
      );
    });
  }

  /**
   * 대시보드 통계
   */
  getDashboardStats(): {
    totalContents: number;
    byStatus: Record<ContentStatus, number>;
    upcomingScheduled: number;
    pendingApprovals: number;
    publishedThisMonth: number;
    averageEngagementRate: number;
  } {
    const contents = Array.from(this.contents.values());
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const byStatus = contents.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
      },
      {} as Record<ContentStatus, number>
    );

    const publishedThisMonth = contents.filter(
      c =>
        c.status === 'published' &&
        c.publishedDate &&
        c.publishedDate >= monthStart
    ).length;

    const engagementRates = contents
      .filter(c => c.engagementRate !== undefined)
      .map(c => c.engagementRate!);

    const averageEngagementRate =
      engagementRates.length > 0
        ? engagementRates.reduce((sum, rate) => sum + rate, 0) /
          engagementRates.length
        : 0;

    return {
      totalContents: contents.length,
      byStatus,
      upcomingScheduled: this.getUpcomingScheduledContents().length,
      pendingApprovals: this.getPendingApprovals().length,
      publishedThisMonth,
      averageEngagementRate,
    };
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private generateContentId(): string {
    return `content_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private generateApprovalId(): string {
    return `approval_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private generateSocialPostId(): string {
    return `social_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private generateExcerpt(content: string, maxLength: number = 200): string {
    const plainText = content.replace(/<[^>]*>/g, '');
    return (
      plainText.substring(0, maxLength) +
      (plainText.length > maxLength ? '...' : '')
    );
  }

  private extractKeywords(content: string): string[] {
    // 간단한 키워드 추출 (실제로는 NLP 라이브러리 사용 권장)
    const words = content
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .split(/\s+/);

    const wordFrequency = words.reduce(
      (acc, word) => {
        if (word.length > 3) {
          acc[word] = (acc[word] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private calculateKeywordDensity(content: string, keyword: string): number {
    const words = content.toLowerCase().split(/\s+/);
    const keywordCount = words.filter(w =>
      w.includes(keyword.toLowerCase())
    ).length;
    return (keywordCount / words.length) * 100;
  }

  private calculateSEOScore(params: {
    titleLength: number;
    descriptionLength: number;
    keywordDensity: number;
    hasStructuredData: boolean;
    hasOGImage: boolean;
  }): number {
    let score = 0;

    // 제목 길이 (50-60자 최적)
    if (params.titleLength >= 50 && params.titleLength <= 60) {
      score += 20;
    } else if (params.titleLength >= 40 && params.titleLength <= 70) {
      score += 15;
    } else {
      score += 5;
    }

    // 설명 길이 (150-160자 최적)
    if (params.descriptionLength >= 150 && params.descriptionLength <= 160) {
      score += 20;
    } else if (
      params.descriptionLength >= 140 &&
      params.descriptionLength <= 170
    ) {
      score += 15;
    } else {
      score += 5;
    }

    // 키워드 밀도 (1-3% 최적)
    if (params.keywordDensity >= 1 && params.keywordDensity <= 3) {
      score += 20;
    } else if (params.keywordDensity >= 0.5 && params.keywordDensity <= 5) {
      score += 10;
    }

    // 구조화된 데이터
    if (params.hasStructuredData) {
      score += 20;
    }

    // OG 이미지
    if (params.hasOGImage) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  private generatePublishedUrl(slug: string): string {
    return `https://familyoffice.com/blog/${slug}`;
  }

  private async sendPublishNotification(
    content: ContentItem,
    url: string
  ): Promise<void> {
    console.log(
      `[ContentPublisher] Sending publish notification for: ${content.title}`
    );
    console.log(`URL: ${url}`);
    console.log(`Recipients: ${this.config.notificationEmails.join(', ')}`);

    // Email service integration: https://github.com/jlinsights/FamilyOffice/issues/6
    // await sendEmail({
    //   to: this.config.notificationEmails,
    //   subject: `콘텐츠 게시 완료: ${content.title}`,
    //   body: `${content.title}이(가) 성공적으로 게시되었습니다.\n\nURL: ${url}`
    // });
  }

  private generateContentFromTemplate(item: ContentCalendar): string {
    // 템플릿 기반 콘텐츠 생성 (간단한 버전)
    return `
      <h1>${item.title}</h1>
      <p>${item.description}</p>

      <h2>주요 내용</h2>
      <ul>
        ${item.topics?.map((topic: string) => `<li>${topic}</li>`).join('\n') || ''}
      </ul>

      <h2>키워드</h2>
      <p>${item.targetKeywords.join(', ')}</p>
    `;
  }

  private mapContentType(calendarType: string): ContentType {
    const mapping: Record<string, ContentType> = {
      blog: 'blog',
      'case-study': 'case-study',
      guide: 'guide',
      whitepaper: 'whitepaper',
      webinar: 'tutorial',
    };

    return mapping[calendarType] || 'blog';
  }
}

/**
 * 싱글톤 인스턴스
 */
export const contentAutoPublisher = new ContentAutoPublisher({
  autoPublish: false,
  requireApproval: true,
  approvers: ['admin@familyoffice.com'],
  notifyOnPublish: true,
  notificationEmails: ['marketing@familyoffice.com'],
  socialAutoPost: true,
  socialPlatforms: ['twitter', 'linkedin'],
  seoAutoOptimize: true,
});

// 개발 환경에서 테스트 콘텐츠 생성
if (process.env.NODE_ENV === 'development') {
  console.log('[ContentPublisher] Development mode: Ready to publish contents');
}
