'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

interface ClientOnlyIconProps {
  icon: LucideIcon
  className?: string
  size?: number
  [key: string]: any
}

export function ClientOnlyIcon({ icon: Icon, className, size = 24, ...props }: ClientOnlyIconProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 서버와 클라이언트에서 동일한 구조를 렌더링하여 hydration mismatch 방지
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size,
        display: 'inline-block'
      }}
      {...props}
    >
      {isClient && <Icon className="w-full h-full" size={size} />}
    </div>
  )
} 