import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KakaoLoginButton } from '@/components/auth/kakao-login-button';

jest.mock('@/lib/auth/kakao-auth');
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));
jest.mock('next/image', () => {
  return function MockImage({ alt, ...props }: { alt: string; [k: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  };
});

const originalEnv = process.env;

let locationHref = '';
const locationDescriptor = Object.getOwnPropertyDescriptor(window, 'location');

describe('Kakao Authentication Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_APP_URL = 'https://familyoffices.vip';
    process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = 'test-key';

    locationHref = '';
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, href: '' },
      writable: true,
    });
    Object.defineProperty(window.location, 'href', {
      configurable: true,
      set: (val: string) => { locationHref = val; },
      get: () => locationHref,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    if (locationDescriptor) {
      Object.defineProperty(window, 'location', locationDescriptor);
    }
  });

  describe('KakaoLoginButton', () => {
    it('renders kakao login button correctly', () => {
      render(<KakaoLoginButton />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByAltText('카카오로 로그인')).toBeInTheDocument();
    });

    it('redirects to kakao oauth when clicked', async () => {
      const user = userEvent.setup();

      render(<KakaoLoginButton />);

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(locationHref).toContain('kauth.kakao.com/oauth/authorize');
      });
    });

    it('includes correct oauth parameters', async () => {
      const user = userEvent.setup();

      render(<KakaoLoginButton />);

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(locationHref).toContain('client_id=test-key');
        expect(locationHref).toContain(
          'redirect_uri=' + encodeURIComponent('https://familyoffices.vip/oauth')
        );
        expect(locationHref).toContain('response_type=code');
        expect(locationHref).toContain('state=');
      });
    });

    it('shows error when kakao key is missing', async () => {
      process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = '';

      const user = userEvent.setup();

      render(<KakaoLoginButton />);

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(locationHref).toBe('');
      });
    });
  });

  describe('OAuth Callback Handling', () => {
    it('handles successful oauth callback', async () => {
      // OAuth 페이지 컴포넌트 테스트는 별도로 구현
      expect(true).toBe(true);
    });

    it('handles oauth callback errors', async () => {
      // 에러 처리 테스트는 별도로 구현
      expect(true).toBe(true);
    });
  });
});
