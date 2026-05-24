import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getTossCustomerKeyForClerkUser } from '@/lib/payments/toss-customer-key';
import { createPendingOrder, ShopOrderError } from '@/lib/shop/orders';
import { createOrderInputSchema } from '@/lib/shop/schemas';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: '로그인이 필요합니다' },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: '잘못된 요청 본문' },
      { status: 400 }
    );
  }

  const parsed = createOrderInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: '입력 검증 실패',
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const buyerEmail = user.emailAddresses[0]?.emailAddress ?? '';
  const supabase = createAdminClient();

  try {
    const { orderId, amount } = await createPendingOrder(supabase, {
      productId: parsed.data.productId,
      userId: user.id,
      buyerEmail,
      shipping: parsed.data.shipping,
    });
    return NextResponse.json(
      {
        success: true,
        orderId,
        amount,
        clientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
        customerKey: getTossCustomerKeyForClerkUser(user.id),
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof ShopOrderError) {
      const map = {
        PRODUCT_UNAVAILABLE: 410,
        ORDER_CONFLICT: 409,
        INTERNAL: 500,
      } as const;
      return NextResponse.json(
        { success: false, error: err.message, code: err.code },
        { status: map[err.code] }
      );
    }
    console.error('[shop/create-order] unexpected:', err);
    return NextResponse.json(
      { success: false, error: '주문 생성 실패' },
      { status: 500 }
    );
  }
}
