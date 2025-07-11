import { INDUSTRY_SERVICES } from "@/constants/services";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * 업종별 특화 전문 서비스 섹션 (Tabs 방식)
 * - 업종별로 탭 구분, 각 탭 클릭 시 해당 서비스만 노출
 * - 반응형, 다크모드, 접근성, 상세 주석 적용
 */
export function IndustryServicesTabsSection() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-6">업종별 특화 전문 서비스</h2>
      <Tabs defaultValue={INDUSTRY_SERVICES[0].title} className="w-full">
        {/* 탭 리스트: 업종별 */}
        <TabsList className="flex flex-wrap gap-2 mb-6">
          {INDUSTRY_SERVICES.map((item) => (
            <TabsTrigger
              key={item.title}
              value={item.title}
              className="px-4 py-2 rounded-lg font-semibold text-blue-900 dark:text-blue-200 data-[state=active]:bg-blue-100 data-[state=active]:dark:bg-blue-900"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* 탭 컨텐츠: 각 업종별 서비스 */}
        {INDUSTRY_SERVICES.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            <div className="bg-white dark:bg-blue-950/60 rounded-xl shadow p-6 flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="h-7 w-7 text-blue-900 dark:text-blue-200" />
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100">{item.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{item.description}</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-blue-900 dark:text-blue-200">
                {item.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
} 