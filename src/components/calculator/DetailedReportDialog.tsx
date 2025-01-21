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
  // Calculate AI cost
  const aiCost = formData.minutes * costPerMinute;
  
  // Calculate human operator cost based on $16/hour
  // Convert minutes to hours and multiply by hourly rate
  const humanOperatorCost = (formData.minutes / 60) * 16;
  
  const savings = humanOperatorCost - aiCost;
  const savingsPercentage = ((savings / humanOperatorCost) * 100).toFixed(1);
  const currentDate = new Date().toLocaleDateString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#9b87f5]/10 to-white">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-[#1A1F2C]">
            Detailed Cost Analysis Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 py-4">
          <p className="text-xs md:text-sm text-[#7E69AB]">Generated on {currentDate}</p>
          
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
            <Button className="gap-2 w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB]">
              <Download size={16} />
              Download PDF Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};