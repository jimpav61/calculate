import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./ReportPDF";
import { Download } from "lucide-react";
import { useReportCalculations } from "./ReportCalculations";

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
      fileName={`${reportData.formData.companyName.toLowerCase().replace(/\s+/g, '-')}-pricing-report.pdf`}
    >
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? (
            "Generating PDF..."
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF Report
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
};