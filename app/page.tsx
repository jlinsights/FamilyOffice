import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, TrendingUp, CheckCircle, Target, Zap, Building2, Globe, BookOpen, Calendar, Clock, Database, UserCheck, Settings, Crown, Star, ArrowDown, ChevronRight, PieChart, BarChart3, LineChart, Building, Factory, Briefcase, Lightbulb, Heart, Network, GraduationCap, Scale, FileText, CheckSquare, AlertTriangle, RefreshCw, PhoneCall, Search, MessageSquare, MapPin, Phone } from "lucide-react"
import { AdminAccessDeniedAlert } from "@/components/admin-access-denied-alert"
import { AnimatedCounter } from "@/components/animated-counter"
import { SmoothScroll } from "@/components/smooth-scroll"
import type { Metadata } from "next"

// 페이지별 메타데이터 - 가업승계 전문 서비스로 업데이트
export const metadata: Metadata = {
  title: "백년영속의 시작 | 가업승계 전문 FamilyOffice S",
  description: "기업의 가치를 다음 세대로. 10년+ 가업승계 노하우, 1,500+ M&A 플랫폼, 60+ Big 4 출신 전문가 컨소시엄. 성공적인 가업승계는 백년영속의 시작입니다.",
  keywords: "가업승계, 패밀리오피스, 헤리티지 플래닝, 기업승계, 가족법인, 자산이전, 상속계획, 승계전략, 백년영속",
  openGraph: {
    title: "FamilyOffice S | 백년영속의 시작",
    description: "기업의 가치를 다음 세대로. 성공적인 가업승계는 백년영속의 시작입니다.",
    url: "https://familyoffices.vip",
    images: [
      {
        url: "/og-image-succession.jpg",
        width: 1200,
        height: 630,
        alt: "FamilyOffice S - 백년영속의 시작"
      }
    ]
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AdminAccessDeniedAlert />
      <Header />
      <SmoothScroll />

      {/* Hero Section - 백년영속의 시작 */}
      <section id="hero" className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
        {/* 배경 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* 상단 태그 */}
          <div className="flex justify-center mb-8">
            <Badge variant="outline" className="animate-fade-in bg-background/80 backdrop-blur-sm">
              <Crown className="h-3 w-3 mr-1" />
              Heritage Planning Solution
            </Badge>
          </div>
          
          {/* 메인 헤드라인 */}
          <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
            백년영속의 시작
          </h1>
          
          {/* 서브 헤드라인 */}
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            기업의 가치를 다음 세대로
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
            성공적인 가업승계는 백년영속의 시작입니다
          </p>
          
          {/* 핵심 성과 지표 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter end={10} suffix="년+" />
              </div>
              <div className="text-sm text-muted-foreground">가업승계 노하우</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                <AnimatedCounter end={1500} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">M&A 플랫폼<br />잠재 매수기업</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                <AnimatedCounter end={60} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Big 4 출신<br />전문가 컨소시엄</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                <AnimatedCounter end={88} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">법인 CEO<br />고정자산 비중</div>
            </div>
          </div>
          
          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
              가업승계 컨설팅 신청
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 py-4 text-lg">
              헤리티지 플래닝 알아보기
            </Button>
          </div>
          
          {/* 스크롤 인디케이터 */}
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
          </div>
        </div>
      </section>

      {/* 전문 서비스 소개 */}
      <section id="services" className="section bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Briefcase className="h-3 w-3 mr-1" />
              Professional Services
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              체계적인 가업승계 전문 서비스
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              기업의 가치를 온전히 다음 세대로 전달하는 통합 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "가업승계 컨설팅 및 실행",
                description: "체계적인 승계 전략 수립부터 실행까지 원스톱 서비스",
                features: [
                  "승계 전략 수립 및 실행",
                  "지배구조 최적화",
                  "세대 간 갈등 해결",
                  "경영진 승계 교육"
                ]
              },
              {
                icon: TrendingUp,
                title: "기업매수와 지분양도 Advisory",
                description: "M&A 플랫폼을 통한 전략적 거래 지원",
                features: [
                  "기업가치 평가",
                  "매수/매도 전략 수립",
                  "거래구조 설계",
                  "실사 및 협상 지원"
                ]
              },
              {
                icon: Shield,
                title: "법적 리스크 사전 예방",
                description: "승계 과정에서 발생할 수 있는 법적 리스크 최소화",
                features: [
                  "법적 리스크 진단",
                  "컴플라이언스 체계 구축",
                  "분쟁 예방 전략",
                  "법무 전문가 네트워크"
                ]
              },
              {
                icon: PieChart,
                title: "자산구조 최적화",
                description: "효율적인 자산 이전을 위한 구조 설계",
                features: [
                  "자산 구조 분석",
                  "이전 방식 최적화",
                  "법인 구조 재편",
                  "자산 분산 전략"
                ]
              },
              {
                icon: BarChart3,
                title: "세무 최적화 전략",
                description: "승계세 최소화를 위한 전문 세무 전략",
                features: [
                  "상속세 절세 전략",
                  "증여세 최적화",
                  "법인세 구조 개선",
                  "세무 리스크 관리"
                ]
              },
              {
                icon: Network,
                title: "전문가 네트워크 활용",
                description: "각 분야 최고 전문가들과의 협력 시스템",
                features: [
                  "Big 4 출신 전문가",
                  "변호사·회계사 네트워크",
                  "업계 전문가 풀",
                  "해외 전문가 연계"
                ]
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="card p-6 hover:shadow-lg transition-all duration-300 animate-slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 헤리티지 플래닝 - 3개 핵심 영역 */}
      <section id="heritage" className="section">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Crown className="h-3 w-3 mr-1" />
              Heritage Planning
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              통합적 헤리티지 플래닝
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              재정적·인적·사회적 자산의 체계적 관리를 통한 백년영속 실현
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "재정적 자산",
                subtitle: "財政的 資産",
                description: "기업의 경제적 가치와 재무 자산의 체계적 관리 및 최적화",
                features: [
                  "기업 가치 평가 및 관리",
                  "재무 구조 최적화",
                  "투자 포트폴리오 관리",
                  "유동성 관리 전략",
                  "세무 최적화"
                ],
                gradient: "from-blue-500/10 to-cyan-500/10",
                iconColor: "text-blue-600"
              },
              {
                icon: GraduationCap,
                title: "인적 자산",
                subtitle: "人的 資産",
                description: "가족 구성원의 역량 개발과 차세대 리더십 육성",
                features: [
                  "차세대 리더 육성",
                  "가족 구성원 교육",
                  "경영진 역량 개발",
                  "승계자 멘토링",
                  "가족 거버넌스 구축"
                ],
                gradient: "from-green-500/10 to-emerald-500/10",
                iconColor: "text-green-600"
              },
              {
                icon: Heart,
                title: "사회적 자산",
                subtitle: "社會的 資産",
                description: "기업의 사회적 가치와 평판, 네트워크의 체계적 관리",
                features: [
                  "기업 평판 관리",
                  "사회적 가치 창출",
                  "이해관계자 관리",
                  "브랜드 가치 제고",
                  "사회 공헌 전략"
                ],
                gradient: "from-purple-500/10 to-pink-500/10",
                iconColor: "text-purple-600"
              }
            ].map((asset, index) => (
              <div 
                key={index} 
                className={`card p-8 text-center bg-gradient-to-br ${asset.gradient} animate-slide-up`} 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-background shadow-lg flex items-center justify-center">
                    <asset.icon className={`h-8 w-8 ${asset.iconColor}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{asset.title}</h3>
                <p className="text-lg text-muted-foreground mb-4">{asset.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{asset.description}</p>
                <ul className="space-y-2 text-left">
                  {asset.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 체계적 프로세스 - 5단계 */}
      <section id="process" className="section bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Settings className="h-3 w-3 mr-1" />
              Systematic Process
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              체계적인 5단계 가업승계 프로세스
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              WIPS(WM Integrated Planning Solution) 시스템을 통한 과학적 접근
            </p>
            
            <div className="mt-8 text-center">
              <Badge variant="secondary" className="text-xs">
                특허출원번호: 10-2013-0075722
              </Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* 프로세스 라인 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary to-primary/30 hidden md:block"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: "01",
                    title: "현황 파악",
                    description: "기업 현황과 가족 상황의 종합적 분석",
                    details: [
                      "기업 가치 평가 및 재무 분석",
                      "가족 구성원 현황 파악",
                      "법적 구조 및 지배구조 분석",
                      "세무 현황 및 리스크 진단"
                    ],
                    icon: Search
                  },
                  {
                    step: "02",
                    title: "문제점 분석",
                    description: "승계 과정에서 발생할 수 있는 리스크 식별",
                    details: [
                      "상속세 부담 및 유동성 리스크",
                      "경영권 분산 위험",
                      "가족 간 갈등 요소",
                      "법적 리스크 및 컴플라이언스"
                    ],
                    icon: AlertTriangle
                  },
                  {
                    step: "03",
                    title: "계획서 작성",
                    description: "맞춤형 승계 전략 및 실행 계획 수립",
                    details: [
                      "승계 타임라인 및 로드맵",
                      "세무 최적화 전략",
                      "자산 이전 방식 설계",
                      "거버넌스 구축 계획"
                    ],
                    icon: FileText
                  },
                  {
                    step: "04",
                    title: "실행",
                    description: "전문가 네트워크를 통한 체계적 실행",
                    details: [
                      "법인 구조 재편 실행",
                      "자산 이전 및 증여 진행",
                      "세무 신고 및 절차 이행",
                      "교육 및 멘토링 진행"
                    ],
                    icon: CheckSquare
                  },
                  {
                    step: "05",
                    title: "환경변화 대응",
                    description: "지속적인 모니터링과 최적화",
                    details: [
                      "법령 변화 대응",
                      "가족 상황 변화 반영",
                      "시장 환경 변화 대응",
                      "전략 수정 및 보완"
                    ],
                    icon: RefreshCw
                  }
                ].map((process, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-slide-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* 프로세스 카드 */}
                    <div className="flex-1 md:w-1/2">
                      <div className="card p-6 ml-8 md:ml-0 md:mr-8 md:first:mr-0 md:last:ml-0">
                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <process.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-primary">STEP {process.step}</div>
                            <h3 className="text-lg font-semibold">{process.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 text-sm">{process.description}</p>
                        <ul className="space-y-2">
                          {process.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <ChevronRight className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* 중앙 스텝 번호 */}
                    <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                        {process.step}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 및 최종 CTA 섹션 */}
      <section id="contact" className="section bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 animate-fade-in">
              <Star className="h-3 w-3 mr-1" />
              Start Your Legacy
            </Badge>
            
            <h2 className="mb-6 font-bold text-balance animate-slide-up">
              백년영속을 위한 여정을 시작하세요
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              기업의 가치를 온전히 다음 세대로 전달하는 것,<br />
              그것이 바로 백년영속의 시작입니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
                <PhoneCall className="mr-2 h-5 w-5" />
                전문 컨설팅 신청
              </Button>
              <Button size="lg" variant="outline" className="font-semibold px-8 py-4 text-lg">
                자료 다운로드
              </Button>
            </div>
            
            {/* 연락처 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="card p-6 text-center">
                <PhoneCall className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">전화 상담</h3>
                <p className="text-2xl font-bold text-primary mb-2">0502-5550-8700</p>
                <p className="text-sm text-muted-foreground">평일 10:00 ~ 18:00</p>
              </div>
              <div className="card p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">상담 예약</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://cal.com/familyoffice" target="_blank" rel="noopener noreferrer">
                    cal.com/familyoffice
                  </Link>
                </Button>
              </div>
              <div className="card p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">카카오채널</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href="http://pf.kakao.com/_xkchGj" target="_blank" rel="noopener noreferrer">
                    @패밀리오피스
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* 오피스 주소 */}
            <div className="card p-6 mb-8 animate-slide-up" style={{ animationDelay: '350ms' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
                <Building className="h-5 w-5 mr-2" />
                오피스 위치
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-medium text-primary">서초 본점</p>
                  <p className="text-muted-foreground">서울 서초구 서초대로 74길 4</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-primary">종로 지점</p>
                  <p className="text-muted-foreground">서울시 종로구 종로 33</p>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '400ms' }}>
              <p className="mb-2">🔒 개인정보보호 보장 | 📝 무료 초기 상담 | 🏆 10년+ 전문 경험</p>
              <p className="text-xs">
                상담 시간: 평일 10:00-18:00 (토/일요일 및 공휴일 휴무)
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
