import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyInformation } from "./report/CompanyInformation";
import { CostAnalysis } from "./report/CostAnalysis";
import { AdditionalBenefits } from "./report/AdditionalBenefits";
import { PDFDownloadButton } from "./report/PDFDownloadButton";
import { useReportCalculations } from "./report/ReportCalculations";

interface DetailedReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    website: string;
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
  const calculations = useReportCalculations({
    minutes: formData.minutes,
    costPerMinute,
  });
  
  const currentDate = new Date().toLocaleDateString();
  
  const reportData = {
    formData,
    calculations,
    date: currentDate,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:w-[90%] max-w-[600px] h-[90vh] overflow-y-auto bg-gradient-to-br from-brand-light/10 to-white p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-brand">
            Detailed Cost Analysis Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-sm text-brand">{currentDate}</p>
          
          <div className="grid gap-6">
            <CompanyInformation formData={formData} />

            <CostAnalysis
              minutes={formData.minutes}
              standardAICost={calculations.standardAICost}
              premiumAICost={calculations.premiumAICost}
              humanOperatorCost={calculations.humanOperatorCost}
              standardSavings={calculations.standardSavings}
              premiumSavings={calculations.premiumSavings}
              standardSavingsPercentage={calculations.standardSavingsPercentage}
              premiumSavingsPercentage={calculations.premiumSavingsPercentage}
            />

            <AdditionalBenefits
              humanCallsPerMonth={calculations.callMetrics.humanCallsPerMonth}
              aiCallsPerMonth={calculations.callMetrics.aiCallsPerMonth}
              aiSimultaneousCalls={calculations.callMetrics.aiSimultaneousCalls}
            />
          </div>

          <div className="flex justify-end pt-4">
            <PDFDownloadButton reportData={reportData} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};