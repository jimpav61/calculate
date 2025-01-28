interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center mb-6 w-full">
      <div className="flex items-center w-full max-w-[400px]">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                currentStep >= index + 1
                  ? "bg-brand text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-[2px] flex-1 mx-1 ${
                  currentStep > index + 1 ? "bg-brand" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};