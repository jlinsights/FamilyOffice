#!/bin/bash

set -e  # Exit on any error

echo "🔧 1Password 항목들을 올바른 형식으로 수정합니다..."

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
    grep "^${key}=" "$file" | cut -d'=' -f2- | sed 's/^\"//' | sed 's/\"$//' | sed 's/\\n$//' | tr -d '\n'
}

# Production 시크릿들 추출
CLERK_SECRET=$(extract_value "CLERK_SECRET_KEY" "$BACKUP_FILE")
CLERK_WEBHOOK_SECRET=$(extract_value "CLERK_WEBHOOK_SECRET" "$BACKUP_FILE")
CLERK_PUBLISHABLE_KEY=$(extract_value "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "$BACKUP_FILE")

echo "🗑️ 기존 Clerk 항목들 삭제 중..."

# 기존 Clerk 항목들 삭제
for title in "FamilyOffice-Clerk-Production" "FamilyOffice-Clerk-Webhook-Production" "FamilyOffice-Clerk-PublishableKey-Production"; do
    if op item get "$title" > /dev/null 2>&1; then
        op item delete "$title"
        echo "  🗑️ $title 삭제됨"
    fi
done

echo "🔐 새로운 Password 카테고리로 Clerk 시크릿 저장 중..."

# Clerk Secret Key를 Password 카테고리로 저장
if [ -n "$CLERK_SECRET" ]; then
    op item create --category=password \
        --title="FamilyOffice-Clerk-Production" \
        --url="https://clerk.com" \
        password="$CLERK_SECRET" \
        'notesPlain=Clerk Secret Key for FamilyOffice production authentication'
    echo "  ✅ Clerk Secret Key 저장됨 (Password 카테고리)"
fi

# Clerk Webhook Secret을 Password 카테고리로 저장
if [ -n "$CLERK_WEBHOOK_SECRET" ]; then
    op item create --category=password \
        --title="FamilyOffice-Clerk-Webhook-Production" \
        --url="https://clerk.com" \
        password="$CLERK_WEBHOOK_SECRET" \
        'notesPlain=Clerk Webhook Secret for FamilyOffice production user sync'
    echo "  ✅ Clerk Webhook Secret 저장됨 (Password 카테고리)"
fi

# Clerk Publishable Key를 Password 카테고리로 저장
if [ -n "$CLERK_PUBLISHABLE_KEY" ]; then
    op item create --category=password \
        --title="FamilyOffice-Clerk-PublishableKey-Production" \
        --url="https://clerk.com" \
        password="$CLERK_PUBLISHABLE_KEY" \
        'notesPlain=Clerk Publishable Key for FamilyOffice production frontend'
    echo "  ✅ Clerk Publishable Key 저장됨 (Password 카테고리)"
fi

echo ""
echo "✅ 1Password 항목 수정 완료!"
echo ""
echo "🔍 수정된 항목 확인:"
op item list --format=json | jq -r '.[] | select(.title | startswith("FamilyOffice")) | "  - " + .title'

echo ""
echo "🚀 다음 단계: npm run secrets:validate를 실행하세요"