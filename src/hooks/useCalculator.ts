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

  const validateContactInfo = () => {
    if (step === 2) {
      return formData.name.trim() !== "" && formData.companyName.trim() !== "";
    }
    if (step === 3) {
      return formData.phone.trim() !== "" && formData.email.trim() !== "";
    }
    return true;
  };

  const handleNext = () => {
    if (!validateContactInfo()) {
      alert("Please fill in all required fields before proceeding.");
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