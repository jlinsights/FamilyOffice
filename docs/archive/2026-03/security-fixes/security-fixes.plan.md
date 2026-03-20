# Plan: security-fixes

> FamilyOffice 보안 취약점 수정

## 개요

| 항목 | 내용 |
|------|------|
| Feature | security-fixes |
| 작성일 | 2026-03-20 |
| 우선순위 | HIGH |
| 예상 범위 | 5개 HIGH + 3개 MEDIUM 이슈 |
| 트리거 | 코드 분석 (건강 점수 72/100, 보안 80/100) |

## 배경 및 동기

FamilyOffice 프로젝트 전체 코드 분석 결과, 보안 관련 HIGH 이슈 5건과 MEDIUM 이슈 3건이 발견됨.
프로덕션 환경(familyoffices.vip)에서 운영 중이므로 즉시 수정이 필요.

### 현재 문제점

1. **이메일 API XSS**: 사용자 입력이 HTML에 직접 삽입되어 XSS 공격 가능
2. **공개 API 봇 방어 부재**: 리드 캡처/뉴스레터 API에 인증/CAPTCHA 없음
3. **Rate Limiter 중복**: 동일 기능이 2개 파일에 별도 구현 (유지보수 리스크)
4. **메모리 누수**: 서버리스 환경에서 setInterval 인스턴스 누적
5. **GTM ID 하드코딩**: 환경변수 미사용으로 변경 시 5파일 수정 필요

## 목표

- [ ] 모든 사용자 입력 HTML 삽입 지점에 DOMPurify/sanitize 적용
- [ ] 공개 API 엔드포인트에 봇 방어 메커니즘 추가
- [ ] Rate Limiter를 단일 모듈로 통합
- [ ] 서버리스 환경에 적합한 타이머 패턴으로 전환
- [ ] GTM ID를 환경변수로 중앙화

## 범위 (Scope)

### In Scope

| # | 이슈 | 심각도 | 파일 |
|---|------|--------|------|
| 1 | 이메일 API XSS 취약점 수정 | HIGH | `app/api/email/send/route.ts` |
| 2 | 리드 캡처 API 봇 방어 추가 | HIGH | `app/api/leads/capture/route.ts` |
| 3 | 뉴스레터 구독 API 봇 방어 추가 | HIGH | `app/api/newsletter/subscribe/route.ts` |
| 4 | Rate Limiter 통합 (2파일→1파일) | HIGH | `lib/rate-limit.ts`, `lib/security/rate-limiter.ts` |
| 5 | 모듈 레벨 setInterval 제거 | HIGH | `lib/security/rate-limiter.ts`, `lib/cache.ts` |
| 6 | GTM ID 환경변수 통합 | MEDIUM | `components/analytics/` (5파일) |
| 7 | dangerouslySetInnerHTML sanitize 검증 | MEDIUM | `app/insights/[slug]/page.tsx` |
| 8 | `as any` 타입 안전성 복원 | MEDIUM | `app/api/leads/capture/route.ts` |

### Out of Scope

- `force-dynamic` 전략 변경 (별도 성능 최적화 PDCA로 분리)
- 대형 파일 분할 (recruit, serious-accident-law)
- 폼 제출 API 연결 (기능 구현 PDCA로 분리)
- 단위 테스트 추가
- 미구현 stub 코드 정리

## 성공 기준

| 기준 | 측정 방법 |
|------|-----------|
| XSS 취약점 0건 | 모든 사용자 입력 → HTML 경로에 sanitize 적용 확인 |
| 공개 API 봇 방어 | Turnstile/reCAPTCHA 토큰 검증 로직 존재 |
| Rate Limiter 단일화 | `lib/security/rate-limiter.ts` 제거, `lib/rate-limit.ts`만 사용 |
| setInterval 0건 | 모듈 레벨 setInterval grep 결과 0건 |
| GTM ID 중앙화 | 하드코딩 grep 결과 0건, 환경변수 1곳에서만 정의 |
| lint + typecheck 통과 | `npm run agent:check` 에러 0건 |

## 리스크

| 리스크 | 영향 | 대응 |
|--------|------|------|
| Rate Limiter 통합 시 미들웨어 동작 변경 | 전체 API rate limiting 영향 | 기존 `lib/rate-limit.ts` 유지, 중복 파일만 제거 |
| Turnstile 도입 시 프론트엔드 변경 필요 | 기존 폼 UI 수정 | 서버 측 검증만 우선 구현, 프론트 토큰 전달은 별도 |
| setInterval 제거 시 캐시 정리 미작동 | 메모리 캐시 무한 증가 | lazy cleanup 패턴 (요청 시 만료 체크) 적용 |

## 구현 순서 (권장)

1. **이메일 API XSS 수정** (가장 긴급, 독립적)
2. **dangerouslySetInnerHTML sanitize 검증** (XSS 관련 묶음)
3. **Rate Limiter 통합** (아키텍처 정리)
4. **setInterval 제거** (Rate Limiter 통합 후)
5. **GTM ID 환경변수 통합** (독립적, 낮은 리스크)
6. **`as any` 타입 복원** (독립적)
7. **공개 API 봇 방어** (프론트엔드 연동 필요, 마지막)

## 다음 단계

→ `/pdca design security-fixes` 로 상세 설계 문서 작성
