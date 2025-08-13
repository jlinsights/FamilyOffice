import { INDUSTRY_SERVICES } from "@/constants/services";

export default function IndustryServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-primary/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">업종별 맞춤 자산관리</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            각 업종별 특수성을 반영한 전문 자산관리 전략을 제공합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {INDUSTRY_SERVICES.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-border hover:shadow-xl transition-shadow animate-fade-in"
            >
              <div className="mb-4">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 min-h-[48px]">{item.description}</p>
              <ul className="flex flex-wrap gap-2 justify-center mt-auto">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 