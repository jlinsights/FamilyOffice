import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Sparkles, TrendingUp, Users, Award, Shield } from "lucide-react"
import { FamilyOfficeLogo } from "@/components/logo"
import NewsletterSignup from "./newsletter-signup";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-muted/30 to-muted/50 dark:from-muted/20 dark:to-muted/40">
      <div className="container section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-start">
              <FamilyOfficeLogo 
                size="large" 
                showTagline={true}
              />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md text-pretty leading-relaxed">
              중소중견기업 전문 자산관리 서비스 팀.
              <br />
              중소중견기업 법인 대표님을 위한 전문 자산관리 서비스를 제공합니다.
            </p>
            <div className="flex space-x-3">
              <Link 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              서비스
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services#core-services"
                  className="nav-link text-muted-foreground hover:text-foreground"
                >
                  세무 최적화
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#core-services" 
                  className="nav-link text-muted-foreground hover:text-foreground"
                >
                  투자 관리
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#core-services" 
                  className="nav-link text-muted-foreground hover:text-foreground"
                >
                  승계 설계
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#industry-services" 
                  className="nav-link text-muted-foreground hover:text-foreground"
                >
                  중대재해처벌법 대응
                </Link>
              </li>
              <li>
                <Link
                  href="/services#industry-services"
                  className="nav-link text-muted-foreground hover:text-foreground"
                >
                  가족법인 설립
                </Link>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h4 className="font-semibold mb-4">정보</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="nav-link text-muted-foreground hover:text-foreground">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/services" className="nav-link text-muted-foreground hover:text-foreground">
                  업종별 특화 서비스
                </Link>
              </li>
              <li>
                <Link href="/faq" className="nav-link text-muted-foreground hover:text-foreground">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link text-muted-foreground hover:text-foreground">
                  무료 상담 신청
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 연락처 정보 */}
        <div className="border-t mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-4 transition-all hover:shadow-md bg-background/60 dark:bg-background/40 border-border/30">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">찾아오시는 곳</p>
                  <p className="text-muted-foreground leading-relaxed">
                    서울시 중구 세종대로 73 태평로빌딩
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card p-4 transition-all hover:shadow-md bg-background/60 dark:bg-background/40 border-border/30">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">상담 전화</p>
                  <a href="tel:0502-5550-8700" className="text-muted-foreground hover:text-primary transition-colors">☎︎ 0502-5550-8700</a>
                  <p className="text-muted-foreground text-xs mt-1">평일 09:00 - 18:00</p>
                </div>
              </div>
            </div>
            
            <div className="card p-4 transition-all hover:shadow-md bg-background/60 dark:bg-background/40 border-border/30">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">이메일</p>
                  <p className="text-muted-foreground">cs@familyoffices.vip</p>
                  <p className="text-muted-foreground text-xs mt-1">24시간 내 답변</p>
                </div>
              </div>
            </div>
          </div>

          {/* 법인 대표 통계 */}
          <div className="border-t pt-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: TrendingUp, value: "500억원+", label: "자산관리 실적", color: "text-blue-600 dark:text-blue-400" },
                { icon: Users, value: "500+", label: "법인 고객사", color: "text-green-600 dark:text-green-400" },
                { icon: Shield, value: "20년+", label: "전문 경험", color: "text-purple-600 dark:text-purple-400" },
                { icon: Award, value: "98%", label: "만족도", color: "text-orange-600 dark:text-orange-400" }
              ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* 뉴스레터 구독 폼 */}
          <NewsletterSignup />
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FamilyOffice S. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="nav-link text-muted-foreground hover:text-foreground">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="nav-link text-muted-foreground hover:text-foreground">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
