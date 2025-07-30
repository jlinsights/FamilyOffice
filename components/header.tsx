"use client"

import { useState, useCallback, memo } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// ThemeToggle 임시 비활성화 - hydration 이슈 해결을 위해
import { MinimalFamilyOfficeLogo } from "@/components/logo"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { ClientOnlyIcon } from "@/components/ui/client-only-icon"
import type { NavigationItem, NavigationSubItem } from "@/types/globals"
import type { MouseEventHandler, KeyboardEvent } from "react"

interface HeaderProps {
  isScrolled?: boolean
}

export const Header = memo(function Header({ isScrolled = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  const toggleMobileMenu: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault()
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleMobileLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // 키보드 네비게이션 처리
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobileMenuOpen])

  const handleMenuHover = useCallback((label: string) => {
    setHoveredMenu(label)
  }, [])

  const handleMenuLeave = useCallback(() => {
    setHoveredMenu(null)
  }, [])

  const consultationText = "무료 상담 신청"

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/80 backdrop-blur-md border-border'
          : 'bg-transparent border-transparent'
      }`}
      role="banner"
      aria-label="사이트 헤더"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" role="navigation" aria-label="주 네비게이션">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          {/* 로고 */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link 
              href="/" 
              className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="FamilyOffice S 홈페이지로 이동"
            >
              <span className="sr-only">FamilyOffice S</span>
              <MinimalFamilyOfficeLogo className="h-10 w-auto" />
            </Link>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyDown}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
              <ClientOnlyIcon 
                icon={isMobileMenuOpen ? X : Menu} 
                className="h-6 w-6" 
                aria-hidden="true" 
              />
            </Button>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-10" role="navigation" aria-label="주 메뉴">
            {NAVIGATION_ITEMS.map((item: NavigationItem) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.submenu && handleMenuHover(item.label)}
                onMouseLeave={() => item.submenu && handleMenuLeave()}
              >
                {item.submenu ? (
                  <>
                    <button
                      className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 flex items-center gap-1 h-9"
                      aria-label={`${item.label} 메뉴`}
                      aria-expanded={hoveredMenu === item.label}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {/* 서브메뉴 드롭다운 - 마우스 이동 경로를 위한 패딩 추가 */}
                    {hoveredMenu === item.label && (
                      <div 
                        className="absolute top-full left-0 pt-2 w-80 z-50"
                        onMouseEnter={() => handleMenuHover(item.label)}
                        onMouseLeave={handleMenuLeave}
                      >
                        <div className="bg-background border border-border rounded-lg shadow-lg">
                          <div className="p-2">
                            {item.submenu.map((subItem: NavigationSubItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                target={subItem.isExternal ? "_blank" : undefined}
                                rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                                className="block p-3 rounded-md hover:bg-accent transition-colors group"
                                aria-label={subItem.isExternal ? `${subItem.label} (새 창에서 열림)` : subItem.label}
                              >
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {subItem.label}
                                </div>
                                {subItem.description && (
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 flex items-center h-9"
                    aria-label={item.isExternal ? `${item.label} (새 창에서 열림)` : item.label}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* 데스크톱 우측 버튼들 */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            {/* <ThemeToggle /> 임시 비활성화 */}
            
            {/* 컨설팅 신청 버튼 */}
            <Button size="sm" asChild>
              <Link 
                href="/contact"
                aria-label="무료 상담 신청 페이지로 이동"
              >
                {consultationText}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-background divide-y-2 divide-border">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <MinimalFamilyOfficeLogo className="h-8 w-auto" />
                </div>
                <div className="-mr-2">
                  <Button
                    variant="ghost"
                    onClick={toggleMobileMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    aria-label="메뉴 닫기"
                  >
                    <span className="sr-only">메뉴 닫기</span>
                    <ClientOnlyIcon icon={X} className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-2" role="navigation" aria-label="모바일 메뉴">
                  {NAVIGATION_ITEMS.map((item: NavigationItem) => (
                    <div key={item.href}>
                      {item.submenu ? (
                        <div className="space-y-2">
                          <div className="p-3 text-base font-medium text-foreground border-b border-border">
                            {item.label}
                          </div>
                          <div className="pl-4 space-y-1">
                            {item.submenu.map((subItem: NavigationSubItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                target={subItem.isExternal ? "_blank" : undefined}
                                rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                                onClick={handleMobileLinkClick}
                                className="block p-3 rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                aria-label={subItem.isExternal ? `${subItem.label} (새 창에서 열림)` : subItem.label}
                              >
                                <div className="text-sm font-medium text-foreground">
                                  {subItem.label}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          target={item.isExternal ? "_blank" : undefined}
                          rel={item.isExternal ? "noopener noreferrer" : undefined}
                          onClick={handleMobileLinkClick}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          aria-label={item.isExternal ? `${item.label} (새 창에서 열림)` : item.label}
                        >
                          <span className="ml-3 text-base font-medium text-foreground">
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* <ThemeToggle /> 임시 비활성화 */}
                </div>
                
                {/* 모바일 컨설팅 신청 버튼 */}
                <Button size="sm" asChild onClick={handleMobileLinkClick}>
                  <Link 
                    href="/contact"
                    aria-label="무료 상담 신청 페이지로 이동"
                  >
                    {consultationText}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
})