'use client';

import { ArrowRight, ChevronDown, ClipboardCheck, Menu, X } from 'lucide-react';

import type { KeyboardEvent, MouseEventHandler } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

import { SamsungFinancialNetworksLogo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

import { NAVIGATION_ITEMS } from '@/lib/constants';

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
  const { isSignedIn, isLoaded } = useAuth();

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
        className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-border"
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <span className="sr-only">Samsung Financial Networks</span>
                <SamsungFinancialNetworksLogo
                  width={140}
                  height={32}
                  className="h-8 w-auto transition-transform hover:scale-105"
                  priority
                />
              </Link>
            </div>
            {/* 데스크톱 우측 버튼들 - 초기 렌더링 시 로딩 스켈레톤 표시 */}
            <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0 space-x-3">
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 dark:bg-background/95 backdrop-blur-md border-gray-200 dark:border-border shadow-sm'
          : 'bg-white/80 dark:bg-background/80 backdrop-blur-sm border-transparent'
      }`}
      style={{
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
              aria-label="Samsung Financial Networks 홈페이지로 이동"
            >
              <span className="sr-only">Samsung Financial Networks</span>
              <SamsungFinancialNetworksLogo
                width={140}
                height={32}
                className="h-8 w-auto transition-transform hover:scale-105"
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
                      className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1 py-1 flex items-center gap-1 h-9"
                      aria-label={`${item.label} 메뉴`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* 서브메뉴 드롭다운 - CSS group hover 사용 */}
                    <div
                      className={`absolute top-full left-0 pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[60] ${
                        item.label === '솔루션' ? 'w-96' : 'w-80'
                      }`}
                    >
                      <div className="bg-background/70 dark:bg-gray-900/70 backdrop-blur-md border border-border rounded-lg shadow-xl">
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
                              className="block p-3 rounded-md hover:bg-accent transition-colors group/submenu"
                              aria-label={
                                subItem.isExternal
                                  ? `${subItem.label} (새 창에서 열림)`
                                  : subItem.label
                              }
                            >
                              <div className="font-medium text-foreground group-hover/submenu:text-primary transition-colors">
                                {subItem.label}
                              </div>
                              {subItem.description && (
                                <div className="text-sm text-muted-foreground mt-1 group-hover/submenu:text-muted-foreground/80 transition-colors">
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
                    className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2 flex items-center h-9"
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
            {isLoaded ? (
              isSignedIn ? (
                // 로그인 상태: 구조 점검 요청 + Clerk UserButton 표시
                <>
                  <Link
                    href="/structure-check#request-form"
                    className="inline-flex items-center justify-center p-2 border border-transparent rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    aria-label="구조 점검 요청"
                    title="구조 점검 요청"
                  >
                    <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'h-9 w-9',
                      },
                    }}
                  />
                </>
              ) : (
                // 로그아웃 상태: 로그인 버튼 + 구조 점검 요청 표시
                <>
                  <SignInButton mode="modal">
                    <button
                      className="inline-flex items-center justify-center px-3 py-1.5 border border-border text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                      aria-label="로그인"
                    >
                      로그인
                    </button>
                  </SignInButton>
                  <Link
                    href="/structure-check#request-form"
                    className="inline-flex items-center justify-center p-2 border border-transparent rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    aria-label="구조 점검 요청"
                    title="구조 점검 요청"
                  >
                    <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </>
              )
            ) : (
              // 로딩 중: 스켈레톤 표시
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 - 랜드스케이프 모드에서도 표시 */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-background/95 backdrop-blur-sm border-t border-border"
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
                      className="w-full flex items-center justify-center px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                      aria-expanded={mobileSubmenus[item.label] || false}
                      aria-label={`${item.label} 메뉴 ${mobileSubmenus[item.label] ? '접기' : '펼치기'}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
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
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors text-center"
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
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors text-center"
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
                    href="/dashboard"
                    onClick={handleMobileLinkClick}
                    className="flex items-center justify-center w-full bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors duration-200"
                    aria-label="대시보드로 이동"
                  >
                    내 대시보드
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
                  <SignInButton mode="modal">
                    <button
                      className="flex items-center justify-center w-full border border-primary text-primary font-semibold rounded-lg px-4 py-3 hover:bg-primary hover:text-white transition-colors duration-200"
                      aria-label="로그인"
                    >
                      로그인
                    </button>
                  </SignInButton>
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
