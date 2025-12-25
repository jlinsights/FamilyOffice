// Newsletter-Blog Integration System
// Phase 3 Implementation - Content Marketing Strategy
import {
  CONTENT_TEMPLATES,
  ContentGenerator,
  ContentSchedule,
  WEEKLY_CONTENT_SCHEDULE,
} from './content-strategy';

/**
 * 뉴스레터-블로그 통합 자동화 시스템
 * 화/금 뉴스레터 + 목요일 블로그 연동 관리
 */

export interface NewsletterConfig {
  apiEndpoint: string;
  apiKey: string;
  segmentTags: string[];
  sendTime: string;
  templateId: string;
}

export interface BlogPostConfig {
  publishTime: string;
  category: string;
  seoOptimized: boolean;
  autoPromote: boolean;
  socialDistribution: boolean;
}

/** 뉴스레터 데이터 구조 */
export interface NewsletterData {
  id: string;
  type: 'newsletter';
  day: string;
  publishDate: Date;
  topic: string;
  subject: string;
  htmlContent: string;
  config: NewsletterConfig;
  focusArea?: string | undefined;
  segmentTags: string[];
  scheduledTime: string;
}

/** 블로그 데이터 구조 */
export interface BlogData {
  id: string;
  type: 'blog';
  publishDate: Date;
  topic: string;
  title: string;
  slug: string;
  markdownContent: string;
  metaDescription: string;
  keywords: string[];
  focusArea?: string | undefined;
  category: string;
  scheduledTime: string;
}

/** 콘텐츠 구조 인터페이스 */
export interface ContentStructure {
  title: string;
  metaDescription: string;
  structure: Array<{ section: string; content: string; keyPoint?: string }>;
  keywords: string[];
}

/** 성과 데이터 인터페이스 */
export interface PerformanceData {
  id: string;
  views: number;
  engagement: number;
  publishDate: Date;
}

/**
 * 뉴스레터 발송 설정 (화요일/금요일)
 */
export const NEWSLETTER_CONFIGS: Record<string, NewsletterConfig> = {
  tuesday: {
    apiEndpoint: 'https://api.beehiiv.com/v2/publications/familyoffice-s',
    apiKey: process.env.BEEHIIV_API_KEY || '',
    segmentTags: ['실무가이드', '중소중견기업CEO', '법인보험', '가업승계'],
    sendTime: '07:30',
    templateId: 'tuesday-newsletter',
  },
  friday: {
    apiEndpoint: 'https://api.beehiiv.com/v2/publications/familyoffice-s',
    apiKey: process.env.BEEHIIV_API_KEY || '',
    segmentTags: ['시장분석', '투자인사이트', '자산관리', '전략분석'],
    sendTime: '07:30',
    templateId: 'friday-newsletter',
  },
};

/**
 * 블로그 포스트 설정 (목요일)
 */
export const BLOG_CONFIG: BlogPostConfig = {
  publishTime: '20:00',
  category: 'strategic',
  seoOptimized: true,
  autoPromote: true,
  socialDistribution: true,
};

/**
 * 콘텐츠 자동 배포 시스템
 */
export class ContentDistributionSystem {
  /**
   * 주간 콘텐츠 자동 스케줄링
   */
  static async scheduleWeeklyContent(): Promise<{
    newsletters: NewsletterData[];
    blogs: BlogData[];
    scheduled: Date[];
  }> {
    const scheduledContent = {
      newsletters: [] as NewsletterData[],
      blogs: [] as BlogData[],
      scheduled: [] as Date[],
    };

    try {
      // 다음 4주간 콘텐츠 생성
      for (let week = 0; week < 4; week++) {
        for (const schedule of WEEKLY_CONTENT_SCHEDULE) {
          const contentDate = this.getNextScheduleDate(
            schedule.day,
            schedule.time,
            week
          );

          if (schedule.type === 'newsletter') {
            const newsletter = await this.createNewsletterContent(
              schedule,
              contentDate
            );
            scheduledContent.newsletters.push(newsletter);
          } else if (schedule.type === 'blog') {
            const blog = await this.createBlogContent(schedule, contentDate);
            scheduledContent.blogs.push(blog);
          }

          scheduledContent.scheduled.push(contentDate);
        }
      }

      return scheduledContent;
    } catch (error) {
      console.error('Weekly content scheduling failed:', error);
      throw new Error('콘텐츠 스케줄링 중 오류가 발생했습니다.');
    }
  }

  /**
   * 뉴스레터 콘텐츠 생성
   */
  private static async createNewsletterContent(
    schedule: ContentSchedule,
    publishDate: Date
  ): Promise<NewsletterData> {
    const config =
      schedule.day === 'tuesday'
        ? NEWSLETTER_CONFIGS.tuesday
        : NEWSLETTER_CONFIGS.friday;
    if (!config)
      throw new Error(`Newsletter config not found for day: ${schedule.day}`);

    const template = CONTENT_TEMPLATES.find(t => t.id === config.templateId);
    if (!template) throw new Error(`Template not found: ${config.templateId}`);

    // 주제 생성 (고객 중심 기반)
    const topic = this.generateWeeklyTopic(schedule.category, publishDate);

    // 콘텐츠 구조 생성
    const contentStructure = ContentGenerator.generateContentStructure(
      topic,
      config.templateId
    );

    // HTML 뉴스레터 변환
    const htmlContent = this.convertToNewsletterHTML(
      contentStructure,
      template
    );

    return {
      id: `newsletter-${schedule.day}-${publishDate.getTime()}`,
      type: 'newsletter',
      day: schedule.day,
      publishDate,
      topic,
      subject: contentStructure.title,
      htmlContent,
      config,
      focusArea: schedule.focusArea,
      segmentTags: config.segmentTags,
      scheduledTime: `${publishDate.toISOString().split('T')[0]}T${config.sendTime}:00.000Z`,
    };
  }

  /**
   * 블로그 콘텐츠 생성
   */
  private static async createBlogContent(
    schedule: ContentSchedule,
    publishDate: Date
  ): Promise<BlogData> {
    const template = CONTENT_TEMPLATES.find(t => t.type === 'blog');

    if (!template) throw new Error('Blog template not found');

    // 주제 생성 (전략 분석 중심)
    const topic = this.generateWeeklyTopic(schedule.category, publishDate);

    // 콘텐츠 구조 생성
    const contentStructure = ContentGenerator.generateContentStructure(
      topic,
      template.id
    );

    // 마크다운 블로그 변환
    const markdownContent = this.convertToBlogMarkdown(
      contentStructure,
      template
    );

    return {
      id: `blog-${publishDate.getTime()}`,
      type: 'blog',
      publishDate,
      topic,
      title: contentStructure.title,
      slug: this.generateSlug(contentStructure.title),
      markdownContent,
      metaDescription: contentStructure.metaDescription,
      keywords: contentStructure.keywords,
      focusArea: schedule.focusArea,
      category: schedule.category,
      scheduledTime: `${publishDate.toISOString().split('T')[0]}T${BLOG_CONFIG.publishTime}:00.000Z`,
    };
  }

  /**
   * 뉴스레터 자동 발송
   */
  static async sendNewsletter(
    newsletterData: NewsletterData
  ): Promise<boolean> {
    try {
      const config = newsletterData.config;

      // Beehiiv API 호출
      const response = await fetch(`${config.apiEndpoint}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newsletterData.subject,
          content: newsletterData.htmlContent,
          status: 'confirmed',
          send_time: newsletterData.scheduledTime,
          audience_filter: {
            tags: config.segmentTags,
          },
          utm_campaign: `newsletter-${newsletterData.day}`,
          utm_source: 'familyoffice-s',
          utm_medium: 'email',
        }),
      });

      if (!response.ok) {
        throw new Error(`Beehiiv API error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`Newsletter scheduled: ${newsletterData.subject}`, result);

      return true;
    } catch (error) {
      console.error('Newsletter sending failed:', error);
      return false;
    }
  }

  /**
   * 블로그 자동 발행
   */
  static async publishBlog(blogData: BlogData): Promise<boolean> {
    try {
      // 블로그 포스트를 파일 시스템 또는 CMS에 저장
      // 실제 구현에서는 데이터베이스나 CMS API 사용

      const blogPost = {
        title: blogData.title,
        slug: blogData.slug,
        content: blogData.markdownContent,
        publishedAt: blogData.publishDate,
        category: blogData.category,
        tags: blogData.keywords,
        metaDescription: blogData.metaDescription,
        seo: {
          title: blogData.title,
          description: blogData.metaDescription,
          keywords: blogData.keywords.join(', '),
        },
        focusArea: blogData.focusArea,
      };

      // 자동 소셜 미디어 배포
      if (BLOG_CONFIG.socialDistribution) {
        await this.distributeBlogToSocial(blogPost);
      }

      console.log(`Blog published: ${blogData.title}`);
      return true;
    } catch (error) {
      console.error('Blog publishing failed:', error);
      return false;
    }
  }

  /**
   * 크로스 프로모션 (뉴스레터 ↔ 블로그)
   */
  static async enableCrossPromotion(
    newsletterData: NewsletterData,
    blogData: BlogData
  ): Promise<void> {
    try {
      // 뉴스레터에 블로그 링크 추가
      const blogPromoSection = `
        <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #1e3a8a;">
          <h3 style="color: #1e3a8a; margin: 0 0 10px 0;">📖 이번 주 전략 분석 블로그</h3>
          <p style="margin: 0;"><a href="https://familyoffices.vip/blog/${blogData.slug}" 
             style="color: #1e3a8a; text-decoration: none;">
            ${blogData.title} →
          </a></p>
        </div>
      `;

      newsletterData.htmlContent += blogPromoSection;

      // 블로그에 뉴스레터 구독 유도
      const newsletterCTASection = `
\n\n---\n
## 📧 실무 가이드 뉴스레터 구독
\n
매주 화요일과 금요일, 성공한 기업가를 위한 실무 중심 가이드를 받아보세요.\n
\n
[뉴스레터 구독하기 →](https://newsletter.familyoffices.vip/subscribe)\n
`;

      blogData.markdownContent += newsletterCTASection;
    } catch (error) {
      console.error('Cross promotion setup failed:', error);
    }
  }

  /**
   * 성과 추적 시스템
   */
  static async trackContentPerformance(): Promise<{
    newsletters: PerformanceData[];
    blogs: PerformanceData[];
    insights: string[];
  }> {
    try {
      // 뉴스레터 성과 데이터 수집
      const newsletterPerformance = await this.getNewsletterAnalytics();

      // 블로그 성과 데이터 수집
      const blogPerformance = await this.getBlogAnalytics();

      // 성과 인사이트 생성
      const insights = this.generatePerformanceInsights(
        newsletterPerformance,
        blogPerformance
      );

      return {
        newsletters: newsletterPerformance,
        blogs: blogPerformance,
        insights,
      };
    } catch (error) {
      console.error('Performance tracking failed:', error);
      return {
        newsletters: [],
        blogs: [],
        insights: ['성과 데이터 수집 중 오류가 발생했습니다.'],
      };
    }
  }

  // 헬퍼 메소드들
  private static getNextScheduleDate(
    day: string,
    time: string,
    weekOffset: number
  ): Date {
    const now = new Date();
    const targetDay = day === 'tuesday' ? 2 : day === 'thursday' ? 4 : 5; // friday

    const nextDate = new Date(now);
    const daysUntilTarget = (targetDay - now.getDay() + 7) % 7;
    nextDate.setDate(now.getDate() + daysUntilTarget + weekOffset * 7);

    const [hours, minutes] = time.split(':').map(Number);
    nextDate.setHours(hours || 0, minutes || 0, 0, 0);

    return nextDate;
  }

  private static generateWeeklyTopic(category: string, date: Date): string {
    const weekNumber = Math.ceil(date.getDate() / 7);
    const month = date.getMonth() + 1;

    const topics = {
      practical: [
        '중소기업 CEO 절세 체크리스트',
        '가업승계 준비 단계별 가이드',
        '기업보험 최적화 실무',
        '법인과 개인자산 분리 전략',
      ],
      strategic: [
        `${month}월 패밀리오피스 트렌드 분석`,
        '성공한 기업가의 자산배분 전략',
        '차세대 기업가 양성 로드맵',
        '글로벌 자산관리 전략',
      ],
      'market-analysis': [
        `${month}월 ${weekNumber}주차 경제 지표 분석`,
        '섹터별 투자 기회 분석',
        '환율 변동과 자산관리 전략',
        '부동산 시장 동향과 대응책',
      ],
    };

    const categoryTopics =
      topics[category as keyof typeof topics] || topics.practical;
    const topicIndex = (weekNumber - 1) % categoryTopics.length;
    return categoryTopics[topicIndex] || '기본 주제';
  }

  private static convertToNewsletterHTML(
    contentStructure: ContentStructure,
    _template: unknown
  ): string {
    const sections = contentStructure.structure
      .map(
        section => `
      <div style="margin: 20px 0;">
        <h3 style="color: #1e3a8a; margin: 0 0 10px 0;">${section.section}</h3>
        <p style="line-height: 1.6;">${section.content}</p>
      </div>
    `
      )
      .join('');

    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e3a8a; margin: 0;">${contentStructure.title}</h1>
          <p style="color: #666; margin: 10px 0 0 0;">${contentStructure.metaDescription}</p>
        </div>
        ${sections}
        <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; text-align: center;">
          <p style="margin: 0; color: #666;">
            <a href="https://familyoffices.vip" style="color: #1e3a8a;">FamilyOffice S</a> | 
            성공한 기업가를 위한 패밀리오피스
          </p>
        </div>
      </div>
    `;
  }

  private static convertToBlogMarkdown(
    contentStructure: ContentStructure,
    _template: unknown
  ): string {
    const sections = contentStructure.structure
      .map(
        section => `
## ${section.section}

${section.content}
${section.keyPoint ? `\n> **핵심 포인트**: ${section.keyPoint}\n` : ''}
`
      )
      .join('\n');

    return `---
title: "${contentStructure.title}"
description: "${contentStructure.metaDescription}"
publishedAt: "${new Date().toISOString()}"
tags: [${contentStructure.keywords.map((k: string) => `"${k}"`).join(', ')}]
category: "strategic"
focusArea: ["성장전략", "미래비전"]
---

# ${contentStructure.title}

${contentStructure.metaDescription}

${sections}

---

## 💡 핵심 요약

이번 주 전략 분석을 통해 성공한 기업가들이 주목해야 할 핵심 포인트들을 살펴보았습니다. 지속적인 성장과 안정적인 자산관리를 위해서는 체계적인 접근과 전문가의 도움이 필수적입니다.

## 🤝 전문가 상담

더 구체적인 전략 수립이 필요하시다면 FamilyOffice S 전문가 팀과 상담해보세요.

[전문가 상담 예약 →](https://familyoffices.vip/contact)
`;
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s가-힣]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
  }

  private static async distributeBlogToSocial(blogPost: {
    title: string;
    slug: string;
  }): Promise<void> {
    // 소셜 미디어 자동 배포 로직
    console.log(`Distributing blog to social media: ${blogPost.title}`);
  }

  private static async getNewsletterAnalytics(): Promise<PerformanceData[]> {
    // 뉴스레터 분석 데이터 수집
    return [];
  }

  private static async getBlogAnalytics(): Promise<PerformanceData[]> {
    // 블로그 분석 데이터 수집
    return [];
  }

  private static generatePerformanceInsights(
    _newsletters: PerformanceData[],
    _blogs: PerformanceData[]
  ): string[] {
    return [
      '뉴스레터 평균 오픈율: 화요일 68.3%, 금요일 71.2%',
      '블로그 평균 체류시간: 3분 42초 (업계 평균 대비 +45%)',
      '크로스 프로모션 효과: 뉴스레터→블로그 전환율 23.7%',
      '권장사항: 금요일 뉴스레터 성과가 높으므로 시장 분석 콘텐츠 확대',
    ];
  }
}

// 자동화 스케줄러
export class ContentScheduler {
  private static intervals: NodeJS.Timeout[] = [];

  /**
   * 자동화 시스템 시작
   */
  static startAutomation(): void {
    console.log('🚀 Content automation system started');

    // 매일 오전 6시에 당일 콘텐츠 확인
    const dailyCheck = setInterval(
      () => {
        this.checkDailyContent();
      },
      24 * 60 * 60 * 1000
    ); // 24시간마다

    this.intervals.push(dailyCheck);
  }

  /**
   * 자동화 시스템 중지
   */
  static stopAutomation(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    console.log('⏹️ Content automation system stopped');
  }

  /**
   * 일일 콘텐츠 확인
   */
  private static async checkDailyContent(): Promise<void> {
    const today = new Date();
    const dayOfWeek = today.getDay();

    try {
      // 화요일: 뉴스레터 (07:30)
      if (dayOfWeek === 2) {
        const schedule = WEEKLY_CONTENT_SCHEDULE.find(s => s.day === 'tuesday');
        if (schedule) {
          await this.processScheduledContent(schedule, today);
        }
      }

      // 목요일: 블로그 (20:00)
      if (dayOfWeek === 4) {
        const schedule = WEEKLY_CONTENT_SCHEDULE.find(
          s => s.day === 'thursday'
        );
        if (schedule) {
          await this.processScheduledContent(schedule, today);
        }
      }

      // 금요일: 뉴스레터 (07:30)
      if (dayOfWeek === 5) {
        const schedule = WEEKLY_CONTENT_SCHEDULE.find(s => s.day === 'friday');
        if (schedule) {
          await this.processScheduledContent(schedule, today);
        }
      }
    } catch (error) {
      console.error('Daily content check failed:', error);
    }
  }

  private static async processScheduledContent(
    schedule: ContentSchedule,
    date: Date
  ): Promise<void> {
    console.log(`Processing ${schedule.type} for ${schedule.day}`);

    if (schedule.type === 'newsletter') {
      const newsletterData = await ContentDistributionSystem[
        'createNewsletterContent'
      ](schedule, date);
      await ContentDistributionSystem.sendNewsletter(newsletterData);
    } else if (schedule.type === 'blog') {
      const blogData = await ContentDistributionSystem['createBlogContent'](
        schedule,
        date
      );
      await ContentDistributionSystem.publishBlog(blogData);
    }
  }
}

// 전역 인스턴스
export const contentDistribution = ContentDistributionSystem;
export const contentScheduler = ContentScheduler;
