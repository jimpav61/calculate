import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

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

  const calculateHumanCost = (minutes: number, country: string, baseRate: number = 18) => {
    const rates = {
      us: [0.10, 0.18, 0.08, 0.09], // US rates for various costs
      canada: [0.14, 0.12, 0.10, 0.09], // Canadian rates
    };

    const selectedRates = rates[country as keyof typeof rates];
    const additionalCosts = selectedRates.reduce((total, rate) => {
      return total + (baseRate * rate);
    }, 0);

    const hourlyRate = baseRate + additionalCosts;
    return (minutes / 60) * hourlyRate;
  };

  const humanCost = calculateHumanCost(formData.minutes, formData.country);
  const aiCost = formData.minutes * costPerMinute;
  const savings = humanCost - aiCost;
  const savingsPercentage = ((savings / humanCost) * 100).toFixed(1);

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

      <div className="grid gap-4">
        <Card className="p-4 bg-brand-light/10">
          <h3 className="font-semibold mb-2">Voice AI Cost</h3>
          <p className="text-2xl font-bold text-brand">${aiCost.toFixed(2)}</p>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p>• Handles 50-100 simultaneous calls</p>
            <p>• 24/7 availability</p>
            <p>• No breaks or downtime</p>
          </div>
        </Card>

        <Card className="p-4 bg-gray-100">
          <h3 className="font-semibold mb-2">Human Operator Cost</h3>
          <p className="text-2xl font-bold text-gray-700">${humanCost.toFixed(2)}</p>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p>• One call at a time</p>
            <p>• Limited availability</p>
            <p>• Requires breaks and time off</p>
          </div>
        </Card>

        <Card className="p-4 bg-green-50">
          <h3 className="font-semibold mb-2 text-green-700">Your Savings</h3>
          <p className="text-2xl font-bold text-green-600">${savings.toFixed(2)}</p>
          <p className="text-sm text-green-600 mt-1">Save {savingsPercentage}% on operating costs</p>
        </Card>
      </div>
    </div>
  );
};