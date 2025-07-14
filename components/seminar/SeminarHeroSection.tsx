import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";

export function SeminarHeroSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-gray-900/80">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/20 dark:to-primary/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 dark:bg-primary/20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 dark:bg-secondary/20" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-in dark:bg-primary/80 dark:text-white dark:border-primary/60">
            <Calendar className="h-3 w-3 mr-1" />
            Premium Education Program
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary/80 dark:to-primary/60">
              전문가와 함께하는
            </span>
            <br />
            <span className="text-foreground dark:text-gray-100">프리미엄 세미나</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up dark:text-gray-200" style={{ animationDelay: '200ms' }}>
            업계 최고 전문가들과 함께하는 맞춤형 교육 프로그램으로<br />
            경영 역량을 강화하고 네트워크를 확장하세요
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/30 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary dark:text-emerald-300 mb-2">500+</div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">참여 CEO</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/30 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary dark:text-emerald-300 mb-2">48+</div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">연간 세미나</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/30 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary dark:text-emerald-300 mb-2">98%</div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">만족도</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '600ms' }}>
            {/* '예정된 세미나 보기' 버튼을 외부 링크로 변경 */}
            <a
              href="https://seminar.familyoffices.vip"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button size="lg" className="group dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90" type="button">
                <Calendar className="h-5 w-5 mr-2" />
                예정된 세미나 일정 보기
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Button variant="outline" size="lg" className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
              <Users className="h-5 w-5 mr-2" />
              멤버십 문의하기
            </Button>
            {/* HeroSection의 '전체 세미나 일정 보기' 버튼은 제거 */}
          </div>
        </div>
      </div>
    </section>
  );
}