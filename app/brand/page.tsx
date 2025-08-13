"use client"

import { useState } from "react";
import { FamilyOfficeLogo } from "@/components/logo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Download, Copy, Check, Eye, Code, Palette, Type, Component, BookOpen, Lightbulb } from "lucide-react";
import { BRAND_COLORS, TYPOGRAPHY_SYSTEM, BRAND_VALUES } from "@/constants/brand";
import type { BrandColorSystem, TypographyCategory, BrandValue } from "@/types/brand";

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
  const brandValues: BrandValue[] = BRAND_VALUES;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900/20 py-20 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <FamilyOfficeLogo className="w-24 h-24 mx-auto mb-8 dark:filter dark:brightness-110" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              FamilyOffice S 브랜드 시스템
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-300">
              일관되고 신뢰할 수 있는 브랜드 경험을 위한 디자인 시스템과 가이드라인
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
                <Download className="w-4 h-4 mr-2" />
                브랜드 키트 다운로드
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                <Eye className="w-4 h-4 mr-2" />
                활용 가이드 보기
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 transition-colors duration-300">
              <TabsTrigger value="brand" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <Lightbulb className="w-4 h-4" />
                브랜드
              </TabsTrigger>
              <TabsTrigger value="logo" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <Component className="w-4 h-4" />
                로고 시스템
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <Palette className="w-4 h-4" />
                컬러 시스템
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <Type className="w-4 h-4" />
                타이포그라피
              </TabsTrigger>
              <TabsTrigger value="components" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <Component className="w-4 h-4" />
                UI 컴포넌트
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <Code className="w-4 h-4" />
                코드 가이드
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white transition-all duration-300">
                <BookOpen className="w-4 h-4" />
                활용 사례
              </TabsTrigger>
            </TabsList>

            {/* 브랜드 정체성 탭 */}
            <TabsContent value="brand" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">브랜드 정체성</h2>
                
                {/* 브랜드 비전 */}
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

                {/* 브랜드 핵심 가치 */}
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

                {/* 브랜드 개성 */}
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
            </TabsContent>

            {/* 로고 시스템 탭 */}
            <TabsContent value="logo" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">로고 시스템</h2>
                
                {/* 메인 로고 */}
                <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">메인 로고</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center mb-6 transition-colors duration-300">
                      <FamilyOfficeLogo className="w-32 h-32 mx-auto text-gray-900 dark:text-white" />
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        SVG 다운로드
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        PNG 다운로드
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        JPG 다운로드
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* 로고 사용 가이드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-green-600 dark:text-green-400">올바른 사용</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        <li>• 충분한 여백 유지 (로고 높이의 1/2 이상)</li>
                        <li>• 명확한 배경과의 대비</li>
                        <li>• 원본 비율 유지</li>
                        <li>• 브랜드 컬러 사용</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-red-600 dark:text-red-400">잘못된 사용</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        <li>• 로고 왜곡이나 변형</li>
                        <li>• 불충분한 여백</li>
                        <li>• 낮은 대비의 배경</li>
                        <li>• 브랜드 컬러 변경</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
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
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  );
} 