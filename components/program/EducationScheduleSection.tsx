import type { EducationPrograms } from "@/types/program";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, CheckCircle } from "lucide-react";

export function EducationScheduleSection({ educationPrograms }: { educationPrograms: EducationPrograms }) {
  const scheduleList = [
    {
      period: "매월",
      title: "월간 교육 프로그램",
      programs: educationPrograms.monthly,
      color: "from-blue-500/10 to-cyan-500/10"
    },
    {
      period: "분기별",
      title: "분기별 전문 세미나",
      programs: educationPrograms.quarterly,
      color: "from-green-500/10 to-emerald-500/10"
    },
    {
      period: "연간",
      title: "연간 특별 프로그램",
      programs: educationPrograms.annual,
      color: "from-purple-500/10 to-pink-500/10"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            <Calendar className="h-3 w-3 mr-1" aria-hidden />
            Education Schedule
          </Badge>
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            <span className="text-primary">체계적인 교육 프로그램</span> 일정
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scheduleList.map((schedule, index) => (
            <div
              key={index}
              className={`card flex flex-col items-center p-8 bg-gradient-to-br ${schedule.color} animate-slide-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center mb-6 w-full">
                <Badge variant="outline" className="mb-2">
                  {schedule.period}
                </Badge>
                <h3 className="text-xl font-semibold">{schedule.title}</h3>
              </div>
              <ul className="space-y-3 flex flex-col items-center w-full">
                {schedule.programs.map((program, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mx-2 flex-shrink-0" aria-hidden />
                    <span className="text-sm leading-relaxed text-center">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* 세미나 바로가기 버튼 */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="mb-4 text-lg text-muted-foreground font-medium">
            최신 세미나 일정이 궁금하다면?
          </div>
          <Button
            asChild
            size="lg"
            className="bg-primary text-white px-8 py-5 text-lg font-bold shadow-lg hover:bg-primary/90 transition group"
            aria-label="세미나 바로가기"
          >
            <a
              href="/seminar"
              className="flex items-center justify-center gap-2"
            >
              <Calendar className="h-5 w-5 mr-2" aria-hidden />
              세미나 바로가기
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </a>
          </Button>
          <div className="mt-2 text-sm text-muted-foreground">
            클릭 시 세미나 예약/등록 페이지로 이동합니다
          </div>
        </div>
      </div>
    </section>
  );
}
