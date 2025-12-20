export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

export interface HowToGuide {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
}

// 가업승계 준비 가이드
export const businessSuccessionHowTo: HowToGuide = {
  name: "가업승계 준비 완벽 가이드",
  description: "성공적인 가업승계를 위한 5단계 준비 과정. 세금 절감과 원활한 경영권 이전을 위한 체계적인 로드맵입니다.",
  totalTime: "PT12M", // ISO 8601 duration: 12개월
  steps: [
    {
      name: "1단계: 가업승계 계획 수립",
      text: "가업승계 시기를 결정하고 후계자를 선정합니다. 최소 5-10년 전부터 준비하는 것이 이상적이며, 전문가와 함께 세무 최적화 전략을 수립합니다.",
      url: "https://familyoffices.vip/business-succession-strategy"
    },
    {
      name: "2단계: 기업가치 평가 및 절세 구조 설계",
      text: "현재 기업가치를 정확히 평가하고, 가업상속공제(최대 500억원) 활용 방안을 검토합니다. 증여세와 상속세를 최소화하는 최적의 지분 이전 구조를 설계합니다.",
      url: "https://familyoffices.vip/tax-strategy"
    },
    {
      name: "3단계: 단계적 지분 이전 실행",
      text: "기업가치가 낮은 시점을 포착하여 증여세 부담을 최소화하면서 지분을 단계적으로 이전합니다. 10년 단위 증여세 공제 한도를 최대한 활용합니다.",
      url: "https://familyoffices.vip/inheritance-gift-tax"
    },
    {
      name: "4단계: 후계자 육성 및 경영권 이양",
      text: "후계자에게 실무 경험을 쌓게 하고, 핵심 인력과의 관계를 구축하도록 지원합니다. 단계적으로 경영 권한을 이양하며, 경영권 방어 장치(정관 개정, 의결권 제한 주식 등)를 마련합니다.",
      url: "https://familyoffices.vip/business-succession-strategy"
    },
    {
      name: "5단계: 사후 관리 및 지속적 모니터링",
      text: "승계 완료 후에도 세무 신고를 철저히 하고, 가업상속공제 유지 요건(7년간 고용 유지 등)을 충족하는지 지속적으로 관리합니다. 정기적으로 전문가와 상담하여 변경된 세법에 대응합니다.",
      url: "https://familyoffices.vip/contact"
    }
  ]
};

// 상속세 절세 가이드
export const inheritanceTaxHowTo: HowToGuide = {
  name: "상속세 절세 전략 가이드",
  description: "개인자산 30억 이상 고액자산가를 위한 상속세 최적화 방법. 합법적인 절세 전략으로 최대 50%까지 세금 부담을 줄일 수 있습니다.",
  totalTime: "PT6M", // 6개월
  steps: [
    {
      name: "1단계: 자산 현황 파악 및 상속세 시뮬레이션",
      text: "전체 자산을 정확히 파악하고, 현재 상황에서 발생할 상속세를 계산합니다. 우리의 무료 상속세 계산기를 활용하여 예상 세액을 확인하세요.",
      url: "https://familyoffices.vip/calculators/inheritance-tax"
    },
    {
      name: "2단계: 생전증여 계획 수립",
      text: "배우자 6억원, 성년 자녀 5천만원(10년간) 증여세 면제 한도를 최대한 활용합니다. 부동산은 공시가격이 낮을 때, 주식은 주가가 하락했을 때 증여하는 것이 유리합니다.",
      url: "https://familyoffices.vip/inheritance-gift-tax"
    },
    {
      name: "3단계: 가족신탁 설립 검토",
      text: "개인자산 30억원 이상의 경우 가족신탁(Family Trust) 설립을 통해 자산을 보호하고 상속세를 절감할 수 있습니다. 전문가와 상담하여 최적의 신탁 구조를 설계합니다.",
      url: "https://familyoffices.vip/wealth-consulting"
    },
    {
      name: "4단계: 생명보험 활용",
      text: "상속세 납부 재원 마련을 위해 생명보험에 가입합니다. 보험금은 상속재산에서 제외되므로, 유동성 확보와 절세 효과를 동시에 얻을 수 있습니다.",
      url: "https://familyoffices.vip/life-insurance"
    },
    {
      name: "5단계: 정기적인 점검 및 업데이트",
      text: "세법은 매년 변경되므로, 최소 연 1회 전문가와 상담하여 절세 전략을 업데이트합니다. 자산 변동이 있을 때마다 상속세 시뮬레이션을 다시 실행합니다.",
      url: "https://familyoffices.vip/contact"
    }
  ]
};
