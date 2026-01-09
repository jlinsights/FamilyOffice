import { render, screen, waitFor } from '@testing-library/react';

import { HeroSection } from '@/components/sections/hero-section';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('HeroSection', () => {
  it('renders hero section with correct content', () => {
    render(<HeroSection />);

    // 메인 제목 확인 (HERO_CONTENT에서 가져온 실제 텍스트)
    expect(screen.getByText(/百年永續/i)).toBeInTheDocument();
    expect(screen.getByText(/가문의 영원한 번영을 위한 약속/i)).toBeInTheDocument();

    // CTA 버튼 확인 (HERO_CONTENT.actions의 실제 텍스트)
    expect(screen.getByText(/상속세 3분 계산하기/i)).toBeInTheDocument();
    expect(screen.getByText(/전문가 상담 예약/i)).toBeInTheDocument();
    expect(screen.getByText(/서비스 솔루션 보기/i)).toBeInTheDocument();
  });

  it('displays animated counters', async () => {
    render(<HeroSection />);

    // 성과 지표 확인 (HeroStats 컴포넌트의 실제 AnimatedCounter 값)
    // 각 카운터의 애니메이션이 완료될 때까지 기다림
    // 지속 시간: 500억원+(1500ms), 500+(2000ms), 20년+(1500ms), 98%(1800ms)
    await waitFor(
      () => {
        expect(screen.getByText('500억원+')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText('500+')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText('20년+')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText('98%')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('has proper accessibility attributes', () => {
    render(<HeroSection />);

    // 버튼들이 접근 가능하고 활성화되어 있는지 확인
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(button => {
      expect(button).toBeEnabled();
      expect(button).toBeVisible();
    });
  });
});
