# 📂 보험상품 자료 업로드 가이드

보험상품 브로셔, 리플릿, 및 관련 자료를 체계적으로 업로드하기 위한 완벽한 가이드입니다.

## 🎯 업로드 위치 안내

### 📁 **정확한 업로드 경로**

```
public/insurance-products/
├── life-insurance/                     # 🛡️ 생명보험
│   ├── samsung-life/                  # 삼성생명 상품
│   │   ├── brochures/                 ← 여기에 브로셔 업로드
│   │   ├── leaflets/                  ← 여기에 리플릿 업로드
│   │   ├── product-guides/            ← 여기에 상품 설명서 업로드
│   │   ├── rate-tables/               ← 여기에 보험료율표 업로드
│   │   └── marketing-materials/       ← 여기에 기타 마케팅 자료
│   └── other-providers/               # 기타 생명보험사
│
├── property-insurance/                 # 🏠 손해보험
│   ├── samsung-fire/                  # 삼성화재 상품
│   │   ├── brochures/                 ← 여기에 브로셔 업로드
│   │   ├── leaflets/                  ← 여기에 리플릿 업로드
│   │   ├── product-guides/            ← 여기에 상품 설명서 업로드
│   │   ├── rate-tables/               ← 여기에 보험료율표 업로드
│   │   └── marketing-materials/       ← 여기에 기타 마케팅 자료
│   └── other-providers/
│
├── pension-products/                   # 💰 연금상품
│   ├── samsung-life/
│   └── other-providers/
│
└── investment-products/                # 📈 투자연계상품
    ├── samsung-life/
    ├── run-investment/
    └── other-providers/
```

## 📋 파일 명명 규칙

### **필수 명명 형식**

```
{보험사}_{상품분류}_{상품명}_{자료유형}_{버전}_{날짜}.{확장자}
```

### **실제 예시**

```bash
# 삼성생명 종신보험 브로셔
samsung-life_whole-life_premium-plus_brochure_v2.1_2025-02.pdf

# 삼성화재 자산보험 리플릿
samsung-fire_asset-protection_business-guard_leaflet_v1.0_2025-01.pdf

# 런인베스트 변액보험 상품 설명서
run-investment_variable-life_growth-plus_product-guide_v1.5_2025-02.pdf

# 삼성생명 연금보험 보험료율표
samsung-life_annuity_guaranteed-pension_rate-table_2025Q1.xlsx
```

## 🗂️ 자료 유형별 업로드 가이드

### 1️⃣ **브로셔 (Brochures)**

```yaml
위치: {카테고리}/{보험사}/brochures/
형식: PDF (권장), JPG, PNG
용도: 주요 상품 소개 및 마케팅
파일명 예시: samsung-life_whole-life_premium_brochure_v2.0_2025-02.pdf
```

### 2️⃣ **리플릿 (Leaflets)**

```yaml
위치: {카테고리}/{보험사}/leaflets/
형식: PDF, JPG, PNG
용도: 간단한 상품 소개, 핵심 포인트
파일명 예시: samsung-fire_liability_professional_leaflet_v1.0_2025-01.pdf
```

### 3️⃣ **상품 설명서 (Product Guides)**

```yaml
위치: {카테고리}/{보험사}/product-guides/
형식: PDF (권장), DOCX
용도: 상품 상세 조건, 약관 설명
파일명 예시: samsung-life_savings_wealth-plus_product-guide_v1.2_2025-02.pdf
```

### 4️⃣ **보험료율표 (Rate Tables)**

```yaml
위치: {카테고리}/{보험사}/rate-tables/
형식: XLSX (권장), CSV, PDF
용도: 연령별/성별 보험료, 수익률 데이터
파일명 예시: samsung-life_term-life_premium-rates_rate-table_2025Q1.xlsx
```

### 5️⃣ **마케팅 자료 (Marketing Materials)**

```yaml
위치: {카테고리}/{보험사}/marketing-materials/
형식: PPTX, PDF, JPG, PNG
용도: 영업용 프레젠테이션, 판매 지원
파일명 예시: samsung-life_whole-life_sales-presentation_marketing_v1.0_2025-01.pptx
```

## 📊 카테고리별 상품 분류

### 🛡️ **생명보험 (life-insurance)**

```yaml
상품 분류:
  - whole-life: 종신보험
  - term-life: 정기보험
  - savings-insurance: 저축보험
  - inheritance-insurance: 상속보험

주요 보험사:
  - samsung-life: 삼성생명 (메인)
  - other-providers: 기타 생명보험사

업로드 예시: public/insurance-products/life-insurance/samsung-life/brochures/
  samsung-life_whole-life_premium-plus_brochure_v2.0_2025-02.pdf
```

### 🏠 **손해보험 (property-insurance)**

```yaml
상품 분류:
  - asset-protection: 자산보험
  - liability: 배상책임보험
  - business-insurance: 기업보험
  - travel-insurance: 해외여행보험

주요 보험사:
  - samsung-fire: 삼성화재 (메인)
  - other-providers: 기타 손해보험사

업로드 예시: public/insurance-products/property-insurance/samsung-fire/leaflets/
  samsung-fire_asset-protection_business-guard_leaflet_v1.0_2025-01.pdf
```

### 💰 **연금상품 (pension-products)**

```yaml
상품 분류:
  - annuity-insurance: 연금보험
  - retirement-plans: 퇴직연금
  - personal-pension: 개인연금

업로드 예시:
  public/insurance-products/pension-products/samsung-life/product-guides/
  samsung-life_annuity_guaranteed-pension_product-guide_v1.0_2025-01.pdf
```

### 📈 **투자연계상품 (investment-products)**

```yaml
상품 분류:
  - variable-life: 변액생명보험
  - variable-annuity: 변액연금보험
  - unit-linked: 유닛링크

주요 공급사:
  - samsung-life: 삼성생명
  - run-investment: 런인베스트
  - other-providers: 기타 공급사

업로드 예시:
  public/insurance-products/investment-products/run-investment/rate-tables/
  run-investment_variable-life_growth-fund_rate-table_2025Q1.xlsx
```

## 🛠️ 특별 폴더들

### **판매 지원 도구 (sales-tools)**

```yaml
calculators/        # 보험료 계산기, 시뮬레이터
presentations/      # 영업용 프레젠테이션
comparison-sheets/  # 상품 비교표
roi-simulators/     # 수익률 시뮬레이터

업로드 예시:
  public/insurance-products/sales-tools/calculators/
  insurance-premium-calculator_v2.0_2025-02.xlsx
```

### **컴플라이언스 (compliance)**

```yaml
regulations/        # 규제 관련 자료
disclaimers/        # 면책 사항
approval-documents/ # 금융당국 승인 문서

업로드 예시:
  public/insurance-products/compliance/approval-documents/
  samsung-life_premium-plus_approval_2025-001.pdf
```

## 🔄 업로드 후 관리

### **자동 스캔 및 인덱싱**

```bash
# 새로 업로드된 자료 스캔
node scripts/insurance-products-manager.js scan

# 인덱스 업데이트
node scripts/insurance-products-manager.js index
```

### **업로드 확인**

1. 파일이 올바른 위치에 업로드되었는지 확인
2. 파일명이 명명 규칙을 준수하는지 확인
3. 시스템 스캔으로 자동 인식 여부 확인

## ⚠️ 주의사항

### **파일 형식**

- **PDF**: 상품 설명서, 브로셔 (권장)
- **XLSX**: 보험료율표, 데이터 테이블 (권장)
- **PPTX**: 프레젠테이션, 교육 자료
- **JPG/PNG**: 이미지 형태의 리플릿, 인포그래픽

### **파일 크기**

- **브로셔/설명서**: 최대 50MB
- **리플릿**: 최대 20MB
- **데이터 파일**: 최대 100MB
- **프레젠테이션**: 최대 200MB

### **보안 및 컴플라이언스**

- 금융당국 승인이 완료된 자료만 업로드
- 개인정보 포함 자료는 별도 처리
- 저작권이 있는 자료는 사용 권한 확인

## 📞 문의 및 지원

업로드 과정에서 문제가 발생하거나 궁금한 점이 있으시면:

1. **기술적 문제**: 시스템 관리자 문의
2. **자료 분류**: FamilyOffice S 운영팀 문의
3. **컴플라이언스**: 법무팀 문의

---

💡 **팁**: 체계적인 업로드를 위해 한 번에 한 보험사씩, 한 상품군씩 정리해서 업로드하시는 것을 권장합니다!
