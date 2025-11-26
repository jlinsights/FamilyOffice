import { BlogCategory, BlogPost } from '@/types/blog';

// FamilyOffice S 블로그 카테고리 (완전 한국어)
export const blogCategories: BlogCategory[] = [
  {
    name: '패밀리오피스',
    slug: 'family-office',
    icon: 'Target',
    count: 1,
    description: '가족자산관리와 패밀리오피스 구축 전략',
  },
  {
    name: '투자전략',
    slug: 'investment-strategy',
    icon: 'TrendingUp',
    count: 3,
    description: '포트폴리오 최적화와 투자 전략 가이드',
  },
  {
    name: '세무최적화',
    slug: 'tax-optimization',
    icon: 'FileText',
    count: 2,
    description: '상속세 절세와 세무 구조 개선 전략',
  },
  {
    name: '자산관리',
    slug: 'asset-management',
    icon: 'BarChart3',
    count: 4,
    description: '통합자산관리 및 위험관리 솔루션',
  },
  {
    name: '승계전략',
    slug: 'succession-planning',
    icon: 'Users',
    count: 2,
    description: '기업승계와 차세대 경영진 준비',
  },
  {
    name: '디지털혁신',
    slug: 'digital-innovation',
    icon: 'Cpu',
    count: 1,
    description: '핀테크와 디지털 자산관리 기술',
  },
  {
    name: '기업승계 분석',
    slug: 'business-succession-analysis',
    icon: 'Building',
    count: 2,
    description: '가업승계 성공 요인과 중견기업 승계 전략',
  },
  {
    name: '세무·법무 인사이트',
    slug: 'tax-legal-insights',
    icon: 'Scale',
    count: 2,
    description: '상속세법 개정과 가족기업 지배구조 최적화',
  },
  {
    name: '글로벌 트렌드',
    slug: 'global-trends',
    icon: 'Globe',
    count: 2,
    description: '해외 패밀리오피스 동향과 글로벌 자산관리 전략',
  },
  {
    name: '자산관리 전략',
    slug: 'asset-management-strategy',
    icon: 'Briefcase',
    count: 2,
    description: '고액자산가 포트폴리오 구성과 대체투자 기회',
  },
  // 새로 추가된 뉴스레터 기반 카테고리들
  {
    name: '리스크관리',
    slug: 'risk-management',
    icon: 'Shield',
    count: 1,
    description: 'CEO 리스크 관리와 기업보호 전략',
  },
  {
    name: '의료법인',
    slug: 'medical-corporation',
    icon: 'Stethoscope',
    count: 1,
    description: '병원경영과 의료법인 최적화 전략',
  },
  {
    name: '법인자산',
    slug: 'corporate-assets',
    icon: 'CreditCard',
    count: 1,
    description: '법인자산 활용과 배당 최적화',
  },
  {
    name: '세무',
    slug: 'tax-affairs',
    icon: 'Calculator',
    count: 1,
    description: '세무전략과 절세 방안',
  },
];

// FamilyOffice S 블로그 포스트 (발행 준비된 콘텐츠)
export const blogPosts: Record<string, BlogPost> = {
  'family-office-basics-guide': {
    id: 'family-office-basics-guide',
    title: '패밀리오피스란 무엇인가',
    image: '/images/blog/family-office.png',
    excerpt: '과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있습니다. 단순히 부를 물려주는 것이 아닌, 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 현대적 패밀리오피스의 진정한 의미를 알아보세요.',
    content: `<div className="font-sans leading-relaxed max-w-4xl mx-auto text-base text-foreground bg-background px-5">

<header className="text-center mb-10 py-8 border-b-4 border-primary">
    <h1 className="text-primary mb-4 text-3xl md:text-4xl font-bold leading-tight">패밀리오피스, 100년 기업을 위한 현대판 '가문 관리'의 모든 것</h1>
    <p className="text-muted-foreground text-lg font-normal leading-relaxed">가업승계부터 글로벌 투자, 세금 최적화까지. 대한민국 CEO가 반드시 알아야 할 패밀리오피스 설립 및 운영 전략 A to Z.</p>
    <div className="mt-5 text-muted-foreground text-sm">
        작성일: 2025년 8월 13일 | 예상 읽기 시간: 25분 | 카테고리: 가업승계 및 자산관리
    </div>
</header>

<div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-10">
    <h2 className="text-primary-foreground mb-5 text-xl font-bold">📋 Executive Summary</h2>
    <div className="bg-white/10 dark:bg-black/20 p-5 rounded-xl mb-5">
        <h3 className="text-primary-foreground mb-3 text-base font-semibold">🎯 핵심 포인트 3줄 요약</h3>
        <ul className="m-0 pl-5 text-primary-foreground text-sm leading-relaxed">
            <li className="mb-2">패밀리오피스는 단순 자산관리를 넘어 가문의 부와 가치를 다음 세대로 계승하는 '통합 가문 관리 시스템'입니다.</li>
            <li className="mb-2">가업승계, 세금 최적화, 글로벌 투자 등 CEO의 복합적인 니즈를 해결하며, 제2의 성장을 위한 전략적 파트너 역할을 수행합니다.</li>
            <li className="mb-2">성공적인 패밀리오피스 구축을 위해서는 명확한 목표 설정, 맞춤형 거버넌스 설계, 그리고 신뢰할 수 있는 전문가 그룹과의 협업이 필수적입니다.</li>
        </ul>
    </div>
    <div className="bg-white/10 dark:bg-black/20 p-5 rounded-xl">
        <h3 className="text-primary-foreground mb-3 text-base font-semibold">📑 목차</h3>
        <ol className="m-0 pl-5 text-primary-foreground text-sm leading-relaxed">
            <li className="mb-2">현황 분석: 왜 지금 대한민국 CEO는 패밀리오피스에 주목하는가?</li>
            <li className="mb-2">문제점 진단: 대표님의 고민, 무엇이 문제이고 어떻게 해결할 것인가?</li>
            <li className="mb-2">실무 가이드: 성공적인 패밀리오피스 구축을 위한 단계별 로드맵</li>
            <li className="mb-2">사례 연구: 글로벌 명문가와 국내 성공 기업의 패밀리오피스 전략</li>
            <li className="mb-2">미래 전망 및 실행 액션 플랜: 100년 기업을 향한 첫걸음</li>
        </ol>
    </div>
</div>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">📊 현황 분석: 왜 지금 대한민국 CEO는 패밀리오피스에 주목하는가?</h2>
    
    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl mb-6">
        <h3 className="text-slate-600 dark:text-slate-300 mb-4 text-lg font-semibold">📈 시장 데이터: 숫자로 보는 패밀리오피스의 부상</h3>
        <p className="mb-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">전 세계적으로 초고액자산가(UHNW)의 수가 증가하면서 패밀리오피스 시장은 폭발적인 성장세를 보이고 있습니다. Business Research Insights에 따르면, 글로벌 패밀리오피스 시장 규모는 2024년 약 158억 달러에서 연평균 7.21% 성장하여 2033년에는 297억 달러에 이를 것으로 전망됩니다. 이는 단순한 부의 증대를 넘어, 체계적이고 전문적인 자산 관리 및 승계에 대한 니즈가 얼마나 큰지를 보여주는 명백한 증거입니다.</p>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 p-3 rounded-lg my-4">
            <p className="m-0 text-xs text-amber-800 dark:text-amber-200">
                ⚠ <strong>정보 안내</strong>: 본 내용은 현재까지 공개된 정보를 바탕으로 한 전망으로, 
                최종 확정 전까지 변경될 수 있습니다. 실제 의사결정 시 최신 공식 정보를 반드시 확인하시기 바랍니다.
            </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-lg border-l-4 border-blue-500">
            <h4 className="text-blue-700 dark:text-blue-300 mb-3 text-base font-semibold">주요 지표</h4>
            <ul className="m-0 pl-5 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <li className="mb-2"><strong>글로벌 시장 성장률:</strong> 연평균 7% 이상의 꾸준한 성장세 (출처: Business Research Insights)</li>
                <li className="mb-2"><strong>아시아 시장의 부상:</strong> 특히 싱가포르, 홍콩을 중심으로 아시아 지역의 패밀리오피스 설립이 급증하는 추세입니다. 이는 아시아 지역의 부의 성장 속도를 반영합니다.</li>
                <li className="mb-2"><strong>투자 다변화:</strong> 전통적인 주식, 채권을 넘어 사모펀드(PE), 벤처캐피탈(VC), 부동산, 디지털 자산 등으로 투자 범위가 확대되고 있습니다.</li>
            </ul>
        </div>
    </div>
    
    <div className="bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 p-6 rounded-xl mb-6">
        <h3 className="text-sky-800 dark:text-sky-200 mb-4 text-lg font-semibold">🏛 정책 동향: 가업상속공제와 세법 개정의 영향</h3>
        <p className="m-0 text-slate-700 dark:text-slate-300 text-base leading-relaxed">✅ 현행 세법상 가업상속공제 제도는 중견기업의 원활한 가업승계를 지원하는 핵심 정책입니다. 매출액 기준, 공제 한도 등 구체적인 요건이 법령에 명시되어 있으며, 이를 충족할 경우 상당한 상속세 부담을 경감받을 수 있습니다. 하지만, 정부의 세법 개정 방향에 따라 공제 요건이나 혜택이 변동될 수 있으므로, 상시적인 모니터링이 필수적입니다. 패밀리오피스는 이러한 정책 변화에 선제적으로 대응하며 최적의 승계 전략을 수립하는 데 핵심적인 역할을 합니다.</p>
    </div>
    
    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-6 rounded-xl">
        <h3 className="text-green-800 dark:text-green-200 mb-4 text-lg font-semibold">🏢 업계 현황: M&A 시장 활성화와 CEO의 새로운 고민</h3>
        <p className="m-0 text-slate-700 dark:text-slate-300 text-base leading-relaxed">최근 M&A 시장이 활성화되면서, 평생 일군 기업을 성공적으로 매각(Exit)한 창업주들이 많아졌습니다. 이들은 거액의 유동성을 확보했지만, 동시에 '이 자산을 어떻게 관리하고 운용하며 다음 세대에 물려줄 것인가'라는 새로운 고민에 직면하게 됩니다. 기존 금융권의 표준화된 PB 서비스만으로는 이러한 복합적인 니즈를 충족시키기 어렵습니다. 이것이 바로 독립적이고 맞춤화된 솔루션을 제공하는 패밀리오피스가 각광받는 이유입니다.</p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">🔍 문제점 진단: 대표님의 고민, 무엇이 문제이고 어떻게 해결할 것인가?</h2>
    
    <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
        <h3 className="text-red-700 dark:text-red-300 mb-4 text-lg font-semibold">⚠ 현재 이슈: 복잡하게 얽힌 자산, 분절된 자문</h3>
        <p className="m-0 text-red-800 dark:text-red-200 text-base leading-relaxed">대부분의 대표님들은 개인 자산, 법인 자산, 부동산, 금융 투자, 비상장주식 등 다양한 형태의 자산을 보유하고 계십니다. 문제는 각 자산별로 세무사, 변호사, PB 등 각기 다른 전문가의 단편적인 자문을 받고 있다는 점입니다. 이는 전체적인 관점에서의 최적화된 의사결정을 어렵게 만들고, 각 전문가 간의 이해상충 문제가 발생할 소지도 있습니다.</p>
    </div>
    
    <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-6 rounded-r-xl mb-6">
        <h3 className="text-amber-700 dark:text-amber-300 mb-4 text-lg font-semibold">🚨 위험 요소: 준비되지 않은 승계의 파괴력</h3>
        <p className="m-0 text-amber-800 dark:text-amber-200 text-base leading-relaxed">체계적인 계획 없이 맞이하는 가업승계는 막대한 세금 부담뿐만 아니라, 후계자 간의 경영권 분쟁, 핵심 인력 이탈 등 기업의 존속 자체를 위협하는 심각한 리스크를 초래할 수 있습니다. 특히, 가문의 철학이나 비전이 공유되지 않은 채 재산만 이전될 경우, 어렵게 쌓아 올린 부가 2, 3세대에서 흩어질 위험이 매우 큽니다.</p>
    </div>
    
    <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-6 rounded-r-xl">
        <h3 className="text-green-700 dark:text-green-300 mb-4 text-lg font-semibold">🎯 기회 요소: '관리'를 넘어 '전략적 성장'으로</h3>
        <p className="m-0 text-green-800 dark:text-green-200 text-base leading-relaxed">패밀리오피스는 단순한 리스크 관리를 넘어, 가문의 자산을 활용한 제2의 도약을 모색하는 '컨트롤 타워' 역할을 수행합니다. 유망한 스타트업에 대한 벤처투자, 신사업 M&A, 재단 설립을 통한 사회적 가치 실현 등 가문의 자본을 활용하여 새로운 성장 동력을 발굴하고 가문의 명성을 높이는 기회를 창출할 수 있습니다.</p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">🛠 실무 가이드: 성공적인 패밀리오피스 구축을 위한 단계별 로드맵</h2>
    
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-8">
        <h3 className="text-primary-foreground mb-5 text-xl font-bold">📋 단계별 실행 방법</h3>
        
        <div className="bg-white/10 dark:bg-black/20 p-5 rounded-xl mb-5">
            <h4 className="text-primary-foreground mb-3 text-base font-semibold">1단계: 비전 및 목표 설정 (Vision & Mission)</h4>
            <p className="m-0 text-primary-foreground text-sm leading-relaxed">가장 먼저 '우리는 왜 패밀리오피스를 설립하는가?'에 대한 근본적인 질문에 답해야 합니다. 단순한 수익률 극대화인지, 안정적인 자산 보전과 승계인지, 혹은 사회공헌 활동인지 등 가문의 핵심 가치와 비전을 명확히 정의하고 모든 구성원의 합의를 이끌어내는 과정이 선행되어야 합니다.</p>
        </div>
        
        <div className="bg-white/10 dark:bg-black/20 p-5 rounded-xl mb-5">
            <h4 className="text-primary-foreground mb-3 text-base font-semibold">2단계: 거버넌스 설계 (Governance)</h4>
            <p className="m-0 text-primary-foreground text-sm leading-relaxed">패밀리오피스의 의사결정 구조를 확립하는 단계입니다. 이사회 구성, 투자위원회 운영 방안, 가족 구성원의 참여 범위와 역할, 성과평가 및 보상 체계 등 명문화된 '가문 헌장(Family Charter)'을 마련하여 투명하고 체계적인 운영의 기틀을 다져야 합니다.</p>
        </div>
        
        <div className="bg-white/10 dark:bg-black/20 p-5 rounded-xl">
            <h4 className="text-primary-foreground mb-3 text-base font-semibold">3단계: 구조화 및 전문가 선임 (Structuring & Staffing)</h4>
            <p className="m-0 text-primary-foreground text-sm leading-relaxed">설립 형태(단일 패밀리오피스-SFO vs 멀티 패밀리오피스-MFO)를 결정하고, 법적/세무적으로 가장 효율적인 구조를 설계합니다. 이후 투자, 세무, 법률, 부동산 등 각 분야 최고의 전문가로 구성된 핵심 팀을 내부에 두거나(SFO), 신뢰할 수 있는 외부 파트너(MFO)를 선정해야 합니다.</p>
        </div>
    </div>
    
    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl mb-6">
        <h3 className="text-slate-600 dark:text-slate-300 mb-4 text-lg font-semibold">✅ 체크리스트</h3>
        <ul className="m-0 pl-0 list-none text-slate-700 dark:text-slate-300 text-sm leading-loose">
            <li className="mb-2 pl-6 relative">
                <span className="absolute left-0 text-primary font-bold">✓</span>
                가문의 장기적인 비전과 목표가 명문화 되었는가?
            </li>
            <li className="mb-2 pl-6 relative">
                <span className="absolute left-0 text-primary font-bold">✓</span>
                모든 가족 구성원이 동의하는 명확한 의사결정 규칙이 있는가?
            </li>
            <li className="mb-2 pl-6 relative">
                <span className="absolute left-0 text-primary font-bold">✓</span>
                투자 철학과 위험 감수 수준(Risk Appetite)이 정의되었는가?
            </li>
            <li className="mb-2 pl-6 relative">
                <span className="absolute left-0 text-primary font-bold">✓</span>
                신뢰할 수 있는 법률 및 세무 자문 파트너가 확보되었는가?
            </li>
        </ul>
    </div>
    
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 p-6 rounded-xl mb-6">
        <h3 className="text-yellow-800 dark:text-yellow-200 mb-4 text-lg font-semibold">📄 필요 서류</h3>
        <p className="m-0 text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">패밀리오피스 설립 초기에는 법인 설립 서류(정관, 주주명부, 등기부등본 등), 가문헌장, 투자정책서(IPS), 각 전문가와의 자문 계약서, 그리고 모든 자산 목록 및 관련 증빙 서류 등이 기본적으로 필요합니다.</p>
    </div>
    
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-6 rounded-xl">
        <h3 className="text-gray-700 dark:text-gray-300 mb-4 text-lg font-semibold">💰 예상 비용</h3>
        <p className="m-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">싱글 패밀리오피스(SFO)의 경우, CIO(최고투자책임자) 등 핵심 인력의 인건비, 사무실 임대료, 법률/회계 자문료 등 연간 수억 원에서 수십억 원의 고정 운영비가 발생할 수 있습니다. 반면, 멀티 패밀리오피스(MFO)를 활용할 경우, 관리 자산 규모에 따라 일정 비율의 수수료(AUM의 0.5%~1.5%)를 지불하는 방식으로 비용을 절감할 수 있습니다.</p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">📖 사례 연구</h2>
    
    <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400 p-8 rounded-2xl">
        <h3 className="text-blue-700 dark:text-blue-300 mb-5 text-xl font-bold">Case Study: 스웨덴 발렌베리 가문 (Wallenberg Family)</h3>
        
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl mb-5">
            <h4 className="text-gray-700 dark:text-gray-300 mb-3 text-base font-semibold">📋 배경 설명</h4>
            <p className="m-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">160년 이상 5대에 걸쳐 부를 이어온 유럽 최고의 명문가입니다. 이들은 '발렌베리 재단'이라는 독특한 지배구조를 통해 소유와 경영을 분리하고, 전문 경영인 체제를 확립하여 장기적인 관점에서 안정적인 성장을 이룩했습니다.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl mb-5">
            <h4 className="text-gray-700 dark:text-gray-300 mb-3 text-base font-semibold">🎯 적용 전략</h4>
            <p className="m-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">핵심 투자 지주회사인 '인베스터 AB'를 통해 에릭슨, ABB, 아스트라제네카 등 글로벌 우량 기업에 장기 투자하며 기업 가치를 증대시킵니다. 또한, 재단을 통해 발생하는 수익은 스웨덴의 과학 연구 및 교육 발전에 재투자하여 '노블레스 오블리주'를 실천하며 가문의 사회적 명성을 높입니다.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl mb-5">
            <h4 className="text-gray-700 dark:text-gray-300 mb-3 text-base font-semibold">📊 정량적 결과</h4>
            <div className="flex gap-5 flex-wrap">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg flex-1 min-w-32 text-center">
                    <div className="text-green-600 dark:text-green-400 text-xl font-bold">160년+</div>
                    <div className="text-green-700 dark:text-green-300 text-xs mt-1">가문 역사</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex-1 min-w-32 text-center">
                    <div className="text-blue-600 dark:text-blue-400 text-xl font-bold">수백조 원</div>
                    <div className="text-blue-700 dark:text-blue-300 text-xs mt-1">운용 자산</div>
                </div>
            </div>
        </div>
        
        <div className="bg-cyan-50 dark:bg-cyan-900/30 p-5 rounded-xl border-l-4 border-cyan-500">
            <h4 className="text-cyan-800 dark:text-cyan-200 mb-3 text-base font-semibold">🔑 핵심 포인트</h4>
            <p className="m-0 text-cyan-700 dark:text-cyan-300 text-sm leading-relaxed">'존재하되, 드러내지 않는다(Esse, non Videri)'는 가문의 철학을 바탕으로 한 장기적인 비전, 소유와 경영의 분리를 통한 전문성 확보, 그리고 사회적 책임을 다하는 재단 모델이 성공의 핵심 요인입니다.</p>
        </div>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">🔮 미래 전망</h2>
    
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 p-6 rounded-xl mb-6">
        <h3 className="text-yellow-800 dark:text-yellow-200 mb-4 text-lg font-semibold">🏛 규제 변화 예측</h3>
        <p className="m-0 text-yellow-700 dark:text-yellow-300 text-base leading-relaxed">향후 상속세 및 증여세법은 가업승계 지원을 확대하는 방향과 조세 형평성을 강화하는 방향 사이에서 지속적인 논의가 이루어질 것으로 예상됩니다. 특히, 자본이득세 도입이나 금융투자소득세 관련 논의는 패밀리오피스의 투자 전략에 직접적인 영향을 미칠 수 있는 중요한 변수입니다.</p>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 p-3 rounded-lg my-4">
            <p className="m-0 text-xs text-amber-800 dark:text-amber-200">
                ⚠ <strong>정보 안내</strong>: 본 내용은 현재까지 공개된 정보를 바탕으로 한 전망으로, 
                최종 확정 전까지 변경될 수 있습니다. 실제 의사결정 시 최신 공식 정보를 반드시 확인하시기 바랍니다.
            </p>
        </div>
    </div>
    
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 p-6 rounded-xl mb-6">
        <h3 className="text-blue-700 dark:text-blue-300 mb-4 text-lg font-semibold">📈 시장 전망</h3>
        <p className="m-0 text-blue-600 dark:text-blue-400 text-base leading-relaxed">국내에서도 초고액자산가 증가와 1세대 창업주들의 고령화가 맞물리면서 패밀리오피스 시장의 성장이 가속화될 것으로 전망됩니다. 기존 금융사 주도의 서비스에서 벗어나, 법무법인, 회계법인, 독립 투자자문사가 결합한 형태의 전문화된 멀티 패밀리오피스(MFO)가 더욱 활성화될 것입니다.</p>
    </div>
    
    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-6 rounded-xl">
        <h3 className="text-green-700 dark:text-green-300 mb-4 text-lg font-semibold">🎯 대응 전략</h3>
        <p className="m-0 text-green-600 dark:text-green-400 text-base leading-relaxed">지금이 바로 패밀리오피스 도입을 위한 골든타임입니다. 당장 설립하지 않더라도, 가문의 자산 현황을 통합적으로 분석하고, 잠재적 리스크를 진단하며, 장기적인 승계 계획의 초안을 마련하는 것부터 시작해야 합니다. 이는 변화하는 시장과 제도에 유연하게 대처할 수 있는 가장 확실한 준비입니다.</p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">🚀 실행 액션 플랜</h2>
    
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl mb-5">
        <h3 className="text-white mb-4 text-lg font-bold">⚡ 즉시 실행 (오늘 바로)</h3>
        <ul className="m-0 pl-5 text-white text-sm leading-relaxed">
            <li className="mb-2">가족회의 소집: '자산 승계'와 '가업 경영'에 대한 가족 구성원의 생각 공유하기.</li>
            <li className="mb-2">자산 목록 작성: 개인/법인, 국내/해외, 금융/부동산 등 모든 자산을 한눈에 파악할 수 있는 통합 자산 현황표 만들기.</li>
            <li className="mb-2">전문가 상담 예약: FamilyOffice S와 같은 전문 기관에 연락하여 초기 진단 상담 받기.</li>
        </ul>
    </div>
    
    <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white p-6 rounded-xl mb-5">
        <h3 className="text-white mb-4 text-lg font-bold">📅 단기 계획 (1-3개월)</h3>
        <ul className="m-0 pl-5 text-white text-sm leading-relaxed">
            <li className="mb-2">가문헌장 초안 작성: 가문의 비전, 목표, 의사결정 규칙 등 핵심 원칙 정립하기.</li>
            <li className="mb-2">후계자 역량 평가: 객관적인 기준을 통해 차세대 리더의 강점과 약점 분석하기.</li>
            <li className="mb-2">패밀리오피스 구조 설계: SFO, MFO, 가상 패밀리오피스(VFO) 등 우리 가문에 맞는 최적의 모델 검토하기.</li>
        </ul>
    </div>
    
    <div className="bg-gradient-to-br from-primary to-blue-700 text-white p-6 rounded-xl">
        <h3 className="text-white mb-4 text-lg font-bold">🗺 장기 전략 (6-12개월)</h3>
        <ul className="m-0 pl-5 text-white text-sm leading-relaxed">
            <li className="mb-2">패밀리오피스 법인 설립 또는 MFO 계약 체결.</li>
            <li className="mb-2">투자정책서(IPS) 확정 및 초기 포트폴리오 구성.</li>
            <li className="mb-2">정기적인 가족 교육 및 거버넌스 회의 운영 시스템 구축.</li>
        </ul>
    </div>
</section>

<div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-10 rounded-3xl my-10 text-center">
    <h2 className="text-primary-foreground mb-5 text-2xl font-bold">📞 전문가 상담 문의</h2>
    <p className="mb-8 text-base opacity-90 leading-relaxed">
        복잡하고 어려운 가업승계와 자산관리, 더 이상 혼자 고민하지 마십시오.<br />
        FamilyOffice S의 전문가 그룹이 대표님의 100년 기업을 위한 최적의 로드맵을 제시해 드립니다.
    </p>
    
    <div className="flex gap-4 justify-center flex-wrap mb-8">
        <a href="https://seminar.familyoffices.vip" target="_blank" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl no-underline font-bold text-base shadow-lg hover:shadow-xl transition-shadow">
            🎯 세미나 신청
        </a>
        <a href="https://cal.com/familyoffice" target="_blank" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-4 rounded-xl no-underline font-bold text-base shadow-lg hover:shadow-xl transition-shadow">
            📅 1:1 맞춤 상담
        </a>
        <a href="https://pf.kakao.com/_gsxkxdG/chat" target="_blank" className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-4 rounded-xl no-underline font-bold text-base">
            💬 카카오톡 문의
        </a>
    </div>
    
    <div className="border-t border-white/30 pt-5">
        <p className="m-0 text-sm opacity-80">
            📞 전화상담: ☎ 0502-5550-8700 (평일 10:00-18:00)
        </p>
    </div>
</div>

<div className="bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 p-6 rounded-xl my-10">
    <h3 className="text-slate-600 dark:text-slate-400 mb-4 text-lg font-bold">⚠ 중요 고지사항</h3>
    <p className="mb-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        본 자료는 일반적인 정보 제공을 목적으로 작성되었으며, 개별 상황에 따라 다를 수 있습니다. 
        구체적인 실행은 반드시 전문가의 자문을 받으신 후 개인의 판단과 책임하에 이루어져야 합니다.
    </p>
    <ul className="m-0 pl-5 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
        <li className="mb-2">투자 결정은 개인의 판단과 책임하에 이루어져야 하며, 투자 전 전문가와 상담하시기 바랍니다.</li>
        <li className="mb-2">세법 및 관련 규정은 변경될 수 있으므로 최신 정보를 확인하시기 바랍니다.</li>
        <li className="mb-2">예측 및 전망 정보는 현재 시점 분석으로, 향후 정책 변화에 따라 달라질 수 있습니다.</li>
        <li>본 블로그 내용의 활용으로 인한 직간접적 손해에 대해 책임지지 않습니다.</li>
    </ul>
</div>

</div>`,
    category: '패밀리오피스',
    author: '임재홍',
    date: '2025-08-13',
    readTime: '12분',
    tags: ['패밀리오피스', '가업승계', '자산관리', '상속세', '중견기업', 'MFO', '디지털패밀리오피스', '가문경영', '세무전략', '투자다각화'],
    slug: 'family-office-basics-guide',
    featured: true,
  },

  'asset-management-strategy': {
    id: 'asset-management-strategy',
    title: '체계적인 자산관리 전략',
    image: '/images/blog/investment.png',
    excerpt: '분산된 자산을 체계적으로 관리하기 위한 전략과 방법을 소개합니다.',
    content: `# 체계적인 자산관리 전략

중견기업 경영진의 자산은 대개 기업 지분, 부동산, 금융자산 등 다양한 형태로 구성되어 있습니다. 이러한 복합적인 자산을 효과적으로 관리하기 위해서는 체계적인 접근이 필요합니다.

## 자산 관리의 기본 원칙

### 1. 분산 투자
위험을 분산하고 안정적인 수익을 추구하기 위해 다양한 자산 클래스에 투자합니다.

### 2. 정기적인 리밸런싱
시장 상황에 따라 포트폴리오를 조정하여 목표 비율을 유지합니다.

### 3. 장기적 관점
단기적인 시장 변동에 흔들리지 않고 장기적인 목표를 추구합니다.

## 실행 방안

전문적인 자산관리를 위해서는 신뢰할 수 있는 파트너와의 협력이 중요합니다. FamilyOffice S는 이러한 체계적인 자산관리를 지원합니다.`,
    category: '자산관리',
    author: '임재홍',
    date: '2024-12-10',
    readTime: '4분',
    tags: ['자산관리', '포트폴리오', '투자전략'],
    slug: 'asset-management-strategy',
    featured: true,
  },

  'tax-optimization-basics': {
    id: 'tax-optimization-basics',
    title: '중견기업을 위한 절세 전략',
    image: '/images/blog/tax-legal.png',
    excerpt: '합법적이고 효과적인 절세 방법과 상속세 대비 전략을 알아봅니다.',
    content: `# 중견기업을 위한 절세 전략

세무 최적화는 합법적인 방법을 통해 세부담을 줄이고 기업과 가족의 재정 효율성을 높이는 것입니다.

## 주요 절세 방법

### 1. 가업승계 공제 활용
중소기업 가업승계 특례를 통해 상속세 부담을 크게 줄일 수 있습니다.

### 2. 단계적 증여
상속세보다 낮은 세율의 증여세를 활용하여 미리 자산을 이전합니다.

### 3. 법인 구조 최적화
지주회사 구조를 통해 세부담을 줄이고 경영 효율성을 높입니다.

## 전문가 상담의 중요성

세무 최적화는 복잡한 법률과 세제를 다루므로 반드시 전문가와 함께 진행해야 합니다.`,
    category: '세무최적화',
    author: '임재홍',
    date: '2024-12-08',
    readTime: '6분',
    tags: ['절세', '상속세', '증여세', '가업승계'],
    slug: 'tax-optimization-basics',
    featured: true,
  },


  'succession-planning-guide': {
    id: 'succession-planning-guide',
    title: '성공적인 기업 승계를 위한 준비',
    image: '/images/blog/succession.png',
    excerpt: '기업 승계 과정에서 고려해야 할 법적, 세무적, 경영적 요소들을 정리했습니다.',
    content: `# 성공적인 기업 승계를 위한 준비

기업 승계는 단순한 소유권 이전이 아닙니다. 기업의 지속가능성과 가족의 화합을 위한 종합적인 계획이 필요합니다.

## 승계 계획의 핵심 요소

### 1. 승계자 준비
- 리더십 역량 개발
- 사업 이해도 향상
- 관계 구축 능력

### 2. 세무 계획
- 상속세 최소화 전략
- 가업승계 특례 활용
- 단계적 이전 계획

### 3. 거버넌스 체계
- 가족헌법 제정
- 의사결정 구조
- 갈등 해결 방안

## 성공적인 승계를 위한 조언

승계는 10년 이상의 장기적인 과정입니다. 충분한 시간을 두고 체계적으로 준비하는 것이 중요합니다.`,
    category: '승계전략',
    author: '임재홍',
    date: '2024-12-01',
    readTime: '7분',
    tags: ['기업승계', '가업승계', '거버넌스'],
    slug: 'succession-planning-guide',
    featured: false,
  },

  'digital-transformation-finance': {
    id: 'digital-transformation-finance',
    title: '금융업계의 디지털 혁신',
    image: '/images/blog/digital.png',
    excerpt: '핀테크와 디지털 기술이 자산관리 업계에 가져온 변화와 기회를 살펴봅니다.',
    content: `# 금융업계의 디지털 혁신

디지털 기술의 발전은 자산관리 업계에 근본적인 변화를 가져오고 있습니다. 인공지능, 빅데이터, 블록체인 등의 기술이 새로운 서비스와 기회를 창출하고 있습니다.

## 주요 디지털 혁신 트렌드

### 1. AI 기반 자산관리
- 개인화된 포트폴리오 추천
- 리스크 분석 및 예측
- 자동화된 리밸런싱

### 2. 데이터 분석의 진화
- 실시간 시장 분석
- 고객 행동 패턴 분석
- 투자 성과 최적화

### 3. 디지털 플랫폼
- 통합된 자산관리 대시보드
- 모바일 우선 서비스
- 실시간 리포팅

## 중견기업에게 주는 시사점

디지털 기술을 활용한 자산관리는 더 이상 대기업의 전유물이 아닙니다. 중견기업도 이러한 혁신을 통해 효율적이고 전문적인 자산관리가 가능합니다.`,
    category: '디지털혁신',
    author: '임재홍',
    date: '2024-11-28',
    readTime: '4분',
    tags: ['디지털혁신', '핀테크', 'AI', '자산관리'],
    slug: 'digital-transformation-finance',
    featured: false,
  },

  // 기업승계 분석 카테고리
  'business-succession-2024-analysis': {
    id: 'business-succession-2024-analysis',
    title: '2024년 가업승계 성공 요인 분석',
    image: '/images/blog/succession.png',
    excerpt: '성공적인 가업승계를 위한 핵심 요소들과 2024년 트렌드를 분석합니다.',
    content: `# 2024년 가업승계 성공 요인 분석

2024년은 한국 중견기업들에게 가업승계의 중요한 전환점이 되는 해입니다. 창업 1세대에서 2세대로의 경영권 이양이 본격화되는 시기로, 성공적인 승계를 위한 전략이 그 어느 때보다 중요합니다.

## 주요 성공 요인

### 1. 체계적인 승계 계획 수립
- 5~10년 장기 로드맵 구축
- 단계별 권한 이양 프로세스
- 위기 상황 대응 방안

### 2. 차세대 역량 강화
- 전문 경영 교육 프로그램
- 해외 경험 및 네트워킹
- 멘토링 시스템 구축

### 3. 조직 문화 혁신
- 수직적 조직에서 수평적 조직으로 전환
- 디지털 기반 업무 프로세스
- 성과 중심 평가 시스템

## 2024년 주요 트렌드

최근 조사에 따르면, 성공적인 가업승계를 이룬 기업들의 공통점은 '준비된 승계'입니다. 단순한 지분 이전이 아닌, 경영 철학과 기업 문화까지 포함한 종합적 접근이 핵심입니다.`,
    category: '기업승계 분석',
    author: '임재홍',
    date: '2025-01-15',
    readTime: '6분',
    tags: ['기업승계', '가업승계', '경영권 이양', '차세대 경영'],
    slug: 'business-succession-2024-analysis',
    featured: true,
  },

  'mid-sized-company-succession-issues': {
    id: 'mid-sized-company-succession-issues',
    title: '중견기업 승계 시 주요 이슈와 해결방안',
    image: '/images/blog/succession.png',
    excerpt: '중견기업이 직면하는 승계 과정의 핵심 문제점과 실무적 해결책을 제시합니다.',
    content: `# 중견기업 승계 시 주요 이슈와 해결방안

중견기업의 가업승계는 대기업과는 다른 고유한 특성과 과제를 가지고 있습니다. 규모의 한계와 자원의 제약 속에서도 성공적인 승계를 이루기 위한 전략이 필요합니다.

## 주요 이슈

### 1. 상속세 부담
- 기업 가치 상승으로 인한 세부담 증가
- 현금 유동성 부족 문제
- 지분 매각 압력

### 2. 전문 경영진 확보 어려움
- 제한된 인재 풀
- 경쟁력 있는 보상 체계 부족
- 가족 구성원과의 갈등 가능성

### 3. 지배구조 복잡성
- 소유와 경영의 분리 필요성
- 가족 구성원 간 이해관계 조정
- 의사결정 체계 정립

## 해결방안

### 1. 단계적 승계 전략
조기 승계 준비를 통해 세무 부담을 최소화하고, 차세대 경영진의 역량을 단계적으로 강화하는 것이 중요합니다.

### 2. 외부 전문가 활용
패밀리오피스나 전문 컨설팅을 통해 객관적이고 체계적인 승계 계획을 수립해야 합니다.`,
    category: '기업승계 분석',
    author: '임재홍',
    date: '2025-01-12',
    readTime: '7분',
    tags: ['중견기업', '승계 이슈', '해결방안', '경영 전략'],
    slug: 'mid-sized-company-succession-issues',
    featured: false,
  },

  // 세무·법무 인사이트 카테고리
  'inheritance-tax-reform-analysis': {
    id: 'inheritance-tax-reform-analysis',
    title: '상속세법 개정안 영향 분석',
    image: '/images/blog/tax-legal.png',
    excerpt: '최근 상속세법 개정안이 중견기업 가업승계에 미치는 영향을 상세히 분석합니다.',
    content: `# 상속세법 개정안 영향 분석

2024년 발표된 상속세법 개정안은 중견기업의 가업승계에 상당한 영향을 미칠 것으로 예상됩니다. 주요 변경사항과 대응 전략을 살펴보겠습니다.

## 주요 개정 내용

### 1. 가업승계 공제 확대
- 공제 한도 상향 조정
- 적용 요건 완화
- 유예 기간 연장

### 2. 세율 구조 변경
- 구간별 세율 조정
- 누진세율 완화
- 신규 공제 항목 신설

### 3. 평가 방법 개선
- 기업 가치 평가 합리화
- 할인율 적용 확대
- 비상장주식 평가 특례

## 중견기업에 미치는 영향

### 긍정적 영향
- 세부담 경감 효과
- 승계 계획 수립 용이성 증대
- 기업 경영 안정성 향상

### 주의사항
- 새로운 요건 충족 필요
- 사전 준비 기간 확보 중요
- 전문가 자문 필수

## 대응 전략

개정안의 혜택을 최대한 활용하기 위해서는 사전 준비가 핵심입니다. 특히 가업승계 요건을 충족하기 위한 준비 작업이 중요합니다.`,
    category: '세무·법무 인사이트',
    author: '임재홍',
    date: '2025-01-10',
    readTime: '8분',
    tags: ['상속세', '세법 개정', '가업승계', '세무 전략'],
    slug: 'inheritance-tax-reform-analysis',
    featured: false,
  },

  'family-business-governance-optimization': {
    id: 'family-business-governance-optimization',
    title: '가족기업 지배구조 최적화 방안',
    image: '/images/blog/family-office.png',
    excerpt: '가족기업의 효율적인 지배구조 구축을 위한 실무적 가이드라인을 제공합니다.',
    content: `# 가족기업 지배구조 최적화 방안

가족기업의 지속 가능한 성장을 위해서는 투명하고 효율적인 지배구조가 필수입니다. 가족 구성원과 전문 경영진 간의 역할 분담과 책임 체계를 명확히 하는 것이 핵심입니다.

## 지배구조의 핵심 요소

### 1. 이사회 구성
- 독립이사 비율 확대
- 전문성 기반 이사 선임
- 정기적 성과 평가

### 2. 가족 헌법 제정
- 가족 구성원의 권리와 의무
- 경영 참여 기준
- 갈등 해결 메커니즘

### 3. 전문 경영진 확보
- 성과 기반 보상 체계
- 장기 인센티브 제도
- 승계 계획 수립

## 실무 적용 사례

성공적인 가족기업들의 지배구조 사례를 분석하면, 명확한 역할 분담과 투명한 의사결정 프로세스가 공통적으로 발견됩니다.

### 모범 사례
- 정기적인 가족 회의 개최
- 외부 자문위원회 운영
- 차세대 육성 프로그램

## 구축 단계

1. 현 상황 진단
2. 목표 지배구조 설계
3. 단계별 실행 계획
4. 모니터링 및 개선`,
    category: '세무·법무 인사이트',
    author: '임재홍',
    date: '2025-01-08',
    readTime: '9분',
    tags: ['지배구조', '가족기업', '이사회', '경영 투명성'],
    slug: 'family-business-governance-optimization',
    featured: false,
  },

  // 글로벌 트렌드 카테고리
  'singapore-family-office-trends': {
    id: 'singapore-family-office-trends',
    title: '싱가포르 패밀리오피스 최신 동향',
    image: '/images/blog/investment.png',
    excerpt: '아시아 패밀리오피스 허브로 부상한 싱가포르의 최신 동향과 시사점을 분석합니다.',
    content: `# 싱가포르 패밀리오피스 최신 동향

싱가포르는 아시아 태평양 지역의 대표적인 패밀리오피스 허브로 자리잡고 있습니다. 2024년 현재 400개 이상의 패밀리오피스가 설립되어 운영 중이며, 이들이 관리하는 자산 규모는 3,000억 달러를 넘어섰습니다.

## 주요 성장 동력

### 1. 정부 정책 지원
- 13X/13U 패밀리오피스 인센티브 제도
- 간소화된 설립 절차
- 세제 혜택 확대

### 2. 지정학적 우위
- 아시아 시간대의 금융 허브
- 정치적 안정성
- 우수한 인프라

### 3. 전문 서비스 생태계
- 글로벌 은행들의 프라이빗 뱅킹
- 법무·세무 전문가 집적
- 자산관리 플랫폼 다양성

## 최신 트렌드

### 1. 규모의 확대
- 평균 운용 자산 규모 증가 (5억 달러 → 10억 달러)
- 멀티 패밀리 오피스 선호도 증가
- 지역별 특화 전략 수립

### 2. 투자 다변화
- ESG 투자 확대
- 대체 투자 비중 증가
- 직접 투자 선호

### 3. 차세대 참여 증가
- 밀레니얼 세대의 적극적 참여
- 디지털 자산 투자 관심 증대
- 임팩트 투자 선호

## 한국 자산가들에게 주는 시사점

싱가포르 패밀리오피스 모델은 한국의 중견기업 가족들에게도 유용한 참고 자료가 됩니다. 특히 글로벌 분산 투자와 차세대 참여 유도 방안에서 배울 점이 많습니다.`,
    category: '글로벌 트렌드',
    author: '임재홍',
    date: '2025-01-06',
    readTime: '7분',
    tags: ['싱가포르', '패밀리오피스', '글로벌 트렌드', '아시아'],
    slug: 'singapore-family-office-trends',
    featured: false,
  },

  'us-trust-strategies': {
    id: 'us-trust-strategies',
    title: '미국 신탁 제도 활용 전략',
    image: '/images/blog/tax-legal.png',
    excerpt: '미국의 다양한 신탁 제도를 활용한 자산 보전 및 승계 전략을 소개합니다.',
    content: `# 미국 신탁 제도 활용 전략

미국의 신탁 제도는 세계에서 가장 발달하고 다양한 형태를 가지고 있습니다. 한국의 고액 자산가들도 글로벌 자산관리의 일환으로 미국 신탁을 적극 활용하고 있습니다.

## 주요 신탁 유형

### 1. Revocable Trust (해지 가능 신탁)
- 유연한 관리 구조
- 생전 자산관리 편의성
- 상속 절차 간소화

### 2. Irrevocable Trust (해지 불가능 신탁)
- 세제 혜택 극대화
- 자산 보호 효과
- 승계 계획 확실성

### 3. Dynasty Trust (영구 신탁)
- 다세대 자산 보전
- 장기 세제 혜택
- 가족 자산 영속성

## 활용 전략

### 1. 세무 최적화
- Generation-Skipping Tax 회피
- Estate Tax 절감
- Gift Tax 활용

### 2. 자산 보호
- 소송 위험 차단
- 채권자 보호
- 프라이버시 보장

### 3. 승계 계획
- 단계적 지분 이전
- 경영권 분리
- 차세대 교육 기금

## 설립 시 고려사항

### 법적 요건
- 미국 내 관할지 선택
- 수탁자(Trustee) 선정
- 신탁 계약서 작성

### 세무 고려사항
- 한미 조세협정 활용
- CRS 보고 의무
- 국내 세무 영향

미국 신탁은 복잡한 구조이므로 반드시 전문가의 도움을 받아 설립하는 것이 중요합니다.`,
    category: '글로벌 트렌드',
    author: '임재홍',
    date: '2025-01-04',
    readTime: '8분',
    tags: ['미국 신탁', '글로벌 자산관리', '세무 최적화', '자산 보호'],
    slug: 'us-trust-strategies',
    featured: false,
  },

  // 자산관리 전략 카테고리
  'high-net-worth-real-estate-portfolio': {
    id: 'high-net-worth-real-estate-portfolio',
    title: '고액자산가 부동산 포트폴리오 구성법',
    excerpt: '고액자산가를 위한 전략적 부동산 포트폴리오 구성 방법과 리스크 관리 전략을 제시합니다.',
    content: `# 고액자산가 부동산 포트폴리오 구성법

부동산은 고액자산가들의 포트폴리오에서 핵심적인 역할을 합니다. 안정적인 현금흐름과 인플레이션 헤지 효과, 그리고 장기적인 자산 가치 상승을 기대할 수 있는 투자처입니다.

## 포트폴리오 구성 원칙

### 1. 다변화 전략
- 지역별 분산: 서울, 수도권, 지방 주요 도시
- 용도별 분산: 주거, 상업, 오피스, 물류
- 투자 방식 다변화: 직접 투자, 리츠, 펀드

### 2. 리스크-수익 밸런스
- 안정형: 서울 강남 3구 아파트 (40%)
- 성장형: 신도시 개발 지역 (30%)
- 수익형: 상업용 부동산 (20%)
- 대안형: 해외 부동산 (10%)

### 3. 현금흐름 최적화
- 임대 수익률 4-6% 목표
- 공실률 최소화 전략
- 세제 혜택 활용

## 투자 유형별 전략

### 1. 주거용 부동산
**핵심 지역**: 강남, 서초, 송파 + 분당, 평촌
- 학군 프리미엄 지역 집중
- 재건축/재개발 수혜 지역
- 교통 인프라 개선 예정 지역

### 2. 상업용 부동산
**타겟**: 프리미엄 오피스, 상가
- 1등급 오피스빌딩 (강남, 여의도)
- 역세권 상가 (지하철 2호선, 9호선)
- 복합쇼핑몰 지분 투자

### 3. 해외 부동산
**추천 지역**: 미국 주요 도시, 싱가포르, 일본
- 달러 자산 분산 효과
- 선진국 부동산 시장 참여
- 전문 운용사 활용 필수

## 리스크 관리

### 1. 시장 리스크
- 부동산 시장 사이클 이해
- 정부 정책 변화 모니터링
- 거시경제 지표 추적

### 2. 유동성 리스크
- 포트폴리오의 20-30%는 유동성 확보
- 부동산 펀드, 리츠 활용
- 단계적 매각 계획 수립

### 3. 집중 리스크
- 단일 지역 비중 50% 이하
- 단일 건물 비중 30% 이하
- 정기적 포트폴리오 리밸런싱

## 세무 최적화

### 법인 활용 전략
- 부동산 전용 법인 설립
- 임대사업자 등록
- 감가상각비 활용

성공적인 부동산 포트폴리오는 장기적 관점에서 체계적으로 구축해야 합니다.`,
    category: '자산관리 전략',
    author: '임재홍',
    date: '2025-01-02',
    readTime: '10분',
    tags: ['부동산 투자', '포트폴리오', '고액자산가', '자산 배분'],
    slug: 'high-net-worth-real-estate-portfolio',
    featured: true,
  },

  'alternative-investment-market-outlook': {
    id: 'alternative-investment-market-outlook',
    title: '대체투자 시장 전망과 기회',
    excerpt: '2025년 대체투자 시장의 주요 트렌드와 고액자산가를 위한 투자 기회를 분석합니다.',
    content: `# 대체투자 시장 전망과 기회

전통적인 주식과 채권을 넘어서는 대체투자는 고액자산가들의 포트폴리오에서 점점 중요한 비중을 차지하고 있습니다. 2025년 대체투자 시장의 전망과 주요 기회를 살펴보겠습니다.

## 2025년 시장 전망

### 1. 시장 규모 확대
- 글로벌 대체투자 시장: 18조 달러 규모 전망
- 연평균 성장률: 8-10%
- 아시아 시장 비중 확대: 25% → 30%

### 2. 주요 성장 동력
- 저금리 환경 지속
- 인플레이션 헤지 수요 증가
- 포트폴리오 다변화 니즈

## 투자 기회 분야

### 1. 프라이빗 에쿼티 (PE)
**특징**: 비상장 기업 투자를 통한 높은 수익률 추구
- 중견기업 성장 투자
- 디스트레스드 투자
- 바이아웃 펀드

**예상 수익률**: 연 10-15%
**투자 기간**: 5-7년
**최소 투자금액**: 10억원

### 2. 부동산 펀드
**유형**: 
- 개발형 부동산 펀드
- 임대형 부동산 펀드
- 해외 부동산 펀드

**핵심 지역**: 
- 국내: 수도권 신도시, 혁신도시
- 해외: 미국 서부, 싱가포르, 호주

### 3. 헤지펀드
**전략별 분류**:
- 롱숏 전략: 주식 롱숏 포지션
- 이벤트 드리븐: M&A, 구조조정 이벤트
- 매크로 전략: 거시경제 테마 투자

### 4. 인프라 투자
**분야**:
- 재생에너지 프로젝트
- 5G/6G 통신 인프라
- 물류센터, 데이터센터

### 5. 대안 자산
**신규 자산군**:
- 디지털 자산 (NFT, 메타버스)
- 탄소 크레딧
- 미술품, 와인 등 수집품

## 리스크 관리

### 1. 유동성 리스크
- 투자 기간 장기화
- 중도 환매 제한
- 적정 비중 유지 (포트폴리오의 20-30%)

### 2. 정보 비대칭
- 전문 운용사 선별 중요
- 듀딜리전스 강화
- 정기적 모니터링

### 3. 시장 리스크
- 분산 투자 필수
- 상관관계 분석
- 헤지 전략 병행

## 투자 접근 방법

### 1. 펀드 오브 펀즈
- 전문성 부족 보완
- 분산 투자 효과
- 상대적으로 낮은 최소 투자금액

### 2. 직접 투자
- 높은 수익률 가능
- 투자 통제권 확보
- 높은 전문성 요구

### 3. 공동 투자
- 리스크 분산
- 정보 공유
- 네트워킹 효과

대체투자는 높은 수익 가능성과 함께 상당한 리스크를 수반하므로, 반드시 전문가와 상담 후 신중하게 접근해야 합니다.`,
    category: '자산관리 전략',
    author: '임재홍',
    date: '2024-12-30',
    readTime: '11분',
    tags: ['대체투자', '프라이빗 에쿼티', '헤지펀드', '투자 전략'],
    slug: 'alternative-investment-market-outlook',
    featured: false,
  },

  'investment-strategy-2025': {
    id: 'investment-strategy-2025',
    title: '2025년 투자 전망: CEO를 위한 지정학적 리스크 돌파 전략',
    excerpt: 'AI, 금리, 지정학적 변수 속에서 대표님의 자산을 지키고 불리는 핵심 인사이트. 2025년 글로벌 경제 환경 변화에 대응하는 포트폴리오 전략을 제시합니다.',
    content: `<div className="font-sans leading-relaxed max-w-4xl mx-auto text-base text-gray-800 dark:text-gray-200 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen px-5">

<header className="text-center mb-10 py-8 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/50 dark:border-gray-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/40 dark:hover:bg-gray-800/40">
    <h1 className="text-emerald-800 dark:text-emerald-300 text-3xl lg:text-4xl font-bold leading-tight mb-4 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors duration-300">[FamilyOffice S] 2025년 투자 전망: CEO를 위한 지정학적 리스크 돌파 전략</h1>
    <p className="text-orange-700 dark:text-orange-300 text-lg lg:text-xl leading-relaxed">AI, 금리, 지정학적 변수 속에서 대표님의 자산을 지키고 불리는 핵심 인사이트</p>
    <div className="mt-5 text-gray-400 dark:text-gray-500 text-sm backdrop-blur-sm bg-white/20 dark:bg-gray-700/20 rounded-lg px-4 py-2 inline-block">
        작성일: 2025년 8월 18일 | 예상 읽기 시간: 20분 | 카테고리: 투자전략, 글로벌 경제
    </div>
</header>

<div className="backdrop-blur-sm bg-gradient-to-br from-emerald-600/90 to-emerald-700/90 dark:from-emerald-800/90 dark:to-emerald-900/90 text-white p-8 rounded-3xl mb-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border border-white/20 dark:border-gray-600/20">
    <h2 className="text-white text-xl font-bold mb-5">📋 Executive Summary</h2>
    <div className="backdrop-blur-sm bg-white/20 dark:bg-black/30 p-5 rounded-2xl mb-5 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 border border-white/30 dark:border-gray-600/30">
        <h3 className="text-white text-base font-semibold mb-3">🎯 핵심 포인트 3줄 요약</h3>
        <ul className="text-white text-sm leading-relaxed space-y-2">
            <li className="hover:text-yellow-200 transition-colors duration-200">2025년 글로벌 경제는 완만한 성장 속 지정학적 리스크와 무역 갈등이 최고 위험 요인으로 부상하며, 자산 방어 전략이 중요해질 것으로 전망됩니다.</li>
            <li className="hover:text-yellow-200 transition-colors duration-200">AI·반도체 섹터의 구조적 성장은 지속될 것으로 예상되며, 금리 인하 사이클 진입은 채권 및 고정수익 자산의 매력도를 높일 가능성이 높습니다.</li>
            <li className="hover:text-yellow-200 transition-colors duration-200">성공적인 자산 관리를 위해서는 미국 중심의 포트폴리오를 다변화하고, 사모펀드·부동산 등 대체 투자를 활용한 중장기적 방어 및 성장 전략이 필요합니다.</li>
        </ul>
    </div>
    <div className="backdrop-blur-sm bg-white/20 dark:bg-black/30 p-5 rounded-2xl hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 border border-white/30 dark:border-gray-600/30">
        <h3 className="text-white text-base font-semibold mb-3">📑 목차</h3>
        <ol className="text-white text-sm leading-relaxed space-y-1.5 list-decimal list-inside">
            <li className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">현황 분석: 2025년 글로벌 경제 및 투자 환경</li>
            <li className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">문제점 진단: CEO가 직면한 핵심 리스크</li>
            <li className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">실무 가이드: 자산별 투자 전략 상세 분석</li>
            <li className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">사례 연구: 리스크 대응 포트폴리오 재편 성공 사례</li>
            <li className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">미래 전망 및 실행 액션 플랜</li>
        </ol>
    </div>
</div>

<section className="mb-12">
    <h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold border-b-2 border-gray-200 dark:border-gray-700 pb-2.5 mb-6">📊 현황 분석: 2025년 글로벌 경제 및 투자 환경</h2>
    
    <div className="backdrop-blur-sm bg-emerald-50/80 dark:bg-emerald-900/30 border border-emerald-500/50 dark:border-emerald-600/50 p-6 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-emerald-50/90 dark:hover:bg-emerald-900/40 hover:scale-[1.01]">
        <h3 className="text-emerald-800 dark:text-emerald-300 text-lg font-semibold mb-4">📈 글로벌 경제 데이터</h3>
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4">2025년 글로벌 경제는 여러 도전 과제 속에서 완만한 성장세를 이어갈 것으로 보입니다. 주요 국제기구 및 금융기관의 데이터를 종합해 보면, 대표님께서 주목하셔야 할 몇 가지 핵심 지표가 있습니다.</p>
        
        <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-5 rounded-xl border-l-4 border-emerald-500 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:shadow-md border border-white/50 dark:border-gray-700/50">
            <h4 className="text-emerald-700 dark:text-emerald-300 text-base font-semibold mb-2.5">주요 경제 전망 (Green & Yellow Zone)</h4>
            <ul className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2">
                <li className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">✅ <strong>세계 경제성장률 (확정 정보)</strong>: IMF는 2025년 전 세계 경제성장률을 3.0%로 전망했으며, 2026년에는 3.1%로 소폭 개선될 것으로 발표했습니다.</li>
                <li className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">⚠ <strong>주요국 성장률 (예상 정보)</strong>: 도이치뱅크 자산운용에 따르면, 중국은 4.2% 성장률이 예상되나 과거 대비 둔화된 수치이며, 미국은 1.7%로 2024년 대비 성장세가 크게 둔화될 것으로 전망됩니다.</li>
                <li className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">⚠ <strong>한국 경제성장률 (예상 정보)</strong>: KDI 등 국내 주요 연구기관들은 2025년 한국 경제가 내수 부진과 수출 증가세 둔화로 1.6% 성장에 그칠 것으로 예상하고 있습니다.</li>
            </ul>
        </div>
        <div className="backdrop-blur-sm bg-amber-50/80 dark:bg-amber-900/30 border border-amber-400/50 dark:border-amber-600/50 p-3 rounded-xl my-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-amber-50/90 dark:hover:bg-amber-900/40">
            <p className="text-amber-800 dark:text-amber-200 text-xs m-0">
                ⚠ <span className="font-semibold">정보 안내</span>: 본 내용은 현재까지 공개된 정보를 바탕으로 한 전망으로, 
                최종 확정 전까지 변경될 수 있습니다. 실제 의사결정 시 최신 공식 정보를 반드시 확인하시기 바랍니다.
            </p>
        </div>
    </div>
    
    <div className="backdrop-blur-sm bg-orange-50/80 dark:bg-orange-900/30 border border-orange-500/50 dark:border-orange-600/50 p-6 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50/90 dark:hover:bg-orange-900/40 hover:scale-[1.01]">
        <h3 className="text-orange-800 dark:text-orange-300 text-lg font-semibold mb-4">🏛 통화 정책 동향: 금리 인하 사이클 진입</h3>
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">글로벌 인플레이션이 점진적으로 안정화되면서 각국 중앙은행의 통화정책 또한 완화 기조로 전환될 가능성이 높습니다. OECD는 2025년 OECD 전체 인플레이션을 4.2%로 예상하며 점진적 안정화를 전망했습니다. 이에 따라, 한국은행과 미국 연준 모두 단계적인 금리 인하를 단행할 것으로 예상되며, 이는 시장 유동성 증가로 이어져 자산 시장에 중요한 변수가 될 것입니다.</p>
        <div className="backdrop-blur-sm bg-amber-50/80 dark:bg-amber-900/30 border border-amber-400/50 dark:border-amber-600/50 p-3 rounded-xl my-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-amber-50/90 dark:hover:bg-amber-900/40">
            <p className="text-amber-800 dark:text-amber-200 text-xs m-0">
                ⚠ <span className="font-semibold">정보 안내</span>: 본 내용은 현재까지 공개된 정보를 바탕으로 한 전망으로, 
                최종 확정 전까지 변경될 수 있습니다. 실제 의사결정 시 최신 공식 정보를 반드시 확인하시기 바랍니다.
            </p>
        </div>
    </div>
    
    <div className="backdrop-blur-sm bg-emerald-50/80 dark:bg-emerald-900/30 border border-emerald-500/50 dark:border-emerald-600/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-emerald-50/90 dark:hover:bg-emerald-900/40 hover:scale-[1.01]">
        <h3 className="text-emerald-800 dark:text-emerald-300 text-lg font-semibold mb-4">🏢 패밀리오피스 동향: 대체투자 비중 확대</h3>
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">✅ BNY Mellon의 보고서에 따르면, 전 세계 패밀리오피스들은 불확실성에 대응하기 위해 대체투자 비중을 꾸준히 늘리고 있습니다. 포트폴리오에서 사모펀드가 28%로 가장 큰 비중을 차지했으며, 부동산(18%)과 벤처캐피털 투자가 그 뒤를 잇고 있습니다. 이는 전통 자산을 넘어 안정성과 장기적 고수익을 동시에 추구하려는 움직임으로 해석됩니다.</p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold border-b-2 border-gray-200 dark:border-gray-700 pb-2.5 mb-6">🔍 문제점 진단: CEO가 직면한 핵심 리스크</h2>
    
    <div className="backdrop-blur-sm bg-red-50/80 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-6 rounded-r-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-red-50/90 dark:hover:bg-red-900/40 hover:scale-[1.01] border border-red-200/50 dark:border-red-700/50">
        <h3 className="text-red-600 dark:text-red-400 text-lg font-semibold mb-4">⚠ 현재 이슈: 심화되는 지정학적 리스크</h3>
        <p className="text-red-800 dark:text-red-300 text-base leading-relaxed">✅ UBS의 2025년 글로벌 패밀리오피스 보고서에 따르면, 응답자들이 꼽은 가장 큰 투자 리스크는 '무역전쟁'과 같은 지정학적 갈등이었습니다. 미국의 관세 정책 변화와 각국의 공급망 재편 움직임은 대표님 기업의 실적뿐만 아니라 개인 자산 포트폴리오에도 직접적인 영향을 미칠 수 있는 중대한 변수입니다.</p>
    </div>
    
    <div className="backdrop-blur-sm bg-amber-50/80 dark:bg-amber-900/30 border-l-4 border-amber-500 dark:border-amber-400 p-6 rounded-r-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-amber-50/90 dark:hover:bg-amber-900/40 hover:scale-[1.01] border border-amber-200/50 dark:border-amber-700/50">
        <h3 className="text-amber-600 dark:text-amber-400 text-lg font-semibold mb-4">🚨 위험 요소: 특정 자산 및 지역 편중의 함정</h3>
        <p className="text-amber-800 dark:text-amber-300 text-base leading-relaxed">그동안 높은 수익률을 안겨주었던 미국 기술주 중심의 포트폴리오는 2025년에도 유효할 수 있으나, 그 변동성은 더욱 커질 것으로 예상됩니다. 특정 자산, 특정 지역에 대한 과도한 집중은 예상치 못한 외부 충격에 포트폴리오 전체를 위험에 빠뜨릴 수 있는 잠재적 위험 요소입니다.</p>
    </div>
    
    <div className="backdrop-blur-sm bg-emerald-50/80 dark:bg-emerald-900/30 border-l-4 border-emerald-500 dark:border-emerald-400 p-6 rounded-r-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-emerald-50/90 dark:hover:bg-emerald-900/40 hover:scale-[1.01] border border-emerald-200/50 dark:border-emerald-700/50">
        <h3 className="text-emerald-600 dark:text-emerald-400 text-lg font-semibold mb-4">🎯 기회 요소: 구조적 성장 테마와 자산 다변화</h3>
        <p className="text-emerald-800 dark:text-emerald-300 text-base leading-relaxed">위기 속에서도 기회는 존재합니다. AI 및 반도체 산업의 구조적 성장은 여전히 유효한 투자 테마로 평가됩니다. 또한, 금리 인하 시기에는 채권 등 고정수익 자산의 가치가 부각될 수 있으며, 사모펀드와 같은 대체 투자를 통해 새로운 성장 동력을 발굴할 기회가 열릴 수 있습니다.</p>
    </div>
</section>

<div className="backdrop-blur-sm bg-gradient-to-br from-emerald-800/90 to-emerald-700/90 dark:from-emerald-900/90 dark:to-emerald-800/90 text-white p-10 rounded-3xl my-10 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border border-white/20 dark:border-gray-600/20">
    <h2 className="text-white text-2xl font-bold mb-5">📞 전문가 상담 문의</h2>
    <p className="text-base opacity-90 leading-relaxed mb-8">
        2025년의 복잡한 시장 환경, 혼자 고민하지 마십시오.<br />
        FamilyOffice S의 금융/세무/IT 전문가 그룹이 대표님만을 위한 맞춤형 전략을 제시해 드립니다.
    </p>
    
    <div className="flex gap-4 justify-center flex-wrap mb-8">
        <a href="https://seminar.familyoffices.vip" target="_blank" className="group inline-flex items-center gap-2 backdrop-blur-sm bg-gradient-to-r from-orange-500/90 to-orange-600/90 dark:from-orange-600/90 dark:to-orange-700/90 text-white px-6 py-4 rounded-2xl no-underline font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:from-orange-400 hover:to-orange-500 dark:hover:from-orange-500 dark:hover:to-orange-600 border border-white/30 dark:border-gray-600/30">
            <span className="group-hover:animate-pulse">🎯</span> 세미나 신청
        </a>
        <a href="https://cal.com/familyoffice" target="_blank" className="group inline-flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 text-emerald-800 dark:text-emerald-300 px-6 py-4 rounded-2xl no-underline font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-700 border border-white/50 dark:border-gray-600/50">
            <span className="group-hover:animate-pulse">📅</span> 1:1 맞춤 상담
        </a>
        <a href="https://pf.kakao.com/_gsxkxdG/chat" target="_blank" className="group inline-flex items-center gap-2 backdrop-blur-sm bg-yellow-400/90 dark:bg-yellow-500/90 text-gray-800 dark:text-gray-900 px-6 py-4 rounded-2xl no-underline font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-yellow-300 dark:hover:bg-yellow-400 border border-white/50 dark:border-gray-600/50">
            <span className="group-hover:animate-pulse">💬</span> 카카오톡 문의
        </a>
    </div>
    
    <div className="border-t border-white/30 dark:border-gray-600/30 pt-5">
        <p className="text-sm opacity-80 backdrop-blur-sm bg-white/10 dark:bg-black/20 rounded-lg px-4 py-2 inline-block">
            📞 전화상담: ☎ 0502-5550-8700 (평일 10:00-18:00)
        </p>
    </div>
</div>

<div className="backdrop-blur-sm bg-slate-100/80 dark:bg-slate-800/80 border-2 border-slate-300/50 dark:border-slate-600/50 p-6 rounded-2xl my-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-slate-100/90 dark:hover:bg-slate-800/90">
    <h3 className="text-slate-600 dark:text-slate-400 text-lg font-bold mb-4">⚠ 중요 고지사항</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
        본 자료는 일반적인 정보 제공을 목적으로 작성되었으며, 개별 상황에 따라 다를 수 있습니다. 
        구체적인 실행은 반드시 전문가의 자문을 받으신 후 개인의 판단과 책임하에 이루어져야 합니다.
    </p>
    <ul className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed space-y-1.5">
        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200">투자 결정은 개인의 판단과 책임하에 이루어져야 하며, 투자 전 전문가와 상담하시기 바랍니다.</li>
        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200">세법 및 관련 규정은 변경될 수 있으므로 최신 정보를 확인하시기 바랍니다.</li>
        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200">예측 및 전망 정보는 현재 시점 분석으로, 향후 정책 변화에 따라 달라질 수 있습니다.</li>
        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200">본 블로그 내용의 활용으로 인한 직간접적 손해에 대해 책임지지 않습니다.</li>
    </ul>
</div>

</div>`,
    category: '투자전략',
    author: '임재홍',
    date: '2025-08-18',
    readTime: '20분',
    tags: ['2025년 투자 전망', '지정학적 리스크', 'AI 투자', '포트폴리오 전략', '자산 다변화'],
    slug: 'investment-strategy-2025',
    featured: true,
  },

  // 새로 추가된 뉴스레터 기반 블로그 포스트들
  'corporate-life-insurance-ceo-risk-management': {
    id: 'corporate-life-insurance-ceo-risk-management',
    title: '중견기업 CEO 유고시 대비 리스크 관리 완전 가이드',
    excerpt: 'CEO의 갑작스러운 부재에 대비한 기업생명보험 설계와 리스크 관리 방안. 실제 케이스 분석과 절세 전략까지 한번에 해결하세요.',
    content: '', // 실제 콘텐츠는 별도 마크다운 파일에서 로드
    category: '리스크관리',
    author: 'FamilyOffice S 편집팀',
    date: '2025-08-09',
    readTime: '5분',
    tags: ['CEO 유고', '리스크 관리', '기업생명보험', '중견기업', '비상계획', '승계계획'],
    slug: 'corporate-life-insurance-ceo-risk-management',
    featured: true,
  },

  'hospital-mso-guide-tax-saving-strategy': {
    id: 'hospital-mso-guide-tax-saving-strategy',
    title: '병원장 필독: 성공하는 MSO의 3가지 조건',
    excerpt: 'MSO 설립시 반드시 고려해야 할 세무, 승계 계획, 리스크 관리 전략을 상세히 분석했습니다.',
    content: '', // 실제 콘텐츠는 별도 마크다운 파일에서 로드
    category: '의료법인',
    author: 'FamilyOffice S 편집팀',
    date: '2025-08-19',
    readTime: '5분',
    tags: ['MSO', '의료법인', '병원 절세', '의료진 승계', '병원경영', '의료 세무'],
    slug: 'hospital-mso-guide-tax-saving-strategy',
    featured: true,
  },

  'retained-earnings-dividend-strategy-ceo-asset-optimization': {
    id: 'retained-earnings-dividend-strategy-ceo-asset-optimization',
    title: '대표님의 숨은 자산 이익잉여금을 깨울 시간입니다',
    excerpt: '기업의 이익잉여금을 효과적으로 활용하여 개인 자산화하는 전략과 절세 방안을 제시합니다.',
    content: '', // 실제 콘텐츠는 별도 마크다운 파일에서 로드
    category: '법인자산',
    author: 'FamilyOffice S 편집팀',
    date: '2025-08-17',
    readTime: '4분',
    tags: ['이익잉여금', '배당전략', '법인세', '개인자산화', '중견기업', 'CEO 자산관리'],
    slug: 'retained-earnings-dividend-strategy-ceo-asset-optimization',
    featured: false,
  },

  'corporate-treasury-stock-retirement-2025-tax-analysis': {
    id: 'corporate-treasury-stock-retirement-2025-tax-analysis',
    title: '2025년 세법 기준 자기주식 소각의 진짜 세율과 치명적 리스크',
    excerpt: '자기주식 소각시 발생하는 세금과 리스크를 2025년 최신 세법 기준으로 분석했습니다.',
    content: '', // 실제 콘텐츠는 별도 마크다운 파일에서 로드
    category: '세무',
    author: 'FamilyOffice S 편집팀',
    date: '2025-08-12',
    readTime: '6분',
    tags: ['자기주식 소각', '의제배당', '양도소득세', '2025년 세법', '법인세법', '중견기업'],
    slug: 'corporate-treasury-stock-retirement-2025-tax-analysis',
    featured: false,
  },
};