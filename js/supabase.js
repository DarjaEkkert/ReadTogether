const SUPABASE_URL = "https://eagoxqxrokoadzmgpjiv.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_7BoIVFwwUZtMBaewnlz10g_f5R6M4Oq";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Supabase verbunden");