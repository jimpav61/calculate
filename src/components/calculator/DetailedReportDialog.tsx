import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CompanyInformation } from "./report/CompanyInformation";
import { CostAnalysis } from "./report/CostAnalysis";
import { AdditionalBenefits } from "./report/AdditionalBenefits";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReportPDF } from "./report/ReportPDF";

interface DetailedReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    minutes: number;
  };
  costPerMinute: number;
}

export const DetailedReportDialog = ({
  open,
  onOpenChange,
  formData,
  costPerMinute,
}: DetailedReportDialogProps) => {
  // Standard tier calculations
  const standardAICost = formData.minutes * costPerMinute;
  
  // Premium tier calculations (10 cents per minute)
  const premiumCostPerMinute = 0.10;
  const premiumAICost = formData.minutes * premiumCostPerMinute;
  
  // Calculate human operator cost based on $16/hour
  const humanOperatorCost = (formData.minutes / 60) * 16;
  
  // Calculate savings for both tiers
  const standardSavings = humanOperatorCost - standardAICost;
  const premiumSavings = humanOperatorCost - premiumAICost;
  
  const standardSavingsPercentage = ((standardSavings / humanOperatorCost) * 100).toFixed(1);
  const premiumSavingsPercentage = ((premiumSavings / humanOperatorCost) * 100).toFixed(1);
  const currentDate = new Date().toLocaleDateString();

  const reportData = {
    formData,
    calculations: {
      standardAICost,
      premiumAICost,
      humanOperatorCost,
      standardSavings,
      premiumSavings,
      standardSavingsPercentage,
      premiumSavingsPercentage,
    },
    date: currentDate,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-brand-light/10 to-white">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-brand">
            Detailed Cost Analysis Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 py-4">
          <div className="flex justify-between items-start text-xs md:text-sm text-brand">
            <p>{currentDate}</p>
            <div className="text-right">
              <p>1715 N. Channing Mesa, AZ 85298</p>
              <p>+1 480 862 0288</p>
              <p>info@chatsites.ai</p>
            </div>
          </div>
          
          <CompanyInformation formData={formData} />

          <CostAnalysis
            minutes={formData.minutes}
            standardAICost={standardAICost}
            premiumAICost={premiumAICost}
            humanOperatorCost={humanOperatorCost}
            standardSavings={standardSavings}
            premiumSavings={premiumSavings}
            standardSavingsPercentage={standardSavingsPercentage}
            premiumSavingsPercentage={premiumSavingsPercentage}
          />

          <AdditionalBenefits />

          <div className="flex justify-end pt-4">
            <PDFDownloadLink
              document={<ReportPDF data={reportData} />}
              fileName="chatsites-cost-analysis.pdf"
            >
              {({ loading }) => (
                <Button 
                  className="gap-2 w-full md:w-auto bg-brand hover:bg-brand-dark"
                  disabled={loading}
                >
                  <Download size={16} />
                  {loading ? "Generating PDF..." : "Download PDF Report"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};