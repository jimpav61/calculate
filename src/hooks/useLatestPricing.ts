import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLatestPricing = () => {
  return useQuery({
    queryKey: ["latestPricing"],
    queryFn: async () => {
      console.log("Fetching latest pricing...");
      const { data, error } = await supabase
        .from('client_pricing')
        .select('cost_per_minute')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching price:', error);
        return 0.05; // Fallback to default price if error
      }

      const price = data && data.length > 0 ? Number(data[0].cost_per_minute) : 0.05;
      console.log("Latest price fetched:", price);
      return price;
    },
    refetchInterval: 2000, // Refetch every 2 seconds
    staleTime: 0, // Consider data stale immediately
    cacheTime: 0, // Don't cache the data
  });
};