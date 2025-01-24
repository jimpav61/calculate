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
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      timeout: 20000 // Increase timeout to 20 seconds
    }
  }
);

// Add error handling for connection issues
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('User signed out - clearing session');
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in - session established');
  }
});