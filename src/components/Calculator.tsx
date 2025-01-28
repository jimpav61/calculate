import { Toaster } from "@/components/ui/toaster";
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
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { usePricing } from "@/hooks/usePricing";

const Calculator = () => {
  const { costPerMinute } = usePricing();
  
  const {
    step,
    showReport,
    formData,
    handleInputChange,
    handleNext,
    handleBack,
    setShowReport,
  } = useCalculator(costPerMinute);

  const { submitForm } = useFormSubmission(costPerMinute);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Calculator: Form submitted with data:", formData);
    setShowReport(true);
    const success = await submitForm(formData);
    console.log("Calculator: Form submission result:", success);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gradient-to-br from-white to-gray-50">
      <Card className="w-full max-w-[500px] mx-auto p-3 sm:p-4 md:p-6 glass-card animate-fade-in">
        <CalculatorHeader
          title="Chatsites Voice AI Calculator"
          subtitle="Calculate your estimated monthly costs"
        />

        <StepIndicator currentStep={step} totalSteps={5} />

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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

      <Toaster />
    </div>
  );
};

export default Calculator;