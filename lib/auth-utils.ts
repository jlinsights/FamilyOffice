import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return userId;
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is admin (you can implement your admin check logic here)
  const adminEmails = ['jhlim725@gmail.com'];
  const user = await auth();

  if (
    !user.sessionClaims?.email ||
    !adminEmails.includes(user.sessionClaims.email as string)
  ) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return userId;
}

type AuthHandler = (req: Request, userId: string) => Promise<NextResponse>;

export function withAuth(handler: AuthHandler) {
  return async (req: Request) => {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    return handler(req, authResult);
  };
}

export function withAdmin(handler: AuthHandler) {
  return async (req: Request) => {
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    return handler(req, authResult);
  };
}
