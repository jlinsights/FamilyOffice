'use client';

import { AlertTriangle, Shield, Crown, Target, ArrowRight, Building, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalComPopup } from '@/components/cal-com-popup';

export function DualPillarSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background dark:from-background dark:to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Crown className="h-3 w-3 mr-1" />
            한국 중견·패밀리기업 전용 리스크·세무 통합
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            이중 방어선으로 완성하는 기업 지속성
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            중대재해처벌법 통합 대응 × 승계세무 최적화<br />
            <span className="text-base font-medium text-primary">Compliance + Insurance + Tax Engineering = 차세대 경영 기반</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pillar 1: 중대재해 대응 */}
          <Card className="hover:shadow-xl transition-all duration-300 bg-card text-card-foreground border border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-200/80 dark:bg-red-900/30 text-red-700 dark:text-red-400 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">중대재해 대응 솔루션</CardTitle>
                  <p className="text-sm text-muted-foreground">사고 전 예방/교육/점검 + 사고 후 비용/법률 대응</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 mb-4 text-muted-foreground">
                <li>• D&O/임원배상, 변호사비/벌금, 사고대응 비용 담보</li>
                <li>• 업종별(제조/건설/물류/IT시설) 안전 가이드 + 교육·점검 연계</li>
                <li>• Essential / Advanced / Premium 패키지</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/serious-accident-law" className="inline-flex items-center px-4 py-2 text-sm rounded-lg border hover:bg-muted">
                  <Shield className="h-4 w-4 mr-2" /> 상세 보기
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <CalComPopup
                  buttonText="30분 리스크 스크리닝"
                  size="sm"
                  className="px-4 py-2 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pillar 2: 승계·증여(법인명의) */}
          <Card className="hover:shadow-xl transition-all duration-300 bg-card text-card-foreground border border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-200/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">승계·증여(법인명의) 설계</CardTitle>
                  <p className="text-sm text-muted-foreground">세후 유동성 확보 + 비상장주식 가치/거버넌스 설계</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 mb-4 text-muted-foreground">
                <li>• 법인명의 종신/정기 조합, 콜옵션·주식매수자금·구주매입 시나리오</li>
                <li>• 배당/급여/퇴직금 병행, 단계별 타이밍·증빙 문서화</li>
                <li>• Cash Shield / Value Control / Succession Ready 패키지</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/inheritance-gift-tax" className="inline-flex items-center px-4 py-2 text-sm rounded-lg border hover:bg-muted">
                  <HeartHandshake className="h-4 w-4 mr-2" /> 상세 보기
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <CalComPopup
                  buttonText="유동성·세무 상담"
                  size="sm"
                  className="px-4 py-2 text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="px-8 py-6 text-base">
            <Link href="/solutions">
              <Target className="h-5 w-5 mr-2" />
              업종·규모별 맞춤 패키지 보기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


