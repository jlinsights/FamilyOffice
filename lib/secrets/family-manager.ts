/**
 * FamilySecretManager - 1Password Family 플랜을 위한 시크릿 관리 클래스
 * 
 * Family 플랜 제약사항:
 * - Service Accounts 사용 불가
 * - Connect Server 사용 불가
 * - 개인 Vault에 프로젝트별 아이템 저장
 * - CLI 기반 접근만 가능
 */

import { z } from 'zod';
import { execSync } from 'child_process';

// 시크릿 스키마 정의
const secretsSchema = z.object({
  database: z.object({
    url: z.string().url(),
    password: z.string().min(1),
    serviceRoleKey: z.string().min(1),
    jwtSecret: z.string().min(1),
  }),
  auth: z.object({
    clerkPublishableKey: z.string().startsWith('pk_'),
    clerkSecretKey: z.string().startsWith('sk_'),
    clerkWebhookSecret: z.string().startsWith('whsec_'),
  }),
  integrations: z.object({
    calcomApiKey: z.string().optional(),
    hubspotToken: z.string().optional(),
    resendApiKey: z.string().optional(),
    beehiivApiKey: z.string().optional(),
  }),
});

export type Secrets = z.infer<typeof secretsSchema>;

export interface SecretItem {
  title: string;
  username: string;
  passwordField?: string;
  description: string;
}

export class FamilySecretManager {
  private static cache = new Map<string, { value: string; expires: number }>();
  private static readonly CACHE_TTL = 5 * 60 * 1000; // 5분

  // 1Password 아이템 매핑 (Family 플랜에서 사용)
  private static readonly SECRET_MAPPING: Record<string, SecretItem> = {
    'supabase.serviceRoleKey': {
      title: 'FamilyOffice-Supabase-Production',
      username: 'service_role_key',
      description: 'Supabase Service Role Key'
    },
    'database.password': {
      title: 'FamilyOffice-Database-Production', 
      username: 'postgres.syyklnwynskwoxvcghkf',
      description: 'PostgreSQL Database Password'
    },
    'database.jwtSecret': {
      title: 'FamilyOffice-JWT-Production',
      username: 'jwt_secret', 
      description: 'Supabase JWT Secret'
    },
    'clerk.secretKey': {
      title: 'FamilyOffice-Clerk-Production',
      username: 'Secret Key',
      description: 'Clerk Secret Key'
    },
    'clerk.webhookSecret': {
      title: 'FamilyOffice-Clerk-Webhook-Production',
      username: 'Webhook Secret',
      description: 'Clerk Webhook Secret'
    },
    'clerk.publishableKey': {
      title: 'FamilyOffice-Clerk-PublishableKey-Production',
      username: 'Publishable Key',
      description: 'Clerk Publishable Key'
    },
  };

  /**
   * 단일 시크릿 조회 (캐시 포함)
   */
  static async getSecret(key: string): Promise<string> {
    // 캐시 확인
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }

    // 1Password에서 조회
    const value = await this.fetchFromOnePassword(key);
    
    // 캐시 저장
    this.cache.set(key, {
      value,
      expires: Date.now() + this.CACHE_TTL
    });

    return value;
  }

  /**
   * 모든 필수 시크릿 조회
   */
  static async getAllSecrets(): Promise<Secrets> {
    const [
      serviceRoleKey,
      databasePassword,
      jwtSecret,
      clerkSecretKey,
      clerkWebhookSecret,
      clerkPublishableKey
    ] = await Promise.all([
      this.getSecret('supabase.serviceRoleKey'),
      this.getSecret('database.password'),
      this.getSecret('database.jwtSecret'),
      this.getSecret('clerk.secretKey'),
      this.getSecret('clerk.webhookSecret'),
      this.getSecret('clerk.publishableKey')
    ]);

    const rawSecrets = {
      database: {
        url: `postgres://postgres.syyklnwynskwoxvcghkf:${databasePassword}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres`,
        password: databasePassword,
        serviceRoleKey,
        jwtSecret,
      },
      auth: {
        clerkPublishableKey,
        clerkSecretKey,
        clerkWebhookSecret,
      },
      integrations: {
        calcomApiKey: process.env.CALCOM_API_KEY,
        hubspotToken: process.env.HUBSPOT_ACCESS_TOKEN,
        resendApiKey: process.env.RESEND_API_KEY,
        beehiivApiKey: process.env.BEEHIIV_API_KEY,
      }
    };

    return secretsSchema.parse(rawSecrets);
  }

  /**
   * 1Password CLI를 통한 시크릿 조회
   */
  private static async fetchFromOnePassword(key: string): Promise<string> {
    const mapping = this.SECRET_MAPPING[key];
    if (!mapping) {
      throw new Error(`Unknown secret key: ${key}. Available keys: ${Object.keys(this.SECRET_MAPPING).join(', ')}`);
    }

    try {
      // 1Password CLI로 시크릿 조회 (password 필드 또는 커스텀 필드)
      let result;
      try {
        result = execSync(
          `op item get "${mapping.title}" --field password --reveal`,
          { 
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
          }
        ).trim();
      } catch {
        // password 필드가 없으면 커스텀 필드에서 조회
        result = execSync(
          `op item get "${mapping.title}" --field "${mapping.username}" --reveal`,
          { 
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
          }
        ).trim();
      }

      if (!result) {
        throw new Error(`Empty result for secret: ${key}`);
      }

      // 줄바꿈 문자와 여분의 공백 제거
      result = result.replace(/\\n/g, '').replace(/\n/g, '').trim();

      return result;
    } catch (error: any) {
      // 더 친화적인 에러 메시지
      if (error.message?.includes('item not found')) {
        throw new Error(
          `1Password item "${mapping.title}" not found. ` +
          `Please run migration script: ./scripts/migrate-secrets.sh`
        );
      }
      
      if (error.message?.includes('not signed in')) {
        throw new Error(
          `Not signed in to 1Password. Please run: op signin`
        );
      }

      throw new Error(`Failed to fetch ${key} from 1Password: ${error.message}`);
    }
  }

  /**
   * 시크릿 검증
   */
  static async validateAllSecrets(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // 1Password 연결 확인
      execSync('op account get', { stdio: 'pipe' });
    } catch {
      errors.push('1Password에 로그인되지 않았습니다. op signin을 실행하세요.');
      return { isValid: false, errors, warnings };
    }

    // 필수 시크릿 존재 확인
    for (const [key, mapping] of Object.entries(this.SECRET_MAPPING)) {
      try {
        const value = await this.getSecret(key);
        if (!value || value.length < 10) {
          warnings.push(`${key}: 시크릿이 너무 짧습니다 (${value.length}자)`);
        }
      } catch (error: any) {
        errors.push(`${key}: ${error.message}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * 캐시 클리어
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * 개발 환경용 로컬 시크릿 생성
   */
  static async generateDevelopmentEnv(): Promise<string> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Development environment generation is not allowed in production');
    }

    try {
      const secrets = await this.getAllSecrets();
      
      return `# Generated from 1Password Family - ${new Date().toISOString()}
# DO NOT EDIT MANUALLY - Run npm run secrets:sync to update

# Core Authentication & Database
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="${secrets.auth.clerkPublishableKey}"
CLERK_SECRET_KEY="${secrets.auth.clerkSecretKey}"
CLERK_WEBHOOK_SECRET="${secrets.auth.clerkWebhookSecret}"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://syyklnwynskwoxvcghkf.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5eWtsb nd5bnNrd294dmNnaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzUwNTgsImV4cCI6MjA2MjQ1M TA1OH0.6acPyt6MTN7rlvLUWBrt3gQGveZ8gRgsUxhSuncHwb4"
SUPABASE_SERVICE_ROLE_KEY="${secrets.database.serviceRoleKey}"

# Database Connection
DATABASE_URL="${secrets.database.url}"

# App Configuration
NEXT_PUBLIC_APP_URL="https://familyoffices.vip"

# Optional Integrations
${secrets.integrations.calcomApiKey ? `CALCOM_API_KEY="${secrets.integrations.calcomApiKey}"` : '# CALCOM_API_KEY=your_api_key_here'}
${secrets.integrations.hubspotToken ? `HUBSPOT_ACCESS_TOKEN="${secrets.integrations.hubspotToken}"` : '# HUBSPOT_ACCESS_TOKEN=your_token_here'}
${secrets.integrations.resendApiKey ? `RESEND_API_KEY="${secrets.integrations.resendApiKey}"` : '# RESEND_API_KEY=your_api_key_here'}
${secrets.integrations.beehiivApiKey ? `BEEHIIV_API_KEY="${secrets.integrations.beehiivApiKey}"` : '# BEEHIIV_API_KEY=your_api_key_here'}`;

    } catch (error) {
      throw new Error(`Failed to generate development environment: ${error.message}`);
    }
  }
}