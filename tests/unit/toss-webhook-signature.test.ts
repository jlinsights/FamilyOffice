import { createHmac } from 'node:crypto';
import { verifyTossWebhookSignature } from '@/lib/payments/toss-webhook-signature';

describe('verifyTossWebhookSignature', () => {
  const secret = 'test_webhook_secret_key';
  const rawBody = JSON.stringify({
    eventType: 'PAYMENT_STATUS_CHANGED',
    data: { orderId: 'sc_test', status: 'DONE' },
  });
  const transmissionTime = '2024-09-05T12:19:21+09:00';

  function buildSignatureHeader(): string {
    const digest = createHmac('sha256', secret)
      .update(`${rawBody}:${transmissionTime}`, 'utf8')
      .digest('base64');
    return `v1:${digest}`;
  }

  it('accepts a valid v1 signature', () => {
    expect(
      verifyTossWebhookSignature({
        rawBody,
        transmissionTime,
        signatureHeader: buildSignatureHeader(),
        webhookSecret: secret,
      })
    ).toBe(true);
  });

  it('rejects tampered body', () => {
    expect(
      verifyTossWebhookSignature({
        rawBody: `${rawBody} `,
        transmissionTime,
        signatureHeader: buildSignatureHeader(),
        webhookSecret: secret,
      })
    ).toBe(false);
  });

  it('rejects wrong secret', () => {
    expect(
      verifyTossWebhookSignature({
        rawBody,
        transmissionTime,
        signatureHeader: buildSignatureHeader(),
        webhookSecret: 'other_secret',
      })
    ).toBe(false);
  });

  it('rejects missing headers', () => {
    expect(
      verifyTossWebhookSignature({
        rawBody,
        transmissionTime: null,
        signatureHeader: buildSignatureHeader(),
        webhookSecret: secret,
      })
    ).toBe(false);
  });
});
