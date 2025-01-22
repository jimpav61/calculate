import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Prospect } from "./types";
import { useReportCalculations } from "../calculator/report/ReportCalculations";
import { pdf } from "@react-pdf/renderer";
import { ReportPDF } from "../calculator/report/ReportPDF";

export const useProspects = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [newCostPerMinute, setNewCostPerMinute] = useState<number | ''>('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fetchProspects = async () => {
    try {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProspects(data || []);
    } catch (error: any) {
      toast.error("Failed to load prospects");
      console.error("Error fetching prospects:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSendReport = async (prospect: Prospect) => {
    if (!newCostPerMinute) {
      toast.error("Please enter a new cost per minute");
      return;
    }

    try {
      setSending(true);

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

      const { error } = await supabase.functions.invoke('send-report', {
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
        console.error("Error sending report:", error);
        throw error;
      }

      const { error: updateError } = await supabase
        .from('client_pricing')
        .update({ cost_per_minute: newCostPerMinute })
        .eq('id', prospect.id);

      if (updateError) throw updateError;

      toast.success("Report sent successfully");
      fetchProspects();
    } catch (error: any) {
      console.error("Detailed error:", error);
      toast.error("Failed to send report");
    } finally {
      setSending(false);
      setSelectedProspect(null);
      setNewCostPerMinute('');
      setShowPreview(false);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  return {
    prospects,
    loading,
    selectedProspect,
    newCostPerMinute,
    sending,
    showPreview,
    setSelectedProspect,
    setNewCostPerMinute,
    setShowPreview,
    handleSendReport,
  };
};