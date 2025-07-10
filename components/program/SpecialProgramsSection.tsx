import { SpecialProgram } from "@/types/program";
import { Badge } from "@/components/ui/badge";

function ProgramCard({ title, subtitle, desc, place, target, freq }: SpecialProgram) {
  return (
    <div className="card p-6 flex flex-col min-h-[260px] animate-slide-up">
      <h4 className="font-bold text-lg text-primary mb-1">{title}</h4>
      {subtitle && <div className="text-xs text-muted-foreground mb-1">{subtitle}</div>}
      <p className="text-sm text-muted-foreground mb-2 flex-1">{desc}</p>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto">
        <Badge variant="outline">장소: {place}</Badge>
        <Badge variant="secondary">대상: {target}</Badge>
        <Badge variant="default">진행: {freq}</Badge>
      </div>
    </div>
  );
}

export function SpecialProgramsSection({ ceoPrograms, assetPrograms }: { ceoPrograms: SpecialProgram[]; assetPrograms: SpecialProgram[] }) {
  return (
    <section className="section bg-gradient-to-b from-muted/10 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            VIP & CEO 특화 프로그램
          </Badge>
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            <span className="text-primary">VIP & CEO 고객님만을 위한</span> 프리미엄 프로그램
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
            깊이 있는 자산관리, 차별화된 고객 참여, 세대이전, 원스톱 솔루션을 경험하세요.
          </p>
        </div>
        {/* 법인 CEO 프로그램 */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-primary text-center">법인 CEO 고객님을 위한 프로그램</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ceoPrograms.map((p) => (
              <ProgramCard key={p.title} {...p} />
            ))}
          </div>
        </div>
        {/* 자산가 프로그램 */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-primary text-center">자산가 고객님을 위한 프로그램</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {assetPrograms.map((p) => (
              <ProgramCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
