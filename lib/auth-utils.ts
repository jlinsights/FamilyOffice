import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getAdminEmails } from '@/lib/admin-permissions';

export async function requireAuth(): Promise<string | NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return userId;
}

export async function requireAdmin(): Promise<string | NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await auth();
  const adminEmails = getAdminEmails();

  if (
    !user.sessionClaims?.email ||
    !adminEmails.includes(user.sessionClaims.email as string)
  ) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return userId;
}

type AuthHandler = (req: Request, userId: string) => Promise<NextResponse>;

export function withAuth(
  handler: AuthHandler
): (req: Request) => Promise<NextResponse> {
  return async (req: Request) => {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    return handler(req, authResult);
  };
}

export function withAdmin(
  handler: AuthHandler
): (req: Request) => Promise<NextResponse> {
  return async (req: Request) => {
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    return handler(req, authResult);
  };
}
