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
  console.log("Starting test email send...");
  try {
    const { data, error } = await supabase.functions.invoke('send-report', {
      body: {
        to: [testProspect.email],
        subject: 'Test Email - Voice AI Cost Analysis',
        html: `
          <p>Hello ${testProspect.client_name},</p>
          <p>This is a test email for the Voice AI cost analysis report.</p>
          <p>If you receive this email, please let us know!</p>
          <p>Best regards,<br/>Voice AI Team</p>
        `
      },
    });

    if (error) {
      console.error("Error sending test email:", error);
      throw error;
    }

    console.log("Test email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Error in sendTestEmail:", error);
    return false;
  }
};

// Execute the test
sendTestEmail();