#!/usr/bin/env tsx
/**
 * Phase 2 Setup Status Checker
 *
 * This script checks if Phase 2 (BMAD Keyword Tracking System) is properly set up:
 * 1. Environment variables
 * 2. Supabase table existence
 * 3. Recent data collection
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

interface StatusCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

const results: StatusCheck[] = [];

function addResult(
  name: string,
  status: 'pass' | 'fail' | 'warning',
  message: string
) {
  results.push({ name, status, message });
}

function printResults() {
  console.log('\n================================');
  console.log('📊 Phase 2 Setup Status Report');
  console.log('================================\n');

  const passCount = results.filter(r => r.status === 'pass').length;
  const failCount = results.filter(r => r.status === 'fail').length;
  const warnCount = results.filter(r => r.status === 'warning').length;

  results.forEach(result => {
    const icon =
      result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
    console.log(`${icon} ${result.name}`);
    console.log(`   ${result.message}\n`);
  });

  console.log('================================');
  console.log(
    `Summary: ${passCount} passed, ${failCount} failed, ${warnCount} warnings`
  );
  console.log('================================\n');

  if (failCount === 0 && warnCount === 0) {
    console.log('🎉 Phase 2 is fully configured and operational!');
  } else if (failCount > 0) {
    console.log('❌ Phase 2 setup is INCOMPLETE. Please fix the failed items.');
  } else {
    console.log('⚠️  Phase 2 setup is mostly complete but has warnings.');
  }
}

async function main() {
  console.log('🔍 Checking Phase 2 setup status...\n');

  // 1. Check environment variables
  console.log('1️⃣  Checking Environment Variables...');

  // Supabase
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    addResult(
      'Supabase Configuration',
      'pass',
      'URL and Service Role Key are set'
    );
  } else {
    addResult(
      'Supabase Configuration',
      'fail',
      'Missing SUPABASE_URL or SERVICE_ROLE_KEY'
    );
  }

  // Serper API
  if (process.env.SERPER_API_KEY) {
    addResult('Serper API Key', 'pass', 'API key is configured');
  } else {
    addResult('Serper API Key', 'fail', 'SERPER_API_KEY is not set');
  }

  // Google Analytics
  const hasGoogleEmail = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const hasGoogleKey = !!process.env.GOOGLE_PRIVATE_KEY;
  const hasGoogleProjectId = !!process.env.GOOGLE_PROJECT_ID;
  const hasGooglePropertyId = !!process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  if (hasGoogleEmail && hasGoogleKey) {
    addResult(
      'Google Service Account',
      'pass',
      'Email and Private Key are set'
    );
  } else {
    addResult('Google Service Account', 'fail', 'Missing Google credentials');
  }

  if (hasGoogleProjectId) {
    addResult('Google Project ID', 'pass', 'Project ID is configured');
  } else {
    addResult(
      'Google Project ID',
      'warning',
      'GOOGLE_PROJECT_ID not set (may not be critical)'
    );
  }

  if (hasGooglePropertyId) {
    addResult(
      'Google Analytics Property ID',
      'pass',
      'GA4 Property ID is configured'
    );
  } else {
    addResult(
      'Google Analytics Property ID',
      'warning',
      'GOOGLE_ANALYTICS_PROPERTY_ID not set'
    );
  }

  // Cron Secret
  if (process.env.CRON_SECRET) {
    addResult('Cron Secret', 'pass', 'CRON_SECRET is configured');
  } else {
    addResult(
      'Cron Secret',
      'warning',
      'CRON_SECRET not set (needed for production cron jobs)'
    );
  }

  // 2. Check Supabase table
  console.log('\n2️⃣  Checking Supabase Tables...');

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Check if keyword_rankings table exists
      const { data: tableCheck, error: tableError } = await supabase
        .from('keyword_rankings')
        .select('id')
        .limit(1);

      if (tableError) {
        if (tableError.message.includes('does not exist')) {
          addResult(
            'keyword_rankings Table',
            'fail',
            'Table does not exist. Run migration SQL.'
          );
        } else {
          addResult(
            'keyword_rankings Table',
            'fail',
            `Error accessing table: ${tableError.message}`
          );
        }
      } else {
        addResult(
          'keyword_rankings Table',
          'pass',
          'Table exists and is accessible'
        );

        // Check for recent data
        const { data: recentData, error: dataError } = await supabase
          .from('keyword_rankings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (dataError) {
          addResult(
            'Recent Data Collection',
            'warning',
            `Cannot check data: ${dataError.message}`
          );
        } else if (recentData && recentData.length > 0) {
          const lastCollection = new Date(recentData[0].created_at);
          const hoursAgo = Math.floor(
            (Date.now() - lastCollection.getTime()) / (1000 * 60 * 60)
          );

          if (hoursAgo < 24) {
            addResult(
              'Recent Data Collection',
              'pass',
              `Last collection: ${hoursAgo} hours ago`
            );
          } else if (hoursAgo < 72) {
            addResult(
              'Recent Data Collection',
              'warning',
              `Last collection: ${hoursAgo} hours ago (>24h)`
            );
          } else {
            addResult(
              'Recent Data Collection',
              'warning',
              `Last collection: ${Math.floor(hoursAgo / 24)} days ago`
            );
          }

          // Count total records
          const { count } = await supabase
            .from('keyword_rankings')
            .select('*', { count: 'exact', head: true });

          if (count !== null) {
            addResult(
              'Total Records',
              'pass',
              `${count} keyword ranking records in database`
            );
          }
        } else {
          addResult(
            'Recent Data Collection',
            'warning',
            'No data collected yet. Run collection script.'
          );
        }

        // Check if views exist
        const { data: viewCheck } = await supabase
          .from('latest_keyword_rankings')
          .select('*')
          .limit(1);

        if (viewCheck !== null) {
          addResult(
            'Database Views',
            'pass',
            'latest_keyword_rankings view exists'
          );
        }
      }
    } catch (error) {
      addResult('Supabase Connection', 'fail', `Failed to connect: ${error}`);
    }
  }

  // 3. Check if collection scripts exist
  console.log('\n3️⃣  Checking Collection Scripts...');

  const fs = require('fs');
  const path = require('path');

  const scriptsToCheck = [
    'scripts/collect-serper-rankings.ts',
    'app/api/cron/daily-bmad-collection/route.ts',
  ];

  for (const scriptPath of scriptsToCheck) {
    const fullPath = path.join(process.cwd(), scriptPath);
    if (fs.existsSync(fullPath)) {
      addResult(scriptPath, 'pass', 'Script file exists');
    } else {
      addResult(scriptPath, 'fail', 'Script file not found');
    }
  }

  // Print final results
  printResults();
}

main().catch(error => {
  console.error('❌ Error running status check:', error);
  process.exit(1);
});
