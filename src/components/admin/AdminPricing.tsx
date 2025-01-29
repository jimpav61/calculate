import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePricing } from "@/hooks/usePricing";
import { updateGlobalPrice } from "@/utils/pricing";
import { useState } from "react";

export const AdminPricing = () => {
  const { 
    costPerMinute, 
    setCostPerMinute, 
    humanCostPerHour,
    setHumanCostPerHour,
    loading, 
    setLoading 
  } = usePricing();

  const [baseHourlyRate, setBaseHourlyRate] = useState("18");
  const [country, setCountry] = useState("us");

  const calculateTotalHourlyCost = (base: number, country: string) => {
    const rates = {
      us: [0.10, 0.18, 0.08, 0.09], // US rates for various costs
      canada: [0.14, 0.12, 0.10, 0.09], // Canadian rates
    };

    const selectedRates = rates[country as keyof typeof rates];
    const additionalCosts = selectedRates.reduce((total, rate) => {
      return total + (base * rate);
    }, 0);

    return base + additionalCosts;
  };

  const handleBaseRateChange = (value: string) => {
    setBaseHourlyRate(value);
    const baseRate = parseFloat(value) || 0;
    const totalCost = calculateTotalHourlyCost(baseRate, country);
    setHumanCostPerHour(totalCost);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    const baseRate = parseFloat(baseHourlyRate) || 0;
    const totalCost = calculateTotalHourlyCost(baseRate, value);
    setHumanCostPerHour(totalCost);
  };

  const handleSave = async () => {
    setLoading(true);
    console.log("AdminPricing: Starting save operation for new global price:", costPerMinute);
    console.log("AdminPricing: Starting save operation for new human cost per hour:", humanCostPerHour);
    const success = await updateGlobalPrice(costPerMinute, humanCostPerHour);
    setLoading(false);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Global Voice AI Pricing</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Set the base cost per minute for Essential Voice AI services and human operator cost per hour.
        </p>
      </div>

      <div className="space-y-4 max-w-md w-full">
        <div>
          <Label htmlFor="costPerMinute">Essential Cost per Minute ($)</Label>
          <Input
            id="costPerMinute"
            type="number"
            step="0.01"
            min="0"
            value={costPerMinute}
            onChange={(e) => {
              console.log("AdminPricing: Price input changed to:", e.target.value);
              setCostPerMinute(Number(e.target.value));
            }}
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-2">
            Premium Cost per Minute: ${(costPerMinute * 2).toFixed(2)}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Human Operator Cost Calculator</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="baseHourlyRate">Base Hourly Rate ($)</Label>
                <Input
                  id="baseHourlyRate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={baseHourlyRate}
                  onChange={(e) => handleBaseRateChange(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={handleCountryChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <Label>Total Human Cost Breakdown</Label>
            <div className="space-y-2 mt-2 text-sm">
              <p>Base Rate: ${baseHourlyRate}/hour</p>
              {country === "us" ? (
                <>
                  <p>Healthcare (10%): ${(parseFloat(baseHourlyRate) * 0.10).toFixed(2)}</p>
                  <p>Taxes & Insurance (18%): ${(parseFloat(baseHourlyRate) * 0.18).toFixed(2)}</p>
                  <p>Benefits (8%): ${(parseFloat(baseHourlyRate) * 0.08).toFixed(2)}</p>
                  <p>Other Costs (9%): ${(parseFloat(baseHourlyRate) * 0.09).toFixed(2)}</p>
                </>
              ) : (
                <>
                  <p>Healthcare (14%): ${(parseFloat(baseHourlyRate) * 0.14).toFixed(2)}</p>
                  <p>Taxes & Insurance (12%): ${(parseFloat(baseHourlyRate) * 0.12).toFixed(2)}</p>
                  <p>Benefits (10%): ${(parseFloat(baseHourlyRate) * 0.10).toFixed(2)}</p>
                  <p>Other Costs (9%): ${(parseFloat(baseHourlyRate) * 0.09).toFixed(2)}</p>
                </>
              )}
              <div className="border-t pt-2 mt-2">
                <p className="font-semibold">Total Cost per Hour: ${humanCostPerHour.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Saving..." : "Save Global Price"}
        </Button>
      </div>
    </div>
  );
};