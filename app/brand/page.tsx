'use client';

import {
  Building2,
  Check,
  Copy,
  Download,
  Eye,
  FileCheck,
  LayoutGrid,
  Palette,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Type,
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import { TextReveal } from '@/components/ui/animation/TextReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { BRAND_COLORS, TYPOGRAPHY_SYSTEM } from '@/constants/brand';
import type { BrandColorSystem, TypographyCategory } from '@/types/brand';

// Executive Brand Overview Component (Bento Grid)
const ExecutiveSummary = () => (
  <div className="mb-20">
    <div className="text-center mb-12">
      <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-4 py-1.5 text-sm">
        Executive Overview
      </Badge>
      <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
        Brand Identity System
      </h2>
      <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
        성공한 기업가를 위한 프리미엄 패밀리오피스, FamilyOffice S의
        <br />
        브랜드 철학과 핵심 가치를 시각화한 통합 가이드라인입니다.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]">
      {/* Primary Value Card - Large */}
      <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <CardContent className="h-full flex flex-col justify-between p-8 relative z-10">
          <div>
            <Shield className="h-12 w-12 text-blue-200 mb-6" />
            <h3 className="text-3xl font-bold mb-4">신뢰와 전문성</h3>
            <p className="text-lg text-blue-100/90 leading-relaxed font-light">
              삼성생명 1000억+ 자산관리 실적을 기반으로 한<br />
              검증된 금융 노하우와 압도적인 신뢰도.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-8">
            <Badge
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              Trust
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              Expertise
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Value 1 */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow duration-300 group">
        <CardContent className="p-0 h-full flex flex-col justify-between">
          <Target className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h3 className="text-xl font-bold mb-2">Target-Centric</h3>
            <p className="text-sm text-muted-foreground">
              중소중견기업 CEO 전용 맞춤 솔루션 설계
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Value 2 */}
      <Card className="bg-slate-900 text-white border-slate-800 p-6 hover:shadow-lg transition-shadow duration-300 group">
        <CardContent className="p-0 h-full flex flex-col justify-between">
          <Sparkles className="h-8 w-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h3 className="text-xl font-bold mb-2">Premium VVIP</h3>
            <p className="text-sm text-slate-400">
              최상위 고객을 위한 프라이빗 멤버십 서비스
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Value 3 */}
      <Card className="md:col-span-2 bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0 flex items-center justify-between h-full">
          <div>
            <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Growth & Legacy
            </h3>
            <p className="text-muted-foreground">
              백년영속 가업승계와 안정적인 자산증식 지원
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-black text-green-600 dark:text-green-400">
                ∞
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Brand Identity Component
const BrandIdentity = () => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold mb-8 flex items-center">
      <Building2 className="mr-3 h-6 w-6 text-blue-600" />
      Identity Elements
    </h3>
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-8 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-xl font-semibold">Brand Mark</h4>
          <Badge variant="outline">Logo System</Badge>
        </div>
        <div className="space-y-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <p
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                FamilyOffice S
              </p>
              <div className="flex items-center justify-center mt-3 gap-2 opacity-80">
                <span className="text-xs tracking-widest text-slate-500 uppercase">
                  Samsung Financial Networks
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Primary Font
              </p>
              <p className="text-muted-foreground font-serif">
                Playfair Display (Bold)
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Secondary Font
              </p>
              <p className="text-muted-foreground">Pretendard / Inter</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-xl font-semibold">Verbal Identity</h4>
          <Badge variant="outline">Messaging</Badge>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Tagline
            </p>
            <p className="text-2xl font-medium text-slate-900 dark:text-white">
              &ldquo;Your Trusted Financial Partner for Life&rdquo;
            </p>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />

          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Core Promises
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">
                    백년영속:
                  </strong>{' '}
                  대를 이어갈 지속가능한 가치 창출
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">
                    초격차 전문성:
                  </strong>{' '}
                  검증된 금융 전문가 그룹
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">
                    완전한 맞춤화:
                  </strong>{' '}
                  오직 당신만을 위한 솔루션
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

// Color Palette Component
const ColorPalette = ({
  colors,
  title,
  icon: Icon,
}: {
  colors: import('@/types/brand').BrandColor[];
  title: string;
  icon: any;
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    toast.success(`Color code copied: ${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {colors.map(color => (
          <div
            key={color.name}
            className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div
              className="h-32 w-full cursor-pointer relative"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyToClipboard(color.hex)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {copiedColor === color.hex ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="text-xs font-bold">
                    {copiedColor === color.hex ? 'Copied!' : 'Copy HEX'}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-bold text-slate-900 dark:text-white">
                  {color.name}
                </h5>
                <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                  {color.hex}
                </code>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {color.usage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Typography Showcase Component
const TypographyShowcase = ({ system }: { system: TypographyCategory[] }) => (
  <div className="space-y-12">
    {system.map(category => (
      <div
        key={category.category}
        className="border-b border-slate-200 dark:border-slate-800 pb-12 last:border-0 last:pb-0"
      >
        <h4 className="text-xl font-bold mb-8 capitalize flex items-center">
          <Type className="mr-3 h-5 w-5 text-slate-400" />
          {category.category} Scale
        </h4>
        <div className="space-y-6">
          {category.styles.map(style => (
            <div
              key={style.name}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors duration-300"
            >
              {/* Type Specs */}
              <div className="lg:col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {style.name}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
                  <span>Size: {style.size}</span>
                  <span>Weight: {style.weight}</span>
                  <span>Line: {style.lineHeight}</span>
                </div>
              </div>

              {/* Preview */}
              <div className="lg:col-span-9">
                <p
                  className="text-slate-900 dark:text-white transition-colors"
                  style={{
                    fontSize: style.size,
                    fontWeight: style.weight,
                    lineHeight: style.lineHeight,
                  }}
                >
                  {style.name.includes('Display')
                    ? 'Strategic Wealth Management'
                    : style.name.includes('H')
                      ? 'The Future of Legacy'
                      : 'Consistent growth and risk management are the cornerstones of our philosophy.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default function BrandPage() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const brandColors: BrandColorSystem = BRAND_COLORS;
  const typographySystem: TypographyCategory[] = TYPOGRAPHY_SYSTEM;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-white dark:bg-slate-950">
        {/* Immersive Hero Section */}
        <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
          {/* Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.05]"></div>

          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            <FadeIn>
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30 px-4 py-2 text-sm backdrop-blur-sm">
                Brand Guidelines v3.0
              </Badge>
            </FadeIn>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <TextReveal delay={0.2}>Design System &</TextReveal>
              <span className="text-blue-500 block mt-2">
                <TextReveal delay={0.4}>Brand Identity</TextReveal>
              </span>
            </h1>

            <FadeIn delay={0.6} className="max-w-2xl mx-auto">
              <p className="text-xl text-slate-400 mb-10 font-light leading-relaxed">
                FamilyOffice S의 브랜드 가치와 디자인 원칙을 정의합니다.
                <br />
                일관된 브랜드 경험을 위한 통합 가이드라인입니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.8} className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 h-14 rounded-full text-lg shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                onClick={() =>
                  toast.info('Brand Assets Package will be available in v3.1')
                }
              >
                <Download className="mr-2 h-5 w-5" /> Brand Assets
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 hover:text-white px-8 h-14 rounded-full text-lg"
                onClick={() => {
                  const element = document.getElementById('brand-overview');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Fallback if ID not found (though we should add it) or just toast
                    toast.info('Quick View is activating...');
                    setActiveTab('overview');
                  }
                }}
              >
                <Eye className="mr-2 h-5 w-5" /> Quick View
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* Sticky Sub-navigation */}
        <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="h-16 w-full justify-start bg-transparent p-0 gap-8 overflow-x-auto no-scrollbar">
                {[
                  'overview',
                  'identity',
                  'colors',
                  'typography',
                  'components',
                  'guidelines',
                ].map(tab => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-1 text-base font-medium text-muted-foreground transition-none"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content Area */}
        <section className="py-16 min-h-screen bg-slate-50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsContent value="overview" className="mt-0 animate-fade-in-up">
                <ExecutiveSummary />
              </TabsContent>

              <TabsContent value="identity" className="mt-0 animate-fade-in-up">
                <BrandIdentity />
              </TabsContent>

              <TabsContent value="colors" className="mt-0 animate-fade-in-up">
                <ColorPalette
                  colors={brandColors.primary}
                  title="Primary Colors"
                  icon={Palette}
                />
                <ColorPalette
                  colors={brandColors.neutral}
                  title="Neutral Colors"
                  icon={LayoutGrid}
                />
                <ColorPalette
                  colors={brandColors.accent}
                  title="Accent Colors"
                  icon={Sparkles}
                />
                <ColorPalette
                  colors={brandColors.status}
                  title="Status Colors"
                  icon={FileCheck}
                />
              </TabsContent>

              <TabsContent
                value="typography"
                className="mt-0 animate-fade-in-up"
              >
                <TypographyShowcase system={typographySystem} />
              </TabsContent>

              <TabsContent
                value="components"
                className="mt-0 animate-fade-in-up"
              >
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-slate-400">
                    Component Library Live Preview
                  </h3>
                  <p className="text-slate-500 mt-2">
                    This section is linking to Storybook in v3.1
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() =>
                      toast.info('Storybook integration is coming in v3.1')
                    }
                  >
                    View Storybook
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="guidelines"
                className="mt-0 animate-fade-in-up"
              >
                <Card className="p-12 text-center border-dashed border-2">
                  <FileCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white">
                    Implementation Guidelines
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-md mx-auto">
                    Detailed CSS tokens and accessibility checklist are
                    available in the downloadable PDF version of the guidelines.
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() =>
                      toast.info(
                        'Full Guidelines PDF will be available in v3.1'
                      )
                    }
                  >
                    Download Full Guidelines (PDF)
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
