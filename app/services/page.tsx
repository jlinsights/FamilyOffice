import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Building, Factory, Hammer, Cpu, TrendingUp, Shield, Calculator, FileText, PieChart, Globe, Award, Users, Target, Star, Zap, Crown, Phone, MessageSquare, MapPin, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "중소중견기업 전문 자산관리 서비스 | FamilyOffice S",
  description: "제조업, 건설업, IT벤처기업 등 업종별 특화 자산관리. 중대재해처벌법 대응부터 가족법인 설립, 승계 설계까지 통합 솔루션.",
  keywords: "중소중견기업 자산관리, 제조업 자산관리, 건설업 보험, 벤처기업 정책자금, 중대재해처벌법, 가족법인 설립",
}

export default function ServicePage() {
  // 실적 및 신뢰성 지표
  const serviceStats = [
    {
      icon: TrendingUp,
      value: "500억원+",
      label: "누적 관리 자산",
      description: "중소중견기업 전문 관리 실적"
    },
    {
      icon: Building,
      value: "500+",
      label: "법인 고객사",
      description: "다양한 업종의 중소중견기업"
    },
    {
      icon: Award,
      value: "20년",
      label: "전문 경험",
      description: "중소중견기업 자산관리 노하우"
    },
    {
      icon: Users,
      value: "98%",
      label: "고객 만족도",
      description: "지속적인 신뢰 관계 구축"
    }
  ]

  const coreServices = [
    {
      icon: Calculator,
      title: "Tax Management",
      subtitle: "세무 최적화",
      description: "중소중견기업 특화 세무 전략과 법인-개인 자산 분리를 통한 절세 솔루션",
      features: [
        "법인세 최적화 전략",
        "개인-법인 자산 분리",
        "절세 구조 설계",
        "세무 리스크 관리"
      ],
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: TrendingUp,
      title: "Investment Management",
      subtitle: "투자 관리",
      description: "기업 성장단계별 맞춤 투자 전략과 위험업종 특화 포트폴리오 구성",
      features: [
        "성장단계별 투자전략",
        "위험업종 특화 포트폴리오",
        "정책자금 활용 컨설팅",
        "자금조달 최적화"
      ],
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Building,
      title: "Succession Planning", 
      subtitle: "승계 설계",
      description: "가족법인 설립부터 자녀 승계까지 안전한 경영권 이전 설계",
      features: [
        "가족법인·자녀법인 설립",
        "경영권 승계 전략",
        "상속·증여 최적화",
        "차세대 교육 프로그램"
      ],
      gradient: "from-purple-500/10 to-pink-500/10"
    }
  ]

  const industryServices = [
    {
      icon: Factory,
      title: "제조업 특화 서비스",
      description: "전통 제조업부터 첨단 제조업까지, 제조업의 특성을 반영한 전문 자산관리",
      specialServices: [
        {
          name: "중대재해처벌법 대응",
          detail: "중대재해처벌법 시행에 따른 종합 대응 전략과 기업재해보장보험 설계"
        },
        {
          name: "생산설비 보험 최적화",
          detail: "생산설비 특성에 맞는 재산종합보험과 기계보험 최적화"
        },
        {
          name: "원자재 리스크 헤지",
          detail: "원자재 가격 변동성에 대한 헤지 전략과 공급망 리스크 관리"
        },
        {
          name: "ESG 경영 지원",
          detail: "환경규제 대응과 ESG 경영을 위한 투자 전략 및 자금조달"
        }
      ],
      caseStudy: {
        company: "중견 자동차부품 제조업 K사",
        challenge: "중대재해처벌법 시행으로 CEO 형사처벌 리스크 증가, 안전관리체계 구축 및 관련 보험 필요",
        solution: "기업재해보장보험 설계, 안전관리 컨설팅, CEO 개인보험 최적화를 통한 통합 솔루션 제공",
        result: "연간 보험료 30% 절감과 동시에 포괄적 리스크 커버리지 달성"
      }
    },
    {
      icon: Hammer,
      title: "건설·위험업종 서비스",
      description: "건설업 등 위험업종의 특수성을 고려한 전문 자산관리 및 리스크 관리",
      specialServices: [
        {
          name: "기업재해보장보험 전문 설계",
          detail: "고위험 업종 특성에 맞는 기업재해보장보험과 임원배상책임보험"
        },
        {
          name: "시공보증보험 최적화",
          detail: "공사이행보증, 하자보수보증 등 시공보증보험 최적화"
        },
        {
          name: "하도급 리스크 관리",
          detail: "하도급거래 공정화에 관한 법률 대응과 관련 보험 설계"
        },
        {
          name: "프로젝트 파이낸싱",
          detail: "대형 건설 프로젝트를 위한 자금조달과 투자구조 설계"
        }
      ],
      caseStudy: {
        company: "종합건설업 L사",
        challenge: "고위험 업종으로 보험료 부담 과다, 프로젝트별 리스크 관리 체계 필요",
        solution: "업종 특화 보험 패키지 설계, 프로젝트별 보험 최적화, 안전관리 시스템 도입 지원",
        result: "보험비용 25% 절감, 프로젝트 리스크 관리 체계 확립"
      }
    },
    {
      icon: Cpu,
      title: "IT·벤처기업 서비스",
      description: "기술기업의 성장 단계별 맞춤형 자산관리 및 투자 전략",
      specialServices: [
        {
          name: "정책자금 활용 컨설팅",
          detail: "정부 정책자금(기술보증기금, 신용보증기금 등) 활용 최적화"
        },
        {
          name: "핵심인재 보험 설계",
          detail: "핵심인재 이탈 방지를 위한 스톡옵션과 퇴직연금 설계"
        },
        {
          name: "스톡옵션 세무 최적화",
          detail: "스톡옵션 발행과 행사 시점의 세무 최적화 전략"
        },
        {
          name: "IPO 준비 지원",
          detail: "기업공개(IPO) 준비를 위한 자본구조 개선과 투자 유치 지원"
        }
      ],
      caseStudy: {
        company: "AI 기술 스타트업 M사",
        challenge: "Series B 투자 유치 후 핵심인재 retention과 세무 최적화 필요",
        solution: "스톡옵션 설계, 핵심인재 인센티브 프로그램, 법인 구조 최적화",
        result: "핵심인재 retention rate 95% 달성, 세무비용 40% 절감"
      }
    },
    {
      icon: Building,
      title: "가족법인·MSO 서비스",
      description: "가족법인 설립부터 MSO 운영까지 세대를 넘나드는 자산관리",
      specialServices: [
        {
          name: "가족법인·자녀법인 설립",
          detail: "가족 자산의 체계적 관리와 승계를 위한 법인 구조 설계"
        },
        {
          name: "경영권 승계 전략",
          detail: "지배구조 설계와 경영권 승계를 위한 단계별 전략 수립"
        },
        {
          name: "MSO 구조 설계",
          detail: "다중 사업 운영을 위한 MSO(Multi-Site Operations) 구조화"
        },
        {
          name: "차세대 교육 펀드",
          detail: "자녀 교육과 차세대 경영진 양성을 위한 교육 펀드 설계"
        }
      ],
      caseStudy: {
        company: "2세 제조업체 N사",
        challenge: "창업주 고령화로 승계 준비 필요, 복잡한 가족 자산 정리 필요",
        solution: "가족법인 설립, 지분 승계 전략, 세무 최적화를 통한 단계별 승계 설계",
        result: "승계세 30% 절감, 경영권 안정적 이전 완료"
      }
    }
  ]

  const additionalServices = [
    {
      icon: Shield,
      title: "기업 리스크 관리",
      description: "중소중견기업이 직면하는 다양한 리스크에 대한 종합적 관리 솔루션",
      features: [
        "중대재해처벌법 대응",
        "사이버보안 리스크 관리", 
        "공급망 리스크 헤지",
        "환율·금리 리스크 관리"
      ]
    },
    {
      icon: PieChart,
      title: "투자 포트폴리오 관리",
      description: "법인과 개인 자산을 통합한 최적의 투자 포트폴리오 구성",
      features: [
        "법인-개인 통합 포트폴리오",
        "대체투자 기회 발굴",
        "ESG 투자 전략",
        "해외투자 진출 지원"
      ]
    },
    {
      icon: FileText,
      title: "법무·컴플라이언스",
      description: "기업 운영에 필요한 법무 지원과 컴플라이언스 관리",
      features: [
        "기업지배구조 설계",
        "계약서 검토·작성",
        "법규 준수 관리",
        "소송 리스크 관리"
      ]
    },
    {
      icon: Globe,
      title: "글로벌 자산관리",
      description: "해외 진출과 글로벌 자산 배분을 위한 전문 서비스",
      features: [
        "해외법인 설립 지원",
        "국제세무 최적화",
        "해외투자 리스크 관리",
        "글로벌 자산 배분"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative section min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30" />
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              <Zap className="h-3 w-3 mr-1" />
              Professional Services
            </Badge>
            
            <h1 className="mb-6 text-balance animate-slide-up font-bold leading-tight">
              중소중견기업 법인 대표를 위한 <span className="text-primary">전문 자산관리 서비스</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
              <span className="font-semibold text-foreground">10년+ 가업승계 노하우</span>와 <span className="font-semibold text-primary">500억원+ 관리 실적</span>을 바탕으로
              <br className="hidden sm:block" />
              업종별 특화된 통합 자산관리 솔루션을 제공합니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Button size="lg" asChild className="btn-primary group">
                <Link href="/contact" className="flex items-center">
                  무료 상담 신청
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/program" className="flex items-center">
                  프로그램 안내
                  <Crown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 실적 통계 섹션 */}
      <section className="section bg-gradient-to-r from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Award className="h-3 w-3 mr-1" />
              Proven Excellence
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              <span className="text-primary">검증된 실적</span>과 <span className="text-primary">전문성</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {serviceStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={index} 
                  className="text-center animate-slide-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground text-pretty">{stat.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 핵심 서비스 3가지 */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 animate-fade-in">
              <Target className="h-3 w-3 mr-1" />
              Core Services
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              중소중견기업 법인 대표 전문 <span className="text-primary">핵심 서비스</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              세무부터 투자, 승계까지 법인 대표님을 위한 통합 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div 
                  key={index} 
                  className={`card p-8 bg-gradient-to-br ${service.gradient} animate-slide-up`} 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
                  <p className="text-lg font-medium text-primary mb-4 text-center">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-6 text-pretty leading-relaxed text-center">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 업종별 특화 서비스 */}
      <section className="section bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Building className="h-3 w-3 mr-1" />
              Industry Expertise
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              업종별 특화 <span className="text-primary">전문 서비스</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              각 업종의 특성과 리스크를 깊이 이해한 맞춤형 자산관리 솔루션
            </p>
          </div>

          <div className="space-y-16">
            {industryServices.map((industry, index) => {
              const IconComponent = industry.icon
              return (
                <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{industry.title}</h3>
                      <p className="text-muted-foreground text-pretty">{industry.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 전문 서비스 */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold mb-4">전문 서비스</h4>
                      {industry.specialServices.map((service, idx) => (
                        <div key={idx} className="card p-6">
                          <h5 className="font-semibold mb-2">{service.name}</h5>
                          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{service.detail}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* 성공 사례 */}
                    <div className="card p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="flex items-center space-x-2 mb-4">
                        <Star className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">성공 사례</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-primary">{industry.caseStudy.company}</h5>
                        </div>
                        
                        <div>
                          <h6 className="font-medium mb-2">과제</h6>
                          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{industry.caseStudy.challenge}</p>
                        </div>
                        
                        <div>
                          <h6 className="font-medium mb-2">솔루션</h6>
                          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{industry.caseStudy.solution}</p>
                        </div>
                        
                        <div>
                          <h6 className="font-medium mb-2">결과</h6>
                          <p className="text-sm font-medium text-primary text-pretty leading-relaxed">{industry.caseStudy.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 전문가 팀 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Expert Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">중소중견기업 전문가 팀</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">20년 이상의 경험을 보유한 중소중견기업 자산관리 전문가들이 함께합니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 임재홍 */}
            <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `0ms` }}>
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">임재홍</h3>
              <p className="text-primary font-medium mb-1">대표 컨설턴트 / 수석</p>
              <p className="text-sm text-muted-foreground mb-2">중소중견기업 전문, 패밀리오피스 설계</p>
              <p className="text-muted-foreground text-sm">대형 금융그룹 출신으로 중소중견기업 자산관리 경험과 전문성 보유</p>
            </div>
            {/* 장현오 */}
            <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `150ms` }}>
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">장현오</h3>
                              <p className="text-primary font-medium mb-1">FamilyOffice S</p>
              <p className="text-sm text-muted-foreground mb-2">제조업·건설업 전문, 중대재해처벌법 대응</p>
              <p className="text-muted-foreground text-sm">위험업종 전문 보험설계 및 기업재해보장보험 설계 전문가</p>
            </div>
            {/* 박병학 */}
            <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `300ms` }}>
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">박병학</h3>
              <p className="text-primary font-medium mb-1">세무 회계 본부장</p>
              <p className="text-sm text-muted-foreground mb-2">가족법인 설립, 승계 설계, MSO 구조화</p>
              <p className="text-muted-foreground text-sm">Big4 회계법인 출신으로 중소중견기업 세무 및 승계 전문가</p>
            </div>
            {/* 주상미 */}
            <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `450ms` }}>
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">주상미</h3>
              <p className="text-primary font-medium mb-1">FP (Financial Planner)</p>
              <p className="text-sm text-muted-foreground mb-2">투자 포트폴리오 관리, 리스크 헤지</p>
              <p className="text-muted-foreground text-sm">투자은행 출신으로 중소중견기업 맞춤형 투자전략 설계 전문가</p>
            </div>
          </div>
        </div>
      </section>

      {/* 추가 서비스 */}
      <section className="section bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Globe className="h-3 w-3 mr-1" />
              Additional Services
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              통합 자산관리를 위한 <span className="text-primary">부가 서비스</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div 
                  key={index} 
                  className="card p-6 animate-slide-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-center">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 text-center text-pretty leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 연락처 및 CTA 섹션 */}
      <section id="contact" className="section bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 animate-fade-in">
              <Phone className="h-3 w-3 mr-1" />
              상담 문의
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              전문 컨설팅 상담 문의
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              중소중견기업 법인 대표님을 위한 프리미엄 자산관리 서비스
            </p>
            
            {/* 연락처 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="card p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">전화 상담</h3>
                <p className="text-2xl font-bold text-primary mb-2">0502-5550-8700</p>
                <p className="text-sm text-muted-foreground">평일 10:00~18:00</p>
              </div>
              <div className="card p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">카카오채널</h3>
                <p className="text-lg font-bold text-primary mb-2">@패밀리오피스</p>
                <p className="text-sm text-muted-foreground">24시간 상담 가능</p>
              </div>
              <div className="card p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">상담 예약</h3>
                <p className="text-sm text-muted-foreground mb-2">온라인 예약 시스템</p>
                <p className="text-sm text-muted-foreground">원하는 시간에 예약</p>
              </div>
            </div>
            
            {/* 오피스 주소 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '250ms' }}>
              <div className="card p-6">
                <MapPin className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">서초 오피스</h3>
                <p className="text-muted-foreground mb-2">서울 서초구 서초대로 74길 4</p>
                <p className="text-sm text-muted-foreground">지하철 3호선 남부터미널역 5번출구</p>
              </div>
              
              <div className="card p-6">
                <MapPin className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">종로 오피스</h3>
                <p className="text-muted-foreground mb-2">서울시 종로구 종로 33</p>
                <p className="text-sm text-muted-foreground">지하철 1호선 종각역 1번출구</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Button size="lg" asChild className="btn-primary group">
                <Link href="https://cal.com/familyoffice" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  상담 예약 바로가기
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="http://pf.kakao.com/_xkchGj" target="_blank" rel="noopener noreferrer">
                  카카오톡 상담하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
