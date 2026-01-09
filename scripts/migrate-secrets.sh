#!/bin/bash

# Migrate secrets from .env.local to 1Password
# This script automates the process of moving environment variables to 1Password

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

ENV_FILE=".env.local"
VAULT_NAME="FamilyOffice"

# Check if .env.local exists
if [ ! -f "$ENV_FILE" ]; then
    print_error "$ENV_FILE 파일이 존재하지 않습니다."
    exit 1
fi

# Check if 1Password CLI is available
if ! command -v op &> /dev/null; then
    print_error "1Password CLI가 설치되어 있지 않습니다."
    exit 1
fi

# Check if signed in
if ! op account list &> /dev/null; then
    print_error "1Password에 로그인되어 있지 않습니다."
    print_info "먼저 'npm run 1password:login'을 실행하세요."
    exit 1
fi

print_info "⚠️  경고: 이 스크립트는 .env.local의 모든 환경 변수를 1Password에 저장합니다."
print_warning "민감한 정보가 포함되어 있으므로 주의하세요!"
echo ""
read -p "계속하시겠습니까? (y/n): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "마이그레이션이 취소되었습니다."
    exit 0
fi

# Secret categorization
declare -A SECRET_CATEGORIES=(
    ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"]="Clerk-Auth"
    ["CLERK_SECRET_KEY"]="Clerk-Auth"
    ["CLERK_WEBHOOK_SECRET"]="Clerk-Auth"
    ["NEXT_PUBLIC_CLERK_SIGN_IN_URL"]="Clerk-Auth"
    ["NEXT_PUBLIC_CLERK_SIGN_UP_URL"]="Clerk-Auth"
    ["NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL"]="Clerk-Auth"
    ["NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL"]="Clerk-Auth"

    ["NEXT_PUBLIC_SUPABASE_URL"]="Supabase-Database"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="Supabase-Database"
    ["SUPABASE_SERVICE_ROLE_KEY"]="Supabase-Database"
    ["DATABASE_URL"]="Supabase-Database"

    ["GOOGLE_SERVICE_ACCOUNT_EMAIL"]="Google-APIs"
    ["GOOGLE_PRIVATE_KEY"]="Google-APIs"
    ["GOOGLE_PROJECT_ID"]="Google-APIs"
    ["GOOGLE_SEARCH_CONSOLE_PROPERTY"]="Google-APIs"
    ["GOOGLE_ANALYTICS_PROPERTY_ID"]="Google-APIs"

    ["NAVER_CLIENT_ID"]="Naver-APIs"
    ["NAVER_CLIENT_SECRET"]="Naver-APIs"
    ["NAVER_WEBMASTER_SITE_URL"]="Naver-APIs"
    ["NAVER_BLOG_ID"]="Naver-APIs"

    ["OPENAI_API_KEY"]="OpenAI-API"
    ["SERPER_API_KEY"]="OpenAI-API"

    ["REDIS_URL"]="Redis-Cache"
    ["REDIS_HOST"]="Redis-Cache"
    ["REDIS_PORT"]="Redis-Cache"
    ["REDIS_PASSWORD"]="Redis-Cache"

    ["RESEND_API_KEY"]="Email-Resend"
    ["NEXT_PUBLIC_RESEND_FROM_EMAIL"]="Email-Resend"

    ["BEEHIIV_API_KEY"]="Newsletter-Beehiiv"
    ["BEEHIIV_PUBLICATION_ID"]="Newsletter-Beehiiv"

    ["NEXT_PUBLIC_GA_MEASUREMENT_ID"]="Analytics-Tracking"
    ["NEXT_PUBLIC_GTM_ID"]="Analytics-Tracking"
    ["NEXT_PUBLIC_GA_ID"]="Analytics-Tracking"
    ["NEXT_PUBLIC_KAKAO_PIXEL_ID"]="Analytics-Tracking"

    ["ALPHA_VANTAGE_API_KEY"]="Financial-APIs"
    ["YAHOO_FINANCE_API_KEY"]="Financial-APIs"

    ["NEXT_PUBLIC_SENTRY_DSN"]="Monitoring-Sentry"
    ["SENTRY_DSN"]="Monitoring-Sentry"
    ["SENTRY_ORG"]="Monitoring-Sentry"
    ["SENTRY_PROJECT"]="Monitoring-Sentry"

    ["SEO_WEBHOOK_SECRET"]="Security-Webhooks"
    ["AUTOMATION_SECRET_KEY"]="Security-Webhooks"
    ["CRON_SECRET"]="Security-Webhooks"
    ["SLACK_SECURITY_WEBHOOK_URL"]="Security-Webhooks"
)

# Read .env.local and migrate to 1Password
MIGRATED_COUNT=0
SKIPPED_COUNT=0

print_info "환경 변수 마이그레이션 시작..."

while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue

    # Get category for this key
    CATEGORY="${SECRET_CATEGORIES[$key]}"

    if [ -z "$CATEGORY" ]; then
        print_warning "카테고리를 찾을 수 없음: $key → 건너뜀"
        ((SKIPPED_COUNT++))
        continue
    fi

    # Add field to 1Password item
    print_info "마이그레이션 중: $key → $CATEGORY"

    # Use op item edit to add/update field
    op item edit "$CATEGORY" \
        --vault="$VAULT_NAME" \
        "$key[password]=$value" &> /dev/null

    print_success "✓ $key"
    ((MIGRATED_COUNT++))

done < "$ENV_FILE"

echo ""
print_success "🎉 마이그레이션 완료!"
print_info "마이그레이션된 환경 변수: $MIGRATED_COUNT"
print_info "건너뛴 환경 변수: $SKIPPED_COUNT"

echo ""
print_info "다음 단계:"
echo "  1. npm run secrets:validate (검증)"
echo "  2. .env.local 파일 백업 및 삭제 (선택사항)"
echo "  3. npm run dev:1p (1Password 연동 개발)"
