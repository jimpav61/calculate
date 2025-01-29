import { Document, Page } from '@react-pdf/renderer';
import { ReportHeader } from './pdf/ReportHeader';
import { CompanyInfoSection } from './pdf/CompanyInfoSection';
import { CostAnalysisSection } from './pdf/CostAnalysisSection';
import { CallHandlingSection } from './pdf/CallHandlingSection';
import { WaitTimeSection } from './pdf/WaitTimeSection';
import { AdditionalBenefitsSection } from './pdf/AdditionalBenefitsSection';
import { styles } from './pdf/pdfStyles';
import { useReportCalculations } from './ReportCalculations';

export interface ReportPDFProps {
  data: {
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

export const ReportPDF = ({ data }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <ReportHeader date={data.date} />
      
      <CompanyInfoSection
        name={data.formData.name}
        companyName={data.formData.companyName}
        email={data.formData.email}
        phone={data.formData.phone}
      />

      <CostAnalysisSection
        minutes={data.formData.minutes}
        calculations={data.calculations}
      />

      <WaitTimeSection />

      <CallHandlingSection
        callMetrics={data.calculations.callMetrics}
      />

      <AdditionalBenefitsSection />
    </Page>
  </Document>
);