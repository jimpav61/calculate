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
      // Use the new individual price for this prospect's report
      const calculations = useReportCalculations({
        minutes: prospect.minutes,
        costPerMinute: newCostPerMinute,
      });

      const reportData = {
        formData: {
          name: prospect.client_name,
          companyName: prospect.company_name,
          email: prospect.email,
          phone: prospect.phone || '',
          minutes: prospect.minutes,
        },
        calculations,
        date: new Date().toLocaleDateString(),
      };

      // Create PDF document
      const pdfDoc = pdf(ReportPDF({ data: reportData }));
      const asPdf = await pdfDoc.toBlob();
      const pdfBase64 = await blobToBase64(asPdf);

      // Sanitize email address by trimming whitespace
      const sanitizedEmail = prospect.email.trim();
      console.log("Sending report to email:", sanitizedEmail);

      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          to: [sanitizedEmail],
          subject: 'Updated Voice AI Cost Analysis',
          html: `
            <p>Hello ${prospect.client_name},</p>
            <p>Please find attached your updated Voice AI cost analysis report.</p>
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
      console.error("Detailed error:", error);
      toast.error("Failed to send report");
      return false;
    }
  };

  return { sendReport };
};