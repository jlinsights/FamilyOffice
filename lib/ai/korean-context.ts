// 한국 문화 맥락 최적화 시스템
import { 
  ClientProfile, 
  KoreanContextualData,
  QueryType,
  QueryDifficulty 
} from './types';

export class KoreanContextOptimizer {
  private industryContexts: Map<string, IndustryContext>;
  private formalityLevels: Map<string, FormalityRule>;

  constructor() {
    this.industryContexts = new Map();
    this.formalityLevels = new Map();
    this.initializeIndustryContexts();
    this.initializeFormalityRules();
  }

  private initializeIndustryContexts() {
    // 제조업 컨텍스트
    this.industryContexts.set('manufacturing', {
      businessCulture: {
        hierarchyImportance: 'very_high',
        relationshipBuilding: 'gradual_trust',
        decisionMaking: 'consensus_based',
        communicationStyle: 'formal_respectful'
      },
      commonConcerns: [
        '세대교체', '기술혁신', '글로벌 경쟁력', '환경규제', 'ESG 경영'
      ],
      keyValues: ['안정성', '신뢰성', '품질', '전통과 혁신의 조화'],
      preferredApproach: '단계적이고 검증된 방법론 선호',
      culturalNuances: [
        '장기적 관점 중시',
        '실무진과 경영진 간 충분한 소통 필요',
        '성과보다는 과정의 정당성 중시'
      ]
    });

    // 건설업 컨텍스트
    this.industryContexts.set('construction', {
      businessCulture: {
        hierarchyImportance: 'very_high',
        relationshipBuilding: 'relationship_centric',
        decisionMaking: 'top_down',
        communicationStyle: 'direct_but_respectful'
      },
      commonConcerns: [
        '부동산 정책', '프로젝트 리스크', '자금조달', '정부 관계', '지역 사회'
      ],
      keyValues: ['신뢰', '의리', '실행력', '네트워크'],
      preferredApproach: '관계 기반 접근과 구체적 실행 방안',
      culturalNuances: [
        '인맥과 신뢰 관계가 매우 중요',
        '지역 사회와의 상생 중시',
        '정부 정책 변화에 민감한 반응'
      ]
    });

    // IT/벤처 컨텍스트
    this.industryContexts.set('it_venture', {
      businessCulture: {
        hierarchyImportance: 'medium',
        relationshipBuilding: 'efficiency_focused',
        decisionMaking: 'data_driven',
        communicationStyle: 'informal_but_professional'
      },
      commonConcerns: [
        '기술 트렌드', '인재 확보', '스케일링', '투자 유치', '글로벌 진출'
      ],
      keyValues: ['혁신', '속도', '효율성', '창의성'],
      preferredApproach: '데이터 중심의 빠른 의사결정 지원',
      culturalNuances: [
        '빠른 변화에 대한 적응력 중시',
        '실력 중심의 수평적 문화',
        '글로벌 스탠다드 적용 선호'
      ]
    });

    // 가족 기업 컨텍스트
    this.industryContexts.set('family_corp', {
      businessCulture: {
        hierarchyImportance: 'very_high',
        relationshipBuilding: 'family_centric',
        decisionMaking: 'family_consensus',
        communicationStyle: 'formal_traditional'
      },
      commonConcerns: [
        '가업승계', '가족 화합', '전통 계승', '2세/3세 교육', '지배구조'
      ],
      keyValues: ['가족 화합', '전통', '명예', '사회적 책임'],
      preferredApproach: '가족 전체의 조화를 고려한 장기적 접근',
      culturalNuances: [
        '가족 내 서열과 예의 매우 중요',
        '가문의 명예와 사회적 평판 중시',
        '전통적 가치와 현대적 경영의 균형'
      ]
    });
  }

  private initializeFormalityRules() {
    // 존댓말 사용 규칙
    this.formalityLevels.set('formal', {
      addressingStyle: '존댓말 + 높임말',
      responseFormat: '정중하고 격식있는 어조',
      recommendations: '제안드립니다, 권해드립니다',
      closingStyle: '감사합니다, 좋은 하루 되십시오'
    });

    this.formalityLevels.set('business', {
      addressingStyle: '존댓말 + 업무용 어조',
      responseFormat: '정중하되 효율적인 설명',
      recommendations: '추천드립니다, 제안합니다',
      closingStyle: '감사합니다, 추가 문의사항이 있으시면 언제든 연락주세요'
    });

    this.formalityLevels.set('casual', {
      addressingStyle: '존댓말 + 친근한 어조',
      responseFormat: '이해하기 쉬운 설명',
      recommendations: '좋을 것 같습니다, 도움이 될 것 같습니다',
      closingStyle: '도움이 되셨길 바랍니다'
    });
  }

  generateKoreanContext(
    query: string,
    queryType: QueryType,
    difficulty: QueryDifficulty,
    clientProfile: ClientProfile
  ): KoreanContextualData {
    // 1. 격식 수준 결정
    const formality_level = this.determineFormalityLevel(queryType, difficulty, clientProfile);
    
    // 2. 위계 고려사항
    const hierarchy_considerations = this.generateHierarchyConsiderations(
      clientProfile, queryType
    );
    
    // 3. 문화적 권장사항
    const cultural_recommendations = this.generateCulturalRecommendations(
      query, clientProfile
    );
    
    // 4. 관계 구축 노트
    const relationship_building_notes = this.generateRelationshipNotes(
      clientProfile, queryType
    );

    return {
      formality_level,
      hierarchy_considerations,
      cultural_recommendations,
      relationship_building_notes
    };
  }

  private determineFormalityLevel(
    queryType: QueryType,
    difficulty: QueryDifficulty,
    profile: ClientProfile
  ): 'formal' | 'business' | 'casual' {
    // 가족 기업이나 전통 업종은 높은 격식
    if (profile.industry === 'family_corp' || profile.industry === 'manufacturing') {
      return 'formal';
    }
    
    // 위기 상황이나 고급 상담은 격식 있게
    if (queryType === QueryType.CRISIS_MANAGEMENT || 
        queryType === QueryType.SUCCESSION_STRATEGY ||
        difficulty === QueryDifficulty.EXPERT) {
      return 'formal';
    }
    
    // IT/벤처는 비교적 캐주얼
    if (profile.industry === 'it_venture' && 
        difficulty === QueryDifficulty.BASIC) {
      return 'casual';
    }
    
    // 기본값은 비즈니스 격식
    return 'business';
  }

  private generateHierarchyConsiderations(
    profile: ClientProfile,
    queryType: QueryType
  ): string[] {
    const considerations: string[] = [];
    const industry = this.industryContexts.get(profile.industry || '');
    
    if (industry?.businessCulture.hierarchyImportance === 'very_high') {
      considerations.push('최고 결정권자의 의견을 우선적으로 고려해야 합니다');
      considerations.push('중간 관리층과의 충분한 사전 협의가 필요합니다');
    }
    
    if (queryType === QueryType.SUCCESSION_STRATEGY) {
      considerations.push('현재 세대와 다음 세대 간의 권한 분배를 신중히 다뤄야 합니다');
      considerations.push('가족 구성원 간의 역할과 책임을 명확히 구분해야 합니다');
    }
    
    if (profile.industry === 'family_corp') {
      considerations.push('가족 내 서열과 전통적 예의를 반드시 고려해야 합니다');
      considerations.push('가문의 어른들의 의견과 승인이 중요합니다');
    }

    return considerations;
  }

  private generateCulturalRecommendations(
    query: string,
    profile: ClientProfile
  ): string[] {
    const recommendations: string[] = [];
    const industry = this.industryContexts.get(profile.industry || '');
    
    // 기본적인 한국 비즈니스 문화 권장사항
    recommendations.push('충분한 시간을 갖고 신중하게 검토하시기 바랍니다');
    recommendations.push('관련 이해관계자들과의 사전 협의를 권장드립니다');
    
    // 산업별 특화 권장사항
    if (industry) {
      if (industry.businessCulture.relationshipBuilding === 'gradual_trust') {
        recommendations.push('단계적으로 신뢰를 구축해 나가는 접근을 권장드립니다');
      }
      
      if (industry.preferredApproach) {
        recommendations.push(`이 업계의 특성상 ${industry.preferredApproach}을 고려해주세요`);
      }
    }
    
    // 질문 내용에 따른 문화적 권장사항
    if (query.includes('가족') || query.includes('family')) {
      recommendations.push('가족 간의 화합과 조화를 최우선으로 고려해주세요');
      recommendations.push('정(情)의 관계를 해치지 않는 선에서 합리적 해결책을 모색하세요');
    }
    
    if (query.includes('투자') || query.includes('investment')) {
      recommendations.push('안정성과 수익성의 균형을 맞춘 보수적 접근을 권장드립니다');
    }

    return recommendations;
  }

  private generateRelationshipNotes(
    profile: ClientProfile,
    queryType: QueryType
  ): string[] {
    const notes: string[] = [];
    
    // 기본적인 관계 구축 노트
    notes.push('장기적인 신뢰 관계 구축을 목표로 합니다');
    notes.push('클라이언트의 입장과 상황을 충분히 이해하려 노력합니다');
    
    // 산업별 관계 구축 전략
    switch (profile.industry) {
      case 'manufacturing':
        notes.push('전통과 혁신 사이의 균형을 이해하는 파트너십을 추구합니다');
        notes.push('안정적이고 지속가능한 관계를 중시합니다');
        break;
        
      case 'construction':
        notes.push('신뢰와 의리를 바탕으로 한 강한 파트너십을 구축합니다');
        notes.push('지역 사회와의 상생을 고려한 관계를 지향합니다');
        break;
        
      case 'it_venture':
        notes.push('빠른 변화에 함께 적응할 수 있는 유연한 관계를 추구합니다');
        notes.push('데이터와 성과 기반의 객관적 관계를 지향합니다');
        break;
        
      case 'family_corp':
        notes.push('가문의 전통과 명예를 존중하는 관계를 구축합니다');
        notes.push('다세대에 걸친 장기적 관계를 지향합니다');
        break;
    }
    
    // 쿼리 유형별 관계 노트
    if (queryType === QueryType.CRISIS_MANAGEMENT) {
      notes.push('위기 상황에서도 신뢰를 잃지 않는 든든한 동반자가 되겠습니다');
    }
    
    if (queryType === QueryType.SUCCESSION_STRATEGY) {
      notes.push('가족의 미래를 함께 설계하는 소중한 파트너가 되겠습니다');
    }

    return notes;
  }

  // AI 프롬프트 최적화
  optimizePromptForKoreanContext(
    basePrompt: string,
    context: KoreanContextualData,
    clientProfile: ClientProfile
  ): string {
    let optimizedPrompt = basePrompt;
    
    // 격식 수준에 따른 어조 조정
    const formalityRule = this.formalityLevels.get(context.formality_level);
    if (formalityRule) {
      optimizedPrompt += `\n\n응답 시 다음 어조를 사용해주세요: ${formalityRule.responseFormat}`;
      optimizedPrompt += `\n권장사항 제시 시: ${formalityRule.recommendations}`;
      optimizedPrompt += `\n응답 마무리: ${formalityRule.closingStyle}`;
    }
    
    // 문화적 고려사항 추가
    if (context.cultural_recommendations.length > 0) {
      optimizedPrompt += '\n\n문화적 고려사항:';
      context.cultural_recommendations.forEach(rec => {
        optimizedPrompt += `\n- ${rec}`;
      });
    }
    
    // 산업 특화 컨텍스트 추가
    const industryContext = this.industryContexts.get(clientProfile.industry || '');
    if (industryContext) {
      optimizedPrompt += `\n\n업계 특성 고려:`;
      optimizedPrompt += `\n- 주요 관심사: ${industryContext.commonConcerns.join(', ')}`;
      optimizedPrompt += `\n- 핵심 가치: ${industryContext.keyValues.join(', ')}`;
      optimizedPrompt += `\n- 선호 접근법: ${industryContext.preferredApproach}`;
    }
    
    // 위계 고려사항 추가
    if (context.hierarchy_considerations.length > 0) {
      optimizedPrompt += '\n\n위계 및 조직 고려사항:';
      context.hierarchy_considerations.forEach(consideration => {
        optimizedPrompt += `\n- ${consideration}`;
      });
    }

    return optimizedPrompt;
  }

  // 응답 후처리 (한국어 맞춤법, 존댓말 검증)
  postProcessResponse(
    response: string,
    context: KoreanContextualData
  ): string {
    let processedResponse = response;
    
    // 존댓말 확인 및 수정
    processedResponse = this.ensureProperHonorification(processedResponse, context.formality_level);
    
    // 문화적으로 부적절한 표현 수정
    processedResponse = this.replaceCulturallyInappropriateTerms(processedResponse);
    
    // 비즈니스 용어 한국화
    processedResponse = this.localizeBusinessTerms(processedResponse);
    
    return processedResponse;
  }

  private ensureProperHonorification(response: string, formalityLevel: string): string {
    // 간단한 존댓말 패턴 매칭 및 수정
    let corrected = response;
    
    if (formalityLevel === 'formal') {
      // 반말을 존댓말로 변경
      corrected = corrected.replace(/이다\./g, '입니다.');
      corrected = corrected.replace(/한다\./g, '합니다.');
      corrected = corrected.replace(/된다\./g, '됩니다.');
    }
    
    return corrected;
  }

  private replaceCulturallyInappropriateTerms(response: string): string {
    const replacements: { [key: string]: string } = {
      '빨리': '신속히',
      '급한': '긴급한',
      '돈': '자금',
      '장사': '사업',
      '벌다': '수익을 창출하다'
    };
    
    let corrected = response;
    Object.entries(replacements).forEach(([inappropriate, appropriate]) => {
      corrected = corrected.replace(new RegExp(inappropriate, 'g'), appropriate);
    });
    
    return corrected;
  }

  private localizeBusinessTerms(response: string): string {
    const localizations: { [key: string]: string } = {
      'CEO': '대표이사',
      'CFO': '재무담당임원',
      'ROI': '투자수익률',
      'M&A': '인수합병',
      'IPO': '기업공개',
      'ESG': 'ESG 경영',
      'Due Diligence': '실사',
      'Portfolio': '포트폴리오'
    };
    
    let localized = response;
    Object.entries(localizations).forEach(([english, korean]) => {
      // 영어 용어 뒤에 한국어 설명 추가
      const regex = new RegExp(`\\b${english}\\b`, 'g');
      localized = localized.replace(regex, `${english}(${korean})`);
    });
    
    return localized;
  }
}

interface IndustryContext {
  businessCulture: {
    hierarchyImportance: 'very_high' | 'high' | 'medium' | 'low';
    relationshipBuilding: 'gradual_trust' | 'efficiency_focused' | 'relationship_centric' | 'family_centric';
    decisionMaking: 'consensus_based' | 'top_down' | 'data_driven' | 'family_consensus';
    communicationStyle: 'formal_respectful' | 'direct_but_respectful' | 'informal_but_professional' | 'formal_traditional';
  };
  commonConcerns: string[];
  keyValues: string[];
  preferredApproach: string;
  culturalNuances: string[];
}

interface FormalityRule {
  addressingStyle: string;
  responseFormat: string;
  recommendations: string;
  closingStyle: string;
}