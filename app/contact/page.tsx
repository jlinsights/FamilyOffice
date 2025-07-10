import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConsultationForm } from "@/components/forms/consultation-form"
import { CalComButton } from "@/components/cal-com-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Users, Shield, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "상담 신청 | FamilyOffice S - 중소중견기업 전문 자산관리",
  description: "중소중견기업 법인 대표님을 위한 전문 자산관리 서비스. 무료 상담을 통해 맞춤형 패밀리오피스 솔루션을 확인하세요.",
  keywords: "패밀리오피스 상담, 중소중견기업 자산관리 상담, 법인 대표 재무상담, 무료 자산관리 상담",
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "오피스 위치",
      content: "서울 중구 세종대로 73(태평로2가 310)\n태평로빌딩 10층",
      description: "지하철 1,2호선 시청역 3번출구 도보 3분"
    },
    {
      icon: Phone,
      title: "전화 상담",
      content: "☎︎ 0502-5550-8700",
      description: "전담 상담사가 직접 응답해드립니다"
    },
    {
      icon: Mail,
      title: "이메일 문의",
      content: "info@familyoffices.vip",
      description: "24시간 내 답변을 약속드립니다"
    },
    {
      icon: Clock,
      title: "상담 시간",
      content: "평일 09:00 - 18:00",
      description: "토요일 상담은 사전 예약 필요"
    }
  ]

  const consultationProcess = [
    {
      step: "01",
      title: "상담 신청",
      description: "온라인 폼 작성 또는 전화 상담 신청"
    },
    {
      step: "02",
      title: "일정 조율",
      description: "법인 대표님 일정에 맞춘 상담 시간 조율"
    },
    {
      step: "03",
      title: "맞춤 상담",
      description: "업종별 전문가의 1:1 맞춤형 상담"
    },
    {
      step: "04",
      title: "솔루션 제안",
      description: "현황 분석 후 최적의 자산관리 전략 제안"
    }
  ]

  const whyChooseUs = [
    {
      icon: Users,
      title: "20년+ 전문 경험",
      description: "중소중견기업 전문 20년 이상의 검증된 노하우"
    },
    {
      icon: Shield,
      title: "500+ 법인 고객",
      description: "다양한 업종 500여 법인 대표님의 신뢰"
    },
    {
      icon: Award,
      title: "500억원+ 관리 실적",
      description: "500억원 이상의 자산관리 실적으로 검증된 전문성"
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* 히어로 섹션 */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              Free Consultation
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">중소중견기업 전문가와</span><br />
              <span className="text-primary">무료 상담</span> <span className="text-foreground">받으세요</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balanced">
              업종별 특성을 정확히 이해하는 전문가들이<br />
              <span className="font-semibold text-foreground">법인 대표님만을 위한 맞춤형 자산관리 솔루션</span>을 제안해드립니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* CalComButton(온라인 예약하기) 버튼 삭제됨 */}
              <Button size="lg" asChild>
                <Link href="#consultation-form">
                  <Phone className="h-5 w-5 mr-2" />
                  폼으로 신청하기
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">
                  서비스 자세히 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 혜택 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              무료 상담으로 받으실 수 있는 혜택
            </h2>
            <p className="text-muted-foreground">전문가의 맞춤형 분석과 전략을 무료로 확인하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="card-modern p-6 text-center animate-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 신청 폼 */}
      <section id="consultation-form" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 폼 영역 */}
              <div className="animate-up">
                <div className="mb-8">
                  <Badge variant="secondary" className="mb-4">
                    Consultation Form
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    무료 상담 신청
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    법인 대표님의 현황에 맞는 최적의 자산관리 전략을 제안해드립니다.<br />
                    상담은 <span className="font-semibold text-primary">완전 무료</span>이며, 영업 목적의 연락은 하지 않습니다.
                  </p>
                </div>
                <div className="card-modern p-8">
                  <ConsultationForm />
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="animate-up" style={{ animationDelay: "200ms" }}>
                <div className="mb-8">
                  <Badge variant="secondary" className="mb-4">
                    Contact Information
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">
                    연락처 안내
                  </h3>
                  <p className="text-muted-foreground">
                    다양한 방법으로 상담을 신청하실 수 있습니다
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="card-modern p-6 animate-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{info.title}</h4>
                          {info.title === "전화 상담" ? (
                            <a href="tel:0502-5550-8700" className="text-foreground font-medium mb-1 hover:text-primary transition-colors block">
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium mb-1 whitespace-pre-line">{info.content}</p>
                          )}
                          <p className="text-muted-foreground text-sm">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 프로세스 */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Consultation Process
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              상담 진행 과정
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              체계적인 상담 프로세스로 최고의 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {consultationProcess.map((process, index) => (
              <div key={index} className="text-center animate-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-muted-foreground text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 신뢰도 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Why Choose Us
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              왜 <span className="text-primary">FamilyOffice S</span>를 선택해야 할까요?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              중소중견기업 법인 대표님들이 FamilyOffice S를 선택하는 이유
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "업종별 전문성",
                description: "제조업, 건설업, IT벤처기업 등 각 업종의 특성을 정확히 이해하는 전문가들이 맞춤형 솔루션을 제공합니다.",
                features: ["중대재해처벌법 대응", "정책자금 활용", "가족법인 설립", "승계 설계"]
              },
              {
                title: "법인 대표 중심",
                description: "법인 대표님의 일정과 우선순위를 최우선으로 고려한 개인 맞춤형 서비스를 제공합니다.",
                features: ["개인 맞춤형 일정", "전담 전문가 배정", "밀착 코칭 상담", "지속적 관리"]
              },
              {
                title: "통합 솔루션",
                description: "법인-개인 자산을 통합 관리하고, 세무-투자-승계까지 원스톱 서비스를 제공합니다.",
                features: ["법인-개인 통합관리", "세무 최적화", "투자 전략", "승계 설계"]
              }
            ].map((item, index) => (
              <div key={index} className="card-modern p-8 animate-up" style={{ animationDelay: `${index * 150}ms` }}>
                <h3 className="text-xl font-semibold mb-4 text-primary">{item.title}</h3>
                <p className="text-muted-foreground mb-6 text-pretty">{item.description}</p>
                <div className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 상담을 시작하세요
          </h2>
          
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            중소중견기업 전문가와의 1:1 무료 상담으로<br />
            더 나은 자산관리 전략을 확인해보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalComButton
              calLink="familyoffice/consultation"
              buttonText="지금 바로 예약"
              className="rounded-full px-8 py-4 text-lg font-bold border border-primary bg-white text-primary shadow-lg transition
                hover:bg-primary-foreground hover:text-primary
                dark:bg-background dark:text-primary dark:border-primary
                dark:hover:bg-primary-foreground dark:hover:text-primary"
            />
            <Button
              size="lg"
              className="rounded-full px-8 py-4 text-lg font-bold border border-primary-foreground bg-primary-foreground text-primary shadow-lg transition
                hover:bg-white hover:text-primary hover:border-primary
                dark:bg-primary-foreground dark:text-primary dark:border-primary
                dark:hover:bg-background dark:hover:text-primary"
            >
              <Phone className="mr-2 h-4 w-4" />
              0502-5550-8700
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
