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
    <Card className="p-4 md:p-6 bg-white/80 border-brand/20">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-brand">Cost Comparison Analysis</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-sm text-brand">Monthly Minutes</p>
            <p className="text-xl md:text-2xl font-bold text-brand-dark">{minutes.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-brand">Human Operator Cost</p>
            <p className="text-xl md:text-2xl font-bold text-brand-dark">
              ${humanOperatorCost.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Essential Tier */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-brand/10 to-white border border-brand/20">
          <h4 className="text-lg font-semibold mb-2 text-brand">Essential Voice AI</h4>
          <p className="text-sm text-brand mb-3">Standard quality voices with good latency</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Monthly Cost</span>
              <span className="font-semibold text-brand-dark">${standardAICost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Monthly Savings</span>
              <span className="font-semibold text-brand">${standardSavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Savings Percentage</span>
              <span className="font-bold text-brand">{standardSavingsPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Premium Tier */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-brand-light/20 to-white border border-brand/20">
          <h4 className="text-lg font-semibold mb-2 text-brand">Premium Voice AI</h4>
          <p className="text-sm text-brand mb-3">Ultra-realistic voices with minimal latency</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Monthly Cost</span>
              <span className="font-semibold text-brand-dark">${premiumAICost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Monthly Savings</span>
              <span className="font-semibold text-brand">${premiumSavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Savings Percentage</span>
              <span className="font-bold text-brand">{premiumSavingsPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};