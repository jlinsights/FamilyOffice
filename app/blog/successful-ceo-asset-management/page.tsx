
import type { Metadata } from 'next';
import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Quote, Shield, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '성공한 CEO의 자산관리: 30억 이상 자산가를 위한 시크릿 포트폴리오 | FamilyOffice S',
  description: '성공한 기업가는 자산을 어떻게 관리할까요? 법인 자금의 유동성 확보부터 개인 자산의 안전한 증식, 그리고 세금 없는 부의 이전까지. VVIP 전용 시크릿 포트폴리오를 공개합니다.',
  keywords: ['성공한 CEO 자산관리', '30억 자산가 포트폴리오', '법인 자금 운용', '개인 자산 증식', '패밀리오피스 서비스', '상속세 절세'],
  openGraph: {
    title: '성공한 CEO의 자산관리: 30억 이상 자산가를 위한 시크릿 포트폴리오',
    description: '법인과 개인 자산의 완벽한 분리, 그리고 세금 최적화. 성공한 리더들을 위한 프라이빗 자산관리 전략을 만나보세요.',
    type: 'article',
  }
};

export default function SuccessfulCeoAssetManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 text-white border-none py-1.5 px-4 text-sm font-medium">
            CEO 전용 인사이트
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            성공한 CEO는<br className="md:hidden" /> 자산을 어떻게 관리할까?
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            회사의 성장이 곧 나의 부(Wealth)가 되는 구조.<br/>
            30억 이상 자산가들이 선택하는 <span className="text-blue-400 font-semibold">시크릿 포트폴리오</span>를 공개합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg h-12 px-8">
              무료 상담 신청하기
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Intro */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p className="lead text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300">
              "회사는 계속 성장하고 매출은 늘어나는데, 정작 제 개인 자산은 얼마나 안전한지, 
              나중에 세금으로 다 나가는 건 아닌지 불안합니다."
            </p>
            <p className="mt-6">
              많은 대표님들을 만나뵈며 가장 많이 듣는 고민입니다. 
              기업을 성장시키는 데 모든 열정을 쏟으셨지만, 정작 <strong className="text-blue-600 dark:text-blue-400">개인의 부(Personal Wealth)</strong>를 
              체계적으로 관리할 시간은 부족했기 때문입니다.
            </p>
            <p>
              성공한 CEO의 자산관리는 일반적인 재테크와 근본적으로 다릅니다. 
              단순히 수익률을 쫓는 것이 아니라, <strong>법인 리스크 헷지(Hedge)</strong>와 <strong>가업승계</strong>, 
              그리고 <strong>세금 최적화</strong>가 하나의 톱니바퀴처럼 맞물려 돌아가야 합니다.
            </p>
          </div>

          {/* Key Points Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
              <CardContent className="p-8">
                <Shield className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">1. 자산의 분리 (Asset Segregation)</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  법인 자산과 개인 자산의 명확한 분리가 첫걸음입니다. 
                  회사의 우발채무나 리스크가 개인의 삶을 위협하지 않도록, 
                  안전한 방화벽(Firewall)을 구축해야 합니다.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
              <CardContent className="p-8">
                <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">2. 유동성 확보 (Liquidity)</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  대부분의 자산이 비상장주식이나 부동산에 묶여있지 않으신가요? 
                  긴급 자금이나 상속세 재원을 위해 언제든 현금화할 수 있는 
                  유동성 포트폴리오가 필수적입니다.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
              <CardContent className="p-8">
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">3. 가업승계와 엑시트 (Exit Strategy)</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  자녀에게 기업을 물려줄 것인가, 아니면 매각할 것인가? 
                  어떤 선택을 하든 최소 5년 전부터 준비된 세무 전략이 
                  수십억 원의 차이를 만듭니다.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">4. 은퇴 후의 삶 (Legacy)</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  현역에서 물러난 후에도 존경받는 리더로 남기 위한 준비. 
                  안정적인 현금흐름(Penthouse Cashflow)과 사회적 기여를 위한 
                  재단 설립까지 고려합니다.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Deep Dive Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <h2>30억 이상 자산가를 위한 '시크릿 포트폴리오'란?</h2>
            <p>
              저희 FamilyOffice S는 삼성생명 1000억+ 운용 실적을 바탕으로, 
              대한민국 상위 1% 자산가들을 위한 프라이빗 솔루션을 제공합니다. 
              시크릿 포트폴리오의 핵심은 <strong>"잃지 않는 투자"</strong>와 <strong>"세금 없는 증식"</strong>입니다.
            </p>
            <ul>
              <li>
                <strong>법인 자금의 개인화 전략:</strong> 
                배당, 급여 상여금 설계를 넘어선 이익소각, 자사주 매입 등 고도화된 자본거래 전략.
              </li>
              <li>
                <strong>상속세 재원 마련 ("Tax Funding"):</strong> 
                예상 상속세 50%를 미리 준비하여, 자녀가 회사를 헐값에 매각하거나 
                대출을 받는 비극을 예방합니다.
              </li>
              <li>
                <strong>글로벌 자산 배분:</strong> 
                국내 부동산 중심의 자산 구조에서 탈피하여, 달러 자산 및 글로벌 우량 자산으로 
                포트폴리오를 다변화합니다.
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              대표님의 자산, 전문가의 눈으로 점검받으세요
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              초기 상담은 100% 무료로 진행됩니다. <br className="hidden md:block"/>
              현재 자산 구조의 리스크를 진단하고, 최적의 절세/승계 로드맵을 제안해드립니다.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 h-14" asChild>
              <Link href="/contact">
                전문가 무료 상담 신청하기
              </Link>
            </Button>
            <p className="mt-4 text-sm text-slate-500">
              * 상담 내용은 철저히 비밀이 보장됩니다.
            </p>
          </div>

        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 border-t bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-lg font-bold mb-6">관련 인사이트 더보기</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/services" className="group block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h5 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">자산관리 서비스 상세</h5>
                  <p className="text-sm text-muted-foreground">법인 및 개인 통합 자산관리 솔루션</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/program" className="group block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h5 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">가업승계 프로그램</h5>
                  <p className="text-sm text-muted-foreground">성공적인 승계를 위한 5단계 로드맵</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/tax-strategy" className="group block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h5 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">절세 전략 가이드</h5>
                  <p className="text-sm text-muted-foreground">CEO를 위한 필수 세무 지식</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
