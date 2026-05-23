import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Toss 웹훅 HMAC 검증
 * @see https://docs.tosspayments.com/reference/using-api/webhook-events
 *
 * message = `${rawBody}:${transmissionTime}`
 * HMAC-SHA256(message, webhookSecret) vs tosspayments-webhook-signature 의 v1: 값들
 */
export function verifyTossWebhookSignature(opts: {
  rawBody: string;
  transmissionTime: string | null;
  signatureHeader: string | null;
  webhookSecret: string;
}): boolean {
  const { rawBody, transmissionTime, signatureHeader, webhookSecret } = opts;

  if (!transmissionTime || !signatureHeader?.trim()) {
    return false;
  }

  const message = `${rawBody}:${transmissionTime}`;
  const expected = createHmac('sha256', webhookSecret)
    .update(message, 'utf8')
    .digest();

  const candidates = signatureHeader
    .split(',')
    .map(part => part.trim())
    .filter(part => part.startsWith('v1:'));

  for (const candidate of candidates) {
    const encoded = candidate.slice(3);
    if (!encoded) continue;

    try {
      const received = Buffer.from(encoded, 'base64');
      if (
        received.length === expected.length &&
        timingSafeEqual(received, expected)
      ) {
        return true;
      }
    } catch {
      // invalid base64 — try next v1 signature
    }
  }

  return false;
}
