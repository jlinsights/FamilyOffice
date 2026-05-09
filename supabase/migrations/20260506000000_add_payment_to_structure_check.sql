-- 구조 점검 결제 컬럼 추가 + RLS 강화
-- 상담 신청 시 Toss Payments 33만원 1회 결제 (CONSULTATION_FEE)
-- T3 (consultation-payment.plan.md §6)

-- 1) Payment 컬럼 추가
ALTER TABLE structure_check_requests
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  ADD COLUMN IF NOT EXISTS order_id TEXT,
  ADD COLUMN IF NOT EXISTS payment_key TEXT,
  ADD COLUMN IF NOT EXISTS paid_amount INTEGER,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_method TEXT,
  ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- UNIQUE 제약은 NULL 허용 시 중복 검출 안되므로 PARTIAL UNIQUE INDEX 사용
CREATE UNIQUE INDEX IF NOT EXISTS uq_structure_check_order_id
  ON structure_check_requests(order_id) WHERE order_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_structure_check_payment_key
  ON structure_check_requests(payment_key) WHERE payment_key IS NOT NULL;

-- 2) Payment 조회용 인덱스
CREATE INDEX IF NOT EXISTS idx_structure_check_payment_status
  ON structure_check_requests(payment_status);

CREATE INDEX IF NOT EXISTS idx_structure_check_clerk_user
  ON structure_check_requests(clerk_user_id) WHERE clerk_user_id IS NOT NULL;

-- 3) RLS 강화 — 기존 INSERT 정책 폐기, service_role 전용으로 전환
-- 결제 변조 방지: 클라이언트 직접 INSERT 차단, API route(server)만 가능
DROP POLICY IF EXISTS "Anyone can submit structure check requests"
  ON structure_check_requests;

DROP POLICY IF EXISTS "Service role manages all structure check requests"
  ON structure_check_requests;

CREATE POLICY "Service role manages all structure check requests"
  ON structure_check_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 사용자가 자신의 신청 조회 (Clerk user id 기준)
DROP POLICY IF EXISTS "Users can view own structure check requests"
  ON structure_check_requests;

CREATE POLICY "Users can view own structure check requests"
  ON structure_check_requests
  FOR SELECT
  TO authenticated
  USING (clerk_user_id = auth.jwt() ->> 'sub');

-- 4) 컬럼 코멘트
COMMENT ON COLUMN structure_check_requests.payment_status IS 'Toss 결제 상태: pending(폼 제출 직후), paid(결제 완료), failed(결제 실패), refunded(환불 완료), cancelled(취소)';
COMMENT ON COLUMN structure_check_requests.order_id IS 'Toss orderId — request API가 발급, UNIQUE';
COMMENT ON COLUMN structure_check_requests.payment_key IS 'Toss paymentKey — confirm 성공 시 저장, UNIQUE';
COMMENT ON COLUMN structure_check_requests.paid_amount IS '실 결제 금액(KRW). CONSULTATION_FEE=330000 검증';
COMMENT ON COLUMN structure_check_requests.payment_method IS 'Toss 응답의 method (카드/간편결제 등)';
COMMENT ON COLUMN structure_check_requests.clerk_user_id IS 'Clerk userId(sub) — 폼 제출자 식별';
