#!/bin/bash

# FamilyOffice 프로덕션 배포 스크립트
# 사용법: ./scripts/deploy-production.sh

set -e  # 오류 발생 시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 배포 전 체크리스트
check_prerequisites() {
    log "배포 전 체크리스트 확인 중..."
    
    # Node.js 버전 확인
    if ! command -v node &> /dev/null; then
        error "Node.js가 설치되지 않았습니다."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="18.0.0"
    
    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        error "Node.js 버전이 $REQUIRED_VERSION 이상이어야 합니다. 현재 버전: $NODE_VERSION"
        exit 1
    fi
    
    success "Node.js 버전 확인 완료: $NODE_VERSION"
    
    # npm 버전 확인
    if ! command -v npm &> /dev/null; then
        error "npm이 설치되지 않았습니다."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    REQUIRED_NPM_VERSION="8.0.0"
    
    if [ "$(printf '%s\n' "$REQUIRED_NPM_VERSION" "$NPM_VERSION" | sort -V | head -n1)" != "$REQUIRED_NPM_VERSION" ]; then
        error "npm 버전이 $REQUIRED_NPM_VERSION 이상이어야 합니다. 현재 버전: $NPM_VERSION"
        exit 1
    fi
    
    success "npm 버전 확인 완료: $NPM_VERSION"
    
    # Vercel CLI 확인
    if ! command -v vercel &> /dev/null; then
        warn "Vercel CLI가 설치되지 않았습니다. 설치를 진행합니다..."
        npm install -g vercel
    fi
    
    success "Vercel CLI 확인 완료"
    
    # Git 상태 확인
    if [ -d ".git" ]; then
        if [ -n "$(git status --porcelain)" ]; then
            warn "커밋되지 않은 변경사항이 있습니다."
            read -p "계속 진행하시겠습니까? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                log "배포가 취소되었습니다."
                exit 1
            fi
        fi
        success "Git 상태 확인 완료"
    else
        warn "Git 저장소가 아닙니다."
    fi
}

# 의존성 설치
install_dependencies() {
    log "의존성 설치 중..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    success "의존성 설치 완료"
}

# 코드 품질 검사
run_quality_checks() {
    log "코드 품질 검사 중..."
    
    # 타입 체크
    log "TypeScript 타입 체크 중..."
    if ! npm run type-check; then
        error "타입 체크 실패"
        exit 1
    fi
    success "타입 체크 완료"
    
    # 린트 검사
    log "ESLint 검사 중..."
    if ! npm run lint; then
        warn "린트 오류가 발견되었습니다."
        read -p "계속 진행하시겠습니까? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log "배포가 취소되었습니다."
            exit 1
        fi
    else
        success "린트 검사 완료"
    fi
    
    # 테스트 실행
    log "테스트 실행 중..."
    if ! npm run test; then
        warn "테스트 실패"
        read -p "계속 진행하시겠습니까? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log "배포가 취소되었습니다."
            exit 1
        fi
    else
        success "테스트 완료"
    fi
}

# 프로덕션 빌드
build_production() {
    log "프로덕션 빌드 중..."
    
    # 이전 빌드 정리
    if [ -d ".next" ]; then
        rm -rf .next
    fi
    
    # 환경 변수 설정
    export NODE_ENV=production
    
    # 빌드 실행
    if ! npm run build; then
        error "빌드 실패"
        exit 1
    fi
    
    success "프로덕션 빌드 완료"
}

# 환경 변수 확인
check_environment_variables() {
    log "환경 변수 확인 중..."
    
    # 필수 환경 변수 목록
    REQUIRED_VARS=(
        "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
        "CLERK_SECRET_KEY"
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "SUPABASE_SERVICE_ROLE_KEY"
        "NEXT_PUBLIC_APP_URL"
    )
    
    MISSING_VARS=()
    
    for var in "${REQUIRED_VARS[@]}"; do
        if [ -z "${!var}" ]; then
            MISSING_VARS+=("$var")
        fi
    done
    
    if [ ${#MISSING_VARS[@]} -ne 0 ]; then
        error "다음 환경 변수가 설정되지 않았습니다:"
        for var in "${MISSING_VARS[@]}"; do
            echo "  - $var"
        done
        echo
        echo "Vercel 대시보드에서 환경 변수를 설정하거나 다음 명령어로 설정하세요:"
        echo "vercel env add $var"
        exit 1
    fi
    
    success "환경 변수 확인 완료"
}

# Vercel 배포
deploy_to_vercel() {
    log "Vercel에 배포 중..."
    
    # Vercel 로그인 확인
    if ! vercel whoami &> /dev/null; then
        error "Vercel에 로그인되지 않았습니다."
        log "다음 명령어로 로그인하세요: vercel login"
        exit 1
    fi
    
    # 프로덕션 배포
    if vercel --prod --yes; then
        success "Vercel 배포 완료"
    else
        error "Vercel 배포 실패"
        exit 1
    fi
}

# 배포 후 검증
verify_deployment() {
    log "배포 검증 중..."
    
    # 배포 URL 가져오기
    DEPLOYMENT_URL=$(vercel ls --prod | grep -o 'https://[^[:space:]]*' | head -1)
    
    if [ -z "$DEPLOYMENT_URL" ]; then
        warn "배포 URL을 가져올 수 없습니다."
        return
    fi
    
    log "배포 URL: $DEPLOYMENT_URL"
    
    # 기본 응답 확인
    if curl -f -s "$DEPLOYMENT_URL" > /dev/null; then
        success "배포 검증 완료"
    else
        warn "배포 검증 실패 - 수동으로 확인해주세요"
    fi
}

# 메인 함수
main() {
    echo "🚀 FamilyOffice 프로덕션 배포 시작"
    echo "=================================="
    
    check_prerequisites
    install_dependencies
    run_quality_checks
    check_environment_variables
    build_production
    deploy_to_vercel
    verify_deployment
    
    echo
    success "🎉 프로덕션 배포가 완료되었습니다!"
    echo
    echo "다음 단계:"
    echo "1. 배포된 사이트 방문하여 기능 테스트"
    echo "2. 성능 모니터링 설정"
    echo "3. 에러 추적 시스템 확인"
    echo "4. 백업 및 롤백 계획 수립"
}

# 스크립트 실행
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi 