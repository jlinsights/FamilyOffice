import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Building, TrendingUp, Award, Users, Phone } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { IndustryServicesTabsSection } from "@/components/industry-services-section";

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
      icon: Building,
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

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative section min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30" />
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 animate-fade-in bg-background/80 backdrop-blur-sm">
              <Building className="h-3 w-3 mr-1" />
              Professional Services
            </Badge>
            
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              중소중견기업 법인{'\n'}대표를 위한{'\n'}<span className="text-foreground">전문 자산관리</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              업종별 특화 솔루션
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
              <span className="font-semibold text-foreground">10년+ 가업승계 노하우</span>와 <span className="font-semibold text-primary">500억원+ 관리 실적</span>을 바탕으로 업종별 특화된 통합 자산관리 솔루션을 제공합니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
                <Link href="/contact" className="flex items-center">
                  무료 상담 신청
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-bold shadow-lg px-8 py-4 text-lg">
                <Link href="/program" className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  프로그램 안내
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
            <Badge variant="outline" className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm">
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
            <Badge variant="outline" className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm">
              <Building className="h-3 w-3 mr-1" />
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

      {/* 전문가 팀 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm">Expert Team</Badge>
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

      {/* 업종별 특화 서비스 섹션 (프리미엄 Tabs) */}
      <IndustryServicesTabsSection />

      {/* 연락처 및 CTA 섹션 */}
      <section id="contact" className="section bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm">
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
                <Building className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">카카오채널</h3>
                <p className="text-lg font-bold text-primary mb-2">@패밀리오피스</p>
                <p className="text-sm text-muted-foreground">24시간 상담 가능</p>
              </div>
              <div className="card p-6 text-center">
                <Building className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">상담 예약</h3>
                <p className="text-sm text-muted-foreground mb-2">온라인 예약 시스템</p>
                <p className="text-sm text-muted-foreground">원하는 시간에 예약</p>
              </div>
            </div>
            
            {/* 오피스 주소 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '250ms' }}>
              <div className="card p-6">
                <Building className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">서초 오피스</h3>
                <p className="text-muted-foreground mb-2">서울 서초구 서초대로 74길 4</p>
                <p className="text-sm text-muted-foreground">지하철 3호선 남부터미널역 5번출구</p>
              </div>
              
              <div className="card p-6">
                <Building className="h-6 w-6 text-primary mb-4" />
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
                <Link href="http://pf.kakao.com/_gsxkxdG/chat" target="_blank" rel="noopener noreferrer">
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
