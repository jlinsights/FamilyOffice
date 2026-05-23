import { createHash } from 'node:crypto';

/**
 * Toss Payment Widget customerKey namespace (RFC 4122 UUID).
 * 동일 Clerk 사용자 → 동일 customerKey. Clerk ID는 Toss에 노출하지 않음.
 * @see https://docs.tosspayments.com/guides/v2/get-started/llms-quick-reference
 */
const TOSS_CUSTOMER_KEY_NAMESPACE = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

const TOSS_CUSTOMER_KEY_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function namespaceBytes(uuid: string): Buffer {
  return Buffer.from(uuid.replace(/-/g, ''), 'hex');
}

/**
 * Clerk userId → Toss 권장 UUID v5 customerKey (결제·빌링 시 동일 고객 식별용).
 */
export function getTossCustomerKeyForClerkUser(clerkUserId: string): string {
  const trimmed = clerkUserId.trim();
  if (!trimmed) {
    throw new Error('clerkUserId is required for Toss customerKey');
  }

  const hash = createHash('sha1')
    .update(namespaceBytes(TOSS_CUSTOMER_KEY_NAMESPACE))
    .update(trimmed, 'utf8')
    .digest();

  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6]! & 0x0f) | 0x50;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;

  const hex = bytes.toString('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-');
}

export function isValidTossCustomerKeyFormat(key: string): boolean {
  return (
    key.length >= 2 && key.length <= 300 && TOSS_CUSTOMER_KEY_PATTERN.test(key)
  );
}
