
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !serviceKey || !anonKey) {
  console.error('Missing env vars');
  process.exit(1);
}

async function testKey(name: string, key: string) {
  console.log(`\nTesting ${name}... (Key: ${key.substring(0, 10)}...)`);
  const client = createClient(url!, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  
  try {
    // Try a simple select. If table 'consultations' is protected, anon might fail with 401 or return [] depending on policies.
    // Use 'users' or just check health? RLS might block 'consultations' for anon.
    // Let's try the same query but expect different results.
    const { count, error } = await client
      .from('consultations')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error(`[${name}] FAILED: ${error.message}`);
      console.error(`[${name}] Code: ${error.code} | Hint: ${error.hint}`);
    } else {
      console.log(`[${name}] SUCCESS! Count: ${count}`);
    }
  } catch (err: any) {
     console.error(`[${name}] EXCEPTION:`, err.message);
  }
}

async function run() {
  console.log('Testing connection to:', url);
  await testKey('ANON_KEY', anonKey);
  await testKey('SERVICE_ROLE_KEY', serviceKey!);
}

run();
