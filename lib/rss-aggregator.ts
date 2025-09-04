import Parser from 'rss-parser';
import { cacheManagers } from './cache';

export interface RSSItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  author: string;
  source: 'beehiiv' | 'naver-blog';
  category?: string;
  tags: string[];
  readTime?: string;
  featured?: boolean;
  imageUrl?: string | undefined;
}

export interface ParsedFeedItem {
  title?: string;
  link?: string;
  content?: string;
  contentSnippet?: string;
  pubDate?: string;
  author?: string;
  creator?: string;
  guid?: string;
  categories?: string[];
  'content:encoded'?: string;
  description?: string;
}

export class RSSAggregator {
  private parser: Parser;
  private cachePrefix = 'rss_feed';
  private cacheDuration = 3600; // 1시간

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['content:encoded', 'description', 'dc:creator']
      }
    });
  }

  /**
   * beehiiv RSS 피드에서 뉴스레터 가져오기
   */
  async getBeehiivPosts(limit = 10): Promise<RSSItem[]> {
    const cacheKey = `${this.cachePrefix}:beehiiv`;
    
    try {
      // 캐시 확인
      const cached = await cacheManagers.content.get<string>(cacheKey);
      if (cached) {
        return JSON.parse(cached).slice(0, limit);
      }

      // RSS 피드 파싱
      const feedUrl = 'https://rss.beehiiv.com/feeds/Ur0inYkjHr.xml';
      let feed;
      try {
        feed = await this.parser.parseURL(feedUrl);
      } catch (parseError) {
        console.error('RSS 파싱 오류:', parseError);
        // 파싱 실패 시 빈 배열 반환
        return [];
      }
      
      const posts: RSSItem[] = feed.items.map((item: ParsedFeedItem, index) => ({
        id: this.generateId('beehiiv', item.guid || item.link || '', index),
        title: item.title || '제목 없음',
        content: this.extractContent(item),
        excerpt: this.generateExcerpt(item.contentSnippet || item.description || ''),
        url: item.link || '',
        publishedAt: item.pubDate || new Date().toISOString(),
        author: this.normalizeAuthorName(item.author || item.creator || '패밀리오피스 에디터'),
        source: 'beehiiv' as const,
        category: this.extractCategory(item.categories),
        tags: this.extractTags(item.categories || []),
        readTime: this.calculateReadTime(this.extractContent(item)),
        imageUrl: this.extractImageUrl(item) || undefined,
        featured: index === 0 // 첫 번째 글을 featured로 설정
      }));

      // 캐시 저장
      await cacheManagers.content.set(cacheKey, JSON.stringify(posts), this.cacheDuration);

      return posts.slice(0, limit);
    } catch (error) {
      console.error('beehiiv RSS 피드 파싱 오류:', error);
      return [];
    }
  }

  /**
   * 네이버 블로그 RSS 피드에서 포스트 가져오기
   */
  async getNaverBlogPosts(blogId: string, limit = 10): Promise<RSSItem[]> {
    const cacheKey = `${this.cachePrefix}:naver:${blogId}`;
    
    try {
      // 캐시 확인
      const cached = await cacheManagers.content.get<string>(cacheKey);
      if (cached) {
        return JSON.parse(cached).slice(0, limit);
      }

      // 네이버 블로그 RSS URL
      const feedUrl = `https://rss.blog.naver.com/${blogId}.xml`;
      let feed;
      try {
        feed = await this.parser.parseURL(feedUrl);
      } catch (parseError) {
        console.error('네이버 RSS 파싱 오류:', parseError);
        // 파싱 실패 시 빈 배열 반환
        return [];
      }
      
      const posts: RSSItem[] = feed.items.map((item: ParsedFeedItem, index) => ({
        id: this.generateId('naver', item.guid || item.link || '', index),
        title: item.title || '제목 없음',
        content: this.extractContent(item),
        excerpt: this.generateExcerpt(item.contentSnippet || item.description || ''),
        url: item.link || '',
        publishedAt: item.pubDate || new Date().toISOString(),
        author: this.normalizeAuthorName(item.author || item.creator || '패밀리오피스 블로거'),
        source: 'naver-blog' as const,
        category: this.extractCategory(item.categories),
        tags: this.extractTags(item.categories || []),
        readTime: this.calculateReadTime(this.extractContent(item)),
        imageUrl: this.extractImageUrl(item) || undefined,
        featured: false
      }));

      // 캐시 저장
      await cacheManagers.content.set(cacheKey, JSON.stringify(posts), this.cacheDuration);

      return posts.slice(0, limit);
    } catch (error) {
      console.error('네이버 블로그 RSS 피드 파싱 오류:', error);
      return [];
    }
  }

  /**
   * 통합 콘텐츠 가져오기 (beehiiv + 네이버 블로그)
   */
  async getIntegratedContent(naverBlogId?: string, limit = 20): Promise<RSSItem[]> {
    try {
      const promises: Promise<RSSItem[]>[] = [
        this.getBeehiivPosts(limit / 2)
      ];

      if (naverBlogId) {
        promises.push(this.getNaverBlogPosts(naverBlogId, limit / 2));
      }

      const results = await Promise.all(promises);
      const allPosts = results.flat();

      // 발행일 기준 내림차순 정렬
      return allPosts
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('통합 콘텐츠 가져오기 오류:', error);
      return [];
    }
  }

  /**
   * 특정 소스의 콘텐츠만 가져오기
   */
  async getContentBySource(source: 'beehiiv' | 'naver-blog', identifier?: string, limit = 10): Promise<RSSItem[]> {
    if (source === 'beehiiv') {
      return this.getBeehiivPosts(limit);
    } else if (source === 'naver-blog' && identifier) {
      return this.getNaverBlogPosts(identifier, limit);
    }
    return [];
  }

  /**
   * ID별로 특정 콘텐츠 가져오기
   */
  async getContentById(id: string): Promise<RSSItem | null> {
    try {
      console.log('Getting content by ID:', id);
      
      // beehiiv에서 먼저 찾기
      try {
        const beehiivPosts = await this.getBeehiivPosts(50);
        const beehiivPost = beehiivPosts.find(post => post.id === id);
        if (beehiivPost) {
          console.log('Found beehiiv post:', beehiivPost.title);
          return beehiivPost;
        }
      } catch (error) {
        console.error('beehiiv 조회 실패:', error);
      }

      // 네이버 블로그에서 찾기
      try {
        const naverPosts = await this.getNaverBlogPosts('lim_jaehong', 50);
        const naverPost = naverPosts.find(post => post.id === id);
        if (naverPost) {
          console.log('Found naver post:', naverPost.title);
          return naverPost;
        }
      } catch (naverError) {
        console.error('네이버 블로그 조회 실패:', naverError);
      }

      console.log('Content not found for ID:', id);
      return null;
    } catch (error) {
      console.error('콘텐츠 ID 조회 오류:', error);
      return null;
    }
  }

  /**
   * 유틸리티 메소드들
   */
  private generateId(source: string, guid: string, index: number): string {
    const base = guid || `${source}-${index}-${Date.now()}`;
    return `${source}-${Buffer.from(base).toString('base64').slice(0, 16)}`;
  }

  private extractContent(item: ParsedFeedItem): string {
    return item['content:encoded'] || item.content || item.description || '';
  }

  private generateExcerpt(content: string, maxLength = 200): string {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return cleanContent.length > maxLength 
      ? `${cleanContent.slice(0, maxLength)}...`
      : cleanContent;
  }

  private extractCategory(categories?: string[]): string {
    if (!categories || categories.length === 0) return '일반';
    return categories[0] || '일반';
  }

  private extractTags(categories: string[]): string[] {
    if (!categories) return [];
    return categories.slice(0, 5); // 최대 5개 태그
  }

  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200; // 한국어 기준
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes}분 읽기`;
  }

  /**
   * 작성자 이름 정규화
   */
  private normalizeAuthorName(author: string): string {
    // lim_jaehong, Jaehong LIM 등을 'Editor'로 변환
    if (author.toLowerCase().includes('lim_jaehong') || 
        author.toLowerCase().includes('jaehong') || 
        author.toLowerCase().includes('lim')) {
      return 'Editor';
    }
    // 패밀리오피스 에디터/블로거도 'Editor'로 통일
    if (author.includes('패밀리오피스')) {
      return 'Editor';
    }
    return author;
  }

  private extractImageUrl(item: ParsedFeedItem): string | undefined {
    const content = this.extractContent(item);
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : undefined;
  }

  /**
   * RSS 피드 상태 확인
   */
  async checkFeedHealth(): Promise<{ beehiiv: boolean; naver?: boolean }> {
    const status = { beehiiv: false, naver: false };

    try {
      // beehiiv 상태 확인
      await this.parser.parseURL('https://rss.beehiiv.com/feeds/Ur0inYkjHr.xml');
      status.beehiiv = true;
    } catch (error) {
      console.error('beehiiv RSS 피드 상태 오류:', error);
    }

    return status;
  }
}

// 싱글톤 인스턴스
export const rssAggregator = new RSSAggregator();