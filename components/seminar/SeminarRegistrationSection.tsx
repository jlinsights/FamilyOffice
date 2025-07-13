'use client'

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Cal, { getCalApi } from "@calcom/embed-react";
import { 
  UserPlus, 
  Calendar, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  ArrowRight,
  Gift,
  Users,
  Star
} from "lucide-react";

export function SeminarRegistrationSection() {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "seminar" })
        cal("ui", {
          cssVarsPerTheme: {
            light: { "cal-brand": "#1e3a8a" },
            dark: { "cal-brand": "#3b82f6" }
          },
          hideEventTypeDetails: false,
          layout: "month_view"
        })
      } catch (error) {
        console.error('❌ Cal.com 초기화 실패:', error)
      }
    })()
  }, [])
  const benefits = [
    {
      icon: Calendar,
      title: "우선 예약",
      description: "신규 세미나 일정을 가장 먼저 안내받고 우선 예약하세요"
    },
    {
      icon: Gift,
      title: "멤버 할인",
      description: "패밀리오피스 S 멤버에게는 특별 할인 혜택을 제공합니다"
    },
    {
      icon: Users,
      title: "전용 네트워킹",
      description: "세미나 후 전용 네트워킹 시간에 참여하실 수 있습니다"
    },
    {
      icon: Star,
      title: "프리미엄 자료",
      description: "세미나 영상과 추가 자료를 무제한으로 이용하세요"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "전화 상담",
      description: "☎︎ 0502-5550-8700",
      action: "전화하기",
      href: "tel:0502-5550-8700"
    },
    {
      icon: Mail,
      title: "이메일 문의",
      description: "cs@familyoffices.vip",
      action: "메일 보내기",
      href: "mailto:cs@familyoffices.vip"
    },
    {
      icon: Calendar,
      title: "온라인 예약",
      description: "Cal.com을 통한 즉시 예약",
      action: "예약하기",
      href: "https://cal.com/familyoffice/coffeechat"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            <UserPlus className="h-3 w-3 mr-1" />
            Registration & Contact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            <span className="text-primary">세미나 신청</span> 및 문의
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            다양한 방법으로 세미나 신청 및 상담 예약이 가능합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Benefits and Contact Methods */}
          <div className="space-y-8">
            {/* Member Benefits */}
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Gift className="h-6 w-6 text-primary mr-3" />
                멤버 전용 혜택
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="group hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Phone className="h-6 w-6 text-primary mr-3" />
                문의 방법
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <Card key={index} className="group hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{method.title}</h4>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="group/btn"
                            asChild
                          >
                            <a 
                              href={method.href}
                              {...(method.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {method.action}
                              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-primary/5 rounded-lg p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <h4 className="font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                신청 현황
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">89%</div>
                  <div className="text-xs text-muted-foreground">평균 예약률</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-xs text-muted-foreground">평균 응답시간</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-xs text-muted-foreground">재참석률</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cal.com Integration */}
          <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div id="booking" className="bg-background rounded-lg border shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  온라인 상담 예약
                </h3>
                <p className="text-sm text-muted-foreground">
                  세미나 관련 상담을 위한 시간을 예약하세요
                </p>
              </div>
              <div className="p-6">
                <Cal 
                  namespace="seminar"
                  calLink="familyoffice/seminar-consultation"
                  style={{ width: "100%", height: "600px" }}
                  config={{ layout: "month_view" }}
                />
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    상담 시간 안내
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    평일 오전 9시부터 오후 6시까지 상담이 가능합니다. 
                    주말 및 공휴일은 온라인 문의를 이용해 주세요.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    예약 확인
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    예약 완료 후 이메일과 SMS로 상담 일정을 확인해 드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}