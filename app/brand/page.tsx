'use client';

import { Copy, Check, Palette, ArrowRight, Building2, Calendar, Shield, Target, TrendingUp, Briefcase } from 'lucide-react';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import BrandExcellenceSection from '@/components/brand-excellence-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { FamilyOfficeLogo } from '@/components/logo';
import LogoShowcaseCard from '@/components/logo-showcase-card';
import { SVGLogoDisplay, LogoVariantCard } from '@/components/svg-logo-display';

import { BRAND_COLORS, TYPOGRAPHY_SYSTEM } from '@/constants/brand';
import type { BrandColorSystem, TypographyCategory } from '@/types/brand';

// ColorPalette 컴포넌트 정의를 함수 바깥으로 이동 및 props 확장
const ColorPalette = ({
  colors,
  title,
  copiedColor,
  copyToClipboard,
}: {
  colors: import('@/types/brand').BrandColor[];
  title: string;
  copiedColor: string | null;
  copyToClipboard: (text: string, type: string) => void;
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {colors.map(color => (
        <Card
          key={color.name}
          className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl"
        >
          <div
            className="h-20 w-full cursor-pointer relative group"
            style={{ backgroundColor: color.hex }}
            onClick={() => copyToClipboard(color.hex, title)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
              {copiedColor === `${title}-${color.hex}` ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Copy className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white transition-colors duration-300">
                {color.name}
              </h4>
              <Badge
                variant="ghost"
                size="xs"
              >
                {color.hex}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">
              RGB: {color.rgb}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
              {color.usage}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('brand');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(`${type}-${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // 타입 명확화: BRAND_COLORS, TYPOGRAPHY_SYSTEM
  const brandColors: BrandColorSystem = BRAND_COLORS;
  const typographySystem: TypographyCategory[] = TYPOGRAPHY_SYSTEM;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
          {/* 배경 그라데이션 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            {/* 상단 태그 */}
            <div className="flex justify-center mb-8">
              <Badge
                variant="outline"
                className="animate-fade-in bg-background/80 backdrop-blur-sm"
              >
                <Palette className="h-3 w-3 mr-1" />
                Brand Guidelines
              </Badge>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              <span className="playfair-display-bold">FamilyOffice S</span>
              {'\n'}
              <span className="text-foreground">브랜드 가이드라인</span>
            </h1>

            {/* 서브 헤드라인 */}
            <p
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              Professional, Personal, Prosperity
            </p>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '300ms' }}
            >
              <span className="font-semibold text-foreground">
                신뢰 기반 프리미엄 자산관리
              </span>{' '}
              브랜드의 일관된 아이덴티티와{' '}
              <span className="font-semibold text-primary">브랜드 표준</span>을
              제시합니다
            </p>

            {/* CTA 버튼 */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
              style={{ animationDelay: '500ms' }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg"
              >
                브랜드 가이드 다운로드
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold shadow-lg px-8 py-4 text-lg"
              >
                <Copy className="mr-2 h-5 w-5" />
                로고 에셋 다운로드
              </Button>
            </div>

            {/* 버전 정보 */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <Badge variant="secondary" className="text-sm">
                Version 1.0 | 2025
              </Badge>
            </div>
          </div>
        </section>
        {/* === Main Content === */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* === 탭 리스트 (프리미엄 스타일) === */}
            <TabsList className="flex flex-wrap justify-center gap-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-2 mb-8">
              <TabsTrigger
                value="brand"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                브랜드
              </TabsTrigger>
              <TabsTrigger
                value="logo"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                로고 시스템
              </TabsTrigger>
              <TabsTrigger
                value="colors"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                컬러 시스템
              </TabsTrigger>
              <TabsTrigger
                value="typography"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                타이포그라피
              </TabsTrigger>
              <TabsTrigger
                value="components"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                UI 컴포넌트
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                코드 가이드
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                활용 사례
              </TabsTrigger>
              <TabsTrigger
                value="webdesign"
                className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300"
              >
                웹디자인 시스템
              </TabsTrigger>
            </TabsList>

            {/* 브랜드 정체성 탭 */}
            <TabsContent value="brand" className="space-y-8">
              {/* === Brand Guidelines Header === */}
              <div className="mb-8">
                {/* 상단 타이틀/버전/부제목 */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-blue-600 dark:text-blue-400">
                          <FamilyOfficeLogo className="w-7 h-7 inline-block align-middle mr-1" />
                        </span>
                        <span className="playfair-display-bold">
                          FamilyOffice S
                        </span>{' '}
                        Brand Guidelines
                      </span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                      Professional, Personal, Prosperity - 신뢰 기반 프리미엄
                      자산관리 브랜드
                    </p>
                  </div>
                  <span className="mt-2 md:mt-0 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-mono">
                    Version 1.0 | 2025
                  </span>
                </div>
              </div>

              {/* === Brand Identity Section === */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-blue-600 dark:text-blue-400">
                    ◎
                  </span>{' '}
                  Brand Identity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Brand Name */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-start shadow-sm">
                    <span className="text-sm font-semibold text-gray-500 mb-2">
                      Brand Name
                    </span>
                    <span className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1 playfair-display-bold">
                      FamilyOffice S
                    </span>
                  </div>
                  {/* Brand Essence */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-start shadow-sm">
                    <span className="text-sm font-semibold text-gray-500 mb-2">
                      Brand Essence
                    </span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      신뢰 기반의 전문적이고 개인화된 프리미엄 자산관리 파트너십
                    </span>
                  </div>
                  {/* Brand Promise */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-start shadow-sm">
                    <span className="text-sm font-semibold text-gray-500 mb-2">
                      Brand Promise
                    </span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      초고액자산가를 위한 전략적 파트너십을 통해 성공과
                      지속가능성을 동시에 실현
                    </span>
                  </div>
                </div>
              </section>

              {/* === Brand Messages Section === */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-purple-600 dark:text-purple-400">
                    T
                  </span>{' '}
                  Brand Messages
                </h2>
                {/* Taglines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Primary Tagline */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">
                      Primary Tagline
                    </span>
                    <div className="text-base font-medium text-gray-800 dark:text-gray-100 mb-1">
                      &quot;Your Trusted Financial Partner for Life&quot;
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-300">
                      &quot;평생을 함께하는 신뢰할 수 있는 금융 파트너&quot;
                    </div>
                  </div>
                  {/* Secondary Tagline */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">
                      Secondary Tagline
                    </span>
                    <div className="text-base font-medium text-gray-800 dark:text-gray-100 mb-1">
                      &quot;Professional. Personal. Prosperity.&quot;
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-300">
                      &quot;전문적. 개인적. 번영.&quot;
                    </div>
                  </div>
                </div>
                {/* Brand Statement */}
                <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 mb-6 shadow-sm">
                  <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">
                    Brand Statement
                  </span>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">
                      English:
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      &quot;FamilyOffice S is your trusted financial partner,
                      dedicated to providing sophisticated wealth management
                      expertise and personalized solutions that ensure
                      sustainable prosperity for you and your family&apos;s
                      future.&quot;
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">
                      Korean:
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      &quot;FamilyOffice S는 신뢰할 수 있는 금융 파트너로서,
                      정교한 자산관리 전문성과 개인 맞춤형 솔루션을 통해
                      고객님과 가족의 미래를 위한 지속가능한 번영을
                      보장합니다.&quot;
                    </span>
                  </div>
                </div>
                {/* Elevator Pitch */}
                <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                  <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">
                    Elevator Pitch
                  </span>
                  <div className="text-gray-800 dark:text-gray-100">
                    &quot;FamilyOffice S는 고객의 평생 금융 파트너로서 신뢰를
                    바탕으로 한 프리미엄 패밀리오피스입니다. 우리는
                    Professional한 전문성, Personal한 맞춤 서비스, 그리고
                    Prosperity한 미래를 통해 중소중견기업 법인 대표님들의
                    성공적인 자산관리와 가족의 지속가능한 번영을
                    실현합니다.&quot;
                  </div>
                </div>
              </section>

              {/* === Core Values & Differentiators Section === */}
              <section className="mb-10">
                {/* Core Values */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-yellow-500">🧑‍💼</span> Core
                  Values
                </h2>
                {/* 핵심 가치 배열 선언 */}
                {(() => {
                  const values = [
                    {
                      icon: (
                        <svg
                          className="w-7 h-7 text-blue-600 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" />
                        </svg>
                      ),
                      title: 'Strategic Excellence',
                      subtitle: '전략적 우수성',
                    },
                    {
                      icon: (
                        <svg
                          className="w-7 h-7 text-purple-500 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2v6m0 0a4 4 0 100 8 4 4 0 000-8zm0 8v6" />
                        </svg>
                      ),
                      title: 'Sophisticated Solutions',
                      subtitle: '고도화된 솔루션',
                    },
                    {
                      icon: (
                        <svg
                          className="w-7 h-7 text-green-600 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 7l-7.5 7.5-3.5-3.5" />
                        </svg>
                      ),
                      title: 'Personal Partnership',
                      subtitle: '개인적 파트너십',
                    },
                    {
                      icon: (
                        <svg
                          className="w-7 h-7 text-emerald-600 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 17l6-6 4 4 8-8" />
                        </svg>
                      ),
                      title: 'Sustainable Growth',
                      subtitle: '지속가능한 성장',
                    },
                    {
                      icon: (
                        <svg
                          className="w-7 h-7 text-orange-500 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4l3 3" />
                        </svg>
                      ),
                      title: 'Superior Service',
                      subtitle: '차별화된 서비스',
                    },
                  ];
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                      {values.map((v, i) => (
                        <div
                          key={i}
                          className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-sm"
                        >
                          {v.icon}
                          <div className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                            {v.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {v.subtitle}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                {/* Core Differentiators */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-purple-500">✈️</span> Core
                  Differentiators
                </h2>
                {/* 차별화 요소 배열 선언 */}
                {(() => {
                  const diff = [
                    {
                      color: 'text-blue-600',
                      title: 'Trusted Partnership Approach',
                      desc: '신뢰 기반의 장기적 파트너십과 통합 솔루션',
                    },
                    {
                      color: 'text-purple-600',
                      title: 'Sophisticated Analytics',
                      desc: 'AI 기반 고도화된 분석 및 예측 솔루션',
                    },
                    {
                      color: 'text-green-600',
                      title: 'Strategic Succession Planning',
                      desc: '체계적이고 전략적인 승계 계획 수립',
                    },
                    {
                      color: 'text-emerald-600',
                      title: 'Sustainable Growth',
                      desc: '지속가능한 성장 동력 확보 및 관리',
                    },
                  ];
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {diff.map((d, i) => (
                        <div
                          key={i}
                          className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm"
                        >
                          <div className={`font-bold text-2xl mb-2 ${d.color}`}>
                            {d.title}
                          </div>
                          <div className="text-gray-700 dark:text-gray-200 text-base">
                            {d.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </section>

              {/* === Brand Personality & Usage Guidelines Section === */}
              <section className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brand Personality 카드 */}
                  <div className="border rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-pink-500">✨</span> Brand
                      Personality
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          label: 'Professional',
                          desc: '전문성과 신뢰성',
                          color: 'bg-blue-100 text-blue-700',
                        },
                        {
                          label: 'Innovative',
                          desc: '혁신적 사고와 접근',
                          color: 'bg-blue-100 text-blue-500',
                        },
                        {
                          label: 'Sophisticated',
                          desc: '세련되고 고도화된 서비스',
                          color: 'bg-blue-100 text-blue-400',
                        },
                        {
                          label: 'Trustworthy',
                          desc: '신뢰할 수 있는 파트너',
                          color: 'bg-blue-100 text-blue-600',
                        },
                        {
                          label: 'Exclusive',
                          desc: '프리미엄 고객 대상의 특별함',
                          color: 'bg-blue-100 text-blue-800',
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full font-semibold text-sm ${item.color} border border-blue-200 mr-2`}
                          >
                            {item.label}
                          </span>
                          <span className="text-gray-700 dark:text-gray-200 text-base">
                            {item.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Usage Guidelines 카드 */}
                  <div className="border rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-green-500">✔️</span> Usage
                      Guidelines
                    </h2>
                    <div className="mb-6">
                      <div className="text-xl font-bold text-green-600 mb-2">
                        Do&apos;s
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-100">
                        <li>신뢰와 파트너십 가치 강조</li>
                        <li>Professional한 이미지 유지</li>
                        <li>Personal한 맞춤 서비스 명확화</li>
                        <li>Premium 고객층에 적합한 커뮤니케이션</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-600 mb-2">
                        Don&apos;ts
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>단순한 Sales 중심 메시지 지양</li>
                        <li>과도한 기술적 전문용어 사용 금지</li>
                        <li>신뢰 관계를 손상시키는 과도한 영업 방지</li>
                        <li>일반적인 자산관리사와의 차별화 부족</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* === 브랜드 핵심 가치 & 디자인 철학 Section === */}
              <section className="mb-10">
                {/* 브랜드 핵심 가치 */}
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                  브랜드 핵심 가치
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  {[
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-blue-500 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" />
                        </svg>
                      ),
                      title: '신뢰성 (Trust)',
                      desc: '중소중견기업 법인 대표님의 자산을 안전하게 관리하는 신뢰할 수 있는 파트너',
                    },
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-emerald-500 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4l3 3" />
                        </svg>
                      ),
                      title: '전문성 (Expertise)',
                      desc: '20여년의 중소중견기업 전문 노하우와 최신 금융 트렌드를 결합한 전문 서비스',
                    },
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-purple-500 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="4" />
                        </svg>
                      ),
                      title: '개인화 (Personalization)',
                      desc: '고객 중심의 맞춤형 자산관리 솔루션으로 각각의 고유한 요구사항 충족',
                    },
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-orange-400 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 7l-7.5 7.5-3.5-3.5" />
                        </svg>
                      ),
                      title: '혁신성 (Innovation)',
                      desc: '최신 기술과 시스템을 활용한 차별화된 통합 자산관리 플랫폼',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border rounded-xl bg-white dark:bg-gray-800 p-8 flex flex-col items-center shadow-sm"
                    >
                      {item.icon}
                      <div className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white mb-2 text-center">
                        {item.title}
                      </div>
                      <div className="text-gray-700 dark:text-gray-200 text-base text-center">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
                {/* 디자인 철학 */}
                <div className="max-w-5xl mx-auto">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    디자인 철학
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 mb-6">
                    FamilyOffice S의 디자인 원칙과 접근 방식
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">
                        모던 미니멀리즘
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        불필요한 요소를 제거하고 핵심에 집중하는 깔끔한
                        디자인으로 전문성과 신뢰성을 표현합니다.
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">
                        반응형 적용
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        다양한 디바이스와 환경에서 일관된 경험을 제공하는 적응형
                        디자인을 구현합니다.
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">
                        사용자 중심
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        바쁜 경영진들이 쉽고 빠르게 정보를 찾을 수 있도록
                        직관적인 인터페이스를 제공합니다.
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">
                        접근성 우선
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        모든 사용자가 접근할 수 있는 포용적 디자인으로
                        다크모드와 고대비 모드를 지원합니다.
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* --- 기존 브랜드 비전/핵심가치/개성은 주석 처리 또는 하단 이동 --- */}
              {/*
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">브랜드 정체성</h2>
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">브랜드 비전</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                      가족의 미래를 위한 최고의 자산 관리 파트너가 되어, 
                      고객 개인과 가족이 안정적이고 지속 가능한 재정적 성공을 달성할 수 있도록 돕습니다.
                    </p>
                  </CardContent>
                </Card>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white transition-colors duration-300">브랜드 핵심 가치</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {brandValues.map((value, index) => (
                      <Card key={index} className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{value.icon}</div>
                          <div>
                            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">{value.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{value.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">브랜드 개성</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["전문적인", "신뢰할 수 있는", "혁신적인", "고객 중심적인"].map((trait) => (
                        <Badge key={trait} variant="secondary" className="justify-center py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700 transition-colors duration-300">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              */}
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 로고 시스템 탭 */}
            <TabsContent value="logo" className="space-y-8">
              {/* === 완전한 로고(권장) 예시 카드 === */}
              <LogoShowcaseCard />
              {/* === 상단 타이틀/부제/대표 로고 === */}
              <section className="border rounded-2xl bg-white dark:bg-gray-800 p-8 mb-10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
                      <span className="text-blue-600 dark:text-blue-400">
                        {/* 아이콘 */}
                        <svg
                          className="w-6 h-6 inline-block mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" />
                        </svg>
                      </span>
                      로고 시스템
                    </h2>
                    <div className="text-gray-500 dark:text-gray-300 text-base">
                      브랜드 아이덴티티의 핵심 · 완전 적용형 로고
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-6 md:mt-0">
                    {/* 대표 로고 (라이트/다크 자동 전환) */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center">
                      {/* 라이트 모드용 블루 로고 */}
                      <div className="block dark:hidden">
                        <SVGLogoDisplay
                          src="/SVG/FamilyOfficeS_blue_tagline.svg"
                          alt="FamilyOffice S - 대표 로고"
                          width={224}
                          height={64}
                        />
                      </div>
                      {/* 다크 모드용 블랙 로고 */}
                      <div className="hidden dark:block">
                        <SVGLogoDisplay
                          src="/SVG/FamilyOfficeS_black_tagline.svg"
                          alt="FamilyOffice S - 대표 로고 (다크모드)"
                          width={224}
                          height={64}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      라이트/다크 모드 자동 적용형 SVG 로고
                    </div>
                  </div>
                </div>
                {/* === 2열: 핵심 원칙 & 주의사항 === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* 핵심 원칙 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xl font-bold text-green-600">
                        핵심 원칙
                      </span>
                    </div>
                    <ul className="text-gray-700 dark:text-gray-200 text-base space-y-1 mb-4">
                      <li>
                        <b>일관성:</b> 모든 접점에서 동일한 로고 사용
                      </li>
                      <li>
                        <b>가독성:</b> 최소 크기 120px 이상 유지
                      </li>
                      <li>
                        <b>적용성:</b> 라이트/다크 모드 모두 자동 전환
                      </li>
                      <li>
                        <b>품질:</b> 고해상도 벡터 형태 사용
                      </li>
                    </ul>
                  </div>
                  {/* 주의사항 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-6 h-6 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xl font-bold text-orange-500">
                        주의사항
                      </span>
                    </div>
                    <ul className="text-gray-700 dark:text-gray-200 text-base space-y-1 mb-4">
                      <li>로고 비율이나 색상 임의 변경 금지</li>
                      <li>
                        <b>Playfair Display</b> 폰트 외 사용 금지
                      </li>
                      <li>태그라인 위치나 내용 수정 금지</li>
                      <li>저해상도 이미지 사용 금지</li>
                    </ul>
                  </div>
                </div>
                {/* === 로고 변형 안내 === */}
                <div className="mb-4">
                  <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    로고 변형
                  </div>
                  <div className="text-gray-500 dark:text-gray-300 text-base mb-2">
                    확장 가능한 SVG 로고 파일들
                  </div>
                </div>
                {/* === SVG 로고 변형 카드 === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 태그라인 포함 로고 (권장) */}
                  <LogoVariantCard
                    title="태그라인 포함 로고"
                    description="브랜드 정체성을 완전히 표현하는 권장 형태"
                    logoSrc="/SVG/FamilyOfficeS_blue_tagline.svg"
                    darkModeSrc="/SVG/FamilyOfficeS_black_tagline.svg"
                    width={200}
                    height={64}
                  />
                  {/* 기본 로고 */}
                  <LogoVariantCard
                    title="기본 로고"
                    description="헤더, 내비게이션, 일반 사용용"
                    logoSrc="/SVG/FamilyOfficeS_blue.svg"
                    darkModeSrc="/SVG/FamilyOfficeS_black.svg"
                    width={160}
                    height={48}
                  />
                  {/* 카카오 아이콘 */}
                  <LogoVariantCard
                    title="소셜 아이콘"
                    description="카카오톡, 소셜 미디어용 아이콘"
                    logoSrc="/SVG/SimpleIconsKakao.svg"
                    width={48}
                    height={48}
                  />
                </div>
                
                {/* === 로고 사용 가이드 === */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">✅ 권장 사항</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• SVG 형식 사용으로 모든 크기에서 선명도 유지</li>
                      <li>• 밝은 배경에는 블루 버전, 어두운 배경에는 블랙 버전</li>
                      <li>• 태그라인 포함 로고를 메인 브랜딩에 우선 사용</li>
                      <li>• 최소 크기: 태그라인 포함 시 180px 이상</li>
                      <li>• 로고 주변 충분한 여백 확보</li>
                    </ul>
                  </div>
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">❌ 주의 사항</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• 로고 비율 변경 금지</li>
                      <li>• 색상 변경 또는 필터 적용 금지</li>
                      <li>• 배경과 대비가 부족한 색상 조합 피하기</li>
                      <li>• 복잡한 배경 위에 직접 배치 금지</li>
                      <li>• 다른 요소와 겹치지 않도록 배치</li>
                    </ul>
                  </div>
                </div>
              </section>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 컬러 시스템 탭 */}
            <TabsContent value="colors" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  컬러 시스템
                </h2>
                <ColorPalette
                  colors={brandColors.primary}
                  title="Primary Colors"
                  copiedColor={copiedColor}
                  copyToClipboard={copyToClipboard}
                />
                <ColorPalette
                  colors={brandColors.neutral}
                  title="Neutral Colors"
                  copiedColor={copiedColor}
                  copyToClipboard={copyToClipboard}
                />
                <ColorPalette
                  colors={brandColors.accent}
                  title="Accent Colors"
                  copiedColor={copiedColor}
                  copyToClipboard={copyToClipboard}
                />
                <ColorPalette
                  colors={brandColors.status}
                  title="Status Colors"
                  copiedColor={copiedColor}
                  copyToClipboard={copyToClipboard}
                />
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 타이포그라피 탭 */}
            <TabsContent value="typography" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  타이포그라피
                </h2>
                {typographySystem.map(category => (
                  <div key={category.category} className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.variants.map(variant => (
                        <Card
                          key={variant.name}
                          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                                  {variant.name}
                                </h4>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                  <p>
                                    폰트: {variant.font} {variant.weight}
                                  </p>
                                  <p>크기: {variant.size}</p>
                                  <p>줄 높이: {variant.lineHeight}</p>
                                  <p>용도: {variant.usage}</p>
                                </div>
                              </div>
                              <div>
                                <p
                                  className={`${
                                    variant.name === 'Display Large'
                                      ? 'text-6xl'
                                      : variant.name === 'Display Medium'
                                        ? 'text-5xl'
                                        : variant.name === 'Display Small'
                                          ? 'text-4xl'
                                          : variant.name === 'H1'
                                            ? 'text-3xl'
                                            : variant.name === 'H2'
                                              ? 'text-2xl'
                                              : variant.name === 'H3'
                                                ? 'text-xl'
                                                : variant.name === 'Large'
                                                  ? 'text-lg'
                                                  : variant.name === 'Medium'
                                                    ? 'text-base'
                                                    : 'text-sm'
                                  } font-${variant.weight.toLowerCase()} text-gray-900 dark:text-white transition-colors duration-300`}
                                >
                                  FamilyOffice S
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* UI 컴포넌트 탭 */}
            <TabsContent value="components" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  UI 컴포넌트 시스템
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  FamilyOffice S에서 사용하는 재사용 가능한 UI 컴포넌트들과 디자인 패턴을 소개합니다.
                </p>

                {/* 서비스 카드 (4x2 그리드) */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      서비스 카드 컴포넌트 (4x2 그리드)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { icon: '🏢', title: '법인 지배구조', desc: '정관 설계부터 임원 운영까지' },
                        { icon: '👥', title: '인사 & 고용지원', desc: '인재 확보부터 복지까지' },
                        { icon: '💰', title: '세무 & 회계', desc: '세무 최적화 전문 서비스' },
                        { icon: '📈', title: '투자 & 금융', desc: '투자 전략과 금융 솔루션' }
                      ].map((service, index) => (
                        <Card key={index} className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-border/50 hover:border-primary/30 dark:bg-gray-800 dark:border-gray-700">
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/30 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-colors text-lg">
                                {service.icon}
                              </div>
                              <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                                4개 서비스
                              </Badge>
                            </div>
                            <CardTitle className="text-sm font-semibold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-emerald-300 transition-colors">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-muted-foreground dark:text-gray-200">{service.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                      <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`{/* 4x2 그리드 + 글래스모피즘 호버 효과 */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 
                   border-border/50 hover:border-primary/30 dark:bg-gray-800">
    <CardHeader>
      <div className="h-10 w-10 rounded-lg bg-primary/10 
                      group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </CardHeader>
  </Card>
</div>`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* 버튼 컴포넌트 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-primary" />
                      Button Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Primary Buttons */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Primary 버튼 (상담 신청용)</h4>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <Button className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg">
                            무료 상담 신청
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
                            서비스 자세히 보기
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                          <code>{`<Button className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg">`}</code>
                        </div>
                      </div>

                      {/* Floating Button */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Floating Action Button</h4>
                        <div className="flex gap-4 mb-4">
                          <Button className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full w-16 h-16">
                            <Calendar className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                          <code>{`<Button className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full w-16 h-16">`}</code>
                        </div>
                      </div>

                      {/* Secondary & Outline */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Secondary & Outline</h4>
                        <div className="flex flex-wrap gap-4">
                          <Button variant="secondary">Secondary Button</Button>
                          <Button variant="outline" className="shadow-lg dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
                            Outline Button
                          </Button>
                          <Button variant="ghost">Ghost Button</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 카드 컴포넌트 with 실제 패턴 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      <Copy className="h-5 w-5 text-primary" />
                      Card Component System
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* 글래스모피즘 카드 */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">글래스모피즘 호버 효과</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Card className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm">
                            <CardHeader>
                              <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">
                                Interactive Card
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-xs text-gray-600 dark:text-gray-300">
                                호버 시 shadow-lg + transform 효과
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20">
                            <CardHeader>
                              <CardTitle className="text-sm font-semibold text-primary">
                                Gradient Background
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-xs text-gray-700 dark:text-gray-200">
                                통계 및 강조 섹션용 그라데이션
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                          <code>{`className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300"`}</code>
                        </div>
                      </div>

                      {/* 브랜드 카드 패턴 */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">브랜드 스타일 카드</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                            <div className="text-center">
                              <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/30 flex items-center justify-center mx-auto mb-3">
                                <Shield className="h-6 w-6 text-primary dark:text-emerald-300" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">신뢰성</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">안전한 자산관리</p>
                            </div>
                          </Card>
                          <Card className="border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6">
                            <div className="text-center">
                              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-3">
                                <Target className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">전문성</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">20년 노하우</p>
                            </div>
                          </Card>
                          <Card className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                            <div className="text-center">
                              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="font-semibold mb-2">성장</h4>
                              <p className="text-sm opacity-90">지속가능한 번영</p>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Badge & 상태 표시 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        Badge
                      </Badge>
                      Badge & Status Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Service Count Badges</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">4개 서비스</Badge>
                          <Badge variant="outline" className="mb-4 animate-fade-in dark:bg-primary/80 dark:text-white dark:border-primary/60">
                            <Briefcase className="h-3 w-3 mr-1" />
                            Professional Services
                          </Badge>
                          <Badge variant="ghost" size="xs">Version 1.0 | 2025</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Status Indicators</h4>
                        <div className="flex flex-wrap gap-3">
                          <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Professional</Badge>
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200">Premium</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 그리드 시스템 */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      📐 Grid System & Layout
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">반응형 그리드 패턴</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`/* 서비스 섹션: 모바일 1열 → 태블릿 2열 → 데스크톱 4열 */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* 통계 섹션: 모바일 2열 → 데스크톱 4열 */
grid-cols-2 md:grid-cols-4

/* 3분할 레이아웃 */
grid-cols-1 md:grid-cols-3`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">간격 시스템</h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">gap-4</code>: 16px - 기본 카드 간격</p>
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">gap-6</code>: 24px - 서비스 카드 그리드</p>
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">gap-8</code>: 32px - 섹션 간격</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 코드 가이드 탭 */}
            <TabsContent value="code" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  코드 가이드라인 & 베스트 프랙티스
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  FamilyOffice S 프로젝트에서 사용하는 개발 패턴과 코딩 표준을 소개합니다.
                </p>

                {/* Next.js 13+ App Router 패턴 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      ⚡ Next.js 15+ App Router 패턴
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Server Components (기본값)</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// app/services/page.tsx - Server Component (기본값)
import { ServicesSection } from '@/components/sections/services-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '8개 분야 34개 전문 서비스 | FamilyOffice S',
  description: '중소중견기업 대표님을 위한 포괄적 자산관리 서비스'
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesSection />
    </main>
  )
}`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Client Components (최소한으로 사용)</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`'use client' // 상호작용이 필요한 경우에만

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? '닫기' : '열기'}
    </Button>
  )
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tailwind CSS 디자인 시스템 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🎨 Tailwind CSS 디자인 시스템
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">다크모드 지원 패턴</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// 모든 컴포넌트에 다크모드 지원
<div className="bg-white dark:bg-gray-900 transition-colors duration-300">
  <h1 className="text-gray-900 dark:text-white">제목</h1>
  <p className="text-gray-600 dark:text-gray-300">본문</p>
  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
    // 카드 내용
  </Card>
</div>`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">반응형 그리드 패턴</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// 서비스 섹션 4x2 그리드 (복원된 패턴)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map((service, index) => (
    <Card 
      key={service.id}
      className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 
                 border-border/50 hover:border-primary/30"
      style={{ animationDelay: \`\${index * 100}ms\` }}
    >
      // 카드 내용
    </Card>
  ))}
</div>`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">애니메이션 시스템</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// CSS 애니메이션 클래스 (globals.css)
.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

// 사용 예시
<h1 className="animate-slide-up" style={{ animationDelay: '200ms' }}>
  제목
</h1>`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* TypeScript 패턴 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🔷 TypeScript 패턴 & 타입 정의
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">인터페이스 정의</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// types/service.ts
export interface ServiceCategory {
  id: string
  icon: LucideIcon
  title: string
  description: string
  serviceCount: number
  keyFeatures: string[]
}

// 컴포넌트에서 사용
interface ServicesProps {
  categories: ServiceCategory[]
  className?: string
}

export function ServicesGrid({ categories, className }: ServicesProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {categories.map((category) => (
        <ServiceCard key={category.id} category={category} />
      ))}
    </div>
  )
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* shadcn/ui 컴포넌트 활용 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      📦 shadcn/ui 컴포넌트 확장 패턴
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">기본 컴포넌트 래핑</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// components/service-card.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  serviceCount: number
  icon: React.ReactNode
  className?: string
}

export function ServiceCard({ 
  title, 
  description, 
  serviceCount, 
  icon, 
  className 
}: ServiceCardProps) {
  return (
    <Card className={cn(
      "group hover:shadow-lg hover:-translate-y-2 transition-all duration-300",
      "border-border/50 hover:border-primary/30 dark:bg-gray-800",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/30 
                          flex items-center justify-center 
                          group-hover:bg-primary/20 dark:group-hover:bg-primary/40 
                          transition-colors">
            {icon}
          </div>
          <Badge variant="secondary" className="text-xs">
            {serviceCount}개 서비스
          </Badge>
        </div>
        <CardTitle className="text-lg font-semibold group-hover:text-primary 
                             dark:group-hover:text-emerald-300 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground dark:text-gray-200">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 상태관리 및 데이터 페칭 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🗄️ 데이터 관리 패턴
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">상수 데이터 관리</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// lib/constants.ts - 중앙화된 데이터 관리
export const MAIN_PAGE_SERVICES = [
  {
    id: 'corporate-governance',
    icon: Gavel,
    title: '법인 지배구조 & 컨설팅',
    description: '정관 설계부터 임원 운영까지 법인 경영의 모든 영역',
    serviceCount: 4,
    keyFeatures: [
      '정관 및 배당 컨설팅',
      'CEO유고시 리스크 관리',
      '임원소득보장플랜',
      '법인 운영 컨설팅'
    ]
  },
  // ... 더 많은 서비스
] as const

// 타입 추론
export type MainPageService = typeof MAIN_PAGE_SERVICES[number]`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">환경변수 관리 (Zod 검증)</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 파일 구조 및 네이밍 */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      📁 파일 구조 & 네이밍 규칙
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">디렉토리 구조</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`app/
├── (marketing)/          # 퍼블릭 마케팅 페이지
│   ├── page.tsx         # 홈페이지
│   ├── about/           # 회사소개
│   └── services/        # 서비스 안내
├── admin/              # 관리자 페이지 (보호됨)
├── api/                # API 라우트
└── globals.css         # 전역 스타일

components/
├── ui/                 # shadcn/ui 기본 컴포넌트
├── sections/           # 페이지 섹션 컴포넌트
│   ├── hero-section.tsx
│   └── services-section.tsx
├── forms/              # 폼 관련 컴포넌트
└── layout/             # 레이아웃 컴포넌트

lib/
├── supabase/           # 데이터베이스 관련
├── utils.ts            # 유틸리티 함수
└── constants.ts        # 상수 정의`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">네이밍 규칙</h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">kebab-case</code>: 파일명, 디렉토리명</p>
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">PascalCase</code>: React 컴포넌트, 타입, 인터페이스</p>
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">camelCase</code>: 함수, 변수, 프로퍼티</p>
                          <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">SCREAMING_SNAKE_CASE</code>: 상수</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 활용 사례 탭 */}
            <TabsContent value="examples" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  실제 활용 사례 & 레이아웃 예시
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  FamilyOffice S 브랜드 가이드라인이 실제 프로젝트에서 어떻게 적용되는지 확인해보세요.
                </p>

                {/* 홈페이지 히어로 섹션 예시 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🏠 홈페이지 히어로 섹션
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background p-8 rounded-lg mb-4 border border-gray-200 dark:border-gray-600">
                      <div className="text-center">
                        <Badge variant="outline" className="mb-4 animate-fade-in dark:bg-primary/80 dark:text-white">
                          <Building2 className="h-3 w-3 mr-1" />
                          Professional Services
                        </Badge>
                        <h1 className="font-bold text-3xl leading-tight mb-4 text-primary whitespace-pre-line animate-slide-up">
                          百年永續
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                          중소중견기업 법인 대표님을 위한 <span className="font-semibold text-primary">포괄적 자산관리</span> 서비스
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg">
                            무료 상담 신청
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="shadow-lg">
                            서비스 자세히 보기
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      그라데이션 배경, 브랜드 컬러, 한국어 타이포그라피가 조화를 이루는 메인 히어로 섹션
                    </p>
                  </CardContent>
                </Card>

                {/* 서비스 그리드 레이아웃 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🗂️ 서비스 그리드 (4x2 레이아웃)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
                        <span className="text-primary">8개 분야 34개</span> 전문 서비스
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[
                          { icon: '🏢', title: '법인 지배구조', count: 4 },
                          { icon: '👥', title: '인사 & 고용지원', count: 4 },
                          { icon: '💰', title: '세무 & 회계', count: 4 },
                          { icon: '📈', title: '투자 & 금융', count: 4 },
                          { icon: '🏛️', title: '자산관리 & 보험', count: 4 },
                          { icon: '🎯', title: '가업승계 & M&A', count: 4 },
                          { icon: '🔒', title: '법인구조 & 설립', count: 4 },
                          { icon: '🔍', title: '분석 & 전략수립', count: 6 }
                        ].map((service, index) => (
                          <Card key={index} className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-border/50 hover:border-primary/30">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors text-sm">
                                  {service.icon}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {service.count}개
                                </Badge>
                              </div>
                              <CardTitle className="text-xs font-semibold group-hover:text-primary transition-colors">
                                {service.title}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      복원된 4x2 그리드 레이아웃, 글래스모피즘 호버 효과, 일관된 브랜드 컬러 적용
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 통계 섹션 */}
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">
                        📊 통계 표시 섹션
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-6 mb-4">
                        <h3 className="text-lg font-bold mb-4 text-center text-foreground dark:text-white">
                          <span className="text-primary">검증된 실적</span>과 <span className="text-primary">전문성</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          {[
                            { value: '500억원+', label: '자산관리 실적' },
                            { value: '500+', label: '법인 고객사' },
                            { value: '20년+', label: '전문 경험' },
                            { value: '98%', label: '고객 만족도' }
                          ].map((stat, index) => (
                            <div key={index}>
                              <div className="text-lg font-bold text-primary mb-1">
                                {stat.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        그라데이션 배경과 브랜드 컬러로 강조된 실적 통계
                      </p>
                    </CardContent>
                  </Card>

                  {/* 웹사이트 헤더 */}
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">
                        🧭 내비게이션 헤더
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between">
                          <FamilyOfficeLogo className="h-8 w-auto" />
                          <div className="hidden md:flex space-x-6 text-sm">
                            <span className="text-foreground hover:text-primary cursor-pointer">서비스</span>
                            <span className="text-foreground hover:text-primary cursor-pointer">소개</span>
                            <span className="text-foreground hover:text-primary cursor-pointer">블로그</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              🌙
                            </div>
                            <Button size="sm" className="text-sm">
                              무료 상담 신청
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        투명도와 블러 효과, 다크모드 토글, 일관된 브랜딩
                      </p>
                    </CardContent>
                  </Card>

                  {/* 플로팅 버튼 */}
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">
                        🎈 플로팅 액션 버튼
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="relative bg-gray-50 dark:bg-gray-700 p-8 rounded-lg mb-4 min-h-32">
                        <div className="absolute bottom-4 right-4">
                          <Button className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 rounded-full w-14 h-14">
                            <Calendar className="h-5 w-5" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          페이지 우하단에 고정된 상담 예약 버튼
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        원형 디자인, 강한 그림자 효과, 호버 애니메이션
                      </p>
                    </CardContent>
                  </Card>

                  {/* 소셜 미디어 */}
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">
                        📱 소셜 미디어 포스트
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-lg mb-4 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <FamilyOfficeLogo className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">FamilyOffice S</h4>
                            <p className="text-xs opacity-80">@familyoffice_kr</p>
                          </div>
                        </div>
                        <p className="text-sm mb-3">
                          중소중견기업 대표님들의 성공적인 자산관리를 위한 
                          맞춤형 솔루션을 제공합니다. 📈
                        </p>
                        <div className="flex items-center text-xs opacity-80">
                          <span>💬 12</span>
                          <span className="ml-4">🔄 8</span>
                          <span className="ml-4">❤️ 24</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        브랜드 컬러 그라데이션, 프로필 이미지, 일관된 메시징
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* 프레젠테이션 슬라이드 */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🎯 프레젠테이션 슬라이드
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-white border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 mb-4 dark:bg-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <FamilyOfficeLogo className="h-8 w-auto" />
                        <Badge variant="outline">Confidential</Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        중소중견기업을 위한 <span className="text-primary">통합 자산관리</span> 솔루션
                      </h2>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {['법인 지배구조', '세무 최적화', '투자 전략'].map((item, index) => (
                          <div key={index} className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">💼</div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{item}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                        2025.01.15 | FamilyOffice S
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      비즈니스 프레젠테이션에서의 브랜드 적용: 로고 위치, 컬러 활용, 레이아웃 구성
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 웹디자인 시스템 탭 */}
            <TabsContent value="webdesign" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  웹디자인 시스템
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  FamilyOffice S의 종합적인 웹디자인 시스템 - 그리드, 레이아웃, 반응형 디자인 가이드라인
                </p>

                {/* 그리드 시스템 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      📐 그리드 시스템
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">핵심 그리드 패턴</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">4열 서비스 그리드</div>
                            <div className="grid grid-cols-4 gap-1 mb-2">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-primary/20 h-6 rounded"></div>
                              ))}
                            </div>
                            <code className="text-xs text-gray-600 dark:text-gray-400">
                              grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                            </code>
                          </div>
                          
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">3열 콘텐츠 그리드</div>
                            <div className="grid grid-cols-3 gap-1 mb-2">
                              {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-blue-200 h-6 rounded"></div>
                              ))}
                            </div>
                            <code className="text-xs text-gray-600 dark:text-gray-400">
                              grid-cols-1 md:grid-cols-3
                            </code>
                          </div>
                          
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">2열 통계 그리드</div>
                            <div className="grid grid-cols-2 gap-1 mb-2">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-green-200 h-6 rounded"></div>
                              ))}
                            </div>
                            <code className="text-xs text-gray-600 dark:text-gray-400">
                              grid-cols-2 md:grid-cols-4
                            </code>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">간격 시스템</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="w-20 text-sm font-mono">gap-4</div>
                            <div className="flex gap-4">
                              <div className="w-8 h-8 bg-primary/30 rounded"></div>
                              <div className="w-8 h-8 bg-primary/30 rounded"></div>
                              <div className="w-8 h-8 bg-primary/30 rounded"></div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">16px - 기본 카드 간격</div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="w-20 text-sm font-mono">gap-6</div>
                            <div className="flex gap-6">
                              <div className="w-8 h-8 bg-primary/50 rounded"></div>
                              <div className="w-8 h-8 bg-primary/50 rounded"></div>
                              <div className="w-8 h-8 bg-primary/50 rounded"></div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">24px - 서비스 그리드</div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="w-20 text-sm font-mono">gap-8</div>
                            <div className="flex gap-8">
                              <div className="w-8 h-8 bg-primary/70 rounded"></div>
                              <div className="w-8 h-8 bg-primary/70 rounded"></div>
                              <div className="w-8 h-8 bg-primary/70 rounded"></div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">32px - 섹션 간격</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 반응형 디자인 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      📱 반응형 디자인 시스템
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">브레이크포인트</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {[
                            { name: 'Mobile', size: '< 768px', cols: '1열', example: 'grid-cols-1' },
                            { name: 'Tablet', size: '768px+', cols: '2열', example: 'md:grid-cols-2' },
                            { name: 'Desktop', size: '1024px+', cols: '4열', example: 'lg:grid-cols-4' },
                            { name: 'Large', size: '1280px+', cols: '4열+', example: 'xl:grid-cols-4' }
                          ].map((bp, index) => (
                            <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                              <div className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">{bp.name}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{bp.size}</div>
                              <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-1 rounded">{bp.example}</div>
                              <div className="text-xs text-primary mt-1">{bp.cols}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">모바일 우선 접근법</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// 모바일 우선 (Mobile First) CSS 클래스 순서
<div className="
  grid grid-cols-1          // 모바일: 1열
  md:grid-cols-2           // 태블릿: 2열 
  lg:grid-cols-4           // 데스크톱: 4열
  gap-4 md:gap-6           // 반응형 간격
  px-4 md:px-6 lg:px-8     // 반응형 패딩
">
  {/* 서비스 카드들 */}
</div>`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 레이아웃 패턴 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      🏗️ 레이아웃 패턴
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">섹션 레이아웃</h4>
                        <div className="space-y-4">
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">히어로 섹션</div>
                            <div className="bg-gradient-to-r from-primary/10 to-primary/20 h-24 rounded mb-2 flex items-center justify-center">
                              <span className="text-sm text-gray-700 dark:text-gray-200">Full-width Hero + 중앙 정렬 콘텐츠</span>
                            </div>
                            <code className="text-xs text-gray-600 dark:text-gray-400">
                              min-h-[90vh] + flex items-center justify-center
                            </code>
                          </div>
                          
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">콘텐츠 섹션</div>
                            <div className="bg-gray-100 dark:bg-gray-700 h-20 rounded mb-2 flex items-center justify-center">
                              <span className="text-sm text-gray-700 dark:text-gray-200">Container + 그리드 시스템</span>
                            </div>
                            <code className="text-xs text-gray-600 dark:text-gray-400">
                              container mx-auto px-4 + grid system
                            </code>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">컨테이너 시스템</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">기본 컨테이너</div>
                            <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                              container mx-auto px-4
                            </code>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                              최대 너비 제한 + 중앙 정렬
                            </div>
                          </div>
                          
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">풀 너비 섹션</div>
                            <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                              w-full bg-gradient-to-br
                            </code>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                              히어로, 배경 섹션용
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 애니메이션 & 인터랙션 */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                      ✨ 애니메이션 & 인터랙션
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">글래스모피즘 호버 효과</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Card className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                            <CardContent className="p-6 text-center">
                              <div className="text-2xl mb-2">🏢</div>
                              <div className="font-semibold group-hover:text-primary transition-colors">호버해보세요!</div>
                              <div className="text-sm text-gray-600 mt-2">shadow-lg + -translate-y-2</div>
                            </CardContent>
                          </Card>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                            <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
{`group hover:shadow-lg 
hover:-translate-y-2 
transition-all duration-300`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">페이지 로드 애니메이션</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-mono">slide-up</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">opacity: 0 → 1, translateY(20px) → 0</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-mono">fade-in</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">opacity: 0 → 1</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-mono">delay</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">animationDelay: '100ms'</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">색상 전환 시스템</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// 모든 색상 변화에 부드러운 전환 적용
transition-colors duration-300

// 다크모드 지원 색상 패턴
text-gray-900 dark:text-white
bg-white dark:bg-gray-800  
border-gray-200 dark:border-gray-700`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  );
}
