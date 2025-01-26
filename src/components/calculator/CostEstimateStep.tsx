import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CostEstimateStepProps {
  minutes: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  costPerMinute: number;
}

export const CostEstimateStep = ({
  minutes,
  onChange,
  costPerMinute,
}: CostEstimateStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Estimate Your Monthly Usage
        </h2>
        <p className="text-gray-600 mb-4">
          Please enter your estimated monthly call volume in minutes:
        </p>
        <Input
          type="number"
          name="minutes"
          value={minutes}
          onChange={onChange}
          min="0"
          placeholder="Enter minutes"
          className="w-full"
        />
      </div>
    </div>
  );
};