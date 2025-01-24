import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface CostEstimateStepProps {
  formData: {
    minutes: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  costPerMinute: number;
}

export const CostEstimateStep = ({ formData, onChange, costPerMinute }: CostEstimateStepProps) => {
  // Essential cost is the base costPerMinute (0.05)
  const calculateMonthlyUsageCost = () => {
    return (formData.minutes * 0.05).toFixed(2);
  };

  // Premium cost is fixed at 0.10 per minute
  const calculatePremiumCost = () => {
    return (formData.minutes * 0.10).toFixed(2);
  };

  const calculatePotentialSavings = () => {
    const traditionalCost = formData.minutes * (0.05 * 1.2);
    return (traditionalCost - formData.minutes * 0.05).toFixed(2);
  };

  const calculateRecommendedCharge = () => {
    return (formData.minutes * 0.05 * 1.15).toFixed(2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="minutes">Estimated Monthly Minutes</Label>
        <Input
          id="minutes"
          name="minutes"
          type="number"
          min="0"
          step="100"
          placeholder="Enter minutes in increments of 100"
          value={formData.minutes || ''}
          onChange={onChange}
          className="mt-1"
          required
        />
        <p className="text-sm text-gray-500 italic mt-2">
          * Example: A human operator handling 12 calls/hour for 8 hours/day, 22 days/month, 
          with average call duration of 5 minutes = 10,560 minutes/month 
          (12 calls × 8 hours × 22 days × 5 minutes)
        </p>
      </div>

      <Card className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Breakdown</h3>
            <p className="text-sm text-gray-500">Based on $0.05 per minute (Essential) / $0.10 per minute (Premium)</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Essential Voice AI Cost:</span>
                <span className="font-semibold text-brand">${calculateMonthlyUsageCost()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Premium Voice AI Cost:</span>
                <span className="font-semibold text-brand">${calculatePremiumCost()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Potential Savings:</span>
              <span className="font-semibold text-green-600">${calculatePotentialSavings()}</span>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recommended Monthly Charge:</span>
                <span className="font-semibold text-xl text-brand">
                  ${calculateRecommendedCharge()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};