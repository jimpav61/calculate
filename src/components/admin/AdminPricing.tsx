import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const AdminPricing = () => {
  const [costPerMinute, setCostPerMinute] = useState(0.05);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLatestPrice();
  }, []);

  const fetchLatestPrice = async () => {
    console.log("Fetching global price...");
    const { data, error } = await supabase
      .from('client_pricing')
      .select('cost_per_minute')
      .eq('client_name', 'default')
      .eq('company_name', 'default')
      .eq('email', 'default@example.com')
      .single();

    if (error) {
      console.error('Error fetching global price:', error);
      return;
    }

    if (data) {
      console.log("Global price found:", data.cost_per_minute);
      setCostPerMinute(Number(data.cost_per_minute));
    } else {
      console.log("No global price found, using default value:", costPerMinute);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      console.log("Starting save operation for new global price:", costPerMinute);
      
      const { data, error } = await supabase
        .from('client_pricing')
        .upsert({
          client_name: 'default',
          company_name: 'default',
          email: 'default@example.com',
          cost_per_minute: costPerMinute,
          minutes: 0
        }, {
          onConflict: 'client_name,company_name,email'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving global price:', error);
        throw error;
      }
      
      console.log("Global price saved successfully:", data);
      await fetchLatestPrice();
    } catch (error) {
      console.error('Error in save operation:', error);
    } finally {
      setLoading(false);
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
            onChange={(e) => {
              console.log("Price input changed to:", e.target.value);
              setCostPerMinute(Number(e.target.value));
            }}
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