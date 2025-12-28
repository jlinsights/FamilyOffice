import { BlogPost } from '@/types/blog';

export const post: BlogPost = {
    id: 'family-office-basics-guide',
    title: '패밀리오피스란 무엇인가',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
    excerpt:
      '과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있습니다. 단순히 부를 물려주는 것이 아닌, 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 현대적 패밀리오피스의 진정한 의미를 알아보세요.',
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
    tags: [
      '패밀리오피스',
      '가업승계',
      '자산관리',
      '상속세',
      '중견기업',
      'MFO',
      '디지털패밀리오피스',
      '가문경영',
      '세무전략',
      '투자다각화',
    ],
    slug: 'family-office-basics-guide',
    featured: true,
  };
