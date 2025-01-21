import { useState } from "react";

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

  const handleNext = () => {
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