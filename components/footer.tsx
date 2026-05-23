'use client';

import { ClientScripts } from '@/components/analytics/client-scripts';
import {
    Facebook,
    Instagram,
    Linkedin,
    MapPin,
    MessageSquare,
    Phone,
    Sparkles,
    Youtube,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

const FOOTER_MUTED = 'rgba(255,255,255,0.55)';
const FOOTER_GOLD = 'var(--brand-gold)';

// 커스텀 아이콘 컴포넌트들
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

const NaverIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2 2v20h6.5V12.5l7.5 9.5H22V2h-6.5v9.5L8 2H2z" />
  </svg>
);

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const TistoryIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 459 459"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>티스토리 로고</title>
    <g>
      <path d="M229.5,0C102.75,0,0,102.75,0,229.5S102.75,459,229.5,459,459,356.25,459,229.5,356.25,0,229.5,0ZM130.21,191.45a39.57,39.57,0,1,1,39.56-39.57A39.58,39.58,0,0,1,130.21,191.45ZM229.5,390a39.56,39.56,0,1,1,39.56-39.56A39.56,39.56,0,0,1,229.5,390Zm0-99.29a39.56,39.56,0,1,1,39.56-39.56A39.56,39.56,0,0,1,229.5,290.74Zm0-99.29a39.57,39.57,0,1,1,39.56-39.57A39.57,39.57,0,0,1,229.5,191.45Zm99.29,0a39.57,39.57,0,1,1,39.57-39.57A39.57,39.57,0,0,1,328.79,191.45Z" />
    </g>
  </svg>
);

export const Footer = memo(function Footer() {
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  if (!mounted || !isClient) {
    return (
      <footer style={{ backgroundColor: 'var(--brand-navy)', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        <div className="container section-sm">
          <div className="text-center py-8">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              &copy; 2025{' '}
              <span className="font-playfair font-semibold" style={{ color: 'var(--brand-gold)' }}>
                패밀리오피스
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* 클라이언트 전용 스크립트들 */}
      <ClientScripts />

      <footer
        className="[&_.text-muted-foreground]:!text-white/55 [&_.text-foreground]:!text-white/90"
        style={{ backgroundColor: 'var(--brand-navy)', borderTop: '1px solid rgba(212,175,55,0.2)' }}
      >
        {/* Heritage Gold top accent line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--brand-gold), transparent)' }} />
        <div className="container section-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 회사 정보 및 뉴스레터 */}
            <div>
              <div className="mb-6 flex justify-start">
                <Link href="/" className="transition-opacity hover:opacity-80">
                  <Image
                    src="/SVG/FamilyOfficeS_blue_tagline.svg"
                    alt="FamilyOffice S - Your Trusted Financial Partner for Life"
                    width={180}
                    height={50}
                    className="h-12 w-auto transition-transform hover:scale-105"
                  />
                </Link>
              </div>

              <div className="mb-6 max-w-sm space-y-3 text-left">
                <p
                  className="font-playfair text-lg font-semibold leading-snug"
                  style={{ color: '#FFFFFF' }}
                >
                  패밀리오피스
                </p>
                <p className="text-xs leading-relaxed" style={{ color: FOOTER_MUTED }}>
                  중소·중견기업 CEO와 고액자산가를 위한 통합 자산관리·가업승계
                  컨설팅
                </p>
                <Link
                  href="/about"
                  className="inline-block text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: FOOTER_GOLD }}
                >
                  회사 소개 보기 →
                </Link>
              </div>

              {/* 소셜 미디어 */}
              <div className="flex flex-wrap gap-3 mb-6 justify-start">
                <Link
                  href="https://www.facebook.com/samsunglife4vip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Facebook className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://www.instagram.com/_familyoffice_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Instagram className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/jaehonglim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                  title="임재홍 수석 컨설턴트 프로필"
                >
                  <Linkedin className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">임재홍 수석 컨설턴트 프로필</span>
                </Link>
                <Link
                  href="https://x.com/jaehong_lim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <XIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
                <Link
                  href="https://jaehong.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <SubstackIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">Substack</span>
                </Link>
                <Link
                  href="https://www.youtube.com/@FamilyOffice-S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <Youtube className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link
                  href="https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-green-500 hover:text-white transition-all hover:scale-105"
                >
                  <SpotifyIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-white" />
                  <span className="sr-only">Spotify Podcast</span>
                </Link>
                <Link
                  href="https://blog.naver.com/lim_jaehong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <NaverIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">Naver Blog</span>
                </Link>
                <Link
                  href="http://pf.kakao.com/_gsxkxdG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-accent-foreground" />
                  <span className="sr-only">카카오톡 채널</span>
                </Link>
                <Link
                  href="https://family-office.tistory.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-orange-500 hover:text-white transition-all hover:scale-105"
                >
                  <TistoryIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-muted-foreground hover:text-white" />
                  <span className="sr-only">Tistory Blog</span>
                </Link>
              </div>

              {/* Weekly Brief 구독 폼 */}
              <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border/40">
                <h5 className="font-semibold text-sm mb-3 text-foreground text-left">
                  Weekly Brief
                </h5>
                <p className="text-xs text-muted-foreground mb-3 text-left">
                  중소중견기업 자산관리 인사이트를 받아보세요
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="flex-1 px-3 py-2 text-xs bg-background/80 dark:bg-background/60 border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    구독
                  </button>
                </form>
              </div>
            </div>

            {/* 솔루션 */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center" style={{ color: 'var(--brand-gold)' }}>
                <Sparkles className="h-4 w-4 mr-2" style={{ color: 'var(--brand-gold)' }} />
                솔루션
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/business-succession-strategy"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    가업승계 & 절세
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    패밀리오피스
                  </Link>
                </li>
                <li>
                  <Link
                    href="/asset-diversification"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    기업 자산관리
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="nav-link font-medium text-primary hover:text-primary/80"
                  >
                    전체 솔루션 보기
                  </Link>
                </li>
              </ul>
            </div>

            {/* 정보 & 리소스 */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--brand-gold)' }}>리소스</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/insights"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    인사이트
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculators"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    상속세 계산기
                  </Link>
                </li>
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
                    href="/recruit"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    채용
                  </Link>
                </li>
              </ul>
            </div>

            {/* 연락처 */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--brand-gold)' }}>연락처</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">찾아오시는 곳</p>
                    <p className="text-muted-foreground leading-relaxed">
                      <a
                        href="https://naver.me/x1Vz2wUe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        서울시 중구 세종대로 73 태평로빌딩
                      </a>
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
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">카카오 오픈채팅</p>
                    <a
                      href="https://open.kakao.com/me/familyoffice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      패밀리오피스
                    </a>
                    <div className="mt-2">
                      <Image
                        src="/images/kakao-qr.jpg"
                        alt="Kakao Open Chat QR Code"
                        width={100}
                        height={100}
                        className="rounded-lg border border-border/40"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 저작권 */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
            <p
              className="text-sm text-center md:text-left leading-relaxed"
              style={{ color: FOOTER_MUTED }}
            >
              &copy; 2025{' '}
              <span className="font-playfair font-semibold" style={{ color: FOOTER_GOLD }}>
                패밀리오피스
              </span>
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="transition-colors hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});
