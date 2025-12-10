import axios from 'axios';
import Parser from 'rss-parser';
import { blogPosts } from './blog-data';
import { cacheManagers } from './cache';

export interface RSSItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  author: string;
  source: 'beehiiv' | 'naver-blog' | 'tistory' | 'brunch' | 'substack' | 'local';
  category?: string;
  tags: string[];
  readTime?: string;
  featured?: boolean;
  imageUrl?: string | undefined;
  lastUpdated?: string | undefined;
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
  private readonly TISTORY_RSS_URL = 'https://family-office.tistory.com/rss';
  private readonly BRUNCH_RSS_URL = 'https://brunch.co.kr/rss/@@2fh2';
  private readonly SUBSTACK_RSS_URL = 'https://jaehong.substack.com/feed';

  private parser: Parser;
  private cachePrefix = 'rss_feed';
  private cacheDuration = 900; // 15분 (새 콘텐츠 빠른 반영)

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'contentEncoded'],
          ['description', 'description'],
          ['dc:creator', 'creator'],
        ],
      },
    });
  }

  /**
   * RSS 피드 데이터 가져오기 (헤더 처리 포함)
   */
  private async fetchFeed(url: string): Promise<any> {
    try {
      const userAgent = 'curl/7.68.0';

      const response = await axios.get(url, {
        headers: {
          'User-Agent': userAgent,
          'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1',
        },
        timeout: 5000,
        maxRedirects: 0,
        validateStatus: (status: number) => status >= 200 && status < 400
      });

      if (response.status >= 300) {
        console.warn(`Redirect detected for ${url}: ${response.status} to ${response.headers.location}`);
        if (response.headers.location) {
             const redirectResponse = await axios.get(response.headers.location, {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1',
                },
                timeout: 5000,
                maxRedirects: 0
             });
             return await this.parser.parseString(redirectResponse.data);
        }
      }

      return await this.parser.parseString(response.data);
    } catch (error) {
      console.error(`Feed fetch error for ${url}:`, error);
      throw error;
    }
  }

  // Fallback images for business/finance context
  private fallbackImages = [
    // Business & Finance
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565514020176-dbf2277f2416?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1664575602554-208c62506fca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1665686376173-ada7a0031a85?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1664575599736-c5197c91766a?auto=format&fit=crop&w=800&q=80',
    
    // Technology & Innovation
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531297461136-82bf563baa38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',

    // Architecture & City
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1435686858161-59da32dfd4b4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470075801209-17f9ec0cade6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',

    // Abstract & Minimal
    'https://images.unsplash.com/photo-1506259091721-347f798196d4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',

    // Lifestyle & Office
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  ];

  private getFallbackImage(id: string): string {
    // Generate a deterministic index based on the ID string
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash;
    }
    const index = Math.abs(hash) % this.fallbackImages.length;
    return this.fallbackImages[index]!;
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
        imageUrl: this.extractImageUrl(item) || this.getFallbackImage(this.generateId('beehiiv', item.guid || item.link || '', index)),
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
        feed = await this.fetchFeed(feedUrl);
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
        imageUrl: this.extractImageUrl(item) || this.getFallbackImage(this.generateId('naver', item.guid || item.link || '', index)),
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
   * 티스토리 블로그 RSS 피드에서 포스트 가져오기
   */
  async getTistoryPosts(blogName: string = 'family-office', limit = 10): Promise<RSSItem[]> {
    const cacheKey = `${this.cachePrefix}:tistory:${blogName}`;
    
    try {
      // 캐시 확인
      const cached = await cacheManagers.content.get<string>(cacheKey);
      if (cached) {
        return JSON.parse(cached).slice(0, limit);
      }

      // 티스토리 블로그 RSS URL
      const feedUrl = `https://${blogName}.tistory.com/rss`;
      let feed;
      try {
        feed = await this.fetchFeed(feedUrl);
      } catch (parseError) {
        console.error('티스토리 RSS 파싱 오류:', parseError);
        // 파싱 실패 시 빈 배열 반환
        return [];
      }
      
      const posts: RSSItem[] = feed.items.map((item: ParsedFeedItem, index: number) => ({
        id: this.generateId('tistory', item.guid || item.link || '', index),
        title: item.title || '제목 없음',
        content: this.extractContent(item),
        excerpt: this.generateExcerpt(item.contentSnippet || item.description || ''),
        url: item.link || '',
        publishedAt: item.pubDate || new Date().toISOString(),
        author: this.normalizeAuthorName(item.author || item.creator || '패밀리오피스 에디터'),
        source: 'tistory' as const,
        category: this.extractCategory(item.categories),
        tags: this.extractTags(item.categories || []),
        readTime: this.calculateReadTime(this.extractContent(item)),
        imageUrl: this.extractImageUrl(item) || this.getFallbackImage(this.generateId('tistory', item.guid || item.link || '', index)),
        featured: false
      }));

      // 캐시 저장
      await cacheManagers.content.set(cacheKey, JSON.stringify(posts), this.cacheDuration);

      return posts.slice(0, limit);
    } catch (error) {
      console.error('티스토리 블로그 RSS 피드 파싱 오류:', error);
      return [];
    }
  }

  /**
   * 브런치스토리 RSS 피드에서 포스트 가져오기
   */
  async getBrunchPosts(brunchId: string = 'familyoffice', limit = 10): Promise<RSSItem[]> {
    const cacheKey = `${this.cachePrefix}:brunch:${brunchId}`;
    
    try {
      // 캐시 확인
      const cached = await cacheManagers.content.get<string>(cacheKey);
      if (cached) {
        return JSON.parse(cached).slice(0, limit);
      }

      // 브런치 RSS URL (@@ID 형태)
      // familyoffice 요청 시 실제 ID인 2fh2로 매핑
      const realId = brunchId === 'familyoffice' ? '2fh2' : brunchId;
      const feedUrl = `https://brunch.co.kr/rss/@@${realId}`;
      let feed;
      try {
        feed = await this.fetchFeed(feedUrl);
      } catch (parseError) {
        console.error('브런치 RSS 파싱 오류:', parseError);
        // 파싱 실패 시 빈 배열 반환
        return [];
      }
      
      const posts: RSSItem[] = feed.items.map((item: ParsedFeedItem, index: number) => ({
        id: this.generateId('brunch', item.guid || item.link || '', index),
        title: item.title || '제목 없음',
        content: this.extractContent(item),
        excerpt: this.generateExcerpt(item.contentSnippet || item.description || ''),
        url: item.link || '',
        publishedAt: item.pubDate || new Date().toISOString(),
        author: this.normalizeAuthorName(item.author || item.creator || '패밀리오피스 에디터'),
        source: 'brunch' as const,
        category: this.extractCategory(item.categories),
        tags: this.extractTags(item.categories || []),
        readTime: this.calculateReadTime(this.extractContent(item)),
        imageUrl: this.extractImageUrl(item) || this.getFallbackImage(this.generateId('brunch', item.guid || item.link || '', index)),
        featured: false
      }));

      // 캐시 저장
      await cacheManagers.content.set(cacheKey, JSON.stringify(posts), this.cacheDuration);

      return posts.slice(0, limit);
    } catch (error) {
      console.error('브런치 RSS 피드 파싱 오류:', error);
      return [];
    }
  }

  /**
   * Substack RSS 피드에서 포스트 가져오기
   */
  async getSubstackPosts(substackId: string = 'jaehong', limit = 10): Promise<RSSItem[]> {
    const cacheKey = `${this.cachePrefix}:substack:${substackId}`;
    
    try {
      // 캐시 확인
      const cached = await cacheManagers.content.get<string>(cacheKey);
      if (cached) {
        return JSON.parse(cached).slice(0, limit);
      }

      // Substack RSS URL
      const feedUrl = `https://${substackId}.substack.com/feed`;
      let feed;
      try {
        feed = await this.fetchFeed(feedUrl);
      } catch (parseError) {
        console.error('Substack RSS 파싱 오류:', parseError);
        // 파싱 실패 시 빈 배열 반환
        return [];
      }
      
      const posts: RSSItem[] = feed.items.map((item: ParsedFeedItem, index: number) => ({
        id: this.generateId('substack', item.guid || item.link || '', index),
        title: item.title || '제목 없음',
        content: this.extractContent(item),
        excerpt: this.generateExcerpt(item.contentSnippet || item.description || ''),
        url: item.link || '',
        publishedAt: item.pubDate || new Date().toISOString(),
        author: this.normalizeAuthorName(item.author || item.creator || 'Substack Writer'),
        source: 'substack' as const,
        category: this.extractCategory(item.categories),
        tags: this.extractTags(item.categories || []),
        readTime: this.calculateReadTime(this.extractContent(item)),
        imageUrl: this.extractImageUrl(item) || this.getFallbackImage(this.generateId('substack', item.guid || item.link || '', index)),
        featured: false
      }));

      // 캐시 저장
      await cacheManagers.content.set(cacheKey, JSON.stringify(posts), this.cacheDuration);

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Substack RSS 피드 파싱 오류:', error);
      return [];
    }
  }

  /**
   * 로컬 블로그 포스트 가져오기 (lib/blog-data.ts)
   */
  async getLocalPosts(limit = 10): Promise<RSSItem[]> {
    try {
      const posts = Object.values(blogPosts).map(post => ({
        id: post.id || post.slug,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        url: `/insights/market-intelligence/${post.slug}`,
        publishedAt: new Date(post.date).toISOString(),
        author: post.author || 'Editor',
        source: 'local' as const,
        category: post.category,
        tags: post.tags || [],
        readTime: post.readTime,
        imageUrl: post.image,
        featured: post.featured ?? false,
        lastUpdated: post.lastUpdated
      }));

      // 날짜순 정렬
      return posts
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('로컬 포스트 가져오기 오류:', error);
      return [];
    }
  }

  /**
   * 통합 콘텐츠 가져오기 (beehiiv + 네이버 블로그 + 로컬 포스트)
   */
  async getIntegratedContent(naverBlogId?: string, limit = 20): Promise<RSSItem[]> {
    try {
      const promises: Promise<RSSItem[]>[] = [
        this.getBeehiivPosts(limit / 2),
        this.getLocalPosts(limit)
      ];

      if (naverBlogId) {
        promises.push(this.getNaverBlogPosts(naverBlogId, limit / 2));
      }

      // 티스토리 추가 (기본값: family-office)
      promises.push(this.getTistoryPosts('family-office', limit / 2));

      // 브런치 추가 (기본값: familyoffice)
      promises.push(this.getBrunchPosts('familyoffice', limit / 2));

      // Substack 추가 (기본값: jaehong)
      promises.push(this.getSubstackPosts('jaehong', limit / 2));

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
  async getContentBySource(source: 'beehiiv' | 'naver-blog' | 'tistory' | 'brunch' | 'substack' | 'local', identifier?: string, limit = 10): Promise<RSSItem[]> {
    if (source === 'beehiiv') {
      return this.getBeehiivPosts(limit);
    } else if (source === 'naver-blog' && identifier) {
      return this.getNaverBlogPosts(identifier, limit);
    } else if (source === 'local') {
      return this.getLocalPosts(limit);
    } else if (source === 'tistory') {
      return this.getTistoryPosts(identifier || 'family-office', limit);
    } else if (source === 'brunch') {
      return this.getBrunchPosts(identifier || 'familyoffice', limit);
    } else if (source === 'substack') {
      return this.getSubstackPosts(identifier || 'jaehong', limit);
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
    // 고유한 ID를 생성하기 위해 hash 함수 사용
    const base = guid || `${source}-${index}-${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      const char = base.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // 음수를 양수로 변환하고 hex로 변환
    const hashHex = Math.abs(hash).toString(36);
    return `${source}-${hashHex}-${index}`;
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
  async checkFeedHealth(): Promise<{ beehiiv: boolean; naver?: boolean; tistory?: boolean; brunch?: boolean; substack?: boolean }> {
    const status = { beehiiv: false, naver: false, tistory: false, brunch: false, substack: false };

    try {
      // beehiiv 상태 확인
      await this.fetchFeed('https://rss.beehiiv.com/feeds/Ur0inYkjHr.xml');
      status.beehiiv = true;
    } catch (error) {
      console.error('beehiiv RSS 피드 상태 오류:', error);
    }

    try {
      // 티스토리 상태 확인
      await this.fetchFeed('https://family-office.tistory.com/rss');
      status.tistory = true;
    } catch (error) {
      console.error('티스토리 RSS 피드 상태 오류:', error);
    }

    try {
      // 브런치 상태 확인
      await this.fetchFeed('https://brunch.co.kr/rss/@@2fh2');
      status.brunch = true;
    } catch (error) {
      console.error('브런치 RSS 피드 상태 오류:', error);
    }

    try {
      // Substack 상태 확인
      await this.fetchFeed('https://jaehong.substack.com/feed');
      status.substack = true;
    } catch (error) {
      console.error('Substack RSS 피드 상태 오류:', error);
    }

    return status;
  }
}

// 싱글톤 인스턴스
export const rssAggregator = new RSSAggregator();