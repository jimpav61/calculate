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
      toast.error("Failed to fetch current global pricing");
      return;
    }

    if (data) {
      console.log("Global price found:", data.cost_per_minute);
      setCostPerMinute(Number(data.cost_per_minute));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      console.log("Saving new global price:", costPerMinute);
      
      // First verify this is updating the default record
      const { data: existingRecord, error: checkError } = await supabase
        .from('client_pricing')
        .select('id')
        .eq('client_name', 'default')
        .eq('company_name', 'default')
        .eq('email', 'default@example.com')
        .single();

      if (checkError || !existingRecord) {
        console.error('Error checking global price record:', checkError);
        toast.error("Failed to verify global pricing record");
        return;
      }

      const { error } = await supabase
        .from('client_pricing')
        .update({ 
          cost_per_minute: costPerMinute,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id)
        .eq('client_name', 'default')
        .eq('company_name', 'default')
        .eq('email', 'default@example.com');

      if (error) throw error;
      
      toast.success("Global pricing updated successfully");
      await fetchLatestPrice();
    } catch (error: any) {
      console.error('Error updating global price:', error);
      toast.error("Failed to update global pricing");
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