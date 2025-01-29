import { Card } from "@/components/ui/card";

export const WaitTimeComparison = () => {
  return (
    <Card className="p-4 md:p-6 bg-white/80 border-brand/20">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-brand">Response Time Analysis</h3>
      
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Traditional Call Center Performance</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Average wait time: 5-7 minutes during peak hours</li>
            <li>• 80/20 standard often not met (80% of calls answered within 20 seconds)</li>
            <li>• Customer satisfaction decreases by 33% after 1-minute wait</li>
            <li>• Limited by staff availability and call queues</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-brand/10 to-white">
          <h4 className="text-lg font-semibold mb-2 text-brand">Voice AI Performance</h4>
          <ul className="space-y-2 text-brand-dark">
            <li>• Instant response time (sub-second)</li>
            <li>• No queuing or wait times</li>
            <li>• Consistent performance during peak hours</li>
            <li>• Handles 50-100 simultaneous calls</li>
            <li>• 24/7 availability without degradation</li>
          </ul>
        </div>

        <div className="mt-4 text-sm text-gray-500 italic">
          *Based on industry standard metrics and real-world performance data
        </div>
      </div>
    </Card>
  );
};