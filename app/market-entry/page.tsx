import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Globe, 
  Target,
  CheckCircle,
  ArrowRight,
  FileText,
  Network,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Korea Market Entry Solutions | Strategic Partnership Services',
  description: 'Comprehensive Korea market entry solutions for global companies. Specialized in financial services, premium markets, and institutional investor relations.',
  keywords: 'Korea market entry, strategic partnership, financial services Korea, market entry consulting, Korean business entry',
  openGraph: {
    title: 'Korea Market Entry Solutions | FamilyOffices.vip',
    description: 'Expert guidance for global companies entering the Korean market with specialized industry solutions.',
    type: 'website',
    locale: 'ko_KR',
  },
}

const industrySpecificSolutions = [
  {
    category: "Financial Services",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    subtitle: "Specialized entry strategies for financial institutions",
    solutions: [
      {
        title: "Asset Management Companies",
        description: "한국 기관투자자 대상 서비스 런칭",
        keyPoints: [
          "한국 기관투자자 대상 서비스 런칭",
          "규제 요구사항 분석 및 대응",
          "Family Office 고객 네트워크 연결"
        ]
      },
      {
        title: "Private Banking & Wealth Management",
        description: "Ultra-HNW 고객 발굴 및 관계 구축",
        keyPoints: [
          "Ultra-HNW 고객 발굴 및 관계 구축",
          "프리미엄 서비스 현지화 전략",
          "Cross-border 자산 관리 솔루션"
        ]
      },
      {
        title: "FinTech & RegTech",
        description: "한국 금융 생태계 진입 전략",
        keyPoints: [
          "한국 금융 생태계 진입 전략",
          "기술 파트너십 및 라이센싱 지원",
          "Pilot 프로그램 설계 및 실행"
        ]
      }
    ]
  },
  {
    category: "Premium Services",
    icon: <Building2 className="h-8 w-8 text-primary" />,
    subtitle: "Luxury and premium market entry strategies",
    solutions: [
      {
        title: "Luxury Brands & Services",
        description: "한국 럭셔리 시장 분석 및 진입 전략",
        keyPoints: [
          "한국 럭셔리 시장 분석 및 진입 전략",
          "HNW/UHNW 고객층 접근 방법",
          "브랜드 포지셔닝 및 마케팅 전략"
        ]
      },
      {
        title: "Real Estate & Investment",
        description: "한국 부동산 투자 기회 분석",
        keyPoints: [
          "한국 부동산 투자 기회 분석",
          "Family Office 대상 투자 상품 개발",
          "법적/세무적 구조 설계"
        ]
      },
      {
        title: "Professional Services",
        description: "전문 서비스 현지화 및 네트워크 구축",
        keyPoints: [
          "전문 서비스 현지화 및 네트워크 구축",
          "B2B 고객 발굴 및 관계 관리",
          "업계 표준 및 규제 준수"
        ]
      }
    ]
  }
]

const marketEntryProcess = [
  {
    step: "01",
    title: "Market Analysis & Strategy",
    description: "시장 분석 및 전략 수립",
    details: [
      "한국 시장 환경 분석",
      "경쟁 환경 및 기회 평가",
      "진입 전략 및 타임라인 수립",
      "규제 요구사항 분석"
    ]
  },
  {
    step: "02",
    title: "Regulatory Compliance",
    description: "규제 준수 및 라이센싱",
    details: [
      "필요 라이센스 및 허가 확인",
      "규제 당국과의 커뮤니케이션",
      "컴플라이언스 체계 구축",
      "법적 구조 설계"
    ]
  },
  {
    step: "03",
    title: "Network Development",
    description: "네트워크 구축 및 파트너십",
    details: [
      "핵심 파트너 식별 및 접촉",
      "업계 네트워크 연결",
      "전문가 그룹 구성",
      "고객 발굴 채널 개발"
    ]
  },
  {
    step: "04",
    title: "Implementation & Launch",
    description: "실행 및 런칭",
    details: [
      "서비스 현지화 및 적용",
      "팀 구성 및 교육",
      "마케팅 및 홍보 전략",
      "성과 모니터링 체계"
    ]
  }
]

const serviceHighlights = [
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "10+ Years Experience",
    description: "한국 시장 진출 전문 경험"
  },
  {
    icon: <Network className="h-6 w-6 text-primary" />,
    title: "60+ Professional Network",
    description: "전문가 네트워크 및 파트너십"
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Proven Track Record",
    description: "검증된 성공 사례 및 실적"
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Regulatory Expertise",
    description: "규제 전문성 및 컴플라이언스"
  }
]

export default function MarketEntryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-background/80 backdrop-blur-sm animate-fade-in">
              Market Entry Solutions
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              Korea Market Entry{'\n'}
              <span className="text-foreground">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
              글로벌 기업의 한국 시장 진출을 위한 전문 솔루션과 전략적 파트너십을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/contact">
                  무료 시장 분석 상담
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/success-stories">
                  성공 사례 보기
                  <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {serviceHighlights.map((highlight, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {highlight.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry-Specific Solutions */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Industry-Specific Solutions
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                산업별 특화된 한국 시장 진출 솔루션을 제공합니다.
              </p>
            </div>

            <div className="space-y-16">
              {industrySpecificSolutions.map((industry, index) => (
                <div key={index} className="card-modern p-8 animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center mb-8">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      {industry.icon}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-semibold text-foreground">{industry.category}</h3>
                      <p className="text-muted-foreground mt-2">{industry.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {industry.solutions.map((solution, idx) => (
                      <div key={idx} className="card-modern p-6 hover:shadow-lg transition-all duration-300">
                        <h4 className="text-lg font-semibold text-foreground mb-3">{solution.title}</h4>
                        <p className="text-muted-foreground mb-4">{solution.description}</p>
                        <ul className="space-y-2">
                          {solution.keyPoints.map((point, pointIdx) => (
                            <li key={pointIdx} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Entry Process */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Market Entry Process
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                체계적인 4단계 프로세스로 성공적인 한국 시장 진출을 지원합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketEntryProcess.map((process, index) => (
                <div key={index} className="card-modern p-8 text-center hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="text-4xl font-bold text-primary mb-4">{process.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{process.title}</h3>
                  <p className="text-muted-foreground mb-6">{process.description}</p>
                  <ul className="space-y-2 text-sm">
                    {process.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        <span className="text-left text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-slide-up">
              한국 시장 진출을 위한 전략적 파트너십
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up opacity-90 leading-relaxed" style={{ animationDelay: '200ms' }}>
              전문가와 함께 성공적인 한국 시장 진출 전략을 수립하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/contact">
                  무료 상담 신청
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/strategic-partnership">
                  Strategic Partnership
                  <Briefcase className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}