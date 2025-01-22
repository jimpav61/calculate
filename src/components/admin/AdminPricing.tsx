import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminPricing = () => {
  const [costPerMinute, setCostPerMinute] = useState(0.05);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('cost_per_minute')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching price:', error);
        toast.error("Failed to fetch current pricing");
        return;
      }

      if (data && data.length > 0) {
        setCostPerMinute(Number(data[0].cost_per_minute));
      }
    };

    fetchLatestPrice();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Insert a new pricing record
      const { error } = await supabase
        .from('client_pricing')
        .insert([
          { 
            cost_per_minute: costPerMinute,
            client_name: 'default',
            company_name: 'default',
            email: 'default@example.com',
            minutes: 0
          }
        ]);

      if (error) throw error;
      
      toast.success("Pricing updated successfully");
    } catch (error: any) {
      console.error('Error updating price:', error);
      toast.error("Failed to update pricing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Voice AI Pricing</h2>
        <p className="text-gray-600 mb-4">
          Adjust the cost per minute for Voice AI services. This will affect all future client submissions.
        </p>
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

        <Button 
          onClick={handleSave} 
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};