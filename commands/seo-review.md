---
description: 랜딩 페이지 SEO·메타데이터·구조화 데이터 점검
argument-hint: "[페이지 경로 또는 URL]"
---

`seo-review` 스킬을 로드해 지정한 페이지의 메타데이터·JSON-LD 구조화 데이터·한국어 키워드 커버리지·헤딩 구조를 `lib/seo/` 모듈 기준으로 점검하고, 심각도별(CRITICAL/HIGH/MEDIUM/LOW) 개선안을 제시한다.

페이지 경로(`app/.../page.tsx`)나 URL이 주어지면 사용하고, 없으면 점검할 페이지를 먼저 묻는다.

점검·제안만 한다 — 코드 수정은 사용자 승인 후.
