import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SeminarHeroSection } from "@/components/seminar/SeminarHeroSection";
import { UpcomingSeminarsSection } from "@/components/seminar/UpcomingSeminarsSection";
import { SeminarCategoriesSection } from "@/components/seminar/SeminarCategoriesSection";
import { PastSeminarsSection } from "@/components/seminar/PastSeminarsSection";
import SeminarRegistrationSection from "@/components/seminar/SeminarRegistrationSection";

export const metadata: Metadata = {
  title: "세미나 | 패밀리오피스 S - 프리미엄 교육 프로그램",
  description: "업계 최고 전문가들과 함께하는 패밀리오피스 전문 세미나. CEO 대상 맞춤형 교육 프로그램으로 경영 역량을 강화하세요.",
  keywords: ["세미나", "CEO 교육", "패밀리오피스", "경영진 교육", "자산관리 세미나", "가업승계", "리더십"],
  openGraph: {
    title: "세미나 | 패밀리오피스 S",
    description: "업계 최고 전문가들과 함께하는 프리미엄 세미나 프로그램",
    type: "website",
    locale: "ko_KR"
  }
};

export default function SeminarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />
      
      <main className="pt-20">
        <SeminarHeroSection />
        <UpcomingSeminarsSection />
        <SeminarCategoriesSection />
        <PastSeminarsSection />
        <SeminarRegistrationSection />
      </main>

      <Footer />
    </div>
  );
}