'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  FileText, 
  BookOpen, 
  PresentationIcon, 
  FileBarChart,
  Search,
  Filter,
  Briefcase,
  Lock
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Client component로 변경되어 metadata 주석 처리
// SEO metadata는 layout.tsx에서 처리됩니다

const resourceCategories = [
  {
    title: '투자 가이드',
    icon: BookOpen,
    count: 25,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: '시장 보고서',
    icon: FileBarChart,
    count: 18,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: '세미나 자료',
    icon: PresentationIcon,
    count: 32,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'CEO 가이드북',
    icon: Briefcase,
    count: 15,
    color: 'from-orange-500 to-orange-600',
  },
];

const featuredResources = [
  {
    category: '기업 위험관리',
    title: '기업 Risk관리를 위한 가치 제안서',
    description: '산업재해로 인한 리스크 관리 전략과 솔루션, 기업재해보장보험 등 리스크 관리 방안 제시',
    fileSize: '2.8 MB',
    format: 'PDF',
    date: '2025.01.28',
    downloads: 125,
    isPremium: false,
    downloadUrl: 'https://pub-66c6dc2fd6894c5687d260702159ac9a.r2.dev/23%200228_%20%EB%8B%A8%EC%B2%B4%20%EC%A0%9C%EC%95%88%EC%84%9C(%EC%8A%B9%EC%9D%B8%E5%AE%8C).pdf',
  },
  {
    category: 'CEO 보장자산',
    title: '가정과 회사의 중심인 CEO는 보장자산이 필요합니다',
    description: '산재 혜택을 받지 못하는 CEO를 위한 보장자산 가이드. 건강보험, 재직中 보험료 납입, 수익자 지정 전략',
    fileSize: '4.5 MB',
    format: 'PDF',
    date: '2025.01.15',
    downloads: 890,
    isPremium: true,
    isHighlight: true,
  },
  {
    category: '투자 가이드',
    title: '2025년 글로벌 자산배분 전략 가이드',
    description: '불확실한 시장 환경에서 안정적인 수익을 추구하는 포트폴리오 구성 전략',
    fileSize: '3.2 MB',
    format: 'PDF',
    date: '2025.01.10',
    downloads: 1250,
    isPremium: true,
  },
  {
    category: 'CEO 가이드북',
    title: '가족법인 설립 실무 가이드북',
    description: '상속세 절감을 위한 가족법인 설립의 A부터 Z까지 상세 매뉴얼',
    fileSize: '5.8 MB',
    format: 'PDF',
    date: '2025.01.08',
    downloads: 890,
    isPremium: true,
  },
  {
    category: '시장 보고서',
    title: '2025년 1분기 한국 부동산 시장 전망',
    description: '주요 지역별 부동산 시장 동향과 투자 기회 분석',
    fileSize: '4.1 MB',
    format: 'PDF',
    date: '2025.01.05',
    downloads: 780,
    isPremium: false,
  },
  {
    category: '세미나 자료',
    title: '중대재해처벌법 대응 전략 세미나',
    description: 'CEO가 반드시 알아야 할 중대재해처벌법 핵심 내용과 대응 방안',
    fileSize: '2.5 MB',
    format: 'PPT',
    date: '2024.12.20',
    downloads: 2100,
    isPremium: false,
  },
  {
    category: '투자 가이드',
    title: 'ESG 투자 실무 가이드',
    description: 'ESG 투자의 기본 개념부터 실제 투자 전략까지',
    fileSize: '3.8 MB',
    format: 'PDF',
    date: '2024.12.15',
    downloads: 650,
    isPremium: false,
  },
  {
    category: '퇴직연금',
    title: '삼성생명 퇴직연금 제안서',
    description: '기업 퇴직연금 운용 전략과 임직원 노후준비 솔루션 가이드',
    fileSize: '4.1 MB',
    format: 'PDF',
    date: '2025.01.28',
    downloads: 320,
    isPremium: false,
    downloadUrl: 'https://pub-66c6dc2fd6894c5687d260702159ac9a.r2.dev/%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%A5%E1%86%BC%E1%84%89%E1%85%A2%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC%20%E1%84%90%E1%85%AC%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%B3%E1%86%B7%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5_%E1%84%8B%E1%85%B5%E1%86%B7%E1%84%8C%E1%85%A2%E1%84%92%E1%85%A9%E1%86%BC.pdf',
  },
];

const recentDownloads = [
  '가족법인 설립 실무 가이드북',
  '2025년 글로벌 자산배분 전략 가이드',
  '중대재해처벌법 대응 전략 세미나',
  '삼성생명 퇴직연금 제안서',
  '2025년 1분기 한국 부동산 시장 전망',
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              자료실
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              투자 전략, 시장 분석, 세무 가이드 등 FamilyOffice S가 엄선한
              <br />
              프리미엄 자료를 다운로드하여 실무에 활용하세요.
            </p>
            
            <div className="max-w-xl mx-auto flex gap-2">
              <Input
                placeholder="자료 검색..."
                className="flex-1"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer border border-border"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}개 자료</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              추천 자료
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">최신순</Button>
              <Button variant="outline" size="sm">인기순</Button>
              <Button variant="outline" size="sm">카테고리별</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="bg-card hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{resource.category}</Badge>
                    {resource.isPremium && (
                      <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {resource.format}
                      </span>
                      <span>{resource.fileSize}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {resource.downloads.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {resource.date}
                    </span>
                    <Button 
                      size="sm" 
                      className="hover:scale-105 transition-transform duration-300"
                      onClick={() => {
                        const resourceWithUrl = resource as any;
                        if (resourceWithUrl.downloadUrl) {
                          // Cloudflare R2 외부 링크는 새 탭에서 열기
                          window.open(resourceWithUrl.downloadUrl, '_blank');
                        } else if (resourceWithUrl.downloadPath) {
                          // 로컬 파일은 다운로드
                          const link = document.createElement('a');
                          link.href = resourceWithUrl.downloadPath;
                          link.download = `${resource.title}.pdf`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              모든 자료 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Downloads */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                자료실 이용 안내
              </h2>
              
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      무료 자료
                    </h3>
                    <p className="text-card-foreground/80 mb-4">
                      회원 가입 후 무료로 다운로드 가능한 자료입니다. 시장 동향, 기본 투자 가이드 등 유용한 정보를 제공합니다.
                    </p>
                    <Button variant="outline" size="sm">
                      무료 자료 보기
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      프리미엄 자료
                    </h3>
                    <p className="text-card-foreground/80 mb-4">
                      FamilyOffice S 회원 전용 자료입니다. 심층 분석 리포트, 실무 가이드북 등 차별화된 콘텐츠를 제공합니다.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">
                        회원 가입
                      </Button>
                      <Button variant="outline" size="sm">
                        혜택 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      맞춤 자료 요청
                    </h3>
                    <p className="text-card-foreground/80 mb-4">
                      특정 주제나 업종에 대한 맞춤형 자료가 필요하신가요? 전문가가 직접 작성하는 맞춤 리포트를 요청하세요.
                    </p>
                    <Button variant="outline" size="sm">
                      자료 요청하기
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">
                최근 인기 자료
              </h3>
              
              <div className="space-y-3">
                {recentDownloads.map((title, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-card rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer border border-border"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  💡 알고 계셨나요?
                </h4>
                <p className="text-sm text-foreground/70">
                  매월 첫째 주에는 새로운 시장 분석 리포트가 업데이트됩니다. 
                  뉴스레터 구독자는 신규 자료 알림을 가장 먼저 받아보실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            더 많은 자료가 필요하신가요?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            FamilyOffice S 회원이 되시면 모든 프리미엄 자료를 무제한으로 이용하실 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform duration-300">
              회원 가입하기
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 dark:text-white dark:border-white">
              자료 요청하기
            </Button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}