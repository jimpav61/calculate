import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/utils/pricing";

interface CostEstimateStepProps {
  minutes: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CostEstimateStep = ({
  minutes,
  onInputChange,
  onNext,
  onBack,
}: CostEstimateStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Estimate Your Monthly Call Volume
        </h2>
        <p className="text-gray-600">
          Please enter your estimated monthly call minutes to help us provide an accurate cost analysis.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">
            Monthly Call Minutes
          </label>
          <div className="mt-1">
            <Input
              type="number"
              name="minutes"
              id="minutes"
              value={minutes}
              onChange={onInputChange}
              min="0"
              className="block w-full"
              placeholder="Enter estimated monthly minutes"
            />
          </div>
          <p className="text-sm text-gray-500">
            This helps us calculate potential cost savings for your business.
          </p>
        </div>

        {minutes > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Minutes:</span>
                <span className="font-medium">{formatNumber(minutes)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={minutes <= 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};