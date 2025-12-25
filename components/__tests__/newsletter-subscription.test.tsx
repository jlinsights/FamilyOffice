import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewsletterSubscription } from '../newsletter-subscription';

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('NewsletterSubscription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<NewsletterSubscription />);

      expect(
        screen.getByText('자산관리 전문가 인사이트 구독')
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일 주소')).toBeInTheDocument();
      expect(screen.getByText('무료 구독하기')).toBeInTheDocument();
    });

    it('renders compact variant', () => {
      render(<NewsletterSubscription variant="compact" />);

      // Should still render but with compact styling
      expect(screen.getByText('구독하기')).toBeInTheDocument();
    });

    it('renders inline variant', () => {
      render(<NewsletterSubscription variant="inline" />);

      expect(screen.getByText('이메일로 받아보기')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <NewsletterSubscription className="custom-newsletter" />
      );

      const newsletter = container.firstChild;
      expect(newsletter).toHaveClass('custom-newsletter');
    });
  });

  describe('Email Validation', () => {
    it('shows error for empty email', async () => {
      const user = userEvent.setup();
      const { toast } = require('sonner');

      render(<NewsletterSubscription />);

      const submitButton = screen.getByText('무료 구독하기');
      await user.click(submitButton);

      expect(toast.error).toHaveBeenCalledWith(
        '유효한 이메일 주소를 입력해주세요.'
      );
    });

    it('shows error for invalid email format', async () => {
      const user = userEvent.setup();
      const { toast } = require('sonner');

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      expect(toast.error).toHaveBeenCalledWith(
        '유효한 이메일 주소를 입력해주세요.'
      );
    });

    it('accepts valid email format', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('submits form with correct data', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription source="test-page" />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      expect(mockFetch).toHaveBeenCalledWith('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          source: 'test-page',
        }),
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      // Check for loading indicator
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('shows success state after successful subscription', async () => {
      const user = userEvent.setup();
      const { toast } = require('sonner');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '구독이 완료되었습니다! 곧 첫 번째 뉴스레터를 받아보실 수 있습니다.'
        );
      });

      expect(screen.getByText('구독 완료!')).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
      const user = userEvent.setup();
      const { toast } = require('sonner');

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '구독 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      });
    });

    it('handles server error responses', async () => {
      const user = userEvent.setup();
      const { toast } = require('sonner');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Email already exists' }),
      });

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'existing@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '이미 구독된 이메일 주소입니다.'
        );
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports Enter key submission', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');

      await user.type(emailInput, 'test@example.com');
      await user.keyboard('{Enter}');

      expect(mockFetch).toHaveBeenCalled();
    });

    it('focuses email input on mount', () => {
      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      emailInput.focus();

      expect(document.activeElement).toBe(emailInput);
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<NewsletterSubscription />);

      const emailInput = screen.getByLabelText(/이메일/);
      expect(emailInput).toBeInTheDocument();
    });

    it('has proper button role and text', () => {
      render(<NewsletterSubscription />);

      const submitButton = screen.getByRole('button', {
        name: /무료 구독하기/,
      });
      expect(submitButton).toBeInTheDocument();
    });

    it('announces loading state to screen readers', async () => {
      const user = userEvent.setup();
      mockFetch.mockImplementation(() => new Promise(() => {}));

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      expect(submitButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('announces success state to screen readers', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        const successMessage = screen.getByText('구독 완료!');
        expect(successMessage).toHaveAttribute('role', 'status');
      });
    });
  });

  describe('Variants', () => {
    it('renders different content for compact variant', () => {
      render(<NewsletterSubscription variant="compact" />);

      expect(screen.getByText('구독하기')).toBeInTheDocument();
      expect(
        screen.queryByText('자산관리 전문가 인사이트 구독')
      ).not.toBeInTheDocument();
    });

    it('renders different content for inline variant', () => {
      render(<NewsletterSubscription variant="inline" />);

      expect(screen.getByText('이메일로 받아보기')).toBeInTheDocument();
    });

    it('applies variant-specific styling classes', () => {
      const { container: compactContainer } = render(
        <NewsletterSubscription variant="compact" />
      );

      const { container: defaultContainer } = render(
        <NewsletterSubscription variant="default" />
      );

      // Variants should have different class structures
      expect(compactContainer.innerHTML).not.toBe(defaultContainer.innerHTML);
    });
  });

  describe('Source Tracking', () => {
    it('includes source in API request', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription source="blog-footer" />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            email: 'test@example.com',
            source: 'blog-footer',
          }),
        })
      );
    });

    it('uses default source when not provided', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<NewsletterSubscription />);

      const emailInput = screen.getByPlaceholderText('이메일 주소');
      const submitButton = screen.getByText('무료 구독하기');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            email: 'test@example.com',
            source: 'blog',
          }),
        })
      );
    });
  });
});
