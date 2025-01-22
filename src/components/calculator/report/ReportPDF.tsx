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
});

interface ReportPDFProps {
  data: {
    formData: {
      name: string;
      companyName: string;
      email: string;
      phone: string;
      minutes: number;
    };
    calculations: {
      standardAICost: number;
      premiumAICost: number;
      humanOperatorCost: number;
      standardSavings: number;
      premiumSavings: number;
      standardSavingsPercentage: string;
      premiumSavingsPercentage: string;
    };
    date: string;
  };
}

export const ReportPDF = ({ data }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Chatsites Cost Analysis Report</Text>
        <Text style={styles.contactInfo}>1715 N. Channing Mesa, AZ 85298</Text>
        <Text style={styles.contactInfo}>+1 480 862 0288</Text>
        <Text style={styles.contactInfo}>info@chatsites.ai</Text>
        <Text style={styles.date}>Generated on {data.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Company Information</Text>
        <Text style={styles.text}>Contact Name: {data.formData.name}</Text>
        <Text style={styles.text}>Company: {data.formData.companyName}</Text>
        <Text style={styles.text}>Email: {data.formData.email}</Text>
        <Text style={styles.text}>Phone: {data.formData.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Cost Analysis</Text>
        <Text style={styles.text}>Monthly Minutes: {data.formData.minutes.toLocaleString()}</Text>
        
        <View style={styles.costSection}>
          <Text style={styles.text}>Human Operator Cost: ${data.calculations.humanOperatorCost.toFixed(2)}</Text>
          
          <Text style={styles.heading}>Essential Voice AI</Text>
          <Text style={styles.text}>Monthly Cost: ${data.calculations.standardAICost.toFixed(2)}</Text>
          <Text style={styles.text}>Monthly Savings: ${data.calculations.standardSavings.toFixed(2)}</Text>
          <Text style={styles.text}>Savings Percentage: {data.calculations.standardSavingsPercentage}%</Text>
          
          <Text style={styles.heading}>Premium Voice AI</Text>
          <Text style={styles.text}>Monthly Cost: ${data.calculations.premiumAICost.toFixed(2)}</Text>
          <Text style={styles.text}>Monthly Savings: ${data.calculations.premiumSavings.toFixed(2)}</Text>
          <Text style={styles.text}>Savings Percentage: {data.calculations.premiumSavingsPercentage}%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Additional Benefits</Text>
        <Text style={styles.text}>• 24/7 Availability without overtime costs</Text>
        <Text style={styles.text}>• Consistent service quality</Text>
        <Text style={styles.text}>• Instant scalability</Text>
        <Text style={styles.text}>• No training or turnover costs</Text>
        <Text style={styles.text}>• Multi-language support capability</Text>
      </View>
    </Page>
  </Document>
);