#!/usr/bin/env node

/**
 * Test script for newsletter cron job
 * Usage: node scripts/test-cron.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testCronEndpoint() {
  log('🚀 Testing Newsletter Cron Job Endpoint', 'blue');
  log('=' * 50, 'blue');

  try {
    // Check if development server is running
    log('📡 Testing local endpoint...', 'yellow');

    const testUrl = 'http://localhost:3000/api/cron/sync-newsletter';
    const testSecret = 'test-secret';

    // Use curl to test the endpoint
    const curlCommand = `curl -X GET "${testUrl}" \
      -H "Authorization: Bearer ${testSecret}" \
      -H "Content-Type: application/json" \
      -w "\\nHTTP Status: %{http_code}\\n" \
      -s`;

    log('📨 Making request to cron endpoint...', 'yellow');
    log(`URL: ${testUrl}`, 'blue');
    log(`Authorization: Bearer ${testSecret}`, 'blue');

    try {
      const response = execSync(curlCommand, {
        encoding: 'utf8',
        timeout: 10000,
      });

      log('✅ Cron endpoint responded:', 'green');
      console.log(response);
    } catch (error) {
      if (error.message.includes('ECONNREFUSED')) {
        log('❌ Development server not running!', 'red');
        log('💡 Please start the dev server first: npm run dev', 'yellow');
        return false;
      } else {
        log('⚠️  Request completed with issues:', 'yellow');
        console.log(error.stdout || error.message);
      }
    }

    // Test Beehiiv API configuration
    log('\n🔧 Checking Beehiiv API configuration...', 'yellow');

    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const hasBeehiivKey = envContent.includes('BEEHIIV_API_KEY=');
      const hasPublicationId = envContent.includes('BEEHIIV_PUBLICATION_ID=');
      const hasCronSecret = envContent.includes('CRON_SECRET=');

      log(
        `BEEHIIV_API_KEY: ${hasBeehiivKey ? '✅' : '❌'}`,
        hasBeehiivKey ? 'green' : 'red'
      );
      log(
        `BEEHIIV_PUBLICATION_ID: ${hasPublicationId ? '✅' : '❌'}`,
        hasPublicationId ? 'green' : 'red'
      );
      log(
        `CRON_SECRET: ${hasCronSecret ? '✅' : '❌'}`,
        hasCronSecret ? 'green' : 'red'
      );

      if (!hasBeehiivKey || !hasPublicationId) {
        log('\n💡 Beehiiv API will fall back to static data', 'yellow');
      }

      if (!hasCronSecret) {
        log('\n⚠️  Add CRON_SECRET to .env.local for authentication', 'yellow');
      }
    } else {
      log('❌ No .env.local file found', 'red');
      log('💡 Copy .env.example to .env.local and configure', 'yellow');
    }

    // Test newsletter data endpoint
    log('\n📰 Testing newsletter data endpoint...', 'yellow');

    const newsletterUrl = 'http://localhost:3000/api/newsletter/posts?limit=3';
    const newsletterCommand = `curl -X GET "${newsletterUrl}" -s`;

    try {
      const newsletterResponse = execSync(newsletterCommand, {
        encoding: 'utf8',
        timeout: 5000,
      });

      const data = JSON.parse(newsletterResponse);
      log(
        `✅ Newsletter endpoint working: ${data.posts?.length || 0} posts`,
        'green'
      );
      log(`Data source: ${data.source || 'unknown'}`, 'blue');
    } catch (error) {
      if (error.message.includes('ECONNREFUSED')) {
        log('❌ Development server not running for newsletter test!', 'red');
      } else {
        log('⚠️  Newsletter endpoint test failed:', 'yellow');
        console.log(error.message);
      }
    }

    log('\n✅ Cron job test completed!', 'green');
    log('\n📋 Next steps:', 'blue');
    log(
      '1. Ensure CRON_SECRET is set in Vercel environment variables',
      'yellow'
    );
    log('2. Deploy to Vercel to test in production', 'yellow');
    log('3. Check Vercel Functions logs for cron execution', 'yellow');
    log(
      '4. Verify cron runs at scheduled times (7:30 AM KST Mon/Fri)',
      'yellow'
    );

    return true;
  } catch (error) {
    log(`❌ Test failed: ${error.message}`, 'red');
    return false;
  }
}

// Run the test
testCronEndpoint();
