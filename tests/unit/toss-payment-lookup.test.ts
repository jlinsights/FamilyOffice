import { getTossPaymentLookupUrl } from '@/lib/payments/toss-payment-lookup';
import { paymentSecretsMatch } from '@/lib/payments/payment-secret';

describe('getTossPaymentLookupUrl', () => {
  it('paymentKey가 있으면 /v1/payments/{paymentKey} 경로를 쓴다', () => {
    const url = getTossPaymentLookupUrl({
      paymentKey: 'tviva20220322101805EjBx7',
      orderId: 'sc_abc123',
    });
    expect(url).toBe(
      'https://api.tosspayments.com/v1/payments/tviva20220322101805EjBx7'
    );
  });

  it('paymentKey 없이 orderId만 있으면 /v1/payments/orders/{orderId} 경로를 쓴다', () => {
    const url = getTossPaymentLookupUrl({
      paymentKey: null,
      orderId: 'sc_order_only_123',
    });
    expect(url).toBe(
      'https://api.tosspayments.com/v1/payments/orders/sc_order_only_123'
    );
  });

  it('둘 다 없으면 null을 반환한다', () => {
    expect(getTossPaymentLookupUrl({})).toBeNull();
  });
});

describe('paymentSecretsMatch', () => {
  it('동일 secret이면 true', () => {
    expect(paymentSecretsMatch('whsec_test_abc', 'whsec_test_abc')).toBe(true);
  });

  it('다르면 false', () => {
    expect(paymentSecretsMatch('whsec_a', 'whsec_b')).toBe(false);
  });

  it('한쪽이 비어 있으면 false', () => {
    expect(paymentSecretsMatch(null, 'whsec_a')).toBe(false);
    expect(paymentSecretsMatch('whsec_a', undefined)).toBe(false);
  });
});
