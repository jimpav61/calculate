import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useGlobalPricing = () => {
  const [loading, setLoading] = useState(false);

  const fetchGlobalPrice = async () => {
    console.log("🌍 Fetching global price...");
    try {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('cost_per_minute')
        .eq('client_name', 'default')
        .eq('company_name', 'default')
        .eq('email', 'default@example.com')
        .maybeSingle();

      if (error) {
        console.error('❌ Error fetching global price:', error);
        toast.error("Failed to fetch current global pricing");
        return null;
      }

      if (!data) {
        console.log("⚠️ No global price record found, creating default...");
        // Create default record if it doesn't exist
        const { data: newData, error: createError } = await supabase
          .from('client_pricing')
          .insert([
            {
              client_name: 'default',
              company_name: 'default',
              email: 'default@example.com',
              cost_per_minute: 0.05,
              minutes: 0
            }
          ])
          .select('cost_per_minute')
          .single();

        if (createError) {
          console.error('❌ Error creating default price:', createError);
          toast.error("Failed to initialize global pricing");
          return null;
        }

        console.log("✅ Created default global price:", newData.cost_per_minute);
        return Number(newData.cost_per_minute);
      }

      console.log("✅ Global price found:", data.cost_per_minute);
      return Number(data.cost_per_minute);
    } catch (error) {
      console.error('❌ Unexpected error in fetchGlobalPrice:', error);
      toast.error("Failed to fetch current global pricing");
      return null;
    }
  };

  const updateGlobalPrice = async (newPrice: number) => {
    try {
      setLoading(true);
      console.log("🌍 Starting global price update. New price:", newPrice);
      
      // First verify we're updating the default record
      const { data: existingRecord, error: checkError } = await supabase
        .from('client_pricing')
        .select('*')
        .eq('client_name', 'default')
        .eq('company_name', 'default')
        .eq('email', 'default@example.com')
        .maybeSingle();

      if (checkError) {
        console.error('❌ Error checking global price record:', checkError);
        toast.error("Failed to verify global pricing record");
        return false;
      }

      if (!existingRecord) {
        console.log("⚠️ No global price record found, creating...");
        const { error: createError } = await supabase
          .from('client_pricing')
          .insert([
            {
              client_name: 'default',
              company_name: 'default',
              email: 'default@example.com',
              cost_per_minute: newPrice,
              minutes: 0
            }
          ]);

        if (createError) {
          console.error('❌ Error creating global price:', createError);
          toast.error("Failed to initialize global pricing");
          return false;
        }

        console.log("✅ Created global price record with price:", newPrice);
        toast.success("Global pricing initialized successfully");
        return true;
      }

      console.log("✅ Found global price record:", existingRecord);

      // Update only the global record
      const { error: updateError } = await supabase
        .from('client_pricing')
        .update({ 
          cost_per_minute: newPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id)
        .eq('client_name', 'default')
        .eq('company_name', 'default')
        .eq('email', 'default@example.com');

      if (updateError) {
        console.error('❌ Error updating global price:', updateError);
        toast.error("Failed to update global pricing");
        return false;
      }

      console.log("✅ Global price updated successfully to:", newPrice);
      toast.success("Global pricing updated successfully");
      return true;
    } catch (error: any) {
      console.error('❌ Error in updateGlobalPrice:', error);
      toast.error("Failed to update global pricing");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchGlobalPrice,
    updateGlobalPrice,
  };
};