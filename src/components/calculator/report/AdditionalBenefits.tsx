interface AdditionalBenefitsProps {
  humanCallsPerMonth: number;
  aiCallsPerMonth: number;
  aiSimultaneousCalls: number;
}

export const AdditionalBenefits = ({
  humanCallsPerMonth,
  aiCallsPerMonth,
  aiSimultaneousCalls
}: AdditionalBenefitsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 rounded-lg p-4 md:p-6 border border-brand/20">
        <h3 className="text-lg md:text-xl font-semibold text-brand mb-4">Call Handling Capacity</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-brand-dark mb-2">Human Operator</h4>
              <ul className="space-y-2 text-sm">
                <li>• Average 10-15 calls per hour</li>
                <li>• Limited to one call at a time</li>
                <li>• 8-hour shift limitation</li>
                <li>• Monthly capacity: {humanCallsPerMonth.toLocaleString()} calls</li>
                <li>• Requires breaks and time off</li>
              </ul>
            </div>
            
            <div className="p-4 bg-brand/5 rounded-lg">
              <h4 className="font-semibold text-brand mb-2">AI Voice Assistant</h4>
              <ul className="space-y-2 text-sm">
                <li>• Handles {aiSimultaneousCalls} calls simultaneously</li>
                <li>• 24/7 availability</li>
                <li>• No shift limitations</li>
                <li>• Monthly capacity: {aiCallsPerMonth.toLocaleString()} calls</li>
                <li>• Never needs breaks or time off</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 rounded-lg p-4 md:p-6 border border-brand/20">
        <h3 className="text-lg md:text-xl font-semibold text-brand mb-4">Additional Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-brand-dark">Operational Excellence</h4>
            <ul className="space-y-1">
              <li>• Zero wait times for customers</li>
              <li>• Consistent service quality</li>
              <li>• Multi-language support</li>
              <li>• Perfect recall of information</li>
              <li>• Real-time data analytics</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-brand-dark">Business Impact</h4>
            <ul className="space-y-1">
              <li>• Reduced operational costs</li>
              <li>• Increased customer satisfaction</li>
              <li>• Scalable during peak times</li>
              <li>• Zero training requirements</li>
              <li>• Immediate deployment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/80 rounded-lg p-4 md:p-6 border border-brand/20">
        <h3 className="text-lg md:text-xl font-semibold text-brand mb-4">ROI & Scalability</h3>
        <div className="space-y-3 text-sm">
          <p>• Instant scaling for seasonal peaks or business growth</p>
          <p>• No additional hiring or training costs when expanding</p>
          <p>• Predictable monthly costs regardless of call volume</p>
          <p>• Integration with existing systems and CRM platforms</p>
          <p>• Continuous improvements through AI learning</p>
        </div>
      </div>
    </div>
  );
};