import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const NavigationButtons = ({
  step,
  onNext,
  onBack,
  onSubmit,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-4 sm:pt-6 gap-4">
      {step > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="transition-all hover:bg-gray-100 text-sm sm:text-base px-3 sm:px-4"
        >
          Back
        </Button>
      )}
      {step < 5 ? (
        <Button
          type="button"
          onClick={onNext}
          className="ml-auto bg-brand hover:bg-brand-dark transition-colors text-sm sm:text-base px-3 sm:px-4"
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          className="ml-auto bg-brand hover:bg-brand-dark transition-colors text-sm sm:text-base px-3 sm:px-4"
        >
          Generate Report
        </Button>
      )}
    </div>
  );
};