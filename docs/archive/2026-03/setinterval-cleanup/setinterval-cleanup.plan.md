# Plan: setinterval-cleanup

> 서버리스 환경 부적합 setInterval 제거/교체

## 개요

| 항목 | 내용 |
|------|------|
| Feature | setinterval-cleanup |
| 작성일 | 2026-03-21 |
| 우선순위 | MEDIUM |
| 예상 범위 | 8개 파일, 13건 setInterval |

## 배경

Vercel 서버리스 환경에서 `setInterval`은:
- 인스턴스 간 공유 불가 (각 요청마다 새 인스턴스)
- cold start 시 타이머 재생성 → 메모리 누적
- 함수 종료 후에도 참조 유지 가능 → GC 방해

## 현재 setInterval 전체 목록 (13건, 8파일)

### 그룹 A: 미사용 파일 (import 없음) — 삭제 가능

| 파일 | setInterval 수 | import 여부 |
|------|:--------------:|:-----------:|
| `lib/performance/realtime-optimization.ts` | 6건 | **미사용** (WebSocket 실시간 — Vercel 미지원) |
| `lib/performance/cache-strategies.ts` | 1건 | **미사용** |
| `lib/performance.ts` | 1건 | **미사용** (`lib/performance-monitor.ts`와 별개) |

### 그룹 B: 사용 중 파일 — setInterval 교체 필요

| 파일 | setInterval 수 | import 위치 | 교체 방법 |
|------|:--------------:|-------------|-----------|
| `lib/financial/cache-monitoring.ts` | 1건 (라인 315) | `lib/financial/cache.ts`, API route | 자동 실행 블록 제거 (lazy 또는 API cron) |
| `lib/korean-performance-monitor.ts` | 1건 (라인 382) | `components/analytics/korean-performance-tracker.tsx` | 클라이언트 전용이면 유지, 서버면 제거 |
| `lib/seo/analytics-tracker.ts` | 1건 (라인 580) | `components/seo/seo-tracker-init.tsx` | 메서드 내부 — 호출하지 않으면 무해 |
| `lib/seo/enhanced-seo-cache.ts` | 1건 (라인 44) | API route | lazy cleanup 패턴 전환 |
| `lib/newsletter-blog-integration.ts` | 1건 (라인 579) | API route | 메서드 내부 — 호출하지 않으면 무해 |

### 그룹 C: 이미 처리됨 — 무시

| 파일 | 상태 |
|------|------|
| `lib/cache.ts` | `startCacheCleanup()` 내부에만 존재, 자동 실행 안 함 (이전 PDCA에서 처리) |

## 목표

- [ ] 그룹 A 미사용 파일 3개 삭제 (setInterval 8건 제거)
- [ ] 그룹 B 모듈 레벨 자동 실행 setInterval 제거/교체 (3~5건)
- [ ] lint + typecheck + build 통과

## 접근 전략

1. **그룹 A**: 파일 삭제 (import 체인 확인 후)
2. **그룹 B**: 모듈 레벨 자동 실행만 제거, 메서드 내부(호출 시만 실행)는 유지
3. `lib/cache.ts`: 이미 처리됨, 변경 없음

## 성공 기준

| 기준 | 측정 방법 |
|------|-----------|
| 모듈 레벨 자동 실행 setInterval 0건 | grep 확인 |
| lint + typecheck 통과 | 에러 0건 |
| build 성공 | `npm run build` |

## 다음 단계

→ `/pdca do setinterval-cleanup` (Design 생략 — 단순 삭제/교체 작업)
