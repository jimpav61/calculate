interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center mb-8 px-2 w-full overflow-x-auto">
      <div className="flex items-center min-w-[300px] sm:min-w-0">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= index + 1
                  ? "bg-brand text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-12 sm:w-16 h-1 ${
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