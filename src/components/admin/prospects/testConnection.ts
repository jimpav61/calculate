import { supabase } from "@/integrations/supabase/client";

const testConnection = async () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Testing Edge Function connection...`);
  
  try {
    console.log(`[${timestamp}] Checking authentication session...`);
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error(`[${timestamp}] Session error:`, sessionError);
      return false;
    }
    
    if (!session) {
      console.error(`[${timestamp}] No active session found - user needs to be logged in`);
      return false;
    }

    console.log(`[${timestamp}] Session found:`, {
      user: session.user?.email,
      expires_at: session.expires_at
    });

    console.log(`[${timestamp}] Attempting to invoke send-report function...`);
    const { data, error } = await supabase.functions.invoke('send-report', {
      body: { test: true },
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });

    if (error) {
      console.error(`[${timestamp}] Connection Error:`, {
        message: error.message,
        name: error.name,
        cause: error.cause,
        details: error
      });
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

export default testConnection;