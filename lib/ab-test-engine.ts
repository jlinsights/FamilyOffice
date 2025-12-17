/**
 * A/B 테스트 실행 엔진
 * 트래픽 분할, 결과 수집, 통계적 유의성 검증, 승자 선정
 */

export type ABTestStatus = 'draft' | 'running' | 'paused' | 'completed' | 'archived';
export type VariantType = 'control' | 'variant';

export interface ABTestVariant {
  id: string;
  name: string;
  type: VariantType;
  trafficAllocation: number; // 0-100 percentage
  description?: string;
  config: Record<string, unknown>; // Variant-specific configuration
}

export interface ABTestMetrics {
  visitors: number;
  conversions: number;
  conversionRate: number;
  bounceRate: number;
  avgTimeOnPage: number;
  pageViews: number;
  revenue?: number;
  clicks?: number;
  ctr?: number;
}

export interface ABTestVariantResult extends ABTestVariant {
  metrics: ABTestMetrics;
  confidence: number; // 0-100 statistical confidence
  uplift: number; // percentage improvement over control
  isWinner: boolean;
  sampleSize: number;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: ABTestStatus;
  targetPage: string;
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
  duration: number; // days
  minSampleSize: number;
  confidenceThreshold: number; // 95% default
  primaryMetric: 'conversion_rate' | 'bounce_rate' | 'time_on_page' | 'revenue' | 'ctr';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ABTestResult {
  testId: string;
  testName: string;
  status: ABTestStatus;
  startDate: Date;
  endDate?: Date;
  duration: number;
  variants: ABTestVariantResult[];
  winner?: ABTestVariantResult;
  conclusion: string;
  recommendations: string[];
  statisticalSignificance: boolean;
  confidenceLevel: number;
  metadata: {
    totalVisitors: number;
    totalConversions: number;
    testDuration: number; // actual days run
    dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

/**
 * A/B 테스트 엔진 클래스
 */
export class ABTestEngine {
  private tests: Map<string, ABTest> = new Map();
  private variantMetrics: Map<string, Map<string, ABTestMetrics>> = new Map(); // testId -> variantId -> metrics

  /**
   * 새로운 A/B 테스트 생성
   */
  createTest(params: {
    name: string;
    description: string;
    targetPage: string;
    variants: Array<{
      name: string;
      type: VariantType;
      trafficAllocation: number;
      config: Record<string, unknown>;
    }>;
    duration?: number;
    minSampleSize?: number;
    confidenceThreshold?: number;
    primaryMetric?: ABTest['primaryMetric'];
    createdBy: string;
  }): ABTest {
    // 트래픽 할당 검증
    const totalAllocation = params.variants.reduce((sum, v) => sum + v.trafficAllocation, 0);
    if (Math.abs(totalAllocation - 100) > 0.01) {
      throw new Error(`Traffic allocation must sum to 100% (current: ${totalAllocation}%)`);
    }

    // Control variant 검증
    const controlCount = params.variants.filter(v => v.type === 'control').length;
    if (controlCount !== 1) {
      throw new Error('Exactly one control variant is required');
    }

    const test: ABTest = {
      id: this.generateTestId(),
      name: params.name,
      description: params.description,
      status: 'draft',
      targetPage: params.targetPage,
      variants: params.variants.map(v => ({
        id: this.generateVariantId(),
        name: v.name,
        type: v.type,
        trafficAllocation: v.trafficAllocation,
        config: v.config,
      })),
      startDate: new Date(),
      duration: params.duration || 14,
      minSampleSize: params.minSampleSize || 1000,
      confidenceThreshold: params.confidenceThreshold || 95,
      primaryMetric: params.primaryMetric || 'conversion_rate',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: params.createdBy,
    };

    this.tests.set(test.id, test);
    this.variantMetrics.set(test.id, new Map());

    console.log(`[ABTestEngine] Test created: ${test.name} (${test.id})`);
    return test;
  }

  /**
   * A/B 테스트 시작
   */
  startTest(testId: string): ABTest {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    if (test.status !== 'draft') {
      throw new Error(`Test cannot be started from status: ${test.status}`);
    }

    test.status = 'running';
    test.startDate = new Date();
    test.updatedAt = new Date();

    console.log(`[ABTestEngine] Test started: ${test.name}`);
    return test;
  }

  /**
   * A/B 테스트 일시정지
   */
  pauseTest(testId: string): ABTest {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    if (test.status !== 'running') {
      throw new Error(`Test cannot be paused from status: ${test.status}`);
    }

    test.status = 'paused';
    test.updatedAt = new Date();

    console.log(`[ABTestEngine] Test paused: ${test.name}`);
    return test;
  }

  /**
   * 트래픽 분할 - 방문자를 variant에 할당
   */
  assignVariant(testId: string, visitorId: string): ABTestVariant {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    if (test.status !== 'running') {
      throw new Error(`Test is not running: ${test.status}`);
    }

    // 일관된 할당을 위해 해시 기반 분할
    const hash = this.hashString(`${visitorId}_${testId}`);
    const bucket = hash % 100;

    let cumulativeAllocation = 0;
    for (const variant of test.variants) {
      cumulativeAllocation += variant.trafficAllocation;
      if (bucket < cumulativeAllocation) {
        return variant;
      }
    }

    // Fallback to control
    return test.variants.find(v => v.type === 'control')!;
  }

  /**
   * 메트릭 기록
   */
  recordMetrics(testId: string, variantId: string, metrics: Partial<ABTestMetrics>): void {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    const testMetrics = this.variantMetrics.get(testId);
    if (!testMetrics) {
      throw new Error(`Metrics not initialized for test: ${testId}`);
    }

    const currentMetrics = testMetrics.get(variantId) || {
      visitors: 0,
      conversions: 0,
      conversionRate: 0,
      bounceRate: 0,
      avgTimeOnPage: 0,
      pageViews: 0,
    };

    // 메트릭 업데이트
    const updatedMetrics: ABTestMetrics = {
      visitors: currentMetrics.visitors + (metrics.visitors || 0),
      conversions: currentMetrics.conversions + (metrics.conversions || 0),
      bounceRate: metrics.bounceRate !== undefined ? metrics.bounceRate : currentMetrics.bounceRate,
      avgTimeOnPage: metrics.avgTimeOnPage !== undefined ? metrics.avgTimeOnPage : currentMetrics.avgTimeOnPage,
      pageViews: currentMetrics.pageViews + (metrics.pageViews || 0),
      revenue: (currentMetrics.revenue || 0) + (metrics.revenue || 0),
      clicks: (currentMetrics.clicks || 0) + (metrics.clicks || 0),
      ctr: 0, // 계산됨
      conversionRate: 0, // 계산됨
    };

    // 전환율 및 CTR 계산
    updatedMetrics.conversionRate = updatedMetrics.visitors > 0
      ? (updatedMetrics.conversions / updatedMetrics.visitors) * 100
      : 0;

    if (updatedMetrics.clicks !== undefined && updatedMetrics.visitors > 0) {
      updatedMetrics.ctr = (updatedMetrics.clicks / updatedMetrics.visitors) * 100;
    }

    testMetrics.set(variantId, updatedMetrics);
  }

  /**
   * 테스트 결과 분석
   */
  analyzeTest(testId: string): ABTestResult {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    const testMetrics = this.variantMetrics.get(testId);
    if (!testMetrics) {
      throw new Error(`Metrics not found for test: ${testId}`);
    }

    // Control variant 찾기
    const controlVariant = test.variants.find(v => v.type === 'control');
    if (!controlVariant) {
      throw new Error('Control variant not found');
    }

    const controlMetrics = testMetrics.get(controlVariant.id);
    if (!controlMetrics) {
      throw new Error('Control metrics not found');
    }

    // Variant 결과 계산
    const variantResults: ABTestVariantResult[] = test.variants.map(variant => {
      const metrics = testMetrics.get(variant.id) || {
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        bounceRate: 0,
        avgTimeOnPage: 0,
        pageViews: 0,
      };

      // 통계적 유의성 계산 (Z-test)
      const { confidence, uplift } = this.calculateStatisticalSignificance(
        controlMetrics,
        metrics,
        test.primaryMetric
      );

      return {
        ...variant,
        metrics,
        confidence,
        uplift,
        isWinner: false,
        sampleSize: metrics.visitors,
      };
    });

    // 승자 결정
    const winner = this.determineWinner(variantResults, test.confidenceThreshold);
    if (winner) {
      winner.isWinner = true;
    }

    // 전체 메트릭 집계
    const totalVisitors = variantResults.reduce((sum, v) => sum + v.metrics.visitors, 0);
    const totalConversions = variantResults.reduce((sum, v) => sum + v.metrics.conversions, 0);

    // 테스트 기간 계산
    const now = new Date();
    const testDuration = Math.floor((now.getTime() - test.startDate.getTime()) / (1000 * 60 * 60 * 24));

    // 데이터 품질 평가
    const dataQuality = this.assessDataQuality(variantResults, test.minSampleSize);

    // 결론 및 권장사항 생성
    const { conclusion, recommendations } = this.generateConclusion(test, variantResults, winner);

    return {
      testId: test.id,
      testName: test.name,
      status: test.status,
      startDate: test.startDate,
      endDate: test.endDate,
      duration: test.duration,
      variants: variantResults,
      winner,
      conclusion,
      recommendations,
      statisticalSignificance: winner !== undefined && winner.confidence >= test.confidenceThreshold,
      confidenceLevel: winner?.confidence || 0,
      metadata: {
        totalVisitors,
        totalConversions,
        testDuration,
        dataQuality,
      },
    };
  }

  /**
   * 통계적 유의성 계산 (Z-test for proportions)
   */
  private calculateStatisticalSignificance(
    controlMetrics: ABTestMetrics,
    variantMetrics: ABTestMetrics,
    primaryMetric: ABTest['primaryMetric']
  ): { confidence: number; uplift: number } {
    let controlValue: number;
    let variantValue: number;

    // Primary metric 값 추출
    switch (primaryMetric) {
      case 'conversion_rate':
        controlValue = controlMetrics.conversionRate;
        variantValue = variantMetrics.conversionRate;
        break;
      case 'bounce_rate':
        controlValue = controlMetrics.bounceRate;
        variantValue = variantMetrics.bounceRate;
        break;
      case 'time_on_page':
        controlValue = controlMetrics.avgTimeOnPage;
        variantValue = variantMetrics.avgTimeOnPage;
        break;
      case 'ctr':
        controlValue = controlMetrics.ctr || 0;
        variantValue = variantMetrics.ctr || 0;
        break;
      case 'revenue':
        controlValue = controlMetrics.revenue || 0;
        variantValue = variantMetrics.revenue || 0;
        break;
    }

    // Uplift 계산
    const uplift = controlValue > 0 ? ((variantValue - controlValue) / controlValue) * 100 : 0;

    // 전환율 기반 Z-test
    const p1 = controlMetrics.conversions / controlMetrics.visitors;
    const p2 = variantMetrics.conversions / variantMetrics.visitors;
    const n1 = controlMetrics.visitors;
    const n2 = variantMetrics.visitors;

    if (n1 === 0 || n2 === 0) {
      return { confidence: 0, uplift: 0 };
    }

    const pooledProbability = (controlMetrics.conversions + variantMetrics.conversions) / (n1 + n2);
    const standardError = Math.sqrt(pooledProbability * (1 - pooledProbability) * (1 / n1 + 1 / n2));

    if (standardError === 0) {
      return { confidence: 0, uplift };
    }

    const zScore = Math.abs((p2 - p1) / standardError);

    // Z-score를 confidence level로 변환
    const confidence = this.zScoreToConfidence(zScore);

    return { confidence, uplift };
  }

  /**
   * Z-score를 confidence level로 변환
   */
  private zScoreToConfidence(zScore: number): number {
    // 간단한 근사값
    if (zScore >= 2.576) return 99; // 99% confidence
    if (zScore >= 1.96) return 95;  // 95% confidence
    if (zScore >= 1.645) return 90; // 90% confidence
    if (zScore >= 1.282) return 80; // 80% confidence
    return Math.min(zScore * 38.2, 75); // Linear approximation below 80%
  }

  /**
   * 승자 결정
   */
  private determineWinner(
    variants: ABTestVariantResult[],
    confidenceThreshold: number
  ): ABTestVariantResult | undefined {
    // Control을 제외한 variants
    const nonControlVariants = variants.filter(v => v.type !== 'control');

    // Confidence threshold를 넘고 uplift가 양수인 variant 찾기
    const qualifiedVariants = nonControlVariants.filter(
      v => v.confidence >= confidenceThreshold && v.uplift > 0
    );

    if (qualifiedVariants.length === 0) {
      return undefined;
    }

    // Uplift가 가장 높은 variant 선택
    return qualifiedVariants.reduce((best, current) =>
      current.uplift > best.uplift ? current : best
    );
  }

  /**
   * 데이터 품질 평가
   */
  private assessDataQuality(
    variants: ABTestVariantResult[],
    minSampleSize: number
  ): 'excellent' | 'good' | 'fair' | 'poor' {
    const minVisitors = Math.min(...variants.map(v => v.sampleSize));

    if (minVisitors >= minSampleSize * 2) return 'excellent';
    if (minVisitors >= minSampleSize) return 'good';
    if (minVisitors >= minSampleSize * 0.5) return 'fair';
    return 'poor';
  }

  /**
   * 결론 및 권장사항 생성
   */
  private generateConclusion(
    test: ABTest,
    variants: ABTestVariantResult[],
    winner: ABTestVariantResult | undefined
  ): { conclusion: string; recommendations: string[] } {
    const recommendations: string[] = [];

    if (winner) {
      const conclusion = `${winner.name}이(가) ${winner.uplift.toFixed(2)}% 개선으로 ${winner.confidence.toFixed(1)}% 신뢰도로 승리했습니다.`;

      recommendations.push(`✅ ${winner.name}을(를) 전체 트래픽에 적용하세요`);
      recommendations.push(`📊 개선 효과를 지속적으로 모니터링하세요`);
      recommendations.push(`🔄 성공 패턴을 다른 페이지에도 적용 고려`);
    } else {
      const bestVariant = variants
        .filter(v => v.type !== 'control')
        .reduce((best, current) => (current.uplift > best.uplift ? current : best), variants[0]);

      const conclusion = `통계적으로 유의미한 결과를 얻지 못했습니다. ${bestVariant.confidence.toFixed(1)}% 신뢰도는 ${test.confidenceThreshold}% 기준에 미달합니다.`;

      recommendations.push(`⏱️ 테스트 기간을 연장하여 더 많은 데이터 수집`);
      recommendations.push(`👥 트래픽 양을 늘리거나 타겟팅 개선`);
      recommendations.push(`🎯 더 큰 변화가 있는 variant로 재테스트`);

      // 샘플 사이즈 부족
      const minVisitors = Math.min(...variants.map(v => v.sampleSize));
      if (minVisitors < test.minSampleSize) {
        recommendations.push(`📈 최소 샘플 사이즈(${test.minSampleSize})에 도달하지 못했습니다`);
      }
    }

    return { conclusion, recommendations };
  }

  /**
   * 테스트 완료
   */
  completeTest(testId: string): ABTest {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    test.status = 'completed';
    test.endDate = new Date();
    test.updatedAt = new Date();

    console.log(`[ABTestEngine] Test completed: ${test.name}`);
    return test;
  }

  /**
   * 테스트 조회
   */
  getTest(testId: string): ABTest | undefined {
    return this.tests.get(testId);
  }

  /**
   * 모든 테스트 조회
   */
  getAllTests(): ABTest[] {
    return Array.from(this.tests.values());
  }

  /**
   * 상태별 테스트 조회
   */
  getTestsByStatus(status: ABTestStatus): ABTest[] {
    return Array.from(this.tests.values()).filter(t => t.status === status);
  }

  /**
   * 해시 함수 (일관된 variant 할당용)
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * ID 생성
   */
  private generateTestId(): string {
    return `test_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private generateVariantId(): string {
    return `variant_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}

/**
 * 싱글톤 인스턴스
 */
export const abTestEngine = new ABTestEngine();
