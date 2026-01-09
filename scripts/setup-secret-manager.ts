#!/usr/bin/env tsx

/**
 * 1Password Secret Manager Setup Script
 * Syncs environment variables from 1Password to .env.local for development
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execAsync = promisify(exec);

const VAULT_NAME = 'FamilyOffice';
const ENV_FILE = '.env.local';

// Secret categories and their corresponding 1Password items
const SECRET_CATEGORIES = {
  'Clerk-Auth': [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'CLERK_WEBHOOK_SECRET',
    'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
    'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
    'NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL',
    'NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL',
  ],
  'Supabase-Database': [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'DATABASE_URL',
  ],
  'Google-APIs': [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_SEARCH_CONSOLE_PROPERTY',
    'GOOGLE_ANALYTICS_PROPERTY_ID',
  ],
  'Naver-APIs': [
    'NAVER_CLIENT_ID',
    'NAVER_CLIENT_SECRET',
    'NAVER_WEBMASTER_SITE_URL',
    'NAVER_BLOG_ID',
  ],
  'OpenAI-API': ['OPENAI_API_KEY', 'SERPER_API_KEY'],
  'Redis-Cache': ['REDIS_URL', 'REDIS_HOST', 'REDIS_PORT', 'REDIS_PASSWORD'],
  'Email-Resend': ['RESEND_API_KEY', 'NEXT_PUBLIC_RESEND_FROM_EMAIL'],
  'Newsletter-Beehiiv': ['BEEHIIV_API_KEY', 'BEEHIIV_PUBLICATION_ID'],
  'Analytics-Tracking': [
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'NEXT_PUBLIC_GTM_ID',
    'NEXT_PUBLIC_GA_ID',
    'NEXT_PUBLIC_KAKAO_PIXEL_ID',
  ],
  'Financial-APIs': ['ALPHA_VANTAGE_API_KEY', 'YAHOO_FINANCE_API_KEY'],
  'Monitoring-Sentry': [
    'NEXT_PUBLIC_SENTRY_DSN',
    'SENTRY_DSN',
    'SENTRY_ORG',
    'SENTRY_PROJECT',
  ],
  'Security-Webhooks': [
    'SEO_WEBHOOK_SECRET',
    'AUTOMATION_SECRET_KEY',
    'CRON_SECRET',
    'SLACK_SECURITY_WEBHOOK_URL',
  ],
};

// Check if 1Password CLI is available
async function check1PasswordCLI(): Promise<boolean> {
  try {
    await execAsync('op --version');
    return true;
  } catch {
    console.error('❌ 1Password CLI가 설치되어 있지 않습니다.');
    console.log('');
    console.log('설치 방법:');
    console.log('  macOS: brew install --cask 1password-cli');
    console.log('  기타: https://1password.com/downloads/command-line/');
    return false;
  }
}

// Check if signed in to 1Password
async function checkSignedIn(): Promise<boolean> {
  try {
    await execAsync('op account list');
    return true;
  } catch {
    console.error('❌ 1Password에 로그인되어 있지 않습니다.');
    console.log('');
    console.log('로그인 방법:');
    console.log('  npm run 1password:login');
    return false;
  }
}

// Get secret from 1Password
async function getSecret(
  itemName: string,
  fieldName: string
): Promise<string | null> {
  try {
    const { stdout } = await execAsync(
      `op item get "${itemName}" --vault="${VAULT_NAME}" --fields "${fieldName}"`
    );
    return stdout.trim();
  } catch {
    return null;
  }
}

// Sync secrets from 1Password to .env.local
async function syncSecrets(): Promise<void> {
  console.log('🔐 1Password에서 환경 변수 동기화 중...\n');

  const envLines: string[] = [];
  let syncedCount = 0;
  let missingCount = 0;

  for (const [itemName, fields] of Object.entries(SECRET_CATEGORIES)) {
    console.log(`📦 ${itemName}:`);

    for (const fieldName of fields) {
      const value = await getSecret(itemName, fieldName);

      if (value) {
        envLines.push(`${fieldName}=${value}`);
        console.log(`  ✅ ${fieldName}`);
        syncedCount++;
      } else {
        console.log(`  ⚠️  ${fieldName} (누락됨)`);
        envLines.push(`# ${fieldName}=`);
        missingCount++;
      }
    }

    envLines.push(''); // Add blank line between categories
  }

  // Add static configuration
  envLines.push('# App Configuration');
  envLines.push('NEXT_PUBLIC_APP_URL=https://familyoffices.vip');
  envLines.push('');
  envLines.push('# Development Flags');
  envLines.push('SKIP_ENV_VALIDATION=false');
  envLines.push('SKIP_RATE_LIMIT=true');
  envLines.push('');
  envLines.push('# SEO Feature Flags');
  envLines.push('FEATURE_ADVANCED_SEO=false');
  envLines.push('FEATURE_AI_KEYWORDS=false');
  envLines.push('FEATURE_SEO_DASHBOARD=false');
  envLines.push('FEATURE_CONTENT_OPT=false');
  envLines.push('FEATURE_CROSS_DOMAIN=false');
  envLines.push('FEATURE_STRUCTURED_DATA=true');
  envLines.push('');

  // Write to .env.local
  const envContent = envLines.join('\n');
  await fs.writeFile(ENV_FILE, envContent, 'utf-8');

  console.log('');
  console.log('✅ 동기화 완료!');
  console.log(`   동기화된 변수: ${syncedCount}`);
  console.log(`   누락된 변수: ${missingCount}`);

  if (missingCount > 0) {
    console.log('');
    console.log('⚠️  일부 변수가 누락되었습니다.');
    console.log('   1Password에서 해당 항목을 확인하세요.');
  }
}

// Main execution
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  1Password Secret Sync');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Pre-flight checks
  if (!(await check1PasswordCLI())) {
    process.exit(1);
  }

  if (!(await checkSignedIn())) {
    process.exit(1);
  }

  // Sync secrets
  await syncSecrets();

  console.log('');
  console.log('다음 단계:');
  console.log('  npm run dev         (개발 서버 시작)');
  console.log('  npm run secrets:validate (검증)');
  console.log('');
}

main().catch((error) => {
  console.error('❌ 에러 발생:', error.message);
  process.exit(1);
});
