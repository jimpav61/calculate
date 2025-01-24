import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Prospect } from "./types";
import { useProspectEmail } from "./prospects/useProspectEmail";
import { toast } from "sonner";

export const useProspects = () => {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [newCostPerMinute, setNewCostPerMinute] = useState<number | ''>('');
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const { sendReport } = useProspectEmail();

  const { data: prospects = [], isLoading: loading } = useQuery({
    queryKey: ['prospects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prospects:', error);
        toast.error('Failed to load prospects');
        throw error;
      }

      return data as Prospect[];
    },
  });

  const handleSendReport = async (prospect: Prospect) => {
    if (!newCostPerMinute) {
      toast.error('Please enter a valid price per minute');
      return;
    }

    setSending(true);
    try {
      // Update the prospect's cost_per_minute in the database
      const { error: updateError } = await supabase
        .from('client_pricing')
        .update({ cost_per_minute: newCostPerMinute })
        .eq('id', prospect.id);

      if (updateError) {
        console.error('Error updating prospect price:', updateError);
        toast.error('Failed to update prospect price');
        return;
      }

      // Send the report with the new individual price
      const success = await sendReport(prospect, Number(newCostPerMinute));
      if (success) {
        setSelectedProspect(null);
        setNewCostPerMinute('');
        setShowPreview(false);
      }
    } catch (error) {
      console.error('Error in handleSendReport:', error);
      toast.error('Failed to send report');
    } finally {
      setSending(false);
    }
  };

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