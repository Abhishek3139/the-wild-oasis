import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zypbhladhhcuqaimjufh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cGJobGFkaGhjdXFhaW1qdWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1MzMxMTQsImV4cCI6MjAxMDEwOTExNH0.RvSB87mQ_E3pR3jZUxBMd6P9JSlZ8SaBHQxPNrJB-BE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
