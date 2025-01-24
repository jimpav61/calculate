import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Prospect } from "../types";

export const useProspectActions = (onSuccess: () => void) => {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [newCostPerMinute, setNewCostPerMinute] = useState<number | ''>('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const updateProspectPrice = async (prospectId: string, newPrice: number) => {
    try {
      // First verify this is not the default record
      const { data: prospect, error: fetchError } = await supabase
        .from('client_pricing')
        .select('*')
        .eq('id', prospectId)
        .single();

      if (fetchError) {
        console.error("Error fetching prospect:", fetchError);
        throw fetchError;
      }

      if (prospect.client_name === 'default' && 
          prospect.company_name === 'default' && 
          prospect.email === 'default@example.com') {
        console.error("Attempted to update global price through prospect actions");
        toast.error("Cannot update global price through this interface");
        return false;
      }

      console.log("Updating individual prospect price. ID:", prospectId, "New Price:", newPrice);
      
      // Update the specific client's record
      const { error: updateError } = await supabase
        .from('client_pricing')
        .update({ 
          cost_per_minute: newPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', prospectId);

      if (updateError) {
        console.error("Error updating prospect price:", updateError);
        throw updateError;
      }
      
      console.log("Individual price updated successfully");
      toast.success("Individual price updated successfully");
      onSuccess(); // Refresh the list after update
      return true;
    } catch (error: any) {
      console.error("Error in updateProspectPrice:", error);
      toast.error("Failed to update individual price");
      return false;
    }
  };

  return {
    selectedProspect,
    newCostPerMinute,
    sending,
    showPreview,
    setSelectedProspect,
    setNewCostPerMinute,
    setSending,
    setShowPreview,
    updateProspectPrice,
  };
};