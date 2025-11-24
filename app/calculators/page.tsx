import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Calculator, Gift, Building2, TrendingDown, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '세무 계산기 모음 | FamilyOffice S - 상속세, 증여세, 가업승계 비용 계산',
  description: '상속세, 증여세, 가업승계 비용을 정확하게 계산해보세요. 전문가가 설계한 계산기로 세무 최적화 전략을 확인하실 수 있습니다.',
  keywords: ['상속세 계산기', '증여세 계산기', '가업승계 비용 계산기', '세무 계산', '절세 전략', '패밀리오피스'],
  openGraph: {
    title: '세무 계산기 모음 - FamilyOffice S',
    description: '상속세, 증여세, 가업승계 비용을 전문가 수준으로 계산하고 최적화 방안을 확인하세요',
    url: 'https://familyoffices.vip/calculators',
    images: ['/images/calculators-og.jpg']
  }
};

export default function CalculatorsPage() {
  const calculators = [
    {
      title: '상속세 계산기',
      description: '2025년 최신 세법 기준으로 상속세를 정확하게 계산하고 절세 방안을 확인하세요.',
      icon: Calculator,
      color: 'blue',
      href: '/calculators/inheritance-tax',
      features: [
        '누진세율 정확 계산',
        '공제 한도 자동 적용', 
        '절세 방안 제시'
      ],
      keywords: '월간 검색량 2,200회',
      benefit: '상속세 40% 절약 가능'
    },
    {
      title: '증여세 계산기',
      description: '관계별 공제 한도와 분할증여 최적화를 통한 증여세 계산 및 절세 전략을 제공합니다.',
      icon: Gift,
      color: 'green',
      href: '/calculators/gift-tax',
      features: [
        '관계별 공제 적용',
        '분할증여 시뮬레이션',
        '최적화 제안'
      ],
      keywords: '월간 검색량 1,800회',
      benefit: '분할증여로 50% 절약'
    },
    {
      title: '가업승계 비용 계산기',
      description: '사업체 승계 방법별 비용을 계산하고 가업승계 특례 적용을 통한 최적 전략을 제안합니다.',
      icon: Building2,
      color: 'purple',
      href: '/calculators/succession-cost',
      features: [
        '가업승계 특례 적용',
        '지주회사 활용 분석',
        '방법별 비용 비교'
      ],
      keywords: '월간 검색량 600회',
      benefit: '특례 활용으로 70% 절약'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        icon: 'text-blue-600',
        border: 'border-blue-200',
        bg: 'bg-blue-50/50',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        icon: 'text-green-600',
        border: 'border-green-200',
        bg: 'bg-green-50/50',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        icon: 'text-purple-600',
        border: 'border-purple-200',
        bg: 'bg-purple-50/50',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Calculator className="w-10 h-10 text-blue-600" />
          <h1 className="text-5xl font-bold text-slate-900">세무 계산기</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
          상속세, 증여세, 가업승계 비용을 전문가 수준으로 계산하고 
          최적의 절세 전략을 확인해보세요. 2025년 최신 세법이 모두 반영되어 있습니다.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>2025년 최신 세법 반영</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>누진세율 정확 계산</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>절세 방안 자동 제안</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>전문가 상담 연결</span>
          </div>
        </div>
      </div>

      {/* 계산기 카드들 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {calculators.map((calculator, index) => {
          const Icon = calculator.icon;
          const colorClasses = getColorClasses(calculator.color);
          
          return (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${colorClasses.border} ${colorClasses.bg} group`}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Icon className={`w-12 h-12 ${colorClasses.icon}`} />
                </div>
                <CardTitle className="text-xl mb-2">{calculator.title}</CardTitle>
                <CardDescription className="text-sm text-slate-600 mb-4">
                  {calculator.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-blue-600">
                    {calculator.keywords}
                  </div>
                  <div className="text-xs font-semibold text-green-600">
                    {calculator.benefit}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {calculator.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${colorClasses.button} group-hover:shadow-md transition-all`}
                  size="lg"
                  asChild
                >
                  <a href={calculator.href} className="flex items-center gap-2">
                    계산 시작하기
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 통계 및 성과 */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">계산기 활용 성과</h2>
          <p className="text-slate-300">
            FamilyOffice S 계산기를 통해 달성한 고객들의 실제 절세 성과입니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2,400+</div>
            <div className="text-sm text-slate-300">누적 계산 건수</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">45%</div>
            <div className="text-sm text-slate-300">평균 절세율</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">320억</div>
            <div className="text-sm text-slate-300">누적 절세 금액</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">18%</div>
            <div className="text-sm text-slate-300">상담 전환율</div>
          </div>
        </div>
      </div>

      {/* 전문가 상담 CTA */}
      <div className="text-center bg-blue-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          계산 결과가 나왔다면, 이제 전문가와 상담하세요
        </h2>
        <p className="text-slate-600 mb-6">
          계산기 결과를 바탕으로 개인별 맞춤 세무 최적화 전략을 제안해 드립니다. 
          첫 상담은 무료이며, 구체적인 실행 방안까지 제공합니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
            <a href="/contact?service=tax-consulting" className="flex items-center gap-2">
              무료 세무 상담 신청
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            <a href="tel:0502-5550-8700">
              전화 상담: 0502-5550-8700
            </a>
          </Button>
        </div>
        
        <p className="text-xs text-slate-500 mt-4">
          평일 오전 9시~오후 6시 | 토요일 오전 9시~오후 1시
        </p>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">자주 묻는 질문</h2>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                Q. 계산 결과의 정확도는 어느 정도인가요?
              </h3>
              <p className="text-slate-600 text-sm">
                A. 2025년 최신 세법을 반영하여 95% 이상의 정확도를 제공합니다. 
                단, 개별 사안의 특수성이나 법령 해석에 따라 실제 세액은 다를 수 있으므로 
                정확한 계획 수립을 위해서는 전문가 상담을 권장합니다.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                Q. 계산 결과를 바탕으로 실제 절세가 가능한가요?
              </h3>
              <p className="text-slate-600 text-sm">
                A. 네, 가능합니다. 계산기에서 제시하는 절세 방안들은 실제 적용 가능한 합법적인 방법들입니다. 
                다만 개인별 상황에 따라 적용 방법이 달라질 수 있어 전문가 상담을 통한 
                맞춤형 계획 수립을 추천드립니다.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                Q. 상담 신청 후 어떤 서비스를 받을 수 있나요?
              </h3>
              <p className="text-slate-600 text-sm">
                A. 첫 상담에서는 계산 결과 검토, 개인별 맞춤 전략 제안, 실행 방안 및 일정 수립을 진행합니다. 
                이후 필요에 따라 세무사, 변호사 등 전문가 네트워크를 통한 종합적인 
                패밀리오피스 서비스를 제공받으실 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 관련 서비스 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">관련 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">세무 최적화 서비스</h3>
              <p className="text-sm text-slate-600 mb-4">
                개인별 맞춤 세무 전략 수립 및 실행 지원
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/services/tax-optimization">상세보기</a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">패밀리오피스 서비스</h3>
              <p className="text-sm text-slate-600 mb-4">
                종합적인 자산관리 및 가족 자산 보전 서비스
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/services/family-office">상세보기</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}