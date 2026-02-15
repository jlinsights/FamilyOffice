/**
 * Resend 이메일 테스트 패널 (관리자용)
 */
'use client';

import { CheckCircle, Info, Loader2, Send, XCircle } from 'lucide-react';
import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface EmailStatus {
  configured: boolean;
  domain: string;
  apiConnected?: boolean;
  domainsCount?: number;
  error?: string;
  timestamp: string;
}

export function ResendTestPanel() {
  const [emailType, setEmailType] = useState<
    'consultation' | 'newsletter' | 'custom'
  >('custom');
  const [formData, setFormData] = useState({
    to: '',
    name: '',
    subject: '',
    message: '',
    consultationType: '',
    consultationDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const { toast } = useToast();

  // 시스템 상태 확인
  const checkStatus = async () => {
    setStatusLoading(true);
    try {
      const response = await fetch('/api/email/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      toast({
        title: '상태 확인 실패',
        description: '시스템 상태를 확인할 수 없습니다.',
        variant: 'destructive',
      });
    } finally {
      setStatusLoading(false);
    }
  };

  // 이메일 전송
  const sendTestEmail = async () => {
    if (!formData.to) {
      toast({
        title: '입력 오류',
        description: '수신자 이메일을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: emailType,
          to: formData.to,
          data: {
            name: formData.name,
            subject: formData.subject,
            message: formData.message,
            consultationType: formData.consultationType,
            consultationDate: formData.consultationDate,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: '전송 성공',
          description: `이메일이 성공적으로 전송되었습니다. ID: ${result.id}`,
        });
        // 폼 초기화
        setFormData({
          to: '',
          name: '',
          subject: '',
          message: '',
          consultationType: '',
          consultationDate: '',
        });
      } else {
        toast({
          title: '전송 실패',
          description: result.error || '이메일 전송에 실패했습니다.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '이메일 전송 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatusBadge = () => {
    if (!status) return null;

    if (status.configured && status.apiConnected) {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          연결됨
        </Badge>
      );
    } else if (status.configured && status.apiConnected === false) {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          API 오류
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <Info className="w-3 h-3 mr-1" />
          미설정
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* 시스템 상태 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Resend 시스템 상태
            <Button
              onClick={checkStatus}
              disabled={statusLoading}
              variant="outline"
              size="sm"
            >
              {statusLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                '상태 확인'
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            email.familyoffices.vip 도메인 연동 상태
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">연결 상태:</span>
                {renderStatusBadge()}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">발송 도메인:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {status.domain}
                </code>
              </div>
              {status.domainsCount !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">등록된 도메인:</span>
                  <span className="text-sm">{status.domainsCount}개</span>
                </div>
              )}
              {status.error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  오류: {status.error}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                마지막 확인:{' '}
                {new Date(status.timestamp).toLocaleString('ko-KR')}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              상태를 확인하려면 &apos;상태 확인&apos; 버튼을 클릭하세요.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 이메일 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>이메일 테스트 전송</CardTitle>
          <CardDescription>
            Resend를 통한 이메일 전송을 테스트합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 이메일 타입 선택 */}
          <div className="space-y-2">
            <Label>이메일 타입</Label>
            <Select
              value={emailType}
              onValueChange={(value: any) => setEmailType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">상담 예약 확인</SelectItem>
                <SelectItem value="newsletter">뉴스레터 환영</SelectItem>
                <SelectItem value="custom">커스텀 메시지</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 수신자 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="to">수신자 이메일 *</Label>
              <Input
                id="to"
                type="email"
                value={formData.to}
                onChange={e =>
                  setFormData(prev => ({ ...prev, to: e.target.value }))
                }
                placeholder="test@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">수신자 이름</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="홍길동"
              />
            </div>
          </div>

          {/* 이메일 타입별 추가 필드 */}
          {emailType === 'consultation' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consultationType">상담 유형</Label>
                <Input
                  id="consultationType"
                  value={formData.consultationType}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      consultationType: e.target.value,
                    }))
                  }
                  placeholder="자산관리 상담"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultationDate">상담 일시</Label>
                <Input
                  id="consultationDate"
                  value={formData.consultationDate}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      consultationDate: e.target.value,
                    }))
                  }
                  placeholder="2024년 1월 30일 오후 2시"
                />
              </div>
            </div>
          )}

          {emailType === 'custom' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">제목</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="이메일 제목을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">메시지</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="이메일 내용을 입력하세요"
                  rows={5}
                />
              </div>
            </div>
          )}

          {/* 전송 버튼 */}
          <Button
            onClick={sendTestEmail}
            disabled={isLoading || !formData.to}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            테스트 이메일 전송
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
