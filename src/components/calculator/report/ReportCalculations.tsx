interface ReportCalculationsProps {
  minutes: number;
  costPerMinute: number;
}

export const useReportCalculations = ({ minutes, costPerMinute }: ReportCalculationsProps) => {
  // Calculate calls per hour for human operators (12.5 average)
  const humanCallsPerHour = 12.5;
  const humanCallsPerDay = humanCallsPerHour * 8;
  const humanCallsPerMonth = humanCallsPerDay * 22; // Assuming 22 working days
  
  // AI can handle multiple calls simultaneously (50)
  const aiSimultaneousCalls = 50;
  const aiCallsPerHour = aiSimultaneousCalls * 60; // Potential calls per hour
  const aiCallsPerDay = aiCallsPerHour * 24; // 24/7 operation
  const aiCallsPerMonth = aiCallsPerDay * 30; // Full month operation
  
  // Standard tier calculations with dynamic pricing
  const standardAICost = minutes * costPerMinute;
  
  // Premium tier calculations (2x the base cost)
  const premiumCostPerMinute = costPerMinute * 2;
  const premiumAICost = minutes * premiumCostPerMinute;
  
  // Calculate human operator cost based on $16/hour
  const humanOperatorCost = (minutes / 60) * 16;
  
  // Calculate savings for both tiers
  const standardSavings = humanOperatorCost - standardAICost;
  const premiumSavings = humanOperatorCost - premiumAICost;
  
  const standardSavingsPercentage = ((standardSavings / humanOperatorCost) * 100).toFixed(1);
  const premiumSavingsPercentage = ((premiumSavings / humanOperatorCost) * 100).toFixed(1);

  return {
    standardAICost,
    premiumAICost,
    humanOperatorCost,
    standardSavings,
    premiumSavings,
    standardSavingsPercentage,
    premiumSavingsPercentage,
    callMetrics: {
      humanCallsPerMonth,
      aiCallsPerMonth,
      aiSimultaneousCalls
    }
  };
};