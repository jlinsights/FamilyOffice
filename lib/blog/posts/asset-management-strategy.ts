import { BlogPost } from '@/types/blog';

export const post: BlogPost = {
  id: 'asset-management-strategy',
  title: '체계적인 자산관리 전략',
  image:
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop',
  excerpt:
    '중견기업 CEO를 위한 체계적인 자산관리 전략. 기업 지분부터 대체투자까지, 전문가가 제시하는 포트폴리오 구성의 핵심 원칙과 실행 방안을 담았습니다.',
  content: `<div className="font-sans leading-relaxed max-w-4xl mx-auto text-base text-foreground bg-background px-5">
<header className="text-center mb-10 py-8 border-b-4 border-primary">
    <h1 className="text-primary mb-4 text-3xl md:text-4xl font-bold leading-tight">CEO 자산관리의 새로운 패러다임</h1>
    <p className="text-muted-foreground text-lg font-normal leading-relaxed">기업 지분부터 글로벌 투자까지, 중견기업 CEO를 위한 체계적 자산관리 전략과 포트폴리오 구성의 모든 것</p>
    <div className="mt-5 text-muted-foreground text-sm">
        작성일: 2024년 12월 10일 | 예상 읽기 시간: 12분 | 카테고리: 자산관리 전략
    </div>
</header>

<section className="mb-12">
    <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8">
        <h2 className="text-xl font-bold text-primary mb-4">✨ Executive Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded border-l-2 border-blue-300">
                <div className="font-medium text-primary">포트폴리오 최적화</div>
                <div className="text-muted-foreground">리스크 분산을 통한 안정적 수익 추구</div>
            </div>
            <div className="bg-white p-4 rounded border-l-2 border-green-300">
                <div className="font-medium text-primary">대체투자 기회</div>
                <div className="text-muted-foreground">전통 자산을 넘어선 새로운 기회 발굴</div>
            </div>
            <div className="bg-white p-4 rounded border-l-2 border-orange-300">
                <div className="font-medium text-primary">체계적 관리</div>
                <div className="text-muted-foreground">전문가 협업을 통한 통합 관리 체계</div>
            </div>
        </div>
    </div>
    
    <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-primary">📋 목차</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>1. 현대적 자산관리의 필요성</div>
            <div>2. 포트폴리오 구성 전략</div>
            <div>3. 리스크 관리 프레임워크</div>
            <div>4. 대체투자 기회 분석</div>
            <div>5. 성과 측정 및 최적화</div>
            <div>6. 실행 로드맵</div>
        </div>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">Chapter 1: 변화하는 자산관리 패러다임</h2>
    
    <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
        <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ CEO들이 놓치는 자산관리의 함정</h3>
        <div className="space-y-3 text-red-700">
            <p><strong>기업 지분 편중:</strong> 전체 자산의 70% 이상이 자사 주식에 집중되어 있는 경우</p>
            <p><strong>유동성 부족:</strong> 부동산과 비상장주식에 과도하게 집중된 포트폴리오</p>
            <p><strong>시기적 위험:</strong> 은퇴 시점과 시장 사이클이 맞지 않는 문제</p>
        </div>
    </div>
    
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">중견기업 CEO 자산구조의 현실</h3>
        <p className="mb-4">삼성생명 FamilyOffice S의 고객 분석 결과, 중견기업 CEO들의 평균 자산구조는 다음과 같습니다:</p>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2">자산유형</th>
                        <th className="text-center py-2">평균 비중</th>
                        <th className="text-center py-2">권장 비중</th>
                        <th className="text-left py-2">리스크 수준</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-2">기업 지분</td>
                        <td className="text-center">68%</td>
                        <td className="text-center">40-50%</td>
                        <td className="text-red-600">매우 높음</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">부동산</td>
                        <td className="text-center">18%</td>
                        <td className="text-center">15-25%</td>
                        <td className="text-orange-600">보통</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">금융자산</td>
                        <td className="text-center">12%</td>
                        <td className="text-center">20-30%</td>
                        <td className="text-green-600">낮음</td>
                    </tr>
                    <tr>
                        <td className="py-2">대체투자</td>
                        <td className="text-center">2%</td>
                        <td className="text-center">5-15%</td>
                        <td className="text-blue-600">중간</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-primary">🎯 성공적인 자산관리의 핵심 3요소</h3>
        <div className="space-y-3">
            <div><strong>분산화(Diversification):</strong> 상관관계가 낮은 다양한 자산 클래스 투자</div>
            <div><strong>체계화(Systematic Management):</strong> 데이터 기반 의사결정과 정기적 리밸런싱</div>
            <div><strong>전문화(Professional Management):</strong> 각 분야 전문가와의 협업 체계</div>
        </div>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">Chapter 2: 전략적 포트폴리오 구성</h2>
    
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">Core-Satellite 전략</h3>
        <p className="mb-4">안정적인 수익을 추구하는 핵심 포트폴리오(Core)와 초과 수익을 노리는 위성 투자(Satellite)의 균형:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-3">🟢 Core Portfolio (70-80%)</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                    <li>• 글로벌 인덱스 펀드 (40%)</li>
                    <li>• 국내외 우량 채권 (20%)</li>
                    <li>• 핵심 부동산 자산 (10%)</li>
                    <li>• 현금 및 단기자산 (10%)</li>
                </ul>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-semibold text-orange-800 mb-3">🟡 Satellite Portfolio (20-30%)</h4>
                <ul className="space-y-2 text-orange-700 text-sm">
                    <li>• 대체투자 (PE/헤지펀드) (10%)</li>
                    <li>• 성장주/테마 투자 (8%)</li>
                    <li>• 상품/원자재 (5%)</li>
                    <li>• 신흥시장/특수상황 (7%)</li>
                </ul>
            </div>
        </div>
    </div>

    <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-primary">📊 자산배분 모델별 기대수익률</h3>
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b-2">
                    <th className="text-left py-2">투자성향</th>
                    <th className="text-center py-2">주식비중</th>
                    <th className="text-center py-2">채권비중</th>
                    <th className="text-center py-2">기대수익률</th>
                    <th className="text-center py-2">변동성</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="py-2 font-medium">안정형</td>
                    <td className="text-center">30%</td>
                    <td className="text-center">50%</td>
                    <td className="text-center text-blue-600">5.2%</td>
                    <td className="text-center">8.5%</td>
                </tr>
                <tr className="border-b">
                    <td className="py-2 font-medium">균형형</td>
                    <td className="text-center">50%</td>
                    <td className="text-center">40%</td>
                    <td className="text-center text-green-600">6.8%</td>
                    <td className="text-center">12.3%</td>
                </tr>
                <tr>
                    <td className="py-2 font-medium">적극형</td>
                    <td className="text-center">70%</td>
                    <td className="text-center">25%</td>
                    <td className="text-center text-orange-600">8.1%</td>
                    <td className="text-center">16.7%</td>
                </tr>
            </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-2">* 과거 20년 글로벌 시장 데이터 기준</p>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">Chapter 3: 리스크 관리 체계</h2>
    
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">통합 리스크 관리 프레임워크</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-red-50 p-4 rounded-lg border-t-4 border-red-400">
                <h4 className="font-semibold text-red-800 mb-2">시장 리스크</h4>
                <ul className="text-sm text-red-700 space-y-1">
                    <li>• VaR 모니터링</li>
                    <li>• 스트레스 테스트</li>
                    <li>• 상관관계 분석</li>
                </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-t-4 border-orange-400">
                <h4 className="font-semibold text-orange-800 mb-2">유동성 리스크</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 현금 보유 비율</li>
                    <li>• 매각 소요 시간</li>
                    <li>• 비상 자금 계획</li>
                </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-t-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800 mb-2">운용 리스크</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 매니저 리스크</li>
                    <li>• 프로세스 리스크</li>
                    <li>• 기술적 리스크</li>
                </ul>
            </div>
        </div>
    </div>

    <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-primary">🛡️ 리스크 한도 설정 가이드</h3>
        <div className="space-y-3 text-sm">
            <div><strong>최대 손실 한도:</strong> 연간 포트폴리오 가치의 15% 이내</div>
            <div><strong>단일 자산 한도:</strong> 전체 포트폴리오의 20% 이내 (자사주 제외)</div>
            <div><strong>지역 집중 한도:</strong> 국내 자산 70% 이내</div>
            <div><strong>유동성 최소 기준:</strong> 3개월 내 현금화 가능 자산 30% 이상</div>
        </div>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">Chapter 4: 대체투자 기회 발굴</h2>
    
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">중견기업 CEO를 위한 대체투자 포트폴리오</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-semibold text-purple-800 mb-2">🏢 Private Equity</h4>
                    <div className="text-sm text-purple-700">
                        <p><strong>최소 투자:</strong> 10억원</p>
                        <p><strong>기대 수익:</strong> IRR 12-15%</p>
                        <p><strong>투자 기간:</strong> 5-7년</p>
                        <p><strong>추천 비중:</strong> 5-8%</p>
                    </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                    <h4 className="font-semibold text-indigo-800 mb-2">🏭 Real Estate</h4>
                    <div className="text-sm text-indigo-700">
                        <p><strong>최소 투자:</strong> 5억원</p>
                        <p><strong>기대 수익:</strong> 7-10%</p>
                        <p><strong>투자 기간:</strong> 3-5년</p>
                        <p><strong>추천 비중:</strong> 3-5%</p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">⚡ Infrastructure</h4>
                    <div className="text-sm text-green-700">
                        <p><strong>최소 투자:</strong> 3억원</p>
                        <p><strong>기대 수익:</strong> 6-9%</p>
                        <p><strong>투자 기간:</strong> 7-10년</p>
                        <p><strong>추천 비중:</strong> 2-4%</p>
                    </div>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-400">
                    <h4 className="font-semibold text-teal-800 mb-2">💎 Hedge Fund</h4>
                    <div className="text-sm text-teal-700">
                        <p><strong>최소 투자:</strong> 1억원</p>
                        <p><strong>기대 수익:</strong> 8-12%</p>
                        <p><strong>투자 기간:</strong> 1-3년</p>
                        <p><strong>추천 비중:</strong> 2-3%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 대체투자 성공을 위한 핵심 팁</h3>
        <ol className="space-y-2 text-yellow-700 text-sm">
            <li><strong>1. 철저한 실사:</strong> 운용사의 과거 성과와 리스크 관리 능력 검증</li>
            <li><strong>2. 분산 투자:</strong> 단일 펀드에 집중하지 않고 여러 전략으로 분산</li>
            <li><strong>3. 유동성 관리:</strong> Lock-up 기간을 고려한 현금 흐름 계획</li>
            <li><strong>4. 정기적 모니터링:</strong> 분기별 성과 검토 및 전략 조정</li>
        </ol>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">Chapter 5: 성과 측정 및 최적화</h2>
    
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">체계적 성과 관리 시스템</h3>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b-2">
                        <th className="text-left py-2">측정 지표</th>
                        <th className="text-center py-2">목표 기준</th>
                        <th className="text-center py-2">점검 주기</th>
                        <th className="text-left py-2">조정 기준</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-2 font-medium">절대 수익률</td>
                        <td className="text-center">연 6-8%</td>
                        <td className="text-center">월간</td>
                        <td>3개월 연속 목표 미달시</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 font-medium">상대 수익률</td>
                        <td className="text-center">벤치마크 +2%</td>
                        <td className="text-center">분기</td>
                        <td>1년간 벤치마크 하회시</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 font-medium">최대 낙폭</td>
                        <td className="text-center">-15% 이내</td>
                        <td className="text-center">일간</td>
                        <td>-10% 도달시 즉시</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-medium">샤프 비율</td>
                        <td className="text-center">0.8 이상</td>
                        <td className="text-center">분기</td>
                        <td>2분기 연속 0.5 미만시</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-primary">📈 리밸런싱 전략</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
                <h4 className="font-medium mb-2">정기 리밸런싱</h4>
                <ul className="space-y-1 text-muted-foreground">
                    <li>• 분기별 정기 실행</li>
                    <li>• 목표 비중 복원</li>
                    <li>• 수익 실현 효과</li>
                </ul>
            </div>
            <div>
                <h4 className="font-medium mb-2">임계치 리밸런싱</h4>
                <ul className="space-y-1 text-muted-foreground">
                    <li>• ±5% 이탈시 즉시</li>
                    <li>• 시장 급변동 대응</li>
                    <li>• 리스크 통제 강화</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section className="mb-12">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">Chapter 6: 실행 로드맵</h2>
    
    <div className="space-y-6">
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
            <h3 className="text-lg font-semibold text-green-800 mb-3">🎯 1단계: 현황 분석 (1-2개월)</h3>
            <ul className="space-y-2 text-green-700 text-sm">
                <li><strong>자산 실사:</strong> 전체 자산 규모 및 구성 파악</li>
                <li><strong>위험 성향 진단:</strong> 투자 목표와 리스크 허용 수준 설정</li>
                <li><strong>현금흐름 분석:</strong> 유동성 필요 시점과 규모 예측</li>
                <li><strong>세무 최적화 검토:</strong> 절세 기회 발굴 및 구조 개선</li>
            </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">⚙️ 2단계: 전략 수립 (2-3개월)</h3>
            <ul className="space-y-2 text-blue-700 text-sm">
                <li><strong>목표 포트폴리오 설계:</strong> 자산배분 모델 및 투자 전략 수립</li>
                <li><strong>투자 상품 선정:</strong> 각 자산군별 최적 투자 수단 발굴</li>
                <li><strong>리스크 관리 체계:</strong> 한도 설정 및 모니터링 시스템 구축</li>
                <li><strong>성과 측정 기준:</strong> KPI 및 벤치마크 설정</li>
            </ul>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">🚀 3단계: 점진적 이행 (6-12개월)</h3>
            <ul className="space-y-2 text-orange-700 text-sm">
                <li><strong>단계적 투자:</strong> 시장 상황을 고려한 분할 매수</li>
                <li><strong>대체투자 진입:</strong> Due Diligence 후 선별적 투자</li>
                <li><strong>모니터링 체계 가동:</strong> 정기 성과 점검 및 조정</li>
                <li><strong>최적화 지속:</strong> 시장 변화에 따른 전략 업데이트</li>
            </ul>
        </div>
    </div>

    <div className="bg-gray-800 text-white p-8 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">📞 삼성생명 FamilyOffice S 전문가 상담</h3>
        <p className="mb-4 text-gray-200">체계적인 자산관리 전략 수립부터 실행까지, 20년 경력의 전문가가 함께합니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
                <div className="font-medium">📱 전화 상담</div>
                <div className="text-gray-300">0502-5550-8700</div>
            </div>
            <div>
                <div className="font-medium">💬 1:1 맞춤 상담</div>
                <div className="text-gray-300">온라인 예약 시스템</div>
            </div>
            <div>
                <div className="font-medium">📊 포트폴리오 진단</div>
                <div className="text-gray-300">무료 자산 분석 서비스</div>
            </div>
        </div>
    </div>
</section>

</div>`,
  category: '자산관리',
  author: '임재홍',
  date: '2024-12-10',
  readTime: '12분',
  tags: ['자산관리', '포트폴리오', '투자전략', '대체투자', '리스크관리'],
  slug: 'asset-management-strategy',
  featured: true,
};
