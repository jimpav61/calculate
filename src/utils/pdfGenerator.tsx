import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

interface PDFReportProps {
  userData: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    minutes: number;
  };
  costPerMinute: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    color: "#f65228",
    fontSize: 24,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333333",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#f65228",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "40%",
    fontSize: 12,
    color: "#666666",
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
  },
  pricingBox: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f65228",
    marginTop: 10,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  cta: {
    backgroundColor: "#f65228",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  ctaText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
});

export const PDFReport = ({ userData, costPerMinute }: PDFReportProps) => {
  const monthlyUsageCost = userData.minutes * costPerMinute;
  const traditionalCost = userData.minutes * (costPerMinute * 1.2);
  const potentialSavings = traditionalCost - monthlyUsageCost;
  const recommendedCharge = monthlyUsageCost * 1.15;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>Chatsites Voice AI</Text>
          <Text style={styles.title}>Cost Estimation Report</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{userData.companyName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Estimation</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Monthly Minutes:</Text>
            <Text style={styles.value}>{userData.minutes.toLocaleString()} minutes</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cost per Minute:</Text>
            <Text style={styles.value}>${costPerMinute.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.pricingBox}>
          <Text style={styles.sectionTitle}>Cost Breakdown</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Monthly Usage Cost:</Text>
            <Text style={styles.value}>${monthlyUsageCost.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Potential Savings:</Text>
            <Text style={styles.value}>${potentialSavings.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Recommended Charge:</Text>
            <Text style={styles.total}>${recommendedCharge.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          <Text style={styles.value}>
            Thank you for your interest in Chatsites Voice AI services. Our team will contact you shortly to discuss your specific needs and help you get started.
          </Text>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>
              Contact us at support@chatsites.ai for immediate assistance
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};