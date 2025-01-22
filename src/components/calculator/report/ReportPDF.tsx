import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#f65228',
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'right',
  },
  date: {
    fontSize: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#f65228',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  costSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  benefitsList: {
    marginTop: 10,
  },
  benefitItem: {
    fontSize: 11,
    marginBottom: 4,
  },
});

interface ReportPDFProps {
  formData: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    minutes: number;
  };
  costPerMinute: number;
}

export const ReportPDF = ({ formData, costPerMinute }: ReportPDFProps) => {
  const currentDate = new Date().toLocaleDateString();
  const standardAICost = formData.minutes * costPerMinute;
  const premiumAICost = formData.minutes * (costPerMinute * 1.2);
  const humanOperatorCost = formData.minutes * (costPerMinute * 1.5);
  const standardSavings = humanOperatorCost - standardAICost;
  const premiumSavings = humanOperatorCost - premiumAICost;
  const standardSavingsPercentage = ((standardSavings / humanOperatorCost) * 100).toFixed(1);
  const premiumSavingsPercentage = ((premiumSavings / humanOperatorCost) * 100).toFixed(1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Voice AI Cost Analysis Report</Text>
          <Text style={styles.contactInfo}>1715 N. Channing Mesa, AZ 85298</Text>
          <Text style={styles.contactInfo}>+1 480 862 0288</Text>
          <Text style={styles.contactInfo}>info@chatsites.ai</Text>
          <Text style={styles.date}>Generated on {currentDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Company Information</Text>
          <Text style={styles.text}>Contact Name: {formData.name}</Text>
          <Text style={styles.text}>Company: {formData.companyName}</Text>
          <Text style={styles.text}>Email: {formData.email}</Text>
          <Text style={styles.text}>Phone: {formData.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Cost Analysis</Text>
          <Text style={styles.text}>Monthly Minutes: {formData.minutes.toLocaleString()}</Text>
          
          <View style={styles.costSection}>
            <Text style={styles.text}>Human Operator Cost: ${humanOperatorCost.toFixed(2)}</Text>
            
            <Text style={styles.heading}>Essential Voice AI</Text>
            <Text style={styles.text}>Monthly Cost: ${standardAICost.toFixed(2)}</Text>
            <Text style={styles.text}>Monthly Savings: ${standardSavings.toFixed(2)}</Text>
            <Text style={styles.text}>Savings Percentage: {standardSavingsPercentage}%</Text>
            
            <Text style={styles.heading}>Premium Voice AI</Text>
            <Text style={styles.text}>Monthly Cost: ${premiumAICost.toFixed(2)}</Text>
            <Text style={styles.text}>Monthly Savings: ${premiumSavings.toFixed(2)}</Text>
            <Text style={styles.text}>Savings Percentage: {premiumSavingsPercentage}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Additional Benefits</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• 24/7 Availability without overtime costs</Text>
            <Text style={styles.benefitItem}>• Consistent service quality across all interactions</Text>
            <Text style={styles.benefitItem}>• Instant scalability to handle peak demand periods</Text>
            <Text style={styles.benefitItem}>• Zero training time and no turnover costs</Text>
            <Text style={styles.benefitItem}>• Multi-language support for global reach</Text>
            <Text style={styles.benefitItem}>• Reduced operational overhead and management costs</Text>
            <Text style={styles.benefitItem}>• Improved customer satisfaction through instant response times</Text>
            <Text style={styles.benefitItem}>• Advanced analytics and insights from every conversation</Text>
            <Text style={styles.benefitItem}>• Seamless integration with existing business systems</Text>
            <Text style={styles.benefitItem}>• Compliance and security standards adherence</Text>
            <Text style={styles.benefitItem}>• Reduced human error in customer interactions</Text>
            <Text style={styles.benefitItem}>• Ability to handle multiple conversations simultaneously</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};