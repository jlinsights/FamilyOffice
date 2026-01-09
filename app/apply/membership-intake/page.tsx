import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import { MembershipIntakeForm } from './membership-intake-form';

export const metadata: Metadata = {
  title: '멤버십 진단 | FamilyOffice S',
  description: '10분 진단으로 당신에게 꼭 맞는 멤버십 등급과 운영 방식을 제안받으세요.',
};

export default function MembershipIntakePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-12 animate-slide-up">
            <Badge variant="outline" className="mb-4 bg-background px-4 py-1 text-sm border-primary/30 text-primary">
              Membership Intake
            </Badge>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              10분 진단으로 완성되는<br className="hidden sm:block" /> 
              <span className="text-primary">맞춤형 프리미엄 설계</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              당신의 목적(시간/의사결정/가족/컬렉션)에 맞춰,<br/>
              최적의 멤버십 범위와 운영 방식을 제안해 드립니다.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>목적/예산 분석</span>
                </div>
                 <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>최적 등급 제안</span>
                </div>
                 <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>24시간내 회신</span>
                </div>
                 <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>프라이버시 보장</span>
                </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-card border border-border rounded-xl shadow-lg p-6 md:p-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <MembershipIntakeForm />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
