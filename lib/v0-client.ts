/**
 * v0 API 클라이언트 유틸리티
 */

import { useState } from 'react'

export interface V0ApiRequest {
  prompt: string
  options?: {
    model?: string
    stream?: boolean
    temperature?: number
    maxTokens?: number
  }
}

export interface V0ApiResponse {
  success: boolean
  data?: any
  error?: string
  details?: string
  timestamp: string
}

/**
 * v0 API 호출 함수
 */
export async function callV0Api(request: V0ApiRequest): Promise<V0ApiResponse> {
  try {
    const response = await fetch('/api/v0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data: V0ApiResponse = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`)
    }

    return data

  } catch (error) {
    console.error('v0 API 호출 오류:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * v0 API 상태 확인 함수
 */
export async function checkV0ApiStatus(): Promise<{
  isAvailable: boolean
  apiKeyConfigured: boolean
  message?: string
}> {
  try {
    const response = await fetch('/api/v0', {
      method: 'GET',
    })

    const data = await response.json()

    return {
      isAvailable: response.ok,
      apiKeyConfigured: data.apiKeyConfigured || false,
      message: data.message
    }

  } catch (error) {
    console.error('v0 API 상태 확인 오류:', error)
    
    return {
      isAvailable: false,
      apiKeyConfigured: false,
      message: '서버에 연결할 수 없습니다.'
    }
  }
}

/**
 * React Hook에서 사용할 수 있는 v0 API 호출 함수
 */
export function useV0Api() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateCode = async (prompt: string, options?: V0ApiRequest['options']) => {
    setIsLoading(true)
    setError(null)

    try {
      const requestPayload: V0ApiRequest = { prompt }
      if (options) {
        requestPayload.options = options
      }
      
      const result = await callV0Api(requestPayload)
      
      if (!result.success) {
        throw new Error(result.error || '코드 생성에 실패했습니다.')
      }

      return result.data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      setError(errorMessage)
      throw err

    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateCode,
    isLoading,
    error,
    clearError: () => setError(null)
  }
} 