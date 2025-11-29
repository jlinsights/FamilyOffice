#!/bin/bash

set -e  # Exit on any error

echo "🔐 프로덕션 환경변수를 1Password에서 추출합니다..."

# 1Password 로그인 확인
if ! op account get > /dev/null 2>&1; then
    echo "❌ 1Password에 로그인되지 않았습니다."
    echo "다음 명령어로 로그인하세요: op signin"
    exit 1
fi

echo "✅ 1Password 연결 확인됨"
echo ""

# 환경변수 추출 함수
get_secret() {
    local title="$1"
    op item get "$title" --field password --reveal 2>/dev/null || echo ""
}

echo "📋 Vercel 프로덕션 환경변수 설정 가이드"
echo "다음 명령어들을 실행하여 Vercel에 환경변수를 설정하세요:"
echo ""

# Core Authentication & Database
CLERK_PUBLISHABLE_KEY=$(get_secret "FamilyOffice-Clerk-PublishableKey-Production")
CLERK_SECRET_KEY=$(get_secret "FamilyOffice-Clerk-Production")
CLERK_WEBHOOK_SECRET=$(get_secret "FamilyOffice-Clerk-Webhook-Production")
SUPABASE_SERVICE_ROLE_KEY=$(get_secret "FamilyOffice-Supabase-Production")
DATABASE_PASSWORD=$(get_secret "FamilyOffice-Database-Production")

echo "# Core Authentication & Database"
if [ -n "$CLERK_PUBLISHABLE_KEY" ]; then
    echo "npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production"
    echo "값: $CLERK_PUBLISHABLE_KEY"
    echo ""
fi

if [ -n "$CLERK_SECRET_KEY" ]; then
    echo "npx vercel env add CLERK_SECRET_KEY production"
    echo "값: $CLERK_SECRET_KEY"
    echo ""
fi

if [ -n "$CLERK_WEBHOOK_SECRET" ]; then
    echo "npx vercel env add CLERK_WEBHOOK_SECRET production"
    echo "값: $CLERK_WEBHOOK_SECRET"
    echo ""
fi

echo "npx vercel env add NEXT_PUBLIC_SUPABASE_URL production"
echo "값: https://syyklnwynskwoxvcghkf.supabase.co"
echo ""

echo "npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production"
echo "값: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5eWtsb nd5bnNrd294dmNnaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzUwNTgsImV4cCI6MjA2MjQ1M TA1OH0.6acPyt6MTN7rlvLUWBrt3gQGveZ8gRgsUxhSuncHwb4"
echo ""

if [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "npx vercel env add SUPABASE_SERVICE_ROLE_KEY production"
    echo "값: $SUPABASE_SERVICE_ROLE_KEY"
    echo ""
fi

if [ -n "$DATABASE_PASSWORD" ]; then
    echo "npx vercel env add DATABASE_URL production"
    echo "값: postgres://postgres.syyklnwynskwoxvcghkf:$DATABASE_PASSWORD@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"
    echo ""
fi

echo "npx vercel env add NEXT_PUBLIC_APP_URL production"
echo "값: https://familyoffices.vip"
echo ""

echo ""
echo "📝 추가 설정이 필요한 환경변수들:"
echo "npx vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production"
echo "값: [Google Analytics Measurement ID]"
echo ""
echo "npx vercel env add V0_API_KEY production"  
echo "값: [v0 AI API Key]"
echo ""

echo "🚀 모든 환경변수 설정 후 다음 명령어로 배포하세요:"
echo "npx vercel --prod"
echo ""