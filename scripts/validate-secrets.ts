#!/usr/bin/env tsx
/**
 * 1Password Family 기반 시크릿 유효성 검증 스크립트
 */
import { FamilySecretManager } from '../lib/secrets/family-manager';

async function validateSecrets() {
  console.log('🔍 FamilyOffice 시크릿 유효성 검증을 시작합니다...');
  console.log('');

  try {
    // 기본 연결 검증
    const validation = await FamilySecretManager.validateAllSecrets();

    // 결과 출력
    if (validation.isValid) {
      console.log('✅ 모든 시크릿이 유효합니다!');
    } else {
      console.log('❌ 시크릿 검증 실패:');
      validation.errors.forEach(error => {
        console.log(`   ❌ ${error}`);
      });
    }

    if (validation.warnings.length > 0) {
      console.log('');
      console.log('⚠️ 경고 사항:');
      validation.warnings.forEach(warning => {
        console.log(`   ⚠️ ${warning}`);
      });
    }

    // 상세 테스트
    console.log('');
    console.log('🧪 상세 테스트 진행 중...');

    await testSupabaseConnection();
    await testClerkConfiguration();
    await testEnvironmentVariables();

    console.log('');
    if (validation.isValid) {
      console.log('🎉 모든 검증을 통과했습니다!');
      console.log('');
      console.log('🚀 사용 가능한 명령어:');
      console.log('   npm run dev:1p       # 1Password 연동 개발 서버');
      console.log('   npm run build:1p     # 1Password 연동 빌드');
      console.log('   npm run secrets:sync # 시크릿 동기화');
    } else {
      console.log('🔧 문제를 해결한 후 다시 실행해주세요.');
      process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ 검증 중 오류 발생:', error.message);

    if (error.message.includes('not signed in')) {
      console.log('');
      console.log('💡 해결책:');
      console.log('   npm run 1password:login');
      console.log('   또는: op signin');
    } else if (error.message.includes('not found')) {
      console.log('');
      console.log('💡 해결책:');
      console.log('   npm run secrets:migrate');
      console.log('   또는: ./scripts/migrate-secrets.sh');
    }

    process.exit(1);
  }
}

async function testSupabaseConnection() {
  try {
    const serviceRoleKey = await FamilySecretManager.getSecret(
      'supabase.serviceRoleKey'
    );

    if (!serviceRoleKey.startsWith('eyJ')) {
      console.log('   ⚠️ Supabase Service Role Key: JWT 형식이 아닙니다');
      return;
    }

    // JWT 디코딩 테스트
    const jwtParts = serviceRoleKey.split('.');
    if (jwtParts.length < 2 || !jwtParts[1]) {
      console.log(
        '   ⚠️ Supabase Service Role Key: 유효하지 않은 JWT 형식입니다'
      );
      return;
    }
    const payload = JSON.parse(Buffer.from(jwtParts[1]!, 'base64').toString());

    if (payload.role !== 'service_role') {
      console.log(
        '   ⚠️ Supabase Service Role Key: 역할이 service_role이 아닙니다'
      );
      return;
    }

    console.log('   ✅ Supabase 설정 검증 통과');
  } catch (error: any) {
    console.log(`   ❌ Supabase 테스트 실패: ${error.message}`);
  }
}

async function testClerkConfiguration() {
  try {
    const secretKey = await FamilySecretManager.getSecret('clerk.secretKey');
    const webhookSecret = await FamilySecretManager.getSecret(
      'clerk.webhookSecret'
    );

    if (!secretKey.startsWith('sk_')) {
      console.log(
        '   ⚠️ Clerk Secret Key: 형식이 올바르지 않습니다 (sk_로 시작해야 함)'
      );
      return;
    }

    if (!webhookSecret.startsWith('whsec_')) {
      console.log(
        '   ⚠️ Clerk Webhook Secret: 형식이 올바르지 않습니다 (whsec_로 시작해야 함)'
      );
      return;
    }

    console.log('   ✅ Clerk 설정 검증 통과');
  } catch (error: any) {
    console.log(`   ❌ Clerk 테스트 실패: ${error.message}`);
  }
}

async function testEnvironmentVariables() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  let missingVars = 0;

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(`   ❌ 환경변수 누락: ${envVar}`);
      missingVars++;
    }
  }

  if (missingVars === 0) {
    console.log('   ✅ 환경변수 검증 통과');
  } else {
    console.log(`   ⚠️ ${missingVars}개의 환경변수가 누락되었습니다`);
    console.log(
      '   💡 npm run secrets:sync를 실행하여 .env.local을 생성하세요'
    );
  }
}

// 스크립트 실행
if (require.main === module) {
  validateSecrets().catch(console.error);
}

export { validateSecrets };
