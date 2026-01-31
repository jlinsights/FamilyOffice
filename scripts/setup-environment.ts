/**
 * Environment Variable Setup and Validation Script
 * Run this script to validate and setup environment variables
 */
import {
  validateEnvironmentStrict,
  validateServiceGroup,
} from '../lib/env-validation';

const setupEnvironment = async () => {
  console.log('🔍 Setting up FamilyOffice Environment...\n');

  // Validate base environment
  const isValid = validateEnvironmentStrict();
  if (!isValid) {
    console.error(
      '❌ Environment validation failed. Please check your environment variables.'
    );
    process.exit(1);
  }

  // Validate service groups
  const services = ['auth', 'database', 'analytics', 'financial'] as const;

  for (const service of services) {
    const result = validateServiceGroup(service);
    if (!result.success) {
      console.warn(`⚠️ ${service} service has warnings`);
    }
  }

  console.log('\n✅ Environment setup complete!');
  console.log('\n📋 Environment Status:');
  console.log(`- Node Environment: ${process.env.NODE_ENV}`);
  console.log(`- App URL: ${process.env.NEXT_PUBLIC_APP_URL || 'Not set'}`);
  console.log(
    `- Clerk Configured: ${!!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅' : '❌'}`
  );
  console.log(
    `- Supabase Configured: ${!!process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}`
  );
  console.log(
    `- Analytics Configured: ${!!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? '✅' : '❌'}`
  );

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '\n💡 Development Mode: Some environment variables are optional'
    );
  } else {
    console.log('\n🚀 Production Mode: All critical variables must be set');
  }
};

// Run if called directly
if (require.main === module) {
  setupEnvironment().catch(console.error);
}

export { setupEnvironment };
