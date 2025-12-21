#!/bin/bash

# Phase 3: Remaining TODO Updates Script

echo "🔄 Updating remaining TODO comments to GitHub Issue links..."

# lib/marketing-automation-engine.ts - Issues #7 and #8
sed -i '' 's|// TODO: Supabase에 로그 저장|// Supabase logging: https://github.com/jlinsights/FamilyOffice/issues/8|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 실제 cron 표현식 파싱 및 매칭|// Cron expression parsing: https://github.com/jlinsights/FamilyOffice/issues/8|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 실제 cron-parser 라이브러리 사용|// Cron parser library integration: https://github.com/jlinsights/FamilyOffice/issues/8|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 실제 알림 전송 (이메일, Slack, Discord 등)|// Notification integration (Email, Slack, Discord): https://github.com/jlinsights/FamilyOffice/issues/8|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: Supabase에 알림 저장|// Supabase notification storage: https://github.com/jlinsights/FamilyOffice/issues/8|g' lib/marketing-automation-engine.ts
sed -i '' 's|// TODO: 데이터베이스에서 규칙 로드|// Database rules loading: https://github.com/jlinsights/FamilyOffice/issues/8|g' lib/marketing-automation-engine.ts

# lib/lead-scoring-system.ts - Issue #6
sed -i '' 's|// TODO: Supabase에 저장|// Supabase storage: https://github.com/jlinsights/FamilyOffice/issues/6|g' lib/lead-scoring-system.ts
sed -i '' 's|// TODO: 외부 CRM API 연동 (HubSpot, Salesforce 등)|// CRM API integration (HubSpot, Salesforce): https://github.com/jlinsights/FamilyOffice/issues/6|g' lib/lead-scoring-system.ts

# lib/bmad-keyword-tracker.ts - Issues #6 and #9
sed -i '' 's|// TODO: 실제 GA4 API 연동|// GA4 API integration: https://github.com/jlinsights/FamilyOffice/issues/6|g' lib/bmad-keyword-tracker.ts
sed -i '' 's|// 트렌드 분석 (TODO: 이전 기간 데이터와 비교)|// Trend analysis: https://github.com/jlinsights/FamilyOffice/issues/9|g' lib/bmad-keyword-tracker.ts

# lib/api-error-handler.ts - Issue #7
sed -i '' 's|// TODO: Sentry, LogRocket 등 외부 서비스로 전송|// External error tracking (Sentry, LogRocket): https://github.com/jlinsights/FamilyOffice/issues/7|g' lib/api-error-handler.ts

# lib/monitoring.ts - Issue #7
sed -i '' 's|// TODO: Sentry, DataDog 연동|// Monitoring service integration (Sentry, DataDog): https://github.com/jlinsights/FamilyOffice/issues/7|g' lib/monitoring.ts

# components/seo-error-boundary.tsx - Issue #7
sed -i '' 's|// TODO: Integrate with error tracking service (Sentry, etc.)|// Error tracking service integration: https://github.com/jlinsights/FamilyOffice/issues/7|g' components/seo-error-boundary.tsx

# components/forms/consultation-form.tsx - Issue #6
sed -i '' 's|// TODO: 실제 환경에서는 Supabase에 저장|// Supabase integration: https://github.com/jlinsights/FamilyOffice/issues/6|g' components/forms/consultation-form.tsx

echo "✅ All TODO comments updated successfully!"
echo ""
echo "Verifying changes..."
echo "Remaining TODOs (should be 0 or only Issue links):"
grep -rn "TODO" lib components --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v "https://github.com" || echo "None found ✅"
