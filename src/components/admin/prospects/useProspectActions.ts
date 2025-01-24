import { useState } from "react";
import { toast } from "sonner";
import { Prospect } from "../types";
import { useIndividualPricing } from "../pricing/useIndividualPricing";

export const useProspectActions = (onSuccess: () => void) => {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [newCostPerMinute, setNewCostPerMinute] = useState<number | ''>('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { loading, updateIndividualPrice } = useIndividualPricing();

  const updateProspectPrice = async (prospectId: string, newPrice: number) => {
    console.log("Starting prospect price update:", { prospectId, newPrice });
    const success = await updateIndividualPrice(prospectId, newPrice);
    
    if (success) {
      onSuccess();
      return true;
    }
    return false;
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