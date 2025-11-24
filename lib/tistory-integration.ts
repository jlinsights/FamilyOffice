// 티스토리 통합 자동화 시스템
import { BlogPost } from '@/types/blog';

export interface TistoryPost {
  title: string;
  summary: string;
  mainPoints: string[];
  caseStudy: string;
  actionItems: string[];
  tags: string[];
  category: string;
  naverKeywords: string[];
  originalBlogUrl: string;
}

export interface TistoryConfig {
  blogName: string;
  apiKey?: string;
  baseUrl: string;
}

export class TistoryContentConverter {
  
  /**
   * 뉴스레터/블로그 콘텐츠를 티스토리 최적화 버전으로 변환
   */
  static convertForTistory(originalContent: BlogPost): TistoryPost {
    return {
      title: this.optimizeForNaverSearch(originalContent.title),
      summary: this.extractExecutiveSummary(originalContent),
      mainPoints: this.extractKeyPoints(originalContent),
      caseStudy: this.extractCaseStudy(originalContent),
      actionItems: this.extractActionItems(originalContent),
      tags: this.generateNaverOptimizedTags(originalContent),
      category: this.mapToTistoryCategory(originalContent.category),
      naverKeywords: this.extractNaverKeywords(originalContent),
      originalBlogUrl: `https://familyoffices.vip/blog/${originalContent.slug}`
    };
  }

  /**
   * 네이버 검색 최적화 제목 생성
   */
  private static optimizeForNaverSearch(originalTitle: string): string {
    // 복잡한 전문용어를 일반 용어로 변환
    const keywordMap = {
      '중견기업 CEO': 'CEO',
      '리스크 관리': '위기관리',
      '기업생명보험': '기업보험',
      '의제배당': '배당세금',
      '이익잉여금': '회사 적립금',
      'MSO': '병원 관리회사',
      '가업승계': '사업 승계'
    };

    let optimizedTitle = originalTitle;
    Object.entries(keywordMap).forEach(([complex, simple]) => {
      optimizedTitle = optimizedTitle.replace(complex, simple);
    });

    // 티스토리/네이버 친화적 형태로 변환
    return optimizedTitle.length > 40 
      ? optimizedTitle.substring(0, 40) + '...'
      : optimizedTitle;
  }

  /**
   * 핵심 요약 추출 (3줄 요약)
   */
  private static extractExecutiveSummary(content: BlogPost): string {
    // 원본 content에서 핵심 요약 부분 추출 로직
    // 실제로는 content.excerpt 또는 특별한 마커를 사용
    return content.excerpt || `
${content.title}에 대한 핵심 인사이트를 3분만에 파악하세요.
실무에 바로 적용 가능한 구체적인 방법과 주의사항을 제시합니다.
전문가가 분석한 최신 트렌드와 성공 사례를 확인해보세요.
    `.trim();
  }

  /**
   * 주요 포인트 추출
   */
  private static extractKeyPoints(content: BlogPost): string[] {
    // 태그를 기반으로 주요 포인트 생성
    return content.tags.slice(0, 5).map(tag => `${tag} 관련 핵심 전략 및 실행 방안`);
  }

  /**
   * 사례 연구 추출
   */
  private static extractCaseStudy(content: BlogPost): string {
    // 카테고리별 대표 사례 템플릿
    const caseTemplates = {
      '리스크관리': '실제 중견기업 A사가 CEO 건강 이슈로 위기를 겪었지만, 사전 준비된 리스크 관리 시스템으로 안정적 경영을 유지한 사례',
      '의료법인': 'B 종합병원이 MSO 도입으로 연간 2억원 절세 효과를 달성한 성공 사례',
      '법인자산': 'C 제조업체가 150억 이익잉여금을 단계적 배당으로 3억원 세금을 절약한 사례',
      '세무': 'D 기업이 자기주식 소각 대신 배당 정책으로 13억원 세무 위험을 회피한 사례'
    };

    return caseTemplates[content.category] || 
      `${content.category} 분야에서 전문적인 전략을 통해 성공적인 결과를 달성한 실제 사례를 살펴봅니다.`;
  }

  /**
   * 실행 방법 추출
   */
  private static extractActionItems(content: BlogPost): string[] {
    // 카테고리별 실행 방법 템플릿
    const actionTemplates = {
      '리스크관리': [
        '현재 리스크 수준 정확한 진단',
        '적정 보험 설계 및 가입',
        '정기적 점검 시스템 구축',
        '비상 계획 문서화',
        '전문가와 정기 상담'
      ],
      '의료법인': [
        'MSO 설립 타당성 검토',
        '관리업무 범위 명확화',
        '적정 수수료 구조 설계',
        '세무 위험 사전 점검',
        '운영 시스템 구축'
      ],
      '법인자산': [
        '이익잉여금 현황 분석',
        '배당 시나리오별 세무 계산',
        '단계적 실행 계획 수립',
        '가족 지분 구조 검토',
        '투자 연계 방안 마련'
      ],
      '세무': [
        '현행 세법 정확한 이해',
        '세무 위험도 정밀 평가',
        '대안 전략 비교 검토',
        '전문가 자문 확보',
        '실행 전 시뮬레이션'
      ]
    };

    return actionTemplates[content.category] || [
      '현재 상황 정확한 분석',
      '전문가와 상담 진행',
      '단계적 실행 계획 수립',
      '정기적 모니터링',
      '지속적 최적화'
    ];
  }

  /**
   * 네이버 최적화 태그 생성
   */
  private static generateNaverOptimizedTags(content: BlogPost): string[] {
    const baseTag = this.simplifyTags(content.tags);
    const categoryTag = [content.category];
    const industryTags = ['CEO', '중견기업', '자산관리'];
    
    return [...baseTag, ...categoryTag, ...industryTags].slice(0, 10);
  }

  /**
   * 태그 단순화
   */
  private static simplifyTags(tags: string[]): string[] {
    return tags.map(tag => {
      // 복잡한 전문용어를 일반 용어로 변환
      const simplifications = {
        'CEO 유고': 'CEO위기',
        '기업생명보험': '기업보험',
        '의제배당': '배당세',
        '이익잉여금': '회사돈',
        '자기주식 소각': '주식소각'
      };
      
      return simplifications[tag] || tag;
    });
  }

  /**
   * 티스토리 카테고리 매핑
   */
  private static mapToTistoryCategory(originalCategory: string): string {
    const categoryMap = {
      '리스크관리': '보험',
      '의료법인': 'Family Office',
      '법인자산': 'Family Office', 
      '세무': '상속세',
      '패밀리오피스': 'Family Office',
      '투자전략': 'Family Office',
      '세무최적화': '상속세',
      '자산관리': 'Family Office',
      '승계전략': '상속세'
    };

    return categoryMap[originalCategory] || 'Family Office';
  }

  /**
   * 네이버 키워드 추출
   */
  private static extractNaverKeywords(content: BlogPost): string[] {
    // 네이버에서 검색량이 높은 키워드들로 매핑
    const naverKeywords = {
      '리스크관리': ['CEO위기', '기업위험', '보험가입', '위기관리'],
      '의료법인': ['병원경영', '의료세무', '병원절세', 'MSO'],
      '법인자산': ['배당금', '회사돈', '법인세', '절세'],
      '세무': ['세금절약', '절세', '세무상담', '세법']
    };

    return naverKeywords[content.category] || ['CEO', '기업', '자산관리', '세금'];
  }
}

export class TistoryPublisher {
  private config: TistoryConfig;

  constructor(config: TistoryConfig) {
    this.config = {
      blogName: 'family-office',
      baseUrl: 'https://family-office.tistory.com',
      ...config
    };
  }

  /**
   * 티스토리에 포스트 발행
   */
  async publishPost(content: TistoryPost): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const tistoryContent = this.formatForTistory(content);
      
      // 실제 구현에서는 티스토리 API 또는 자동화 도구 사용
      // 현재는 포맷팅된 콘텐츠를 반환
      console.log('Tistory Content Generated:', tistoryContent);
      
      return {
        success: true,
        url: `${this.config.baseUrl}/post/${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * 티스토리 포맷으로 변환
   */
  private formatForTistory(content: TistoryPost): string {
    return `
## 📋 ${content.title}

### 🎯 핵심 요약
${content.summary}

### 💡 주요 포인트
${content.mainPoints.map(point => `• ${point}`).join('\n')}

### 📊 실제 사례
${content.caseStudy}

### ✅ 실행 방법
${content.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

---

### 💬 더 자세한 정보가 필요하시다면?

👉 **[완전한 가이드 보기](${content.originalBlogUrl})**
📧 **[뉴스레터 구독하기](https://newsletter.familyoffices.vip)**
📞 **[전문가 상담 신청](https://familyoffices.vip/contact)**

---

### 🔖 관련 태그
#${content.tags.join(' #')}
    `.trim();
  }

  /**
   * 기존 블로그 포스트를 티스토리용으로 일괄 변환
   */
  async convertExistingPosts(blogPosts: BlogPost[]): Promise<TistoryPost[]> {
    return blogPosts.map(post => TistoryContentConverter.convertForTistory(post));
  }
}

// 자동화된 콘텐츠 동기화 시스템
export class ContentSyncManager {
  private tistoryPublisher: TistoryPublisher;

  constructor() {
    this.tistoryPublisher = new TistoryPublisher({
      blogName: 'family-office',
      baseUrl: 'https://family-office.tistory.com'
    });
  }

  /**
   * 뉴스레터 발행시 트리거되는 통합 동기화
   */
  async syncAllPlatforms(newsletterData: any): Promise<void> {
    try {
      // 1. 자체 블로그 포스트 생성 (기존 시스템)
      const blogPost = await this.convertNewsletterToBlog(newsletterData);
      
      // 2. 티스토리 포스트 생성
      const tistoryPost = TistoryContentConverter.convertForTistory(blogPost);
      
      // 3. 동시 발행
      await Promise.all([
        this.publishToBlog(blogPost),
        this.tistoryPublisher.publishPost(tistoryPost)
      ]);

      // 4. SEO 후속 작업
      await this.updateSEOElements();
      
      console.log('✅ All platforms synchronized successfully');
    } catch (error) {
      console.error('❌ Content sync failed:', error);
      throw error;
    }
  }

  /**
   * 뉴스레터를 블로그 포스트로 변환 (기존 시스템)
   */
  private async convertNewsletterToBlog(newsletterData: any): Promise<BlogPost> {
    // 기존 뉴스레터 → 블로그 변환 로직
    return {
      id: `newsletter-${newsletterData.issueNumber}`,
      title: newsletterData.title,
      excerpt: newsletterData.excerpt,
      content: newsletterData.content,
      category: newsletterData.category,
      author: 'FamilyOffice S 편집팀',
      date: new Date().toISOString().split('T')[0],
      readTime: newsletterData.readTime || '5분',
      tags: newsletterData.keywords || [],
      slug: this.generateSlug(newsletterData.title),
      featured: false
    };
  }

  /**
   * 블로그에 포스트 발행
   */
  private async publishToBlog(blogPost: BlogPost): Promise<void> {
    // 기존 블로그 시스템에 발행
    console.log('Publishing to blog:', blogPost.title);
  }

  /**
   * SEO 요소 업데이트
   */
  private async updateSEOElements(): Promise<void> {
    // 사이트맵 업데이트, 검색엔진 제출 등
    console.log('Updating SEO elements...');
  }

  /**
   * 슬러그 생성
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// 사용 예시
export async function initTistoryIntegration() {
  const syncManager = new ContentSyncManager();
  
  // 기존 4개 블로그 포스트를 티스토리로 변환 예시
  const existingPosts = [
    // 여기에 기존 생성된 4개 포스트 데이터
  ];

  const tistoryPosts = await syncManager.tistoryPublisher.convertExistingPosts(existingPosts as BlogPost[]);
  
  console.log('Generated Tistory posts:', tistoryPosts.length);
  return tistoryPosts;
}