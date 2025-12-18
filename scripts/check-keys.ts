
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('Loading .env.local...');
  dotenv.config({ path: envPath });
} else {
  console.error('.env.local file not found!');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('------------------------------------------------');
console.log('Supabase Configuration Check');
console.log('------------------------------------------------');
console.log(`NEXT_PUBLIC_SUPABASE_URL:      ${url ? 'Exists' : 'MISSING'} (${url})`);
console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anon ? 'Exists' : 'MISSING'}`);
if (anon) {
  console.log(`  Length: ${anon.length}`);
  console.log(`  Prefix: ${anon.substring(0, 10)}...`);
}

console.log(`SUPABASE_SERVICE_ROLE_KEY:     ${service ? 'Exists' : 'MISSING'}`);
if (service) {
  console.log(`  Length: ${service.length}`);
  console.log(`  Prefix: ${service.substring(0, 10)}...`);
  if (service === anon) {
    console.error('  WARNING: Service Role Key is IDENTICAL to Anon Key! This is likely wrong.');
  }
}
console.log('------------------------------------------------');
console.log('Integrations Configuration Check');
console.log('------------------------------------------------');
const googleEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const googleKey = process.env.GOOGLE_PRIVATE_KEY;
const serperKey = process.env.SERPER_API_KEY;

console.log(`GOOGLE_SERVICE_ACCOUNT_EMAIL:  ${googleEmail ? 'Exists' : 'MISSING'}`);
console.log(`GOOGLE_PRIVATE_KEY:            ${googleKey ? 'Exists' : 'MISSING'}`);
console.log(`SERPER_API_KEY:                ${serperKey ? 'Exists' : 'MISSING'}`);
console.log('------------------------------------------------');

if (googleEmail && googleKey) {
  console.log('Attempting Google Search Console Connection...');
  // Check private key format
  if (googleKey.includes('\\n')) {
     console.log('Private key contains literal \\n characters (expected for .env)');
  }
  
  try {
     const { GoogleSearchConsoleAPI } = await import('../lib/google/search-console');
     const api = new GoogleSearchConsoleAPI();
     const endDate = new Date().toISOString().split('T')[0];
     // Try fetching data for yesterday
     const startDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
     

     if(startDate && endDate) {
        console.log(`Fetching data from ${startDate} to ${endDate}...`);
        const data = await api.getKeywordRankings(startDate, endDate, ['query']);
        console.log('✅ Connection Successful!');
        console.log(`Term Count: ${data.queries.length}`);
        if (data.queries.length > 0 && data.queries[0]) {
             console.log(`Top Query: ${data.queries[0].query} (${data.queries[0].clicks} clicks)`);
        }
     }
  } catch (error: any) {
     console.error('❌ Connection Failed:', error.message);
     if (error.message.includes('User does not have sufficient permissions')) {
       console.error('  -> Did you add the service account email to Search Console Users?');
       console.error(`  -> Email: ${googleEmail}`);
     }
  }
}

