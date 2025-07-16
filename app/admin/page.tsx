// FamilyOffice S - 관리자 대시보드
// 사용자 관리 및 시스템 통계를 보여주는 관리자 페이지

'use client';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Activity,
  Calendar,
  Mail,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface UserStats {
  total: number;
  admins: number;
  active: number;
  deleted: number;
  recent: Array<{
    id: string;
    clerk_id: string;
    email: string;
    full_name?: string;
    is_admin: boolean;
    created_at: string;
    last_sign_in_at?: string;
    metadata: Record<string, any>;
  }>;
}

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [permissionChecked, setPermissionChecked] = useState<boolean>(false);

  // 관리자 권한 체크
  useEffect(() => {
    async function checkAdminPermission() {
      try {
        if (!user) return;

        const response = await fetch('/api/admin/check-permission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Permission check failed');
        }

        const result = await response.json();
        setIsAdmin(result.isAdmin);
        
        if (!result.isAdmin) {
          setError('관리자 권한이 필요합니다. jhlim725@gmail.com 계정으로 로그인해주세요.');
        }
      } catch (err) {
        setError('권한 확인 중 오류가 발생했습니다.');
        setIsAdmin(false);
      } finally {
        setPermissionChecked(true);
      }
    }

    if (isLoaded && user) {
      checkAdminPermission();
    }
  }, [isLoaded, user]);

  // 사용자 통계 조회 (관리자 권한 확인 후)
  useEffect(() => {
    async function fetchUserStats() {
      try {
        const response = await fetch('/api/admin/users/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch user stats');
        }
        const data = await response.json();
        setUserStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user && isAdmin && permissionChecked) {
      fetchUserStats();
    } else if (permissionChecked && !isAdmin) {
      setLoading(false);
    }
  }, [isLoaded, user, isAdmin, permissionChecked]);

  // 사용자 동기화 트리거
  const handleSyncUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sync-user', { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        // 통계 새로고침
        window.location.reload();
      } else {
        alert('동기화 실패: ' + result.error);
      }
    } catch (error) {
      alert('동기화 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading || !permissionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            {!permissionChecked ? '권한 확인 중...' : '로딩 중...'}
          </p>
        </div>
      </div>
    );
  }

  // 관리자가 아닌 경우 접근 차단
  if (permissionChecked && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Shield className="w-5 h-5" />
              접근 권한 없음
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              관리자 페이지에 접근할 권한이 없습니다.
            </p>
            <p className="text-sm text-muted-foreground">
              슈퍼관리자 계정 (jhlim725@gmail.com)으로 로그인해주세요.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = '/'} variant="outline">
                홈으로 돌아가기
              </Button>
              <Button onClick={() => window.location.href = '/sign-out'}>
                다른 계정으로 로그인
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">오류 발생</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              다시 시도
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">관리자 대시보드</h1>
          <p className="text-muted-foreground mt-2 dark:text-gray-300">
            FamilyOffice S 시스템 관리
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSyncUser} variant="outline" className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
            <UserCheck className="w-4 h-4 mr-2" />
            사용자 동기화
          </Button>
          <Link href="/admin/consultations">
            <Button className="dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90">
              <ExternalLink className="w-4 h-4 mr-2" />
              상담 관리
            </Button>
          </Link>
        </div>
      </div>

      {/* 통계 카드 */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">전체 사용자</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-emerald-300">{userStats.total}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-300">
                총 등록된 사용자 수
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">관리자</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-emerald-300">{userStats.admins}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-300">
                관리자 권한 사용자
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">활성 사용자</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-emerald-300">{userStats.active}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-300">
                최근 30일 내 로그인
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">비활성 사용자</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-emerald-300">{userStats.deleted}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-300">
                삭제된 계정
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 최근 사용자 목록 */}
      {userStats && userStats.recent.length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">최근 가입 사용자</CardTitle>
            <CardDescription className="dark:text-gray-300">
              최근에 가입한 사용자 목록입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStats.recent.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary dark:text-emerald-300" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        {user.full_name || user.email}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.created_at).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.is_admin && (
                      <Badge variant="secondary" className="dark:bg-primary/80 dark:text-white dark:border-primary/60">
                        <Shield className="w-3 h-3 mr-1" />
                        관리자
                      </Badge>
                    )}
                    {user.last_sign_in_at && (
                      <Badge variant="outline" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <Activity className="w-3 h-3 mr-1" />
                        활성
                      </Badge>
                    )}
                    {user.metadata?.deleted && (
                      <Badge variant="destructive" className="dark:bg-red-600 dark:text-white">
                        <UserX className="w-3 h-3 mr-1" />
                        삭제됨
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 빈 상태 */}
      {userStats && userStats.total === 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground dark:text-emerald-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 dark:text-white">사용자가 없습니다</h3>
            <p className="text-muted-foreground mb-4 dark:text-gray-300">
              아직 동기화된 사용자가 없습니다. 사용자 동기화를 실행해보세요.
            </p>
            <Button onClick={handleSyncUser} className="dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90">
              <UserCheck className="w-4 h-4 mr-2" />
              사용자 동기화 실행
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 