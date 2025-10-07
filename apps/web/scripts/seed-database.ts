import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Read the seed SQL file
    const sqlPath = path.join(process.cwd(), '..', '..', 'supabase', 'migrations', '20251007_seed_data.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split by statements (on semicolons followed by newlines)
    const statements = sqlContent
      .split(';\n')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📜 Found ${statements.length} SQL statements to execute`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
        
        const { error } = await supabase.rpc('execute_sql', { 
          sql_query: statement + ';' 
        });

        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error);
          console.error(`📝 Statement was:`, statement.substring(0, 100) + '...');
        } else {
          console.log(`✅ Statement ${i + 1} completed successfully`);
        }
      }
    }

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
  }
}

// Run the seeding
seedDatabase();