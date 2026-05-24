import { z } from 'zod';
import { SHOP_CATEGORIES } from './constants';
import { SHOP_ORDER_ID_PATTERN } from './order-id';

const KR_PHONE = /^01[016789]-?\d{3,4}-?\d{4}$/;
const ZIP5 = /^\d{5}$/;

export const shippingAddressSchema = z.object({
  buyerName: z.string().trim().min(1, '받는 분 이름을 입력해 주세요').max(60),
  buyerPhone: z.string().trim().regex(KR_PHONE, '연락처 형식을 확인해 주세요'),
  shipZip: z.string().trim().regex(ZIP5, '우편번호 5자리를 입력해 주세요'),
  shipAddress: z.string().trim().min(1, '주소를 입력해 주세요').max(200),
  shipAddressDetail: z
    .string()
    .trim()
    .min(1, '상세주소를 입력해 주세요')
    .max(200),
  shipMemo: z.string().trim().max(500).optional(),
});

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;

export const createOrderInputSchema = z.object({
  productId: z.string().uuid('productId 형식이 올바르지 않습니다'),
  shipping: shippingAddressSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

export const confirmInputSchema = z.object({
  paymentKey: z.string().min(1),
  orderId: z
    .string()
    .regex(SHOP_ORDER_ID_PATTERN, 'orderId 형식이 올바르지 않습니다'),
  amount: z.number().int().positive(),
});

export type ConfirmInput = z.infer<typeof confirmInputSchema>;

export const productInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'slug는 소문자/숫자/하이픈만'),
  title: z.string().trim().min(1).max(200),
  artist: z.string().trim().min(1).max(120),
  category: z.enum(SHOP_CATEGORIES),
  description: z.string().max(10_000).optional().default(''),
  priceKrw: z.number().int().positive(),
  shippingFee: z.number().int().nonnegative().default(0),
  images: z.array(z.string().url()).default([]),
  status: z.enum(['on_sale', 'hidden']).default('on_sale'),
});

export type ProductInput = z.infer<typeof productInputSchema>;
