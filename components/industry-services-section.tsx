import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { INDUSTRY_SERVICES } from '@/constants/services';

/**
 * 업종별 특화 전문 서비스 섹션 (프리미엄 리디자인)
 * - 업종별 고민/솔루션/성공사례/차별화/전문가 코멘트 등 입체적 정보 제공
 * - 프리미엄 UI/UX, 카드/그리드, 다크모드, 접근성, 상세 주석
 */
export function IndustryServicesTabsSection() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
        업종별 특화 전문 서비스
      </h2>
      <Tabs defaultValue={INDUSTRY_SERVICES[0]?.title || ''} className="w-full">
        {/* 탭 리스트: 업종별 대표 아이콘+타이틀 */}
        <TabsList className="flex flex-wrap gap-3 justify-center mb-8">
          {INDUSTRY_SERVICES.map(item => (
            <TabsTrigger
              key={item.title}
              value={item.title}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground shadow-sm transition-all"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* 탭 컨텐츠: 각 업종별 프리미엄 정보 */}
        {INDUSTRY_SERVICES.map(item => (
          <TabsContent key={item.title} value={item.title}>
            <div className="bg-card rounded-2xl shadow-xl p-8 max-w-4xl mx-auto animate-fade-in flex flex-col gap-8">
              {/* 상단: 업종 설명 */}
              <div className="flex items-center gap-4 mb-2">
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-lg text-muted-foreground mb-2 font-medium">
                {item.description}
              </p>

              {/* 고민/문제 & 솔루션 카드 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6 bg-muted/30 rounded-xl shadow">
                  <h4 className="font-semibold text-foreground mb-3">
                    이 업종의 주요 고민
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-foreground text-sm">
                    {item.painPoints.map((pain, idx) => (
                      <li key={idx}>{pain}</li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6 bg-muted/50 rounded-xl shadow">
                  <h4 className="font-semibold text-foreground mb-3">
                    FamilyOffice S 솔루션
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-foreground text-sm">
                    {item.solutions.map((sol, idx) => (
                      <li key={idx}>{sol}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 성공사례 카드 */}
              <div className="card p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl shadow flex flex-col gap-2">
                <div className="font-bold text-foreground mb-1">
                  성공사례: {item.caseStudy.company}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  <span className="font-semibold">과제</span>:{' '}
                  {item.caseStudy.challenge}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  <span className="font-semibold">솔루션</span>:{' '}
                  {item.caseStudy.solution}
                </div>
                <div className="text-sm text-primary font-semibold">
                  <span className="font-semibold">결과</span>:{' '}
                  {item.caseStudy.result}
                </div>
              </div>

              {/* 차별화 포인트 & 전문가 코멘트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6 bg-muted/30 rounded-xl shadow">
                  <h4 className="font-semibold text-foreground mb-3">
                    FamilyOffice S만의 차별화
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-foreground text-sm">
                    {item.differentiators.map((diff, idx) => (
                      <li key={idx}>{diff}</li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6 bg-blue-100 dark:bg-blue-800/40 rounded-xl shadow flex flex-col justify-center">
                  <h4 className="font-semibold text-foreground mb-3">
                    전문가의 한마디
                  </h4>
                  <blockquote className="italic text-muted-foreground text-base border-l-4 border-primary pl-4">
                    {item.expertComment}
                  </blockquote>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
