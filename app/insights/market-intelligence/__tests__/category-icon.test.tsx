import { render, screen } from '@testing-library/react';
import CategoryIcon from '../category-icon';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Target: (props: { className?: string }) => (
    <svg data-testid="target-icon" className={props.className}>Target</svg>
  ),
  BarChart3: (props: { className?: string }) => (
    <svg data-testid="barchart3-icon" className={props.className}>BarChart3</svg>
  ),
  TrendingUp: (props: { className?: string }) => (
    <svg data-testid="trendingup-icon" className={props.className}>TrendingUp</svg>
  ),
  FileText: (props: { className?: string }) => (
    <svg data-testid="filetext-icon" className={props.className}>FileText</svg>
  ),
  Users: (props: { className?: string }) => (
    <svg data-testid="users-icon" className={props.className}>Users</svg>
  ),
  Cpu: (props: { className?: string }) => (
    <svg data-testid="cpu-icon" className={props.className}>Cpu</svg>
  ),
  Building: (props: { className?: string }) => (
    <svg data-testid="building-icon" className={props.className}>Building</svg>
  ),
  Scale: (props: { className?: string }) => (
    <svg data-testid="scale-icon" className={props.className}>Scale</svg>
  ),
  Globe: (props: { className?: string }) => (
    <svg data-testid="globe-icon" className={props.className}>Globe</svg>
  ),
  Briefcase: (props: { className?: string }) => (
    <svg data-testid="briefcase-icon" className={props.className}>Briefcase</svg>
  ),
  Play: (props: { className?: string }) => (
    <svg data-testid="play-icon" className={props.className}>Play</svg>
  ),
  Headphones: (props: { className?: string }) => (
    <svg data-testid="headphones-icon" className={props.className}>Headphones</svg>
  ),
}));

describe('CategoryIcon', () => {
  describe('Icon Rendering', () => {
    const supportedIcons = [
      { name: 'Target', testId: 'target-icon' },
      { name: 'BarChart3', testId: 'barchart3-icon' },
      { name: 'TrendingUp', testId: 'trendingup-icon' },
      { name: 'FileText', testId: 'filetext-icon' },
      { name: 'Users', testId: 'users-icon' },
      { name: 'Cpu', testId: 'cpu-icon' },
      { name: 'Building', testId: 'building-icon' },
      { name: 'Scale', testId: 'scale-icon' },
      { name: 'Globe', testId: 'globe-icon' },
      { name: 'Briefcase', testId: 'briefcase-icon' },
      { name: 'Play', testId: 'play-icon' },
      { name: 'Headphones', testId: 'headphones-icon' },
    ];

    supportedIcons.forEach(({ name, testId }) => {
      it(`renders ${name} icon correctly`, () => {
        render(<CategoryIcon iconName={name} />);
        
        const icon = screen.getByTestId(testId);
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('h-5 w-5 text-primary');
      });
    });

    it('renders all blog category icons', () => {
      const blogCategoryIcons = [
        'Target', 'BarChart3', 'TrendingUp', 'FileText', 
        'Users', 'Cpu', 'Building', 'Scale', 'Globe', 'Briefcase'
      ];

      blogCategoryIcons.forEach(iconName => {
        const { unmount } = render(<CategoryIcon iconName={iconName} />);
        
        const iconElement = screen.getByTestId(`${iconName.toLowerCase()}-icon`);
        expect(iconElement).toBeInTheDocument();
        
        unmount();
      });
    });

    it('renders media control icons', () => {
      const mediaIcons = ['Play', 'Headphones'];

      mediaIcons.forEach(iconName => {
        const { unmount } = render(<CategoryIcon iconName={iconName} />);
        
        const iconElement = screen.getByTestId(`${iconName.toLowerCase()}-icon`);
        expect(iconElement).toBeInTheDocument();
        
        unmount();
      });
    });
  });

  describe('Fallback Behavior', () => {
    it('renders fallback div for unknown icon name', () => {
      const { container } = render(<CategoryIcon iconName="UnknownIcon" />);
      
      // Should render a div with the default className
      const fallbackDiv = container.querySelector('.h-5.w-5.text-primary');
      expect(fallbackDiv).toBeInTheDocument();
      expect(fallbackDiv?.tagName).toBe('DIV');
    });

    it('renders fallback div for empty icon name', () => {
      const { container } = render(<CategoryIcon iconName="" />);
      
      const fallbackDiv = container.querySelector('.h-5.w-5.text-primary');
      expect(fallbackDiv).toBeInTheDocument();
      expect(fallbackDiv?.tagName).toBe('DIV');
    });

    it('renders fallback div for null icon name', () => {
      const { container } = render(<CategoryIcon iconName={null as any} />);
      
      const fallbackDiv = container.querySelector('.h-5.w-5.text-primary');
      expect(fallbackDiv).toBeInTheDocument();
      expect(fallbackDiv?.tagName).toBe('DIV');
    });

    it('renders fallback div for undefined icon name', () => {
      const { container } = render(<CategoryIcon iconName={undefined as any} />);
      
      const fallbackDiv = container.querySelector('.h-5.w-5.text-primary');
      expect(fallbackDiv).toBeInTheDocument();
      expect(fallbackDiv?.tagName).toBe('DIV');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<CategoryIcon iconName="Target" className="h-6 w-6 text-blue-500" />);
      
      const icon = screen.getByTestId('target-icon');
      expect(icon).toHaveClass('h-6 w-6 text-blue-500');
    });

    it('applies custom className to different icons', () => {
      const customClass = 'h-8 w-8 text-red-600';
      
      render(<CategoryIcon iconName="BarChart3" className={customClass} />);
      
      const icon = screen.getByTestId('barchart3-icon');
      expect(icon).toHaveClass('h-8 w-8 text-red-600');
    });

    it('uses default className when not provided', () => {
      render(<CategoryIcon iconName="FileText" />);
      
      const icon = screen.getByTestId('filetext-icon');
      expect(icon).toHaveClass('h-5 w-5 text-primary');
    });

    it('applies custom className to fallback div', () => {
      const { container } = render(
        <CategoryIcon iconName="UnknownIcon" className="h-10 w-10 text-gray-400" />
      );
      
      const fallbackDiv = container.querySelector('.h-10.w-10.text-gray-400');
      expect(fallbackDiv).toBeInTheDocument();
    });
  });

  describe('Case Sensitivity', () => {
    it('handles exact case matches', () => {
      render(<CategoryIcon iconName="Target" />);
      expect(screen.getByTestId('target-icon')).toBeInTheDocument();
    });

    it('does not match different cases', () => {
      const { container } = render(<CategoryIcon iconName="target" />);
      
      // Should render fallback since 'target' !== 'Target'
      const fallbackDiv = container.querySelector('.h-5.w-5.text-primary');
      expect(fallbackDiv).toBeInTheDocument();
      expect(fallbackDiv?.tagName).toBe('DIV');
    });

    it('does not match mixed cases', () => {
      const { container } = render(<CategoryIcon iconName="tARGET" />);
      
      const fallbackDiv = container.querySelector('.h-5.w-5.text-primary');
      expect(fallbackDiv).toBeInTheDocument();
      expect(fallbackDiv?.tagName).toBe('DIV');
    });
  });

  describe('Performance and Lazy Loading', () => {
    it('renders icons without delay', () => {
      const startTime = performance.now();
      
      render(<CategoryIcon iconName="Globe" />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render very quickly (under 50ms)
      expect(renderTime).toBeLessThan(50);
      expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
    });

    it('handles multiple icons efficiently', () => {
      const icons = ['Target', 'BarChart3', 'TrendingUp', 'FileText', 'Users'];
      
      const { container } = render(
        <div>
          {icons.map((iconName, index) => (
            <CategoryIcon key={index} iconName={iconName} />
          ))}
        </div>
      );
      
      // All icons should render
      icons.forEach(iconName => {
        const icon = screen.getByTestId(`${iconName.toLowerCase()}-icon`);
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('renders semantic SVG elements', () => {
      render(<CategoryIcon iconName="Users" />);
      
      const icon = screen.getByTestId('users-icon');
      expect(icon.tagName).toBe('svg');
    });

    it('maintains icon semantics for screen readers', () => {
      render(<CategoryIcon iconName="Scale" />);
      
      const icon = screen.getByTestId('scale-icon');
      expect(icon).toBeInTheDocument();
      
      // SVG should be readable by screen readers
      expect(icon.tagName).toBe('svg');
    });

    it('handles focus states properly', () => {
      const { container } = render(
        <button>
          <CategoryIcon iconName="Briefcase" />
        </button>
      );
      
      const button = container.querySelector('button');
      const icon = screen.getByTestId('briefcase-icon');
      
      expect(button).toContainElement(icon);
    });
  });

  describe('Integration with Blog Categories', () => {
    it('supports all documented blog category icons', () => {
      const blogCategories = [
        { icon: 'Target', name: '투자 전략' },
        { icon: 'BarChart3', name: '시장 분석' },
        { icon: 'TrendingUp', name: '성장 전략' },
        { icon: 'FileText', name: '정책 가이드' },
        { icon: 'Users', name: '가족 자산' },
        { icon: 'Cpu', name: '기술 혁신' },
        { icon: 'Building', name: '부동산' },
        { icon: 'Scale', name: '법무 세무' },
        { icon: 'Globe', name: '글로벌' },
        { icon: 'Briefcase', name: '비즈니스' },
      ];

      blogCategories.forEach(({ icon }) => {
        const { unmount } = render(<CategoryIcon iconName={icon} />);
        
        const iconElement = screen.getByTestId(`${icon.toLowerCase()}-icon`);
        expect(iconElement).toBeInTheDocument();
        
        unmount();
      });
    });
  });

  describe('Media Component Integration', () => {
    it('supports media control icons', () => {
      const mediaControls = [
        { icon: 'Play', purpose: 'Video content' },
        { icon: 'Headphones', purpose: 'Podcast content' },
      ];

      mediaControls.forEach(({ icon }) => {
        const { unmount } = render(<CategoryIcon iconName={icon} />);
        
        const iconElement = screen.getByTestId(`${icon.toLowerCase()}-icon`);
        expect(iconElement).toBeInTheDocument();
        
        unmount();
      });
    });
  });
});