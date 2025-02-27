import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { ReportPDF } from './ReportPDF';
import { useReportCalculations } from './ReportCalculations';
import { Download } from "lucide-react";

interface PDFDownloadButtonProps {
  reportData: {
    formData: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
      website: string;
      minutes: number;
      country: string;
    };
    calculations: ReturnType<typeof useReportCalculations>;
    date: string;
  };
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName={`voice-ai-report-${reportData.formData.companyName.toLowerCase().replace(/\s+/g, '-')}.pdf`}
      className="w-full"
    >
      {({ loading, url }) => (
        <Button 
          disabled={loading} 
          className="bg-brand hover:bg-brand-dark"
          onClick={(e) => {
            if (url) {
              // For mobile devices, open in new tab
              window.open(url, '_blank');
              e.preventDefault();
            }
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? "Generating PDF..." : "Download Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};