#!/usr/bin/env tsx
/**
 * Secret Validation Script
 * Validates that all required environment variables are present
 */
import * as fs from 'fs/promises';

const ENV_FILE = '.env.local';

// Required secrets by category
const REQUIRED_SECRETS = {
  'Core Authentication & Database': {
    required: [
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY',
      'CLERK_WEBHOOK_SECRET',
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
    ],
    optional: ['DATABASE_URL'],
  },
  'Analytics & Tracking': {
    required: ['NEXT_PUBLIC_GA_MEASUREMENT_ID', 'NEXT_PUBLIC_GTM_ID'],
    optional: ['NEXT_PUBLIC_KAKAO_PIXEL_ID'],
  },
  'Email & Communication': {
    required: ['RESEND_API_KEY', 'NEXT_PUBLIC_RESEND_FROM_EMAIL'],
    optional: ['BEEHIIV_API_KEY', 'BEEHIIV_PUBLICATION_ID'],
  },
  'Google APIs': {
    required: [],
    optional: [
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_PROJECT_ID',
      'GOOGLE_SEARCH_CONSOLE_PROPERTY',
      'GOOGLE_ANALYTICS_PROPERTY_ID',
    ],
  },
  'Korean APIs': {
    required: [],
    optional: [
      'NAVER_CLIENT_ID',
      'NAVER_CLIENT_SECRET',
      'NAVER_WEBMASTER_SITE_URL',
      'NAVER_BLOG_ID',
    ],
  },
  'AI & Machine Learning': {
    required: [],
    optional: ['OPENAI_API_KEY', 'SERPER_API_KEY'],
  },
  'Caching & Performance': {
    required: [],
    optional: ['REDIS_URL', 'REDIS_HOST', 'REDIS_PORT', 'REDIS_PASSWORD'],
  },
  'Financial APIs': {
    required: [],
    optional: ['ALPHA_VANTAGE_API_KEY', 'YAHOO_FINANCE_API_KEY'],
  },
  'Monitoring & Error Tracking': {
    required: [],
    optional: [
      'NEXT_PUBLIC_SENTRY_DSN',
      'SENTRY_DSN',
      'SENTRY_ORG',
      'SENTRY_PROJECT',
    ],
  },
  'Security & Webhooks': {
    required: [],
    optional: [
      'SEO_WEBHOOK_SECRET',
      'AUTOMATION_SECRET_KEY',
      'CRON_SECRET',
      'SLACK_SECURITY_WEBHOOK_URL',
    ],
  },
};

// Parse .env file
async function parseEnvFile(): Promise<Map<string, string>> {
  try {
    const content = await fs.readFile(ENV_FILE, 'utf-8');
    const env = new Map<string, string>();

    for (const line of content.split('\n')) {
      const trimmed = line.trim();

      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) continue;

      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();

      if (key && value) {
        env.set(key, value);
      }
    }

    return env;
  } catch (error) {
    console.error(`❌ ${ENV_FILE} 파일을 읽을 수 없습니다.`);
    process.exit(1);
  }
}

// Validate secrets
async function validateSecrets(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Secret Validation');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const env = await parseEnvFile();
  let hasErrors = false;
  let totalRequired = 0;
  let totalOptional = 0;
  let missingRequired = 0;
  let missingOptional = 0;

  for (const [category, secrets] of Object.entries(REQUIRED_SECRETS)) {
    console.log(`\n📦 ${category}:`);

    // Check required secrets
    for (const key of secrets.required) {
      totalRequired++;
      const value = env.get(key);

      if (!value || value === '') {
        console.log(`  ❌ ${key} (필수 - 누락됨)`);
        hasErrors = true;
        missingRequired++;
      } else {
        console.log(`  ✅ ${key}`);
      }
    }

    // Check optional secrets
    for (const key of secrets.optional) {
      totalOptional++;
      const value = env.get(key);

      if (!value || value === '') {
        console.log(`  ⚠️  ${key} (선택 - 누락됨)`);
        missingOptional++;
      } else {
        console.log(`  ✅ ${key}`);
      }
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Validation Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(
    `필수 환경 변수: ${totalRequired - missingRequired}/${totalRequired}`
  );
  console.log(
    `선택 환경 변수: ${totalOptional - missingOptional}/${totalOptional}`
  );

  if (hasErrors) {
    console.log('\n❌ 검증 실패: 필수 환경 변수가 누락되었습니다.');
    console.log('\n해결 방법:');
    console.log('  1. 1Password에 누락된 Secret 추가');
    console.log('  2. npm run secrets:sync 실행');
    process.exit(1);
  } else if (missingOptional > 0) {
    console.log('\n⚠️  검증 경고: 선택 환경 변수 일부가 누락되었습니다.');
    console.log('   일부 기능이 제한될 수 있습니다.');
    console.log('\n선택 사항:');
    console.log('  - 1Password에 선택 Secret 추가 (기능 활성화)');
    console.log('  - 현재 상태로 계속 (일부 기능 비활성화)');
  } else {
    console.log('\n✅ 검증 성공: 모든 환경 변수가 설정되었습니다!');
  }

  console.log('');
}

// Main execution
validateSecrets().catch(error => {
  console.error('❌ 에러 발생:', error.message);
  process.exit(1);
});
