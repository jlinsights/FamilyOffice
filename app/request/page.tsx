import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { RequestTicketForm } from './request-ticket-form';

export const metadata: Metadata = {
  title: 'Concierge Request | FamilyOffice S',
  description: '멤버십 회원을 위한 신속 요청 서비스',
};

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-10 animate-slide-up">
            <Badge variant="outline" className="mb-4 bg-background px-3 py-1 text-xs border-primary/30 text-primary uppercase tracking-wide">
              Concierge Service
            </Badge>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
              Request Ticket
            </h1>
            <p className="text-muted-foreground">
              필요한 서비스를 말씀해 주시면<br/>
              전담 팀이 <strong>즉시 기획</strong>을 시작합니다.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-card border border-border rounded-xl shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <RequestTicketForm />
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
             * 본 서비스는 FamilyOffice S 멤버십 회원 전용입니다.<br/>
             * 급한 용무는 전담 비서 직통 번호로 연락 주시기 바랍니다.
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
