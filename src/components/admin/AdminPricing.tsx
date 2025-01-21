import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const AdminPricing = () => {
  const [costPerMinute, setCostPerMinute] = useState(0.05);

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast.success("Pricing updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Voice AI Pricing</h2>
        <p className="text-gray-600 mb-4">Adjust the cost per minute for Voice AI services.</p>
      </div>

      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="costPerMinute">Cost per Minute ($)</Label>
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

        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};