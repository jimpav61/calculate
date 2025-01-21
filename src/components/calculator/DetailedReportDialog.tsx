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
  const aiCost = formData.minutes * costPerMinute;
  const humanOperatorCost = formData.minutes * 0.50;
  const savings = humanOperatorCost - aiCost;
  const savingsPercentage = ((savings / humanOperatorCost) * 100).toFixed(1);
  const currentDate = new Date().toLocaleDateString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold">
            Detailed Cost Analysis Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 py-4">
          <p className="text-xs md:text-sm text-gray-500">Generated on {currentDate}</p>
          
          <CompanyInformation formData={formData} />

          <CostAnalysis
            minutes={formData.minutes}
            aiCost={aiCost}
            humanOperatorCost={humanOperatorCost}
            savings={savings}
            savingsPercentage={savingsPercentage}
          />

          <AdditionalBenefits />

          <div className="flex justify-end pt-4">
            <Button className="gap-2 w-full md:w-auto">
              <Download size={16} />
              Download PDF Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};