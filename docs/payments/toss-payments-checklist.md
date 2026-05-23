# Toss Payments 운영 체크리스트 (구조 점검 상담)

[환경 설정 가이드](https://docs.tosspayments.com/guides/environment) 기준. 배포·라이브 전환 시 확인.

## 1. 키 쌍 (테스트 / 라이브 분리)

| 변수 | 용도 | 형식 |
|------|------|------|
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | 브라우저 위젯 | `test_ck_` / `live_ck_` |
| `TOSS_SECRET_KEY` | 서버 승인·조회 | `test_sk_` / `live_sk_` |
| `TOSS_WEBHOOK_SECRET` | 웹훅 서명 검증 | 대시보드에서 발급 |

- 테스트 키와 라이브 키를 섞지 않음 (클라이언트·시크릿은 동일 환경 쌍).
- `lib/env.ts` Zod 검증이 접두사를 강제함.

## 2. 웹훅 URL

| 환경 | URL |
|------|-----|
| 운영 | `https://familyoffices.vip/api/payments/webhook` |
| 로컬 | ngrok 등 터널 → 동일 경로 |

- 대시보드에 위 URL 등록 후 `TOSS_WEBHOOK_SECRET`을 Vercel/`.env`에 반영.
- 웹훅은 `orderId`만 있을 때 `GET /v1/payments/orders/{orderId}` 로 조회 (코드 반영됨).
- **HMAC 검증**: `TOSS_WEBHOOK_SECRET` 설정 시 `tosspayments-webhook-signature` + `tosspayments-webhook-transmission-time` 로 raw body 검증. 미설정 시 개발은 생략, 프로덕션은 경고 로그.
- **결제 secret**: payload `data.secret` 은 DB `payment_secret` 과 대조 (confirm 승인 시 저장).

## 3. DB 마이그레이션

- `supabase/migrations/20260523000000_add_payment_secret.sql` 적용 (`payment_secret` 컬럼).
- 미적용 시 confirm·웹훅 secret 검증이 동작하지 않음.

## 4. 결제 플로우 스모크 테스트

1. Clerk 로그인 후 구조 점검 신청 폼 제출.
2. Toss 위젯 결제 (테스트 카드).
3. `/structure-check/payment/success` → confirm API 200.
4. `structure_check_requests.payment_status` = `paid`.
5. (선택) 대시보드에서 웹훅 재전송 → `payment_secret` 일치 시 상태 유지.

## 5. customerKey

- API는 Clerk ID 대신 **UUID v5** (`getTossCustomerKeyForClerkUser`)를 위젯에 전달.
- 비로그인 결제는 현재 미지원 (신청 API 401).

## 6. 금액

- 서버 상수 `CONSULTATION_FEE` (330_000원)와 Toss 승인 금액 일치 여부 confirm에서 검증.

## 7. 라이브 전환 시

- [ ] 라이브 `ck` / `sk` 발급 및 Vercel env 업데이트
- [ ] 라이브 웹훅 URL·시크릿 재등록
- [ ] 결제 UI·약관 variant (대시보드) 운영용으로 설정
- [ ] E2E 또는 수동 1건 실결제 검증 후 모니터링 (Sentry)
