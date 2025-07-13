import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";

export function SeminarHeroSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            <Calendar className="h-3 w-3 mr-1" />
            Premium Education Program
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              전문가와 함께하는
            </span>
            <br />
            <span className="text-foreground">프리미엄 세미나</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            업계 최고 전문가들과 함께하는 맞춤형 교육 프로그램으로<br />
            경영 역량을 강화하고 네트워크를 확장하세요
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">참여 CEO</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">48+</div>
              <div className="text-sm text-muted-foreground">연간 세미나</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">만족도</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '600ms' }}>
            <Button size="lg" className="group">
              <Calendar className="h-5 w-5 mr-2" />
              예정된 세미나 보기
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              <Users className="h-5 w-5 mr-2" />
              멤버십 문의하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}