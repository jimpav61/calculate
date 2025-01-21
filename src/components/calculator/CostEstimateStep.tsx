import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CostEstimateStepProps {
  formData: {
    minutes: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  costPerMinute: number;
}

export const CostEstimateStep = ({ formData, onChange, costPerMinute }: CostEstimateStepProps) => {
  const calculateTotal = () => {
    return (formData.minutes * costPerMinute).toFixed(2);
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

      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Estimated Monthly Cost</p>
          <p className="text-4xl font-bold text-brand">${calculateTotal()}</p>
          <p className="text-sm text-gray-500 mt-2">
            Based on ${costPerMinute} per minute
          </p>
        </div>
      </div>
    </div>
  );
};