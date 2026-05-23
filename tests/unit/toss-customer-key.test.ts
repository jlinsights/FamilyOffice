import {
  getTossCustomerKeyForClerkUser,
  isValidTossCustomerKeyFormat,
} from '@/lib/payments/toss-customer-key';

describe('toss-customer-key', () => {
  it('maps Clerk userId to stable UUID v5 customerKey', () => {
    const clerkId = 'user_2abc123def456';
    const a = getTossCustomerKeyForClerkUser(clerkId);
    const b = getTossCustomerKeyForClerkUser(clerkId);

    expect(a).toBe(b);
    expect(a).not.toContain(clerkId);
    expect(isValidTossCustomerKeyFormat(a)).toBe(true);
  });

  it('produces different keys for different Clerk users', () => {
    const keyA = getTossCustomerKeyForClerkUser('user_aaa');
    const keyB = getTossCustomerKeyForClerkUser('user_bbb');

    expect(keyA).not.toBe(keyB);
  });

  it('rejects empty clerk user id', () => {
    expect(() => getTossCustomerKeyForClerkUser('')).toThrow(
      'clerkUserId is required'
    );
  });
});
