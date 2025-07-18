import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/sections/hero-section'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('HeroSection', () => {
  it('renders hero section with correct content', () => {
    render(<HeroSection />)
    
    // 메인 제목 확인
    expect(screen.getByText(/백년영속의 시작/i)).toBeInTheDocument()
    expect(screen.getByText(/기업의 가치를 다음 세대로/i)).toBeInTheDocument()
    
    // CTA 버튼 확인
    expect(screen.getByText(/가업승계 컨설팅 신청/i)).toBeInTheDocument()
    expect(screen.getByText(/무료 상담 신청/i)).toBeInTheDocument()
  })

  it('displays animated counters', () => {
    render(<HeroSection />)
    
    // 성과 지표 확인
    expect(screen.getByText('10년+')).toBeInTheDocument()
    expect(screen.getByText('1,500+')).toBeInTheDocument()
    expect(screen.getByText('60+')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<HeroSection />)
    
    // 버튼들이 접근 가능한지 확인
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
    })
  })
}) 