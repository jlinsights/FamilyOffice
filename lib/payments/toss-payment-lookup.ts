/**
 * Toss Payments 조회 URL — 공식 API 경로 분기
 * @see https://docs.tosspayments.com/reference#paymentkey로-결제-조회
 * @see https://docs.tosspayments.com/reference#orderid로-결제-조회
 */
export const TOSS_PAYMENTS_API_BASE =
  'https://api.tosspayments.com/v1/payments';

/**
 * paymentKey 조회: GET /v1/payments/{paymentKey}
 * orderId 조회: GET /v1/payments/orders/{orderId}
 * paymentKey가 있으면 paymentKey 경로를 우선한다.
 */
export function getTossPaymentLookupUrl(opts: {
  paymentKey?: string | null;
  orderId?: string | null;
}): string | null {
  if (opts.paymentKey) {
    return `${TOSS_PAYMENTS_API_BASE}/${encodeURIComponent(opts.paymentKey)}`;
  }
  if (opts.orderId) {
    return `${TOSS_PAYMENTS_API_BASE}/orders/${encodeURIComponent(opts.orderId)}`;
  }
  return null;
}
