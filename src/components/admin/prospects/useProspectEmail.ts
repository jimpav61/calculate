import { useReportCalculations } from "../../calculator/report/ReportCalculations";
import { pdf } from "@react-pdf/renderer";
import { ReportPDF } from "../../calculator/report/ReportPDF";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Prospect } from "../types";

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const useProspectEmail = () => {
  const sendReport = async (prospect: Prospect, newCostPerMinute: number) => {
    try {
      console.log("Starting report generation process...");
      console.log("Prospect details:", {
        name: prospect.client_name,
        company: prospect.company_name,
        email: prospect.email,
        minutes: prospect.minutes,
        newPrice: newCostPerMinute
      });
      
      const calculations = useReportCalculations({
        minutes: prospect.minutes,
        costPerMinute: newCostPerMinute,
      });

      console.log("Calculations completed:", calculations);

      const reportData = {
        formData: {
          name: prospect.client_name,
          companyName: prospect.company_name,
          email: prospect.email,
          phone: prospect.phone || '',
          website: '',
          minutes: prospect.minutes,
        },
        calculations,
        date: new Date().toLocaleDateString(),
      };

      console.log("Generating PDF...");
      const pdfDoc = pdf(ReportPDF({ data: reportData }));
      const asPdf = await pdfDoc.toBlob();
      const pdfBase64 = await blobToBase64(asPdf);
      console.log("PDF generated successfully");

      const sanitizedEmail = prospect.email.trim();
      if (!sanitizedEmail) {
        throw new Error("Invalid email address");
      }
      console.log("Sending report to:", sanitizedEmail);

      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          to: [sanitizedEmail],
          subject: 'Your Custom Voice AI Cost Analysis',
          html: `
            <p>Hello ${prospect.client_name},</p>
            <p>Thank you for your interest in our Voice AI solution. Please find attached your personalized cost analysis report with your individual pricing.</p>
            <p>If you have any questions about the pricing or would like to discuss further, please don't hesitate to reach out.</p>
            <p>Best regards,<br/>Your Voice AI Team</p>
          `,
          attachments: [{
            content: pdfBase64,
            filename: 'voice-ai-analysis.pdf',
          }],
        },
      });

      if (error) {
        console.error("Error from send-report function:", error);
        throw error;
      }

      console.log("Report sent successfully:", data);
      toast.success("Report sent successfully");
      return true;
    } catch (error: any) {
      console.error("Error in sendReport:", error);
      console.error("Detailed error:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      toast.error(`Failed to send report: ${error.message}`);
      return false;
    }
  };

  return { sendReport };
};