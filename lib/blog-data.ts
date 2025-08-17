import { BlogPost, BlogCategory } from '@/types/blog';

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
    count: 2,
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
    count: 3,
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
];

// FamilyOffice S 블로그 포스트 (발행 준비된 콘텐츠)
export const blogPosts: Record<string, BlogPost> = {
  'family-office-basics-guide': {
    id: 'family-office-basics-guide',
    title: '🏰 더 이상 "남의 이야기"가 아니다! 중견기업 CEO를 위한 패밀리오피스 완전 정복',
    excerpt: '과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있습니다. 단순히 부를 물려주는 것이 아닌, 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 현대적 패밀리오피스의 진정한 의미를 알아보세요.',
    content: `<div style="font-family: 'Noto Sans KR', sans-serif; line-height: 1.7; max-width: 600px; margin: 0 auto; font-size: 16px; color: #333; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #1e3a8a, #3730a3); color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; text-align: center;">
        <h1 style="margin: 0 0 10px; font-size: 20px; font-weight: 700;">🏰 더 이상 "남의 이야기"가 아니다!</h1>
        <p style="margin: 0; font-size: 14px; opacity: 0.9; line-height: 1.5;">과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있습니다. 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 현대적 패밀리오피스의 진정한 의미를 알아보겠습니다.</p>
    </div>
    
    <div style="background-color: #f8f9ff; border-left: 4px solid #4f46e5; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
        <h2 style="color: #4f46e5; margin: 0 0 15px; font-size: 18px; font-weight: 600;">🔥 이번 주 핵심 인사이트</h2>
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
            <strong style="color: #1e293b; font-size: 16px; display: block; margin-bottom: 8px;">"그들만의 리그"였던 패밀리오피스, 이제는 중견기업의 필수 전략입니다.</strong>
            <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 14px;">
                <li style="margin-bottom: 6px;"><strong>현상</strong>: 패밀리오피스가 중견기업 및 성공한 창업가 사이에서 빠르게 확산되고 있습니다.</li>
                <li style="margin-bottom: 6px;"><strong>영향</strong>: 복잡한 가업승계, 세무 리스크, 투자 다각화 등 기업과 가문의 문제를 통합적으로 관리하는 효과적인 해결책으로 부상하고 있습니다.</li>
                <li style="margin-bottom: 6px;"><strong>액션</strong>: 더 이상 "남의 이야기"가 아닙니다. 우리 회사와 가문에 맞는 패밀리오피스 모델을 진지하게 고민하고 준비를 시작해야 할 때입니다.</li>
            </ul>
        </div>
    </div>
    
    <div style="padding: 10px;">
        <h2 style="font-size: 20px; color: #1e3a8a; margin: 30px 0 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">💡 들어가며: "자식에게는 회사가 아닌 행복을 물려주고 싶다"</h2>
        <p style="margin-bottom: 20px; font-size: 15px; color: #475569;">최근 한 중견기업 CEO께서 하신 이 말씀이 깊은 울림을 주었습니다. 과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있는 이유가 바로 여기에 있습니다.</p>
        <p style="margin-bottom: 20px; font-size: 15px; color: #475569;">단순히 부(富)를 물려주는 것이 아니라, 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 것 - 이것이 바로 현대적 패밀리오피스의 진정한 의미입니다.</p>
    </div>
    
    <div style="padding: 10px;">
        <h2 style="font-size: 20px; color: #1e3a8a; margin: 30px 0 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">🤔 패밀리오피스, 왜 지금 다시 주목받고 있습니까?</h2>
        <p style="margin-bottom: 20px; font-size: 15px; color: #475569;">대표님, 혹시 "자산 관리는 은행 PB에게, 세무는 세무법인에, 법률 자문은 로펌에" 맡기는 방식에 한계를 느끼신 적 없으신가요? 각 분야 전문가들이 모여도 정작 대표님 가문 전체의 큰 그림을 봐주는 곳은 없다는 아쉬움, 많은 분들이 공감하는 지점입니다.</p>
        <p style="margin-bottom: 20px; font-size: 15px; color: #475569;">패밀리오피스는 개별 금융 상품 추천을 넘어, 가문의 자산을 통합적으로 관리하고, 가업승계와 상속, 세금 문제, 법률 리스크까지 아우르는 "가문의 최고재무책임자(CFO)" 역할을 수행합니다.</p>
        
        <div style="background-color: #f8f9ff; border-left: 4px solid #4f46e5; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <strong style="color: #4f46e5; font-size: 15px; display: block; margin-bottom: 5px;">💡 패밀리오피스의 핵심 기능</strong>
            <p style="margin: 0; font-size: 14px; color: #4a5568;">단순 자산관리를 넘어 가문의 "지속가능성"을 목표로 투자, 세무, 법률, 승계, 사회공헌까지 모든 것을 관리하는 종합 솔루션입니다.</p>
        </div>
    </div>
    
    <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #0c4a6e; margin: 0 0 15px; font-size: 16px; font-weight: 600;">📊 2025년 패밀리오피스 시장 트렌드</h3>
        <div style="margin-bottom: 15px;">
            <h4 style="color: #1e293b; margin: 0 0 8px; font-size: 15px;">멀티 패밀리오피스(MFO)의 부상과 디지털 전환</h4>
            <p style="margin: 0 0 12px; color: #475569; font-size: 14px; line-height: 1.6;">과거에는 한 가문만을 위한 "싱글 패밀리오피스(SFO)"가 일반적이었습니다. 하지만 수십억 원에 달하는 높은 설립 및 유지 비용 때문에 일부 대기업 오너 가문의 전유물이었습니다. 최근에는 여러 가문이 하나의 패밀리오피스를 공동으로 이용하는 "멀티 패밀리오피스(MFO)"가 합리적인 대안으로 떠오르며, 중견기업 CEO와 IT/바이오 창업 성공자들의 시장 진입을 이끌고 있습니다.</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 12px;">
            <strong style="color: #0c4a6e; font-size: 14px;">📈 주요 지표 (2025년 전망)</strong>
            <ul style="margin: 8px 0 0; padding-left: 18px; color: #64748b; font-size: 13px;">
                <li style="margin-bottom: 4px;">국내 패밀리오피스 시장 규모: 약 70조 원 돌파 예상</li>
                <li style="margin-bottom: 4px;">멀티 패밀리오피스(MFO) 성장률: 연평균 15% 이상 성장 전망</li>
                <li style="margin-bottom: 4px;">주요 관심 분야: 가업승계(35%) → 글로벌 대체투자(40%)로 관심 이동 예상</li>
            </ul>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 6px;">
            <strong style="color: #0c4a6e; font-size: 14px;">💡 FamilyOffice S 인사이트</strong>
            <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">정부의 가업상속공제 제도 개편 논의와 맞물려, 세대교체를 앞둔 중견기업의 패밀리오피스 도입은 선택이 아닌 필수가 될 것으로 전망됩니다. 특히 IT 기술을 접목한 "디지털 패밀리오피스"는 실시간 자산 현황 분석, 리스크 시뮬레이션 등을 통해 훨씬 더 정교하고 투명한 의사결정을 지원하게 될 것입니다.</p>
        </div>
    </div>
    
    <div style="padding: 10px;">
        <h2 style="font-size: 20px; color: #1e3a8a; margin: 30px 0 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">🎯 우리 회사에 맞는 패밀리오피스, 어떻게 시작할까요?</h2>
        <p style="margin-bottom: 20px; font-size: 15px; color: #475569;">패밀리오피스는 거창한 것이 아닙니다. 가문의 자산과 철학을 다음 세대로 온전히 물려주기 위한 "시스템"을 만드는 과정입니다. 처음부터 모든 것을 갖춘 완벽한 조직을 만들기보다, 핵심 기능부터 하나씩 갖추어 나가는 단계적 접근이 중요합니다.</p>
    </div>
    
    <div style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 20px; border-radius: 12px; margin: 25px 0;">
        <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 600;">🎯 이번 주 실무 팁</h3>
        <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <strong style="font-size: 14px; display: block; margin-bottom: 8px;">⏰ 3분 액션: 패밀리오피스 준비 1단계</strong>
            <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.5;">
                <li style="margin-bottom: 4px;"><strong>가족 회의 개최:</strong> 가문의 자산 현황과 미래 비전에 대해 가족 구성원들과 처음으로 공식적인 대화를 나눠보세요.</li>
                <li style="margin-bottom: 4px;"><strong>자산 지도 그리기:</strong> 개인 자산, 법인 자산, 부동산, 금융 투자, 해외 자산 등을 한 장의 표로 정리하여 전체 자산 현황을 파악합니다.</li>
                <li style="margin-bottom: 4px;"><strong>전문가 인터뷰:</strong> 은행 PB, 세무사, 변호사가 아닌 "패밀리오피스 전문가"를 만나 우리 가문에 필요한 서비스가 무엇인지 진단받아 보세요.</li>
            </ol>
        </div>
        <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px;">
            <strong style="font-size: 14px; display: block; margin-bottom: 8px;">🔧 실무 체크리스트</strong>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.5; list-style: none;">
                <li style="margin-bottom: 4px;">□ 우리 가문의 "가헌(家憲)"이 있는가?</li>
                <li style="margin-bottom: 4px;">□ 비상장주식 가치평가를 정기적으로 하고 있는가?</li>
                <li style="margin-bottom: 4px;">□ 2세, 3세의 경영 참여 및 교육 계획이 수립되어 있는가?</li>
                <li style="margin-bottom: 4px;">□ 개인과 법인의 세무 리스크를 통합적으로 점검했는가?</li>
            </ul>
        </div>
    </div>
    
    <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 0 8px 8px 0; margin: 25px 0;">
        <h3 style="color: #15803d; margin: 0 0 15px; font-size: 16px; font-weight: 600;">📈 성공 사례 스포트라이트</h3>
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
            <strong style="color: #374151; font-size: 14px;">배경:</strong>
            <p style="margin: 8px 0 0; color: #6b7280; font-size: 13px; line-height: 1.6;">경기도 소재 2대째 제조업을 운영 중인 K대표님. 5년 내 자녀에게 가업을 승계할 계획이었으나, 상속세 재원 마련과 비상장주식 증여 문제로 고민이 깊었습니다. 각기 다른 금융사와 세무법인에서 받은 단편적인 조언들로 혼란만 가중된 상태였습니다.</p>
        </div>
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
            <strong style="color: #374151; font-size: 14px;">전략:</strong>
            <p style="margin: 8px 0 0; color: #6b7280; font-size: 13px; line-height: 1.6;">FamilyOffice S는 MFO 모델을 통해 가업승계 로드맵을 재설계했습니다. 법인 지배구조 개편, 세대생략증여, 공익법인 설립을 결합한 통합 솔루션을 제시하고, 승계 시뮬레이션을 통해 최적의 실행 시점을 도출했습니다.</p>
        </div>
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
            <strong style="color: #374151; font-size: 14px;">결과:</strong>
            <p style="margin: 8px 0 0; color: #6b7280; font-size: 13px; line-height: 1.6;">예상 상속세 부담을 약 40% 절감했으며, 2세 경영권 분쟁 리스크를 사전에 차단했습니다. 현재는 승계 이후의 자산운용과 사회공헌 활동 계획을 수립하는 2단계 컨설팅을 진행 중입니다.</p>
        </div>
        <div style="background: #e6fffa; padding: 12px; border-radius: 6px; border-left: 3px solid #22c55e;">
            <p style="margin: 0; font-size: 13px; color: #065f46; font-style: italic;">💬 <strong>클라이언트 후기</strong>: "조각난 퍼즐이 맞춰지는 기분이었습니다. 나무가 아닌 숲을 보게 되니, 지난 10년간의 고민이 해결되었습니다."</p>
        </div>
    </div>
    
    <div style="background-color: #fffbeb; border: 1px solid #f59e0b; padding: 18px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #92400e; margin: 0 0 12px; font-size: 16px; font-weight: 600;">🔮 다음 주 주목할 이슈</h3>
        <p style="margin: 0 0 12px; font-size: 14px; color: #78350f; line-height: 1.6;"><strong>2025년 세법개정안 후속 시행령 발표</strong>: 가업상속공제, 금융투자소득세 등 패밀리오피스 운영에 직접적인 영향을 미칠 세법 시행령 개정안이 발표될 예정입니다. FamilyOffice S에서 가장 빠르고 정확하게 분석하여 다음 뉴스레터에서 상세히 다루겠습니다.</p>
        <div style="background-color: #fffbeb; border: 1px solid #f59e0b; padding: 12px; border-radius: 6px; margin: 10px 0;">
            <p style="margin: 0; font-size: 12px; color: #92400e;">⚠ 본 전망은 현재 시점 분석으로, 실제 상황은 달라질 수 있습니다.</p>
        </div>
    </div>
    
    <div style="background-color: #fafafa; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #e0e0e0;">
        <h3 style="color: #2d3748; margin: 0 0 15px; font-size: 16px; font-weight: 600;">💡 이번 주 추천</h3>
        <div style="margin-bottom: 15px;">
            <h4 style="color: #4a5568; margin: 0 0 8px; font-size: 14px; font-weight: 600;">📚 추천 읽을거리</h4>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #4f46e5;">
                <strong style="color: #4f46e5; font-size: 13px;">블로그:</strong> <span style="color: #4a5568; font-size: 13px;">"성공적인 가업승계를 위한 3가지 황금열쇠" - 패밀리오피스가 왜 승계의 핵심인지 구체적인 사례를 통해 확인해 보세요.</span>
            </div>
        </div>
        <div>
            <h4 style="color: #4a5568; margin: 0 0 8px; font-size: 14px; font-weight: 600;">🎯 이번 주 이벤트</h4>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #059669;">
                <p style="margin: 0; color: #4a5568; font-size: 13px; line-height: 1.5;">
                    <strong style="color: #059669;">세미나:</strong> [중견기업 CEO를 위한 디지털 패밀리오피스 전략] - 9월 10일(화) 오후 2시, 소수 정예로 진행되는 프라이빗 세미나에 대표님을 초대합니다.
                </p>
            </div>
        </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #1e3a8a, #3730a3); color: white; padding: 30px 20px; border-radius: 16px; margin: 30px 0; text-align: center;">
        <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700;">📞 전문가와 연결</h3>
        <p style="margin: 0 0 20px; font-size: 14px; opacity: 0.9; line-height: 1.5;">가업승계, 자산관리, 세무 문제 등 복잡한 고민의 해답을 찾고 계신가요? 지금 바로 FamilyOffice S의 전문가와 상의하십시오.</p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
            <a href="https://seminar.familyoffices.vip" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">🎯 세미나 참석 신청</a>
            <a href="https://cal.com/familyoffice" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: white; color: #1e3a8a; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">📅 무료 상담 예약</a>
            <a href="http://pf.kakao.com/_gsxkxdG/chat" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: #fee500; color: #3c1e1e; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">💬 카카오 간편 상담</a>
        </div>
        <p style="margin: 0; font-size: 12px; opacity: 0.7;">📞 전화상담: ☎ 0502-5550-8700 | 평일 10:00-18:00</p>
    </div>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #475569; margin: 0 0 12px; font-size: 16px; font-weight: 600;">💬 P.S.</h3>
        <p style="margin: 0 0 15px; color: #64748b; font-size: 14px; line-height: 1.6;">얼마 전 한 대표님께서 "자식에게는 회사가 아닌 '행복'을 물려주고 싶다"는 말씀을 하셨습니다. 저희가 하는 일은 단순히 부(富)를 이전하는 것을 넘어, 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 것이라 믿습니다. 항상 그 믿음 잃지 않고 최선을 다하겠습니다.</p>
        <div style="background: white; padding: 15px; border-radius: 6px; text-align: center;">
            <strong style="color: #4a5568; font-size: 14px;">📝 FamilyOffice S 연락하기</strong>
            <p style="margin: 8px 0 0; color: #64748b; font-size: 13px;">이번 뉴스레터는 어떠셨나요? <a href="https://familyoffices.vip/contact" style="color: #4f46e5; text-decoration: none;">소중한 의견을 남겨주세요.</a></p>
        </div>
    </div>
    
    <div style="background-color: #1e293b; color: white; padding: 25px 20px; border-radius: 12px; margin: 30px 0; text-align: center;">
        <div style="margin-bottom: 15px;">
            <strong style="font-size: 16px;">FamilyOffice S 드림</strong>
        </div>
        <div style="margin-bottom: 10px; font-size: 13px; opacity: 0.8;">📞 ☎ 0502-5550-8700 | 📧 contact@familyoffices.vip</div>
        <div style="margin-bottom: 15px; font-size: 13px; opacity: 0.8;">
            <a href="https://familyoffices.vip" style="color: #60a5fa; text-decoration: none;">웹사이트</a> | <a href="https://blog.naver.com/familyoffices" style="color: #60a5fa; text-decoration: none;">블로그</a>
        </div>
        <div style="font-size: 12px; opacity: 0.6;">
            <a href="#" style="color: #94a3b8; text-decoration: none;">구독 취소</a> | <a href="#" style="color: #94a3b8; text-decoration: none;">설정 변경</a>
        </div>
    </div>
    
    <div style="background-color: #f1f5f9; border: 1px solid #cbd5e1; padding: 18px; border-radius: 8px; margin: 25px 0;">
        <h4 style="color: #475569; margin: 0 0 10px; font-size: 14px; font-weight: 600;">📋 중요 고지사항</h4>
        <ul style="margin: 0; padding-left: 18px; color: #64748b; font-size: 12px; line-height: 1.5;">
            <li style="margin-bottom: 4px;">본 자료는 일반적인 정보 제공을 목적으로 작성되었으며, 개별 상황에 따라 다를 수 있습니다.</li>
            <li style="margin-bottom: 4px;">투자 결정은 개인의 판단과 책임하에 이루어져야 하며, 투자 전 전문가와 상담하시기 바랍니다.</li>
            <li style="margin-bottom: 4px;">세법 및 관련 규정은 변경될 수 있으므로 최신 정보를 확인하시기 바랍니다.</li>
            <li style="margin-bottom: 4px;">예측 및 전망 정보는 현재 시점 분석으로, 향후 정책 변화에 따라 달라질 수 있습니다.</li>
            <li>본 뉴스레터 내용의 활용으로 인한 직간접적 손해에 대해 책임지지 않습니다.</li>
        </ul>
    </div>
</div>`,
    category: '패밀리오피스',
    author: 'FamilyOffice S',
    date: '2025-01-17',
    readTime: '12분',
    tags: ['패밀리오피스', '가업승계', '자산관리', '상속세', '중견기업', 'MFO', '디지털패밀리오피스', '가문경영', '세무전략', '투자다각화'],
    slug: 'family-office-basics-guide',
    featured: true,
  },

  'asset-management-strategy': {
    id: 'asset-management-strategy',
    title: '체계적인 자산관리 전략',
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
    author: 'FamilyOffice S',
    date: '2024-12-10',
    readTime: '4분',
    tags: ['자산관리', '포트폴리오', '투자전략'],
    slug: 'asset-management-strategy',
    featured: true,
  },

  'tax-optimization-basics': {
    id: 'tax-optimization-basics',
    title: '중견기업을 위한 절세 전략',
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
    author: 'FamilyOffice S',
    date: '2024-12-08',
    readTime: '6분',
    tags: ['절세', '상속세', '증여세', '가업승계'],
    slug: 'tax-optimization-basics',
    featured: true,
  },

  'investment-strategy-2025': {
    id: 'investment-strategy-2025',
    title: '2025년 투자 전망과 전략',
    excerpt: '새로운 해를 맞아 주목해야 할 투자 기회와 리스크 관리 방안을 제시합니다.',
    content: `# 2025년 투자 전망과 전략

글로벌 경제의 불확실성이 지속되는 가운데, 2025년 투자 전략은 신중함과 기회 포착의 균형이 중요합니다.

## 2025년 투자 환경

### 주요 특징
- 금리 정책의 변화
- 인플레이션 관리
- 지정학적 리스크
- 기술 혁신의 가속화

## 권장 투자 전략

### 1. 핵심-위성 전략
안정적인 핵심 자산과 성장 가능성이 높은 위성 자산의 조합

### 2. ESG 투자 확대
지속가능한 투자에 대한 관심 증가와 정부 정책 지원

### 3. 대체투자 검토
전통적인 자산 외에 부동산, 사모투자 등 대체투자 기회 탐색

투자 결정은 개인의 재정 상황과 목표에 따라 달라지므로 전문가와의 상담이 필요합니다.`,
    category: '투자전략',
    author: 'FamilyOffice S',
    date: '2024-12-05',
    readTime: '5분',
    tags: ['투자전략', '2025전망', 'ESG투자'],
    slug: 'investment-strategy-2025',
    featured: false,
  },

  'succession-planning-guide': {
    id: 'succession-planning-guide',
    title: '성공적인 기업 승계를 위한 준비',
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
    author: 'FamilyOffice S',
    date: '2024-12-01',
    readTime: '7분',
    tags: ['기업승계', '가업승계', '거버넌스'],
    slug: 'succession-planning-guide',
    featured: false,
  },

  'digital-transformation-finance': {
    id: 'digital-transformation-finance',
    title: '금융업계의 디지털 혁신',
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
    author: 'FamilyOffice S',
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
    author: 'FamilyOffice S',
    date: '2025-01-15',
    readTime: '6분',
    tags: ['기업승계', '가업승계', '경영권 이양', '차세대 경영'],
    slug: 'business-succession-2024-analysis',
    featured: true,
  },

  'mid-sized-company-succession-issues': {
    id: 'mid-sized-company-succession-issues',
    title: '중견기업 승계 시 주요 이슈와 해결방안',
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
    author: 'FamilyOffice S',
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
    author: 'FamilyOffice S',
    date: '2025-01-10',
    readTime: '8분',
    tags: ['상속세', '세법 개정', '가업승계', '세무 전략'],
    slug: 'inheritance-tax-reform-analysis',
    featured: false,
  },

  'family-business-governance-optimization': {
    id: 'family-business-governance-optimization',
    title: '가족기업 지배구조 최적화 방안',
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
    author: 'FamilyOffice S',
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
    author: 'FamilyOffice S',
    date: '2025-01-06',
    readTime: '7분',
    tags: ['싱가포르', '패밀리오피스', '글로벌 트렌드', '아시아'],
    slug: 'singapore-family-office-trends',
    featured: false,
  },

  'us-trust-strategies': {
    id: 'us-trust-strategies',
    title: '미국 신탁 제도 활용 전략',
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
    author: 'FamilyOffice S',
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
    author: 'FamilyOffice S',
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
    author: 'FamilyOffice S',
    date: '2024-12-30',
    readTime: '11분',
    tags: ['대체투자', '프라이빗 에쿼티', '헤지펀드', '투자 전략'],
    slug: 'alternative-investment-market-outlook',
    featured: false,
  },
};