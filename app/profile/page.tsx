'use client';

import {
  User,
  Building2,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  Settings,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { KakaoSyncPanel } from '@/components/ui/kakao-sync-panel';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSupabaseKakaoAuth } from '@/hooks/use-supabase-kakao-auth';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const {
    user,
    userRecord,
    displayName,
    profileImage,
    email,
    companyName,
    phone,
    isKakaoUser,
    isLoading,
    updateProfile,
    unlinkKakaoAccount,
  } = useSupabaseKakaoAuth();

  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    company_name: '',
    phone: '',
  });

  useEffect(() => {
    if (user || userRecord) {
      setEditForm({
        name: userRecord?.name || displayName || '',
        company_name: userRecord?.company_name || companyName || '',
        phone: userRecord?.phone || phone || '',
      });
    }
  }, [user, userRecord, displayName, companyName, phone]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
      toast({
        title: '프로필 업데이트 완료',
        description: '프로필 정보가 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '업데이트 실패',
        description: '프로필 업데이트 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleUnlinkKakao = async () => {
    if (
      window.confirm(
        '정말 카카오 연동을 해제하시겠습니까?\n해제 후에는 이메일로만 로그인할 수 있습니다.'
      )
    ) {
      try {
        await unlinkKakaoAccount();
        toast({
          title: '카카오 연동 해제 완료',
          description: '카카오 계정 연동이 해제되었습니다.',
        });
      } catch (error) {
        toast({
          title: '연동 해제 실패',
          description: '카카오 연동 해제 중 오류가 발생했습니다.',
          variant: 'destructive',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="text-center p-8">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
            <p className="text-muted-foreground mb-6">
              프로필을 보려면 먼저 로그인해주세요.
            </p>
            <Button onClick={() => (window.location.href = '/auth/sign-in')}>
              로그인하기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            내 프로필
          </h1>
          <p className="text-muted-foreground">
            계정 정보를 확인하고 관리하세요
          </p>
        </div>

        {/* 메인 프로필 카드 */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="relative mx-auto mb-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src={profileImage || ''}
                  alt={displayName || 'User'}
                />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {displayName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {isKakaoUser && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835] px-2 py-1 rounded-full flex items-center space-x-1">
                  <Image
                    src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
                    alt="카카오"
                    width={12}
                    height={12}
                    className="rounded-sm"
                  />
                  <span className="text-xs font-medium">카카오</span>
                </div>
              )}
            </div>

            <CardTitle className="text-2xl">
              {displayName || '사용자'}
            </CardTitle>

            {companyName && (
              <CardDescription className="flex items-center justify-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                {companyName}
              </CardDescription>
            )}

            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant={isEditing ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => {
                  if (isEditing) {
                    setIsEditing(false);
                    // 원래 값으로 복원
                    setEditForm({
                      name: userRecord?.name || displayName || '',
                      company_name:
                        userRecord?.company_name || companyName || '',
                      phone: userRecord?.phone || phone || '',
                    });
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    취소
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    편집
                  </>
                )}
              </Button>

              {isEditing && (
                <Button size="sm" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                기본 정보
              </h3>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">이름</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={e =>
                        setEditForm(prev => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="이름을 입력하세요"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {displayName || '이름 없음'}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {email || '이메일 없음'}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company">회사명</Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={editForm.company_name}
                      onChange={e =>
                        setEditForm(prev => ({
                          ...prev,
                          company_name: e.target.value,
                        }))
                      }
                      placeholder="회사명을 입력하세요"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {companyName || '회사 정보 없음'}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">연락처</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={e =>
                        setEditForm(prev => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="연락처를 입력하세요"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {phone || '연락처 없음'}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>가입일</Label>
                  <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(user.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 카카오 연동 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image
                  src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
                  alt="카카오"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                카카오 연동
              </h3>

              {isKakaoUser ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835] px-3 py-1 rounded-full flex items-center space-x-2">
                        <Image
                          src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
                          alt="카카오"
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                        <span className="text-xs font-medium">연동됨</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        카카오 계정으로 로그인 중
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUnlinkKakao}
                    >
                      연동 해제
                    </Button>
                  </div>

                  {userRecord?.kakao_id && (
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          카카오 ID:
                        </span>
                        <span>{userRecord.kakao_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          프로필 이미지:
                        </span>
                        <span>{profileImage ? '설정됨' : '없음'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          연동 일시:
                        </span>
                        <span>
                          {userRecord.updated_at
                            ? new Date(
                                userRecord.updated_at
                              ).toLocaleDateString('ko-KR')
                            : '알 수 없음'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">미연동</Badge>
                      <span className="text-sm text-muted-foreground">
                        카카오 계정이 연동되지 않음
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Image
                        src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
                        alt="카카오"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                      <span>카카오 연동</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* 카카오 싱크 패널 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image
                  src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
                  alt="카카오"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                카카오 싱크
              </h3>

              <KakaoSyncPanel className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-800" />
            </div>

            <Separator />

            {/* 계정 설정 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                계정 설정
              </h3>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  비밀번호 변경
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  마케팅 수신 설정
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  알림 설정
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 추가 액션 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">대시보드</CardTitle>
              <CardDescription>
                관리자 대시보드에서 더 많은 기능을 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => (window.location.href = '/dashboard')}
                className="w-full"
              >
                대시보드 바로가기
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">고객 지원</CardTitle>
              <CardDescription>
                문의사항이 있으시면 언제든 연락해주세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = '/contact')}
              >
                문의하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
