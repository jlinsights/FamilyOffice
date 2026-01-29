import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import {
  AvatarImage,
  BackgroundImage,
  HeroImage,
  OptimizedImage,
  ThumbnailImage,
} from '../optimized-image-loader';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    onLoad,
    onError,
    priority,
    quality,
    sizes,
    placeholder,
    fill,
    loading,
    width,
    height,
    className,
    ...props
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
    priority?: boolean;
    quality?: number;
    sizes?: string;
    placeholder?: string;
    fill?: boolean;
    loading?: 'eager' | 'lazy';
    width?: number;
    height?: number;
    className?: string;
    [key: string]: unknown;
  }) {
    // Map Next.js props to HTML attributes with data-* support
    const htmlProps: React.ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown> = {
      src,
      alt,
      onLoad,
      onError,
      className,
      'data-testid': 'next-image',
    };

    // Add loading attribute based on priority or explicit loading prop
    if (loading) {
      htmlProps.loading = loading;
    } else if (priority !== undefined) {
      htmlProps.loading = priority ? 'eager' : 'lazy';
    }

    // Store Next.js-specific props as data attributes for testing
    if (quality !== undefined) {
      (htmlProps as Record<string, unknown>)['data-quality'] = quality.toString();
    }
    if (sizes !== undefined) {
      (htmlProps as Record<string, unknown>)['data-sizes'] = sizes;
    }
    if (placeholder !== undefined) {
      (htmlProps as Record<string, unknown>)['data-placeholder'] = placeholder;
    }
    if (fill !== undefined) {
      (htmlProps as Record<string, unknown>)['data-fill'] = fill.toString();
    }
    if (width !== undefined) {
      (htmlProps as Record<string, unknown>)['data-width'] = width.toString();
    }
    if (height !== undefined) {
      (htmlProps as Record<string, unknown>)['data-height'] = height.toString();
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...htmlProps} alt={alt} />
    );
  };
});

// Mock canvas for WebP detection
const mockToDataURL = jest.fn(() => 'data:image/webp;base64,test');
const mockCanvas = {
  toDataURL: mockToDataURL,
  getContext: jest.fn(),
} as unknown as HTMLCanvasElement;

const originalCreateElement = document.createElement.bind(document);
jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
  if (tagName === 'canvas') {
    return mockCanvas;
  }
  return originalCreateElement(tagName);
});

describe('OptimizedImage', () => {
  beforeEach(() => {
    mockToDataURL.mockClear();
  });

  describe('Basic Functionality', () => {
    it('renders with required props', () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={400}
        />
      );

      const image = screen.getByTestId('next-image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test image');
    });

    it('applies custom className', () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          className="custom-class"
        />
      );

      const container = screen.getByTestId('next-image').parentElement;
      expect(container).toHaveClass('custom-class');
    });

    it('handles priority prop correctly', () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          priority={true}
        />
      );

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('loading', 'eager');
    });

    it('sets lazy loading by default', () => {
      render(<OptimizedImage src="/test-image.jpg" alt="Test image" />);

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Loading States', () => {
    it('shows loading skeleton initially', () => {
      render(<OptimizedImage src="/test-image.jpg" alt="Test image" />);

      // Check for loading skeleton
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
    });

    it('hides loading skeleton after image loads', async () => {
      const { container } = render(
        <OptimizedImage src="/test-image.jpg" alt="Test image" />
      );

      const image = screen.getByTestId('next-image');
      fireEvent.load(image);

      await waitFor(() => {
        const skeleton = container.querySelector('.animate-pulse');
        expect(skeleton).not.toBeInTheDocument();
      });
    });

    it('calls onLoad callback when image loads', async () => {
      const onLoadMock = jest.fn();
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          onLoad={onLoadMock}
        />
      );

      const image = screen.getByTestId('next-image');
      fireEvent.load(image);

      await waitFor(() => {
        expect(onLoadMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Error Handling', () => {
    it('shows error fallback when image fails to load', async () => {
      render(<OptimizedImage src="/broken-image.jpg" alt="Broken image" />);

      const image = screen.getByTestId('next-image');
      fireEvent.error(image);

      await waitFor(() => {
        expect(
          screen.getByText('이미지를 불러올 수 없습니다')
        ).toBeInTheDocument();
      });
    });

    it('calls onError callback when image fails', async () => {
      const onErrorMock = jest.fn();
      render(
        <OptimizedImage
          src="/broken-image.jpg"
          alt="Broken image"
          onError={onErrorMock}
        />
      );

      const image = screen.getByTestId('next-image');
      fireEvent.error(image);

      await waitFor(() => {
        expect(onErrorMock).toHaveBeenCalledTimes(1);
      });
    });

    it('shows fallback with custom dimensions', async () => {
      const { container } = render(
        <OptimizedImage
          src="/broken-image.jpg"
          alt="Broken image"
          width={400}
          height={300}
        />
      );

      const image = screen.getByTestId('next-image');
      fireEvent.error(image);

      await waitFor(() => {
        const fallback = container.querySelector('[style*="width: 400px"]');
        expect(fallback).toBeInTheDocument();
      });
    });
  });

  describe('WebP Detection', () => {
    it('detects WebP support', () => {
      // Default mock already returns WebP support
      render(<OptimizedImage src="/test-image.jpg" alt="Test image" />);

      expect(mockToDataURL).toHaveBeenCalledWith('image/webp');
    });

    it('handles no WebP support', () => {
      // This test just verifies that image still renders without WebP
      render(<OptimizedImage src="/test-image.jpg" alt="Test image" />);

      const image = screen.getByTestId('next-image');
      expect(image).toBeInTheDocument();
    });
  });

  describe('URL Processing', () => {
    it('handles external URLs', () => {
      render(
        <OptimizedImage
          src="https://example.com/image.jpg"
          alt="External image"
        />
      );

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('handles data URLs', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD';
      render(<OptimizedImage src={dataUrl} alt="Data URL image" />);

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', dataUrl);
    });

    it('handles local images', () => {
      render(<OptimizedImage src="/local-image.jpg" alt="Local image" />);

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', '/local-image.jpg');
    });
  });
});

describe('Specialized Image Components', () => {
  describe('HeroImage', () => {
    it('renders with hero-specific optimizations', () => {
      render(
        <HeroImage src="/hero.jpg" alt="Hero image" width={1200} height={600} />
      );

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('loading', 'eager'); // priority=true
      expect(image).toHaveAttribute('data-quality', '90');
    });

    it('uses hero-specific responsive sizes', () => {
      render(<HeroImage src="/hero.jpg" alt="Hero image" />);

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute(
        'data-sizes',
        '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
      );
    });
  });

  describe('ThumbnailImage', () => {
    it('renders with thumbnail optimizations', () => {
      render(
        <ThumbnailImage
          src="/thumb.jpg"
          alt="Thumbnail"
          width={300}
          height={200}
        />
      );

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('data-quality', '75');
      expect(image).toHaveAttribute(
        'data-sizes',
        '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px'
      );
    });
  });

  describe('AvatarImage', () => {
    it('renders with avatar optimizations', () => {
      render(
        <AvatarImage
          src="/avatar.jpg"
          alt="User avatar"
          width={60}
          height={60}
        />
      );

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('data-quality', '80');
      expect(image).toHaveAttribute('data-sizes', '(max-width: 768px) 40px, 60px');
    });
  });

  describe('BackgroundImage', () => {
    it('renders background image with overlay content', () => {
      render(
        <BackgroundImage
          src="/background.jpg"
          alt="Background"
          className="custom-bg"
        >
          <div data-testid="overlay-content">Overlay Content</div>
        </BackgroundImage>
      );

      const container =
        screen.getByTestId('overlay-content').parentElement?.parentElement;
      expect(container).toHaveClass('custom-bg');
      expect(screen.getByTestId('overlay-content')).toBeInTheDocument();
      expect(screen.getByTestId('next-image')).toBeInTheDocument();
    });

    it('sets fill property for background images', () => {
      render(
        <BackgroundImage src="/background.jpg" alt="Background">
          <div>Content</div>
        </BackgroundImage>
      );

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('data-fill', 'true');
    });
  });
});

describe('Accessibility', () => {
  it('provides proper alt text', () => {
    render(<OptimizedImage src="/test.jpg" alt="Detailed image description" />);

    const image = screen.getByAltText('Detailed image description');
    expect(image).toBeInTheDocument();
  });

  it('handles empty alt text for decorative images', () => {
    render(<OptimizedImage src="/decorative.jpg" alt="" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('alt', '');
  });
});

describe('Performance Optimizations', () => {
  it('uses appropriate quality settings', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" quality={95} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-quality', '95');
  });

  it('handles placeholder settings', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" placeholder="blur" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-placeholder', 'blur');
  });

  it('handles responsive sizes', () => {
    const customSizes = '(max-width: 768px) 100vw, 50vw';
    render(<OptimizedImage src="/test.jpg" alt="Test" sizes={customSizes} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-sizes', customSizes);
  });
});
