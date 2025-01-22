import { Card } from "@/components/ui/card";

export const IntroductionStep = () => {
  return (
    <div className="animate-fade-in">
      <Card className="p-6 text-left">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How Voice AI Pricing Works</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Our Voice AI pricing is simple and transparent. You only pay for the minutes you use:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pay per minute of voice AI interaction</li>
            <li>No hidden fees or setup costs</li>
            <li>Scale up or down based on your needs</li>
            <li>Premium voice quality and natural conversations</li>
          </ul>
          <p className="font-medium">
            Ready to get started? Click Next to calculate your estimated costs.
          </p>
        </div>
      </Card>
    </div>
  );
};