
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { PdfStyles } from './styles';

interface CompanyInfoSectionProps {
  companyName: string;
  employeeCount: number;
  customerServiceHours: number;
  styles: PdfStyles;
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  companyName,
  employeeCount,
  customerServiceHours,
  styles
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Company Information</Text>
      <View style={styles.subsection}>
        <Text style={styles.text}>Company Name: {companyName}</Text>
        <Text style={styles.text}>Number of Employees: {employeeCount}</Text>
        <Text style={styles.text}>Customer Service Hours per Month: {customerServiceHours}</Text>
      </View>
    </View>
  );
};

export default CompanyInfoSection;
