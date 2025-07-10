import { ExclusiveProgramCategory } from "@/types/program";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export function ExclusiveProgramsSection({ categories }: { categories: ExclusiveProgramCategory[] }) {
  return (
    <section className="section bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 animate-fade-in">
            <Briefcase className="h-3 w-3 mr-1" aria-hidden />
            Exclusive Programs
          </Badge>
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            멤버 전용 <span className="text-primary">프리미엄 프로그램</span>
          </h2>
        </div>
        <div className="space-y-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.programs.map((program, idx) => (
                    <div key={idx} className="card p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-lg">{program.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {program.frequency}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{program.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
