import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CalculatorFormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  minutes: number;
}

export const useCalculator = () => {
  const [step, setStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [globalPrice, setGlobalPrice] = useState<number | null>(null);
  const [formData, setFormData] = useState<CalculatorFormData>({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    minutes: 0,
  });

  useEffect(() => {
    fetchGlobalPrice();
  }, []);

  const fetchGlobalPrice = async () => {
    console.log("🔍 Fetching global price for calculator...");
    const { data, error } = await supabase
      .from('client_pricing')
      .select('cost_per_minute')
      .eq('client_name', 'default')
      .eq('company_name', 'default')
      .eq('email', 'default@example.com')
      .single();

    if (error) {
      console.error('❌ Error fetching global price:', error);
      toast.error("Failed to fetch pricing information");
      return;
    }

    if (data) {
      console.log("✅ Global price fetched successfully:", data.cost_per_minute);
      setGlobalPrice(Number(data.cost_per_minute));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'minutes' ? Number(value) : value,
    }));
  };

  const validateContactInfo = () => {
    if (step === 2) {
      if (!formData.name.trim() || !formData.companyName.trim()) {
        toast.error("Please fill in both your name and company name before proceeding.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!formData.phone.trim() || !formData.email.trim()) {
        toast.error("Please provide both your phone number and email address before proceeding.");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateContactInfo()) {
      return;
    }
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReport(true);
  };

  return {
    step,
    showReport,
    formData,
    globalPrice,
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmit,
    setShowReport,
  };
};