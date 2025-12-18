
/**
 * Serper.dev API Client
 * Google Search API for AI Rankings
 */

const SERPER_API_URL = 'https://google.serper.dev/search';

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

export async function searchSerper(query: string, gl: string = 'kr', hl: string = 'ko'): Promise<SerperResponse | null> {
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
        gl: gl, // Country
        hl: hl, // Language
        num: 20 // Check top 20
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
