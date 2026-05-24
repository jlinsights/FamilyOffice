# FamilyOffice Shop — Design Spec

**Date**: 2026-05-23
**Status**: Approved (브레인스토밍 단계 통과)
**Scope**: MVP — 1-of-1 작품 / 즉시 구매 / Toss Payments
**Branch**: 구현 시 `feat/shop-mvp` 신설 권장 (현재 spec 커밋은 `feat/family-office-plugin`)

---

## 0. 한 줄 요약

서예·사진·그림·럭셔리 아이템을 1-of-1 단위로 판매하는 쇼핑 페이지를 `/shop` 에 추가하고, 기존 consultation-payment 의 Toss Payments 패턴(서버사이드 confirm + 금액 재검증 + 멱등 상태머신 + 진위 재조회 웹훅)을 재사용한다.

## 1. 확정 결정사항

| # | 결정 | 값 | 비고 |
|---|------|-----|-----|
| D1 | 출시 범위 | MVP: 1-of-1 + 즉시 구매 | 장바구니 없음, 한 점=한 거래 |
| D2 | 카탈로그 소스 | Supabase + 어드민 페이지 | products 테이블 신설 |
| D3 | 인증 | Clerk 로그인 필수 | `userId` → Toss `customerKey` |
| D4 | 배송 | 상품 → 주소 폼(카카오 우편번호) → Toss | 결제 전 배송지 수집 |
| D5 | 사이트 구조 | 단일 `/shop` + 카테고리 필터 | URL search param `?category=` |
| D6 | 이미지 호스팅 | Supabase Storage (`shop-product-images` 버킷) | 자동 추론 |
| D7 | 통화/배송비 | KRW VAT 포함 / 1차 무료배송 (스키마는 상품별 설정 가능) | 자동 추론 |

## 2. 데이터 모델

### 2.1 `shop_products`

```sql
create type shop_category as enum
  ('calligraphy', 'photography', 'painting', 'luxury');

create type shop_product_status as enum
  ('on_sale', 'sold', 'hidden');

create table shop_products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,                  -- URL: /shop/[slug]
  title         text not null,                         -- "겸재 鎌齋 — 한지 50×70"
  artist        text not null,                         -- MVP는 텍스트, 추후 별도 테이블
  category      shop_category not null,
  description   text,                                  -- 마크다운 허용
  price_krw     integer not null check (price_krw > 0),
  shipping_fee  integer not null default 0 check (shipping_fee >= 0),
  images        text[] not null default '{}',          -- Supabase Storage public URL; [0] = 대표
  status        shop_product_status not null default 'on_sale',
  sold_at       timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index shop_products_browse_idx
  on shop_products (status, category, created_at desc);
```

### 2.2 `shop_orders`

```sql
create type shop_payment_status as enum
  ('pending', 'paid', 'failed', 'cancelled', 'refunded');

create table shop_orders (
  id                   uuid primary key default gen_random_uuid(),
  order_id             text not null unique,                  -- "SHOP-YYYYMMDD-XXXX" (Toss orderId)
  product_id           uuid not null references shop_products(id),
  user_id              text not null,                         -- Clerk user_id
  buyer_name           text not null,
  buyer_email          text not null,
  buyer_phone          text not null,
  ship_zip             text not null,                         -- 카카오 우편번호 5자리
  ship_address         text not null,                         -- 도로명
  ship_address_detail  text not null,                         -- 상세주소 (수동)
  ship_memo            text,
  amount               integer not null check (amount > 0),   -- price_krw + shipping_fee 스냅샷
  payment_status       shop_payment_status not null default 'pending',
  payment_key          text,
  paid_amount          integer,
  paid_at              timestamptz,
  payment_method       text,
  created_at           timestamptz not null default now()
);

-- 1-of-1 동시구매 차단: 같은 상품에 pending/paid 주문은 최대 1건
create unique index shop_orders_product_active_unique
  on shop_orders (product_id)
  where payment_status in ('pending', 'paid');

create index shop_orders_user_idx
  on shop_orders (user_id, created_at desc);
```

**가드레일 요약**
- partial UNIQUE 인덱스 → 동시 결제 시도 두 번째는 23505 위반으로 실패
- `amount = product.price_krw + product.shipping_fee` 스냅샷 → 가격 변경 후에도 결제 무결성 유지
- `shop_orders.payment_status = 'paid'` 전환과 동시에 `shop_products.status = 'sold'` 트랜잭션으로 묶음

## 3. 라우트 / API

```
app/
├── shop/
│   ├── page.tsx                              -- Server: 그리드 + ShopCategoryTabs
│   ├── [slug]/
│   │   ├── page.tsx                          -- Server: 상세 + 구매 CTA
│   │   └── checkout/page.tsx                 -- Client: 주소 폼 → create-order → Toss 위젯
│   └── checkout/
│       ├── success/page.tsx                  -- Client→server confirm 트리거 (Toss successUrl)
│       └── fail/page.tsx                     -- Toss failUrl
├── api/
│   ├── payments/
│   │   ├── shop/
│   │   │   ├── create-order/route.ts         -- POST: pending 생성
│   │   │   └── confirm/route.ts              -- POST: Toss confirm + paid 전환
│   │   └── webhook/route.ts                  -- 기존 확장: SHOP- prefix 분기
│   └── admin/
│       └── shop/
│           └── upload-image/route.ts         -- POST: 어드민 가드 + Storage 업로드
└── admin/
    └── shop/
        ├── page.tsx                          -- 상품 목록
        ├── new/page.tsx                      -- 생성 폼
        └── [id]/edit/page.tsx                -- 수정/판매중지
```

### 3.1 API 엔드포인트 명세

#### `POST /api/payments/shop/create-order`
```
auth: Clerk required (server-side currentUser)
body: { productId: uuid, shipping: {...주소 폼...} }
flow:
  1. zod 검증
  2. shop_products SELECT — status='on_sale' 보장
  3. orderId 생성 ("SHOP-" + yyyymmdd + 4자리 시퀀스 또는 nanoid)
  4. shop_orders INSERT (pending)
     - UNIQUE 위반 → 409 "방금 다른 분이 구매 진행 중입니다"
  5. return { orderId, amount, clientKey, customerKey: userId }
```

#### `POST /api/payments/shop/confirm`
```
auth: Clerk required (orderId.user_id 일치 검증)
body: { paymentKey, orderId, amount }
flow:
  1. zod 검증
  2. shop_orders SELECT WHERE order_id=? AND user_id=currentUser
  3. payment_status='paid' → 멱등 응답 (200 same)
  4. amount === shop_orders.amount 재검증 (변조 차단)
  5. Toss POST /v1/payments/confirm (Basic auth)
  6. amount === successResp.totalAmount sanity check
  7. 트랜잭션:
       UPDATE shop_orders SET payment_status='paid', payment_key, paid_amount, paid_at, payment_method
         WHERE order_id=? AND payment_status='pending'
       UPDATE shop_products SET status='sold', sold_at=now()
         WHERE id=? AND status='on_sale'
     (두 UPDATE 모두 affected_rows >= 1 확인)
  8. 이메일 발송 (구매자 + 운영자) — fire-and-forget
  9. return { success: true, orderId, paymentKey, amount, approvedAt }
```

#### `POST /api/payments/webhook` (기존 확장)
```
orderId 패턴 분기:
  - "STRC-..." 또는 기존 패턴 → structure_check_requests 갱신 (현재 로직)
  - "SHOP-..." → shop_orders + shop_products 갱신
defense-in-depth: Toss API GET /v1/payments/{paymentKey} 재조회 후 적용
M1 수정 동반: orderId 폴백 시 /v1/payments/orders/{orderId} 사용
```

## 4. 구매 흐름 (시퀀스)

```
[/shop] → [/shop/[slug]] → [구매하기 클릭]
                                  ↓ (비로그인이면 /sign-in?redirect=...)
                          [/shop/[slug]/checkout]
                                  ↓ ShopCheckoutForm: 주소·연락처 입력
                                  ↓ POST /api/payments/shop/create-order
                                  ↓ orderId 수신, 클라이언트 state 보유
                                  ↓ TossPaymentWidget 마운트 (clientKey, customerKey=userId)
                                  ↓ [결제하기] 클릭 → widgets.requestPayment()
                          Toss 결제창 → 사용자 결제 → successUrl redirect
                                  ↓
                          [/shop/checkout/success?paymentKey=&orderId=&amount=]
                                  ↓ useEffect: POST /api/payments/shop/confirm
                                  ↓ 응답 표시 (성공/실패/멱등)
                          (병행) Toss → /api/payments/webhook → defense-in-depth 갱신
```

**라우트 설계 근거**: 주소 폼과 Toss 위젯을 같은 페이지(`app/shop/[slug]/checkout/page.tsx`, Client)에 둔다. 폼 제출 → `create-order` → orderId 클라이언트 state 보유 → Toss 위젯 렌더. URL에 orderId 노출 불필요(전체 흐름 한 페이지). success/fail 라우트는 `/shop/checkout/{success,fail}` 절대경로(Toss 콜백 URL).

## 5. 컴포넌트 맵

### 재사용
- `components/payment/toss-payment-widget.tsx` — **그대로**
- `app/structure-check/payment/{success,fail}/page.tsx` 패턴 — 복사·축소

### 신규
| 컴포넌트 | 위치 | 종류 | 책임 |
|----------|------|------|------|
| `ShopProductGrid` | `components/shop/` | Server | 카테고리별 그리드 |
| `ShopCategoryTabs` | `components/shop/` | Client | URL `?category=` 동기 |
| `ShopProductCard` | `components/shop/` | Server | 카드 한 장, SOLD 라벨 |
| `ShopProductDetail` | `components/shop/` | Server | 이미지 갤러리 + 정보 |
| `ShopProductGallery` | `components/shop/` | Client | 다중 이미지 슬라이드/줌 |
| `ShopCheckoutForm` | `components/shop/checkout/` | Client | react-hook-form + zod |
| `DaumPostcodeButton` | `components/shop/checkout/` | Client | `react-daum-postcode` 통합 |
| `AdminShopList` | `components/admin/shop/` | Server | 상품 목록 |
| `AdminShopForm` | `components/admin/shop/` | Client | 생성/수정 |
| `AdminShopImageUploader` | `components/admin/shop/` | Client | Supabase Storage drag-drop |

### lib / shared
- `lib/shop/products.ts` — Supabase 쿼리 헬퍼 (listOnSale, getBySlug, getById)
- `lib/shop/orders.ts` — create / confirm 트랜잭션 로직
- `lib/shop/order-id.ts` — `SHOP-YYYYMMDD-{nanoid(4)}` 생성기
- `lib/shop/constants.ts` — 카테고리 라벨 매핑, 무료배송 임계 등
- `lib/shop/schemas.ts` — zod 스키마 (CreateOrderInput, ConfirmInput, 어드민)

## 6. 어드민

### `/admin/shop` (목록)
- 필터: 카테고리, status
- 컬럼: 썸네일·제목·작가·카테고리·가격·status·SOLD 여부·created_at
- 액션: [신규] / 각 행 [수정] / [숨기기/공개] 토글

### `/admin/shop/new`, `/admin/shop/[id]/edit` (폼)
- 입력: 카테고리 select, 제목, slug(자동 생성+편집 가능), 작가, 가격, 배송비, 설명 (마크다운 textarea), 이미지 다중 업로드
- 이미지: `AdminShopImageUploader` — Supabase Storage `shop-product-images` 버킷, 드래그 정렬, 첫 장이 대표
- status 토글: `on_sale` ↔ `hidden`. `sold` 는 결제 흐름에서만 자동 전환 (수동 변경 금지)
- 가드: `lib/admin-permissions.ts`의 `getAdminEmails()` 서버사이드 가드 + `AdminAccessDeniedAlert` 클라 폴백

### 이미지 업로드 (서버 라우트 경유)
- Storage 버킷 `shop-product-images`: **public read**, 직접 클라 INSERT 금지.
- 업로드 경로: `POST /api/admin/shop/upload-image` — server-side `getAdminEmails()` 가드 → `createAdminClient()` (service role) 로 Storage 업로드 → public URL 반환.
- 근거: Clerk JWT를 Supabase RLS에 브리지하는 third-party auth 설정이 현재 프로젝트에 부재 (`grep` 확인). 서버 라우트 가드가 MVP에 더 단순·견고.

## 7. 디자인 시스템 (DESIGN.md 준수)

- 12컬럼 그리드, `gap-8`, 카드 `p-6`
- 색: `bg-brand-navy` 배경 섹션, `text-bronze` 강조, `btn-brand-gold` 구매 CTA
- 타입: 작품명 `font-playfair`, 본문 `font-korean`, 가격 `financial-value` (tabular-nums)
- 카드 베이스: `card-gold-border` (작품 위계 강조). hover 시 그림자/이동 미세 변화 (DESIGN.md 표준 motion).
- SOLD OUT:
  - 카드: 상단에 골드 라벨 + 이미지 `filter: grayscale(0.4) brightness(0.85)` + `pointer-events-none` (상세 진입은 가능)
  - 상세: CTA 영역에 "SOLD OUT" 비활성 버튼 + 판매 일자 표기
- 결제 페이지: `bg-brand-navy` 배경 + `glass-premium` 카드 (consultation-payment 톤 유지)

## 8. 에러 처리 / 엣지 케이스

| 케이스 | 처리 |
|--------|------|
| 동시 결제 시도 | partial UNIQUE 위반 → 409 + 한국어 안내 |
| Toss 승인 OK, DB 갱신 실패 | confirm 500, webhook 보정 |
| 결제창 닫음 (pending 잔존) | MVP는 어드민 수동 cancel. **후속 사이클**: cron 24h TTL |
| 가격 변조 | confirm: amount vs shop_orders.amount snapshot 비교 |
| hidden 상품 직접 URL | 상세 404 |
| sold 상품 상세 진입 | 200 표시 + CTA 비활성 |
| Clerk 비로그인 [구매하기] | `/sign-in?redirect=<상세 URL>` |
| 어드민 비권한자 `/admin/shop` 접근 | server gate → 403 + `AdminAccessDeniedAlert` |
| 이미지 업로드 실패 | 폼 검증 실패로 표시, 부분 업로드된 파일은 클라이언트 책임으로 정리 |
| 우편번호 API 차단/실패 | 폼: 수동 입력 폴백(우편번호 텍스트 5자리 검증) 노출 |

## 9. 보안 / 비기능

- Secret Key: 서버 한정 (`process.env.TOSS_SECRET_KEY`)
- Webhook 진위: Toss API 재조회 (구현된 패턴)
- Rate limit: 미들웨어 글로벌 적용 (기존), `create-order`/`confirm` 별도 강화 후속 사이클
- 모든 가격 정수(원). 부동소수점 금지.
- 로그: paymentKey 마스킹 (`SHOP-...-****` 마지막 4자리만)

## 10. 테스트

### Jest (unit/integration)
- `lib/shop/order-id.ts` — 포맷·중복 방지
- `api/payments/shop/create-order` — zod 거부, 비로그인 401, 동시 요청 409, 정상 200
- `api/payments/shop/confirm` — 멱등, amount 변조, Toss 거부, DB 트랜잭션 실패 복구
- `lib/shop/orders.ts` — 트랜잭션 단위 (paid 전환 시 product status 동시 변경)

### Playwright E2E
- `/shop` → 카테고리 필터 동작
- 상세 진입 → 비로그인 redirect 확인
- 로그인 → 주소 폼 입력 → Toss 테스트 키 결제 → success 페이지 → 멱등 호출 확인
- 어드민: 신규 상품 생성 → /shop 그리드 노출 확인 → 숨기기 → 그리드 비노출 확인

## 11. Out of Scope (후속 사이클)

- 장바구니, 다재고, 옵션(에디션/사이즈)
- 작가 별도 테이블·프로필
- 메인 페이지 큐레이션 섹션
- 자동 pending 청소 cron
- 결제 환불 UI
- 리뷰·문의
- 검색 / 정렬(가격순, 신상품순)
- 다국어 (사이트 한국어 only)
- SEO sitemap·OG 이미지 자동 생성

## 12. 구현 순서 (예고 — writing-plans 단계에서 상세화)

1. 마이그레이션 + RLS + Storage 버킷
2. `lib/shop/*` 헬퍼·스키마
3. `/api/payments/shop/create-order` + 테스트
4. `/api/payments/shop/confirm` + 테스트 + webhook 분기
5. `/shop` + `[slug]` 페이지 + 컴포넌트
6. `/shop/[slug]/checkout` + 주소 폼 + Toss 위젯 통합
7. success/fail 페이지
8. 어드민: 목록 → 폼 → 이미지 업로더
9. DESIGN.md 검증 (lint/diff/wcag 게이트)
10. E2E 시나리오
11. 동반 수정: 기존 webhook M1 (orderId 폴백 URL), L1 (fetch timeout)

## 13. 오픈 이슈 / 결정 보류

- **이미지 압축/리사이즈**: 어드민 업로드 시 클라사이드 압축? Supabase Edge Function? → 1차는 원본 그대로, 권장 사이즈 가이드만 폼에 표기.
- **Toss 결제 수단 제한**: 현재 위젯 `variantKey='DEFAULT'`로 전체 노출. 고가 작품 정책상 가상계좌·간편결제만 노출하려면 Toss 대시보드 변형 설정에서 처리 (코드 변경 X).
- **재고 복구 워크플로우**: confirm 실패 시 pending 상태로 머무름. 사용자가 재시도 가능. 명시적 cancel API는 후속.

---

## Review

이 spec 은 브레인스토밍 단계의 결정사항을 모두 반영했고, 후속 단계는 `writing-plans` 스킬로 실행 계획을 작성한다.
