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
}: CostAnalysisProps) => {
  // Calculate operational metrics
  const humanCallsPerMonth = Math.floor((minutes / 5) * 22); // Assuming 5 min avg call length, 22 working days
  const standardCallsPerMonth = Math.floor((minutes / 3) * 30); // Assuming 3 min avg call length, 30 days
  const premiumCallsPerMonth = Math.floor((minutes / 2) * 30); // Assuming 2 min avg call length, 30 days

  const humanCostPerCall = humanOperatorCost / humanCallsPerMonth;
  const standardCostPerCall = standardAICost / standardCallsPerMonth;
  const premiumCostPerCall = premiumAICost / premiumCallsPerMonth;

  return (
    <Card className="p-4 md:p-6 bg-white/80 border-brand/20">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-brand">Operational Performance Analysis</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-sm text-brand">Monthly Minutes</p>
            <p className="text-xl md:text-2xl font-bold text-brand-dark">{minutes.toLocaleString()}</p>
          </div>
        </div>

        {/* Human Operator Analysis */}
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Human Operator Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Cost</span>
              <span className="font-semibold text-gray-700">${humanOperatorCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Calls Handled/Month</span>
              <span className="font-semibold text-gray-700">{humanCallsPerMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cost per Call</span>
              <span className="font-semibold text-gray-700">${humanCostPerCall.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Availability</span>
              <span className="font-semibold text-gray-700">8 hours/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Response Time</span>
              <span className="font-semibold text-gray-700">2-5 minutes</span>
            </div>
          </div>
        </div>

        {/* Essential Voice AI */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-brand/10 to-white border border-brand/20">
          <h4 className="text-lg font-semibold mb-2 text-brand">Essential Voice AI</h4>
          <p className="text-sm text-brand mb-3">High-efficiency automated support</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Monthly Cost</span>
              <span className="font-semibold text-brand-dark">${standardAICost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Calls Handled/Month</span>
              <span className="font-semibold text-brand">{standardCallsPerMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Cost per Call</span>
              <span className="font-semibold text-brand">${standardCostPerCall.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Availability</span>
              <span className="font-semibold text-brand">24/7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Response Time</span>
              <span className="font-semibold text-brand">Instant</span>
            </div>
          </div>
        </div>

        {/* Premium Voice AI */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-brand-light/20 to-white border border-brand/20">
          <h4 className="text-lg font-semibold mb-2 text-brand">Premium Voice AI</h4>
          <p className="text-sm text-brand mb-3">Enterprise-grade automated support</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Monthly Cost</span>
              <span className="font-semibold text-brand-dark">${premiumAICost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Calls Handled/Month</span>
              <span className="font-semibold text-brand">{premiumCallsPerMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Cost per Call</span>
              <span className="font-semibold text-brand">${premiumCostPerCall.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Availability</span>
              <span className="font-semibold text-brand">24/7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Response Time</span>
              <span className="font-semibold text-brand">Sub-second</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-dark">Customer Satisfaction</span>
              <span className="font-semibold text-brand">98%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};