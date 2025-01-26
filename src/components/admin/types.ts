export interface Prospect {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  minutes: number;
  cost_per_minute: number;
  created_at: string;
}

export interface ClientPricing {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  minutes: number;
  cost_per_minute: number;
  created_at: string;
}
