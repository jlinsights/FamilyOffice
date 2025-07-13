"use client"

import { useState, useCallback, memo } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MinimalFamilyOfficeLogo } from "@/components/logo"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { 
  SignInButton, 
  SignUpButton, 
  SignedIn, 
  SignedOut, 
  UserButton, 
  useUser 
} from "@clerk/nextjs"
import type { NavigationItem } from "@/types/globals"
import type { MouseEventHandler } from "react"

// Clerk 환경변수 확인
const isClerkEnabled = !!(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

// 현대적인 네비게이션 링크 컴포넌트
const NavigationLink = memo(({ 
  href, 
  children, 
  onClick,
  className = "",
  style
}: {
  href: string
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
  className?: string
  style?: React.CSSProperties
}) => {
  const isExternal = href.startsWith('http')
  
  return (
    <Link 
      href={href} 
      className={`nav-link ${className}`}
      style={style}
      {...(onClick ? { onClick } : {})}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  )
})

NavigationLink.displayName = "NavigationLink"

// Clerk 인증 버튼 컴포넌트 - 안전한 버전
const ClerkAuthButtons = memo(() => {
  if (!isClerkEnabled) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="btn-auth-login text-sm font-medium">
          로그인
        </Button>
        <Button size="sm" className="btn-auth-signup-outline text-sm font-medium">
          회원가입
        </Button>
      </div>
    )
  }

  return (
    <>
      <SignedOut>
        <div className="flex items-center space-x-2">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="btn-auth-login text-sm font-medium">
              로그인
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm" className="btn-auth-signup-outline text-sm font-medium">
              회원가입
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <SignedInContent />
      </SignedIn>
    </>
  )
})

// SignedIn 내부에서만 useUser 사용
const SignedInContent = memo(() => {
  const { user } = useUser()
  const isAdminUser = user?.emailAddresses?.some(
    (email: { emailAddress: string }) => email.emailAddress === "jhlim725@gmail.com"
  ) || false

  return (
    <div className="flex items-center space-x-2">
      {/* 관리자 전용 설정 버튼 */}
      {isAdminUser && (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
      )}
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "h-8 w-8 border-2 border-border hover:border-primary transition-all duration-200 hover:scale-105",
            userButtonPopoverCard: "bg-card border border-border shadow-lg rounded-lg",
            userButtonPopoverActionButton: "hover:bg-accent transition-colors duration-200",
            userButtonPopoverActionButtonText: "text-foreground",
            userButtonPopoverFooter: "hidden"
          }
        }}
      />
    </div>
  )
})

ClerkAuthButtons.displayName = "ClerkAuthButtons"
SignedInContent.displayName = "SignedInContent"

// 모바일 Clerk 인증 버튼 컴포넌트
const MobileClerkAuthButtons = memo(({ closeMenu }: { closeMenu: () => void }) => {
  if (!isClerkEnabled) {
    return null
  }
  return (
    <>
      <SignedOut>
        <div className="px-4 py-2 border-t border-border">
          <div className="space-y-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="btn-auth-login w-full">
                로그인
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="btn-auth-signup-outline w-full">
                회원가입
              </Button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="px-4 py-2 border-t border-border">
          <div className="flex items-center justify-between">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 border-2 border-border hover:border-primary transition-all duration-200 hover:scale-105",
                  userButtonPopoverCard: "bg-card border border-border shadow-lg rounded-lg",
                  userButtonPopoverActionButton: "hover:bg-accent transition-colors duration-200",
                  userButtonPopoverActionButtonText: "text-foreground",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
            <Button 
              size="sm" 
              asChild 
              className="btn-consultation !text-white"
              style={{ 
                backgroundColor: 'hsl(var(--primary)) !important',
                borderColor: 'hsl(var(--primary)) !important',
                color: '#ffffff !important'
              }}
            >
              <Link 
                href="/contact" 
                onClick={closeMenu} 
                className="text-white !text-white force-white" 
                style={{ 
                  color: '#ffffff !important',
                  textDecoration: 'none !important'
                }}
              >
                <span 
                  className="!text-white force-white" 
                  style={{ 
                    color: '#ffffff !important',
                    fontWeight: '600 !important'
                  }}
                >
                  상담 신청
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </SignedIn>
    </>
  )
})

MobileClerkAuthButtons.displayName = "MobileClerkAuthButtons"

export const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container flex h-16 items-center justify-between">
        {/* 로고 섹션 */}
        <Link href="/" className="transition-transform hover:scale-105">
          <MinimalFamilyOfficeLogo size="default" />
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAVIGATION_ITEMS.map(({ href, label }: NavigationItem) => (
            <NavigationLink key={href} href={href}>
              {label}
            </NavigationLink>
          ))}
        </nav>

        {/* 액션 버튼들 */}
        <div className="flex items-center space-x-3">
          {/* 데스크톱 - 인증 및 액션 버튼들 */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Clerk 인증 버튼들 */}
            {isClerkEnabled ? (
              <ClerkAuthButtons />
            ) : null}
            
            {/* 상담 신청 버튼 - 강화된 가시성 */}
            <Button 
              size="sm" 
              asChild 
              className="btn-consultation group !text-white"
              style={{ 
                backgroundColor: 'hsl(var(--primary)) !important',
                borderColor: 'hsl(var(--primary)) !important',
                color: '#ffffff !important'
              }}
            >
              <Link 
                href="/contact" 
                className="flex items-center text-white !text-white force-white" 
                style={{ 
                  color: '#ffffff !important',
                  textDecoration: 'none !important'
                }}
              >
                <span 
                  className="!text-white force-white" 
                  style={{ 
                    color: '#ffffff !important',
                    fontWeight: '600 !important'
                  }}
                >
                  상담 신청
                </span>
                <ArrowRight 
                  className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 !text-white" 
                  style={{ 
                    color: '#ffffff !important',
                    fill: '#ffffff !important',
                    stroke: '#ffffff !important'
                  }} 
                />
              </Link>
            </Button>
          </div>

          {/* 테마 토글 */}
          <ThemeToggle />

          {/* 모바일 메뉴 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden relative"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <div className="relative h-5 w-5">
              <Menu 
                className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`} 
              />
              <X 
                className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`} 
              />
            </div>
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div 
        className={`md:hidden border-b border-border transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="px-4 py-2 space-y-1">
          {NAVIGATION_ITEMS.map(({ href, label }: NavigationItem, index) => (
            <NavigationLink 
              key={href} 
              href={href} 
              onClick={closeMenu}
              className="block py-2 border-b border-border/50 last:border-0"
              style={{
                animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {label}
            </NavigationLink>
          ))}
        </nav>
        
        {/* 모바일 인증 및 액션 버튼들 */}
        {isClerkEnabled ? (
          <MobileClerkAuthButtons closeMenu={closeMenu} />
        ) : null}
        
        {/* 로그인하지 않은 사용자를 위한 상담 신청 버튼 (SignedOut일 때만) */}
        {isClerkEnabled ? (
          null
        ) : (
          <div className="px-4 py-2 border-t border-border">
            <Button 
              size="sm" 
              asChild 
              className="btn-consultation w-full !text-white"
              style={{ 
                backgroundColor: 'hsl(var(--primary)) !important',
                borderColor: 'hsl(var(--primary)) !important',
                color: '#ffffff !important'
              }}
            >
              <Link 
                href="/contact" 
                onClick={closeMenu} 
                className="text-white !text-white force-white" 
                style={{ 
                  color: '#ffffff !important',
                  textDecoration: 'none !important'
                }}
              >
                <span 
                  className="!text-white force-white" 
                  style={{ 
                    color: '#ffffff !important',
                    fontWeight: '600 !important'
                  }}
                >
                  상담 신청
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
})
