#!/bin/bash

set -e  # Exit on any error

echo "🔄 FamilyOffice 시크릿을 1Password로 마이그레이션합니다..."

# 1Password 로그인 확인
if ! op account get > /dev/null 2>&1; then
    echo "❌ 1Password에 로그인되지 않았습니다."
    echo "다음 명령어로 로그인하세요: op signin"
    exit 1
fi

echo "✅ 1Password 연결 확인됨"

# 백업 파일에서 시크릿 읽기
BACKUP_FILE=".env.production.backup"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ 백업 파일 $BACKUP_FILE을 찾을 수 없습니다."
    exit 1
fi

echo "📖 백업 파일에서 시크릿 읽는 중..."

# 함수: 환경변수에서 값 추출 (줄바꿈 문자 제거)
extract_value() {
    local key="$1"
    local file="$2"
    grep "^${key}=" "$file" | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//' | sed 's/\\n$//' | tr -d '\n'
}

# Production 시크릿들 추출
CLERK_SECRET=$(extract_value "CLERK_SECRET_KEY" "$BACKUP_FILE")
CLERK_WEBHOOK_SECRET=$(extract_value "CLERK_WEBHOOK_SECRET" "$BACKUP_FILE")
SUPABASE_SERVICE_ROLE_KEY=$(extract_value "SUPABASE_SERVICE_ROLE_KEY" "$BACKUP_FILE")
SUPABASE_JWT_SECRET=$(extract_value "NEXT_PUBLIC_SUPABASE_URL_SUPABASE_JWT_SECRET" "$BACKUP_FILE")
DATABASE_PASSWORD=$(extract_value "NEXT_PUBLIC_SUPABASE_URL_POSTGRES_PASSWORD" "$BACKUP_FILE")

echo "🔐 1Password에 프로덕션 시크릿 저장 중..."

# Supabase Production 저장
if [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    op item create --category=login \
        --title="FamilyOffice-Supabase-Production" \
        --url="https://syyklnwynskwoxvcghkf.supabase.co" \
        username="service_role_key" \
        password="$SUPABASE_SERVICE_ROLE_KEY" \
        notesPlain="Supabase Service Role Key for FamilyOffice production"
    echo "  ✅ Supabase Service Role Key 저장됨"
fi

# Database Password 저장
if [ -n "$DATABASE_PASSWORD" ]; then
    op item create --category=login \
        --title="FamilyOffice-Database-Production" \
        --url="postgres://postgres.syyklnwynskwoxvcghkf@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres" \
        username="postgres.syyklnwynskwoxvcghkf" \
        password="$DATABASE_PASSWORD" \
        notesPlain="PostgreSQL database password for FamilyOffice production"
    echo "  ✅ Database Password 저장됨"
fi

# Clerk Production 저장
if [ -n "$CLERK_SECRET" ]; then
    op item create --category=login \
        --title="FamilyOffice-Clerk-Production" \
        --url="https://clerk.com" \
        username="clerk_secret_key" \
        password="$CLERK_SECRET" \
        notesPlain="Clerk Secret Key for FamilyOffice production authentication"
    echo "  ✅ Clerk Secret Key 저장됨"
fi

# Clerk Webhook Secret 저장
if [ -n "$CLERK_WEBHOOK_SECRET" ]; then
    op item create --category=login \
        --title="FamilyOffice-Clerk-Webhook-Production" \
        --url="https://clerk.com" \
        username="webhook_secret" \
        password="$CLERK_WEBHOOK_SECRET" \
        notesPlain="Clerk Webhook Secret for FamilyOffice production user sync"
    echo "  ✅ Clerk Webhook Secret 저장됨"
fi

# JWT Secret 저장
if [ -n "$SUPABASE_JWT_SECRET" ]; then
    op item create --category=login \
        --title="FamilyOffice-JWT-Production" \
        --url="https://syyklnwynskwoxvcghkf.supabase.co" \
        username="jwt_secret" \
        password="$SUPABASE_JWT_SECRET" \
        notesPlain="JWT Secret for FamilyOffice production Supabase"
    echo "  ✅ JWT Secret 저장됨"
fi

echo ""
echo "✅ 시크릿 마이그레이션 완료!"
echo ""
echo "🔍 저장된 항목 확인:"
op item list --format=json | jq -r '.[] | select(.title | startswith("FamilyOffice")) | "  - " + .title'

echo ""
echo "🚀 다음 단계: ./scripts/setup-secret-manager.sh를 실행하세요"