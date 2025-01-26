import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./ReportPDF";

interface PDFDownloadButtonProps {
  reportData: {
    formData: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
      minutes: number;
      website?: string;
    };
    calculations: {
      standardAICost: number;
      premiumAICost: number;
      humanOperatorCost: number;
      standardSavings: number;
      premiumSavings: number;
      standardSavingsPercentage: string;
      premiumSavingsPercentage: string;
      callMetrics: {
        humanCallsPerMonth: number;
        aiCallsPerMonth: number;
        aiSimultaneousCalls: number;
      };
    };
    date: string;
  };
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName={`pricing-report-${new Date().toISOString().split('T')[0]}.pdf`}
    >
      {({ loading }) => (
        <Button disabled={loading} className="gap-2">
          <Download className="h-4 w-4" />
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};