'use client';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          </div>
          <Badge variant="outline" className="mb-4">
            Admin Dashboard
          </Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>시스템 관리</CardTitle>
            <CardDescription>
              FamilyOffice S 관리자 전용 페이지
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              관리자 기능은 현재 개발 중입니다. 사용자 관리, 시스템 통계, 설정 등의 기능이 곧 제공될 예정입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}