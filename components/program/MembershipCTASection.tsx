import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MembershipCTASection() {
  return (
    <section className="section bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            <Crown className="h-3 w-3 mr-1" aria-hidden />
            Join the Club
          </Badge>
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            대한민국 중소중견기업 CEO들의 <span className="text-primary">프리미엄 클럽</span>에 합류하세요
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
            검증된 멤버들과 함께 더 큰 성장과 성공을 만들어가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" asChild className="btn-primary group">
              <Link href="/contact" className="flex items-center" aria-label="멤버십 신청하기">
                멤버십 신청하기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services" aria-label="서비스 자세히 보기">
                서비스 자세히 보기
              </Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '300ms' }}>
            * 멤버십은 자산 규모와 사업 실적을 검증한 후 승인됩니다
          </div>
        </div>
      </div>
    </section>
  );
}
