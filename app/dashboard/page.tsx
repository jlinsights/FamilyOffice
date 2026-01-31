import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  // Admin redirect
  const email = user.emailAddresses[0]?.emailAddress;
  if (email === 'jhlim725@gmail.com') {
    redirect('/admin');
  }

  // Redirect to new portal dashboard
  redirect('/portal');
}
