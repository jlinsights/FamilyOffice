import { BlogPost } from '@/types/blog';

export const post: BlogPost = {
  id: 'mid-sized-company-succession-issues',
  title:
    "중견기업 승계, '세금'보다 무서운 것은 '준비 없는 이별'입니다: 10년 차 컨설턴트의 제언",
  image:
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
  excerpt:
    '상속세 최고세율 60%의 공포, 그리고 경영권 분쟁의 리스크. 중견기업 승계의 성공과 실패를 가르는 결정적 차이와 골든타임 전략을 심층 분석합니다.',
  content: `<div className="font-sans leading-relaxed max-w-4xl mx-auto text-base text-foreground bg-background px-5">

<header className="text-center mb-10 py-8 border-b-4 border-primary">
    <h1 className="text-primary mb-4 text-3xl md:text-4xl font-bold leading-tight">중견기업 승계, '세금'보다 무서운 것은<br/>'준비 없는 이별'입니다</h1>
    <p className="text-muted-foreground text-lg font-normal leading-relaxed">상속세 최고세율 60%의 공포를 넘어<br/>100년 기업으로 가는 '아름다운 바통 터치'의 기술</p>
    <div className="mt-5 text-muted-foreground text-sm">
        작성일: 2025년 2월 20일 | 예상 읽기 시간: 16분 | 카테고리: 가업승계 및 지배구조
    </div>
</header>

<div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-2xl mb-10 shadow-xl">
    <h2 className="text-white mb-5 text-xl font-bold">🚀 Executive Summary</h2>
    <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <h3 className="text-blue-300 font-bold mb-2">💸 Tax Risk (세금)</h3>
            <p className="text-sm opacity-90">OECD 최고 수준인 상속세율(최대 60%)은 기업의 지배력을 송두리째 흔들 수 있습니다. 가업상속공제 등 제도의 전략적 활용이 필수입니다.</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <h3 className="text-purple-300 font-bold mb-2">⚔️ Family Risk (분쟁)</h3>
            <p className="text-sm opacity-90">준비 없는 상속은 필연적으로 유류분 반환 청구 소송 등 가족 간 분쟁을 야기하며, 이는 기업 경영권 위협으로 직결됩니다.</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <h3 className="text-amber-300 font-bold mb-2">👑 Governance (지배구조)</h3>
            <p className="text-sm opacity-90">단순한 지분 이전을 넘어, 후계자가 안정적으로 경영권을 행사할 수 있도록 지주회사 전환 등 지배구조의 현대화가 필요합니다.</p>
        </div>
    </div>
</div>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">1. 서론: 승계는 '이벤트'가 아니라 '프로세스'입니다</h2>
    <p className="mb-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
        "내가 죽으면 알아서들 하겠지." 혹은 "아직 건강한데 벌써부터 무슨 상속 이야기인가?"
    </p>
    <p className="mb-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
        지난 10년간 현장에서 만난 수많은 창업주분들이 하셨던 말씀입니다. 하지만 안타깝게도, '알아서 잘 되는' 승계는 단 한 번도 본 적이 없습니다. 승계는 어느 날 갑자기 일어나는 이벤트가 되어서는 안 됩니다. 최소 10년 이상의 시간을 두고 치밀하게 준비해야 하는 장기 프로젝트, 즉 '프로세스(Process)'여야 합니다.
    </p>
    <p className="mb-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
        특히 기업 가치가 수백억, 수천억 원에 달하는 중견기업의 경우, 준비 없는 승계는 곧 **'기업의 해체'**를 의미합니다. 막대한 상속세를 납부하기 위해 알짜 자산을 매각하거나, 경영권 방어에 실패하여 사모펀드(PEF)에 회사를 넘기는 사례가 비일비재하기 때문입니다.
    </p>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">2. 중견기업 승계를 가로막는 3가지 거대한 장벽</h2>
    
    <div className="space-y-8">
        {/* Risk 1 */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 bg-red-100 dark:bg-red-900/40 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px]">
                <span className="text-4xl mb-3">📉</span>
                <h3 className="text-red-800 dark:text-red-300 font-bold text-lg">살인적인 상속세율</h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">최고 60% (할증평가 포함)</p>
            </div>
            <div className="w-full md:w-2/3">
                <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">지분 절반을 국가에 헌납하시겠습니까?</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    대한민국의 상속세율은 OECD 국가 중 최상위권입니다. 최대주주 할증평가(20%)까지 더해지면 실질 세율은 60%에 육박합니다. 1,000억 원 가치의 기업을 물려주려면 600억 원을 세금으로 내야 한다는 뜻입니다. 현금성 자산이 부족한 대부분의 기업 오너에게 이는 '재앙'과도 같습니다.
                </p>
            </div>
        </div>

        {/* Risk 2 */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 bg-orange-100 dark:bg-orange-900/40 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px]">
                <span className="text-4xl mb-3">⚔️</span>
                <h3 className="text-orange-800 dark:text-orange-300 font-bold text-lg">가족 간의 분쟁</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">유류분 & 경영권 다툼</p>
            </div>
            <div className="w-full md:w-2/3">
                <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">"피는 물보다 진하다"는 옛말입니다</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    창업주 사후, 형제자매 간의 경영권 분쟁이나 소외된 상속인들의 유류분 반환 청구 소송은 이제 뉴스에서나 보는 일이 아닙니다. 이러한 분쟁은 기업의 대외 신인도를 추락시키고, 임직원들의 사기를 저하시키며, 결국 기업 경쟁력을 갉아먹습니다.
                </p>
            </div>
        </div>

        {/* Risk 3 */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 bg-slate-100 dark:bg-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px]">
                <span className="text-4xl mb-3">🧩</span>
                <h3 className="text-slate-800 dark:text-slate-300 font-bold text-lg">복잡한 지배구조</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">순환출자 & 차명주식</p>
            </div>
            <div className="w-full md:w-2/3">
                <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">과거의 유산이 발목을 잡습니다</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    과거 성장이 우선시되던 시절 만들어진 복잡한 순환출자 고리나, 명의신탁 주식(차명주식) 문제는 승계 과정에서 반드시 터지는 시한폭탄입니다. 이를 정리하지 않고는 투명한 승계도, 가업상속공제 혜택도 불가능합니다.
                </p>
            </div>
        </div>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">3. 골든타임을 놓치지 않는 3가지 필승 전략</h2>
    
    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">Strategy 1: 사전 증여와 과세특례제도의 활용</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            주가가 낮을 때 미리 증여하는 것이 최고의 절세입니다. 특히 **'가업승계 주식에 대한 증여세 과세특례'** 제도를 활용하면, 최대 600억 원(2025년 세법 개정안 기준 검토 필요)까지 10%(과표 구간에 따라 20%)의 낮은 세율로 주식을 증여할 수 있습니다. 이는 사후 상속세 부담을 획기적으로 줄여주는 핵심 키(Key)입니다.
        </p>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-blue-600 dark:text-blue-400">💡 Tip:</strong> 증여 후 10년(상속인 외는 5년)이 지나면 상속 재산 합산에서 배제되는 일반 증여와 달리, 과세특례 증여분은 기간에 관계없이 상속세 정산 대상이 됩니다. 하지만 증여 시점의 낮은 주가로 고정되어 합산되므로, 기업 가치가 상승할수록 절세 효과는 극대화됩니다.
        </div>
    </div>

    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">Strategy 2: 지배구조 개편 (Holding Company)</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            여러 계열사가 복잡하게 얽혀 있다면, **지주회사(Holding Company)** 체제로의 전환을 고려해야 합니다. 오너 일가는 지주회사의 지분만 확보하면, 지주회사를 통해 전체 계열사를 지배할 수 있어 적은 지분으로도 경영권을 공고히 할 수 있습니다. 또한, 이 과정에서 발생하는 주식 양도차익에 대한 과세 이연 혜택도 누릴 수 있습니다.
        </p>
    </div>

    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">Strategy 3: 가족 헌장(Family Constitution) 제정</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            법적인 구속력은 없지만, 가족 간의 합의를 문서화하는 **'가족 헌장'**은 분쟁 예방에 큰 효과가 있습니다. 경영 참여의 원칙, 주식 보유 및 처분 제한, 가족 모임 정례화, 사회 공헌 등의 내용을 담아 가족 모두가 동의하는 '가문의 룰'을 만드는 것입니다. 이는 승계 이후에도 가문의 결속력을 유지하는 정신적 지주가 됩니다.
        </p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">4. 맺음말: 100년 기업을 향한 위대한 여정</h2>
    <p className="mb-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
        승계는 단순히 부(富)의 이전이 아닙니다. 창업주의 철학과 땀이 서린 기업가 정신을 다음 세대로 계승하는 숭고한 과정입니다. 세금 문제는 기술적인 부분일 뿐, 더 중요한 것은 후계자가 리더로서 인정받고 조직을 이끌어갈 수 있는 '준비된 리더십'을 갖추는 것입니다.
    </p>
    <p className="mb-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
        시간은 기다려주지 않습니다. 지금이 가장 빠를 때입니다. 10년 앞을 내다보는 혜안으로, 전문가와 함께 당신만의 '승계 로드맵'을 그리십시오. 그것이 당신이 일군 기업을 영원히 지키는 유일한 길입니다.
    </p>
</section>

<div className="bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 p-6 rounded-xl my-10">
    <h3 className="text-slate-600 dark:text-slate-400 mb-4 text-lg font-bold">📞 전문가 상담 안내</h3>
    <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
        중견기업 승계는 세무, 법무, 노무, 그리고 금융이 복합적으로 얽힌 고차방정식입니다. 패밀리오피스 전문가 그룹의 심층 진단을 통해 귀사에 최적화된 솔루션을 제안받으시기 바랍니다.
    </p>
</div>

</div>`,
  category: '승계전략',
  author: '임재홍',
  date: '2025-02-20',
  readTime: '16분',
  tags: [
    '가업승계',
    '상속세',
    '증여세과세특례',
    '경영권방어',
    '지배구조개편',
    '유류분반환청구',
    '패밀리오피스',
  ],
  slug: 'mid-sized-company-succession-issues',
  featured: true,
  faq: [
    {
      question: '가업승계 시 가장 큰 리스크는 무엇인가요?',
      answer:
        '최대 60%에 달하는 상속세 부담과 준비 없는 승계로 인한 가족 간 경영권 분쟁이 가장 큰 리스크입니다.',
    },
    {
      question: '가업상속공제란 무엇인가요?',
      answer:
        '일정 요건을 갖춘 중소·중견기업을 승계할 때, 가업상속재산 가액의 일부(최대 600억 원)를 상속세 과세가액에서 공제해 주는 제도입니다.',
    },
    {
      question: '승계 준비는 언제부터 시작해야 하나요?',
      answer:
        '최소 10년 이상의 장기적인 계획이 필요합니다. 주가가 낮을 때 사전 증여를 실행하고, 지배구조를 개편하며, 후계자를 육성하는 시간을 확보해야 합니다.',
    },
  ],
};
