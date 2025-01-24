import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wlogbwxjteyycddkjvki.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsb2did3hqdGV5eWNkZGtqdmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NjMxNzUsImV4cCI6MjA1MzEzOTE3NX0.WFbZf1i8uryefHaauMbiWh7G8993fATpzIq-o9fnIrc";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);