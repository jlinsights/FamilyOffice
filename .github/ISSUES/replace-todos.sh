#!/bin/bash
# Script to replace TODO comments with GitHub Issue references
# Run this from the project root: bash .github/ISSUES/replace-todos.sh

echo "Replacing TODO comments with GitHub Issue references..."

# Issue #1: External Service Integrations
sed -i '' 's|// TODO: Supabase에 저장|// Database persistence: GitHub Issue #1|g' lib/lead-scoring-system.ts
sed -i '' 's|// TODO: 외부 CRM API 연동|// CRM integration: GitHub Issue #1|g' lib/lead-scoring-system.ts
sed -i '' 's|// TODO: 실제 GA4 API 연동|// GA4 integration: GitHub Issue #1|g' lib/bmad-keyword-tracker.ts
sed -i '' 's|// TODO: 실제 환경에서는 Supabase에 저장|// Database persistence: GitHub Issue #1|g' components/forms/consultation-form.tsx
sed -i '' 's|// TODO: SMTP 이메일 전송 구현|// SMTP integration: GitHub Issue #1|g' lib/security/security-monitor.ts
sed -i '' 's|// TODO: SMS API 호출|// SMS API integration: GitHub Issue #1|g' lib/security/security-monitor.ts

# Issue #2: Monitoring and Error Tracking
sed -i '' 's|// TODO: 외부 로깅 서비스|// External logging service: GitHub Issue #2|g' lib/financial/error-handler.ts
sed -i '' 's|// TODO: 실제 알림 서비스 연동|// Notification service: GitHub Issue #2|g' lib/financial/error-handler.ts
sed -i '' 's|// TODO: Integrate with error tracking service|// Error tracking service: GitHub Issue #2|g' components/seo-error-boundary.tsx

# Issue #3: Marketing Automation Enhancements  
sed -i '' 's|// TODO: Supabase에 로그 저장|// Database logging: GitHub Issue #3|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 실제 cron 표현식 파싱|// Cron parser implementation: GitHub Issue #3|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 실제 cron-parser 라이브러리 사용|// cron-parser library: GitHub Issue #3|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 실제 알림 전송|// Notification system: GitHub Issue #3|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: Supabase에 알림 저장|// Notification persistence: GitHub Issue #3|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 데이터베이스에서 규칙 로드|// Dynamic rules loading: GitHub Issue #3|g' lib/marketing-automation-engine.ts

# Issue #4: Analytics and Trending
sed -i '' 's|// 트렌드 분석 (TODO: 이전 기간 데이터와 비교)|// Trend analysis: GitHub Issue #4|g' lib/bmad-keyword-tracker.ts

echo "✅ Completed! All TODO comments have been replaced with GitHub Issue references."
echo ""
echo "Summary:"
echo "- Issue #1 (External Integrations): 6 TODOs replaced"
echo "- Issue #2 (Monitoring): 3 TODOs replaced" 
echo "- Issue #3 (Marketing Automation): 6 TODOs replaced"
echo "- Issue #4 (Analytics): 1 TODO replaced"
echo ""
echo "Total: 16 TODOs replaced"
