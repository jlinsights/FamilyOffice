import type { SupabaseClient } from '@supabase/supabase-js';
import { generateShopOrderId } from './order-id';
import type { ShippingAddressInput } from './schemas';

export class ShopOrderError extends Error {
  constructor(
    message: string,
    public code: 'PRODUCT_UNAVAILABLE' | 'ORDER_CONFLICT' | 'INTERNAL'
  ) {
    super(message);
    this.name = 'ShopOrderError';
  }
}

interface CreatePendingArgs {
  productId: string;
  userId: string;
  buyerEmail?: string;
  shipping: ShippingAddressInput;
}

interface CreatePendingResult {
  orderId: string;
  amount: number;
}

export async function createPendingOrder(
  client: SupabaseClient,
  args: CreatePendingArgs
): Promise<CreatePendingResult> {
  // 1) Re-fetch product server-side, verify on_sale, snapshot price
  const { data: product, error: productErr } = await client
    .from('shop_products')
    .select('id, status, price_krw, shipping_fee, title')
    .eq('id', args.productId)
    .single();

  if (productErr || !product) {
    throw new ShopOrderError('상품을 찾을 수 없습니다', 'PRODUCT_UNAVAILABLE');
  }
  if ((product as { status: string }).status !== 'on_sale') {
    throw new ShopOrderError('판매중이 아닙니다', 'PRODUCT_UNAVAILABLE');
  }

  const priceKrw = (product as { price_krw: number }).price_krw;
  const shippingFee = (product as { shipping_fee: number }).shipping_fee;
  const amount = priceKrw + shippingFee;
  const orderId = generateShopOrderId();

  const { error: insertErr } = await client.from('shop_orders').insert({
    order_id: orderId,
    product_id: args.productId,
    user_id: args.userId,
    buyer_name: args.shipping.buyerName,
    buyer_email: args.buyerEmail ?? '',
    buyer_phone: args.shipping.buyerPhone,
    ship_zip: args.shipping.shipZip,
    ship_address: args.shipping.shipAddress,
    ship_address_detail: args.shipping.shipAddressDetail,
    ship_memo: args.shipping.shipMemo ?? null,
    amount,
    payment_status: 'pending',
  });

  if (insertErr) {
    if ((insertErr as { code?: string }).code === '23505') {
      throw new ShopOrderError('이미 결제 진행 중입니다', 'ORDER_CONFLICT');
    }
    throw new ShopOrderError(insertErr.message ?? 'insert failed', 'INTERNAL');
  }

  return { orderId, amount };
}

interface MarkPaidArgs {
  orderId: string;
  productId: string;
  paymentKey: string;
  totalAmount: number;
  approvedAt: string;
  method: string | null;
}

interface MarkPaidResult {
  ok: boolean;
  reason?: string;
}

export async function markOrderPaid(
  client: SupabaseClient,
  args: MarkPaidArgs
): Promise<MarkPaidResult> {
  const { error: ordersErr } = await client
    .from('shop_orders')
    .update({
      payment_status: 'paid',
      payment_key: args.paymentKey,
      paid_amount: args.totalAmount,
      paid_at: args.approvedAt,
      payment_method: args.method,
    })
    .eq('order_id', args.orderId)
    .eq('payment_status', 'pending');

  if (ordersErr) return { ok: false, reason: 'orders update failed' };

  const { error: prodErr } = await client
    .from('shop_products')
    .update({ status: 'sold', sold_at: args.approvedAt })
    .eq('id', args.productId)
    .eq('status', 'on_sale');

  if (prodErr) return { ok: false, reason: 'products update failed' };
  return { ok: true };
}
