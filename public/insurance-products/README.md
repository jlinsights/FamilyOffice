# 🛡️ FamilyOffice S 보험상품 자료 관리 시스템

비즈니스 특성상 중요한 보험상품 판매를 위한 전용 자료 관리 및 활용 시스템입니다.

## 📁 디렉토리 구조

```
public/insurance-products/
├── life-insurance/                    # 생명보험
│   ├── samsung-life/                 # 삼성생명
│   │   ├── brochures/                # 상품 브로셔
│   │   ├── leaflets/                 # 리플릿
│   │   ├── product-guides/           # 상품 설명서
│   │   ├── rate-tables/              # 보험료율표
│   │   └── marketing-materials/      # 마케팅 자료
│   ├── other-providers/              # 기타 보험사
│   └── comparative-analysis/         # 상품 비교 자료
├── property-insurance/                # 손해보험
│   ├── samsung-fire/                 # 삼성화재
│   │   ├── brochures/
│   │   ├── leaflets/
│   │   ├── product-guides/
│   │   ├── rate-tables/
│   │   └── marketing-materials/
│   ├── other-providers/
│   └── comparative-analysis/
├── pension-products/                  # 연금상품
│   ├── annuity-insurance/            # 연금보험
│   ├── retirement-plans/             # 퇴직연금
│   └── personal-pension/             # 개인연금
├── investment-products/               # 투자연계상품
│   ├── variable-life/                # 변액생명보험
│   ├── variable-annuity/             # 변액연금보험
│   └── unit-linked/                  # 유닛링크
├── sales-tools/                       # 판매 지원 도구
│   ├── calculators/                  # 보험료 계산기
│   ├── presentations/                # 영업용 프레젠테이션
│   ├── comparison-sheets/            # 상품 비교표
│   └── roi-simulators/               # 수익률 시뮬레이터
└── compliance/                        # 컴플라이언스
    ├── regulations/                  # 규제 자료
    ├── disclaimers/                  # 면책 사항
    └── approval-documents/           # 상품 승인 문서
```

## 🎯 상품 카테고리별 관리

### 1️⃣ 생명보험 (Life Insurance)
```yaml
주요 상품군:
  - 종신보험
  - 정기보험  
  - 저축보험
  - 상속보험
  
필수 자료:
  - 상품 브로셔 (PDF)
  - 약관 요약서 (PDF)
  - 보험료율표 (XLSX)
  - 세제혜택 가이드 (PDF)
  - 상품 비교표 (XLSX)
```

### 2️⃣ 손해보험 (Property Insurance)  
```yaml
주요 상품군:
  - 자산보험
  - 배상책임보험
  - 기업보험
  - 해외여행보험
  
필수 자료:
  - 상품 설명서 (PDF)
  - 보장 범위표 (XLSX) 
  - 면책 사항 (PDF)
  - 청구 절차 가이드 (PDF)
```

### 3️⃣ 연금상품 (Pension Products)
```yaml
주요 상품군:
  - 개인연금보험
  - 퇴직연금
  - 즉시연금
  - 변액연금
  
필수 자료:
  - 연금 설계서 (PDF)
  - 수익률 시나리오 (XLSX)
  - 세제혜택 분석 (PDF)
  - 연금 수령 옵션 (PDF)
```

## 🔧 관리 시스템 기능

### 파일 명명 규칙
```
{보험사}_{상품군}_{상품명}_{자료유형}_{버전}_{날짜}.{확장자}

예시:
- samsung-life_whole-life_premium-plus_brochure_v2.1_2025-02.pdf
- samsung-fire_asset-protection_commercial_leaflet_v1.0_2025-01.pdf  
- samsung-life_annuity_guaranteed_rate-table_2025Q1.xlsx
```

### 메타데이터 구조
```json
{
  "productId": "samsung-life-premium-plus-2025",
  "provider": "samsung-life",
  "category": "life-insurance", 
  "productName": "프리미엄 플러스 종신보험",
  "documentType": "brochure",
  "version": "v2.1",
  "releaseDate": "2025-02-01",
  "targetAudience": ["중견기업 CEO", "고액자산가"],
  "keyFeatures": [
    "상속세 절세 효과",
    "현금흐름 개선", 
    "세제 혜택"
  ],
  "salesPoints": [
    "업계 최고 수익률",
    "유연한 보험료 납입",
    "상속 최적화"
  ],
  "compliance": {
    "approved": true,
    "approvalDate": "2025-01-15",
    "validUntil": "2025-12-31"
  }
}
```

## 💼 비즈니스 활용 방안

### 1️⃣ 콘텐츠 마케팅 통합
- **블로그 포스트**: 보험상품 관련 교육 콘텐츠에 상품 정보 자연스럽게 통합
- **뉴스레터**: 정기적으로 추천 상품 및 시장 동향 제공
- **상담 자료**: Cal.com 예약 후 맞춤형 상품 제안서 생성

### 2️⃣ 개인화된 상품 추천
```typescript
interface ClientProfile {
  age: number;
  income: number;
  assets: number;
  familyStructure: string;
  goals: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

interface ProductRecommendation {
  products: InsuranceProduct[];
  reasoning: string;
  expectedBenefits: string[];
  taxAdvantages: string[];
}
```

### 3️⃣ 판매 지원 도구
- **보험료 계산기**: 실시간 보험료 산출
- **수익률 시뮬레이터**: 장기 수익률 시나리오 분석  
- **세제혜택 계산기**: 절세 효과 정량 분석
- **상품 비교표**: 경쟁사 대비 우위 요소 시각화

## 🎨 프론트엔드 표시 방안

### 상품 쇼케이스 페이지 (`/products`)
```jsx
// 상품 카테고리별 탐색
<ProductCategories>
  <Category icon="shield" title="생명보험">
    <ProductCard 
      product="프리미엄 종신보험"
      highlight="상속세 절세 효과"
      cta="상품 자세히 보기"
    />
  </Category>
</ProductCategories>

// 추천 상품 섹션  
<RecommendedProducts clientProfile={profile}>
  <PersonalizedCard 
    reason="고객님의 자산 규모에 최적화된 상품"
    products={recommendations}
  />
</RecommendedProducts>
```

### 상품 상세 페이지 (`/products/[slug]`)
```jsx
<ProductDetail product={product}>
  <ProductHero 
    brochure={product.brochure}
    keyBenefits={product.benefits}
  />
  <FeatureComparison competitors={competitors} />
  <TaxBenefitCalculator product={product} />
  <ConsultationBooking 
    prefilled={{
      interest: product.name,
      category: product.category
    }}
  />
</ProductDetail>
```

## 🔄 자동 업데이트 시스템

### 상품 정보 동기화
```javascript
// 정기적으로 상품 정보 업데이트
const updateProductDatabase = async () => {
  // 1. 새로운 브로셔/리플릿 스캔
  const newMaterials = await scanProductMaterials();
  
  // 2. 메타데이터 추출 및 업데이트
  const updatedProducts = await extractProductMetadata(newMaterials);
  
  // 3. 웹사이트 상품 DB 업데이트
  await updateProductDatabase(updatedProducts);
  
  // 4. 콘텐츠 생성 시스템에 새 상품 정보 반영
  await notifyContentGenerator(updatedProducts);
};
```

## 📊 성과 측정

### 추적 지표
```yaml
상품 관심도:
  - 브로셔 다운로드 수
  - 상품 상세페이지 조회수
  - 계산기 사용 빈도
  
상담 전환:
  - 상품별 상담 예약률
  - 상담-계약 전환률
  - 평균 계약 규모
  
콘텐츠 효과:
  - 상품 언급 콘텐츠 성과
  - 관련 키워드 검색 유입
  - 뉴스레터 클릭률
```

## ⚖️ 컴플라이언스

### 규제 준수 사항
- **상품 승인**: 모든 상품 자료는 금융당국 승인 완료 후 게시
- **면책 고지**: 투자 위험 및 면책사항 필수 표기
- **광고 규제**: 금융상품 광고 규제 준수
- **개인정보**: 상담 신청 시 개인정보 처리 동의

### 자동 컴플라이언스 체크
```javascript
const complianceCheck = (productMaterial) => {
  const checks = [
    hasRequiredDisclaimer(productMaterial),
    hasApprovalNumber(productMaterial), 
    hasRiskWarning(productMaterial),
    hasValidApprovalPeriod(productMaterial)
  ];
  
  return checks.every(check => check === true);
};
```

---

## 🚀 추천 실행 순서

1. **디렉토리 구조 생성** ✅ (다음 스텝에서 생성)
2. **기존 보험상품 자료 정리 및 업로드**
3. **메타데이터 시스템 구축**
4. **상품 쇼케이스 페이지 개발**
5. **판매 지원 도구 개발 (계산기 등)**
6. **콘텐츠 마케팅 시스템과 통합**

보험상품 자료를 어디에 넣을지에 대한 답변: **`/public/insurance-products/` 디렉토리**에 체계적으로 정리해서 넣으시면 됩니다!