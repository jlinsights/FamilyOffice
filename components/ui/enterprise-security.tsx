/**
 * 엔터프라이즈급 보안 UX 컴포넌트 - FamilyOffice S
 * MFA, 세션 관리, 프라이버시 인디케이터
 */
import {
  Shield,
  Smartphone,
  Mail,
  Clock,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import React, { useState } from 'react';
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
import { cn } from '@/lib/utils';

// 보안 상태 타입
interface SecurityStatus {
  mfaEnabled: boolean;
  sessionActive: boolean;
  lastLogin: string;
  deviceCount: number;
  securityScore: number;
}

// MFA 설정 컴포넌트
interface MFASetupProps {
  onSetup: (method: 'sms' | 'email' | 'app') => void;
  currentMethod?: string | undefined;
}

function MFASetup({ onSetup, currentMethod }: MFASetupProps) {
  const [step, setStep] = useState<'select' | 'verify'>('select');
  const [selectedMethod, setSelectedMethod] = useState<
    'sms' | 'email' | 'app' | null
  >(null);
  const [verificationCode, setVerificationCode] = useState('');

  const methods = [
    {
      id: 'sms',
      name: 'SMS 인증',
      description: '휴대폰 번호로 인증 코드 전송',
      icon: Smartphone,
      color: 'text-blue-600',
    },
    {
      id: 'email',
      name: '이메일 인증',
      description: '등록된 이메일로 인증 코드 전송',
      icon: Mail,
      color: 'text-green-600',
    },
    {
      id: 'app',
      name: '인증 앱',
      description: 'Google Authenticator 등 인증 앱 사용',
      icon: Shield,
      color: 'text-purple-600',
    },
  ];

  const handleMethodSelect = (method: 'sms' | 'email' | 'app') => {
    setSelectedMethod(method);
    setStep('verify');
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      onSetup(selectedMethod!);
      setStep('select');
      setVerificationCode('');
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-premium-600" />
          <span>다중 인증 설정</span>
        </CardTitle>
        <CardDescription>
          계정 보안을 위해 다중 인증을 설정하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'select' ? (
          <div className="space-y-4">
            {methods.map(method => (
              <Button
                key={method.id}
                variant="outline"
                className={cn(
                  'w-full justify-start h-auto p-4',
                  currentMethod === method.id &&
                    'border-premium-500 bg-premium-50'
                )}
                onClick={() =>
                  handleMethodSelect(method.id as 'sms' | 'email' | 'app')
                }
              >
                <div className="flex items-center space-x-3">
                  <method.icon className={cn('h-5 w-5', method.color)} />
                  <div className="text-left">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">
                      {method.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {selectedMethod === 'sms' &&
                  '휴대폰으로 인증 코드를 전송했습니다'}
                {selectedMethod === 'email' &&
                  '이메일로 인증 코드를 전송했습니다'}
                {selectedMethod === 'app' && '인증 앱에서 코드를 확인하세요'}
              </p>
              <Input
                type="text"
                placeholder="6자리 인증 코드"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                aria-label="인증 코드 입력"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setStep('select')}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6}
                className="flex-1"
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 세션 관리 컴포넌트
interface SessionManagerProps {
  sessions: Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
  }>;
  onTerminate: (sessionId: string) => void;
}

function SessionManager({ sessions, onTerminate }: SessionManagerProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-premium-600" />
          <span>활성 세션</span>
        </CardTitle>
        <CardDescription>현재 로그인된 모든 기기와 세션</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map(session => (
            <div
              key={session.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border',
                session.isCurrent
                  ? 'border-premium-200 bg-premium-50'
                  : 'border-gray-200 bg-white'
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{session.device}</span>
                    {session.isCurrent && (
                      <Badge variant="secondary" className="text-xs">
                        현재 세션
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.isCurrent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTerminate(session.id)}
                  className="text-danger-600 hover:text-danger-700"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 보안 점수 컴포넌트
interface SecurityScoreProps {
  score: number;
  recommendations: string[];
}

function SecurityScore({ score, recommendations }: SecurityScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600 bg-success-100';
    if (score >= 60) return 'text-warning-600 bg-warning-100';
    return 'text-danger-600 bg-danger-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '우수';
    if (score >= 60) return '양호';
    return '개선 필요';
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-premium-600" />
          <span>보안 점수</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div
            className={cn(
              'inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold mb-2',
              getScoreColor(score)
            )}
          >
            {score}
          </div>
          <div className="text-sm text-gray-600">{getScoreLabel(score)}</div>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">보안 개선 권장사항</h4>
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-sm text-gray-600"
                >
                  <AlertTriangle className="h-4 w-4 text-warning-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 메인 보안 대시보드
interface EnterpriseSecurityProps {
  securityStatus: SecurityStatus;
  sessions: SessionManagerProps['sessions'];
  onMFASetup: (method: 'sms' | 'email' | 'app') => void;
  onSessionTerminate: (sessionId: string) => void;
  className?: string;
}

export function EnterpriseSecurity({
  securityStatus,
  sessions,
  onMFASetup,
  onSessionTerminate,
  className,
}: EnterpriseSecurityProps) {
  const recommendations = [
    '다중 인증을 활성화하세요',
    '정기적으로 비밀번호를 변경하세요',
    '의심스러운 로그인 활동을 확인하세요',
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SecurityScore
          score={securityStatus.securityScore}
          recommendations={recommendations}
        />
        <MFASetup
          onSetup={onMFASetup}
          currentMethod={securityStatus.mfaEnabled ? 'app' : undefined}
        />
      </div>

      <SessionManager sessions={sessions} onTerminate={onSessionTerminate} />
    </div>
  );
}
