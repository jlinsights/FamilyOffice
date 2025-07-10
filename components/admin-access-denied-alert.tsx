// FamilyOffice S - 관리자 접근 거부 알림 컴포넌트
// URL 파라미터를 통해 관리자 접근 거부 메시지를 표시하는 컴포넌트

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Shield } from 'lucide-react';

function AdminAccessDeniedAlertContent() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');
    
    if (error) {
      let errorMessage = '';
      
      switch (error) {
        case 'admin_access_denied':
          errorMessage = '관리자 페이지에 접근할 권한이 없습니다. jhlim725@gmail.com 계정으로 로그인해주세요.';
          break;
        case 'admin_check_failed':
          errorMessage = '관리자 권한 확인 중 오류가 발생했습니다. 다시 시도해주세요.';
          break;
        case 'unauthorized':
          errorMessage = '로그인이 필요합니다.';
          break;
        default:
          errorMessage = '접근 중 오류가 발생했습니다.';
      }
      
      setMessage(errorMessage);
      setShow(true);
    }
  }, [searchParams]);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    // URL에서 error 파라미터 제거
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in-right">
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-destructive">
                {message}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-auto p-1 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminAccessDeniedAlert() {
  return (
    <Suspense fallback={null}>
      <AdminAccessDeniedAlertContent />
    </Suspense>
  );
} 