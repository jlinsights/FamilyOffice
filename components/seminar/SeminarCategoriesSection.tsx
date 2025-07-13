import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SEMINAR_CATEGORIES } from "@/constants/seminars";
import { ArrowRight, BookOpen } from "lucide-react";

export function SeminarCategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            <BookOpen className="h-3 w-3 mr-1" />
            Seminar Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            <span className="text-primary">전문 분야별</span> 세미나 카테고리
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            다양한 전문 분야의 세미나를 통해 체계적으로 역량을 개발하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {SEMINAR_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <Card 
                key={category.key} 
                className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${category.bgColor} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-center text-sm text-primary group-hover:gap-2 transition-all">
                    <span>자세히 보기</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Categories Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">전문 카테고리</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">전문가 풀</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24시간</div>
            <div className="text-sm text-muted-foreground">평균 교육시간</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">추천율</div>
          </div>
        </div>
      </div>
    </section>
  );
}