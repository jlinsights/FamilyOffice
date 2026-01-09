#!/bin/bash

# 1Password CLI Setup Script for FamilyOffice
# This script helps set up 1Password CLI and creates the necessary vault structure

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Check if 1Password CLI is installed
check_op_cli() {
    print_header "1Password CLI 설치 확인"

    if ! command -v op &> /dev/null; then
        print_error "1Password CLI가 설치되어 있지 않습니다."
        echo ""
        print_info "설치 방법:"
        echo "  macOS: brew install --cask 1password-cli"
        echo "  Linux: https://1password.com/downloads/command-line/"
        echo "  Windows: https://1password.com/downloads/command-line/"
        exit 1
    fi

    print_success "1Password CLI 설치 확인 완료"
    op --version
}

# Sign in to 1Password
signin_1password() {
    print_header "1Password 로그인"

    if op account list &> /dev/null; then
        print_success "이미 1Password에 로그인되어 있습니다."
        op account list
    else
        print_info "1Password에 로그인합니다..."
        eval $(op signin)
        print_success "로그인 성공!"
    fi
}

# Create or verify vault
setup_vault() {
    print_header "Vault 설정"

    VAULT_NAME="FamilyOffice"

    print_info "Vault 확인 중: $VAULT_NAME"

    if op vault get "$VAULT_NAME" &> /dev/null; then
        print_success "Vault '$VAULT_NAME'이(가) 이미 존재합니다."
    else
        print_warning "Vault '$VAULT_NAME'이(가) 존재하지 않습니다."
        read -p "새로 생성하시겠습니까? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            op vault create "$VAULT_NAME" --description "FamilyOffice 프로젝트 환경 변수"
            print_success "Vault '$VAULT_NAME' 생성 완료!"
        else
            print_error "Vault 생성이 취소되었습니다."
            exit 1
        fi
    fi
}

# Create secret categories
create_categories() {
    print_header "Secret 카테고리 생성"

    VAULT_NAME="FamilyOffice"

    # Category names (1Password uses items, not categories for secrets)
    CATEGORIES=(
        "Clerk-Auth"
        "Supabase-Database"
        "Google-APIs"
        "Naver-APIs"
        "OpenAI-API"
        "Redis-Cache"
        "Email-Resend"
        "Newsletter-Beehiiv"
        "Analytics-Tracking"
        "Financial-APIs"
        "Monitoring-Sentry"
        "Security-Webhooks"
    )

    print_info "다음 카테고리의 아이템이 생성됩니다:"
    for category in "${CATEGORIES[@]}"; do
        echo "  - $category"
    done

    echo ""
    read -p "계속하시겠습니까? (y/n): " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "카테고리 생성이 취소되었습니다."
        return
    fi

    for category in "${CATEGORIES[@]}"; do
        if op item get "$category" --vault="$VAULT_NAME" &> /dev/null; then
            print_info "아이템 '$category'은(는) 이미 존재합니다. 건너뜁니다."
        else
            # Create empty password item for each category
            op item create \
                --category=password \
                --title="$category" \
                --vault="$VAULT_NAME" \
                --tags="familyoffice,secrets" &> /dev/null
            print_success "아이템 '$category' 생성 완료"
        fi
    done

    echo ""
    print_success "모든 카테고리 아이템 생성 완료!"
}

# Guide for manual secret entry
guide_manual_entry() {
    print_header "Secret 수동 입력 가이드"

    cat << 'EOF'
다음 단계:

1. 1Password 앱 실행
2. 'FamilyOffice' Vault 선택
3. 각 카테고리 아이템을 열고 필드 추가:

   예시: Clerk-Auth 아이템
   ┌─────────────────────────────────────────┐
   │ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY       │
   │ CLERK_SECRET_KEY                        │
   │ CLERK_WEBHOOK_SECRET                    │
   └─────────────────────────────────────────┘

4. .env.local 파일의 값을 복사하여 각 필드에 입력

5. 또는 자동 마이그레이션 스크립트 사용:
   npm run secrets:migrate

자세한 가이드: 1PASSWORD_MIGRATION_GUIDE.md 참조
EOF
}

# Main execution
main() {
    print_header "🔐 1Password Setup for FamilyOffice"

    check_op_cli
    signin_1password
    setup_vault
    create_categories
    guide_manual_entry

    echo ""
    print_success "🎉 1Password 설정이 완료되었습니다!"
    echo ""
    print_info "다음 단계:"
    echo "  1. 1Password 앱에서 수동으로 Secret 입력, 또는"
    echo "  2. npm run secrets:migrate 실행 (자동 마이그레이션)"
    echo "  3. npm run secrets:validate 실행 (검증)"
    echo "  4. npm run dev:1p 실행 (1Password 연동 개발)"
    echo ""
}

# Run main function
main
