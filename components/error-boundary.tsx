'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // 여기에 에러 리포팅 서비스 연동 (예: Sentry)
    // reportError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props
      
      if (Fallback && this.state.error) {
        return (
          <Fallback 
            error={this.state.error} 
            reset={() => this.setState({ hasError: false })} 
          />
        )
      }

      return (
        <DefaultErrorFallback 
          error={this.state.error || new Error('알 수 없는 오류가 발생했습니다.')}
          reset={() => this.setState({ hasError: false })}
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error
  reset: () => void
}

function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-dark">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="mb-6">
          <svg 
            className="mx-auto h-12 w-12 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.382 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          오류가 발생했습니다
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {process.env.NODE_ENV === 'development' 
            ? error.message 
            : '일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
          }
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="w-full bg-forest-primary hover:bg-forest-600"
          >
            다시 시도
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
} 