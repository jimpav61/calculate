import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

interface CostAnalysisSectionProps {
  minutes: number;
  calculations: {
    humanOperatorCost: number;
    standardAICost: number;
    premiumAICost: number;
    standardSavings: number;
    premiumSavings: number;
    standardSavingsPercentage: string;
    premiumSavingsPercentage: string;
  };
}

export const CostAnalysisSection = ({ minutes, calculations }: CostAnalysisSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.heading}>Cost Comparison Analysis</Text>
    <View style={styles.grid}>
      <View style={styles.column}>
        <Text style={styles.label}>Monthly Minutes</Text>
        <Text style={styles.value}>{minutes.toLocaleString()}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Human Operator Cost</Text>
        <Text style={styles.value}>${calculations.humanOperatorCost.toFixed(2)}</Text>
      </View>
    </View>

    <View style={styles.costSection}>
      <Text style={styles.subheading}>Essential Voice AI</Text>
      <Text style={styles.text}>Standard quality voices with good latency</Text>
      <Text style={styles.text}>Monthly Cost: ${calculations.standardAICost.toFixed(2)}</Text>
      <Text style={styles.text}>Monthly Savings: ${calculations.standardSavings.toFixed(2)}</Text>
      <Text style={styles.text}>Savings Percentage: {calculations.standardSavingsPercentage}%</Text>
    </View>

    <View style={styles.costSection}>
      <Text style={styles.subheading}>Premium Voice AI</Text>
      <Text style={styles.text}>Ultra-realistic voices with minimal latency</Text>
      <Text style={styles.text}>Monthly Cost: ${calculations.premiumAICost.toFixed(2)}</Text>
      <Text style={styles.text}>Monthly Savings: ${calculations.premiumSavings.toFixed(2)}</Text>
      <Text style={styles.text}>Savings Percentage: {calculations.premiumSavingsPercentage}%</Text>
    </View>
  </View>
);