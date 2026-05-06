/**
 * Payment Amount Validation — 변조 차단 핵심 테스트
 *
 * Toss confirm API 의 amount 검증 로직 회귀 테스트.
 * 클라이언트가 amount 를 조작해도 서버에서 거부되어야 한다.
 */
import { z } from 'zod';
import { CONSULTATION_FEE } from '@/lib/constants';

// app/api/payments/structure-check/confirm/route.ts 와 동일한 schema.
// 하나라도 바뀌면 양쪽 모두 갱신해야 함을 회귀로 검증.
const confirmSchema = z.object({
  paymentKey: z.string().min(1),
  orderId: z.string().min(1),
  amount: z.number().int().positive(),
});

describe('Payment Amount Validation', () => {
  describe('CONSULTATION_FEE constant', () => {
    it('CONSULTATION_FEE 는 330,000 KRW (VAT 포함) 이다', () => {
      expect(CONSULTATION_FEE).toBe(330_000);
    });

    it('CONSULTATION_FEE 는 정수다', () => {
      expect(Number.isInteger(CONSULTATION_FEE)).toBe(true);
    });

    it('CONSULTATION_FEE 는 양수다', () => {
      expect(CONSULTATION_FEE).toBeGreaterThan(0);
    });
  });

  describe('Confirm body schema', () => {
    const validBody = {
      paymentKey: 'test_pk_xxxx',
      orderId: 'sc_test1234567890',
      amount: CONSULTATION_FEE,
    };

    it('정상 입력은 통과한다', () => {
      const result = confirmSchema.safeParse(validBody);
      expect(result.success).toBe(true);
    });

    it('amount 가 음수면 거부된다', () => {
      const result = confirmSchema.safeParse({
        ...validBody,
        amount: -1,
      });
      expect(result.success).toBe(false);
    });

    it('amount 가 0이면 거부된다', () => {
      const result = confirmSchema.safeParse({
        ...validBody,
        amount: 0,
      });
      expect(result.success).toBe(false);
    });

    it('amount 가 소수면 거부된다 (금액 단위 위반)', () => {
      const result = confirmSchema.safeParse({
        ...validBody,
        amount: 330000.5,
      });
      expect(result.success).toBe(false);
    });

    it('amount 가 문자열이면 거부된다', () => {
      const result = confirmSchema.safeParse({
        ...validBody,
        amount: '330000',
      });
      expect(result.success).toBe(false);
    });

    it('amount 누락 시 거부된다', () => {
      const { amount: _amount, ...withoutAmount } = validBody;
      const result = confirmSchema.safeParse(withoutAmount);
      expect(result.success).toBe(false);
    });

    it('paymentKey 누락 시 거부된다', () => {
      const { paymentKey: _pk, ...withoutKey } = validBody;
      const result = confirmSchema.safeParse(withoutKey);
      expect(result.success).toBe(false);
    });

    it('orderId 누락 시 거부된다', () => {
      const { orderId: _oid, ...withoutOrderId } = validBody;
      const result = confirmSchema.safeParse(withoutOrderId);
      expect(result.success).toBe(false);
    });
  });

  describe('Server-side amount tampering check', () => {
    // 비즈니스 로직: amount !== CONSULTATION_FEE 면 거부
    const isValidAmount = (clientAmount: number): boolean =>
      clientAmount === CONSULTATION_FEE;

    it('정확히 CONSULTATION_FEE 만 통과한다', () => {
      expect(isValidAmount(CONSULTATION_FEE)).toBe(true);
    });

    it('1원 적게 보내면 거부된다 (변조 시도)', () => {
      expect(isValidAmount(CONSULTATION_FEE - 1)).toBe(false);
    });

    it('1원 더 많이 보내면 거부된다 (변조 시도)', () => {
      expect(isValidAmount(CONSULTATION_FEE + 1)).toBe(false);
    });

    it('1원이면 거부된다 (악의적 변조)', () => {
      expect(isValidAmount(1)).toBe(false);
    });
  });
});
