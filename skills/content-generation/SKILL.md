---
name: content-generation
description: FamilyOffice 자산관리 콘텐츠(블로그 포스트, Beehiiv 뉴스레터, 티스토리 포스트) 초안 작성. 한국 중견기업 CEO(45~65세) 타겟, 전문적 권위 톤. "블로그 써줘", "뉴스레터 초안", "콘텐츠 생성", "티스토리 변환" 요청 시 사용.
metadata:
  argument-hint: "[콘텐츠 기둥 또는 SEO 키워드]"
---

# 콘텐츠 생성

FamilyOffice(familyoffices.vip)용 자산관리 전문 콘텐츠 초안을 작성한다. 기존 `CONTENT_GENERATION_WORKFLOW.md`와 `.claude/agents/familyoffice-content-writer.json`의 전략을 스킬로 옮긴 것이다.

## 대상 독자 & 톤

- **독자**: 한국 중견기업 CEO, 45~65세
- **톤**: 전문적 권위(professional authoritative) — 데이터 기반, 실무 적용 가능, 출처 명시
- **금지**: 투자 권유, 수익 보장, 과장된 자극형 표현

## 콘텐츠 기둥 (택1)

1. 자산관리 (asset management)
2. 투자전략 (investment strategy)
3. 포트폴리오 최적화 (portfolio optimization)
4. 리스크 관리 (risk management)
5. 가족자산계획 (family wealth planning)

## SEO 키워드 풀

패밀리오피스 · 자산관리 · 투자전략 · 포트폴리오 최적화 · 가족자산관리 · 상속세 절세

키워드 밀도 2~3% 목표. 최신·확장 키워드는 `lib/seo/korean-keywords.ts`, `lib/seo/keyword-strategy.ts`를 참조한다.

## 워크플로우

### 1단계: 주제 확정
- 콘텐츠 기둥 1개 + 핵심 SEO 키워드 1~2개 선택 (인자로 주어지지 않으면 질문)
- 콘텐츠 타입 선택: 블로그 포스트 / 사례연구 / 뉴스레터

### 2단계: 블로그 포스트 초안
구조 (`lib/blog/`, `types/blog.ts`의 `BlogPost` 타입 참조):

1. **제목 (H1)** — 핵심 키워드 포함
2. **들어가며** — 독자 관심 끌기 + 문제 제기
3. **주요 내용** — H2 3개 내외, 세부 주제별 전개
4. **핵심 인사이트** — 즉시 적용 가능한 통찰
5. **향후 전망** — 트렌드 분석
6. **핵심 키워드** — SEO 태그
7. **CTA** — 구조점검 상담 예약 유도

분량 2,000~4,000자. H1-H6 계층 준수.

### 3단계: Beehiiv 뉴스레터 변형
- `lib/beehiiv/client.ts`의 `BeehiivClient`로 발송하지만, **이 스킬은 초안까지만** — 발송은 사람이 한다.
- 블로그 핵심을 뉴스레터 길이로 압축, 단일 CTA(구조점검 예약)

### 4단계: 티스토리 변형
- `lib/tistory-integration.ts`의 `TistoryContentConverter` 구조(`title` / `summary` / `mainPoints` / `caseStudy` / `actionItems` / `naverKeywords`)에 맞춰 네이버 검색 최적화 변형을 작성한다.

### 5단계: 품질 체크
- [ ] SEO 키워드가 자연스럽게 포함됐는가
- [ ] 톤앤매너가 일관적인가
- [ ] H1-H6 계층이 정상인가
- [ ] CTA(구조점검 예약)가 포함됐는가
- [ ] 세무/법률 언급에 "전문가 검토 필요"가 표시됐는가

## 산출물

- 블로그 포스트 Markdown 초안 (`content/` 또는 `lib/blog/posts/`)
- Beehiiv 뉴스레터 초안
- 티스토리 포스트 초안

## 중요 노트

- **세무·상속·법률 내용은 일반 정보로만.** 구체적 절세 전략을 단정하지 않고, 반드시 "전문가 검토 필요"를 표시한다.
- **발행·발송은 사람이.** 이 스킬은 초안까지만 만든다.
- 사실·수치는 출처를 명시한다. 검증 불가한 통계를 만들어내지 않는다.
