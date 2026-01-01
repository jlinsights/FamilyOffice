
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables');
    process.exit(1);
  }

  console.log(`Connecting to Supabase URL: ${supabaseUrl}`);
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Supabase connection failed:', JSON.stringify(error, null, 2));
      process.exit(1);
    }

    console.log('✅ Supabase connection successful!');
    console.log(`Current user count (or access check): ${data === null ? 'Accessible' : 'Count ' + data}`);
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

testConnection();
