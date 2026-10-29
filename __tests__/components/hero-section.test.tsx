import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero-section';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('@/components/ui/animation/FadeIn', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/ui/animation/TextReveal', () => ({
  TextReveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/calendar/cal-com-popup', () => ({
  CalComPopup: ({ buttonText }: { buttonText: string }) => (
    <button>{buttonText}</button>
  ),
}));

describe('HeroSection', () => {
  it('renders hero section with correct content', () => {
    render(<HeroSection />);

    expect(screen.getByText('百年')).toBeInTheDocument();
    expect(screen.getByText('永續')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<HeroSection />);

    expect(screen.getByText('상담 신청하기')).toBeInTheDocument();
    expect(screen.getByText('멤버십 안내')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<HeroSection />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(button => {
      expect(button).toBeEnabled();
      expect(button).toBeVisible();
    });
  });
});
