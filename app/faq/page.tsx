import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertCircle, CheckCircle, Phone, MessageSquare, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import FAQAccordion from "./faq-accordion"
import { CUSTOMER_CONCERNS, FAQ_CATEGORIES } from "@/constants/faq";

export const metadata: Metadata = {
  title: "중소중견기업 법인 대표 자주 묻는 질문 | FamilyOffice S",
  description: "중소중견기업 법인 대표님들이 자주 묻는 자산관리, 세무, 보험 관련 질문과 답변. 업종별 맞춤 솔루션 FAQ",
  keywords: "중소중견기업 FAQ, 법인 자산관리 질문, 중대재해처벌법 FAQ, 가족법인 FAQ, 승계 설계 질문",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* 히어로 섹션 */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              FAQ
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">법인 대표님들이</span><br />
              <span className="text-primary">자주 묻는 질문</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balanced">
              중소중견기업 법인 대표님들의 실제 고민과 해결책을 Q&A로 정리했습니다
            </p>
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