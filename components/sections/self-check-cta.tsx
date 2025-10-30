'use client';

import Link from 'next/link';
import { Shield, Building, ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SelfCheckCTASection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <div className="container">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">Risk & Tax Self-Check</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">자가진단으로 맞춤 솔루션 받기</h2>
          <p className="text-muted-foreground mt-3">10문항 체크 → 점수화 → 권장 패키지 제안</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/serious-accident-law#risk-assessment" className="block">
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card text-card-foreground border border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-200/80 dark:bg-red-900/30 text-red-700 dark:text-red-400 flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">중대재해 위험도 자가진단</CardTitle>
                    <p className="text-sm text-muted-foreground">Essential/Advanced/Premium 패키지 추천</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary">
                  바로 시작하기 <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inheritance-gift-tax#self-check" className="block">
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card text-card-foreground border border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-200/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">승계·증여(법인명의) 자가진단</CardTitle>
                    <p className="text-sm text-muted-foreground">Cash Shield/Value Control/Succession Ready 권장</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary">
                  바로 시작하기 <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}


