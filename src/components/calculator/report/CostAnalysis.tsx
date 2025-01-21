import { Card } from "@/components/ui/card";

interface CostAnalysisProps {
  minutes: number;
  aiCost: number;
  humanOperatorCost: number;
  savings: number;
  savingsPercentage: string;
}

export const CostAnalysis = ({
  minutes,
  aiCost,
  humanOperatorCost,
  savings,
  savingsPercentage,
}: CostAnalysisProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Cost Comparison Analysis</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Monthly Minutes</p>
            <p className="text-2xl font-bold">{minutes.toLocaleString()}</p>
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
  );
};