import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useGlobalPricing = () => {
  const [loading, setLoading] = useState(false);

  const fetchGlobalPrice = async () => {
    console.log("🌍 Fetching global price...");
    const { data, error } = await supabase
      .from('client_pricing')
      .select('cost_per_minute')
      .eq('client_name', 'default')
      .eq('company_name', 'default')
      .eq('email', 'default@example.com')
      .single();

    if (error) {
      console.error('❌ Error fetching global price:', error);
      return null;
    }

    if (data) {
      console.log("✅ Global price found:", data.cost_per_minute);
      return Number(data.cost_per_minute);
    }
    return null;
  };

  const updateGlobalPrice = async (newPrice: number) => {
    try {
      setLoading(true);
      console.log("🌍 Starting global price update. New price:", newPrice);
      
      const { data: existingRecord, error: checkError } = await supabase
        .from('client_pricing')
        .select('*')
        .eq('client_name', 'default')
        .eq('company_name', 'default')
        .eq('email', 'default@example.com')
        .single();

      if (checkError || !existingRecord) {
        console.error('❌ Error checking global price record:', checkError);
        return false;
      }

      console.log("✅ Found global price record:", existingRecord);

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
        return false;
      }

      console.log("✅ Global price updated successfully to:", newPrice);
      return true;
    } catch (error: any) {
      console.error('❌ Error in updateGlobalPrice:', error);
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