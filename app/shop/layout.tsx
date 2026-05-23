import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/auth/sign-in?redirect_url=/shop');
  }

  return children;
}
