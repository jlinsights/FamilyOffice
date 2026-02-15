import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminEmails } from '@/lib/admin-permissions';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  // Admin redirect
  const email = user.emailAddresses[0]?.emailAddress;
  if (email && getAdminEmails().includes(email.toLowerCase())) {
    redirect('/admin');
  }

  // Redirect to new portal dashboard
  redirect('/portal');
}
