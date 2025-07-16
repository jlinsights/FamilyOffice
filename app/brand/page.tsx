"use client"

import { useState } from "react";
import { FamilyOfficeLogo } from "@/components/logo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Copy, Check, Palette, ArrowRight } from "lucide-react";
import { BRAND_COLORS, TYPOGRAPHY_SYSTEM } from "@/constants/brand";
import type { BrandColorSystem, TypographyCategory } from "@/types/brand";
import BrandExcellenceSection from "@/components/brand-excellence-section";
import LogoShowcaseCard from "@/components/logo-showcase-card";

// ColorPalette 컴포넌트 정의를 함수 바깥으로 이동 및 props 확장
const ColorPalette = ({
  colors,
  title,
  copiedColor,
  copyToClipboard,
}: {
  colors: import("@/types/brand").BrandColor[];
  title: string;
  copiedColor: string | null;
  copyToClipboard: (text: string, type: string) => void;
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {colors.map((color) => (
        <Card key={color.name} className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl">
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
              <h4 className="font-medium text-sm text-gray-900 dark:text-white transition-colors duration-300">{color.name}</h4>
              <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-300">{color.hex}</Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">RGB: {color.rgb}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">{color.usage}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("brand");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(`${type}-${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // 타입 명확화: BRAND_COLORS, TYPOGRAPHY_SYSTEM, BRAND_VALUES
  const brandColors: BrandColorSystem = BRAND_COLORS;
  const typographySystem: TypographyCategory[] = TYPOGRAPHY_SYSTEM;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
          {/* 배경 그라데이션 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          
          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            {/* 상단 태그 */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="animate-fade-in bg-background/80 backdrop-blur-sm">
                <Palette className="h-3 w-3 mr-1" />
                Brand Guidelines
              </Badge>
            </div>
            
            {/* 메인 헤드라인 */}
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              FamilyOffice S{"\\n"}<span className="text-foreground">브랜드 가이드라인</span>
            </h1>
            
            {/* 서브 헤드라인 */}
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Professional, Personal, Prosperity
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
              <span className="font-semibold text-foreground">신뢰 기반 프리미엄 자산관리</span> 브랜드의 일관된 아이덴티티와 <span className="font-semibold text-primary">브랜드 표준</span>을 제시합니다
            </p>
            
            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg">
                브랜드 가이드 다운로드
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="font-bold shadow-lg px-8 py-4 text-lg">
                <Copy className="mr-2 h-5 w-5" />
                로고 에셋 다운로드
              </Button>
            </div>
            
            {/* 버전 정보 */}
            <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
              <Badge variant="secondary" className="text-sm">
                Version 1.0 | 2025
              </Badge>
            </div>
          </div>
        </section>
        {/* === Main Content === */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* === 탭 리스트 (프리미엄 스타일) === */}
            <TabsList className="flex flex-wrap justify-center gap-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-2 mb-8">
              <TabsTrigger value="brand" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">브랜드</TabsTrigger>
              <TabsTrigger value="logo" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">로고 시스템</TabsTrigger>
              <TabsTrigger value="colors" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">컬러 시스템</TabsTrigger>
              <TabsTrigger value="typography" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">타이포그라피</TabsTrigger>
              <TabsTrigger value="components" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">UI 컴포넌트</TabsTrigger>
              <TabsTrigger value="code" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">코드 가이드</TabsTrigger>
              <TabsTrigger value="examples" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">활용 사례</TabsTrigger>
              <TabsTrigger value="webdesign" className="px-6 py-2 rounded-t-lg font-semibold text-blue-700 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 dark:text-blue-200 data-[state=active]:dark:bg-blue-900 data-[state=active]:dark:text-blue-200 data-[state=inactive]:dark:bg-gray-900 data-[state=inactive]:dark:text-gray-400 transition-all duration-300">웹디자인 시스템</TabsTrigger>
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
                        FamilyOffice S Brand Guidelines
                      </span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                      Professional, Personal, Prosperity - 신뢰 기반 프리미엄 자산관리 브랜드
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
                  <span className="inline-block text-blue-600 dark:text-blue-400">◎</span> Brand Identity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Brand Name */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-start shadow-sm">
                    <span className="text-sm font-semibold text-gray-500 mb-2">Brand Name</span>
                    <span className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">FamilyOffice S</span>
                  </div>
                  {/* Brand Essence */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-start shadow-sm">
                    <span className="text-sm font-semibold text-gray-500 mb-2">Brand Essence</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">신뢰 기반의 전문적이고 개인화된 프리미엄 자산관리 파트너십</span>
                  </div>
                  {/* Brand Promise */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-start shadow-sm">
                    <span className="text-sm font-semibold text-gray-500 mb-2">Brand Promise</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">초고액자산가를 위한 전략적 파트너십을 통해 성공과 지속가능성을 동시에 실현</span>
                  </div>
                </div>
              </section>

              {/* === Brand Messages Section === */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-purple-600 dark:text-purple-400">T</span> Brand Messages
                </h2>
                {/* Taglines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Primary Tagline */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">Primary Tagline</span>
                    <div className="text-base font-medium text-gray-800 dark:text-gray-100 mb-1">"Your Trusted Financial Partner for Life"</div>
                    <div className="text-base text-gray-600 dark:text-gray-300">"평생을 함께하는 신뢰할 수 있는 금융 파트너"</div>
                  </div>
                  {/* Secondary Tagline */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">Secondary Tagline</span>
                    <div className="text-base font-medium text-gray-800 dark:text-gray-100 mb-1">"Professional. Personal. Prosperity."</div>
                    <div className="text-base text-gray-600 dark:text-gray-300">"전문적. 개인적. 번영."</div>
                  </div>
                </div>
                {/* Brand Statement */}
                <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 mb-6 shadow-sm">
                  <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">Brand Statement</span>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">English:</span>
                    <span className="text-gray-800 dark:text-gray-100">
                      "FamilyOffice S is your trusted financial partner, dedicated to providing sophisticated wealth management expertise and personalized solutions that ensure sustainable prosperity for you and your family's future."
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">Korean:</span>
                    <span className="text-gray-800 dark:text-gray-100">
                      "FamilyOffice S는 신뢰할 수 있는 금융 파트너로서, 정교한 자산관리 전문성과 개인 맞춤형 솔루션을 통해 고객님과 가족의 미래를 위한 지속가능한 번영을 보장합니다."
                    </span>
                  </div>
                </div>
                {/* Elevator Pitch */}
                <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                  <span className="text-lg font-bold text-gray-900 dark:text-white mb-2 block">Elevator Pitch</span>
                  <div className="text-gray-800 dark:text-gray-100">
                    "FamilyOffice S는 고객의 평생 금융 파트너로서 신뢰를 바탕으로 한 프리미엄 패밀리오피스입니다. 우리는 Professional한 전문성, Personal한 맞춤 서비스, 그리고 Prosperity한 미래를 통해 중소중견기업 법인 대표님들의 성공적인 자산관리와 가족의 지속가능한 번영을 실현합니다."
                  </div>
                </div>
              </section>

              {/* === Core Values & Differentiators Section === */}
              <section className="mb-10">
                {/* Core Values */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-yellow-500">🧑‍💼</span> Core Values
                </h2>
                {/* 핵심 가치 배열 선언 */}
                {(() => {
                  const values = [
                    {
                      icon: <svg className="w-7 h-7 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" /></svg>,
                      title: 'Strategic Excellence',
                      subtitle: '전략적 우수성',
                    },
                    {
                      icon: <svg className="w-7 h-7 text-purple-500 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v6m0 0a4 4 0 100 8 4 4 0 000-8zm0 8v6" /></svg>,
                      title: 'Sophisticated Solutions',
                      subtitle: '고도화된 솔루션',
                    },
                    {
                      icon: <svg className="w-7 h-7 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 7l-7.5 7.5-3.5-3.5" /></svg>,
                      title: 'Personal Partnership',
                      subtitle: '개인적 파트너십',
                    },
                    {
                      icon: <svg className="w-7 h-7 text-emerald-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" /></svg>,
                      title: 'Sustainable Growth',
                      subtitle: '지속가능한 성장',
                    },
                    {
                      icon: <svg className="w-7 h-7 text-orange-500 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
                      title: 'Superior Service',
                      subtitle: '차별화된 서비스',
                    },
                  ];
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                      {values.map((v, i) => (
                        <div key={i} className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-sm">
                          {v.icon}
                          <div className="font-semibold text-gray-900 dark:text-white text-base mb-1">{v.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{v.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                {/* Core Differentiators */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="inline-block text-purple-500">✈️</span> Core Differentiators
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
                        <div key={i} className="border rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                          <div className={`font-bold text-2xl mb-2 ${d.color}`}>{d.title}</div>
                          <div className="text-gray-700 dark:text-gray-200 text-base">{d.desc}</div>
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
                      <span className="text-pink-500">✨</span> Brand Personality
                    </h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Professional', desc: '전문성과 신뢰성', color: 'bg-blue-100 text-blue-700' },
                        { label: 'Innovative', desc: '혁신적 사고와 접근', color: 'bg-blue-100 text-blue-500' },
                        { label: 'Sophisticated', desc: '세련되고 고도화된 서비스', color: 'bg-blue-100 text-blue-400' },
                        { label: 'Trustworthy', desc: '신뢰할 수 있는 파트너', color: 'bg-blue-100 text-blue-600' },
                        { label: 'Exclusive', desc: '프리미엄 고객 대상의 특별함', color: 'bg-blue-100 text-blue-800' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full font-semibold text-sm ${item.color} border border-blue-200 mr-2`}>{item.label}</span>
                          <span className="text-gray-700 dark:text-gray-200 text-base">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Usage Guidelines 카드 */}
                  <div className="border rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-green-500">✔️</span> Usage Guidelines
                    </h2>
                    <div className="mb-6">
                      <div className="text-xl font-bold text-green-600 mb-2">Do's</div>
                      <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-100">
                        <li>신뢰와 파트너십 가치 강조</li>
                        <li>Professional한 이미지 유지</li>
                        <li>Personal한 맞춤 서비스 명확화</li>
                        <li>Premium 고객층에 적합한 커뮤니케이션</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-600 mb-2">Don'ts</div>
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
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">브랜드 핵심 가치</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  {[
                    {
                      icon: <svg className="w-8 h-8 text-blue-500 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" /></svg>,
                      title: '신뢰성 (Trust)',
                      desc: '중소중견기업 법인 대표님의 자산을 안전하게 관리하는 신뢰할 수 있는 파트너',
                    },
                    {
                      icon: <svg className="w-8 h-8 text-emerald-500 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
                      title: '전문성 (Expertise)',
                      desc: '20여년의 중소중견기업 전문 노하우와 최신 금융 트렌드를 결합한 전문 서비스',
                    },
                    {
                      icon: <svg className="w-8 h-8 text-purple-500 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>,
                      title: '개인화 (Personalization)',
                      desc: '고객 중심의 맞춤형 자산관리 솔루션으로 각각의 고유한 요구사항 충족',
                    },
                    {
                      icon: <svg className="w-8 h-8 text-orange-400 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 7l-7.5 7.5-3.5-3.5" /></svg>,
                      title: '혁신성 (Innovation)',
                      desc: '최신 기술과 시스템을 활용한 차별화된 통합 자산관리 플랫폼',
                    },
                  ].map((item, i) => (
                    <div key={i} className="border rounded-xl bg-white dark:bg-gray-800 p-8 flex flex-col items-center shadow-sm">
                      {item.icon}
                      <div className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white mb-2 text-center">{item.title}</div>
                      <div className="text-gray-700 dark:text-gray-200 text-base text-center">{item.desc}</div>
                    </div>
                  ))}
                </div>
                {/* 디자인 철학 */}
                <div className="max-w-5xl mx-auto">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">디자인 철학</h3>
                  <div className="text-gray-700 dark:text-gray-300 mb-6">FamilyOffice S의 디자인 원칙과 접근 방식</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">모던 미니멀리즘</div>
                      <div className="text-gray-700 dark:text-gray-300">불필요한 요소를 제거하고 핵심에 집중하는 깔끔한 디자인으로 전문성과 신뢰성을 표현합니다.</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">반응형 적용</div>
                      <div className="text-gray-700 dark:text-gray-300">다양한 디바이스와 환경에서 일관된 경험을 제공하는 적응형 디자인을 구현합니다.</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">사용자 중심</div>
                      <div className="text-gray-700 dark:text-gray-300">바쁜 경영진들이 쉽고 빠르게 정보를 찾을 수 있도록 직관적인 인터페이스를 제공합니다.</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">접근성 우선</div>
                      <div className="text-gray-700 dark:text-gray-300">모든 사용자가 접근할 수 있는 포용적 디자인으로 다크모드와 고대비 모드를 지원합니다.</div>
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
                      <span className="text-blue-600 dark:text-blue-400">{/* 아이콘 */}
                        <svg className="w-6 h-6 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" /></svg>
                      </span>
                      로고 시스템
                    </h2>
                    <div className="text-gray-500 dark:text-gray-300 text-base">브랜드 아이덴티티의 핵심 · 완전 적용형 로고</div>
                  </div>
                  <div className="flex flex-col items-center mt-6 md:mt-0">
                    {/* 대표 로고 (라이트/다크 자동 전환) */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center">
                      <FamilyOfficeLogo className="w-56 h-16" />
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">라이트/다크 모드 자동 적용형 로고</div>
                  </div>
                </div>
                {/* === 2열: 핵심 원칙 & 주의사항 === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* 핵심 원칙 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xl font-bold text-green-600">핵심 원칙</span>
                    </div>
                    <ul className="text-gray-700 dark:text-gray-200 text-base space-y-1 mb-4">
                      <li><b>일관성:</b> 모든 접점에서 동일한 로고 사용</li>
                      <li><b>가독성:</b> 최소 크기 120px 이상 유지</li>
                      <li><b>적용성:</b> 라이트/다크 모드 모두 자동 전환</li>
                      <li><b>품질:</b> 고해상도 벡터 형태 사용</li>
                      </ul>
                  </div>
                  {/* 주의사항 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-xl font-bold text-orange-500">주의사항</span>
                    </div>
                    <ul className="text-gray-700 dark:text-gray-200 text-base space-y-1 mb-4">
                      <li>로고 비율이나 색상 임의 변경 금지</li>
                      <li><b>Playfair Display</b> 폰트 외 사용 금지</li>
                      <li>태그라인 위치나 내용 수정 금지</li>
                      <li>저해상도 이미지 사용 금지</li>
                      </ul>
                  </div>
                </div>
                {/* === React 컴포넌트 안내 === */}
                <div className="mb-4">
                  <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">React 컴포넌트</div>
                  <div className="text-gray-500 dark:text-gray-300 text-base mb-2">재사용 가능한 React 로고 컴포넌트들</div>
                </div>
                {/* === 3종류 로고 카드 === */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 기본 로고 */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-sm">
                    <div className="font-bold text-base text-gray-900 dark:text-white mb-1">기본 로고</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">태그라인 포함, 다국어 지원</div>
                    <FamilyOfficeLogo className="w-40 h-12" />
                  </div>
                  {/* 미니멀 로고 */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-sm">
                    <div className="font-bold text-base text-gray-900 dark:text-white mb-1">미니멀 로고</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">헤더, 내비게이션용</div>
                    <FamilyOfficeLogo className="w-32 h-10" />
                  </div>
                  {/* 프리미엄 로고 */}
                  <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-sm">
                    <div className="font-bold text-base text-gray-900 dark:text-white mb-1">프리미엄 로고</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">특별한 페이지, 랜딩용</div>
                    <FamilyOfficeLogo className="w-48 h-14" />
                </div>
              </div>
              </section>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 컬러 시스템 탭 */}
            <TabsContent value="colors" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">컬러 시스템</h2>
                <ColorPalette colors={brandColors.primary} title="Primary Colors" copiedColor={copiedColor} copyToClipboard={copyToClipboard} />
                <ColorPalette colors={brandColors.neutral} title="Neutral Colors" copiedColor={copiedColor} copyToClipboard={copyToClipboard} />
                <ColorPalette colors={brandColors.accent} title="Accent Colors" copiedColor={copiedColor} copyToClipboard={copyToClipboard} />
                <ColorPalette colors={brandColors.status} title="Status Colors" copiedColor={copiedColor} copyToClipboard={copyToClipboard} />
              </div>
              {/* === Brand Excellence 안내 섹션 (공통) === */}
              <BrandExcellenceSection />
            </TabsContent>

            {/* 타이포그라피 탭 */}
            <TabsContent value="typography" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">타이포그라피</h2>
                {typographySystem.map((category) => (
                  <div key={category.category} className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">{category.category}</h3>
                    <div className="space-y-4">
                      {category.variants.map((variant) => (
                        <Card key={variant.name} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">{variant.name}</h4>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                  <p>폰트: {variant.font} {variant.weight}</p>
                                  <p>크기: {variant.size}</p>
                                  <p>줄 높이: {variant.lineHeight}</p>
                                  <p>용도: {variant.usage}</p>
                                </div>
                              </div>
                              <div>
                                <p 
                                  className={`${variant.name === 'Display Large' ? 'text-6xl' : 
                                    variant.name === 'Display Medium' ? 'text-5xl' :
                                    variant.name === 'Display Small' ? 'text-4xl' :
                                    variant.name === 'H1' ? 'text-3xl' :
                                    variant.name === 'H2' ? 'text-2xl' :
                                    variant.name === 'H3' ? 'text-xl' :
                                    variant.name === 'Large' ? 'text-lg' :
                                    variant.name === 'Medium' ? 'text-base' : 'text-sm'
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">UI 컴포넌트</h2>
                
                {/* 버튼 컴포넌트 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Button Components</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <Button>Primary Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 카드 컴포넌트 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Card Components</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">기본 카드</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-300">기본 카드 스타일입니다.</p>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-200 dark:border-blue-700 shadow-md dark:bg-gray-800">
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">강조 카드</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-300">강조된 카드 스타일입니다.</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">배경 카드</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-300">배경색이 있는 카드입니다.</p>
                        </CardContent>
                      </Card>
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">코드 가이드라인</h2>
                
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Tailwind CSS 클래스 명명 규칙</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                      <pre className="text-sm text-gray-800 dark:text-gray-200">
{"// 기본 구조\n"}
{"<div className=\"container mx-auto px-4\">\n"}
{"  <h1 className=\"text-3xl font-bold text-gray-900 dark:text-white mb-6\">\n"}
{"    제목\n"}
{"  </h1>\n"}
{"  <p className=\"text-lg text-gray-600 dark:text-gray-300 leading-relaxed\">\n"}
{"    본문 내용\n"}
{"  </p>\n"}
{"</div>"}
                      </pre>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      일관된 스타일링을 위해 Tailwind CSS 유틸리티 클래스를 사용합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">컴포넌트 구조</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                      <pre className="text-sm text-gray-800 dark:text-gray-200">
{"// 재사용 가능한 컴포넌트 예시\n"}
{"interface CardProps {\n"}
{"  title: string;\n"}
{"  description: string;\n"}
{"  className?: string;\n"}
{"}\n\n"}
{"export function CustomCard({ title, description, className }: CardProps) {\n"}
{"  return (\n"}
{"    <Card className={`p-6 \\${className}`}>\n"}
{"      <CardHeader>\n"}
{"        <CardTitle>\\{title\\}</CardTitle>\n"}
{"      </CardHeader>\n"}
{"      <CardContent>\n"}
{"        <p className=\"text-gray-600\">\\{description\\}</p>\n"}
{"      </CardContent>\n"}
{"    </Card>\n"}
{"  );\n"}
{"}"}
                      </pre>
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">활용 사례</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">웹사이트 헤더</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                        <div className="flex items-center justify-between">
                          <FamilyOfficeLogo className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                          <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">서비스</Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">소개</Button>
                            <Button size="sm">문의하기</Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        웹사이트 상단 내비게이션에서의 로고와 버튼 활용 예시
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">명함 디자인</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-6 rounded-lg mb-4 shadow-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">김패밀리</h4>
                            <p className="text-sm opacity-90">자산관리 전문가</p>
                            <p className="text-xs opacity-75 mt-2">contact@familyoffice.co.kr</p>
                          </div>
                          <FamilyOfficeLogo className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        브랜드 컬러를 활용한 명함 디자인 예시
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-gray-900 dark:text-white">소셜 미디어</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-4 text-center border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                        <FamilyOfficeLogo className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">FamilyOffice S</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">가족의 미래를 위한 자산관리</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        SNS 프로필 및 포스트에서의 브랜드 활용 방법
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>프레젠테이션</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white border-2 border-gray-200 p-6 rounded-lg mb-4">
                        <div className="flex items-center mb-4">
                          <FamilyOfficeLogo className="w-8 h-8 mr-3" />
                          <h4 className="font-bold">자산관리 전략 제안서</h4>
                        </div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        비즈니스 프레젠테이션에서의 브랜드 요소 활용
                      </p>
                    </CardContent>
                  </Card>
                </div>
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