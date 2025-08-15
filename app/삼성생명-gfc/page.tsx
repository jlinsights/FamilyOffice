import type { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalComPopup } from '@/components/cal-com-popup';
import { 
  TrendingUp, 
  Award, 
  Building, 
  Users, 
  CheckCircle, 
  Star,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { StructuredData } from '@/components/structured-data';

// SEO 최적화 메타데이터
export const metadata: Metadata = generateMetadata(
  '삼성생명 GFC 채용 | 기업재무컨설턴트 위촉 모집',
  '삼성생명 GFC(기업재무컨설턴트) 위촉 모집. 가업승계, 패밀리오피스 전문가. 높은 수입보장, 체계적 교육, 전문 브랜드. 경력무관 환영. 잡페어 참가 ☎0502-5550-8700',
  [
    '삼성생명 GFC 채용',
    '삼성생명 GFC란',
    '기업재무컨설턴트',
    'GFC 자격조건',
    'GFC 연봉',
    'GFC 수입',
    '삼성생명 잡페어',
  ]
);

export default function SamsungGFCPage() {
  const organizationData = generateStructuredData('Organization');
  
  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={organizationData} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600/10 via-background to-blue-600/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              삼성생명 공식 채용
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              삼성생명 GFC 채용
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              기업재무컨설턴트로 성공의 기회를 잡으세요<br />
              가업승계·패밀리오피스 전문가가 되는 길
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="GFC 채용 상담 신청"
                variant="default"
                size="lg"
              />
              <Button variant="outline" size="lg" asChild>
                <a href="tel:0502-5550-8700">
                  <Phone className="mr-2 h-4 w-4" />
                  ☎ 0502-5550-8700
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* GFC 소개 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              GFC(기업재무컨설턴트)란?
            </h2>
            <p className="text-lg text-muted-foreground">
              삼성생명의 프리미엄 기업재무컨설턴트로서<br />
              중소중견기업 CEO들에게 가업승계, 자산관리, 절세전략 등<br />
              종합적인 재무컨설팅을 제공하는 전문가입니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">기업 전문</h3>
              <p className="text-muted-foreground">
                중소중견기업 CEO<br />
                맞춤형 컨설팅
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">높은 수입</h3>
              <p className="text-muted-foreground">
                프리미엄 고객<br />
                고수익 보장
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">전문 브랜드</h3>
              <p className="text-muted-foreground">
                삼성생명의<br />
                신뢰와 명성
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">체계적 교육</h3>
              <p className="text-muted-foreground">
                전문가 양성<br />
                교육 시스템
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 채용 조건 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              GFC 자격조건 및 우대사항
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  기본 자격조건
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 4년제 대졸 이상</li>
                  <li>• 금융/경영/회계 관련 전공 우대</li>
                  <li>• 기본적인 PC 활용 능력</li>
                  <li>• 원활한 의사소통 능력</li>
                  <li>• 성실하고 책임감 있는 성격</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  우대사항
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 금융업계 경험자</li>
                  <li>• 보험/증권/은행 근무 경력</li>
                  <li>• 자산관리/재무설계 경험</li>
                  <li>• 영업/컨설팅 경험</li>
                  <li>• 관련 자격증 보유자</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 혜택 및 지원 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            GFC 혜택 및 지원사항
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">높은 수수료</h3>
              <p className="text-muted-foreground">
                프리미엄 고객 대상<br />
                고수익 수수료 체계
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">전문 교육</h3>
              <p className="text-muted-foreground">
                체계적인 교육과정<br />
                전문가 멘토링
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">브랜드 지원</h3>
              <p className="text-muted-foreground">
                삼성생명 브랜드<br />
                마케팅 지원
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 채용 프로세스 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            채용 프로세스
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">지원서 접수</h3>
                  <p className="text-muted-foreground">
                    온라인 지원서 작성 및 제출. 경력사항과 자기소개서 작성
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">서류 심사</h3>
                  <p className="text-muted-foreground">
                    지원서류 검토 및 기본 자격요건 확인 (3-5일 소요)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">면접 진행</h3>
                  <p className="text-muted-foreground">
                    1차 실무진 면접, 2차 임원 면접 (개별 일정 조율)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">최종 선발</h3>
                  <p className="text-muted-foreground">
                    위촉계약 체결 및 교육 과정 안내
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              삼성생명 GFC로 성공하세요
            </h2>
            <p className="text-xl mb-8 opacity-90">
              전문적인 기업재무컨설턴트로서<br />
              높은 수입과 안정적인 커리어를 만들어가세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="GFC 채용 상담 예약"
                variant="secondary"
                size="lg"
              />
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Calendar className="mr-2 h-4 w-4" />
                잡페어 일정 확인
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}