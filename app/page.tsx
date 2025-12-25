import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import {
  OrganizationStructuredData,
  WebsiteStructuredData,
} from '@/components/seo/structured-data';

import {
  generateHomeMetadata,
  PAGE_STRUCTURED_DATA,
} from '@/lib/seo/page-metadata';

// Dynamic imports for better performance - load non-critical sections lazily
const ServicesSection = dynamic(
  () =>
    import('@/components/sections/services-section').then(mod => ({
      default: mod.ServicesSection,
    })),
  {
    loading: () => (
      <div className="py-20 bg-background animate-pulse">
        <div className="container mx-auto px-6 h-20 bg-muted/50 rounded"></div>
      </div>
    ),
  }
);

const DualPillarSection = dynamic(
  () =>
    import('@/components/sections/dual-pillar-section').then(mod => ({
      default: mod.DualPillarSection,
    })),
  {
    loading: () => (
      <div className="py-20 bg-muted/30 animate-pulse">
        <div className="container mx-auto px-6 h-32 bg-background/50 rounded"></div>
      </div>
    ),
  }
);

const SelfCheckCTASection = dynamic(
  () =>
    import('@/components/sections/self-check-cta').then(mod => ({
      default: mod.SelfCheckCTASection,
    })),
  {
    loading: () => (
      <div className="py-16 bg-background animate-pulse">
        <div className="container mx-auto px-6 h-24 bg-muted/50 rounded"></div>
      </div>
    ),
  }
);

const Footer = dynamic(
  () => import('@/components/footer').then(mod => ({ default: mod.Footer })),
  {
    loading: () => (
      <div className="py-12 bg-muted animate-pulse">
        <div className="container mx-auto px-6 h-16 bg-background/50 rounded"></div>
      </div>
    ),
  }
);

const MultimediaContentSection = dynamic(
  () => import('@/components/sections/multimedia-content-section'),
  {
    loading: () => (
      <div className="py-20 bg-background animate-pulse">
        <div className="container mx-auto px-6 h-64 bg-muted/50 rounded"></div>
      </div>
    ),
  }
);

// 네이버 검색 최적화 메타데이터
export const metadata: Metadata = generateHomeMetadata();

export default function HomePage() {
  return (
    <div className="mobile-scroll-smooth cls-safe min-h-screen bg-background">
      {/* 네이버 검색 최적화 구조화 데이터 */}
      <OrganizationStructuredData />
      <WebsiteStructuredData />

      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Sections */}
      <ServicesSection />
      <DualPillarSection />
      <MultimediaContentSection />
      <SelfCheckCTASection />

      <div className="safe-area-bottom">
        <Footer />
      </div>
    </div>
  );
}
