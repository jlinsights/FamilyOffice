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

  if (!isClient) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <div 
        className={className}
        style={{ 
          width: size, 
          height: size,
          display: 'inline-block'
        }}
        {...props}
      />
    )
  }

  return <Icon className={className} size={size} {...props} />
} 