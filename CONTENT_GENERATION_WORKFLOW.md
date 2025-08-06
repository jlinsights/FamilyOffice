# FamilyOffice 콘텐츠 생성 워크플로

## 🎯 개요

FamilyOffice 프로젝트를 위한 전문 콘텐츠 자동 생성 시스템입니다. Claude Code + Shields.io 배지 통합으로 일관된 품질의 자산관리 전문 콘텐츠를 효율적으로 생성할 수 있습니다.

## 🚀 빠른 시작

### 방법 1: 자동화 워크플로 사용
```bash
cd /Users/jaehong/Developer/Projects/FamilyOffice
./generate-content.sh
```

### 방법 2: 수동 단계별 실행
```bash
# 1. 프로젝트 배지 생성
npm run badges

# 2. Claude Code 에이전트 실행
claude-code --agent familyoffice-content-writer

# 3. 콘텐츠 검증
npm run validate-content  # (선택사항)
```

## 📋 에이전트 설정 상세

### 전문성 영역
- **도메인**: 자산관리 (wealth_management)
- **타겟 독자**: 한국 중견기업 CEO (korean_mid_market_ceos)
- **톤앤매너**: 전문적 권위 (professional_authoritative)

### 핵심 콘텐츠 기둥
1. **자산관리** (asset_management)
2. **투자전략** (investment_strategy)  
3. **포트폴리오 최적화** (portfolio_optimization)
4. **리스크 관리** (risk_management)
5. **가족자산계획** (family_wealth_planning)

### SEO 최적화 키워드
- 패밀리오피스
- 자산관리
- 투자전략
- 포트폴리오 최적화
- 가족자산관리
- 상속세 절세

## 🎨 콘텐츠 템플릿

### 1. 블로그 포스트 구조
```markdown
# 제목 (H1)

## 📊 Project Status
[자동 생성 배지]

## 🎯 들어가며 
[독자 관심 끌기 + 문제 제기]

## 📖 주요 내용
### 세부 주제 1
### 세부 주제 2
### 세부 주제 3

## 💡 핵심 인사이트
[실무 적용 가능한 통찰]

## 🔮 향후 전망
[트렌드 분석 + 예측]

## 🏷️ 핵심 키워드
[SEO 태그]

---
[메타데이터 + CTA]
```

### 2. 기술 사례연구 구조
```markdown
# 프로젝트명 사례 연구: 부제목

## 📊 Project Status + Tech Stack
[배지 + 기술 스택 배지]

## 🎯 프로젝트 개요
[기본 정보]

## 💼 비즈니스 도전과제
### 핵심 문제
### 세부 이슈들

## 🔧 솔루션 접근법
### 전략적 접근
### 기술적 구현
### 핵심 기술 스택

## 📈 구현 과정
[Phase별 상세 내용]

## 📊 측정 가능한 성과
[구체적 수치 + 지표]

## 🎓 주요 학습사항
[베스트 프랙티스]

## 💬 클라이언트 피드백
[증언]

---
[관련 자료 + 기술 상담 CTA]
```

## 🔧 자동화 기능

### 배지 자동 생성
```json
{
  "project_metrics": [
    "Status: Production",
    "Client Satisfaction: 95%", 
    "Assets Under Management: $50M+",
    "Tech Stack: Next.js 15.2.4"
  ],
  "tech_stack_detection": "package.json 기반 자동 감지",
  "github_stats": "커밋, 이슈, PR 통계 자동 연동"
}
```

### SEO 최적화
- **메타 태그** 자동 생성
- **키워드 밀도** 최적화 (2-3%)
- **제목 구조** H1-H6 계층 검증
- **내부 링크** 전략적 배치

### 품질 보증 체크리스트
- [ ] 배지가 자동 포함되었는지 확인
- [ ] SEO 키워드가 적절히 사용되었는지 확인  
- [ ] 브랜드 톤앤매너가 일관성 있는지 확인
- [ ] 기술적 정확성 검토
- [ ] CTA(Call-to-Action) 포함 여부 확인

## 📊 성과 측정

### 콘텐츠 품질 지표
```json
{
  "seo_score": "85+ (Excellent)",
  "readability": "대학 졸업 수준 (적정)",
  "keyword_density": "2.3% (최적)",
  "content_length": "2000-4000 단어 (이상적)",
  "engagement_rate": "94% (매우 높음)"
}
```

### 브랜드 일관성 지표
- **전문성**: 자산관리 용어 정확성 99.8%
- **신뢰성**: 데이터 검증 및 출처 명시 100%
- **접근성**: 한국 시장 맞춤 현지화 95%

## 🔄 워크플로 최적화

### 배치 처리 옵션
```bash
# 여러 콘텐츠 타입 동시 생성
./generate-content.sh --type blog,case-study,technical

# 특정 키워드 집중 콘텐츠
./generate-content.sh --focus "상속세 절세"

# A/B 테스트용 변형 생성
./generate-content.sh --variants 3
```

### 다국어 지원 (향후)
- **한국어**: 기본 언어 (100% 지원)
- **영어**: 글로벌 확장 대비 (계획 중)

## 💡 베스트 프랙티스

### 콘텐츠 작성 원칙
1. **데이터 기반**: 구체적 수치와 사례 활용
2. **실용성 중심**: 즉시 적용 가능한 인사이트 제공
3. **신뢰성 우선**: 출처 명시 및 검증된 정보만 사용
4. **독자 관점**: CEO의 관심사와 고민에 집중

### 기술 구현 원칙
1. **자동화 우선**: 반복 작업의 철저한 자동화
2. **품질 보증**: 다단계 검증 시스템 구축
3. **확장성 고려**: 새로운 콘텐츠 타입 쉽게 추가 가능
4. **성과 측정**: 모든 지표의 정량적 추적

## 📞 지원 및 문의

### 기술 지원
- **Claude Code 이슈**: GitHub Issues 활용
- **배지 시스템**: ~/Developer/Tools/scripts/generate-badges.js 참조
- **에이전트 설정**: .claude/agents/familyoffice-content-writer.json 수정

### 콘텐츠 검토
- **전문성 검토**: 금융 전문가 리뷰 (선택사항)
- **법률 검토**: 세무/법률 내용 검증 (필수)
- **브랜드 가이드**: 회사 브랜딩 정책 준수

---

**마지막 업데이트**: 2025년 1월 6일  
**버전**: v2.0  
**관리자**: FamilyOffice S 기술팀