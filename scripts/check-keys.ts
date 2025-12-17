
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
