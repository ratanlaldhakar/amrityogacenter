const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://kxsovgiapzbpxahtkbuo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4c292Z2lhcHpicHhhaHRrYnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDAzMjcsImV4cCI6MjA5NTk3NjMyN30.cKlyTzjutLCrFsqflsMBVGZa1HtuygD_RqL3ctMorVM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkTables() {
  const tables = ['homepage', 'coach', 'timeline', 'services', 'gallery', 'reviews', 'gallery_categories', 'youtube_videos'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*');
    if (error) {
      console.log(`Table ${t}: Error:`, error.message);
    } else {
      console.log(`Table ${t}: Found ${data.length} rows`);
      if (data.length > 0) {
        console.log(JSON.stringify(data.slice(0, 2), null, 2));
      }
    }
  }
}

checkTables();
