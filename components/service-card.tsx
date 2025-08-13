import Link from "next/link"
import { memo } from "react"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export const ServiceCard = memo(function ServiceCard({ 
  icon, 
  title, 
  description, 
  href 
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-2 hover:border-border/80 p-6 h-full bg-gradient-to-br from-card to-card/50">
        {/* 아이콘 */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        
        {/* 제목 */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        
        {/* 설명 */}
        <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
          {description}
        </p>
        
        {/* 더보기 링크 */}
        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300 mt-auto">
          <span>자세히 보기</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  )
}) 