import { supabase } from "@/integrations/supabase/client";

const testConnection = async () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Testing Edge Function connection...`);
  
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error(`[${timestamp}] Session error:`, sessionError);
      return false;
    }
    
    if (!session) {
      console.error(`[${timestamp}] No active session found`);
      return false;
    }

    console.log(`[${timestamp}] Attempting to invoke send-report function...`);
    const { data, error } = await supabase.functions.invoke('send-report', {
      body: { test: true }
    });

    if (error) {
      console.error(`[${timestamp}] Connection Error:`, error);
      throw error;
    }

    console.log(`[${timestamp}] Connection successful! Response:`, data);
    return true;
  } catch (error: any) {
    console.error(`[${timestamp}] Connection failed:`, error);
    return false;
  }
};

// Execute test immediately
testConnection();

export default testConnection;