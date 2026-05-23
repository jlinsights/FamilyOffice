'use client';

import { ArrowRight, ChevronDown, ClipboardCheck, Menu, X } from 'lucide-react';
import type { KeyboardEvent, MouseEventHandler } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import {
  SafeSignInButton,
  SafeUserButton,
} from '@/components/auth/safe-clerk-components';
import { FamilyOfficeSTaglineBlackLogo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { useSafeAuth } from '@/hooks/use-safe-auth';
import type { NavigationItem, NavigationSubItem } from '@/types/globals';

interface HeaderProps {
  isScrolled?: boolean;
}

export const Header = memo(function Header({
  isScrolled = false,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenus, setMobileSubmenus] = useState<{
    [key: string]: boolean;
  }>({});
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn, isLoaded } = useSafeAuth();

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  const toggleMobileMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      setIsMobileMenuOpen(prev => {
        const newState = !prev;
        // 메뉴를 닫을 때 모든 서브메뉴도 닫기
        if (!newState) {
          setMobileSubmenus({});
        }
        return newState;
      });
    },
    []
  );

  const handleMobileLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileSubmenus({});
  }, []);

  const toggleMobileSubmenu = useCallback((label: string) => {
    setMobileSubmenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  // 키보드 네비게이션 처리
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setMobileSubmenus({});
      }
    },
    [isMobileMenuOpen]
  );

  // SSR 방지: 마운트되기 전에는 기본 헤더와 로딩 스켈레톤 표시
  if (!mounted || !isClient) {
    return (
      <header
        className="fixed top-0 w-full z-50 backdrop-blur-sm border-b"
        style={{
          backgroundColor: 'rgba(10, 25, 47, 0.9)',
          borderColor: 'rgba(212, 175, 55, 0.15)',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <span className="sr-only">FamilyOffice</span>
                <FamilyOfficeSTaglineBlackLogo
                  width={162}
                  height={32}
                  className="h-8 w-auto brightness-0 invert transition-transform hover:scale-105"
                  priority
                />
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0 space-x-3">
              <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse" />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300 border-b"
      style={{
        backgroundColor: isScrolled || isMobileMenuOpen ? 'rgba(10, 25, 47, 0.98)' : 'rgba(10, 25, 47, 0.88)',
        borderColor: 'rgba(212, 175, 55, 0.2)',
        backdropFilter: 'blur(12px)',
        boxShadow: isScrolled ? '0 2px 24px rgba(10, 25, 47, 0.35)' : 'none',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
      role="banner"
      aria-label="사이트 헤더"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="주 네비게이션"
      >
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-6">
          {/* 로고 */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              href="/"
              className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="FamilyOffice 홈페이지로 이동"
            >
              <span className="sr-only">FamilyOffice</span>
              <FamilyOfficeSTaglineBlackLogo
                width={162}
                height={32}
                className="h-8 w-auto brightness-0 invert transition-transform hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 - 랜드스케이프 모드에서도 표시 */}
          <div className="-mr-2 -my-2 lg:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyDown}
              className="mobile-touch-target inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              </span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
              )}
            </Button>
          </div>

          {/* 데스크톱 네비게이션 - 더 큰 화면에서만 표시 */}
          <nav
            className="hidden lg:flex space-x-6"
            role="navigation"
            aria-label="주 메뉴"
          >
            {NAVIGATION_ITEMS.filter(
              (item: NavigationItem) => !item.requireAuth || isSignedIn
            ).map((item: NavigationItem) => (
              <div key={item.href || item.label} className="relative group">
                {item.submenu && item.submenu.length > 0 ? (
                  <>
                    <button
                      className="text-base font-medium text-white/90 hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#0A192F] rounded-md px-1 py-1 flex items-center gap-1 h-9"
                      aria-label={`${item.label} 메뉴`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 text-white/70" />
                    </button>

                    {/* 서브메뉴 드롭다운 - CSS group hover 사용 */}
                    <div
                      className={`absolute top-full left-0 pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[60] ${
                        item.label === '솔루션' ? 'w-96' : 'w-80'
                      }`}
                    >
                      <div
                        className="backdrop-blur-md border rounded-lg shadow-xl"
                        style={{
                          backgroundColor: 'rgba(10, 25, 47, 0.96)',
                          borderColor: 'rgba(212, 175, 55, 0.2)',
                        }}
                      >
                        <div
                          className={`p-2 ${
                            item.label === '솔루션'
                              ? 'max-h-[70vh] overflow-y-auto'
                              : ''
                          }`}
                        >
                          {item.submenu.map((subItem: NavigationSubItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              target={subItem.isExternal ? '_blank' : undefined}
                              rel={
                                subItem.isExternal
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                              className="block p-3 rounded-md hover:bg-white/10 transition-colors group/submenu"
                              aria-label={
                                subItem.isExternal
                                  ? `${subItem.label} (새 창에서 열림)`
                                  : subItem.label
                              }
                            >
                              <div className="font-medium text-white group-hover/submenu:text-[#D4AF37] transition-colors">
                                {subItem.label}
                              </div>
                              {subItem.description && (
                                <div className="text-sm text-white/60 mt-1 group-hover/submenu:text-white/80 transition-colors">
                                  {subItem.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className={
                      item.isPrimary
                        ? 'inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                        : 'text-base font-medium text-white/90 hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#0A192F] rounded-md px-3 py-2 flex items-center h-9'
                    }
                    aria-label={
                      item.isExternal
                        ? `${item.label} (새 창에서 열림)`
                        : item.label
                    }
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* 데스크톱 우측 버튼들 */}
          <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0 space-x-3">
            {/* 구조 점검 요청 버튼 — Heritage Gold CTA */}
            <Link
              href="/structure-check#request-form"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#D4AF37', color: '#0A192F' }}
              aria-label="구조 점검 요청"
              title="구조 점검 요청"
            >
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">구조 점검</span>
            </Link>

            {/* 인증 관련 버튼 */}
            {isLoaded ? (
              isSignedIn ? (
                <SafeUserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'h-9 w-9',
                    },
                  }}
                />
              ) : (
                <SafeSignInButton mode="modal">
                  <button
                    className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ border: '1px solid rgba(212,175,55,0.4)', color: '#E5C158', backgroundColor: 'transparent' }}
                    aria-label="로그인"
                  >
                    로그인
                  </button>
                </SafeSignInButton>
              )
            ) : (
              <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse" />
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 - 랜드스케이프 모드에서도 표시 */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden backdrop-blur-sm border-t"
          style={{
            backgroundColor: 'rgba(10, 25, 47, 0.97)',
            borderColor: 'rgba(212, 175, 55, 0.2)',
          }}
          role="navigation"
          aria-label="모바일 메뉴"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 text-center">
            {NAVIGATION_ITEMS.filter(
              (item: NavigationItem) => !item.requireAuth || isSignedIn
            ).map((item: NavigationItem) => (
              <div key={item.href || item.label}>
                {item.submenu && item.submenu.length > 0 ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full flex items-center justify-center px-3 py-2 text-base font-medium text-white/90 hover:text-[#D4AF37] hover:bg-white/10 rounded-md transition-colors"
                      aria-expanded={mobileSubmenus[item.label] || false}
                      aria-label={`${item.label} 메뉴 ${mobileSubmenus[item.label] ? '접기' : '펼치기'}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 text-white/70 ${
                          mobileSubmenus[item.label] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileSubmenus[item.label] && (
                      <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {item.submenu.map((subItem: NavigationSubItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            target={subItem.isExternal ? '_blank' : undefined}
                            rel={
                              subItem.isExternal
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors text-center"
                            onClick={handleMobileLinkClick}
                            aria-label={
                              subItem.isExternal
                                ? `${subItem.label} (새 창에서 열림)`
                                : subItem.label
                            }
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="block px-3 py-2 text-base font-medium text-white/90 hover:text-[#D4AF37] hover:bg-white/10 rounded-md transition-colors text-center"
                    onClick={handleMobileLinkClick}
                    aria-label={
                      item.isExternal
                        ? `${item.label} (새 창에서 열림)`
                        : item.label
                    }
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* 모바일 버튼 및 설정 */}
            <div className="pt-4 border-t border-border space-y-4">
              {isLoaded && isSignedIn ? (
                // 로그인 상태: 대시보드 링크 + 구조 점검 요청 표시
                <>
                  <Link
                    href="/portal"
                    onClick={handleMobileLinkClick}
                    className="flex items-center justify-center w-full bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors duration-200"
                    aria-label="포털로 이동"
                  >
                    내 포털
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/structure-check#request-form"
                    onClick={handleMobileLinkClick}
                    className="flex items-center justify-center w-full bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors duration-200"
                    aria-label="구조 점검 요청"
                    title="구조 점검 요청"
                  >
                    <ClipboardCheck
                      className="h-5 w-5 mr-2"
                      aria-hidden="true"
                    />
                    구조 점검 요청
                  </Link>
                </>
              ) : (
                // 로그아웃 상태: 로그인 버튼 + 구조 점검 요청 표시
                <>
                  <SafeSignInButton mode="modal">
                    <button
                      className="flex items-center justify-center w-full border border-primary text-primary font-semibold rounded-lg px-4 py-3 hover:bg-primary hover:text-white transition-colors duration-200"
                      aria-label="로그인"
                    >
                      로그인
                    </button>
                  </SafeSignInButton>
                  <Link
                    href="/structure-check#request-form"
                    onClick={handleMobileLinkClick}
                    className="flex items-center justify-center w-full bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors duration-200"
                    aria-label="구조 점검 요청"
                    title="구조 점검 요청"
                  >
                    <ClipboardCheck
                      className="h-5 w-5 mr-2"
                      aria-hidden="true"
                    />
                    구조 점검 요청
                  </Link>
                </>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-base font-medium text-foreground">
                  테마 설정
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});
