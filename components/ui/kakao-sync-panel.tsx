'use client';

import {
  Bell,
  Users,
  Share2,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { getKakaoSyncService } from '@/lib/kakao/kakao-sync-service';

import { useSupabaseKakaoAuth } from '@/hooks/use-supabase-kakao-auth';
import { useToast } from '@/hooks/use-toast';

interface KakaoSyncPanelProps {
  className?: string;
}

export function KakaoSyncPanel({ className = '' }: KakaoSyncPanelProps) {
  const { user, isKakaoUser } = useSupabaseKakaoAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [syncSettings, setSyncSettings] = useState({
    enableNotifications: true,
    enableChannelSync: true,
    enableAutoReply: false,
  });

  const kakaoSyncService = getKakaoSyncService();
  const serviceStatus = kakaoSyncService.getStatus();

  const handleChannelAdd = async () => {
    if (!isKakaoUser) {
      toast({
        title: '카카오 로그인 필요',
        description: '카카오톡 채널 연동을 위해 먼저 카카오로 로그인해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await kakaoSyncService.promoteChannelSubscription(
        user?.id || ''
      );

      if (success) {
        toast({
          title: '채널 연동 요청',
          description: '카카오톡 채널 추가 창이 열렸습니다.',
        });
      } else {
        toast({
          title: '채널 연동 실패',
          description: '카카오톡 채널 연동에 실패했습니다.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '연동 오류',
        description: '채널 연동 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChannelChat = async () => {
    setIsLoading(true);
    try {
      const success = await kakaoSyncService.startChannelChat();

      if (success) {
        toast({
          title: '상담 채팅 시작',
          description: '카카오톡 채널 채팅이 시작되었습니다.',
        });
      } else {
        toast({
          title: '채팅 시작 실패',
          description: '카카오톡 채널 채팅을 시작할 수 없습니다.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '채팅 오류',
        description: '채팅 시작 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    // 카카오톡 공유 기능은 향후 구현 예정
    const success = false; // getKakaoSyncService().shareToKakao(shareContent);

    if (success) {
      toast({
        title: '카카오톡 공유',
        description: '카카오톡 공유 창이 열렸습니다.',
      });
    } else {
      toast({
        title: '공유 실패',
        description: '카카오톡 공유를 할 수 없습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleSyncSettingsChange = async (
    key: keyof typeof syncSettings,
    value: boolean
  ) => {
    if (!user) return;

    const newSettings = { ...syncSettings, [key]: value };
    setSyncSettings(newSettings);

    try {
      await kakaoSyncService.updateUserSyncSettings(user.id, newSettings);
      toast({
        title: '설정 저장 완료',
        description: '카카오 싱크 설정이 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '설정 저장 실패',
        description: '설정을 저장하는 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (enabled: boolean) => {
    return enabled ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (enabled: boolean) => {
    return enabled ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        활성화
      </Badge>
    ) : (
      <Badge variant="secondary">비활성화</Badge>
    );
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
              alt="카카오"
              width={20}
              height={20}
              className="rounded-sm"
            />
            <CardTitle>카카오 싱크</CardTitle>
          </div>
          {getStatusBadge(serviceStatus.enabled)}
        </div>
        <CardDescription>
          카카오톡을 통한 알림, 상담, 채널 연동 서비스
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 서비스 상태 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" />
            서비스 상태
          </h4>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">채널 ID</span>
              <span className="text-sm font-mono">
                {serviceStatus.channelId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">카카오 연동</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(isKakaoUser)}
                <span className="text-sm">
                  {isKakaoUser ? '연동됨' : '미연동'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 카카오톡 기능 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Image
              src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
              alt="카카오"
              width={16}
              height={16}
              className="rounded-sm"
            />
            카카오톡 기능
          </h4>

          <div className="grid gap-3">
            {/* 채널 추가 */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">채널 추가</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  FamilyOffice S 카카오톡 채널을 추가합니다
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChannelAdd}
                disabled={isLoading || !isKakaoUser}
              >
                채널 추가
              </Button>
            </div>

            {/* 상담 채팅 */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
                    alt="카카오"
                    width={16}
                    height={16}
                    className="rounded-sm"
                  />
                  <span className="text-sm font-medium">상담 채팅</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  카카오톡으로 실시간 상담을 시작합니다
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChannelChat}
                disabled={isLoading}
              >
                채팅 시작
              </Button>
            </div>

            {/* 서비스 공유 */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm font-medium">서비스 공유</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  FamilyOffice S를 카카오톡으로 공유합니다
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                disabled={isLoading}
              >
                공유하기
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* 알림 설정 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Bell className="h-4 w-4" />
            알림 설정
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">상담 알림</span>
                <p className="text-xs text-muted-foreground">
                  상담 예약 완료 시 카카오톡 알림
                </p>
              </div>
              <Switch
                checked={syncSettings.enableNotifications}
                onCheckedChange={checked =>
                  handleSyncSettingsChange('enableNotifications', checked)
                }
                disabled={!isKakaoUser}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">채널 싱크</span>
                <p className="text-xs text-muted-foreground">
                  카카오톡 채널과 자동 연동
                </p>
              </div>
              <Switch
                checked={syncSettings.enableChannelSync}
                onCheckedChange={checked =>
                  handleSyncSettingsChange('enableChannelSync', checked)
                }
                disabled={!isKakaoUser}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">자동 응답</span>
                <p className="text-xs text-muted-foreground">
                  카카오톡 메시지 자동 응답 (베타)
                </p>
              </div>
              <Switch
                checked={syncSettings.enableAutoReply}
                onCheckedChange={checked =>
                  handleSyncSettingsChange('enableAutoReply', checked)
                }
                disabled={!isKakaoUser}
              />
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        {!isKakaoUser && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  카카오 로그인 필요
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  카카오 싱크 기능을 사용하려면 카카오 계정으로 로그인해주세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 기능 목록 */}
        <div className="space-y-2">
          <h5 className="text-xs font-medium text-muted-foreground">
            지원 기능
          </h5>
          <div className="flex flex-wrap gap-1">
            {serviceStatus.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
