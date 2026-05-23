-- Toss Payment secret (confirm 응답) — 웹훅 data.secret 검증용
ALTER TABLE structure_check_requests
  ADD COLUMN IF NOT EXISTS payment_secret TEXT;

COMMENT ON COLUMN structure_check_requests.payment_secret IS
  'Toss Payment.secret — confirm 승인 응답 저장, PAYMENT_STATUS_CHANGED 웹훅 검증';
