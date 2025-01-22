import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QIFqPfE.woff2', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QYFqPfE.woff2', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ff4545',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    color: '#ff4545',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ff4545',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#ff4545',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Helvetica',
  },
  costSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff1f1',
    borderRadius: 8,
  },
  comparisonSection: {
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff1f1',
    borderRadius: 8,
  },
  bullet: {
    marginLeft: 10,
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  grid: {
    flexDirection: 'row',
    marginTop: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  }
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
      callMetrics: {
        humanCallsPerMonth: number;
        aiCallsPerMonth: number;
        aiSimultaneousCalls: number;
      };
    };
    date: string;
  };
}

export const ReportPDF = ({ data }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Detailed Cost Analysis Report</Text>
      <Text style={styles.text}>{data.date}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Company Information</Text>
        <View style={styles.grid}>
          <View style={styles.column}>
            <Text style={styles.label}>Contact Name</Text>
            <Text style={styles.text}>{data.formData.name}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{data.formData.email}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.text}>{data.formData.companyName}</Text>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.text}>{data.formData.phone}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Cost Comparison Analysis</Text>
        <View style={styles.grid}>
          <View style={styles.column}>
            <Text style={styles.label}>Monthly Minutes</Text>
            <Text style={styles.value}>{data.formData.minutes.toLocaleString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Human Operator Cost</Text>
            <Text style={styles.value}>${data.calculations.humanOperatorCost.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.costSection}>
          <Text style={styles.subheading}>Essential Voice AI</Text>
          <Text style={styles.text}>Standard quality voices with good latency</Text>
          <Text style={styles.text}>Monthly Cost: ${data.calculations.standardAICost.toFixed(2)}</Text>
          <Text style={styles.text}>Monthly Savings: ${data.calculations.standardSavings.toFixed(2)}</Text>
          <Text style={styles.text}>Savings Percentage: {data.calculations.standardSavingsPercentage}%</Text>
        </View>

        <View style={styles.costSection}>
          <Text style={styles.subheading}>Premium Voice AI</Text>
          <Text style={styles.text}>Ultra-realistic voices with minimal latency</Text>
          <Text style={styles.text}>Monthly Cost: ${data.calculations.premiumAICost.toFixed(2)}</Text>
          <Text style={styles.text}>Monthly Savings: ${data.calculations.premiumSavings.toFixed(2)}</Text>
          <Text style={styles.text}>Savings Percentage: {data.calculations.premiumSavingsPercentage}%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Call Handling Capacity</Text>
        <View style={styles.grid}>
          <View style={styles.column}>
            <Text style={styles.subheading}>Human Operator</Text>
            <Text style={styles.bullet}>• Average 10-15 calls per hour</Text>
            <Text style={styles.bullet}>• Limited to one call at a time</Text>
            <Text style={styles.bullet}>• 8-hour shift limitation</Text>
            <Text style={styles.bullet}>• Monthly capacity: {data.calculations.callMetrics.humanCallsPerMonth.toLocaleString()} calls</Text>
            <Text style={styles.bullet}>• Requires breaks and time off</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subheading}>AI Voice Assistant</Text>
            <Text style={styles.bullet}>• Handles {data.calculations.callMetrics.aiSimultaneousCalls} calls simultaneously</Text>
            <Text style={styles.bullet}>• 24/7 availability</Text>
            <Text style={styles.bullet}>• No shift limitations</Text>
            <Text style={styles.bullet}>• Monthly capacity: {data.calculations.callMetrics.aiCallsPerMonth.toLocaleString()} calls</Text>
            <Text style={styles.bullet}>• Never needs breaks or time off</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Additional Benefits</Text>
        <View style={styles.grid}>
          <View style={styles.column}>
            <Text style={styles.subheading}>Operational Excellence</Text>
            <Text style={styles.bullet}>• Zero wait times for customers</Text>
            <Text style={styles.bullet}>• Consistent service quality</Text>
            <Text style={styles.bullet}>• Multi-language support</Text>
            <Text style={styles.bullet}>• Perfect recall of information</Text>
            <Text style={styles.bullet}>• Real-time data analytics</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subheading}>Business Impact</Text>
            <Text style={styles.bullet}>• Reduced operational costs</Text>
            <Text style={styles.bullet}>• Increased customer satisfaction</Text>
            <Text style={styles.bullet}>• Scalable during peak times</Text>
            <Text style={styles.bullet}>• Zero training requirements</Text>
            <Text style={styles.bullet}>• Immediate deployment</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>ROI & Scalability</Text>
        <Text style={styles.bullet}>• Instant scaling for seasonal peaks or business growth</Text>
        <Text style={styles.bullet}>• No additional hiring or training costs when expanding</Text>
        <Text style={styles.bullet}>• Predictable monthly costs regardless of call volume</Text>
        <Text style={styles.bullet}>• Integration with existing systems and CRM platforms</Text>
        <Text style={styles.bullet}>• Continuous improvements through AI learning</Text>
      </View>
    </Page>
  </Document>
);