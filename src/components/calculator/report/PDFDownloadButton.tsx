import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { ReportPDF } from './ReportPDF';
import { useReportCalculations } from './ReportCalculations';
import { Download } from 'lucide-react';

interface PDFDownloadButtonProps {
  reportData: {
    formData: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
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