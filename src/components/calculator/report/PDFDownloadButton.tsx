import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./ReportPDF";
import React from "react";

interface PDFDownloadButtonProps {
  reportData: any;
}

export const PDFDownloadButton = ({ reportData }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName={`voice-ai-report-${new Date().toISOString().split('T')[0]}.pdf`}
    >
      {({ loading }) => (
        <Button
          className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto"
          disabled={loading}
        >
          <Download className="w-4 h-4" />
          <span className="whitespace-nowrap">
            {loading ? "Generating PDF..." : "Download Report"}
          </span>
        </Button>
      )}
    </PDFDownloadLink>
  );
};