import { BlogCategory, BlogPost } from '@/types/blog';

// FamilyOffice S 블로그 카테고리 (완전 한국어)
export const blogCategories: BlogCategory[] = [
  {
    name: '패밀리오피스',
    slug: 'family-office',
    icon: 'Target',
    count: 1,
    description: '가족자산관리와 패밀리오피스 구축 전략',
  },
  {
    name: '투자전략',
    slug: 'investment-strategy',
    icon: 'TrendingUp',
    count: 3,
    description: '포트폴리오 최적화와 투자 전략 가이드',
  },
  {
    name: '세무최적화',
    slug: 'tax-optimization',
    icon: 'FileText',
    count: 2,
    description: '상속세 절세와 세무 구조 개선 전략',
  },
  {
    name: '자산관리',
    slug: 'asset-management',
    icon: 'BarChart3',
    count: 4,
    description: '통합자산관리 및 위험관리 솔루션',
  },
  {
    name: '승계전략',
    slug: 'succession-planning',
    icon: 'Users',
    count: 2,
    description: '기업승계와 차세대 경영진 준비',
  },
  {
    name: '디지털혁신',
    slug: 'digital-innovation',
    icon: 'Cpu',
    count: 1,
    description: '핀테크와 디지털 자산관리 기술',
  },
  {
    name: '기업승계 분석',
    slug: 'business-succession-analysis',
    icon: 'Building',
    count: 2,
    description: '가업승계 성공 요인과 중견기업 승계 전략',
  },
  {
    name: '세무·법무 인사이트',
    slug: 'tax-legal-insights',
    icon: 'Scale',
    count: 3,
    description: '상속세법 개정과 가족기업 지배구조 최적화',
  },
  {
    name: '글로벌 트렌드',
    slug: 'global-trends',
    icon: 'Globe',
    count: 2,
    description: '해외 패밀리오피스 동향과 글로벌 자산관리 전략',
  },
  {
    name: '자산관리 전략',
    slug: 'asset-management-strategy',
    icon: 'Briefcase',
    count: 2,
    description: '고액자산가 포트폴리오 구성과 대체투자 기회',
  },
  {
    name: '리스크관리',
    slug: 'risk-management',
    icon: 'Shield',
    count: 1,
    description: 'CEO 리스크 관리와 기업보호 전략',
  },
  {
    name: '의료법인',
    slug: 'medical-corporation',
    icon: 'Stethoscope',
    count: 1,
    description: '병원경영과 의료법인 최적화 전략',
  },
  {
    name: '법인자산',
    slug: 'corporate-assets',
    icon: 'CreditCard',
    count: 2,
    description: '법인자산 활용과 배당 최적화',
  },
  {
    name: '세무',
    slug: 'tax-affairs',
    icon: 'Calculator',
    count: 1,
    description: '세무전략과 절세 방안',
  },
];

// 블로그 포스트 메타데이터 (메타 정보만 포함, content 제외)
export interface BlogPostMeta {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  featured?: boolean;
}

// 모든 블로그 포스트의 메타데이터
export const blogPostsMeta: BlogPostMeta[] = [
  {
    id: 'family-office-basics-guide',
    title: '패밀리오피스란 무엇인가',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
    excerpt:
      '과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있습니다.',
    category: '패밀리오피스',
    author: '임재홍',
    date: '2025-08-13',
    readTime: '12분',
    tags: ['패밀리오피스', '가업승계', '자산관리', '상속세', '중견기업'],
    slug: 'family-office-basics-guide',
    featured: true,
  },
  // 추가 포스트는 기존 blog-data.ts에서 메타데이터만 추출하여 추가
];

/**
 * 동적으로 블로그 포스트 전체 데이터 로드
 * @param slug - 블로그 포스트 slug
 * @returns 전체 BlogPost 객체 (content 포함)
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // 동적 임포트로 필요한 포스트만 로드
    const postModule = await import(`./posts/${slug}`);
    return postModule.default;
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    return null;
  }
}

/**
 * 모든 블로그 포스트 메타데이터 가져오기
 */
export function getAllBlogPostsMeta(): BlogPostMeta[] {
  return blogPostsMeta;
}

/**
 * 카테고리별 블로그 포스트 메타데이터
 */
export function getBlogPostsByCategory(category: string): BlogPostMeta[] {
  return blogPostsMeta.filter(post => post.category === category);
}

/**
 * Featured 블로그 포스트
 */
export function getFeaturedPosts(): BlogPostMeta[] {
  return blogPostsMeta.filter(post => post.featured);
}
