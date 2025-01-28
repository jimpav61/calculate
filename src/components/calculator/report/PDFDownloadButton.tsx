import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./ReportPDF";
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
    };
    calculations: any;
    date: string;
  };
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName={`${reportData.formData.companyName.replace(/\s+/g, '_')}_voice_ai_report.pdf`}
      className="w-full sm:w-auto"
    >
      {({ loading }) => (
        <Button
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark"
          disabled={loading}
        >
          <Download className="h-4 w-4" />
          <span>{loading ? "Generating PDF..." : "Download PDF Report"}</span>
        </Button>
      )}
    </PDFDownloadLink>
  );
};