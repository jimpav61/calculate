import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyInformation } from "../calculator/report/CompanyInformation";
import { CostAnalysis } from "../calculator/report/CostAnalysis";
import { AdditionalBenefits } from "../calculator/report/AdditionalBenefits";
import { useReportCalculations } from "../calculator/report/ReportCalculations";
import { PDFDownloadButton } from "../calculator/report/PDFDownloadButton";

interface PreviewReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prospect: {
    client_name: string;
    company_name: string;
    email: string;
    phone: string | null;
    minutes: number;
    country?: string;
  };
  newCostPerMinute: number;
}

export const PreviewReportDialog = ({
  open,
  onOpenChange,
  prospect,
  newCostPerMinute,
}: PreviewReportDialogProps) => {
  const calculations = useReportCalculations({
    minutes: prospect.minutes,
    costPerMinute: newCostPerMinute,
    country: prospect.country || 'us',
  });

  const formData = {
    name: prospect.client_name,
    companyName: prospect.company_name,
    email: prospect.email,
    phone: prospect.phone || '',
    website: '',
    minutes: prospect.minutes,
    country: prospect.country || 'us',
  };

  const reportData = {
    formData,
    calculations,
    date: new Date().toLocaleDateString(),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:w-[90%] max-w-[600px] h-[90vh] overflow-y-auto bg-gradient-to-br from-brand-light/10 to-white p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl font-bold text-brand">
            Preview Updated Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4">
          <p className="text-sm text-brand">{new Date().toLocaleDateString()}</p>
          
          <div className="grid gap-4 sm:gap-6">
            <CompanyInformation formData={formData} />

            <CostAnalysis
              minutes={prospect.minutes}
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