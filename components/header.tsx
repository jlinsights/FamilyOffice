"use client"

import { useState, useCallback, memo } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MinimalFamilyOfficeLogo } from "@/components/logo"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import type { NavigationItem } from "@/types/globals"
import type { MouseEventHandler } from "react"

interface HeaderProps {
  isScrolled?: boolean
}

export const Header = memo(function Header({ isScrolled = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault()
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleMobileLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
      isScrolled || isMobileMenuOpen
        ? 'bg-background/80 backdrop-blur-md border-border'
        : 'bg-transparent border-transparent'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          {/* 로고 */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link 
              href="/" 
              className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="홈페이지로 이동"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              <span className="sr-only">{isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-10" role="navigation" aria-label="주 네비게이션">
            {NAVIGATION_ITEMS.map((item: NavigationItem) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 데스크톱 우측 버튼들 */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <ThemeToggle />
            
            {/* 컨설팅 신청 버튼 */}
            <Button size="sm" asChild>
              <Link href="/contact">
                상담 신청
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
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
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8" role="navigation" aria-label="모바일 네비게이션">
                  {NAVIGATION_ITEMS.map((item: NavigationItem) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleMobileLinkClick}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <span className="ml-3 text-base font-medium text-foreground">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                
                {/* 모바일 컨설팅 신청 버튼 */}
                <Button size="sm" asChild onClick={handleMobileLinkClick}>
                  <Link href="/contact">
                    상담 신청
                    <ArrowRight className="ml-2 h-4 w-4" />
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