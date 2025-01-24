import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { ReportPDF } from './ReportPDF';
import { useReportCalculations } from './ReportCalculations';
import { Download } from 'lucide-react';

interface PDFDownloadButtonProps {
  formData: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    minutes: number;
  };
}

export const PDFDownloadButton = ({ formData }: PDFDownloadButtonProps) => {
  const calculations = useReportCalculations({
    minutes: formData.minutes,
    costPerMinute: 0.05,
  });

  const reportData = {
    formData,
    calculations,
    date: new Date().toLocaleDateString(),
  };

  return (
    <PDFDownloadLink
      document={<ReportPDF data={reportData} />}
      fileName="voice-ai-analysis.pdf"
    >
      {({ loading }) => (
        <Button disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};