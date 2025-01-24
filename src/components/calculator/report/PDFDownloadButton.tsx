import { Download } from "lucide-react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReportPDF } from "./ReportPDF";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";

interface PDFDownloadButtonProps {
  reportData: {
    clientName: string;
    companyName: string;
    minutes: number;
    costPerMinute: number;
    totalCost: number;
    monthlyCost: number;
    yearlyCost: number;
    savingsPerYear: number;
  };
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName="chatsites-cost-analysis.pdf"
      className="w-full"
    >
      {({ loading }: { loading: boolean }): ReactElement => (
        loading ? (
          <Button disabled className="w-full gap-2 bg-brand hover:bg-brand-dark">
            <Download className="w-4 h-4" />
            Generating PDF...
          </Button>
        ) : (
          <Button className="w-full gap-2 bg-brand hover:bg-brand-dark">
            <Download className="w-4 h-4" />
            Download PDF Report
          </Button>
        )
      )}
    </PDFDownloadLink>
  );
};