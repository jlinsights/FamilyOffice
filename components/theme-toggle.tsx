"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 클라이언트 사이드에서만 렌더링하여 hydration 불일치 방지
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9"></div> // 플레이스홀더
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:border-border transition-all hover:scale-105"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500 dark:text-amber-400" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-700 dark:text-slate-300" />
      <span className="sr-only">{theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}</span>
    </Button>
  )
}
