import { useState } from "react";
import { toast } from "sonner";

interface CalculatorFormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  website: string;
  minutes: number;
  country: string;
}

export const useCalculator = (costPerMinute: number) => {
  const [step, setStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState<CalculatorFormData>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    minutes: 0,
    website: "",
    country: "us",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'minutes' ? Number(value) : value,
    }));
  };

  const validateStep = () => {
    if (step === 2) {
      if (!formData.name || !formData.companyName) {
        toast.error("Please fill in all required fields");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!formData.email || !formData.phone) {
        toast.error("Please provide contact information");
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!formData.minutes || formData.minutes <= 0) {
        toast.error("Please enter a valid number of minutes");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 5) {
        setStep((prev) => prev + 1);
      }
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