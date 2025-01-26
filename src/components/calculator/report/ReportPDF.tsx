import { Document, Page } from '@react-pdf/renderer';
import { ReportHeader } from './pdf/ReportHeader';
import { CompanyInfoSection } from './pdf/CompanyInfoSection';
import { CostAnalysisSection } from './pdf/CostAnalysisSection';
import { CallHandlingSection } from './pdf/CallHandlingSection';
import { AdditionalBenefitsSection } from './pdf/AdditionalBenefitsSection';
import { styles } from './pdf/pdfStyles';

interface ReportPDFProps {
  data: {
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

      <CallHandlingSection
        callMetrics={data.calculations.callMetrics}
      />

      <AdditionalBenefitsSection />
    </Page>
  </Document>
);