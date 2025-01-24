import { supabase } from "@/integrations/supabase/client";

const testConnection = async () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Testing Supabase Functions connection...`);
  
  try {
    console.log(`[${timestamp}] Attempting to invoke send-report function...`);
    const { data, error } = await supabase.functions.invoke('send-report', {
      body: { test: true },
      headers: {
        Authorization: `Bearer ${supabase.supabaseKey}`
      }
    });

    if (error) {
      console.error(`[${timestamp}] Connection Error:`, error);
      throw error;
    }

    console.log(`[${timestamp}] Connection successful! Response:`, data);
    return true;
  } catch (error: any) {
    console.error(`[${timestamp}] Connection failed:`, {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      stack: error.stack
    });
    return false;
  }
};

// Execute test immediately
testConnection();