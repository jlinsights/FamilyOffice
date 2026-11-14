/**
 * 성능 모니터가 방문자 브라우저에서 외부 출처로 요청을 보내지 않는지 확인한다.
 * 운영 CSP 의 connect-src 는 외부 CDN 을 허용하지 않으므로, 외부 핑은 늘 막혀
 * 5000ms 쓰레기 값만 남기고 콘솔에 CSP 위반을 찍었다.
 */
import { koreanPerformanceMonitor } from '@/lib/korean-performance-monitor';

describe('koreanPerformanceMonitor 지역 지연 측정', () => {
  const originalFetch = global.fetch;
  let requested: string[];

  const originalTimeout = AbortSignal.timeout;

  beforeEach(() => {
    requested = [];
    // jsdom 에는 AbortSignal.timeout 이 없어 fetch 전에 예외가 난다
    AbortSignal.timeout = () => new AbortController().signal;
    global.fetch = jest.fn((input: RequestInfo | URL) => {
      requested.push(String(input));
      return Promise.resolve(new Response(null, { status: 200 }));
    }) as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    AbortSignal.timeout = originalTimeout;
  });

  it('같은 출처 경로로만 요청하고 international 항목을 내지 않는다', async () => {
    const regionLatency = await (
      koreanPerformanceMonitor as unknown as {
        measureRegionLatency: () => Promise<Record<string, number>>;
      }
    ).measureRegionLatency();

    expect(requested.length).toBeGreaterThan(0);
    for (const url of requested) {
      expect(url.startsWith('/')).toBe(true);
    }
    expect(Object.keys(regionLatency).sort()).toEqual(['busan', 'seoul']);
  });
});
