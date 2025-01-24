import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const DEFAULT_COST_PER_MINUTE = 0.05;

export interface PricingData {
  cost_per_minute: number;
}

export const fetchGlobalPrice = async (): Promise<number> => {
  console.log("PricingUtil: Fetching global price...");
  const { data, error } = await supabase
    .from('client_pricing')
    .select('cost_per_minute')
    .eq('client_name', 'default')
    .eq('company_name', 'default')
    .eq('email', 'default@example.com')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('PricingUtil: Error fetching global price:', error);
    toast.error("Failed to fetch current price");
    return DEFAULT_COST_PER_MINUTE;
  }

  if (data) {
    console.log("PricingUtil: Global price found:", data.cost_per_minute);
    return Number(data.cost_per_minute);
  }

  return DEFAULT_COST_PER_MINUTE;
};

export const createDefaultPrice = async (): Promise<boolean> => {
  console.log("PricingUtil: Creating default price record");
  const { error } = await supabase
    .from('client_pricing')
    .insert({
      client_name: 'default',
      company_name: 'default',
      email: 'default@example.com',
      cost_per_minute: DEFAULT_COST_PER_MINUTE,
      minutes: 0
    });

  if (error) {
    console.error('PricingUtil: Error creating default price:', error);
    toast.error("Failed to create default price");
    return false;
  }

  return true;
};

export const updateGlobalPrice = async (newPrice: number): Promise<boolean> => {
  console.log("PricingUtil: Updating global price to:", newPrice);
  const { error } = await supabase
    .from('client_pricing')
    .update({ 
      cost_per_minute: newPrice,
      updated_at: new Date().toISOString()
    })
    .eq('client_name', 'default')
    .eq('company_name', 'default')
    .eq('email', 'default@example.com');

  if (error) {
    console.error('PricingUtil: Error updating global price:', error);
    toast.error("Failed to save new price");
    return false;
  }

  console.log("PricingUtil: Global price updated successfully");
  toast.success("Price updated successfully");
  return true;
};