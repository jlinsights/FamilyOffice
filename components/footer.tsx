'use client';

import {
    Award,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Shield,
    Sparkles,
    TrendingUp,
    Users,
    Youtube,
} from 'lucide-react';

import { memo, useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import { ClientScripts } from '@/components/analytics/client-scripts';

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

  // SSR 방지: 마운트되기 전에는 기본 푸터만 표시
  if (!mounted || !isClient) {
    return (
      <footer className="border-t border-border/40 bg-gradient-to-b from-muted/30 to-muted/50 dark:from-muted/20 dark:to-muted/40">
        <div className="container section-sm">
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              © 2025 FamilyOffice. All rights reserved.
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

      <footer className="border-t border-border/40 bg-gradient-to-b from-muted/30 to-muted/50 dark:from-muted/20 dark:to-muted/40">
        <div className="container section-sm">
          {/* Curator.io 소셜 미디어 피드 */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold mb-2">최신 소식</h4>
              <p className="text-sm text-muted-foreground">
                인스타그램과 스레드에서 공유되는 최신 인사이트를 확인하세요
              </p>
            </div>

            {/* Curator.io Feed Container */}
            <div
              id="curator-feed-default-feed-layout"
              className="max-w-6xl mx-auto"
            >
              <a
                href="https://curator.io"
                target="_blank"
                rel="noopener noreferrer"
                className="crt-logo crt-tag"
              >
                Powered by Curator.io
              </a>
            </div>

            {/* Curator.io Script */}
            <Script
              id="curator-feed-script"
              type="text/javascript"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  /* curator-feed-default-feed-layout */
                  (function(){
                  var i,e,d=document,s="script";i=d.createElement("script");i.async=1;i.charset="UTF-8";
                  i.src="https://cdn.curator.io/published/76a9212f-2e3d-43e8-9555-760155d6bd6f.js";
                  e=d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);})();
                `,
              }}
            />
          </div>

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
              <h4 className="font-semibold mb-4 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                솔루션
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/solutions#core-services"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    세무 최적화
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions#core-services"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    투자 관리
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions#core-services"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    승계 설계
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions#industry-services"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    중대재해처벌법 대응
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions#industry-services"
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
                    href="/solutions"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    업종별 특화 솔루션
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#faq"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link
                    href="/structure-check#request-form"
                    className="nav-link text-muted-foreground hover:text-foreground"
                  >
                    구조 점검 요청
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

          {/* 독립성 및 투명성 고지 */}
          <div className="border-t pt-8">
            <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      전문성 보장
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      <span className="font-semibold">삼성생명 소속</span>으로{' '}
                      <span className="text-primary">
                        대한민국 최고 보험사의 전문성
                      </span>
                      을 바탕으로 작성되었습니다.{' '}
                      <span className="text-xs opacity-80">
                        (삼성화재 교차 판매 가능)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      투명한 상품 추천
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      상품 추천 시에는 항상{' '}
                      <span className="font-semibold">
                        복수의 대안을 함께 검토
                      </span>
                      하여 제안드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 저작권 */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 <span className="playfair-display-bold">FamilyOffice</span>
              . All rights reserved.
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
});
