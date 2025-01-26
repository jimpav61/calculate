import { useState } from "react";
import { toast } from "sonner";

interface CalculatorFormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  website: string;
  minutes: number;
}

export const useCalculator = (initialCostPerMinute: number) => {
  const [step, setStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState<CalculatorFormData>({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    website: "",
    minutes: 0,
  });

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
    if (step === 4) {
      if (!formData.minutes || formData.minutes <= 0) {
        toast.error("Please enter a valid number of minutes before proceeding.");
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

  return {
    step,
    showReport,
    formData,
    handleInputChange,
    handleNext,
    handleBack,
    setShowReport,
  };
};