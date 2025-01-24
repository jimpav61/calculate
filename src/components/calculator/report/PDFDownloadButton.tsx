import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReportPDF } from "./ReportPDF";

interface PDFDownloadButtonProps {
  reportData: {
    formData: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
      minutes: number;
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
      fileName="chatsites-cost-analysis.pdf"
    >
      {({ loading }) => (
        <Button
          disabled={loading}
          className="w-full gap-2 bg-brand hover:bg-brand-dark"
        >
          <Download className="w-4 h-4" />
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};