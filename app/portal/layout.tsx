import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import { Header } from '@/components/header';
import { PortalSidebar } from '@/components/portal-sidebar';

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
  if (email === 'jhlim725@gmail.com') {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
      <Header />
      <div className="flex pt-16">
        <PortalSidebar />
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-4rem)] transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
