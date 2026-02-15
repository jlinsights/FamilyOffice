import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminEmails } from '@/lib/admin-permissions';
import { StructureCheckDashboard } from '@/components/admin/structure-check-dashboard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const metadata: Metadata = {
  title: '구조 점검 요청 관리 | Admin',
  description: '구조 점검 요청 목록 및 관리',
};

export default async function StructureCheckAdminPage() {
  // 관리자 권한 확인
  const user = await currentUser();
  const primaryEmail = user?.emailAddresses.find(
    email => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!user || !primaryEmail || !getAdminEmails().includes(primaryEmail.toLowerCase())) {
    redirect('/');
  }

  // Supabase에서 구조 점검 요청 목록 가져오기 (Admin Client 사용)
  const supabase = createAdminClient();
  const { data: requests, error } = await supabase
    .from('structure_check_requests')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching structure check requests:', error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              구조 점검 요청 관리
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              가망고객의 구조 점검 요청을 확인하고 관리합니다
            </p>
          </div>

          <StructureCheckDashboard initialRequests={requests || []} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
