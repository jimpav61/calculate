import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{
    content: string;
    filename: string;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting email send process...");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service configuration is missing");
    }

    const emailRequest: EmailRequest = await req.json();
    console.log("Received email request for recipients:", emailRequest.to);

    const requestBody = {
      from: "Voice AI <onboarding@resend.dev>",
      to: emailRequest.to,
      subject: emailRequest.subject,
      html: emailRequest.html,
      attachments: emailRequest.attachments || []
    };

    console.log("Sending request to Resend API...");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await res.json();
    console.log("Resend API response:", responseData);
    console.log("Resend API response status:", res.status);

    if (!res.ok) {
      console.error("Resend API error response:", responseData);
      return new Response(JSON.stringify({ error: responseData }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Email sent successfully");
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-report function:", error);
    console.error("Full error details:", {
      message: error.message,
      stack: error.stack,
    });
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);