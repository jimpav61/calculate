import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  minutes: number;
}

export const useFormSubmission = (costPerMinute: number) => {
  const submitForm = async (formData: FormData) => {
    console.log("Submitting form with cost per minute:", costPerMinute);
    
    const { error } = await supabase
      .from('client_pricing')
      .insert([
        {
          client_name: formData.name,
          company_name: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          minutes: formData.minutes,
          cost_per_minute: costPerMinute
        }
      ]);

    if (error) {
      console.error('Error saving form data:', error);
      toast.error("Failed to save your information");
      return false;
    }

    console.log("Form data saved successfully");
    toast.success("Information saved successfully!");
    return true;
  };

  return { submitForm };
};