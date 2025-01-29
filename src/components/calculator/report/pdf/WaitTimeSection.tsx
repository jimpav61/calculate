import { Text, View } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

export const WaitTimeSection = () => (
  <View style={styles.section}>
    <Text style={styles.heading}>Response Time Analysis</Text>
    
    <View style={styles.subsection}>
      <Text style={styles.subheading}>Traditional Call Center Performance</Text>
      <Text style={styles.bullet}>• Average wait time: 5-7 minutes during peak hours</Text>
      <Text style={styles.bullet}>• 80/20 standard often not met (80% of calls answered within 20 seconds)</Text>
      <Text style={styles.bullet}>• Customer satisfaction decreases by 33% after 1-minute wait</Text>
      <Text style={styles.bullet}>• Limited by staff availability and call queues</Text>
    </View>

    <View style={styles.subsection}>
      <Text style={styles.subheading}>Voice AI Performance</Text>
      <Text style={styles.bullet}>• Instant response time (sub-second)</Text>
      <Text style={styles.bullet}>• No queuing or wait times</Text>
      <Text style={styles.bullet}>• Consistent performance during peak hours</Text>
      <Text style={styles.bullet}>• Handles 50-100 simultaneous calls</Text>
      <Text style={styles.bullet}>• 24/7 availability without degradation</Text>
    </View>

    <Text style={styles.footnote}>*Based on industry standard metrics and real-world performance data</Text>
  </View>
);