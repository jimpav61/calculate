import { supabase } from "@/integrations/supabase/client";

const testProspect = {
  id: "test-id",
  client_name: "Test Client",
  company_name: "Test Company",
  email: "jimmy.pavlatos@gmail.com",
  phone: "123-456-7890",
  minutes: 1000,
  cost_per_minute: 0.5,
  created_at: new Date().toISOString(),
};

const sendTestEmail = async () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Starting test email send...`);
  
  try {
    console.log(`[${timestamp}] Invoking send-report function...`);
    const { data, error } = await supabase.functions.invoke('send-report', {
      body: {
        to: [testProspect.email],
        subject: 'Test Email - Voice AI Cost Analysis',
        html: `
          <p>Hello ${testProspect.client_name},</p>
          <p>This is a test email sent at ${timestamp}</p>
          <p>If you receive this email, please let us know!</p>
          <p>Best regards,<br/>Voice AI Team</p>
        `
      },
    });

    if (error) {
      console.error(`[${timestamp}] Error from send-report function:`, error);
      throw error;
    }

    console.log(`[${timestamp}] Response from send-report function:`, data);
    return true;
  } catch (error: any) {
    console.error(`[${timestamp}] Error in sendTestEmail:`, {
      message: error.message,
      stack: error.stack
    });
    return false;
  }
};

// Execute test immediately
sendTestEmail();