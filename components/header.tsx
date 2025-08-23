'use client';

import { Menu, X, ArrowRight, ChevronDown, Phone } from 'lucide-react';

import { useState, useCallback, memo, useEffect } from 'react';
import type { MouseEventHandler, KeyboardEvent } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

import { NAVIGATION_ITEMS } from '@/lib/constants';
import { PopupManager } from '@/components/popup/popup-manager';

import type { NavigationItem, NavigationSubItem } from '@/types/globals';

interface HeaderProps {
  isScrolled?: boolean;
}

export const Header = memo(function Header({
  isScrolled = false,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  const toggleMobileMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      setIsMobileMenuOpen(prev => !prev);
    },
    []
  );

  const handleMobileLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // 키보드 네비게이션 처리
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen]
  );

  // SSR 방지: 마운트되기 전에는 기본 헤더만 표시
  if (!mounted || !isClient) {
    return (
      <header 
        className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
        style={{ top: 'var(--announcement-height, 0px)' }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <span className="sr-only">Samsung Financial Networks</span>
                <Image
                  src="/SVG/samsung-financial-networks.svg"
                  alt="Samsung Financial Networks"
                  width={140}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-200 border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200 dark:border-gray-800'
          : 'bg-transparent border-transparent'
      }`}
      style={{ top: 'var(--announcement-height, 0px)' }}
      role="banner"
      aria-label="사이트 헤더"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="주 네비게이션"
      >
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          {/* 로고 */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              href="/"
              className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="Samsung Financial Networks 홈페이지로 이동"
            >
              <span className="sr-only">Samsung Financial Networks</span>
              <Image
                src="/SVG/samsung-financial-networks.svg"
                alt="Samsung Financial Networks"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
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
            className="hidden lg:flex space-x-10"
            role="navigation"
            aria-label="주 메뉴"
          >
            {NAVIGATION_ITEMS.map((item: NavigationItem) => (
              <div key={item.href} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 flex items-center gap-1 h-9"
                      aria-label={`${item.label} 메뉴`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* 서브메뉴 드롭다운 - CSS group hover 사용 */}
                    <div className="absolute top-full left-0 pt-2 w-80 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[60]">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                        <div className="p-2">
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
                    className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 flex items-center h-9"
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
          <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0 space-x-4">
            <Link
              href="http://pf.kakao.com/_gsxkxdG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/40 bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-all hover:scale-105"
              aria-label="카카오톡 채널 연결"
            >
              <Image
                src="/SVG/SimpleIconsKakao.svg"
                alt="Kakao"
                width={20}
                height={20}
                className="w-5 h-5 dark:invert"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              aria-label="상담 신청 페이지로 이동"
            >
              상담 신청
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 - 랜드스케이프 모드에서도 표시 */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800"
          role="navigation"
          aria-label="모바일 메뉴"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAVIGATION_ITEMS.map((item: NavigationItem) => (
              <div key={item.href}>
                {item.submenu ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1">
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
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
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
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
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
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
              <Link
                href="/contact"
                onClick={handleMobileLinkClick}
                className="flex items-center justify-center w-full bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors duration-200"
                aria-label="상담 신청"
              >
                상담 신청
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  고객지원
                </span>
                <Link
                  href="http://pf.kakao.com/_gsxkxdG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/40 bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-all hover:scale-105"
                  aria-label="카카오톡 채널 연결"
                >
                  <Image
                    src="/SVG/SimpleIconsKakao.svg"
                    alt="Kakao"
                    width={20}
                    height={20}
                    className="w-5 h-5 dark:invert"
                  />
                </Link>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  테마 설정
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sophisticated Dual-Popup System with AgentOS Optimization */}
      <PopupManager 
        enableDualPopup={true}
        maxConcurrentPopups={2}
        debugMode={process.env.NODE_ENV === 'development'}
      />
    </header>
  );
});
