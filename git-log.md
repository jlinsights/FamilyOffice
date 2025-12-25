# Git Log

**Generated:** 2025-08-15 04:33:58  
**Current Branch:** main

## Recent Commits (Last 20)

```
a09b69e 📦 프로덕션 배포를 위한 누락된 의존성 추가 (@google/generative-ai, axios)
3ae78fc fix: resolve Supabase server cookie API compatibility for Next.js 15
2db044d fix: resolve TypeScript compilation errors from missing test dependencies
4f0583b feat: Update Cal.com floating button and hero section navigation
6ea4fad feat: Add new VVIP seminar and improve user experience
b29dc6f feat: 투자금융 전문가 포지션 추가 - 4번째 GFC 전문 영역
5e6ed02 feat: AI 시스템에 삼성생명GFC 채용 정보 추가
26ff166 feat: 삼성생명GFC 채용 포지션으로 통일 및 전문 영역별 분화
c12e015 fix: AI API 크레딧 오류 해결 및 fallback 시스템 구현
53fc379 feat: Mobile landscape menu & AI chat consultation integration
92dc0c1 feat: Add Instagram and Threads social sharing support
f962037 feat: Complete AI chat page with comprehensive SEO optimization
d545213 feat: implement AI consulting floating chat system
259a77d fix: improve mobile hamburger menu visibility in dark mode
79698c4 fix: resolve services page build errors and complete SEO optimization
47e41b1 feat: Comprehensive SEO optimization for search engines ranking
fa5298c feat: Add Samsung Life GFC card and update hero section text on recruit page
9864af1 feat: Update company identity and recruitment details
a62cfde fix: Resolve all TypeScript and ESLint validation errors
5a0dd45 update: 뉴스레터 발송 시간 변경 (오전 9:30 → 오전 7:30)
```

## Detailed Log (Last 10)

### a09b69e - 📦 프로덕션 배포를 위한 누락된 의존성 추가 (@google/generative-ai, axios) (9 minutes ago) <홍길동>

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 3ae78fc - fix: resolve Supabase server cookie API compatibility for Next.js 15 (32 hours ago) <홍길동>

- Fix createClient function to handle async cookies() API in Next.js 15
- Update admin consultations page to await createClient() call
- Ensure compatibility with Next.js App Router server components

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 2db044d - fix: resolve TypeScript compilation errors from missing test dependencies (33 hours ago) <홍길동>

- Add missing Jest and Testing Library dependencies to package.json
- Configure test scripts (test, test:watch, test:ci, typecheck)
- Remove unused LucideIcon import in types/faq.ts
- Remove unused Clock import in app/services/page.tsx
- Fix 200+ TypeScript compilation errors
- Enable proper testing infrastructure for development

Dependencies added:

- @testing-library/jest-dom@^6.1.4
- @testing-library/react@^14.1.2
- @testing-library/user-event@^14.5.1
- @types/jest@^29.5.8
- jest@^29.7.0
- jest-environment-jsdom@^29.7.0
- ts-jest@^29.1.1

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 4f0583b - feat: Update Cal.com floating button and hero section navigation (6 days ago) <홍길동>

- 수정: Cal.com 플로팅 버튼을 familyoffice/consultation에서 familyoffice로 링크 변경
- 개선: Cal.com 버튼 구현 방식을 완전히 새로 작성하여 안정성과 가시성 향상
- 수정: 메인 페이지 히어로 섹션의 '지금 바로 물어보세요' 버튼을 /contact 페이지로 연결
- 기술: 복잡한 Cal.com API 의존성을 제거하고 직접 DOM 조작으로 단순화
- 향상: \!important CSS와 높은 z-index로 모든 페이지에서 버튼 가시성 보장

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 6ea4fad - feat: Add new VVIP seminar and improve user experience (6 days ago) <홍길동>

- Add new VVIP seminar for September 17, 2025 (asset management focus)
- Sort seminars chronologically by date (earliest first)
- Remove unnecessary 'Details' buttons from seminar cards
- Replace AI chat floating button with Cal.com consultation button
- Temporarily hide AI Consulting section on homepage
- Update Cal.com button color to match primary brand color (#3b82f6)

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### b29dc6f - feat: 투자금융 전문가 포지션 추가 - 4번째 GFC 전문 영역 (6 days ago) <홍길동>

- 기업재무컨설턴트(GFC) - 투자금융 전문가 포지션 추가
- 기업 자금조달 및 투자금융 전문 컨설팅 서비스 제공
- IB, 기업금융, M&A 관련 업무 경험 요구사항 명시
- 현재 채용직군 통계 3개 → 4개로 업데이트
- AI 시스템에도 투자금융 전문가 정보 반영
- 채용 설명 텍스트에 4개 전문 영역 모두 포함

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 5e6ed02 - feat: AI 시스템에 삼성생명GFC 채용 정보 추가 (6 days ago) <홍길동>

- 개발용 AI 응답 시스템에 채용 카테고리 및 상세 정보 추가
- 기본 응답에 GFC 전문가 채용 정보 섹션 추가
- 지능적 라우터에서 채용 관련 키워드 인식 개선
- 가업승계, 자산관리, 세무회계 전문가별 상세 정보 제공
- 삼성생명GFC 브랜드 가치 및 지원 방법 안내 포함

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 26ff166 - feat: 삼성생명GFC 채용 포지션으로 통일 및 전문 영역별 분화 (6 days ago) <홍길동>

- 자산관리 어드바이저 → 기업재무컨설턴트(GFC) - 가업승계 전문가
- 세무 컨설턴트 → 기업재무컨설턴트(GFC) - 자산관리 전문가
- 부동산 투자 매니저 → 기업재무컨설턴트(GFC) - 세무회계 전문가
- 모든 포지션을 삼성생명GFC 브랜드로 통일
- 서비스 페이지의 전문 서비스 영역과 일치하도록 개선
- 복리후생을 삼성생명GFC 특화 혜택으로 업데이트

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### c12e015 - fix: AI API 크레딧 오류 해결 및 fallback 시스템 구현 (6 days ago) <홍길동>

- DevelopmentFallbackAI 클래스 추가 (키워드 기반 응답 시스템)
- Triple-AI 엔진에 fallback 처리 로직 통합
- API 크레딧 오류 감지 및 자동 fallback 전환
- AIModel, ExecutionStrategy 타입에 fallback 옵션 추가
- 개발/프로덕션 환경에서 안정적인 AI 응답 제공

Issues Fixed:

- Claude: 크레딧 잔액 부족 오류
- OpenAI: 모델 접근 권한 오류
- Gemini: 무료 티어 할당량 초과 오류

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

### 53fc379 - feat: Mobile landscape menu & AI chat consultation integration (7 days ago) <홍길동>

- Mobile landscape hamburger menu support (md → lg breakpoint)
- Cal.com floating button disabled in external-scripts.tsx
- AI chat now always shows consultation booking button
- Consultation link updated to https://cal.com/familyoffice/coffeechat
- Improved mobile UX with proper landscape mode navigation

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

## Branch Status

```
## main...origin/main
?? .commit_message.txt
?? git-log.md
?? "public/partner-data/nanum-partners/documents/\353\202\230\353\210\224\355\214\214\355\212\270\353\204\210\354\212\244 _ \355\225\230\352\263\204\353\262\225\354\235\270\355\224\214\353\237\254\354\212\244\354\272\240\355\224\204_\354\202\274\354\204\261\354\203\235\353\252\205_2nd_edition.pdf"
```

## All Branches

```
  fix/typescript-test-dependencies                         3ae78fc fix: resolve Supabase server cookie API compatibility for Next.js 15
* main                                                     a09b69e 📦 프로덕션 배포를 위한 누락된 의존성 추가 (@google/generative-ai, axios)
  remotes/origin/cursor/debug-recruit-page-type-error-6f08 793e53d Add custom easing function support to AnimatedCounter component
  remotes/origin/cursor/go-to-root-folder-71b4             09519df Add development-friendly env validation with default values
  remotes/origin/fix/typescript-test-dependencies          3ae78fc fix: resolve Supabase server cookie API compatibility for Next.js 15
  remotes/origin/main                                      a09b69e 📦 프로덕션 배포를 위한 누락된 의존성 추가 (@google/generative-ai, axios)
```

## Recent Activity (Last 7 days)

```
a09b69e - 홍길동, 9 minutes ago : 📦 프로덕션 배포를 위한 누락된 의존성 추가 (@google/generative-ai, axios)
3ae78fc - 홍길동, 32 hours ago : fix: resolve Supabase server cookie API compatibility for Next.js 15
2db044d - 홍길동, 33 hours ago : fix: resolve TypeScript compilation errors from missing test dependencies
4f0583b - 홍길동, 6 days ago : feat: Update Cal.com floating button and hero section navigation
6ea4fad - 홍길동, 6 days ago : feat: Add new VVIP seminar and improve user experience
b29dc6f - 홍길동, 6 days ago : feat: 투자금융 전문가 포지션 추가 - 4번째 GFC 전문 영역
5e6ed02 - 홍길동, 6 days ago : feat: AI 시스템에 삼성생명GFC 채용 정보 추가
26ff166 - 홍길동, 6 days ago : feat: 삼성생명GFC 채용 포지션으로 통일 및 전문 영역별 분화
c12e015 - 홍길동, 6 days ago : fix: AI API 크레딧 오류 해결 및 fallback 시스템 구현
53fc379 - 홍길동, 7 days ago : feat: Mobile landscape menu & AI chat consultation integration
92dc0c1 - 홍길동, 7 days ago : feat: Add Instagram and Threads social sharing support
f962037 - 홍길동, 7 days ago : feat: Complete AI chat page with comprehensive SEO optimization
d545213 - 홍길동, 7 days ago : feat: implement AI consulting floating chat system
259a77d - 홍길동, 7 days ago : fix: improve mobile hamburger menu visibility in dark mode
79698c4 - 홍길동, 7 days ago : fix: resolve services page build errors and complete SEO optimization
47e41b1 - 홍길동, 7 days ago : feat: Comprehensive SEO optimization for search engines ranking
```
