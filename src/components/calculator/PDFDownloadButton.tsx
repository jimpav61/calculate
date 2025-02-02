import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./report/ReportPDF";
import { Download } from "lucide-react";
import { useReportCalculations } from "./report/ReportCalculations";

interface PDFDownloadButtonProps {
  reportData: {
    formData: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
      website: string;
      minutes: number;
    };
    calculations: ReturnType<typeof useReportCalculations>;
    date: string;
  };
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName={`${reportData.formData.companyName || 'Company'}_Voice_AI_Report.pdf`}
      className="w-full"
    >
      {({ loading, url, error }) => (
        <Button 
          className="w-full bg-brand hover:bg-brand-dark text-white"
          disabled={loading}
          onClick={(e) => {
            if (url) {
              window.open(url, '_blank');
              e.preventDefault();
            }
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};