import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AdminAccessDeniedAlert } from "@/components/admin-access-denied-alert"
import { SmoothScroll } from "@/components/smooth-scroll"
import { StructuredData } from "@/components/structured-data"
import type { Metadata } from "next"
import { generateMetadata, generateStructuredData } from "@/lib/seo"

// 페이지별 메타데이터 - 가업승계 전문 서비스로 업데이트
export const metadata: Metadata = generateMetadata(
  "백년영속의 시작 | 가업승계 전문 FamilyOffice S",
  "기업의 가치를 다음 세대로. 10년+ 가업승계 노하우, 1,500+ M&A 플랫폼, 60+ Big 4 출신 전문가 컨소시엄. 성공적인 가업승계는 백년영속의 시작입니다.",
  [
    "가업승계", "패밀리오피스", "헤리티지 플래닝", "기업승계", "가족법인", 
    "자산이전", "상속계획", "승계전략", "백년영속", "비상장기업 승계",
    "중소기업 승계", "가업승계 컨설팅", "기업승계 전략", "상속세 최적화"
  ],
  "/og-image-succession.jpg"
)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AdminAccessDeniedAlert />
      <Header />
      <SmoothScroll />

      {/* 구조화된 데이터 */}
      <StructuredData data={generateStructuredData('Organization')} />
      <StructuredData data={generateStructuredData('WebSite')} />

      <main id="main-content" className="pt-20">
        <HeroSection />
        <ServicesSection />
      </main>

      <Footer />
    </div>
  )
}
