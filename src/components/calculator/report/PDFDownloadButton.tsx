import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./ReportPDF";
import { Download } from "lucide-react";

interface PDFDownloadButtonProps {
  formData: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    minutes: number;
  };
  costPerMinute: number;
}

export const PDFDownloadButton = ({
  formData,
  costPerMinute,
}: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF formData={formData} costPerMinute={costPerMinute} />}
      fileName={`${formData.companyName || 'Company'}_Voice_AI_Report.pdf`}
      className="w-full"
    >
      {({ loading }) => (
        <Button 
          className="w-full bg-brand hover:bg-brand-dark text-white" 
          disabled={loading}
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};