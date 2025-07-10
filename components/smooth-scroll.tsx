"use client"

import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    // 스무스 스크롤링 설정
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const id = target.getAttribute('href')?.substring(1)
        if (id) {
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  return null
}

interface ScrollToSectionProps {
  targetId: string
  children: React.ReactNode
  className?: string
}

export function ScrollToSection({ targetId, children, className = "" }: ScrollToSectionProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
} 