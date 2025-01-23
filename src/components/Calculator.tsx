import { Card } from "@/components/ui/card";
import { StepIndicator } from "./calculator/StepIndicator";
import { IntroductionStep } from "./calculator/IntroductionStep";
import { PersonalInfoStep } from "./calculator/PersonalInfoStep";
import { ContactInfoStep } from "./calculator/ContactInfoStep";
import { CostEstimateStep } from "./calculator/CostEstimateStep";
import { ReviewStep } from "./calculator/ReviewStep";
import { DetailedReportDialog } from "./calculator/DetailedReportDialog";
import { NavigationButtons } from "./calculator/NavigationButtons";
import { CalculatorHeader } from "./calculator/CalculatorHeader";
import { useCalculator } from "@/hooks/useCalculator";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Calculator = () => {
  const [costPerMinute, setCostPerMinute] = useState(0.05);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('cost_per_minute')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching price:', error);
        toast.error("Failed to fetch current pricing");
        return;
      }

      if (data && data.length > 0) {
        setCostPerMinute(Number(data[0].cost_per_minute));
      }
    };

    fetchLatestPrice();
  }, []);

  const {
    step,
    showReport,
    formData,
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmit: originalHandleSubmit,
    setShowReport,
  } = useCalculator(costPerMinute);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save form data to client_pricing table
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
        return;
      }

      toast.success("Information saved successfully!");
      originalHandleSubmit(e);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error("An error occurred while saving your information");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50">
      <Card className="w-full max-w-[500px] mx-auto p-4 sm:p-6 glass-card animate-fade-in">
        <CalculatorHeader
          title="Chatsites Voice AI Calculator"
          subtitle="Calculate your estimated monthly costs"
        />

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

          <NavigationButtons
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        </form>
      </Card>

      <DetailedReportDialog
        open={showReport}
        onOpenChange={setShowReport}
        formData={formData}
        costPerMinute={costPerMinute}
      />
    </div>
  );
};

export default Calculator;