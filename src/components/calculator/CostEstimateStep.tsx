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
  const calculateMonthlyUsageCost = () => {
    return (formData.minutes * costPerMinute).toFixed(2);
  };

  const calculatePremiumCost = () => {
    return (formData.minutes * (costPerMinute * 2)).toFixed(2);
  };

  const calculatePotentialSavings = () => {
    const traditionalCost = formData.minutes * (costPerMinute * 1.2);
    return (traditionalCost - formData.minutes * costPerMinute).toFixed(2);
  };

  const calculateRecommendedCharge = () => {
    return (formData.minutes * costPerMinute * 1.15).toFixed(2);
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
            <p className="text-sm text-gray-500">Based on ${costPerMinute.toFixed(2)} per minute (Essential) / ${(costPerMinute * 2).toFixed(2)} per minute (Premium)</p>
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
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Suggested Retail Price:</span>
                  <span className="font-semibold text-xl text-brand">
                    ${calculateRecommendedCharge()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 italic">
                  This is our suggested retail price which includes a 15% margin to help cover your operational costs while maintaining competitive pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};