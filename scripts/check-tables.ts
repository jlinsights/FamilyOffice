
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkTable() {
  console.log("Checking 'structure_check_requests' table...");
  const { data, error } = await supabase
    .from('structure_check_requests')
    .select('id')
    .limit(1);

  if (error) {
    console.error("Table check FAILED:", error.message);
    if (error.code === '42P01') {
      console.log("Reason: Table does not exist (undefined_table)");
    }
  } else {
    console.log("Table check SUCCESS! Table exists.");
  }
}

checkTable();
