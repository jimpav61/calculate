import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

export const AdditionalBenefitsSection = () => (
  <>
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
  </>
);