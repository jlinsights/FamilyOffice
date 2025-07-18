import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CalendarDays, 
  Clock, 
  User, 
  FileText, 
  Search,
  ArrowRight,
  BookOpen,
  Globe,
  BarChart3,
  Target,
  Users
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Korea Market Insights Blog | Business Analysis & Strategic Partnership',
  description: 'Latest insights on Korea market trends, strategic partnerships, regulatory changes, and business development opportunities for global companies.',
  keywords: 'Korea market insights, business analysis Korea, strategic partnership blog, Korea regulatory updates, market entry insights',
  openGraph: {
    title: 'Korea Market Insights Blog | FamilyOffices.vip',
    description: 'Expert insights and analysis on Korea market trends and strategic partnerships.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
  },
}

const blogCategories = [
  {
    name: "Market Entry Strategies",
    slug: "market-entry",
    icon: <Target className="h-5 w-5" />,
    count: 15,
    description: "전략적 시장 진입 방법론"
  },
  {
    name: "Financial Services",
    slug: "financial-services", 
    icon: <BarChart3 className="h-5 w-5" />,
    count: 12,
    description: "금융 서비스 산업 동향"
  },
  {
    name: "Regulatory Updates",
    slug: "regulatory",
    icon: <FileText className="h-5 w-5" />,
    count: 8,
    description: "규제 변화 및 분석"
  },
  {
    name: "Cultural Insights",
    slug: "culture",
    icon: <Globe className="h-5 w-5" />,
    count: 10,
    description: "한국 비즈니스 문화 이해"
  },
  {
    name: "Success Stories",
    slug: "success-stories",
    icon: <Users className="h-5 w-5" />,
    count: 6,
    description: "성공 사례 분석"
  }
]

const featuredPosts = [
  {
    id: 1,
    title: "Korea's Financial Services Sector: Opportunities for Global Asset Managers",
    excerpt: "한국 금융 서비스 시장의 최신 동향과 글로벌 자산 운용사들을 위한 기회를 분석합니다.",
    category: "Financial Services",
    author: "Jaehong Lim",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/blog/financial-services-korea.jpg",
    slug: "korea-financial-services-opportunities",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Korean Business Culture: Key Success Factors",
    excerpt: "한국 비즈니스 문화를 이해하고 성공적인 파트너십을 구축하는 핵심 요소들을 살펴봅니다.",
    category: "Cultural Insights",
    author: "Jaehong Lim",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/blog/korean-business-culture.jpg",
    slug: "korean-business-culture-success-factors",
    featured: true
  },
  {
    id: 3,
    title: "Regulatory Changes in Korea's Investment Industry: Q1 2024 Update",
    excerpt: "2024년 1분기 한국 투자 산업의 주요 규제 변화와 그 영향을 분석합니다.",
    category: "Regulatory Updates",
    author: "Jaehong Lim",
    date: "2024-01-05",
    readTime: "4 min read",
    image: "/blog/regulatory-changes-2024.jpg",
    slug: "regulatory-changes-investment-industry-q1-2024",
    featured: true
  }
]

const recentPosts = [
  {
    id: 4,
    title: "Strategic Partnership Models: Lessons from European Firms",
    excerpt: "유럽 기업들의 한국 진출 사례를 통해 본 전략적 파트너십 모델들을 분석합니다.",
    category: "Market Entry Strategies",
    author: "Jaehong Lim",
    date: "2024-01-20",
    readTime: "6 min read",
    slug: "strategic-partnership-models-european-firms"
  },
  {
    id: 5,
    title: "Korea's UHNW Market: Growth Trends and Investment Patterns",
    excerpt: "한국 초고액 자산가 시장의 성장 트렌드와 투자 패턴을 살펴봅니다.",
    category: "Financial Services",
    author: "Jaehong Lim",
    date: "2024-01-18",
    readTime: "5 min read",
    slug: "korea-uhnw-market-growth-trends"
  },
  {
    id: 6,
    title: "Technology Partnerships in Korea: FinTech Success Stories",
    excerpt: "한국에서 성공한 핀테크 기술 파트너십 사례들을 분석합니다.",
    category: "Success Stories",
    author: "Jaehong Lim",
    date: "2024-01-12",
    readTime: "4 min read",
    slug: "technology-partnerships-fintech-success"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pb-12 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <Badge className="mb-4 bg-blue-600 text-white">Korea Market Insights</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Business Intelligence
              <span className="text-blue-400"> & Market Analysis</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Expert insights on Korea market trends, strategic partnerships, and business development opportunities for global companies.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <Input 
                  placeholder="Search insights..." 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button className="ml-2 bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Blog Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {blogCategories.map((category) => (
              <Card key={category.slug} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {category.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="outline">{category.count} posts</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <Badge className="bg-orange-100 text-orange-800">Featured</Badge>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Insights</h2>
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-blue-600">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Stay Updated with Korea Market Insights
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get weekly insights on Korea market trends, regulatory changes, and strategic partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input 
                placeholder="Enter your email address" 
                className="max-w-sm bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe to Newsletter
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Join 500+ professionals who receive our weekly Korea market insights.
            </p>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  )
}