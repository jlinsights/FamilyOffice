import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { currentUser } from '@clerk/nextjs/server';
import {
    ChevronRight,
    CreditCard,
    FileText,
    Leaf,
    MessageCircle,
    Settings,
    Shield
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const fullName = `${user.lastName || ''}${user.firstName || ''}`.trim() || user.fullName || '회원';

  // Admin redirect
  if (email === 'jhlim725@gmail.com') {
    redirect('/admin');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
        
        {/* Hero Welcome Section */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-premium-navy opacity-5 dark:opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-4">
              반갑습니다, <span className="text-premium-gold dark:text-premium-gold-enhanced">{fullName}</span>님
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
              FamilyOffice S의 프리미엄 멤버십 서비스를 이용해주셔서 감사합니다.
              <br className="hidden md:block" />
              귀하의 자산 관리와 가업 승계를 위한 맞춤형 솔루션을 확인하세요.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Quick Actions & Status (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Status Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Membership Card */}
                <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-premium dark:shadow-none hover:border-premium-gold/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                       <Shield className="w-6 h-6" />
                     </div>
                     <span className="px-3 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                       Active
                     </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">멤버십 등급</h3>
                  <p className="text-2xl font-playfair font-bold text-premium-navy dark:text-premium-navy-enhanced">
                    Standard <span className="text-sm font-sans font-normal text-slate-500 dark:text-slate-500">Plan</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-4">다음 갱신일: 2026.01.01</p>
                </div>

                {/* Requests Status Card */}
                <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-premium dark:shadow-none hover:border-premium-gold/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                       <MessageCircle className="w-6 h-6" />
                     </div>
                     <span className="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                       답변 대기중
                     </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">최근 상담 요청</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[3rem]">
                    접수된 상담 내역을 검토하고 있습니다. 곧 담당자가 배정될 예정입니다.
                  </p>
                  <Link href="/contact" className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white mt-4 hover:text-premium-gold transition-colors">
                    새 요청하기 <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-premium-gold" />
                  주요 서비스 바로가기
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <QuickActionCard 
                    href="/services"
                    icon={<Settings className="w-6 h-6" />}
                    title="서비스 전체보기"
                    description="가업승계부터 자산관리까지"
                  />
                  <QuickActionCard 
                    href="/program"
                    icon={<CreditCard className="w-6 h-6" />}
                    title="멤버십 프로그램"
                    description="CEO를 위한 특별 혜택"
                  />
                  <QuickActionCard 
                    href="/admin/consultations" 
                    icon={<FileText className="w-6 h-6" />}
                    title="상담 내역 확인"
                    description="진행 중인 프로젝트 현황"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Account Management (lg:col-span-5) */}
            <div className="lg:col-span-12 xl:col-span-4">
              <div className="sticky top-24">
                <div className="glass-premium-enhanced rounded-3xl p-1 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Digital Membership ID Card Look */}
                  <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-[20px] p-6 mobile-card-padding flex flex-col items-center text-center relative overflow-hidden">
                    
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-900 dark:to-transparent opacity-50" />
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-premium-gold/10 rounded-full blur-2xl" />

                    {/* Profile Avatar */}
                    <div className="relative mb-4 z-10">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-premium-gold via-yellow-500 to-amber-600 shadow-lg">
                        <img 
                          src={sessionClaims?.image_url as string || `https://ui-avatars.com/api/?name=${fullName}&background=0D8ABC&color=fff`} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-premium-navy text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                        MEMBER
                      </div>
                    </div>

                    {/* User Info */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 z-10 font-playfair">{fullName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 z-10 font-medium">{email}</p>

                    {/* Membership Badge */}
                    <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-800 flex items-center justify-between group-hover:border-premium-gold/30 transition-colors">
                      <div className="text-left">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Membership</p>
                        <p className="text-lg font-bold text-premium-navy dark:text-premium-navy-enhanced">Standard</p>
                      </div>
                       <div className="h-10 w-10 rounded-full bg-premium-navy/10 flex items-center justify-center">
                         <Shield className="w-5 h-5 text-premium-navy" />
                       </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-3 z-10">
                      <Link 
                        href="/dashboard/profile" 
                        className="flex items-center justify-center w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity shadow-lg"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        계정 설정 관리
                      </Link>
                      
                      <Link 
                        href="/contact"
                        className="flex items-center justify-center w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                       1:1 문의세션
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function QuickActionCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="group p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-premium-gold hover:shadow-premium-gold transition-all duration-300 flex flex-col items-start gap-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:underline decoration-premium-gold/50 underline-offset-4">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </Link>
  );
}
