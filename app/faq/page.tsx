import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Phone, MessageSquare, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import FAQAccordion from "./faq-accordion";
import { CUSTOMER_CONCERNS, FAQ_CATEGORIES } from "@/constants/faq";

export const metadata: Metadata = {
  title: "중소중견기업 법인 대표 자주 묻는 질문 | FamilyOffice S",
  description: "중소중견기업 법인 대표님들이 자주 묻는 자산관리, 세무, 보험 관련 질문과 답변. 업종별 맞춤 솔루션 FAQ",
  keywords: "중소중견기업 FAQ, 법인 자산관리 질문, 중대재해처벌법 FAQ, 가족법인 FAQ, 승계 설계 질문",
}

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function FAQPage() {
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
              <MessageSquare className="h-3 w-3 mr-1" />
              FAQ & Solutions
            </Badge>
          </div>
          
          {/* 메인 헤드라인 */}
          <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
            법인 대표님들이{"\n"}<span className="text-foreground">자주 묻는 질문</span>
          </h1>
          
          {/* 서브 헤드라인 */}
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            실제 고민과 전문가 해결책
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
            중소중견기업 법인 대표님들의 <span className="font-semibold text-foreground">실제 고민과 해결책</span>을 Q&A로 정리했습니다
          </p>
          
          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg" asChild>
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                전문가에게 질문하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-bold shadow-lg px-8 py-4 text-lg" asChild>
              <Link href="/services">
                <CheckCircle className="mr-2 h-5 w-5" />
                서비스 자세히 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 고객 고민 해결 섹션 */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Customer Concerns
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              법인 대표님들의 <span className="text-primary">실제 고민</span>과 해결책
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              중소중견기업 전문 자산관리 노하우로 정리한 가장 빈번한 고민들과 FamilyOffice S의 해결 방안
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CUSTOMER_CONCERNS.map((item, index) => (
              <div key={index} className="card-modern p-8 animate-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-destructive">
                      "{item.concern}"
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">{item.solution}</h4>
                    <p className="text-muted-foreground text-pretty">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Frequently Asked Questions
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              업종별 맞춤 FAQ
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              각 업종의 특성에 맞는 자주 묻는 질문과 전문가 답변
            </p>
          </div>

          {/* 2열 그리드+아코디언 FAQ 섹션 */}
          <FAQAccordion faqCategories={FAQ_CATEGORIES} />
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            더 궁금한 점이 있으시다면?
          </h2>
          
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            업종별 전문가와의 1:1 무료 상담을 통해<br />
            구체적인 질문에 대한 답변을 받아보세요
          </p>
          
          {/* 연락처 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <Phone className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">전화상담</h3>
              <p className="text-2xl font-bold mb-2">0502-5550-8700</p>
              <p className="text-sm text-primary-foreground/80">평일 10:00-18:00</p>
            </div>
            
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <MessageSquare className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">카카오 상담</h3>
              <p className="text-lg font-bold mb-2">@패밀리오피스</p>
              <p className="text-sm text-primary-foreground/80">실시간 채팅 상담</p>
            </div>
            
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <MapPin className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">오피스 방문</h3>
              <p className="text-sm mb-2">서울 서초구 서초대로 74길 4</p>
              <p className="text-sm text-primary-foreground/80">사전 예약 필수</p>
            </div>
          </div>
          
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