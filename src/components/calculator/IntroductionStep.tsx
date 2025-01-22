import { Card } from "@/components/ui/card";

export const IntroductionStep = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-4 sm:p-6 md:p-8 text-left space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">How Voice AI Pricing Works</h2>
        <div className="space-y-4 text-gray-600">
          <p className="text-base sm:text-lg">
            Our Voice AI pricing is simple and transparent. You only pay for the minutes you use:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg">
            <li>Pay per minute of voice AI interaction</li>
            <li>No hidden fees or setup costs</li>
            <li>Scale up or down based on your needs</li>
            <li>Premium voice quality and natural conversations</li>
          </ul>
          <p className="mt-4 font-medium text-base sm:text-lg">
            Ready to get started? Click Next to calculate your estimated costs.
          </p>
        </div>
      </Card>
    </div>
  );
};