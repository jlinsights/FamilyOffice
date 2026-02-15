import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function OfflinePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">{/* ... */}</div>
      </main>
      <Footer />
    </>
  );
}
