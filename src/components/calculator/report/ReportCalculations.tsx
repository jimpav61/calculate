interface ReportCalculationsProps {
  minutes: number;
  costPerMinute: number | null;
}

export const useReportCalculations = ({ minutes, costPerMinute }: ReportCalculationsProps) => {
  console.log("🧮 Starting calculations with:", { minutes, costPerMinute });
  
  if (!costPerMinute) {
    console.warn("⚠️ No cost per minute provided, calculations will be $0");
    return {
      standardAICost: 0,
      premiumAICost: 0,
      humanOperatorCost: 0,
      standardSavings: 0,
      premiumSavings: 0,
      standardSavingsPercentage: "0.0",
      premiumSavingsPercentage: "0.0",
      callMetrics: {
        humanCallsPerMonth: 0,
        aiCallsPerMonth: 0,
        aiSimultaneousCalls: 0
      }
    };
  }

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
  const standardAICost = Number((minutes * costPerMinute).toFixed(2));
  console.log("💰 Standard AI Cost:", standardAICost, `(${minutes} mins × $${costPerMinute}/min)`);
  
  // Premium tier calculations (2x the base cost)
  const premiumCostPerMinute = costPerMinute * 2;
  const premiumAICost = Number((minutes * premiumCostPerMinute).toFixed(2));
  console.log("💎 Premium AI Cost:", premiumAICost, `(${minutes} mins × $${premiumCostPerMinute}/min)`);
  
  // Calculate human operator cost based on $16/hour
  const humanOperatorCost = Number(((minutes / 60) * 16).toFixed(2));
  console.log("👤 Human Operator Cost:", humanOperatorCost, `(${minutes} mins at $16/hour)`);
  
  // Calculate savings for both tiers
  const standardSavings = Number((humanOperatorCost - standardAICost).toFixed(2));
  const premiumSavings = Number((humanOperatorCost - premiumAICost).toFixed(2));
  
  const standardSavingsPercentage = ((standardSavings / humanOperatorCost) * 100).toFixed(1);
  const premiumSavingsPercentage = ((premiumSavings / humanOperatorCost) * 100).toFixed(1);

  console.log("💫 Final calculations:", {
    standardAICost,
    premiumAICost,
    humanOperatorCost,
    standardSavings,
    premiumSavings,
    standardSavingsPercentage: `${standardSavingsPercentage}%`,
    premiumSavingsPercentage: `${premiumSavingsPercentage}%`
  });

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