import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useReportCalculations } from "../calculator/report/ReportCalculations";
import { ReportPDF } from "../calculator/report/ReportPDF";
import { pdf } from "@react-pdf/renderer";
import { PreviewReportDialog } from "./PreviewReportDialog";

interface Prospect {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  minutes: number;
  cost_per_minute: number;
  created_at: string;
}

export const AdminCRM = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [newCostPerMinute, setNewCostPerMinute] = useState<number | ''>('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchProspects();
  }, []);

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

  const handleSendReport = async (prospect: Prospect) => {
    if (!newCostPerMinute) {
      toast.error("Please enter a new cost per minute");
      return;
    }

    try {
      setSending(true);

      // Calculate updated values
      const calculations = useReportCalculations({
        minutes: prospect.minutes,
        costPerMinute: newCostPerMinute,
      });

      // Generate PDF
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

      const doc = <ReportPDF data={reportData} />;
      const asPdf = await pdf(doc).toBlob();
      const pdfBase64 = await blobToBase64(asPdf);

      // Send email with PDF
      const { error } = await supabase.functions.invoke('send-report', {
        body: {
          to: [prospect.email],
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

      if (error) throw error;

      // Update the cost_per_minute in the database
      const { error: updateError } = await supabase
        .from('client_pricing')
        .update({ cost_per_minute: newCostPerMinute })
        .eq('id', prospect.id);

      if (updateError) throw updateError;

      toast.success("Report sent successfully");
      fetchProspects(); // Refresh the list
    } catch (error: any) {
      toast.error("Failed to send report");
      console.error("Error sending report:", error);
    } finally {
      setSending(false);
      setSelectedProspect(null);
      setNewCostPerMinute('');
      setShowPreview(false);
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

  if (loading) {
    return <div className="flex items-center justify-center h-48">
      <p className="text-gray-500">Loading prospects...</p>
    </div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">CRM Dashboard</h2>
      
      {prospects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No prospects yet</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Minutes</TableHead>
                <TableHead className="text-right">Current Cost/Min</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prospects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>{prospect.client_name}</TableCell>
                  <TableCell>{prospect.company_name}</TableCell>
                  <TableCell className="font-mono">{prospect.email}</TableCell>
                  <TableCell>{prospect.phone || '-'}</TableCell>
                  <TableCell className="text-right">{prospect.minutes.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${prospect.cost_per_minute.toFixed(2)}</TableCell>
                  <TableCell>
                    {selectedProspect?.id === prospect.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="New cost/min"
                          value={newCostPerMinute}
                          onChange={(e) => setNewCostPerMinute(Number(e.target.value))}
                          className="w-24"
                        />
                        <Button 
                          onClick={() => setShowPreview(true)}
                          disabled={!newCostPerMinute}
                          size="sm"
                        >
                          Preview
                        </Button>
                        <Button 
                          onClick={() => handleSendReport(prospect)}
                          disabled={sending || !newCostPerMinute}
                          size="sm"
                        >
                          {sending ? "Sending..." : "Send"}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setSelectedProspect(null);
                            setNewCostPerMinute('');
                            setShowPreview(false);
                          }}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedProspect(prospect)}
                        size="sm"
                      >
                        Update & Send
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedProspect && showPreview && (
        <PreviewReportDialog
          open={showPreview}
          onOpenChange={setShowPreview}
          prospect={selectedProspect}
          newCostPerMinute={Number(newCostPerMinute)}
        />
      )}
    </div>
  );
};