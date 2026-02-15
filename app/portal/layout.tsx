import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { Header } from '@/components/header';
import { PortalShell } from '@/components/portal-shell';
import { getAdminEmails } from '@/lib/admin-permissions';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  // Admin redirect
  const email = user.emailAddresses[0]?.emailAddress;
  if (email && getAdminEmails().includes(email.toLowerCase())) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
      <Header />
      <PortalShell>{children}</PortalShell>
    </div>
  );
}
