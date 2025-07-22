/**
 * 엔터프라이즈급 접근성 컴포넌트 - FamilyOffice S
 * WCAG 2.1 AA 준수, 키보드 네비게이션, 스크린 리더 지원
 */

import React, { useState, useRef, useEffect } from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Accessibility, 
  Eye, 
  Keyboard,
  MousePointer,
  Contrast,
  ZoomIn
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 접근성 설정 타입
interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusIndicator: boolean
}

// 접근성 컨텍스트
interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
}

const AccessibilityContext = React.createContext<AccessibilityContextType | undefined>(undefined)

// 접근성 프로바이더
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    focusIndicator: true
  })

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  // 접근성 설정을 DOM에 적용
  useEffect(() => {
    const root = document.documentElement
    
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
  }, [settings])

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

// 접근성 훅
export function useAccessibility() {
  const context = React.useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

// 접근성 패널 컴포넌트
interface AccessibilityPanelProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function AccessibilityPanel({ isOpen, onClose, className }: AccessibilityPanelProps) {
  const { settings, updateSettings } = useAccessibility()
  const panelRef = useRef<HTMLDivElement>(null)

  // 키보드 네비게이션 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // 포커스 트랩 설정
      const focusableElements = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <div
        ref={panelRef}
        className={cn(
          "bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto",
          className
        )}
        role="document"
      >
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle id="accessibility-panel-title" className="flex items-center space-x-2">
              <Accessibility className="h-5 w-5 text-premium-600" />
              <span>접근성 설정</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="접근성 패널 닫기"
            >
              ×
            </Button>
          </div>
          <CardDescription>
            사용자 편의를 위한 접근성 옵션을 설정하세요
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* 고대비 모드 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                              <Contrast className="h-5 w-5 text-premium-600" />
              <div>
                <Label htmlFor="high-contrast" className="font-medium">
                  고대비 모드
                </Label>
                <p className="text-sm text-gray-500">
                  텍스트와 배경의 대비를 높여 가독성을 개선합니다
                </p>
              </div>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              aria-label="고대비 모드 토글"
            />
          </div>

          {/* 큰 글씨 모드 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ZoomIn className="h-5 w-5 text-premium-600" />
              <div>
                <Label htmlFor="large-text" className="font-medium">
                  큰 글씨 모드
                </Label>
                <p className="text-sm text-gray-500">
                  텍스트 크기를 키워 가독성을 개선합니다
                </p>
              </div>
            </div>
            <Switch
              id="large-text"
              checked={settings.largeText}
              onCheckedChange={(checked) => updateSettings({ largeText: checked })}
              aria-label="큰 글씨 모드 토글"
            />
          </div>

          {/* 애니메이션 감소 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MousePointer className="h-5 w-5 text-premium-600" />
              <div>
                <Label htmlFor="reduced-motion" className="font-medium">
                  애니메이션 감소
                </Label>
                <p className="text-sm text-gray-500">
                  움직임에 민감한 사용자를 위해 애니메이션을 줄입니다
                </p>
              </div>
            </div>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
              aria-label="애니메이션 감소 토글"
            />
          </div>

          {/* 키보드 네비게이션 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Keyboard className="h-5 w-5 text-premium-600" />
              <div>
                <Label htmlFor="keyboard-nav" className="font-medium">
                  키보드 네비게이션
                </Label>
                <p className="text-sm text-gray-500">
                  Tab 키로 모든 요소에 접근할 수 있도록 합니다
                </p>
              </div>
            </div>
            <Switch
              id="keyboard-nav"
              checked={settings.keyboardNavigation}
              onCheckedChange={(checked) => updateSettings({ keyboardNavigation: checked })}
              aria-label="키보드 네비게이션 토글"
            />
          </div>

          {/* 포커스 표시 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-premium-600" />
              <div>
                <Label htmlFor="focus-indicator" className="font-medium">
                  포커스 표시
                </Label>
                <p className="text-sm text-gray-500">
                  현재 선택된 요소를 명확하게 표시합니다
                </p>
              </div>
            </div>
            <Switch
              id="focus-indicator"
              checked={settings.focusIndicator}
              onCheckedChange={(checked) => updateSettings({ focusIndicator: checked })}
              aria-label="포커스 표시 토글"
            />
          </div>
        </CardContent>
      </div>
    </div>
  )
}

// 접근성 토글 버튼
interface AccessibilityToggleProps {
  onOpen: () => void
  className?: string
}

export function AccessibilityToggle({ onOpen, className }: AccessibilityToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onOpen}
      className={cn(
        "fixed bottom-4 right-4 z-40 rounded-full w-12 h-12 p-0 shadow-lg",
        "bg-white border-2 border-premium-200 hover:border-premium-300",
        "focus:outline-none focus:ring-2 focus:ring-premium-500 focus:ring-offset-2",
        className
      )}
      aria-label="접근성 설정 열기"
    >
      <Accessibility className="h-5 w-5 text-premium-600" />
    </Button>
  )
}

// 접근성 포커스 관리자
export function AccessibilityFocusManager() {
  const { settings } = useAccessibility()

  useEffect(() => {
    if (settings.focusIndicator) {
      // 포커스 표시 스타일 추가
      const style = document.createElement('style')
      style.textContent = `
        *:focus {
          outline: 2px solid #eab308 !important;
          outline-offset: 2px !important;
        }
        .high-contrast *:focus {
          outline: 3px solid #000 !important;
          outline-offset: 1px !important;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
    
    return undefined
  }, [settings.focusIndicator])

  return null
} 