'use client'

import { Badge } from "@/components/ui/badge"
import { Briefcase, CheckCircle, Building2, TrendingUp, Shield, PieChart, BarChart3, Network } from "lucide-react"

const services = [
  {
    icon: Building2,
    title: "가업승계 컨설팅 및 실행",
    description: "체계적인 승계 전략 수립부터 실행까지 원스톱 서비스",
    features: [
      "승계 전략 수립 및 실행",
      "지배구조 최적화",
      "세대 간 갈등 해결",
      "경영진 승계 교육"
    ]
  },
  {
    icon: TrendingUp,
    title: "기업매수와 지분양도 Advisory",
    description: "M&A 플랫폼을 통한 전략적 거래 지원",
    features: [
      "기업가치 평가",
      "매수/매도 전략 수립",
      "거래구조 설계",
      "실사 및 협상 지원"
    ]
  },
  {
    icon: Shield,
    title: "법적 리스크 사전 예방",
    description: "승계 과정에서 발생할 수 있는 법적 리스크 최소화",
    features: [
      "법적 리스크 진단",
      "컴플라이언스 체계 구축",
      "분쟁 예방 전략",
      "법무 전문가 네트워크"
    ]
  },
  {
    icon: PieChart,
    title: "자산구조 최적화",
    description: "효율적인 자산 이전을 위한 구조 설계",
    features: [
      "자산 구조 분석",
      "이전 방식 최적화",
      "법인 구조 재편",
      "자산 분산 전략"
    ]
  },
  {
    icon: BarChart3,
    title: "세무 최적화 전략",
    description: "승계세 최소화를 위한 전문 세무 전략",
    features: [
      "상속세 절세 전략",
      "증여세 최적화",
      "법인세 구조 개선",
      "세무 리스크 관리"
    ]
  },
  {
    icon: Network,
    title: "전문가 네트워크 활용",
    description: "각 분야 최고 전문가들과의 협력 시스템",
    features: [
      "Big 4 출신 전문가",
      "변호사·회계사 네트워크",
      "업계 전문가 풀",
      "해외 전문가 연계"
    ]
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="section bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 animate-fade-in">
            <Briefcase className="h-3 w-3 mr-1" />
            Professional Services
          </Badge>
          
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            체계적인 가업승계 전문 서비스
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
            기업의 가치를 온전히 다음 세대로 전달하는 통합 솔루션
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="card p-6 hover:shadow-lg transition-all duration-300 animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 