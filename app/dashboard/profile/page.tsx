import { redirect } from 'next/navigation';
import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] pt-24 pb-16 transition-colors duration-500">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white mb-2">
            계정 설정
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            개인정보 및 보안 설정을 관리하세요.
          </p>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
            <UserProfile
              routing="hash"
              appearance={{
                elements: {
                  rootBox: 'w-full mx-auto',
                  card: 'shadow-none border-0 bg-transparent dark:bg-transparent w-full',
                  navbar: 'hidden md:flex', // Hide navbar on mobile for cleaner look if needed, or keep it
                  navbarButton:
                    'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
                  headerTitle: 'text-slate-900 dark:text-white',
                  headerSubtitle: 'text-slate-500 dark:text-slate-500',
                  profileSectionTitle:
                    'text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4',
                  profileSectionPrimaryButton:
                    'bg-premium-navy text-white hover:opacity-90 transition-opacity',
                  userPreviewMainIdentifier:
                    'text-slate-900 dark:text-white font-semibold',
                  userPreviewSecondaryIdentifier:
                    'text-slate-500 dark:text-slate-400',
                  formButtonPrimary: 'bg-premium-navy hover:bg-premium-navy/90',
                  formFieldInput:
                    'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white',
                  formFieldLabel: 'text-slate-700 dark:text-slate-300',
                },
                variables: {
                  colorPrimary: '#0f172a',
                  colorText: '#334155',
                  fontFamily: 'inherit',
                  colorBackground: 'transparent',
                },
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
