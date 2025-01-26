import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ClientPricing } from "../types";

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<ClientPricing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error: any) {
      toast.error("Failed to load submissions");
      console.error("Error fetching submissions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    submissions,
    loading,
  };
};