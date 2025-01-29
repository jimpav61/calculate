import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CostEstimateStepProps {
  formData: {
    minutes: number;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => void;
  costPerMinute: number;
}

export const CostEstimateStep = ({
  formData,
  onChange,
  costPerMinute,
}: CostEstimateStepProps) => {
  const handleCountryChange = (value: string) => {
    onChange({
      target: {
        name: "country",
        value: value,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label htmlFor="minutes">Monthly Call Volume (minutes)</Label>
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
        <p className="text-sm text-muted-foreground mt-1">
          Estimate your monthly call volume in minutes
        </p>
      </div>

      <div>
        <Label htmlFor="country">Country of Operation</Label>
        <Select 
          value={formData.country || 'us'} 
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          This helps us calculate accurate cost comparisons
        </p>
      </div>

      <div className="mt-4 p-4 bg-brand-light/10 rounded-lg">
        <h3 className="font-semibold mb-2">Estimated Monthly Cost</h3>
        <p className="text-2xl font-bold text-brand">
          ${(formData.minutes * costPerMinute).toFixed(2)}
        </p>
      </div>
    </div>
  );
};