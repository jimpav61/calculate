import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface CalculatorFormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
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
    minutes: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateContactInfo = () => {
    if (step === 2) {
      if (!formData.name.trim() || !formData.companyName.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in both your name and company name before proceeding.",
          variant: "destructive",
        });
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!formData.phone.trim() || !formData.email.trim()) {
        toast({
          title: "Missing Information",
          description: "Please provide both your phone number and email address before proceeding.",
          variant: "destructive",
        });
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
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmit,
    setShowReport,
  };
};