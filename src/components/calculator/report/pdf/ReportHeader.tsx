import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

interface ReportHeaderProps {
  date: string;
}

export const ReportHeader = ({ date }: ReportHeaderProps) => (
  <>
    <Text style={styles.title}>Detailed Cost Analysis Report</Text>
    <Text style={styles.text}>{date}</Text>
  </>
);