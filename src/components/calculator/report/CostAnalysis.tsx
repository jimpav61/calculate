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
    <Card className="p-4 md:p-6 bg-white/80 border-[#D6BCFA]">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#1A1F2C]">Cost Comparison Analysis</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-sm text-[#7E69AB]">Monthly Minutes</p>
            <p className="text-xl md:text-2xl font-bold text-[#1A1F2C]">{minutes.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-[#7E69AB]">Total Monthly Savings</p>
            <p className="text-xl md:text-2xl font-bold text-[#6E59A5]">
              ${savings.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm md:text-base">
            <span className="text-[#1A1F2C]">AI Voice Service Cost</span>
            <span className="font-semibold text-[#1A1F2C]">${aiCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm md:text-base">
            <span className="text-[#1A1F2C]">Human Operator Cost</span>
            <span className="font-semibold text-[#1A1F2C]">${humanOperatorCost.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-[#D6BCFA]">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-medium text-[#1A1F2C]">Cost Savings</span>
              <span className="font-bold text-[#6E59A5]">{savingsPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};