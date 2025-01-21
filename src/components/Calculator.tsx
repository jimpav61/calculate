import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { StepIndicator } from "./calculator/StepIndicator";
import { IntroductionStep } from "./calculator/IntroductionStep";
import { PersonalInfoStep } from "./calculator/PersonalInfoStep";
import { ContactInfoStep } from "./calculator/ContactInfoStep";
import { CostEstimateStep } from "./calculator/CostEstimateStep";
import { ReviewStep } from "./calculator/ReviewStep";

interface CalculatorFormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  minutes: number;
}

const Calculator = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorFormData>({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    minutes: 0,
  });

  const costPerMinute = 0.05;

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
    toast({
      title: "Calculation Complete",
      description: "Your custom report will be emailed to you shortly.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50">
      <Card className="w-full max-w-2xl p-8 glass-card animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chatsites Voice AI Calculator
          </h1>
          <p className="text-gray-600">Calculate your estimated monthly costs</p>
        </div>

        <StepIndicator currentStep={step} totalSteps={5} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && <IntroductionStep />}

          {step === 2 && (
            <PersonalInfoStep formData={formData} onChange={handleInputChange} />
          )}

          {step === 3 && (
            <ContactInfoStep formData={formData} onChange={handleInputChange} />
          )}

          {step === 4 && (
            <CostEstimateStep
              formData={formData}
              onChange={handleInputChange}
              costPerMinute={costPerMinute}
            />
          )}

          {step === 5 && (
            <ReviewStep formData={formData} costPerMinute={costPerMinute} />
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="transition-all hover:bg-gray-100"
              >
                Back
              </Button>
            )}
            {step < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-brand hover:bg-brand-dark transition-colors"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-brand hover:bg-brand-dark transition-colors"
              >
                Generate Report
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Calculator;