/**
 * Serper.dev API Client
 * Google 검색 순위 데이터 수집
 *
 * 필요 환경 변수:
 * - SERPER_API_KEY: Serper.dev API 키
 */

const SERPER_API_URL = 'https://google.serper.dev/search';

/**
 * Serper API 검색 결과 인터페이스
 */
export interface SerperResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
  date?: string;
  sitelinks?: any[];
}

export interface SerperResponse {
  searchParameters: any;
  organic: SerperResult[];
  peopleAlsoAsk?: any[];
  relatedSearches?: any[];
}

/**
 * Serper API로 Google 검색 수행
 */
export async function searchSerper(
  query: string,
  gl: string = 'kr',
  hl: string = 'ko'
): Promise<SerperResponse | null> {
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey) {
    console.error('SERPER_API_KEY is missing');
    return null;
  }

  try {
    const response = await fetch(SERPER_API_URL, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: query,
        gl: gl,
        hl: hl,
        num: 20
      })
    });

    if (!response.ok) {
      throw new Error(`Serper API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Serper search failed:', error);
    return null;
  }
}

/**
 * 특정 도메인의 검색 순위 확인
 */
export async function checkDomainRanking(
  keyword: string,
  domain: string,
  options: {
    country?: string;
    language?: string;
  } = {}
): Promise<{
  found: boolean;
  position: number | null;
  url: string | null;
  title: string | null;
  snippet: string | null;
}> {
  const { country = 'kr', language = 'ko' } = options;
  const result = await searchSerper(keyword, country, language);

  if (!result || !result.organic) {
    return {
      found: false,
      position: null,
      url: null,
      title: null,
      snippet: null,
    };
  }

  // 도메인 매칭 (서브도메인 포함)
  const matchedResult = result.organic.find(item =>
    item.link.includes(domain)
  );

  if (matchedResult) {
    return {
      found: true,
      position: matchedResult.position,
      url: matchedResult.link,
      title: matchedResult.title,
      snippet: matchedResult.snippet,
    };
  }

  return {
    found: false,
    position: null,
    url: null,
    title: null,
    snippet: null,
  };
}

/**
 * 배치로 여러 키워드 검색 (Rate Limit 고려)
 */
export async function batchSearch(
  keywords: string[],
  domain: string,
  options: {
    country?: string;
    language?: string;
    delayMs?: number; // 각 요청 간 대기 시간 (기본: 1000ms)
  } = {}
): Promise<Array<{
  keyword: string;
  found: boolean;
  position: number | null;
  url: string | null;
  timestamp: string;
}>> {
  const { delayMs = 1000, ...searchOptions } = options;
  const results = [];

  for (const keyword of keywords) {
    try {
      const ranking = await checkDomainRanking(keyword, domain, searchOptions);

      results.push({
        keyword,
        found: ranking.found,
        position: ranking.position,
        url: ranking.url,
        timestamp: new Date().toISOString(),
      });

      // Rate limit 방지를 위한 대기
      if (keywords.indexOf(keyword) < keywords.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`키워드 "${keyword}" 검색 실패:`, error);
      results.push({
        keyword,
        found: false,
        position: null,
        url: null,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return results;
}

/**
 * Serper API 연결 상태 확인
 */
export async function checkSerperConnection(): Promise<boolean> {
  try {
    const result = await searchSerper('test');
    return result !== null;
  } catch (error) {
    console.error('Serper 연결 확인 실패:', error);
    return false;
  }
}

/**
 * AI 검색엔진별 검색 결과 분석
 */
export interface AIEnginePresence {
  engine: string;
  present: boolean;
  position?: number;
  snippet?: string;
}

export async function checkAIEnginePresence(
  keyword: string
): Promise<AIEnginePresence[]> {
  const result = await searchSerper(keyword);

  if (!result || !result.organic) {
    return [];
  }

  // AI 검색엔진 도메인 매핑
  const aiEngines = [
    { engine: 'ChatGPT', domains: ['chat.openai.com', 'chatgpt.com'] },
    { engine: 'Perplexity', domains: ['perplexity.ai'] },
    { engine: 'Claude', domains: ['claude.ai'] },
    { engine: 'Gemini', domains: ['gemini.google.com', 'bard.google.com'] },
    { engine: 'Bing Copilot', domains: ['bing.com/chat', 'copilot.microsoft.com'] },
  ];

  const presence: AIEnginePresence[] = [];

  for (const { engine, domains } of aiEngines) {
    const match = result.organic.find(item =>
      domains.some(domain => item.link.includes(domain))
    );

    presence.push({
      engine,
      present: !!match,
      position: match?.position,
      snippet: match?.snippet,
    });
  }

  return presence;
}
