interface ReportCalculationsProps {
  minutes: number;
  costPerMinute: number;
  country?: string;
  humanCostPerHour?: number;
}

export const useReportCalculations = ({ 
  minutes, 
  costPerMinute,
  country = 'us',
  humanCostPerHour = 18
}: ReportCalculationsProps) => {
  const calculateHumanCost = (minutes: number, country: string, baseRate: number = 18) => {
    const rates = {
      us: [0.10, 0.18, 0.08, 0.09], // US rates
      canada: [0.14, 0.12, 0.10, 0.09], // Canadian rates
    };

    const selectedRates = rates[country as keyof typeof rates];
    const additionalCosts = selectedRates.reduce((total, rate) => {
      return total + (baseRate * rate);
    }, 0);

    const hourlyRate = baseRate + additionalCosts;
    return (minutes / 60) * hourlyRate;
  };

  // Calculate human operator cost based on country
  const humanOperatorCost = calculateHumanCost(minutes, country, humanCostPerHour);
  
  // Standard tier calculations with dynamic pricing
  const standardAICost = minutes * costPerMinute;
  
  // Premium tier calculations (2x the base cost)
  const premiumCostPerMinute = costPerMinute * 2;
  const premiumAICost = minutes * premiumCostPerMinute;
  
  // Calculate savings for both tiers
  const standardSavings = humanOperatorCost - standardAICost;
  const premiumSavings = humanOperatorCost - premiumAICost;
  
  const standardSavingsPercentage = ((standardSavings / humanOperatorCost) * 100).toFixed(1);
  const premiumSavingsPercentage = ((premiumSavings / humanOperatorCost) * 100).toFixed(1);

  // Calculate call metrics
  const humanCallsPerHour = 12.5;
  const humanCallsPerDay = humanCallsPerHour * 8;
  const humanCallsPerMonth = humanCallsPerDay * 22;
  
  const aiSimultaneousCalls = 50;
  const aiCallsPerHour = aiSimultaneousCalls * 60;
  const aiCallsPerDay = aiCallsPerHour * 24;
  const aiCallsPerMonth = aiCallsPerDay * 30;

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