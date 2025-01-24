import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGlobalPricing } from "./pricing/useGlobalPricing";

export const AdminPricing = () => {
  const [costPerMinute, setCostPerMinute] = useState(0.05);
  const { loading, fetchGlobalPrice, updateGlobalPrice } = useGlobalPricing();

  useEffect(() => {
    const initializePrice = async () => {
      const price = await fetchGlobalPrice();
      if (price !== null) {
        setCostPerMinute(price);
      }
    };
    initializePrice();
  }, []);

  const handleSave = async () => {
    const success = await updateGlobalPrice(costPerMinute);
    if (success) {
      const updatedPrice = await fetchGlobalPrice();
      if (updatedPrice !== null) {
        setCostPerMinute(updatedPrice);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Global Voice AI Pricing</h2>
        <p className="text-gray-600 mb-4">
          Adjust the global cost per minute for Voice AI services. This will affect all future client submissions.
        </p>
      </div>

      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="costPerMinute">Global Cost per Minute ($)</Label>
          <Input
            id="costPerMinute"
            type="number"
            step="0.01"
            min="0"
            value={costPerMinute}
            onChange={(e) => setCostPerMinute(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <Button 
          onClick={handleSave} 
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Global Price"}
        </Button>
      </div>
    </div>
  );
};