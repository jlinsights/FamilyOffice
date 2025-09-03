import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  FileText, 
  Shield, 
  TrendingUp,
  Calendar,
  AlertTriangle,
  Clock,
  Target
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: '중소기업 노무관리 전문 컨설팅 | FamilyOffice S',
  description: '중소기업 맞춤형 인사노무 시스템 구축부터 근로계약서, 취업규칙 정비, 급여체계 설계까지. 노무 분쟁 예방과 인건비 최적화로 직원 만족도 향상을 지원합니다.',
  keywords: [
    '중소기업 노무관리',
    '인사노무 컨설팅',
    '근로계약서 작성',
    '취업규칙 정비',
    '급여체계 설계',
    '노무 리스크 관리',
    '노무 분쟁 예방',
    '인건비 최적화',
    '직원 관리 시스템'
  ],
  openGraph: {
    title: '중소기업 노무관리 전문 컨설팅',
    description: '중소기업 맞춤형 인사노무 시스템 구축 및 운영 지원',
    type: 'article',
  },
};

const LaborManagementPage = () => {
  const structuredData = generateStructuredData('Service');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <StructuredData data={structuredData} />
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="py-6 border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">홈</Link>
              <span>/</span>
              <Link href="/solutions" className="hover:text-primary transition-colors">솔루션</Link>
              <span>/</span>
              <span className="text-foreground">중소기업 노무관리</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  <Users className="h-4 w-4 mr-2" />
                  HR Support
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                중소기업 <span className="text-primary">노무관리</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                중소기업 맞춤형 <span className="font-semibold text-primary">인사노무 시스템 구축</span> 및 운영 지원으로 
                노무 분쟁을 사전에 예방하고 직원 만족도를 향상시킵니다
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  buttonText="무료 상담 신청"
                  variant="default"
                  size="lg"
                  className="px-8 py-4 text-lg font-bold"
                  eventType="consultation"
                />
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-bold" asChild>
                  <Link href="/solutions">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    솔루션 목록
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                주요 <span className="text-primary">서비스</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                50인 이하 중소기업 CEO를 위한 체계적인 노무관리 솔루션
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: '노무관리 시스템 구축',
                  description: '체계적인 인사노무 관리 시스템을 구축하여 효율적인 직원 관리 환경을 조성합니다.',
                  color: 'text-blue-600 dark:text-blue-400'
                },
                {
                  icon: FileText,
                  title: '근로계약서 & 취업규칙',
                  description: '법적 요구사항을 충족하는 근로계약서 및 취업규칙을 작성하고 정비합니다.',
                  color: 'text-green-600 dark:text-green-400'
                },
                {
                  icon: TrendingUp,
                  title: '급여체계 설계',
                  description: '공정하고 투명한 급여체계를 설계하여 직원 동기부여와 만족도를 높입니다.',
                  color: 'text-purple-600 dark:text-purple-400'
                },
                {
                  icon: AlertTriangle,
                  title: '노무 리스크 관리',
                  description: '잠재적 노무 분쟁 요소를 사전에 파악하고 예방 방안을 수립합니다.',
                  color: 'text-orange-600 dark:text-orange-400'
                }
              ].map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  기대 <span className="text-primary">효과</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  체계적인 노무관리로 얻을 수 있는 핵심 혜택
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: '노무 분쟁 사전 예방',
                    description: '명확한 규정과 체계로 노무 분쟁 발생 가능성을 최소화합니다.'
                  },
                  {
                    icon: TrendingUp,
                    title: '인건비 최적화',
                    description: '효율적인 급여체계와 인력 운영으로 인건비를 최적화합니다.'
                  },
                  {
                    icon: Target,
                    title: '직원 만족도 향상',
                    description: '투명하고 공정한 노무 환경으로 직원들의 만족도와 충성도가 향상됩니다.'
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="text-center group hover:shadow-md transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  서비스 <span className="text-primary">프로세스</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  체계적인 단계별 접근으로 완성도 높은 노무관리 시스템을 구축합니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: '1',
                    icon: FileText,
                    title: '현황 분석',
                    description: '기업의 현재 노무 환경과 규정을 종합적으로 분석합니다.'
                  },
                  {
                    step: '2',
                    icon: Target,
                    title: '맞춤 설계',
                    description: '기업 특성에 맞는 노무관리 시스템과 규정을 설계합니다.'
                  },
                  {
                    step: '3',
                    icon: Users,
                    title: '시스템 구축',
                    description: '설계된 시스템을 실제 업무 환경에 구축하고 적용합니다.'
                  },
                  {
                    step: '4',
                    icon: Clock,
                    title: '운영 지원',
                    description: '지속적인 모니터링과 개선을 통해 안정적인 운영을 지원합니다.'
                  }
                ].map((process, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <process.icon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {process.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{process.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              체계적인 노무관리로 <br />
              <span className="text-primary">안정적인 기업 운영</span>을 시작하세요
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              50인 이하 중소기업 CEO를 위한 맞춤형 노무관리 컨설팅으로 
              직원 만족도 향상과 비용 절감을 동시에 실현하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 상담 신청"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg font-bold"
                eventType="consultation"
              />
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-bold" asChild>
                <Link href="http://pf.kakao.com/_gsxkxdG/chat" target="_blank" rel="noopener noreferrer">
                  카카오톡 상담하기
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaborManagementPage;