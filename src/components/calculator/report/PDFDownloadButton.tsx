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
    website: string;
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
      fileName={`${formData.companyName.toLowerCase().replace(/\s+/g, '-')}-pricing-report.pdf`}
    >
      {({ loading }) => (
        <Button disabled={loading} className="w-full">
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