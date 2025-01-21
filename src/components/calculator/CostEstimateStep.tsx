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

  const calculatePotentialSavings = () => {
    // Assuming 20% savings compared to traditional solutions
    const traditionalCost = formData.minutes * (costPerMinute * 1.2);
    return (traditionalCost - formData.minutes * costPerMinute).toFixed(2);
  };

  const calculateRecommendedCharge = () => {
    // Recommended charge includes a 15% margin for operational costs
    return (formData.minutes * costPerMinute * 1.15).toFixed(2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label htmlFor="minutes">Estimated Monthly Minutes</Label>
        <Input
          id="minutes"
          name="minutes"
          type="number"
          min="0"
          value={formData.minutes}
          onChange={onChange}
          className="mt-1"
          required
        />
      </div>

      <Card className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Breakdown</h3>
            <p className="text-sm text-gray-500">Based on ${costPerMinute} per minute</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Usage Cost:</span>
              <span className="font-semibold text-brand">${calculateMonthlyUsageCost()}</span>
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