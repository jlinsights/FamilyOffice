"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  Target, 
  CheckCircle,
  Star,
  Building,
  Briefcase,
  ArrowRight,
  Phone,
  Factory,
  Hammer,
  Cpu
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const stats = [
    { label: "자산관리 실적", value: "500억원+", icon: TrendingUp, color: "text-primary" },
    { label: "법인 대표 만족도", value: "98%", icon: Star, color: "text-primary" },
    { label: "법인 고객사", value: "500+", icon: Building, color: "text-primary" },
    { label: "중소중견기업 전문경험", value: "20년+", icon: Award, color: "text-primary" }
  ]

  const values = [
    {
      icon: Shield,
      title: "고객 우선주의",
      description: "법인 대표님의 일정과 업무 패턴을 최우선으로 고려한 맞춤형 서비스를 제공합니다.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "상품이 아닌 고객 중심",
      description: "특정 금융상품 판매가 아닌 고객의 목표와 철학을 바탕으로 한 재무전략을 수립합니다.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "전담 전문가 시스템",
      description: "중앙집중형 데이터 관리를 통해 한 명의 전문가가 지속적으로 서비스를 제공합니다.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "통합 자산관리",
      description: "법인-개인 자산을 체계적으로 통합 관리하는 자체 개발 시스템을 운영합니다.",
      color: "text-primary"
    }
  ]

  const specialties = [
    {
      icon: Factory,
      title: "제조업 특화",
      description: "전통 제조업부터 첨단 제조업까지 업종별 특성을 반영한 자산관리",
      features: ["중대재해처벌법 대응", "생산설비 보험", "원자재 리스크 헤지", "ESG 경영 지원"]
    },
    {
      icon: Hammer,
      title: "건설·위험업종",
      description: "건설업 등 위험업종의 특수성을 고려한 전문 자산관리 서비스",
      features: ["기업재해보장보험", "시공보증보험", "하도급 리스크 관리", "프로젝트 파이낸싱"]
    },
    {
      icon: Cpu,
      title: "IT·벤처기업",
      description: "기술기업의 성장 단계별 맞춤형 자산관리 및 투자 전략",
      features: ["정책자금 활용", "핵심인재 보험", "스톡옵션 설계", "IPO 준비 지원"]
    },
    {
      icon: Building,
      title: "가족법인·MSO",
      description: "가족법인 설립부터 MSO 운영까지 세대를 넘나드는 자산관리",
      features: ["법인 구조 설계", "경영권 승계", "세무 최적화", "자녀 교육 펀드"]
    }
  ]

  const promise = [
    {
      title: "개인 맞춤형 서비스",
      description: "법인 대표님의 일정과 시간을 고려한 개인 맞춤형 자산관리 서비스를 제공해 드립니다.",
      detail: "고객이 언제나 우선입니다. 고객에게 모든 것을 맞추어 최선의 서비스를 제공합니다."
    },
    {
      title: "체계적인 상담 프로세스",
      description: "자산관리 프로세스에 입각한 체계적인 상담진행으로 법인 대표님의 목표와 철학을 고려한 재무전략을 수립합니다.",
      detail: "특정 회사에 얽매이지 않는 다양한 포트폴리오를 통해 상품중심이 아닌 철저한 고객중심 서비스를 제공합니다."
    },
    {
      title: "밀착 코칭 상담",
      description: "충분한 대화를 통한 밀착 과외식, 코칭식 상담을 진행합니다.",
      detail: "법인 대표님의 금융지식수준을 높여 현명한 판단을 할 수 있도록 도와드립니다."
    },
    {
      title: "중앙집중형 관리",
      description: "중앙집중형 Data 관리 시스템과 History 관리를 통해 지속적인 고객관리를 진행합니다.",
      detail: "한 명의 전문가가 지속적으로 자산관리 서비스를 제공합니다."
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 히어로 섹션 */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
        {/* 배경 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* 상단 태그 */}
          <div className="flex justify-center mb-8">
            <Badge variant="outline" className="animate-fade-in bg-background/80 backdrop-blur-sm">
              <Building className="h-3 w-3 mr-1" />
              About FamilyOffice S
            </Badge>
          </div>
          
          {/* 메인 헤드라인 */}
          <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
            현명한 법인 대표님은{"\n"}<span className="text-foreground">패밀리오피스를</span>{"\n"}준비합니다
          </h1>
          
          {/* 서브 헤드라인 */}
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            중소중견기업 전문 자산관리
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
            <span className="font-semibold text-foreground">법인 대표님을 위한 전문적인 자산관리</span> 및 <span className="font-semibold text-primary">가업승계 설계 서비스</span>를 제공합니다
          </p>
          
          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg" asChild>
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                상담 신청
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-bold shadow-lg px-8 py-4 text-lg" asChild>
              <Link href="/services">
                <Briefcase className="mr-2 h-5 w-5" />
                서비스 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card-modern p-6 text-center animate-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              About Us
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-primary">패밀리오피스 S</span> 소개
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground max-w-3xl mx-auto text-left">
              <p className="text-center">
                패밀리오피스 S는 <span className="font-semibold text-foreground">중소중견기업 전문</span> 
                <span className="font-semibold text-foreground">자산관리 서비스 팀</span>입니다.
              </p>
              <p className="text-center">
                중소중견기업 법인 대표님들의 복잡한 자산관리 니즈를 전문적으로 해결하기 위해 
                설립된 전문 프로젝트 팀으로, 세무 최적화부터 가업승계 설계까지 
                통합적인 패밀리오피스 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 우리의 약속 섹션 */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Our Promise
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              법인 대표님의 마음을 아는 <span className="text-primary">FamilyOffice S</span><br />
              <span className="text-foreground">우리는 약속합니다</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              중소중견기업 법인 대표님들의 고유한 우선순위를 이해하고 최고의 서비스를 제공하겠습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {promise.map((item, index) => (
              <div key={index} className="card-modern p-8 animate-up" style={{ animationDelay: `${index * 150}ms` }}>
                <h3 className="text-xl font-semibold mb-4 text-primary">{item.title}</h3>
                <p className="text-foreground font-medium mb-3">{item.description}</p>
                <p className="text-muted-foreground text-pretty">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 우리의 가치 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Our Values
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              고객 중심의 핵심 가치
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              모든 서비스와 의사결정의 기준이 되는 우리의 핵심 가치입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card-modern p-6 text-center animate-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm text-pretty">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 업종별 전문성 */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Industry Expertise
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              업종별 전문 자산관리
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              각 업종의 특성과 리스크를 정확히 이해하는 전문적인 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} className="card-modern p-8 animate-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <specialty.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{specialty.title}</h3>
                    <p className="text-muted-foreground">{specialty.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {specialty.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

      {/* CTA 섹션 */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            중소중견기업 전문가와의 1:1 무료 상담을 통해 맞춤형 패밀리오피스 솔루션을 확인해보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                무료 상담 신청
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/services">
                서비스 자세히 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 