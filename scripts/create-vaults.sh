#!/bin/bash

echo "🗂️ FamilyOffice Vault 구조를 생성합니다..."

# Vault 생성 (Family 플랜에서는 개인 Vault에 아이템을 저장)
echo "📁 개발 환경 Vault 구조 생성 중..."

# 개발 환경 시크릿 저장을 위한 아이템 카테고리 정의
echo "✅ 다음 Vault 구조를 사용합니다:"
echo "   - Development: 개발 환경 시크릿"
echo "   - Staging: 스테이징 환경 시크릿" 
echo "   - Production: 프로덕션 환경 시크릿"
echo ""
echo "Family 플랜에서는 개인 Vault를 사용하여 프로젝트별로 아이템을 구분합니다."
echo ""
echo "계속하려면 다음을 실행하세요:"
echo "   ./scripts/migrate-secrets.sh"