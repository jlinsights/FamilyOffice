#!/bin/bash

echo "🔐 FamilyOffice 1Password 설정을 시작합니다..."

# Family 계정 도메인이 아직 설정되지 않았으므로 먼저 로그인하겠습니다
echo "📝 1Password Family 계정에 로그인해주세요:"
echo "   op signin"
echo ""
echo "또는 계정을 추가하려면:"
echo "   op account add"
echo ""
echo "로그인이 완료되면 다음을 실행하세요:"
echo "   ./scripts/create-vaults.sh"

chmod +x "$0"