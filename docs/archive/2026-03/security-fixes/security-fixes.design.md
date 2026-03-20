# Design: security-fixes

> FamilyOffice 보안 취약점 수정 - 상세 설계

## 개요

| 항목 | 내용 |
|------|------|
| Feature | security-fixes |
| Plan 참조 | `docs/01-plan/features/security-fixes.plan.md` |
| 작성일 | 2026-03-20 |
| 수정 대상 파일 | 10+ 파일 |
| 신규 파일 | 0 |
| 삭제 파일 | 1 (`lib/security/rate-limiter.ts`) |

---

## 1. 이메일 API XSS 수정

### 대상 파일
- `app/api/email/send/route.ts` (라인 78-91)

### 현재 코드 (문제)
```typescript
// 라인 83: 사용자 입력이 HTML에 직접 삽입
${data.message.replace(/\n/g, '<br>')}
```

### 수정 설계
```typescript
// sanitizeHTMLContent()는 async 함수이므로 await 필요
import { sanitizeHTMLContent } from '@/lib/security/html-sanitizer';

// case 'custom' 블록 내부:
const sanitizedMessage = await sanitizeHTMLContent(data.message);
const formattedMessage = sanitizedMessage.replace(/\n/g, '<br>');

// HTML 템플릿에서:
${formattedMessage}
```

### 변경 요약
- `sanitizeHTMLContent()` import 추가
- `data.message` → DOMPurify sanitize 후 `<br>` 변환
- 기존 `isomorphic-dompurify` 의존성 활용 (추가 설치 불필요)

---

## 2. dangerouslySetInnerHTML sanitize 적용

### 대상 파일
- `app/insights/[slug]/page.tsx` (라인 337-339) — **블로그 본문 콘텐츠**
- `app/insights/external/[source]/[slug]/page.tsx` (라인 195, 342) — **외부 인사이트 콘텐츠**

### 현재 코드 (문제)
```typescript
// insights/[slug]/page.tsx:337-339
dangerouslySetInnerHTML={{
  __html: post.content.replace(/\n/g, '<br/>'),
}}
```

### 수정 설계

이 페이지는 Server Component이므로 `sanitizeHTMLContent()`를 직접 `await` 호출 가능.

```typescript
// Server Component 내부에서 직접 호출
import { sanitizeHTMLContent } from '@/lib/security/html-sanitizer';

// 렌더링 전에 sanitize
const sanitizedContent = await sanitizeHTMLContent(post.content);

// JSX에서:
dangerouslySetInnerHTML={{
  __html: sanitizedContent.replace(/\n/g, '<br/>'),
}}
```

### 제외 대상 (안전)
다음은 `JSON.stringify()`를 통해 직렬화된 JSON-LD 스키마이므로 XSS 위험 없음:
- `app/insights/[slug]/page.tsx:225,285,517` — Article/Breadcrumb/FAQ 스키마
- `app/blog/*/page.tsx` — FAQ 스키마
- `app/client-page.tsx:63,76` — GTM 스크립트 (아래 #6에서 별도 처리)
- `app/recruit/page.tsx`, `app/serious-accident-law/page.tsx` — JSON-LD 스키마

---

## 3. Rate Limiter 통합

### 현재 상태
| 파일 | 줄 수 | 미들웨어 사용 | 비고 |
|------|-------|-------------|------|
| `lib/rate-limit.ts` | ~400 | **사용 중** (`middleware.ts:8`) | Redis + memory fallback |
| `lib/security/rate-limiter.ts` | ~410 | **미사용** | 독립 구현, 중복 |

### 수정 설계

1. `lib/security/rate-limiter.ts`에서 import하는 파일이 있는지 확인
2. 참조가 없으면 파일 삭제
3. 참조가 있으면 `lib/rate-limit.ts`에서 re-export하도록 변경

### 사전 확인 필요
```bash
grep -r "rate-limiter" --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v ".next"
```

---

## 4. 모듈 레벨 setInterval 제거

### 대상 파일 및 라인

| 파일 | 라인 | 용도 |
|------|------|------|
| `lib/rate-limit.ts` | 69 | `cleanupMemoryStore` (5분마다) |
| `lib/cache.ts` | 486 | 캐시 만료 정리 |
| `lib/security/rate-limiter.ts` | 174 | 메모리 스토어 정리 (삭제 예정) |

### 수정 설계: Lazy Cleanup 패턴

```typescript
// Before: 모듈 레벨 setInterval
setInterval(cleanupMemoryStore, 5 * 60 * 1000);

// After: 요청 시 만료 체크 (lazy cleanup)
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000;

function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    lastCleanup = now;
    cleanupMemoryStore();
  }
}

// rate limit 체크 함수 내부에서 호출
export async function globalRateLimit(request: NextRequest) {
  maybeCleanup();  // 요청 시마다 체크
  // ... 기존 로직
}
```

### 범위 제한
- `lib/rate-limit.ts`와 `lib/cache.ts`만 수정 (미들웨어가 직접 사용)
- `lib/performance/`, `lib/seo/`, `lib/financial/` 등의 setInterval은 Out of Scope
  - 이 파일들은 대부분 미사용 코드이거나 별도 정리 필요

---

## 5. GTM ID 환경변수 통합

### 대상 파일 (4파일)
1. `components/analytics/external-scripts.tsx`
2. `components/analytics/analytics.tsx`
3. `app/client-page.tsx`
4. `components/analytics/client-scripts.tsx`

### 현재 코드
```typescript
// 하드코딩된 GTM ID가 4파일에 분산
'GTM-MP3HPPMN'
```

### 수정 설계
```typescript
// 환경변수 참조로 변경
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// 각 파일에서:
// Before: 'GTM-MP3HPPMN'
// After: GTM_ID (또는 process.env.NEXT_PUBLIC_GTM_ID)
```

### 필요 작업
- `.env.local`에 `NEXT_PUBLIC_GTM_ID=GTM-MP3HPPMN` 추가
- `.env.example`에도 추가
- Vercel 환경변수에도 설정 필요 (배포 시)

---

## 6. `as any` 타입 안전성 복원

### 대상 파일
- `app/api/leads/capture/route.ts` (10개소)

### 수정 설계

Supabase 클라이언트에 Database 제네릭이 없어서 `as any`를 사용 중.
근본 해결은 Database 타입 생성이나 이는 Out of Scope.

**현실적 접근**: `as any` → 명시적 타입 단언으로 전환

```typescript
// Before:
const { data, error } = (await supabase.from('leads')
  .select('*')
  .eq('email', email)
  .single()) as any;

// After: 구체적 타입 정의
interface LeadRow {
  id: string;
  email: string;
  name: string;
  score: number;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
}

const { data, error } = await supabase
  .from('leads')
  .select('*')
  .eq('email', email)
  .single() as { data: LeadRow | null; error: unknown };
```

---

## 7. 공개 API 봇 방어

### 대상 파일
- `app/api/leads/capture/route.ts`
- `app/api/newsletter/subscribe/route.ts` (존재 확인 필요)

### 수정 설계

**Phase 1 (이번 PDCA 범위)**: 서버 측 허니팟 + 속도 검증

```typescript
// 요청 스키마에 허니팟 필드 추가
const leadSchema = z.object({
  // 기존 필드...
  _hp: z.string().max(0).optional(),  // 허니팟: 비어있어야 정상
  _ts: z.number().optional(),         // 폼 로드 타임스탬프
});

// 검증 로직
if (data._hp) {
  // 봇이 자동으로 필드를 채움 → 조용히 성공 응답 (봇에게 피드백 안 줌)
  return NextResponse.json({ success: true });
}

if (data._ts && Date.now() - data._ts < 2000) {
  // 2초 미만에 제출 → 봇 의심
  return NextResponse.json({ success: true });
}
```

**Phase 2 (향후)**: Cloudflare Turnstile 토큰 검증 (프론트엔드 연동 필요, Out of Scope)

---

## 구현 순서 (의존성 기반)

```
Step 1: 이메일 API XSS 수정 (#1)
  └─ 독립적, 즉시 가능

Step 2: insights dangerouslySetInnerHTML sanitize (#2)
  └─ #1과 동일 패턴

Step 3: Rate Limiter 참조 확인 및 삭제 (#3)
  └─ 참조 확인 필요

Step 4: setInterval → lazy cleanup (#4)
  └─ #3 완료 후 (rate-limiter.ts 삭제 확인)

Step 5: GTM ID 환경변수 통합 (#5)
  └─ 독립적

Step 6: as any 타입 복원 (#6)
  └─ 독립적

Step 7: 공개 API 봇 방어 (#7)
  └─ 독립적
```

## 영향 범위

| 변경 | 영향 범위 | 테스트 방법 |
|------|-----------|-------------|
| 이메일 API sanitize | 관리자 커스텀 이메일 전송 | 수동: `/api/email/send` POST |
| insights sanitize | 블로그 본문 렌더링 | 수동: 인사이트 페이지 확인 |
| Rate Limiter 삭제 | 미들웨어 rate limiting | `npm run lint && npm run typecheck` |
| setInterval 제거 | 메모리 캐시 정리 | lint + typecheck |
| GTM ID | GA/GTM 추적 | 수동: GA 실시간 보고서 |
| as any 제거 | 리드 캡처 API | typecheck |
| 봇 방어 | 리드 폼 제출 | 수동: 폼 테스트 |

## 검증 기준

```bash
# 모든 변경 후 반드시 통과
npm run lint        # 에러 0건
npm run typecheck   # 에러 0건

# XSS 검증
grep -rn "\.replace.*<br" app/api/email/ --include="*.ts"
# → sanitizeHTMLContent 호출 후에만 replace 사용

# setInterval 검증 (범위 내 파일만)
grep -n "setInterval" lib/rate-limit.ts lib/cache.ts
# → 0건

# GTM 하드코딩 검증
grep -rn "GTM-MP3HPPMN" --include="*.ts" --include="*.tsx" | grep -v node_modules
# → 0건

# as any 검증
grep -n "as any" app/api/leads/capture/route.ts
# → 0건
```

## 다음 단계

→ `/pdca do security-fixes` 로 구현 시작
