import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./ReportPDF";
import { CalculatorData } from "../types";

interface PDFDownloadButtonProps {
  data: CalculatorData;
}

export const PDFDownloadButton = ({ data }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={data} />}
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