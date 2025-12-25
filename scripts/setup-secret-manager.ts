#!/usr/bin/env tsx
/**
 * 1Password Family 기반 시크릿 관리 설정 스크립트
 */
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { FamilySecretManager } from '../lib/secrets/family-manager';

async function setupSecretManager() {
  console.log('🔐 FamilyOffice Secret Manager 설정 중...');

  try {
    // 1Password 연결 및 시크릿 검증
    console.log('🔍 1Password 연결 및 시크릿 검증 중...');
    const validation = await FamilySecretManager.validateAllSecrets();

    if (!validation.isValid) {
      console.error('❌ 시크릿 검증 실패:');
      validation.errors.forEach(error => console.error(`   - ${error}`));
      process.exit(1);
    }

    if (validation.warnings.length > 0) {
      console.warn('⚠️ 경고 사항:');
      validation.warnings.forEach(warning => console.warn(`   - ${warning}`));
    }

    console.log('✅ 시크릿 검증 완료');

    // 개발 환경 파일 생성
    console.log('📝 개발 환경 파일 생성 중...');
    const envContent = await FamilySecretManager.generateDevelopmentEnv();

    const envPath = join(process.cwd(), '.env.local');
    await writeFile(envPath, envContent);

    console.log(`✅ .env.local 파일이 생성되었습니다: ${envPath}`);

    // 시크릿 테스트
    console.log('🧪 시크릿 연결 테스트 중...');
    await testSecrets();

    console.log('');
    console.log('🎉 Secret Manager 설정 완료!');
    console.log('');
    console.log('📖 사용 방법:');
    console.log(
      '   import { FamilySecretManager } from "./lib/secrets/family-manager";'
    );
    console.log(
      '   const secret = await FamilySecretManager.getSecret("database.password");'
    );
    console.log('');
    console.log('🚀 다음 단계:');
    console.log('   npm run dev:1p  # 1Password 연동 개발 서버 시작');
    console.log('   npm run secrets:validate  # 시크릿 유효성 검증');
  } catch (error: any) {
    console.error('❌ 설정 실패:', error.message);

    if (error.message.includes('not signed in')) {
      console.log('💡 해결책: op signin으로 1Password에 로그인하세요');
    } else if (error.message.includes('not found')) {
      console.log('💡 해결책: ./scripts/migrate-secrets.sh를 먼저 실행하세요');
    }

    process.exit(1);
  }
}

async function testSecrets() {
  const tests = [
    {
      name: 'Supabase Service Role Key',
      test: async () => {
        const key = await FamilySecretManager.getSecret(
          'supabase.serviceRoleKey'
        );
        return key.startsWith('eyJ') && key.length > 100;
      },
    },
    {
      name: 'Database Password',
      test: async () => {
        const password =
          await FamilySecretManager.getSecret('database.password');
        return password.length >= 12;
      },
    },
    {
      name: 'Clerk Secret Key',
      test: async () => {
        const key = await FamilySecretManager.getSecret('clerk.secretKey');
        return key.startsWith('sk_');
      },
    },
  ];

  for (const { name, test } of tests) {
    try {
      const result = await test();
      console.log(result ? `   ✅ ${name}` : `   ⚠️ ${name} (형식 확인 필요)`);
    } catch (error: any) {
      console.log(`   ❌ ${name}: ${error.message}`);
    }
  }
}

// 스크립트 실행
if (require.main === module) {
  setupSecretManager().catch(console.error);
}

export { setupSecretManager };
