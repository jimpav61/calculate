import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Prospect } from "./types";
import { useProspectActions } from "./prospects/useProspectActions";
import { useProspectEmail } from "./prospects/useProspectEmail";

export const useProspects = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchProspects = async () => {
    try {
      console.log("Fetching all non-default client records...");
      const { data, error } = await supabase
        .from('client_pricing')
        .select('*')
        .neq('client_name', 'default')
        .neq('company_name', 'default')
        .neq('email', 'default@example.com')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log("Fetched prospects:", data);
      setProspects(data || []);
    } catch (error: any) {
      console.error("Error fetching prospects:", error);
      toast.error("Failed to load prospects");
    } finally {
      setLoading(false);
    }
  };

  const {
    selectedProspect,
    newCostPerMinute,
    sending,
    showPreview,
    setSelectedProspect,
    setNewCostPerMinute,
    setSending,
    setShowPreview,
    updateProspectPrice,
  } = useProspectActions(fetchProspects);

  const { sendReport } = useProspectEmail();

  const handleSendReport = async (prospect: Prospect) => {
    if (!newCostPerMinute) {
      toast.error("Please enter a new cost per minute");
      return;
    }

    try {
      setSending(true);
      console.log("Handling send report for prospect:", prospect.email, "with new price:", newCostPerMinute);

      // First update the individual price
      const updateSuccess = await updateProspectPrice(prospect.id, newCostPerMinute);
      if (!updateSuccess) {
        throw new Error("Failed to update price");
      }

      // Then send the report with the new individual price
      const emailSuccess = await sendReport(prospect, newCostPerMinute);
      if (!emailSuccess) {
        throw new Error("Failed to send email");
      }

      await fetchProspects();
    } catch (error: any) {
      console.error("Error in handleSendReport:", error);
      toast.error("Failed to complete the operation");
    } finally {
      setSending(false);
      setSelectedProspect(null);
      setNewCostPerMinute('');
      setShowPreview(false);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  return {
    prospects,
    loading,
    selectedProspect,
    newCostPerMinute,
    sending,
    showPreview,
    setSelectedProspect,
    setNewCostPerMinute,
    setShowPreview,
    handleSendReport,
  };
};