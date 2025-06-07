import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ridgbwplpgurbmowxrlv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZGdid3BscGd1cmJtb3d4cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjA3NjUsImV4cCI6MjA2NDMzNjc2NX0.U93QBi5J9Cgp3R_6fP6a6DkgbNdXQzpgETa6x7aXxPQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

