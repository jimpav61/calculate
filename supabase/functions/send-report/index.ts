import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service configuration is missing");
    }

    const resend = new Resend(RESEND_API_KEY);
    const { to, subject, html, attachments } = await req.json();
    
    console.log("Attempting to send email to:", to);
    console.log("Email subject:", subject);

    const emailResponse = await resend.emails.send({
      from: "Voice AI <onboarding@resend.dev>",
      to,
      subject,
      html,
      attachments: attachments || [],
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Detailed error in send-report function:", {
      message: error.message,
      code: error.statusCode,
      name: error.name,
      response: error.response
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: `Failed to send email. Status: ${error.statusCode}. This might be because the email domain is not verified.`
      }),
      {
        status: error.statusCode || 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);