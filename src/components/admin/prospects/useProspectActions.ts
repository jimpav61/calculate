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
      console.log("Updating individual prospect price to:", newPrice);
      
      const { error } = await supabase
        .from('client_pricing')
        .update({ 
          cost_per_minute: newPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', prospectId);

      if (error) throw error;
      
      toast.success("Price updated successfully");
      onSuccess(); // Refresh the list after update
      return true;
    } catch (error: any) {
      console.error("Error updating prospect price:", error);
      toast.error("Failed to update price");
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