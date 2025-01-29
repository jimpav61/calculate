import { Text, View } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

interface CostAnalysisSectionProps {
  minutes: number;
  calculations: {
    standardAICost: number;
    premiumAICost: number;
    humanOperatorCost: number;
  };
}

export const CostAnalysisSection = ({ minutes, calculations }: CostAnalysisSectionProps) => {
  // Calculate operational metrics
  const standardCallsPerMonth = Math.floor((minutes / 3) * 30);
  const premiumCallsPerMonth = Math.floor((minutes / 2) * 30);
  
  const standardCostPerCall = calculations.standardAICost / standardCallsPerMonth;
  const premiumCostPerCall = calculations.premiumAICost / premiumCallsPerMonth;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Operational Performance Analysis</Text>

      <View style={styles.costSection}>
        <Text style={styles.packageTitle}>Essential Voice AI</Text>
        <Text style={styles.packageSubtitle}>High-efficiency automated support</Text>
        
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Monthly Cost</Text>
          <Text style={styles.costValue}>${calculations.standardAICost.toFixed(2)}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Calls Handled/Month</Text>
          <Text style={styles.costValue}>{standardCallsPerMonth.toLocaleString()}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Cost per Call</Text>
          <Text style={styles.costValue}>${standardCostPerCall.toFixed(2)}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Availability</Text>
          <Text style={styles.costValue}>24/7</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Response Time</Text>
          <Text style={styles.costValue}>Instant</Text>
        </View>
      </View>

      <View style={styles.costSection}>
        <Text style={styles.packageTitle}>Premium Voice AI</Text>
        <Text style={styles.packageSubtitle}>Enterprise-grade automated support</Text>
        
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Monthly Cost</Text>
          <Text style={styles.costValue}>${calculations.premiumAICost.toFixed(2)}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Calls Handled/Month</Text>
          <Text style={styles.costValue}>{premiumCallsPerMonth.toLocaleString()}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Cost per Call</Text>
          <Text style={styles.costValue}>${premiumCostPerCall.toFixed(2)}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Availability</Text>
          <Text style={styles.costValue}>24/7</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Response Time</Text>
          <Text style={styles.costValue}>Sub-second</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Customer Satisfaction</Text>
          <Text style={styles.costValue}>98%</Text>
        </View>
      </View>
    </View>
  );
};