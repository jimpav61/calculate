import { Card } from "@/components/ui/card";

export const IntroductionStep = () => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in">
      <Card className="p-3 sm:p-4 md:p-6 text-left space-y-2 sm:space-y-3 md:space-y-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">How Voice AI Pricing Works</h2>
        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 text-sm sm:text-base">
          <p>
            Our Voice AI pricing is simple and transparent. You only pay for the minutes you use:
          </p>
          <ul className="list-disc pl-5 space-y-1 sm:space-y-2">
            <li>Pay per minute of voice AI interaction</li>
            <li>No hidden fees or setup costs</li>
            <li>Scale up or down based on your needs</li>
            <li>Premium voice quality and natural conversations</li>
          </ul>
          <p className="mt-2 sm:mt-4 font-medium">
            Ready to get started? Click Next to calculate your estimated costs.
          </p>
        </div>
      </Card>
    </div>
  );
};