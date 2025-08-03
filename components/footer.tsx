import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Shield,
  Youtube,
  MessageCircle,
} from 'lucide-react';

import Link from 'next/link';

import { FamilyOfficeLogo } from '@/components/logo';

import { ClientScripts } from './client-scripts';

// 커스텀 아이콘 컴포넌트들
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01c0-3.693.85-6.547 2.518-8.497C5.851 1.205 8.604.024 12.186 0h.007c3.581.024 6.334 1.205 8.184 3.509C22.024 5.56 22.5 8.414 22.5 11.99c0 3.693-.85 6.547-2.518 8.497C18.349 22.795 15.596 23.976 12.186 24zM12 2.25c-2.896 0-5.284.938-6.896 2.713C3.791 6.737 3 9.035 3 12.01s.791 5.273 2.104 7.047C6.716 20.812 9.104 21.75 12 21.75s5.284-.938 6.896-2.713C20.209 17.263 21 14.965 21 11.99s-.791-5.273-2.104-7.047C17.284 3.188 14.896 2.25 12 2.25z" />
    <path d="M16.5 12c0 2.485-2.015 4.5-4.5 4.5S7.5 14.485 7.5 12 9.515 7.5 12 7.5s4.5 2.015 4.5 4.5zm-7 0c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5S13.381 9.5 12 9.5 9.5 10.619 9.5 12z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SubstackIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

export function Footer() {
  return (
    <>
      {/* 클라이언트 전용 스크립트들 */}
      <ClientScripts />

      <footer className="border-t border-border/40 bg-gradient-to-b from-muted/30 to-muted/50 dark:from-muted/20 dark:to-muted/40">
        <div className="container section-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* 회사 정보 */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex justify-start">
                <FamilyOfficeLogo size="large" showTagline={true} />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://www.facebook.com/samsunglife4vip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://www.instagram.com/_familyoffice_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://www.threads.com/@_familyoffice_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <ThreadsIcon className="h-4 w-4" />
                  <span className="sr-only">Threads</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/jaehonglim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://x.com/jaehong_lim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
                <Link
                  href="https://jaehong.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <SubstackIcon className="h-4 w-4" />
                  <span className="sr-only">Substack</span>
                </Link>
                <Link
                  href="https://www.youtube.com/@FamilyOffice-S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link
                  href="http://pf.kakao.com/_gsxkxdG/friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Kakao</span>
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
                  <Link
                    href="/about"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    업종별 특화 서비스
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    무료 상담 신청
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://newsletter.familyoffices.vip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    뉴스레터
                  </Link>
                </li>
              </ul>
            </div>

            {/* 연락처 */}
            <div>
              <h4 className="font-semibold mb-4">연락처</h4>
              <div className="space-y-3 text-sm">
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

                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">상담 전화</p>
                    <a
                      href="tel:0502-5550-8700"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      ☎︎ 0502-5550-8700
                    </a>
                    <p className="text-muted-foreground text-xs mt-1">
                      평일 09:00 - 18:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">이메일</p>
                    <p className="text-muted-foreground">
                      cs@familyoffices.vip
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      24시간 내 답변
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 통계 섹션 */}
          <div className="border-t mt-12 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">500억원+</p>
                <p className="text-xs text-muted-foreground">자산관리 실적</p>
              </div>

              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">500+</p>
                <p className="text-xs text-muted-foreground">법인 고객사</p>
              </div>

              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">20년+</p>
                <p className="text-xs text-muted-foreground">전문 경험</p>
              </div>

              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">98%</p>
                <p className="text-xs text-muted-foreground">만족도</p>
              </div>
            </div>
          </div>

          {/* 저작권 */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025{' '}
              <span className="playfair-display-bold">FamilyOffice S</span>. All
              rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="nav-link text-muted-foreground hover:text-foreground"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="nav-link text-muted-foreground hover:text-foreground"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
