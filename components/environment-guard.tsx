'use client'

/**
 * Environment Guard Component
 * Blocks application access if critical environment variables are missing
 */

import React, { useEffect, useState } from 'react'
import { useEnvironment } from './environment-provider'
import { logger } from '@/lib/logger'
import { AlertTriangle, RefreshCw, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EnvironmentGuardProps {
  children: React.ReactNode
  blockOnCriticalFailure?: boolean
  showWarnings?: boolean
  enableDevMode?: boolean
}

export function EnvironmentGuard({
  children,
  blockOnCriticalFailure = true,
  showWarnings = true,
  enableDevMode = process.env.NODE_ENV === 'development'
}: EnvironmentGuardProps) {
  const { status, revalidate, validateCritical } = useEnvironment()
  const [showDetails, setShowDetails] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!status.isValid && !status.isLoading) {
      logger.error('Environment guard detected invalid environment', undefined, {
        component: 'EnvironmentGuard',
        errors: status.errors,
        warnings: status.warnings,
        criticalValid: status.criticalValid
      })
    }
  }, [status])

  const handleRetry = async () => {
    setRetryCount(prev => prev + 1)
    logger.info('Environment validation retry initiated', {
      component: 'EnvironmentGuard',
      retryCount: retryCount + 1
    })
    
    await revalidate()
  }

  const handleQuickCheck = () => {
    const result = validateCritical()
    logger.info('Quick critical validation performed', {
      component: 'EnvironmentGuard',
      result
    })
  }

  // Show loading state
  if (status.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin">
              <RefreshCw className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>환경 설정 확인 중...</CardTitle>
            <CardDescription>
              시스템 환경을 검증하고 있습니다.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Critical failure - block access
  if (!status.criticalValid && blockOnCriticalFailure) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 text-destructive">
              <AlertTriangle className="h-16 w-16" />
            </div>
            <CardTitle className="text-destructive">
              시스템 환경 오류
            </CardTitle>
            <CardDescription>
              필수 환경 설정이 누락되어 애플리케이션을 실행할 수 없습니다.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>필수 환경 변수 누락</AlertTitle>
              <AlertDescription>
                시스템 관리자에게 문의하여 필요한 환경 설정을 완료해주세요.
              </AlertDescription>
            </Alert>

            {enableDevMode && status.errors.length > 0 && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full"
                >
                  {showDetails ? '오류 상세 숨기기' : '오류 상세 보기'}
                </Button>
                
                {showDetails && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm">
                    <div className="font-medium text-destructive mb-2">
                      오류 목록:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {status.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleRetry} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                다시 시도 ({retryCount})
              </Button>
              
              {enableDevMode && (
                <Button 
                  variant="outline" 
                  onClick={handleQuickCheck}
                  size="icon"
                  title="빠른 검증"
                >
                  <Server className="h-4 w-4" />
                </Button>
              )}
            </div>

            {status.lastChecked && (
              <p className="text-xs text-muted-foreground text-center">
                마지막 확인: {status.lastChecked.toLocaleString('ko-KR')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show warnings in development mode
  const shouldShowWarnings = enableDevMode && showWarnings && status.warnings.length > 0

  return (
    <>
      {shouldShowWarnings && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3">
          <Alert variant="default" className="bg-transparent border-yellow-300">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">
              환경 설정 경고
            </AlertTitle>
            <AlertDescription className="text-yellow-700">
              <details className="mt-2">
                <summary className="cursor-pointer hover:underline">
                  {status.warnings.length}개의 권장 설정이 누락되었습니다.
                </summary>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                  {status.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </details>
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {children}
    </>
  )
}