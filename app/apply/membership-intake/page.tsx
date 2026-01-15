import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Key, Shield, Users } from 'lucide-react';
import { Metadata } from 'next';
import { MembershipIntakeForm } from './membership-intake-form';

export const metadata: Metadata = {
  title: '멤버십 진단 | FamilyOffice S',
  description: '10분 진단으로 당신에게 꼭 맞는 멤버십 등급과 운영 방식을 제안받으세요. Foundation부터 Legacy까지 자산 규모와 라이프스타일에 맞는 최적의 등급을 찾아드립니다.',
};

export default function MembershipIntakePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section - Premium Design */}
          <div className="text-center mb-12 animate-slide-up">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/10">
              <Clock className="h-3 w-3 mr-2" />
              10분 진단
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              당신의 시간은 소중합니다.<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">나만의 등급을 찾아드립니다.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              자산 구조와 라이프스타일을 분석해<br className="hidden md:block"/>
              <span className="font-medium text-foreground">Foundation부터 Legacy까지</span> 최적의 멤버십을 제안드립니다.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <Shield className="h-5 w-5 text-amber-500" />
                <span className="text-xs text-muted-foreground">프라이버시 보장</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <Users className="h-5 w-5 text-amber-500" />
                <span className="text-xs text-muted-foreground">전담 컨시어지</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-xs text-muted-foreground">24시간내 회신</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <Key className="h-5 w-5 text-amber-500" />
                <span className="text-xs text-muted-foreground">VIP 접근성</span>
              </div>
            </div>

            {/* Process Steps */}
            <div className="flex justify-center gap-2 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>간단 진단</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>등급 제안</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>온보딩</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>실행</span>
              </div>
            </div>
          </div>

          {/* Form Section - Premium Card */}
          <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-xl p-6 md:p-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <MembershipIntakeForm />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
