import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePricing } from "@/hooks/usePricing";
import { updateGlobalPrice } from "@/utils/pricing";

export const AdminPricing = () => {
  const { costPerMinute, setCostPerMinute, loading, setLoading } = usePricing();

  const handleSave = async () => {
    setLoading(true);
    console.log("AdminPricing: Starting save operation for new global price:", costPerMinute);
    const success = await updateGlobalPrice(costPerMinute);
    setLoading(false);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Global Voice AI Pricing</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Set the base cost per minute for Essential Voice AI services. Premium services will be charged at 2x this rate.
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