import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
  const humanOperatorCost = formData.minutes * 0.50; // Assuming $30/hour for human operator
  const savings = humanOperatorCost - aiCost;
  const savingsPercentage = ((savings / humanOperatorCost) * 100).toFixed(1);

  const currentDate = new Date().toLocaleDateString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detailed Cost Analysis Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Generated on {currentDate}</p>
            <h3 className="text-lg font-semibold">Company Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact Name</p>
                <p className="font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{formData.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{formData.phone}</p>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Comparison Analysis</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Monthly Minutes</p>
                  <p className="text-2xl font-bold">{formData.minutes.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Monthly Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${savings.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>AI Voice Service Cost</span>
                  <span className="font-semibold">${aiCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Human Operator Cost</span>
                  <span className="font-semibold">${humanOperatorCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cost Savings</span>
                    <span className="font-bold text-green-600">{savingsPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Benefits</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>24/7 Availability without overtime costs</li>
              <li>Consistent service quality</li>
              <li>Instant scalability</li>
              <li>No training or turnover costs</li>
              <li>Multi-language support capability</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button className="gap-2">
              <Download size={16} />
              Download PDF Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};