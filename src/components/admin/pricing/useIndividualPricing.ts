import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useIndividualPricing = () => {
  const [loading, setLoading] = useState(false);

  const updateIndividualPrice = async (prospectId: string, newPrice: number) => {
    try {
      setLoading(true);
      console.log("👤 Starting individual price update. ID:", prospectId, "New Price:", newPrice);
      
      // First verify this is not the default record
      const { data: prospect, error: fetchError } = await supabase
        .from('client_pricing')
        .select('*')
        .eq('id', prospectId)
        .single();

      if (fetchError) {
        console.error("❌ Error fetching prospect:", fetchError);
        toast.error("Failed to verify prospect record");
        return false;
      }

      console.log("✅ Found prospect record:", prospect);

      // Extra safety check to prevent modifying global price
      if (!prospect || 
          prospect.client_name === 'default' || 
          prospect.company_name === 'default' || 
          prospect.email === 'default@example.com') {
        console.error("❌ Attempted to update global price through individual pricing");
        toast.error("Cannot update global price through this interface");
        return false;
      }

      // Update using the ID only, and verify it's not the default record
      const { error: updateError } = await supabase
        .from('client_pricing')
        .update({ 
          cost_per_minute: newPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', prospectId)
        .not('client_name', 'eq', 'default')
        .not('company_name', 'eq', 'default')
        .not('email', 'eq', 'default@example.com');

      if (updateError) {
        console.error("❌ Error updating prospect price:", updateError);
        toast.error("Failed to update individual price");
        return false;
      }

      console.log("✅ Individual price updated successfully for prospect:", prospectId, "to:", newPrice);
      toast.success("Individual price updated successfully");
      return true;
    } catch (error: any) {
      console.error("❌ Error in updateIndividualPrice:", error);
      toast.error("Failed to update individual price");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateIndividualPrice,
  };
};