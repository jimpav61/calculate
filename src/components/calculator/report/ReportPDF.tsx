import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#f65228',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#f65228',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    fontWeight: 'bold',
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
  comparisonSection: {
    marginTop: 15,
    marginBottom: 15,
  },
  bullet: {
    marginLeft: 10,
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
      <Text style={styles.title}>Chatsites Cost Analysis Report</Text>
      <Text style={styles.text}>Generated on {data.date}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Company Information</Text>
        <Text style={styles.text}>Contact Name: {data.formData.name}</Text>
        <Text style={styles.text}>Company: {data.formData.companyName}</Text>
        <Text style={styles.text}>Email: {data.formData.email}</Text>
        <Text style={styles.text}>Phone: {data.formData.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Call Handling Capacity</Text>
        
        <Text style={styles.subheading}>Human Operator</Text>
        <Text style={styles.bullet}>• Average 10-15 calls per hour</Text>
        <Text style={styles.bullet}>• Limited to one call at a time</Text>
        <Text style={styles.bullet}>• 8-hour shift limitation</Text>
        <Text style={styles.bullet}>• Monthly capacity: {data.calculations.callMetrics.humanCallsPerMonth.toLocaleString()} calls</Text>
        <Text style={styles.bullet}>• Requires breaks and time off</Text>
        
        <Text style={styles.subheading}>AI Voice Assistant</Text>
        <Text style={styles.bullet}>• Handles {data.calculations.callMetrics.aiSimultaneousCalls} calls simultaneously</Text>
        <Text style={styles.bullet}>• 24/7 availability</Text>
        <Text style={styles.bullet}>• No shift limitations</Text>
        <Text style={styles.bullet}>• Monthly capacity: {data.calculations.callMetrics.aiCallsPerMonth.toLocaleString()} calls</Text>
        <Text style={styles.bullet}>• Never needs breaks or time off</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Cost Analysis</Text>
        <Text style={styles.text}>Monthly Minutes: {data.formData.minutes.toLocaleString()}</Text>
        
        <View style={styles.costSection}>
          <Text style={styles.text}>Human Operator Cost: ${data.calculations.humanOperatorCost.toFixed(2)}</Text>
          
          <Text style={styles.subheading}>Essential Voice AI</Text>
          <Text style={styles.text}>Monthly Cost: ${data.calculations.standardAICost.toFixed(2)}</Text>
          <Text style={styles.text}>Monthly Savings: ${data.calculations.standardSavings.toFixed(2)}</Text>
          <Text style={styles.text}>Savings Percentage: {data.calculations.standardSavingsPercentage}%</Text>
          
          <Text style={styles.subheading}>Premium Voice AI</Text>
          <Text style={styles.text}>Monthly Cost: ${data.calculations.premiumAICost.toFixed(2)}</Text>
          <Text style={styles.text}>Monthly Savings: ${data.calculations.premiumSavings.toFixed(2)}</Text>
          <Text style={styles.text}>Savings Percentage: {data.calculations.premiumSavingsPercentage}%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Additional Benefits</Text>
        
        <Text style={styles.subheading}>Operational Excellence</Text>
        <Text style={styles.bullet}>• Zero wait times for customers</Text>
        <Text style={styles.bullet}>• Consistent service quality</Text>
        <Text style={styles.bullet}>• Multi-language support</Text>
        <Text style={styles.bullet}>• Perfect recall of information</Text>
        <Text style={styles.bullet}>• Real-time data analytics</Text>

        <Text style={styles.subheading}>Business Impact</Text>
        <Text style={styles.bullet}>• Reduced operational costs</Text>
        <Text style={styles.bullet}>• Increased customer satisfaction</Text>
        <Text style={styles.bullet}>• Scalable during peak times</Text>
        <Text style={styles.bullet}>• Zero training requirements</Text>
        <Text style={styles.bullet}>• Immediate deployment</Text>
      </View>
    </Page>
  </Document>
);