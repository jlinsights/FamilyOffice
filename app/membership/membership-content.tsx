'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { LeadCaptureDialog } from '@/components/lead-capture-dialog';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { TextReveal } from '@/components/ui/animation/TextReveal';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    FileText,
    Key,
    Landmark,
    Plane,
    Shield,
    Star,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MembershipContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBrochure, setShowBrochure] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const tiers = [
    {
      name: "Foundation",
      tier: "Entry Level",
      desc: "패밀리오피스 서비스의 첫 경험을 위한 맞춤 입문 프로그램",
      features: [
        "자산 구조 진단 및 포트폴리오 리포트 (연 1회)",
        "분기별 자산 리밸런싱 리뷰 세션",
        "엄선된 전시·문화 행사 큐레이션 안내",
        "영업일 기준 전화 컨시어지 지원",
        "멤버 전용 뉴스레터 및 마켓 인사이트"
      ],
      isPopular: false
    },
    {
      name: "Signature",
      tier: "Recommended",
      desc: "자산관리와 라이프스타일 큐레이션을 하나로, 바쁜 CEO를 위한 최적 솔루션",
      features: [
        "전담 어드바이저 1:1 배정 및 월간 리뷰",
        "럭셔리 호텔·파인다이닝 우선 예약 및 VIP 업그레이드",
        "프라이빗 전시 프리뷰 및 갤러리 투어 초청",
        "긴급 예약 요청 우선 처리 (48시간 내)",
        "반기별 자산·리스크 종합 점검 미팅",
        "VIP 세미나 및 네트워킹 디너 초청"
      ],
      isPopular: true
    },
    {
      name: "Elite",
      tier: "Premium",
      desc: "전담 컨시어지가 일상의 모든 선택을 대신하는 프리미엄 라이프 매니지먼트",
      features: [
        "전담 컨시어지 배정 및 월 2회 정기 미팅",
        "국내외 맞춤 트래블 디자인 (동선·일정 최적화)",
        "아트 컬렉션 로드맵 수립 및 전문가 자문",
        "24/7 전용 핫라인 및 긴급 요청 즉시 대응",
        "프리미엄 메디컬 체크업 예약 지원",
        "가족 행사(돌잔치, 결혼식 등) 기획 자문"
      ],
      isPopular: false
    },
    {
      name: "Legacy",
      tier: "Family Office",
      desc: "세대를 넘어 가치를 전승하는 초고액자산가 전용 토털 패밀리오피스",
      features: [
        "패밀리 거버넌스 미팅 및 가족헌장 수립 지원",
        "글로벌 아트페어·옥션 현지 동행 서비스",
        "차세대 리더십 교육 및 해외 연수 프로그램",
        "세무·법무·의료 최고 전문가 우선 연결",
        "프라이빗 제트·요트 섭외 및 VIP 트래블",
        "연간 자산관리 전략 보고서 (분기별 업데이트)"
      ],
      isPopular: false
    }
  ];

  const faqs = [
    {
      q: "멤버십은 누구에게 적합한가요?",
      a: "자산관리와 라이프스타일 큐레이션을 통합적으로 관리하고 싶으신 고액자산가, 기업 CEO, 전문직 종사자에게 적합합니다. 특히 '시간 > 비용'을 중시하고, 일상의 복잡한 선택을 위임하고 싶으신 분들께 최적화된 서비스입니다. 바쁜 일정 속에서도 최고의 경험과 접근성을 원하시는 분들을 위한 토털 솔루션입니다."
    },
    {
      q: "멤버십 등급은 어떻게 결정되나요?",
      a: "온라인 10분 진단 또는 전화 상담을 통해 ① 가족 단위 자산 규모 ② 법인 구조의 복잡도 ③ 예상 서비스 이용 빈도 ④ 라이프스타일 니즈(여행, 아트, 교육 등)를 종합 평가합니다. 진단 결과를 바탕으로 Foundation부터 Legacy까지 최적 등급을 맞춤 제안드리며, 상황 변화에 따라 등급 조정도 유연하게 지원합니다."
    },
    {
      q: "여행·호텔 서비스는 어떻게 제공되나요?",
      a: "멤버십에는 '기획·섭외·우선권·동행' 서비스가 포함됩니다. 컨시어지가 여행 목적과 취향을 파악해 최적의 일정을 설계하고, 특급 호텔 스위트 쇼잉, 미쉐린 레스토랑 프라이빗 룸 예약, 공항 VIP 라운지 등을 섭외합니다. 실제 항공권·숙박·식음료 비용은 멤버님 부담이지만, 제휴 파트너를 통한 VIP 업그레이드와 우대 혜택이 제공됩니다."
    },
    {
      q: "보험 상품과 연계되어 있나요?",
      a: "아닙니다. FamilyOffice S 멤버십은 보험 상품과 완전히 분리된 독립적인 라이프스타일·자산관리 서비스입니다. 보험 가입 여부와 관계없이 자산 규모와 서비스 니즈만으로 가입 가능합니다. 다만, 삼성생명 GFC와의 제휴를 통해 VIP 교육 프로그램(100세 CEO, 가업승계 아카데미 등)에 우선 초청됩니다."
    },
    {
      q: "컨시어지 서비스의 범위는?",
      a: "단순 예약 대행을 넘어 '토털 라이프 매니지먼트'를 제공합니다. 목적·취향 분석 → 최적 옵션 리서치 → 비교 제안 → 일정 설계 → 예약·섭외 → 실시간 소통 → 사후 피드백까지 전 과정을 전담합니다. Elite 등급 이상은 24/7 핫라인이 제공되며, 긴급 요청 시 즉시 대응합니다."
    },
    {
      q: "전문가 연결 서비스는 무료인가요?",
      a: "세무사·변호사·의료 전문가 등 최상위 전문가 네트워크 '연결' 자체는 멤버십에 포함됩니다. 단, 실제 자문이나 용역 수행 시 발생하는 비용은 별도입니다. 멤버 우대 조건이 적용되어 일반 시장가 대비 유리한 조건으로 서비스를 이용하실 수 있습니다."
    },
    {
      q: "멤버십 비용은 얼마인가요?",
      a: "등급별 연회비는 개별 상담을 통해 안내드립니다. 자산 규모, 서비스 이용 범위, 가족 구성원 수 등에 따라 맞춤 견적이 제공되며, 10분 진단 후 구체적인 비용 안내를 받으실 수 있습니다. Legacy 등급의 경우 별도 프라이빗 상담을 통해 협의합니다."
    },
    {
      q: "가족 구성원도 함께 이용할 수 있나요?",
      a: "네, 가능합니다. Signature 등급부터는 배우자 동반 이용이 기본 포함되며, Elite·Legacy 등급에서는 자녀를 포함한 가족 단위 서비스가 제공됩니다. Legacy 등급의 경우 차세대 교육 프로그램, 가족 거버넌스 미팅 등 가족 전체를 위한 특화 서비스가 포함됩니다."
    },
    {
      q: "해외에서도 서비스 이용이 가능한가요?",
      a: "물론입니다. 글로벌 럭셔리 트래블 파트너 네트워크를 통해 전 세계 주요 도시에서 서비스를 이용하실 수 있습니다. 바젤·프리즈 등 글로벌 아트페어 현지 동행, 해외 미쉐린 레스토랑 예약, 현지 전문가 연결 등이 가능하며, 시차를 고려한 실시간 커뮤니케이션을 지원합니다."
    }
  ];

  return (
    <div className="font-sans text-slate-800 bg-background min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-16">
        {/* Assumes Header height is roughly 64px (h-16), adjusting pt-16 ensures content is not hidden behind fixed header */}

        {/* Hero Section - Premium Design v4.0 */}
        <section
          id="hero"
          className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white"
        >
          {/* Premium Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(15,23,42,0))]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(59,130,246,0.15),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(217,178,112,0.08),transparent)]"></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 text-center max-w-7xl mx-auto px-6 py-20">
            {/* Premium Badge */}
            <FadeIn delay={0.2} direction="down">
              <div className="flex justify-center mb-14">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-amber-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-500"></div>
                  <Badge variant="outline" className="relative px-6 py-2 text-sm border-amber-500/30 text-amber-200/90 bg-slate-900/80 hover:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mr-3 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
                    Private Concierge & Asset Management
                    <span className="w-2 h-2 rounded-full bg-amber-400 ml-3 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
                  </Badge>
                </div>
              </div>
            </FadeIn>

            {/* Main Headline - Enhanced Typography */}
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-12 tracking-tight leading-[1.05]">
              <span className="block mb-3 text-white/95">
                <TextReveal delay={0.4} type="word">당신의 시간은 소중합니다.</TextReveal>
              </span>
              <span className="block relative">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent blur-sm opacity-50">
                  선택은 저희가 대신합니다.
                </span>
                <span className="relative bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  <TextReveal delay={0.6} type="word">선택은 저희가 대신합니다.</TextReveal>
                </span>
              </span>
            </h1>

            {/* Description - Refined */}
            <FadeIn direction="up" delay={0.8}>
              <p className="text-xl md:text-2xl text-slate-300/90 font-light leading-relaxed mb-6 max-w-3xl mx-auto text-balance">
                복잡한 자산관리부터 일상의 모든 선택까지,<br className="hidden md:block"/>
                전담 컨시어지가 완벽하게 관리하는
              </p>
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-8">
                프라이빗 라이프 매니지먼트
              </p>
            </FadeIn>

            {/* CTA Buttons - Premium Style */}
            <FadeIn direction="up" delay={1.2}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
                <Link
                  href="/apply/membership-intake"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'relative group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold h-16 px-12 text-lg rounded-full shadow-[0_0_50px_-10px_rgba(251,191,36,0.5)] transform hover:-translate-y-1 hover:shadow-[0_0_60px_-5px_rgba(251,191,36,0.6)] transition-all duration-300'
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    멤버십 등급 진단받기
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Button
                  onClick={() => setShowBrochure(true)}
                  variant="outline"
                  size="lg"
                  className={cn(
                    'relative group bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:text-white h-16 px-12 text-lg rounded-full backdrop-blur-md transform hover:-translate-y-1 transition-all duration-300'
                  )}
                >
                  <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  멤버십 제안서 다운로드
                </Button>
              </div>
            </FadeIn>

            {/* Trust Indicators */}
            <FadeIn direction="up" delay={1.6}>
              <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500/70" />
                  <span>프라이빗 서비스</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-500/70" />
                  <span>전담 컨시어지</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500/70" />
                  <span>VIP 네트워크</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Premium Scroll Indicator */}
          <FadeIn delay={1.8} className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500/50 via-slate-500/50 to-transparent animate-pulse"></div>
            </div>
          </FadeIn>
        </section>


        {/* Philosophy Section - Premium Design v4.0 */}
        <section id="philosophy" className="section bg-white dark:bg-slate-900 py-24 md:py-32 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.03),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.03),transparent_50%)]"></div>

          <div className="container relative z-10">
            <FadeIn direction="up">
              <div className="text-center mb-20">
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/10">
                  <Shield className="h-3 w-3 mr-2" />
                  Core Values
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  바쁜 당신을 위한 <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">단 하나의 솔루션</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  당신이 원하는 건 &apos;할인&apos;이 아닙니다.<br className="md:hidden"/>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">결정의 속도, 최고의 접근성, 완벽한 실행력</span>입니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} stagger={0.15}>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-7 w-7" />,
                  title: "Decision Support",
                  subtitle: "의사결정 파트너",
                  desc: "자산·리스크·승계 이슈를 빠르게 정리하고 \"다음 행동\"을 명확히 합니다. 불필요한 고민의 시간을 줄여드립니다.",
                  gradient: "from-blue-500 to-indigo-600"
                },
                {
                  icon: <Clock className="h-7 w-7" />,
                  title: "Concierge Execution",
                  subtitle: "완벽한 실행력",
                  desc: "호텔, 여행, 전시, 미팅을 \"알아서\" 되는 수준으로 정리합니다. 기획부터 동선 설계까지 완벽하게 수행합니다.",
                  gradient: "from-amber-500 to-orange-600"
                },
                {
                  icon: <Key className="h-7 w-7" />,
                  title: "Private Access",
                  subtitle: "독점적 접근성",
                  desc: "프리뷰, 라운드테이블, 전문가 네트워크 등 공개된 시장에서 얻기 어려운 독점적인 접근성을 제공합니다.",
                  gradient: "from-purple-500 to-pink-600"
                }
              ].map((item, idx) => (
                <div key={idx} className="group relative p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-amber-500/30 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-widest mb-2">{item.subtitle}</p>
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-amber-600 transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </FadeIn>
          </div>
        </section>


        {/* Detailed Services (Modules) - Premium Design v4.0 */}
        <section id="benefits" className="section bg-slate-950 text-white relative overflow-hidden py-24 md:py-32">
          {/* Premium Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,191,36,0.08),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.05),transparent)]"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

          {/* Animated Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

          <div className="container relative z-10">
            <FadeIn direction="up">
              <div className="mb-20 max-w-3xl">
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-amber-500/30 text-amber-400 bg-amber-500/10">
                  <Star className="h-3 w-3 mr-2" />
                  Curated Services
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  원하는 것만 <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">골라 담는</span> 맞춤 서비스
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  4가지 핵심 모듈을 자유롭게 조합하세요.<br className="hidden md:block"/>
                  필요한 서비스만 선택해 나만의 패키지를 완성합니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} stagger={0.15}>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Plane size={28} />,
                  title: "Travel Design & Curation",
                  subtitle: "글로벌 럭셔리 트래블 파트너 협업",
                  gradient: "from-blue-500 to-indigo-600",
                  items: [
                    "아트·컬처·웰니스·골프 등 테마별 맞춤 여행 기획",
                    "현지 전문가와 함께하는 숨겨진 명소 프라이빗 투어",
                    "포시즌스·아만·만다린오리엔탈 등 특급 호텔 스위트 쇼잉",
                    "미쉐린 스타 레스토랑 프라이빗 룸 예약 및 셰프 테이블",
                    "항공·숙박·이동 동선 원스톱 최적화 설계"
                  ]
                },
                {
                  icon: <Star size={28} />,
                  title: "Art Collection & Cultural Access",
                  subtitle: "전문 아트 큐레이터 네트워크 제휴",
                  gradient: "from-purple-500 to-pink-600",
                  items: [
                    "국립현대미술관, 리움 등 휴관일 프라이빗 프리뷰",
                    "바젤·프리즈·KIAF 등 글로벌 아트페어 현지 동행",
                    "작가·컬렉터 1:1 미팅 및 스튜디오 방문 주선",
                    "컬렉션 구축 전략, 보존 관리, 자산화 자문",
                    "신진 작가 발굴 및 블루칩 작품 투자 기회 제공"
                  ]
                },
                {
                  icon: <Landmark size={28} />,
                  title: "Family Office Core Services",
                  subtitle: "삼성생명 GFC 제휴 프로그램 연계",
                  gradient: "from-amber-500 to-orange-600",
                  items: [
                    "법인·개인 자산 통합 진단 및 구조 최적화",
                    "가업승계 로드맵 수립 및 가족 거버넌스 체계화",
                    "분기별 포트폴리오 리밸런싱 및 리스크 점검",
                    "100세 CEO, 가업승계 아카데미 등 VIP 교육 우선 초청",
                    "글로벌 자산배분 및 해외투자 전략 자문"
                  ]
                },
                {
                  icon: <Users size={28} />,
                  title: "Premier Concierge Network",
                  subtitle: "전담 컨시어지 및 프라이빗 네트워크",
                  gradient: "from-emerald-500 to-teal-600",
                  items: [
                    "24/7 전담 컨시어지 배정 및 실시간 메신저 지원",
                    "국내외 특급 호텔·프라이빗 멤버스클럽 우선 예약",
                    "멤버 전용 비즈니스 라운드테이블·디너 네트워킹",
                    "최고 전문가(세무사·변호사·주치의) 직통 연결",
                    "가족 이벤트(돌잔치·결혼식·장례) 토털 기획 지원"
                  ]
                }
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-amber-500/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/5"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon with Gradient */}
                  <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors duration-300">{service.title}</h3>
                    <p className="text-sm text-slate-400 mb-6 flex items-center gap-2">
                      <span className="w-6 h-px bg-amber-500/50"></span>
                      {service.subtitle}
                    </p>
                    <ul className="space-y-4 text-slate-300">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start group/item">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-500/10 mr-3 flex-shrink-0 group-hover/item:bg-amber-500/20 transition-colors">
                            <Check className="h-3.5 w-3.5 text-amber-500" />
                          </div>
                          <span className="leading-relaxed text-sm group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            </FadeIn>
          </div>
        </section>


        {/* Membership Tiers - Premium Design v4.0 */}
        <section id="membership" className="section bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="container relative z-10">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/10">
                  <Star className="h-3 w-3 mr-2" />
                  Membership Structure
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  10분 진단으로 찾는 <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">나만의 등급</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
                  자산 규모와 라이프스타일을 분석해 최적의 멤버십을 추천드립니다.<br className="hidden md:block"/>
                  Foundation부터 Legacy까지, 당신의 상황에 맞는 등급을 제안합니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} stagger={0.15}>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 lg:gap-4">
              {tiers.map((tier, index) => {
                const tierColors = {
                  Foundation: { accent: 'slate', gradient: 'from-slate-500 to-slate-600', glow: 'slate-500/20' },
                  Signature: { accent: 'blue', gradient: 'from-blue-500 to-indigo-600', glow: 'blue-500/30' },
                  Elite: { accent: 'purple', gradient: 'from-purple-500 to-violet-600', glow: 'purple-500/25' },
                  Legacy: { accent: 'amber', gradient: 'from-amber-500 to-orange-600', glow: 'amber-500/30' },
                };
                const colors = tierColors[tier.name as keyof typeof tierColors] || tierColors.Foundation;

                return (
                  <div
                    key={index}
                    className={`relative group rounded-2xl p-8 flex flex-col transition-all duration-500 ${
                      tier.isPopular
                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-2xl ring-2 ring-blue-500/50 z-10 lg:scale-[1.05] lg:-my-4'
                        : 'bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/50 shadow-lg hover:shadow-2xl hover:-translate-y-2'
                    }`}
                  >
                    {/* Glow Effect */}
                    {tier.isPopular && (
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-indigo-500/10 rounded-2xl"></div>
                    )}

                    {tier.isPopular && (
                      <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/30">
                        ✨ Recommended
                      </span>
                    )}

                    {/* Tier Icon */}
                    <div className={`w-12 h-12 mb-6 rounded-xl flex items-center justify-center bg-gradient-to-br ${colors.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {index === 0 && <Shield className="h-6 w-6 text-white" />}
                      {index === 1 && <Star className="h-6 w-6 text-white" />}
                      {index === 2 && <Key className="h-6 w-6 text-white" />}
                      {index === 3 && <Landmark className="h-6 w-6 text-white" />}
                    </div>

                    <div className="mb-4 relative z-10">
                      <h3 className={`text-2xl font-bold mb-2 ${tier.isPopular ? 'text-white' : 'text-foreground'}`}>{tier.name}</h3>
                      <p className={`text-xs font-semibold uppercase tracking-widest ${tier.isPopular ? 'text-blue-300' : `text-${colors.accent}-600 dark:text-${colors.accent}-400`}`}>
                        {tier.tier}
                      </p>
                    </div>
                    <div className={`mb-6 pb-6 border-b relative z-10 ${tier.isPopular ? 'border-slate-700' : 'border-slate-200 dark:border-slate-700'}`}>
                      <p className={`text-sm leading-relaxed min-h-[60px] ${tier.isPopular ? 'text-slate-300' : 'text-muted-foreground'}`}>
                        {tier.desc}
                      </p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow relative z-10">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${tier.isPopular ? 'bg-blue-500/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
                            <Check className={`h-3 w-3 ${tier.isPopular ? 'text-blue-400' : `text-${colors.accent}-500`}`} />
                          </div>
                          <span className={tier.isPopular ? 'text-slate-200' : 'text-foreground/80'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="w-full relative z-10">
                      {tier.name === "Legacy" ? (
                        <Link
                          href="tel:0502-5550-8700"
                          className={cn(
                            buttonVariants({ size: 'lg' }),
                            'w-full py-6 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center justify-center',
                            'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-lg hover:shadow-xl hover:shadow-amber-500/20'
                          )}
                        >
                          <Landmark className="h-4 w-4 mr-2" />
                          프라이빗 상담 문의
                        </Link>
                      ) : (
                        <Link
                          href="/apply/membership-intake"
                          className={cn(
                            buttonVariants({ size: 'lg' }),
                            'w-full py-6 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center justify-center',
                            tier.isPopular
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/30'
                              : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                          )}
                        >
                          멤버십 진단 시작
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            </FadeIn>
          </div>
        </section>


        {/* Process Flow - Premium Design v4.0 */}
        <section className="section bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-24 md:py-32 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] -translate-y-1/2"></div>

          <div className="container relative z-10">
            <FadeIn direction="up">
              <div className="text-center mb-20">
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50">
                  <Clock className="h-3 w-3 mr-2" />
                  Simple Process
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  복잡한 절차 없이, <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">오늘 바로</span> 시작하세요
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} stagger={0.15}>
            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20"></div>

              {[
                { step: "01", title: "간단 진단", desc: "10분 설문을 통해 목적과 취향, 제약사항을 파악합니다.", icon: <FileText className="h-5 w-5" /> },
                { step: "02", title: "등급 제안", desc: "고객님의 상황에 최적화된 멤버십 등급과 범위를 제안드립니다.", icon: <Star className="h-5 w-5" /> },
                { step: "03", title: "온보딩", desc: "선호/금기사항, 캘린더, 예산, 동행자 정보를 등록합니다.", icon: <Users className="h-5 w-5" /> },
                { step: "04", title: "실행 & 큐레이션", desc: "요청 시 기획안 제시 후 예약 및 섭외, 사후 정리까지 수행합니다.", icon: <Check className="h-5 w-5" /> }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  {/* Step Circle */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-amber-500/30 flex items-center justify-center shadow-lg group-hover:border-amber-500 group-hover:shadow-amber-500/20 transition-all duration-300">
                        <div className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                        {item.step.replace('0', '')}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-amber-600 transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Arrow (mobile hidden) */}
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-3 text-amber-500/30 z-20" size={20} />
                  )}
                </div>
              ))}
            </div>
            </FadeIn>
          </div>
        </section>


        {/* FAQ & CTA - Premium Design v4.0 */}
        <section id="faq" className="section bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-24 md:py-32 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]"></div>

          <FadeIn direction="up">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/50">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                자주 묻는 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">질문</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`group bg-white dark:bg-slate-800/80 rounded-2xl border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg ${
                    activeFaq === index
                      ? 'border-amber-500/50 shadow-lg shadow-amber-500/5'
                      : 'border-slate-200 dark:border-slate-700/50 hover:border-amber-500/30'
                  }`}
                >
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        activeFaq === index
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}>
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="font-semibold text-foreground text-base md:text-lg pr-4">{faq.q}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      activeFaq === index
                        ? 'bg-amber-500/10 rotate-180'
                        : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      <ChevronDown className={`flex-shrink-0 transition-colors ${activeFaq === index ? 'text-amber-500' : 'text-muted-foreground'}`} size={18} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-8 pb-8 pt-2 ml-12">
                      <p className="text-muted-foreground leading-relaxed text-base">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-24 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-amber-500/5 rounded-3xl"></div>
              <div className="relative bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-12 shadow-xl">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  지금 바로 <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">나의 등급</span>을 확인하세요
                </h3>
                <p className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto">
                  10분이면 충분합니다. 자산 구조와 라이프스타일을 분석해<br className="hidden md:block"/>
                  Foundation부터 Legacy까지 맞춤 등급을 제안드립니다.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                  <Link
                    href="/apply/membership-intake"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'relative group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transform hover:-translate-y-1 transition-all duration-300'
                    )}
                  >
                    <span className="flex items-center">
                      무료 진단 시작하기
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="/program"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-14 px-10 text-lg font-semibold rounded-full bg-white hover:bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 transform hover:-translate-y-1 transition-all duration-300'
                    )}
                  >
                    VIP 프로그램 미리보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </FadeIn>
        </section>

        {/* Membership Specific Notice/Disclaimer */}
        <section className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
          <div className="container">
            <FadeIn direction="up">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <span className="text-xl font-serif font-bold text-white tracking-tight block mb-4">FamilyOffice S Premium Membership</span>
                <p className="text-sm max-w-lg leading-relaxed text-slate-400 mb-4">
                  시간, 선택, 품격을 관리하는 프라이빗 컨시어지 서비스.<br/>
                  아트·트래블·라이프스타일 큐레이션과 자산관리를 통합한<br/>
                  독립적인 멤버십 프로그램입니다.
                </p>
                <div className="text-sm space-y-2 text-slate-400 mt-6">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    협업: 글로벌 럭셔리 트래블 파트너 / 전문 아트 큐레이터 네트워크
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    제휴: 삼성생명 GFC VIP·CEO 프로그램 우선 초청
                  </p>
                  <p className="flex items-center gap-2 mt-4 text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    문의: concierge@familyoffices.vip
                  </p>
                </div>
              </div>
              <div className="md:pl-8">
                <p className="text-sm font-semibold text-white mb-3">서비스 운영 원칙</p>
                <ul className="text-sm space-y-2 text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>기획·섭외·우선권 제공이 핵심이며, 실비(항공·숙박·식음료 등)는 멤버 부담</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>예약 보증금 제도 운용 (노쇼 방지 및 서비스 품질 유지)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>제휴 파트너 혜택은 사전 공지 후 변경 가능</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 mt-8 text-xs text-slate-500 leading-relaxed">
              <p className="mb-3 font-bold text-slate-400 text-sm">중요 공지사항 (Legal Disclaimer)</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-slate-400 mb-2">독립 서비스 운영</p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>본 멤버십은 보험 상품 및 금융상품의 체결·유지와 <span className="text-amber-500 font-semibold">완전히 분리</span>된 독립적인 라이프스타일 서비스입니다.</li>
                    <li>보험 가입 여부와 관계없이 자산 규모 및 서비스 니즈만으로 가입·이용 가능합니다.</li>
                    <li>멤버십 가입이 보험 상품 구매를 조건으로 하거나, 보험 가입으로 인한 특별 이익이 아님을 명시합니다.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-400 mb-2">서비스 범위 및 책임</p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>여행·호텔·전시·이벤트 등은 기획·섭외·우선권 제공이 중심이며, 실비는 멤버 부담입니다.</li>
                    <li>전문가(세무·법무·의료) 연결 서비스는 멤버십에 포함되나, 실제 자문 용역 비용은 별도입니다.</li>
                    <li>제휴 파트너사의 서비스 품질 및 가격 변동에 대한 직접 책임은 해당 파트너사에 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <LeadCaptureDialog 
        isOpen={showBrochure}
        onClose={() => setShowBrochure(false)}
        onSuccess={() => setShowBrochure(false)}
        title="멤버십 제안서 무료 다운로드"
        description="FamilyOffice S의 상세 멤버십 혜택과\n포트폴리오 예시를 확인하세요."
        source="membership-brochure"
        ctaLabel="다운로드 받기"
        successTitle="제안서가 발송되었습니다"
        successDescription="입력하신 이메일로 상세 안내서를 보내드렸습니다."
      />

      <Footer />
    </div>
  );
}
