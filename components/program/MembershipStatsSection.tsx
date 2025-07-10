import { MembershipStat } from "./types";
import { Badge } from "@/components/ui/badge";

export function MembershipStatsSection({ stats }: { stats: MembershipStat[] }) {
  return (
    <section className="section bg-gradient-to-r from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 animate-fade-in">
            <span className="inline-block mr-1">★</span>
            Premium Membership
          </Badge>
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            <span className="text-primary">검증된 멤버들</span>과 함께하는 특별한 경험
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground text-pretty">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
