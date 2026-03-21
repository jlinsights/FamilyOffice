# Plan: remaining-cleanup

> 상담 폼 API 연결 + 미사용 코드 정리

## 범위

### 1. 상담 폼 API 연결 (MEDIUM)
- `consultation-form.tsx`: 주석 처리된 API 호출을 실제 연결
- Supabase `consultations` 테이블 이미 존재 (admin에서 조회 중)
- API route 신규 생성: `app/api/consultations/route.ts`

### 2. Dead Code 정리 (LOW)
- `lib/content-recommendations.ts`: stub (빈 배열 반환) → 참조 파일과 함께 정리
- `lib/seo/inbound-marketing-automation.ts`: stub (7개 TODO) → 참조 파일과 함께 정리
- `lib/dual-domain-seo.ts`: stub → 참조 파일과 함께 정리
- `next.config.mjs`: 주석 113줄 정리

### Out of Scope
- 새 기능 추가
- UI 변경

## 성공 기준
- 상담 폼이 실제 Supabase에 데이터 저장
- stub TODO 0건 (삭제 또는 구현)
- lint + typecheck + build 통과
