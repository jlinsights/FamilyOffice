# Consultation Payment — PDCA Plan

**Status:** Plan (Phase 1)
**Owner:** jhlim725
**Branch:** `feat/consultation-payment`
**Created:** 2026-05-05

---

## 1. Background

현재 구조점검(상담) 신청 플로우는 무료다. 비즈니스 결정에 따라 **모든 상담을 유료로 전환**하고, 건당 **330,000원 (VAT 포함)** 을 Toss Payments로 즉시 결제받는다.

### 현재 상태 (As-Is)
- 실제 상담 폼: `app/structure-check/page.tsx` (5문항 자격검증 + 6/7번 선택질문)
- 폼 저장: Supabase `structure_check_requests` 테이블 (RLS: 누구나 INSERT 가능)
- `/api/consultations/route.ts` 는 dead code (`consultations` 테이블 마이그레이션 부재)
- 카카오페이 버튼은 별도 멤버십 결제용으로 존재 (재사용 X, Toss 신규 도입)

---

## 2. Goal

> 사용자가 `/structure-check`에서 5문항 자격검증을 통과한 뒤, Toss Payments 위젯으로 330,000원 결제를 완료해야만 상담 신청이 확정된다.

### 성공 기준 (SLO)
1. 결제 완료 전 `structure_check_requests.payment_status = 'pending'`, 완료 후 `'paid'`로 전환된다 (서버 사이드 검증).
2. 클라이언트가 amount를 변조해도 서버에서 reject 한다.
3. 자격 미달자가 결제 페이지에 진입할 수 없다 (자격검증 → 결제 순서).
4. 자격 미달 판정으로 미팅이 거절될 경우 100% 환불 정책이 환불 페이지에 명시된다.
5. `npm run agent:check` 통과 + Playwright E2E 핵심 플로우 1개 이상 통과.

---

## 3. Scope

### In-Scope (수정 / 신규)
| 영역 | 파일 |
|---|---|
| 환경변수 | `.env.example`, `lib/env.ts` |
| 상수 | `lib/constants.ts` (`CONSULTATION_FEE = 330_000`) |
| DB 마이그레이션 | `supabase/migrations/2026XXXX_add_payment_to_structure_check.sql` (신규) |
| Toss 위젯 | `components/payment/toss-payment-widget.tsx` (신규) |
| 결제 API | `app/api/payments/structure-check/request/route.ts` (신규) |
|  | `app/api/payments/structure-check/confirm/route.ts` (신규) |
|  | `app/api/payments/webhook/route.ts` (신규) |
| 페이지 | `app/structure-check/page.tsx` (수정 — 자격검증 후 결제 위젯) |
|  | `app/structure-check/payment/success/page.tsx` (신규) |
|  | `app/structure-check/payment/fail/page.tsx` (신규) |
| 인증 | `app/structure-check/page.tsx` Clerk 가드 |
| 환불 정책 | `app/legal/refund/page.tsx` (33만원 일회성 결제 조항 추가) |
| 테스트 | `tests/unit/payment-amount-validation.test.ts`, `tests/e2e/consultation-payment.spec.ts` |

### Out-of-Scope
- `/api/consultations/route.ts` (dead code, 손대지 않음)
- `app/apply/membership-intake/` (별도 결제 플로우)
- `components/kakao/kakao-pay-button.tsx` (재사용 안 함)
- 어드민 결제 환불 UI (수동 환불은 Toss 콘솔에서)
- Pre-existing tech debt (`as any` 타입 단언, JSON 파일 저장)

---

## 4. Decisions (확정)

| # | 결정 | 값 |
|---|---|---|
| 1 | 결제 시점 | 자격검증 통과 → 결제 → 완료 시 신청 확정 |
| 2 | 진입점 | `/structure-check` 통합 (모든 무료 상담 폼 폐지) |
| 3 | 금액 표시 | `lib/constants.ts`에 `CONSULTATION_FEE = 330_000` 상수 |
| 4 | Toss 모드 | Payment Widget v2 (`@tosspayments/tosspayments-sdk`) |
| 5 | 결제 수단 | 카드 + 간편결제 (계좌이체/가상계좌 제외) |
| 6 | 신청자 식별 | Clerk 로그인 필수 |
| 7 | DB 저장 | `structure_check_requests` 테이블에 payment 컬럼 추가 |

### 추가 결정 (advisor 가이드)
- **자격검증 우선**: `qualification_score` 인프라 활용. 자격 미달 응답이 있어도 결제 진행은 허용 (정책 결정), 단 환불 정책에 "자격 미달로 미팅 거절 시 전액 환불" 명시.
- **RLS 강화**: payment 컬럼 INSERT는 service_role 만 가능 (anon 차단).
- **Idempotency**: webhook + confirm API 모두 `paymentKey` 중복 방지.

---

## 5. Architecture

### 결제 플로우 (Sequence)
```
1. User → /structure-check (Clerk 로그인 필수)
2. 5문항 자격검증 폼 작성 → Submit
3. 클라이언트: POST /api/payments/structure-check/request
   → orderId 발급, DB에 pending 레코드 생성
   → { orderId, amount: 330_000 } 반환
4. 클라이언트: Toss Widget 렌더 → tossPayments.requestPayment()
5. Toss → 사용자 결제 → success URL redirect
6. /structure-check/payment/success?paymentKey=xxx&orderId=xxx&amount=330000
   → 서버 컴포넌트: POST /api/payments/structure-check/confirm
   → 서버: amount/orderId 재검증 + Toss approve API + DB 'paid'
7. (병렬) Toss webhook → /api/payments/webhook
   → 시그니처 검증, idempotent 상태 동기화
8. 사용자: 결제 완료 화면 + 영수증/이메일 발송
```

### 환경변수
```bash
# .env.local (사용자 발급 후 입력)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_...    # 클라이언트 SDK용
TOSS_SECRET_KEY=test_sk_...                 # 서버 confirm API용
TOSS_WEBHOOK_SECRET=...                     # webhook 시그니처 검증
```

### DB Schema 변경
```sql
ALTER TABLE structure_check_requests
  ADD COLUMN payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  ADD COLUMN order_id TEXT UNIQUE,
  ADD COLUMN payment_key TEXT UNIQUE,
  ADD COLUMN paid_amount INTEGER,
  ADD COLUMN paid_at TIMESTAMPTZ,
  ADD COLUMN payment_method TEXT,
  ADD COLUMN refunded_at TIMESTAMPTZ;

CREATE INDEX idx_structure_check_payment_status ON structure_check_requests(payment_status);
CREATE INDEX idx_structure_check_order_id ON structure_check_requests(order_id);

-- RLS: payment 컬럼은 service_role 만 INSERT/UPDATE
DROP POLICY "Anyone can submit structure check requests" ON structure_check_requests;
CREATE POLICY "Service role manages all"
  ON structure_check_requests FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

---

## 6. Tasks (Subagent-Driven Execution)

각 task는 fresh subagent로 디스패치, 2단 리뷰(spec → code quality) 후 완료 표시.

| ID | Task | 예상 파일 변경 | 의존 |
|---|---|---|---|
| T1 | **Toss SDK 설치 + 환경변수 스캐폴드** | `package.json`, `.env.example`, `lib/env.ts` | - |
| T2 | **상수 추가**: `CONSULTATION_FEE = 330_000` | `lib/constants.ts` | - |
| T3 | **DB 마이그레이션**: `structure_check_requests` payment 컬럼 + RLS 갱신 | `supabase/migrations/2026XXXX_add_payment_to_structure_check.sql` | - |
| T4 | **Payment request API**: orderId 발급 + DB pending 레코드 | `app/api/payments/structure-check/request/route.ts` | T1, T2, T3 |
| T5 | **Payment confirm API**: 서버 amount 재검증 + Toss approve + DB 갱신 (idempotent) | `app/api/payments/structure-check/confirm/route.ts` | T1, T3 |
| T6 | **Webhook**: 시그니처 검증 + 상태 동기화 (idempotent) | `app/api/payments/webhook/route.ts` | T1, T3 |
| T7 | **Toss Payment Widget 컴포넌트** (V2 SDK) | `components/payment/toss-payment-widget.tsx` | T1 |
| T8 | **`/structure-check` 페이지**: Clerk 가드 + 자격검증 → 결제 위젯 통합 | `app/structure-check/page.tsx` (수정) | T7, T4 |
| T9 | **Success/Fail 페이지** | `app/structure-check/payment/{success,fail}/page.tsx` | T5 |
| T10 | **환불 정책 업데이트**: 33만원 일회성 조항 추가 | `app/legal/refund/page.tsx` | - |
| T11 | **이메일 알림**: 결제 완료 시 사용자/관리자 (기존 Resend) | (기존 이메일 모듈 + T5 hook) | T5 |
| T12 | **테스트**: amount 검증 unit + E2E 핵심 플로우 1개 | `tests/unit/`, `tests/e2e/` | T4–T9 |
| T13 | **최종 리뷰**: 보안 + agent:check + 빌드 검증 | - | All |

**병렬 가능**: T1, T2, T3, T10 은 의존 없음 → 빠른 시작.
**Critical path**: T1 → T4/T5/T6 → T7 → T8 → T9 → T12 → T13.

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 클라이언트 amount 변조 | 손실 | confirm API 서버에서 DB pending 레코드의 amount 재조회 후 비교 |
| Webhook 미수신 | 상태 불일치 | confirm API가 동기적으로 Toss approve 호출, webhook은 backup |
| 중복 결제 | CS 분쟁 | `order_id` UNIQUE, `payment_key` UNIQUE, idempotent confirm |
| 자격검증 우회 | 무자격 결제 | request API에서 자격검증 데이터 동시 INSERT (atomic) |
| RLS 미적용으로 데이터 노출 | 개인정보 | service_role 전용 정책, anon 키 사용 금지 (서버 라우트만) |
| 환불 정책 미비 → 분쟁 | 법적 리스크 | T10에서 7일/미팅 진행 전/자격 미달 환불 명시 (전자상거래법 준수) |
| Clerk 미로그인 사용자 진입 | 결제 후 식별 불가 | 페이지 + 미들웨어 양쪽 가드 |
| Toss 키 미발급 | 개발 진행 불가 | placeholder env로 코드 작성, 사용자 키 입력 후 E2E |

---

## 8. Test Strategy

### Unit (Jest)
- `payment-amount-validation.test.ts`: amount 변조 / 누락 / 음수 reject

### Integration (Jest + Supabase)
- request API → DB pending 레코드 생성 검증
- confirm API → DB paid 전환, idempotent 호출 시 동일 결과

### E2E (Playwright)
- `consultation-payment.spec.ts`:
  - Clerk 미로그인 → /structure-check 접근 시 sign-in redirect
  - 로그인 → 5문항 응답 → 결제 위젯 노출
  - Toss 테스트 카드 결제 → success 페이지 도달
  - DB `payment_status = 'paid'` 검증

### Manual QA (Toss 콘솔)
- 테스트 결제 1건 → 환불 확인
- webhook 로그 시그니처 검증

---

## 9. Refund Policy (T10 작성 텍스트 초안)

```markdown
## 4. 상담 신청 환불 정책 (1회성 결제)

본 조항은 구조점검 등 1회성 유료 상담 신청 결제에 적용됩니다.

- **결제 후 7일 이내, 상담 미팅 진행 전:** 100% 환불
- **상담 미팅 진행 완료 후:** 환불 불가 (서비스 제공 완료)
- **자격 검토 결과 미팅 거절 시 (회사 사유):** 100% 환불, 거절 통지일로부터
  3영업일 이내 환불 처리
- **결제 후 7일 경과 후 (미팅 미진행):** 환불 불가, 단 합리적 사유가
  소명되는 경우 회사 재량으로 일부 환불 가능

환불 신청은 고객센터 이메일로 접수합니다.
근거 법령: 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조
```

---

## 10. Done Criteria (Final Review — T13)

- [ ] `npm run agent:check` (lint + typecheck) 통과
- [ ] Playwright E2E 핵심 시나리오 통과
- [ ] 보안 리뷰: amount 검증 / RLS / webhook signature 모두 검증됨
- [ ] 환불 정책 페이지 33만원 조항 반영
- [ ] `.env.example`에 Toss 키 변수명 명시 + README 업데이트
- [ ] PR 생성 (PR 본문에 결정사항 7가지 + 환불 정책 변경 명시)

---

## 11. Open Questions (해결 필요)

- [x] **Toss 테스트 키 발급 상태** — 미발급 확정. Toss docs 공개 테스트 키(`test_ck_docs_*`, `test_sk_docs_*`)로 개발/CI 진행. UI 라이브 후 가맹점 심사 → 운영 키 교체.
- [x] **Scenario 결정 (2026-05-06)** — **A 채택**. `/structure-check`만 결제 게이트. 헤더 "상담신청" 라벨/링크를 `/structure-check`로 변경 (T8 범위에 포함). `/apply/membership-intake`는 멤버십 가입용으로 별도 유지 (스코프 외).
