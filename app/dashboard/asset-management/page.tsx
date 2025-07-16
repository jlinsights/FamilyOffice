/**
 * 자산 관리 대시보드 페이지 - FamilyOffice S 프리미엄 자산관리
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, 
  Shield, 
  TrendingUp, 
  ArrowLeft,
  PieChart
} from 'lucide-react'

export const metadata: Metadata = {
  title: '자산관리 | FamilyOffice S - 프리미엄 자산관리 대시보드',
  description: '한국 중소중견기업 법인 대표를 위한 전문 자산관리 서비스. 실시간 포트폴리오 분석과 리스크 관리를 통해 자산을 체계적으로 관리하세요.',
  keywords: ['자산관리', '포트폴리오', '투자', '한국주식', '위험관리', 'FamilyOffice'],
}

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function AssetManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                대시보드로
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <PieChart className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">자산관리</h1>
              </div>
              <Badge variant="outline">
                Asset Management
              </Badge>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                포트폴리오 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                실시간 포트폴리오 분석 및 자산 배분 관리 기능을 준비 중입니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                투자 성과 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                투자 수익률과 성과 지표 분석 기능을 준비 중입니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                리스크 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                포트폴리오 리스크 분석 및 관리 도구를 준비 중입니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>개발 중인 기능</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              자산관리 대시보드의 모든 기능은 로그인 시스템과 함께 곧 제공될 예정입니다.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• 실시간 포트폴리오 현황</li>
              <li>• 한국 주식 시장 분석</li>
              <li>• 리스크 지표 모니터링</li>
              <li>• 자산 배분 최적화 제안</li>
              <li>• 세무 최적화 전략</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}