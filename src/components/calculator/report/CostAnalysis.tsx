import { Card } from "@/components/ui/card";

interface CostAnalysisProps {
  minutes: number;
  standardAICost: number;
  premiumAICost: number;
  humanOperatorCost: number;
  standardSavings: number;
  premiumSavings: number;
  standardSavingsPercentage: string;
  premiumSavingsPercentage: string;
}

export const CostAnalysis = ({
  minutes,
  standardAICost,
  premiumAICost,
  humanOperatorCost,
  standardSavings,
  premiumSavings,
  standardSavingsPercentage,
  premiumSavingsPercentage,
}: CostAnalysisProps) => {
  return (
    <Card className="p-4 md:p-6 bg-white/80 border-[#D6BCFA]">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#1A1F2C]">Cost Comparison Analysis</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-sm text-[#7E69AB]">Monthly Minutes</p>
            <p className="text-xl md:text-2xl font-bold text-[#1A1F2C]">{minutes.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-[#7E69AB]">Human Operator Cost</p>
            <p className="text-xl md:text-2xl font-bold text-[#1A1F2C]">
              ${humanOperatorCost.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Essential Tier */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#9b87f5]/10 to-white border border-[#D6BCFA]">
          <h4 className="text-lg font-semibold mb-2 text-[#1A1F2C]">Essential Voice AI</h4>
          <p className="text-sm text-[#7E69AB] mb-3">Standard quality voices with good latency</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#1A1F2C]">Monthly Cost</span>
              <span className="font-semibold text-[#1A1F2C]">${standardAICost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#1A1F2C]">Monthly Savings</span>
              <span className="font-semibold text-[#6E59A5]">${standardSavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#1A1F2C]">Savings Percentage</span>
              <span className="font-bold text-[#6E59A5]">{standardSavingsPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Premium Tier */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#6E59A5]/20 to-white border border-[#7E69AB]">
          <h4 className="text-lg font-semibold mb-2 text-[#1A1F2C]">Premium Voice AI</h4>
          <p className="text-sm text-[#7E69AB] mb-3">Ultra-realistic voices with minimal latency</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#1A1F2C]">Monthly Cost</span>
              <span className="font-semibold text-[#1A1F2C]">${premiumAICost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#1A1F2C]">Monthly Savings</span>
              <span className="font-semibold text-[#6E59A5]">${premiumSavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#1A1F2C]">Savings Percentage</span>
              <span className="font-bold text-[#6E59A5]">{premiumSavingsPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};