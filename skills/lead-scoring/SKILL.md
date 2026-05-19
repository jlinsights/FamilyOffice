---
name: lead-scoring
description: Supabase의 리드 스코어 데이터를 분석해 등급별 리드를 정리하고 고우선순위 리드의 후속 조치를 제안한다. "리드 리뷰", "리드 스코어", "핫리드", "리드 분석" 요청 시 사용.
metadata:
  argument-hint: "[등급 A-D 또는 세그먼트]"
---

# 리드 스코어링 리뷰

FamilyOffice 마케팅 DB의 리드를 검토하고, 영업·상담팀이 바로 움직일 수 있는 우선순위 목록을 만든다.

## 데이터 소스

| 소스 | 위치 |
|---|---|
| 리드 스코어 | Supabase `lead_scores` 테이블 |
| 활동 로그 | Supabase `lead_activities` 테이블 |
| 스코어 엔진 | `lib/marketing/lead-scoring-engine.ts` (`LeadScoringEngine`) |
| 레거시 시스템 | `lib/lead-scoring-system.ts` (`leadScoringSystem`) |
| API | `app/api/lead-scoring/route.ts` |
| 집계 함수 | SQL `calculate_lead_score(contact_id)`, `get_marketing_metrics(days_back)` |

Supabase 접근은 **읽기 전용 MCP**(`mcp__supabase__*`)로만 한다. 점수 재계산은 위 엔진/API가 담당하므로 이 스킬에서 점수를 직접 쓰지 않는다.

## 스코어 모델

`total_score = demographic_score + behavioral_score + engagement_score` → 등급 `A` / `B` / `C` / `D`

활동별 가중치 (`lead-scoring-engine.ts`의 `DEFAULT_SCORING_RULES`):

| 활동 | 점수 |
|---|---|
| consultation_request | 25 |
| service_inquiry | 20 |
| form_submit | 15 |
| webinar_attendance | 15 |
| document_download | 10 |
| email_click | 8 |
| high_value_page | 8 |
| repeat_visit | 5 |
| email_open | 3 |
| page_view | 2 |

## 워크플로우

### 1단계: 범위 확정
- 인자로 등급/세그먼트가 주어지면 사용, 없으면 전체 등급 분포부터 시작한다.

### 2단계: 조회
- `lead_scores`를 `total_score` 내림차순으로 조회하고 `score_grade`별로 카운트한다.
- 최근 N일 활동은 `lead_activities`에서 `activity_type`·`score_impact`로 확인한다.

### 3단계: 핫리드 식별
- **A/B 등급 + 최근 `consultation_request` 또는 `service_inquiry` 활동** → 즉시 후속 대상
- 최근 활동이 누적되며 등급이 상승 중인 리드는 별도로 표시한다.

### 4단계: 후속 조치 제안
각 핫리드에 대해:
- **관심 영역** — 활동한 페이지/콘텐츠 기준 추정
- **추천 액션** — 상담 제안 / 콘텐츠 발송 / 세미나 초대 중 택1
- **우선순위** — 점수·최신성 기준

### 5단계: 산출물
- 등급 분포 요약
- 핫리드 테이블 (식별자, 등급, 점수, 최근 활동, 추천 액션)
- `get_marketing_metrics()` 기반 기간 지표 요약

## 가드레일

- **개인정보(PII).** 이메일·전화번호 원문을 산출물에 노출하지 않는다 — `hubspot_contact_id` 또는 이니셜을 쓴다.
- **읽기 전용.** 점수·리드 레코드를 직접 수정하지 않는다.
- **자동 접촉 금지.** 이메일·전화·CRM 변경은 사람이 한다. 이 스킬은 우선순위 목록까지만 만든다.
