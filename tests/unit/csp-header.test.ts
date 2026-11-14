/**
 * 운영 CSP(next.config.mjs)가 HubSpot 추적 스크립트와 blob worker 를 막지 않는지 확인한다.
 * js.hs-scripts.com 로더는 js-na2.hs-scripts.com 으로 리다이렉트된 뒤
 * *.hscollectedforms.net · *.hs-analytics.net · *.hs-banner.com 스크립트를 불러오고,
 * collected-forms 는 forms-<hublet>.hsforms.com 으로 제출하며 static.hsappstatic.net 에서 자산을 받는다.
 */
import { readFileSync } from 'fs';
import path from 'path';

function productionDirectives(): Map<string, string[]> {
  const source = readFileSync(
    path.join(process.cwd(), 'next.config.mjs'),
    'utf8'
  );
  const match = source.match(/: "(default-src 'self'; [^"]+)"/);
  const policy = match?.[1];
  if (!policy)
    throw new Error('운영 CSP 문자열을 next.config.mjs 에서 찾지 못했습니다');

  return new Map(
    policy
      .split(';')
      .map(d => d.trim().split(/\s+/))
      .filter(tokens => tokens[0])
      .map(([name, ...sources]) => [name, sources] as [string, string[]])
  );
}

describe('운영 Content-Security-Policy', () => {
  const directives = productionDirectives();

  it.each([
    'https://*.hs-scripts.com',
    'https://*.hs-analytics.net',
    'https://*.hs-banner.com',
    'https://*.hscollectedforms.net',
    'https://static.hsappstatic.net',
  ])('script-src 가 HubSpot 스크립트 호스트 %s 를 허용한다', host => {
    expect(directives.get('script-src')).toContain(host);
  });

  it.each([
    'https://*.hubspot.com',
    'https://*.hubapi.com',
    'https://*.hscollectedforms.net',
    'https://*.hsforms.com',
  ])('connect-src 가 HubSpot 수집 호스트 %s 를 허용한다', host => {
    expect(directives.get('connect-src')).toContain(host);
  });

  it('img-src 가 HubSpot 추적 픽셀을 허용한다', () => {
    expect(directives.get('img-src')).toContain('https://*.hubspot.com');
  });

  it("worker-src 가 'self' 와 blob: 만 허용한다", () => {
    expect(directives.get('worker-src')).toEqual(["'self'", 'blob:']);
  });

  it('지시어마다 같은 출처가 중복되지 않는다', () => {
    for (const [name, sources] of directives) {
      expect({
        name,
        dupes: sources.filter((s, i) => sources.indexOf(s) !== i),
      }).toEqual({
        name,
        dupes: [],
      });
    }
  });
});
