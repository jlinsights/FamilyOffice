---
name: seo-review
description: 랜딩 페이지의 메타데이터·구조화 데이터(JSON-LD)·한국어 키워드 커버리지·헤딩 구조를 점검하고 심각도별 개선안을 낸다. "SEO 점검", "메타태그 확인", "랜딩 페이지 SEO 리뷰" 요청 시 사용.
metadata:
  argument-hint: "[페이지 경로 또는 URL]"
---

# SEO·랜딩 페이지 점검

FamilyOffice 페이지를 기존 `lib/seo/` 모듈 기준으로 점검한다.

## 점검 기준 & 참조

| 항목 | 참조 모듈 |
|---|---|
| 메타데이터 생성 | `lib/seo/metadata-generator.ts`, `lib/seo/metadata.ts` |
| 구조화 데이터 | `lib/seo/structured-data.ts`, `lib/seo/dynamic-structured-data.ts` |
| 한국어 키워드 | `lib/seo/korean-keywords.ts`, `lib/seo/keyword-strategy.ts` |
| 듀얼 도메인 | `lib/seo/dual-domain-seo.ts`, `lib/seo/familyoffices-vip-seo.ts` |
| 순위 추적 | Supabase `keyword_rankings` 테이블 |

## 워크플로우

### 1단계: 페이지 로드
- 인자의 경로/URL로 해당 `app/.../page.tsx`와 `metadata` export 또는 `generateMetadata()`를 확인한다.

### 2단계: 메타데이터 점검

| 항목 | 기준 |
|---|---|
| `<title>` | 30~60자, 핵심 키워드 포함 |
| `description` | 70~160자, CTA 포함 |
| Open Graph | `og:title` / `og:description` / `og:image` 존재 |
| canonical | 듀얼 도메인 정책에 맞는 canonical 설정 |

### 3단계: 구조화 데이터(JSON-LD)
- 페이지 유형에 맞는 스키마(`Organization` / `Article` / `FAQPage` / `Service`) 존재 여부
- `lib/seo/structured-data.ts` 헬퍼 사용 여부

### 4단계: 한국어 키워드 커버리지
- `korean-keywords.ts`·`keyword-strategy.ts`의 타깃 키워드가 제목·H2·본문에 자연스럽게 등장하는지
- 키워드 밀도 2~3%, 과최적화(stuffing)가 아닌지

### 5단계: 구조 점검
- H1 1개, H2-H6 계층 정상
- 내부 링크: 관련 서비스/콘텐츠로 최소 2~3개
- 이미지 `alt` 텍스트, `width`/`height` 명시

### 6단계: 산출물 — 심각도별 개선안

| 심각도 | 의미 |
|---|---|
| CRITICAL | 색인·노출 차단 (title 누락, `noindex` 오설정) |
| HIGH | 순위 손실 (타깃 키워드 미커버, JSON-LD 누락) |
| MEDIUM | 개선 여지 (description 길이, 내부 링크 부족) |
| LOW | 사소 (alt 텍스트 다듬기) |

각 항목에 파일 경로·라인과 구체적 수정안을 함께 제시한다.

## 가드레일

- **점검·제안만 한다.** 코드 수정은 사용자 승인 후 별도로 진행한다.
- 키워드는 `lib/seo/`의 정의를 따른다 — 임의로 새 키워드를 만들지 않는다.
