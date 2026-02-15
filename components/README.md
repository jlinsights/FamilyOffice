# FamilyOffice S Components Documentation

This directory contains all reusable components for the FamilyOffice S platform, organized by functionality and optimized for Korean family office services.

## 📁 Directory Structure

```
components/
├── ui/                     # shadcn/ui base components
├── financial/              # (removed) 이전 금융 컴포넌트 디렉터리
├── forms/                  # Contact & consultation forms
├── icons/                  # Custom SVG icons
├── lazy-loading/           # Performance optimization components
├── media/                  # YouTube & Spotify embeds
├── program/                # Educational program components
├── sections/               # Page section components
├── seminar/                # Seminar & event components
└── (root components)       # Core layout & utility components
```

## 🚀 Core Components

### Layout & Navigation

- **`Header`** - Main navigation with Korean business styling
- **`Footer`** - Footer with company information and links
- **`MobileNav`** - Responsive mobile navigation menu

### Booking & Consultation

- **`CalComFloating`** - Floating consultation booking widget
- **`CalComButton`** - Simple booking call-to-action
- **`CalComInline`** - Embedded calendar view
- **`CalComAdvanced`** - Full-featured booking flow

### Content Management

- **`BlogContent`** - Blog post grid with category filtering
- **`BlogCategoryFilter`** - Category selection interface
- **`NewsletterSubscription`** - Beehiiv newsletter integration

### Financial Components

Removed. 실시간 금융 기능은 프로젝트 범위에서 제외되었습니다.

### Optimization Components

- **`OptimizedImage`** - Enhanced image loading with WebP support
- **`HeroImage`** - Optimized hero section images
- **`ThumbnailImage`** - Optimized thumbnail images
- **`AvatarImage`** - User avatar optimization
- **`BackgroundImage`** - Background image with overlay support

## 📱 UI Components (shadcn/ui)

### Form Controls

- **`Button`** - 12 variants including Korean business themes
- **`Input`** - Form input with validation
- **`Select`** - Dropdown selection
- **`Checkbox`** - Checkbox input
- **`RadioGroup`** - Radio button groups

### Layout

- **`Card`** - Content containers
- **`Tabs`** - Tabbed interfaces
- **`Accordion`** - Collapsible content sections
- **`Separator`** - Visual content dividers

### Feedback

- **`Toast`** - Notification messages
- **`Alert`** - Alert messages and warnings
- **`Badge`** - Status and category indicators
- **`Progress`** - Progress bars
- **`Skeleton`** - Loading placeholders

### Navigation

- **`Breadcrumb`** - Navigation breadcrumbs
- **`Pagination`** - Page navigation
- **`NavigationMenu`** - Main navigation menus

## 🎨 Design System

### Color Variants

- **Primary** - Navy blue (#1e3a8a) for trust and professionalism
- **Secondary** - Warm gray for supporting content
- **Tertiary** - Amber gradient for premium features
- **Consultation** - Orange for booking CTAs
- **Emerald** - Luxury green for premium services

### Typography

- **Font** - Inter with Korean optimization
- **Sizes** - Responsive scale (sm: 12px → lg: 18px)
- **Weights** - 400 (normal), 600 (semibold), 700 (bold)

### Spacing

- **Base unit** - 4px (1 = 4px, 2 = 8px, etc.)
- **Container** - max-width: 1280px
- **Sections** - py-16 (64px) vertical padding

## 🌏 Korean Market Optimization

### Content Strategy

- **Educational Focus** - Tuesday 2:30 PM (practical guides)
- **Strategic Analysis** - Thursday 8:00 PM (market analysis)
- **Target Audience** - Mid-market company CEOs (30억+ assets)

### SEO Optimization

- **Keywords** - 패밀리오피스, 가업승계, 자산관리
- **Structured Data** - JSON-LD for rich snippets
- **Mobile First** - Responsive design for Korean mobile usage

### Business Features

- **Service Areas** - Manufacturing, Construction, IT/Venture, Family Corps
- **Financial Integration** - KRX stocks (삼성전자, SK하이닉스, NAVER)
- **Consultation Booking** - Korean timezone optimization

## ⚡ Performance Features

### Code Splitting

- Dynamic imports for heavy components
- Route-based lazy loading
- Vendor chunk optimization

### Caching

- Redis + memory multi-layer caching
- HTTP cache headers on APIs
- Browser cache optimization

### Image Optimization

- WebP/AVIF format detection
- Responsive sizing (16 → 3840px)
- Lazy loading with intersection observer

## 🧪 Testing

### E2E Testing (Playwright)

- 56 tests across 8 browser/device configurations
- Korean content validation
- Financial data accuracy testing

### Unit Testing (Jest)

- Component rendering tests
- Business logic validation
- Error boundary testing

## 📋 Usage Guidelines

### Import Patterns

```tsx
// UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
// Feature components
import { OptimizedImage } from '@/components/optimized-image-loader';

// Financial components (removed)
```

### Styling Conventions

```tsx
// Use consistent class patterns
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <section className="section bg-muted/30">
    <Button variant="consultation" size="lg">
      무료 상담 예약
    </Button>
  </section>
</div>
```

### Accessibility Requirements

- WCAG 2.1 AA compliance minimum
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimization
- Korean language support

## 🔧 Development

### Adding New Components

1. Create component in appropriate directory
2. Add TypeScript interfaces with JSDoc
3. Include usage examples in documentation
4. Add to component exports
5. Write unit tests
6. Update this README

### Performance Checklist

- [ ] Use dynamic imports for heavy components
- [ ] Implement proper loading states
- [ ] Add error boundaries
- [ ] Optimize bundle size
- [ ] Test Core Web Vitals

### Korean Market Considerations

- [ ] Use appropriate business terminology
- [ ] Implement Korean timezone handling
- [ ] Add structured data for local SEO
- [ ] Test mobile responsiveness
- [ ] Validate accessibility in Korean

---

**Last Updated**: December 2024  
**Version**: Phase 4 Quality Documentation Update
