---
description: Supabase 리드 스코어 리뷰 및 후속 조치 제안
argument-hint: "[등급 A-D 또는 세그먼트]"
---

`lead-scoring` 스킬을 로드해 Supabase `lead_scores` 테이블의 리드를 등급(A/B/C/D)별로 분석하고, 고우선순위(핫) 리드의 후속 조치를 제안한다.

등급/세그먼트가 주어지면 해당 범위만, 없으면 전체 등급 분포부터 시작한다.

Supabase는 읽기 전용 MCP로만 접근하며, 이메일·전화번호 원문은 산출물에 노출하지 않는다.
