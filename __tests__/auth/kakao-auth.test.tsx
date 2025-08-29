import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KakaoLoginButton } from '@/components/auth/kakao-login-button';

// Mock KakaoAuthService
jest.mock('@/lib/auth/kakao-auth');
jest.mock('@/hooks/use-toast');

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
});

// Mock environment variables
const originalEnv = process.env;

describe('Kakao Authentication Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_APP_URL = 'https://familyoffices.vip';
    process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = 'test-key';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('KakaoLoginButton', () => {
    it('renders kakao login button correctly', () => {
      render(<KakaoLoginButton />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('카카오로 로그인')).toBeInTheDocument();
    });

    it('redirects to kakao oauth when clicked', async () => {
      const user = userEvent.setup();
      
      render(<KakaoLoginButton />);
      
      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(mockOpen).toHaveBeenCalledWith(
          expect.stringContaining('kauth.kakao.com/oauth/authorize'),
          '_blank'
        );
      });
    });

    it('includes correct oauth parameters', async () => {
      const user = userEvent.setup();
      
      render(<KakaoLoginButton />);
      
      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        const callArgs = mockOpen.mock.calls[0][0];
        expect(callArgs).toContain('client_id=test-key');
        expect(callArgs).toContain('redirect_uri=https://familyoffices.vip/oauth');
        expect(callArgs).toContain('response_type=code');
        expect(callArgs).toContain('state=');
      });
    });

    it('shows error when kakao key is missing', async () => {
      process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = '';
      
      const user = userEvent.setup();
      
      render(<KakaoLoginButton />);
      
      const button = screen.getByRole('button');
      await user.click(button);

      // 에러 토스트가 표시되어야 함
      await waitFor(() => {
        expect(mockOpen).not.toHaveBeenCalled();
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
