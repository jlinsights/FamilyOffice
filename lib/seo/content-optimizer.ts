/**
 * SEO 컨텐츠 최적화 시스템
 * 키워드 밀도, 내부링크, 컨텐츠 구조 최적화
 */

export interface ContentAnalysis {
  wordCount: number;
  keywordDensity: Record<string, number>;
  readabilityScore: number;
  headingStructure: HeadingStructure[];
  internalLinks: InternalLink[];
  externalLinks: ExternalLink[];
  recommendations: string[];
}

export interface HeadingStructure {
  level: number;
  text: string;
  id?: string;
  keywords: string[];
}

export interface InternalLink {
  text: string;
  url: string;
  context: string;
  relevanceScore: number;
}

export interface ExternalLink {
  text: string;
  url: string;
  domain: string;
  rel: string;
}

/**
 * 내부 링크 전략
 */
export const INTERNAL_LINK_STRATEGY = {
  // 허브 페이지 (높은 우선순위)
  hubPages: [
    {
      url: '/services',
      title: '패밀리오피스 서비스',
      keywords: ['패밀리오피스', '자산관리서비스', '프라이빗뱅킹'],
      priority: 'high',
      linkCount: 15 // 목표 내부링크 수
    },
    {
      url: '/business-succession-strategy', 
      title: '기업승계 전략',
      keywords: ['기업승계', '가업승계', '승계계획'],
      priority: 'high',
      linkCount: 12
    },
    {
      url: '/tax-strategy',
      title: '세무최적화 전략',
      keywords: ['세무최적화', '절세전략', '상속세', '증여세'],
      priority: 'high', 
      linkCount: 10
    }
  ],

  // 지원 페이지 (중간 우선순위)
  supportPages: [
    {
      url: '/corporate-life-insurance',
      title: '기업임원 생명보험',
      keywords: ['기업임원 생명보험', 'CEO 보험설계'],
      priority: 'medium',
      linkCount: 8
    },
    {
      url: '/key-person-insurance',
      title: '핵심인력보험',
      keywords: ['핵심인력보험', '기업 리스크 관리'],
      priority: 'medium',
      linkCount: 6
    },
    {
      url: '/program',
      title: 'CEO 교육 프로그램',
      keywords: ['CEO 교육', '자산관리 교육'],
      priority: 'medium',
      linkCount: 8
    }
  ],

  // 컨텐츠 페이지 (낮은 우선순위)
  contentPages: [
    {
      url: '/blog',
      title: '자산관리 인사이트',
      keywords: ['자산관리 블로그', '투자 인사이트'],
      priority: 'low',
      linkCount: 5
    },
    {
      url: '/insights',
      title: '마켓 인텔리전스',
      keywords: ['마켓 인텔리전스', '시장분석'],
      priority: 'low',
      linkCount: 4
    }
  ]
};

/**
 * 컨텐츠 분석
 */
export function analyzeContent(content: string, targetKeywords: string[]): ContentAnalysis {
  const words = content.toLowerCase().split(/\s+/).filter(word => word.length > 1);
  const wordCount = words.length;

  // 키워드 밀도 계산
  const keywordDensity: Record<string, number> = {};
  targetKeywords.forEach(keyword => {
    const keywordCount = words.filter(word => 
      word.includes(keyword.toLowerCase())
    ).length;
    keywordDensity[keyword] = (keywordCount / wordCount) * 100;
  });

  // 가독성 점수 (Flesch Reading Ease 근사치)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = wordCount / sentences.length;
  const avgSyllablesPerWord = 2.5; // 한국어 평균 음절수 근사치
  const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  // 제목 구조 분석
  const headingStructure = extractHeadingStructure(content);

  // 링크 분석
  const { internalLinks, externalLinks } = extractLinks(content);

  // 최적화 권장사항
  const recommendations = generateRecommendations({
    wordCount,
    keywordDensity,
    readabilityScore,
    headingStructure,
    internalLinks
  });

  return {
    wordCount,
    keywordDensity,
    readabilityScore,
    headingStructure,
    internalLinks,
    externalLinks,
    recommendations
  };
}

/**
 * 제목 구조 추출
 */
function extractHeadingStructure(content: string): HeadingStructure[] {
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]+)<\/h[1-6]>/gi;
  const headings: HeadingStructure[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1] || '1');
    const id = match[2] || '';
    const text = (match[3] || '').trim();
    const keywords = extractKeywordsFromText(text);

    headings.push({
      level,
      text,
      id,
      keywords
    });
  }

  return headings;
}

/**
 * 링크 추출
 */
function extractLinks(content: string): { internalLinks: InternalLink[], externalLinks: ExternalLink[] } {
  const linkRegex = /<a[^>]+href="([^"]*)"[^>]*>([^<]+)<\/a>/gi;
  const internalLinks: InternalLink[] = [];
  const externalLinks: ExternalLink[] = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1] || '';
    const text = (match[2] || '').trim();
    const context = extractLinkContext(content, match.index || 0);

    if (url && (url.startsWith('/') || url.includes('familyoffices.vip'))) {
      // 내부 링크
      const relevanceScore = calculateLinkRelevance(text, context);
      internalLinks.push({
        text,
        url,
        context,
        relevanceScore
      });
    } else if (url) {
      // 외부 링크
      const domain = new URL(url).hostname;
      const rel = url.includes('nofollow') ? 'nofollow' : 'follow';
      externalLinks.push({
        text,
        url,
        domain,
        rel
      });
    }
  }

  return { internalLinks, externalLinks };
}

/**
 * 텍스트에서 키워드 추출
 */
function extractKeywordsFromText(text: string): string[] {
  const commonKeywords = [
    '패밀리오피스', '자산관리', '기업승계', '세무최적화', '생명보험',
    'CEO', '투자', '절세', '상속세', '증여세', '리스크관리'
  ];

  return commonKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * 링크 맥락 추출
 */
function extractLinkContext(content: string, linkIndex: number): string {
  const start = Math.max(0, linkIndex - 100);
  const end = Math.min(content.length, linkIndex + 100);
  return content.substring(start, end).replace(/<[^>]*>/g, '');
}

/**
 * 링크 관련성 점수 계산
 */
function calculateLinkRelevance(linkText: string, context: string): number {
  const keywords = ['패밀리오피스', '자산관리', '기업승계', '세무', '보험'];
  let score = 0;

  keywords.forEach(keyword => {
    if (linkText.toLowerCase().includes(keyword.toLowerCase())) score += 2;
    if (context.toLowerCase().includes(keyword.toLowerCase())) score += 1;
  });

  return Math.min(score, 10) / 10; // 0-1 사이로 정규화
}

/**
 * 최적화 권장사항 생성
 */
function generateRecommendations(analysis: {
  wordCount: number;
  keywordDensity: Record<string, number>;
  readabilityScore: number;
  headingStructure: HeadingStructure[];
  internalLinks: InternalLink[];
}): string[] {
  const recommendations: string[] = [];

  // 글자 수 권장사항
  if (analysis.wordCount < 300) {
    recommendations.push('컨텐츠 길이를 300단어 이상으로 늘리세요. (현재: ' + analysis.wordCount + '단어)');
  } else if (analysis.wordCount > 2000) {
    recommendations.push('컨텐츠가 너무 깁니다. 가독성을 위해 2000단어 이하로 줄이는 것을 고려하세요.');
  }

  // 키워드 밀도 권장사항
  Object.entries(analysis.keywordDensity).forEach(([keyword, density]) => {
    if (density < 0.5) {
      recommendations.push(`"${keyword}" 키워드 밀도가 낮습니다. (${density.toFixed(1)}%) 더 자연스럽게 포함시키세요.`);
    } else if (density > 3) {
      recommendations.push(`"${keyword}" 키워드 밀도가 높습니다. (${density.toFixed(1)}%) 키워드 스터핑을 피하세요.`);
    }
  });

  // 제목 구조 권장사항
  if (analysis.headingStructure.length === 0) {
    recommendations.push('H1, H2, H3 태그를 사용하여 컨텐츠 구조를 개선하세요.');
  }

  const h1Count = analysis.headingStructure.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    recommendations.push('H1 태그를 추가하세요.');
  } else if (h1Count > 1) {
    recommendations.push('H1 태그는 페이지당 하나만 사용하세요.');
  }

  // 내부 링크 권장사항
  if (analysis.internalLinks.length < 3) {
    recommendations.push('관련 페이지로의 내부 링크를 더 추가하세요. (현재: ' + analysis.internalLinks.length + '개)');
  }

  // 가독성 권장사항
  if (analysis.readabilityScore < 60) {
    recommendations.push('문장을 더 짧고 간결하게 만들어 가독성을 향상시키세요.');
  }

  return recommendations;
}

/**
 * 자동 내부 링크 생성
 */
export function generateInternalLinks(content: string, currentUrl: string): string {
  let optimizedContent = content;

  // 관련 페이지 매핑
  const linkMappings = {
    '패밀리오피스': '/services',
    '기업승계': '/business-succession-strategy',
    '세무최적화': '/tax-strategy',
    '절세전략': '/tax-strategy',
    '자산관리': '/services',
    '생명보험': '/corporate-life-insurance',
    '리스크관리': '/key-person-insurance',
    'CEO 교육': '/program'
  };

  Object.entries(linkMappings).forEach(([keyword, url]) => {
    if (url !== currentUrl && !optimizedContent.includes(`href="${url}"`)) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      let hasReplaced = false;
      
      optimizedContent = optimizedContent.replace(regex, (match) => {
        if (!hasReplaced) {
          hasReplaced = true;
          return `<a href="${url}" title="${keyword} 자세히 보기">${match}</a>`;
        }
        return match;
      });
    }
  });

  return optimizedContent;
}

/**
 * 메타 키워드 생성
 */
export function generateMetaKeywords(content: string, targetKeywords: string[]): string[] {
  const analysis = analyzeContent(content, targetKeywords);
  
  // 키워드 밀도 기준으로 정렬
  const sortedKeywords = Object.entries(analysis.keywordDensity)
    .sort(([,a], [,b]) => b - a)
    .map(([keyword]) => keyword);

  // 상위 5개 키워드 + 타겟 키워드
  const metaKeywords = [...new Set([...sortedKeywords.slice(0, 5), ...targetKeywords])];
  
  return metaKeywords.slice(0, 10); // 최대 10개
}

const contentOptimizer = {
  INTERNAL_LINK_STRATEGY,
  analyzeContent,
  generateInternalLinks,
  generateMetaKeywords
};

export default contentOptimizer;