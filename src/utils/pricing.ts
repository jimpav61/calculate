import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const DEFAULT_COST_PER_MINUTE = 0.05;
export const DEFAULT_HUMAN_COST_PER_HOUR = 16;

export interface PricingData {
  cost_per_minute: number;
  human_cost_per_hour: number;
}

export const fetchGlobalPrice = async (): Promise<{ price: number; humanCost: number }> => {
  console.log("PricingUtil: Fetching global price...");
  const { data, error } = await supabase
    .from('client_pricing')
    .select('cost_per_minute, human_cost_per_hour')
    .eq('client_name', 'default')
    .eq('company_name', 'default')
    .eq('email', 'default@example.com')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('PricingUtil: Error fetching global price:', error);
    toast.error("Failed to fetch current price");
    return { 
      price: DEFAULT_COST_PER_MINUTE, 
      humanCost: DEFAULT_HUMAN_COST_PER_HOUR 
    };
  }

  if (data) {
    console.log("PricingUtil: Global price found:", data);
    return { 
      price: Number(data.cost_per_minute), 
      humanCost: Number(data.human_cost_per_hour) 
    };
  }

  return { 
    price: DEFAULT_COST_PER_MINUTE, 
    humanCost: DEFAULT_HUMAN_COST_PER_HOUR 
  };
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
      human_cost_per_hour: DEFAULT_HUMAN_COST_PER_HOUR,
      minutes: 0
    });

  if (error) {
    console.error('PricingUtil: Error creating default price:', error);
    toast.error("Failed to create default price");
    return false;
  }

  return true;
};

export const updateGlobalPrice = async (newPrice: number, newHumanCost: number): Promise<boolean> => {
  console.log("PricingUtil: Updating global price to:", newPrice, "and human cost to:", newHumanCost);
  const { error } = await supabase
    .from('client_pricing')
    .update({ 
      cost_per_minute: newPrice,
      human_cost_per_hour: newHumanCost,
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