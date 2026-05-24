import { timingSafeEqual } from 'crypto';

/**
 * 웹훅 data.secret 과 DB/Toss Payment secret 비교 (타이밍 공격 완화).
 */
export function paymentSecretsMatch(
  expected: string | null | undefined,
  received: string | null | undefined
): boolean {
  if (!expected || !received) {
    return false;
  }
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
