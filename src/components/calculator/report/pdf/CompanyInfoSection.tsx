import { Text, View } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

interface CompanyInfoSectionProps {
  name: string;
  companyName: string;
  email: string;
  phone: string;
}

export const CompanyInfoSection = ({ name, companyName, email, phone }: CompanyInfoSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.heading}>Company Information</Text>
    <View style={styles.grid}>
      <View style={styles.column}>
        <Text style={styles.sectionTitle}>Contact Name</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.sectionTitle}>Email</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.text}>{companyName}</Text>
        <Text style={styles.sectionTitle}>Phone</Text>
        <Text style={styles.text}>{phone}</Text>
      </View>
    </View>
  </View>
);