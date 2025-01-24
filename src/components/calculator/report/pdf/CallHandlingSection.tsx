import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

interface CallHandlingSectionProps {
  callMetrics: {
    humanCallsPerMonth: number;
    aiCallsPerMonth: number;
    aiSimultaneousCalls: number;
  };
}

export const CallHandlingSection = ({ callMetrics }: CallHandlingSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.heading}>Call Handling Capacity</Text>
    <View style={styles.grid}>
      <View style={styles.column}>
        <Text style={styles.subheading}>Human Operator</Text>
        <Text style={styles.bullet}>• Average 10-15 calls per hour</Text>
        <Text style={styles.bullet}>• Limited to one call at a time</Text>
        <Text style={styles.bullet}>• 8-hour shift limitation</Text>
        <Text style={styles.bullet}>• Monthly capacity: {callMetrics.humanCallsPerMonth.toLocaleString()} calls</Text>
        <Text style={styles.bullet}>• Requires breaks and time off</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.subheading}>AI Voice Assistant</Text>
        <Text style={styles.bullet}>• Handles {callMetrics.aiSimultaneousCalls} calls simultaneously</Text>
        <Text style={styles.bullet}>• 24/7 availability</Text>
        <Text style={styles.bullet}>• No shift limitations</Text>
        <Text style={styles.bullet}>• Monthly capacity: {callMetrics.aiCallsPerMonth.toLocaleString()} calls</Text>
        <Text style={styles.bullet}>• Never needs breaks or time off</Text>
      </View>
    </View>
  </View>
);