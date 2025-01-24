import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { ReportPDF } from "./ReportPDF";
import { Download } from "lucide-react";

interface ReportData {
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
}

interface PDFDownloadButtonProps {
  reportData: ReportData;
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName="voice-ai-analysis.pdf"
    >
      {({ loading }) => (
        <Button disabled={loading}>
          <Download className="w-4 h-4 mr-2" />
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};