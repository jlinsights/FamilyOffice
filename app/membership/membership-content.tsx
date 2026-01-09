'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    Crown,
    Key,
    Landmark,
    Plane,
    Shield,
    Star,
    Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MembershipContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const tiers = [
    {
      name: "Essential",
      price: "300만원",
      target: "월납 30~60만원 구간",
      desc: "기본 점검 + 리포트",
      features: [
        "코어 체크업 2회",
        "자산 리포트 12회",
        "전시 동선 큐레이션 4회",
        "기본 컨시어지 지원"
      ],
      isPopular: false
    },
    {
      name: "Signature",
      price: "600만원",
      target: "월납 60~120만원 구간",
      desc: "경험형 큐레이션 시작",
      features: [
        "코어 미팅 2회",
        "호텔/다이닝 기획 4회",
        "전시/프리뷰 6회",
        "우선 예약 서비스"
      ],
      isPopular: true
    },
    {
      name: "Platinum",
      price: "1,200만원",
      target: "월납 120~250만원 구간",
      desc: "월 1회 전담 컨시어지",
      features: [
        "컨시어지 12회",
        "국내 1박2일 기획 1회",
        "컬렉팅 로드맵 수립",
        "전용 핫라인 제공"
      ],
      isPopular: false
    },
    {
      name: "Black",
      price: "2,400만원",
      target: "월납 250~500만원 구간",
      desc: "가족 단위 확장 서비스",
      features: [
        "가족회의(거버넌스) 2회",
        "해외 아트/호텔 동행 기획 1회",
        "전문가 우선 연결",
        "배우자/자녀 온보딩"
      ],
      isPopular: false
    }
  ];

  const faqs = [
    { q: "멤버십은 누구에게 적합한가요?", a: "바쁜 일정 속에서 선택·예약·조율에 쓰는 시간을 줄이고, 자산/승계/라이프 의사결정을 빠르고 정확하게 하고 싶은 분께 적합합니다." },
    { q: "호텔/여행을 무료로 제공하나요?", a: "아닙니다. 본 서비스는 기획·섭외·우선예약·동선 설계가 핵심이며, 항공/숙박/티켓/식음료 등 실비는 멤버 부담입니다(파트너 혜택 적용 가능)." },
    { q: "등급은 무엇으로 결정되나요?", a: "월납 합산은 참고지표이며, 실제로는 요청 빈도, 가족 단위 여부, 자산 구조 복잡도(승계/법인/부동산 비중) 등을 종합해 제안드립니다." },
    { q: "보험 상품 가입이 필수인가요?", a: "필수가 아닙니다. 멤버십은 독립된 서비스 계약으로 운영됩니다. 기존 보유 계약이나 자산 규모만으로도 심사 가능합니다." },
    { q: "컨시어지는 무엇을 해주나요?", a: "예약 대행을 넘어, 목적·취향을 반영한 옵션 비교 → 일정 설계 → 커뮤니케이션 → 확정까지 실무를 끝까지 책임집니다." },
    { q: "전문가(세무/법무) 연결 비용은?", a: "연결 자체는 멤버십 범위에 포함될 수 있으나, 전문가의 실제 자문/용역 비용은 별도 계약일 수 있습니다." }
  ];

  return (
    <div className="font-sans text-slate-800 bg-background min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-16">
        {/* Assumes Header height is roughly 64px (h-16), adjusting pt-16 ensures content is not hidden behind fixed header */}


        {/* Hero Section - Refactored for Premium Consistency */}
        <section
          id="hero"
          className="mobile-scroll-smooth hero-section-optimized priority-content relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20 safe-area-top"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-7xl mx-auto px-6 py-12">
            {/* Badge */}
            <div className="flex justify-center mb-6 lg:mb-10 min-h-[32px] lg:min-h-[40px]">
              <Badge
                variant="outline"
                size="lg"
                animation="fade"
                className="border-amber-200 bg-gradient-to-r from-amber-50/80 to-amber-100/50 text-amber-800 dark:border-amber-800 dark:from-amber-950/80 dark:to-amber-900/50 dark:text-amber-200 shadow-lg backdrop-blur-sm"
              >
                <Crown className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                Private Concierge & Asset Management
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="mobile-text-optimize font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent whitespace-pre-line font-serif">
              자산을 키우는 것만큼,{'\n'}
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider font-sans text-foreground">
                 <span className="inline-block">
                  시간·선택·품격을 관리합니다.
                </span>
              </span>
            </h1>

            {/* Description */}
            <FadeIn direction="up" delay={1.0}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-4 sm:mb-6 lg:mb-8 text-balance">
                FamilyOffice S 멤버십은 단순한 혜택 나열이 아닙니다.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={1.2}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed font-light text-balance">
                당신의 라이프스타일 효율을 극대화하는 <span className="font-semibold text-primary">의사결정 파트너</span>입니다.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
             <FadeIn direction="up" delay={1.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">            <Link
                href="/apply/membership-intake"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-6 text-lg transform hover:-translate-y-0.5 transition-all'
                )}
              >
                전문가 멤버십 진단 받기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
                <Link
                  href="tel:0502-5550-8700"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'bg-transparent border-primary/20 hover:bg-primary/5 text-foreground font-bold shadow-lg px-8 py-6 text-lg transform hover:-translate-y-0.5 transition-all'
                  )}
                >
                  Founder's Circle 문의
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>


        {/* Philosophy Section */}
        <section id="philosophy" className="section bg-gradient-to-b from-background via-muted/50 to-background border-t border-muted/20">
          <div className="container">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4">Core Values</Badge>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Core Value Proposition</h2>
                <p className="mt-4 text-muted-foreground text-lg text-balance">당신이 원하는 건 ‘할인’이 아니라 ‘<span className="text-foreground font-medium">접근(Access)과 속도(Speed)</span>’입니다.</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} stagger={0.1}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Decision Support",
                  desc: "자산·리스크·승계 이슈를 빠르게 정리하고 \"다음 행동\"을 명확히 합니다. 불필요한 고민의 시간을 줄여드립니다."
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: "Concierge Execution",
                  desc: "호텔, 여행, 전시, 미팅을 \"알아서\" 되는 수준으로 정리합니다. 기획부터 동선 설계까지 완벽하게 수행합니다."
                },
                {
                  icon: <Key className="h-8 w-8" />,
                  title: "Private Access",
                  desc: "프리뷰, 라운드테이블, 전문가 네트워크 등 공개된 시장에서 얻기 어려운 독점적인 접근성을 제공합니다."
                }
              ].map((item, idx) => (
                <div key={idx} className="card-interactive p-8 group border-transparent hover:border-border">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            </FadeIn>
          </div>
        </section>


        {/* Detailed Services (Modules) */}
        <section id="benefits" className="section bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none"></div>
          <div className="container relative z-10">
            <FadeIn direction="up">
              <div className="mb-16">
                <span className="text-amber-500 font-semibold tracking-wider text-sm uppercase block mb-2">Curated Services</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Modular Benefits</h2>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
              {[
                {
                  icon: <Plane className="text-amber-500" size={32} />,
                  title: "Travel & Hotel Concierge",
                  items: [
                    "호텔 투어/스위트 쇼잉/다이닝 코스 섭외",
                    "해외 일정 동선 최적화(도시/항공/숙박/이동)",
                    "허니문/기념일 테마별 프라이빗 플래닝"
                  ]
                },
                {
                  icon: <Star className="text-amber-500" size={32} />,
                  title: "Art & Collection",
                  items: [
                    "전시 프리뷰/프라이빗 도슨트 섭외",
                    "작가·갤러리·아트페어 미팅 셋업",
                    "컬렉션 관리 가이드 및 리스크 체크리스트"
                  ]
                },
                {
                  icon: <Landmark className="text-amber-500" size={32} />,
                  title: "Family Office Core Review",
                  items: [
                    "자산 구조(현금흐름·부동산·법인) 통합 점검",
                    "승계·가업·가족 거버넌스 액션아이템 도출",
                    "분기/반기 리밸런싱 미팅 진행"
                  ]
                },
                {
                  icon: <Users className="text-amber-500" size={32} />,
                  title: "Private Network",
                  items: [
                    "멤버 전용 소규모 디너/라운드테이블(초청제)",
                    "분야별 최고 전문가(세무·법무) 우선 연결",
                    "비공개 투자 딜 소싱 및 공유"
                  ]
                }
              ].map((service, idx) => (
                <div key={idx} className="flex gap-6 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 mt-1 p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                    <ul className="space-y-3 text-slate-300">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 mr-3 text-amber-500 mt-1 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
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


        {/* Membership Tiers */}
        <section id="membership" className="section bg-muted/30">
          <div className="container">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Membership Tiers</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg text-balance">
                  아래 '월납 합산 기준'은 참고지표입니다.<br/>
                  실제 등급은 가족 단위 자산, 법인 구조 복잡도, 서비스 니즈에 따라 맞춤 제안됩니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} stagger={0.1}>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl p-8 border flex flex-col transition-all duration-300 bg-card ${
                    tier.isPopular
                      ? 'border-amber-400 shadow-xl ring-1 ring-amber-400 z-10 scale-105 md:scale-105'
                      : 'border-border shadow-sm hover:shadow-lg'
                  }`}
                >
                  {tier.isPopular && (
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{tier.target}</p>
                  </div>
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-foreground">₩{tier.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">/년 (예시)</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 min-h-[40px] leading-relaxed">{tier.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="text-amber-500 flex-shrink-0 mr-2 h-4 w-4" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="w-full">
                    {tier.name === "Black" || tier.name === "Founder's Circle" ? (
                      <Link 
                        href="tel:0502-5550-8700" 
                        className={cn(
                          buttonVariants({ 
                            className: `w-full py-6 text-sm font-semibold transition ${
                              tier.isPopular
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground'
                            }`
                          }),
                          "flex items-center justify-center"
                        )}
                      >
                         문의하기
                      </Link>
                    ) : (
                      <Button
                        className={`w-full py-6 text-sm font-semibold transition ${
                          tier.isPopular
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        진단 및 신청
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-12 p-8 bg-card border border-border rounded-xl text-center md:text-left md:flex justify-between items-center shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Founder’s Circle</h3>
                  <p className="text-muted-foreground mt-1">가문·법인 단위 전담 관리, 전문가 네트워크 우선 연결, 비공개 라운드테이블</p>
                </div>
                <Link 
                  href="tel:0502-5550-8700"
                  className={cn(
                    buttonVariants({ className: 'mt-6 md:mt-0 bg-slate-900 text-white px-8 h-12 rounded-md hover:bg-slate-800 transition whitespace-nowrap flex items-center justify-center' })
                  )}
                >
                  별도 제안 요청
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>


        {/* Process Flow */}
        <section className="section bg-background border-b border-border">
          <div className="container">
             <FadeIn direction="up">
               <div className="text-center mb-16">
                <h2 className="text-3xl font-serif font-bold text-foreground">How It Works</h2>
              </div>
             </FadeIn>
            <FadeIn delay={0.2} stagger={0.1}>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "간단 진단", desc: "10분 설문을 통해 목적과 취향, 제약사항을 파악합니다." },
                { step: "02", title: "등급 제안", desc: "고객님의 상황에 최적화된 멤버십 등급과 범위를 제안드립니다." },
                { step: "03", title: "온보딩", desc: "선호/금기사항, 캘린더, 예산, 동행자 정보를 등록합니다." },
                { step: "04", title: "실행 & 큐레이션", desc: "요청 시 기획안 제시 후 예약 및 섭외, 사후 정리까지 수행합니다." }
              ].map((item, index) => (
                <div key={index} className="text-center relative group p-4">
                  <div className="text-6xl font-serif text-muted/30 font-bold mb-6 group-hover:text-amber-500/10 transition-colors duration-500">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3 relative z-10 -mt-8">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance">{item.desc}</p>
                  {index < 3 && <ArrowRight className="hidden md:block absolute top-[20%] -right-4 text-muted" size={24} />}
                </div>
              ))}
            </div>
            </FadeIn>
          </div>
        </section>


        {/* FAQ & CTA */}
        <section id="faq" className="section bg-muted/10">
          <FadeIn direction="up">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-16">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-lg border border-border overflow-hidden transition-all hover:border-primary/20">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-muted/30 transition"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-semibold text-foreground text-base md:text-lg">{faq.q}</span>
                    {activeFaq === index ? <ChevronUp className="text-primary flex-shrink-0" size={20} /> : <ChevronDown className="text-muted-foreground flex-shrink-0" size={20} />}
                  </button>
                  {activeFaq === index && (
                    <div className="px-8 pb-8 pt-2 bg-muted/5 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">프리미엄 멤버십 상담 신청</h3>
              <p className="text-muted-foreground mb-10 text-lg">짧은 진단만으로도, 어떤 등급이 과소/과대인지 바로 정리됩니다.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/apply/membership-intake"
                  className={cn(
                    buttonVariants({ className: 'btn-primary w-full sm:w-auto px-10 py-6 h-auto text-lg shadow-lg' })
                  )}
                >
                  멤버십 진단 받기
                </Link>
                <Link 
                  href="tel:0502-5550-8700"
                  className={cn(
                    buttonVariants({ variant: 'outline', className: 'w-full sm:w-auto px-10 py-6 h-auto text-lg font-bold shadow-lg text-foreground bg-transparent border-primary/20 hover:bg-primary/5' })
                  )}
                >
                  Founder’s Circle 문의
                </Link>
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
                <span className="text-xl font-serif font-bold text-white tracking-tight block mb-4">FamilyOffice S</span>
                <p className="text-sm max-w-xs leading-relaxed text-slate-400 mb-4">
                  자산 관리의 새로운 기준.<br/>
                  귀하의 시간과 품격을 가장 우선순위에 둡니다.
                </p>
                <div className="text-sm space-y-1 text-slate-400">
                  <p>운영 원칙: 실비 별도 부담 / 예약 보증금 제도 운용</p>
                  <p>문의: concierge@familyoffices.vip</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 mt-8 text-xs text-slate-500 leading-relaxed">
              <p className="mb-2 font-bold text-slate-400">유의사항</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>본 멤버십은 금융상품의 체결/유지와 분리된 독립 서비스입니다.</li>
                <li>여행/호텔/전시 등은 기획·섭외·우선권 제공이 중심이며, 실비 비용은 멤버 부담입니다.</li>
                <li>제휴사 혜택은 운영 상황에 따라 변경될 수 있으며, 사전 공지 후 적용됩니다.</li>
              </ul>
            </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
