'use client';

import { Copy, Check, Eye, Download, Code, Palette, Award, Target, Shield, TrendingUp, Users, Building2, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { BRAND_COLORS, TYPOGRAPHY_SYSTEM } from '@/constants/brand';
import type { BrandColorSystem, TypographyCategory } from '@/types/brand';

// Executive Brand Overview Component
const ExecutiveSummary = () => (
  <div className="mb-12">
    <div className="text-center mb-8">
      <Badge className="mb-4">Executive Brand Overview</Badge>
      <h2 className="text-3xl font-bold mb-4">FamilyOffice S 브랜드 가이드라인</h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        성공한 기업가를 위한 프리미엄 패밀리오피스 서비스의 브랜드 아이덴티티 시스템
      </p>
    </div>
    
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="text-center p-6">
        <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold mb-2">신뢰성</h3>
        <p className="text-sm text-muted-foreground">삼성생명 1000억+ 자산관리 실적 기반</p>
      </Card>
      <Card className="text-center p-6">
        <Target className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold mb-2">전문성</h3>
        <p className="text-sm text-muted-foreground">중소중견기업 CEO 전용 맞춤 솔루션</p>
      </Card>
      <Card className="text-center p-6">
        <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold mb-2">프리미엄</h3>
        <p className="text-sm text-muted-foreground">VVIP 전용 고급 패밀리오피스 서비스</p>
      </Card>
      <Card className="text-center p-6">
        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold mb-2">성장지향</h3>
        <p className="text-sm text-muted-foreground">백년영속 가업승계와 자산증식 지원</p>
      </Card>
    </div>
  </div>
);

// Brand Identity Component
const BrandIdentity = () => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold mb-6">브랜드 아이덴티티</h3>
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6">
        <h4 className="text-xl font-semibold mb-4">브랜드 네임</h4>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Primary:</span>
            <p className="text-2xl font-bold text-primary">FamilyOffice S</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Subtitle:</span>
            <p className="text-lg">삼성생명 글로벌금융컨설팅</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Tagline:</span>
            <p className="text-base font-medium">"Professional, Personal, Prosperity"</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h4 className="text-xl font-semibold mb-4">브랜드 약속</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">01</Badge>
            <p className="text-sm"><strong>백년영속:</strong> 대를 이어갈 지속가능한 자산관리</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">02</Badge>
            <p className="text-sm"><strong>전문성:</strong> 삼성생명 검증된 금융 전문가 네트워크</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">03</Badge>
            <p className="text-sm"><strong>맞춤화:</strong> 중소중견기업 CEO를 위한 특화 솔루션</p>
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
  copiedColor,
  copyToClipboard,
}: {
  colors: import('@/types/brand').BrandColor[];
  title: string;
  copiedColor: string | null;
  copyToClipboard: (text: string, type: string) => void;
}) => (
  <div className="mb-8">
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {colors.map(color => (
        <Card key={color.name} className="overflow-hidden hover:shadow-md transition-shadow">
          <div
            className="h-16 w-full cursor-pointer relative group"
            style={{ backgroundColor: color.hex }}
            onClick={() => copyToClipboard(color.hex, title)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
              {copiedColor === `${title}-${color.hex}` ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Copy className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </div>
          <CardContent className="p-3">
            <h5 className="font-medium text-sm mb-1">{color.name}</h5>
            <p className="text-xs text-muted-foreground mb-1">{color.hex}</p>
            <p className="text-xs text-muted-foreground">{color.usage}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Typography Showcase Component
const TypographyShowcase = ({ system }: { system: TypographyCategory[] }) => (
  <div className="space-y-8">
    {system.map(category => (
      <div key={category.category}>
        <h4 className="text-lg font-semibold mb-4 capitalize">{category.category}</h4>
        <div className="grid gap-4">
          {category.styles.map(style => (
            <Card key={style.name} className="p-4">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div>
                  <div 
                    className="mb-2"
                    style={{
                      fontSize: style.size,
                      fontWeight: style.weight,
                      lineHeight: style.lineHeight
                    }}
                  >
                    {style.name === 'Display Large' && '패밀리오피스 브랜딩'}
                    {style.name === 'Display Medium' && '프리미엄 자산관리'}
                    {style.name === 'H1' && '브랜드 가이드라인'}
                    {style.name === 'H2' && '디자인 시스템'}
                    {style.name === 'Body Large' && '성공한 기업가를 위한 맞춤형 패밀리오피스 서비스입니다.'}
                    {!['Display Large', 'Display Medium', 'H1', 'H2', 'Body Large'].includes(style.name) && `${style.name} 스타일 예시`}
                  </div>
                  <Badge variant="outline" size="sm">{style.name}</Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Size:</strong> {style.size}</p>
                  <p><strong>Weight:</strong> {style.weight}</p>
                  <p><strong>Line Height:</strong> {style.lineHeight}</p>
                  <p><strong>Usage:</strong> {style.usage}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Component Examples
const ComponentExamples = () => (
  <div className="space-y-8">
    <div>
      <h4 className="text-lg font-semibold mb-4">버튼 시스템</h4>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <Card className="p-4 bg-muted">
        <code className="text-sm">
          {`<Button>Primary</Button>`}<br/>
          {`<Button variant="secondary">Secondary</Button>`}<br/>
          {`<Button variant="outline">Outline</Button>`}
        </code>
      </Card>
    </div>
    
    <div>
      <h4 className="text-lg font-semibold mb-4">카드 시스템</h4>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Standard Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">기본 카드 스타일입니다.</p>
          </CardContent>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle>Premium Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">프리미엄 그라디언트 카드입니다.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(`${type}-${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const brandColors: BrandColorSystem = BRAND_COLORS;
  const typographySystem: TypographyCategory[] = TYPOGRAPHY_SYSTEM;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4">Brand Guidelines v2.0</Badge>
            <h1 className="text-4xl font-bold mb-4">FamilyOffice S</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Professional Brand Guidelines for Premium Family Office Services
            </p>
            <div className="flex justify-center gap-4">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Brand Assets
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Style Guide
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="identity">Identity</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-8">
                <ExecutiveSummary />
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Target Audience</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><Building2 className="h-4 w-4" />중소중견기업 CEO (40-60세)</li>
                      <li className="flex items-center gap-2"><Users className="h-4 w-4" />연 매출 100억원 이상 기업 경영진</li>
                      <li className="flex items-center gap-2"><Award className="h-4 w-4" />프리미엄 자산관리 서비스 선호</li>
                    </ul>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Brand Positioning</h3>
                    <div className="space-y-3 text-sm">
                      <p><strong>Category:</strong> Premium Family Office Services</p>
                      <p><strong>Positioning:</strong> 성공한 기업가를 위한 통합 자산관리 파트너</p>
                      <p><strong>Differentiation:</strong> 삼성생명 백그라운드 + AI 기술력</p>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="identity" className="mt-8">
                <BrandIdentity />
              </TabsContent>
              
              <TabsContent value="colors" className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Color System</h3>
                <ColorPalette 
                  colors={brandColors.primary} 
                  title="Primary Colors" 
                  copiedColor={copiedColor} 
                  copyToClipboard={copyToClipboard} 
                />
                <ColorPalette 
                  colors={brandColors.secondary} 
                  title="Secondary Colors" 
                  copiedColor={copiedColor} 
                  copyToClipboard={copyToClipboard} 
                />
                <ColorPalette 
                  colors={brandColors.neutral} 
                  title="Neutral Colors" 
                  copiedColor={copiedColor} 
                  copyToClipboard={copyToClipboard} 
                />
              </TabsContent>
              
              <TabsContent value="typography" className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Typography System</h3>
                <TypographyShowcase system={typographySystem} />
              </TabsContent>
              
              <TabsContent value="components" className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Component Library</h3>
                <ComponentExamples />
              </TabsContent>
              
              <TabsContent value="guidelines" className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Implementation Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h4 className="text-lg font-semibold mb-4">CSS Design Tokens</h4>
                    <div className="bg-muted p-4 rounded-lg text-sm font-mono space-y-1">
                      <p>--primary: hsl(221, 83%, 53%);</p>
                      <p>--primary-foreground: hsl(210, 40%, 98%);</p>
                      <p>--secondary: hsl(210, 40%, 96%);</p>
                      <p>--muted: hsl(210, 40%, 96%);</p>
                      <p>--accent: hsl(210, 40%, 96%);</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <h4 className="text-lg font-semibold mb-4">Accessibility Standards</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />WCAG 2.1 AA 준수</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />4.5:1 최소 대비율</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />키보드 네비게이션 지원</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />스크린 리더 호환성</li>
                    </ul>
                  </Card>
                </div>
                
                <Card className="p-6 mt-8">
                  <h4 className="text-lg font-semibold mb-4">Brand Compliance Checklist</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Design Requirements</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />브랜드 컬러 시스템 사용</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />타이포그래피 스케일 준수</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />일관된 스페이싱 적용</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />반응형 디자인 구현</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Content Guidelines</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />프리미엄 톤앤매너 유지</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />전문용어 적절한 사용</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />한글 맞춤법 검수</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3" />삼성생명 파트너십 명시</li>
                      </ul>
                    </div>
                  </div>
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