import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#374151',
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  subsection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1a56db',
    fontFamily: 'Helvetica-Bold',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 8,
    color: '#374151',
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4b5563',
  },
  bullet: {
    fontSize: 12,
    marginBottom: 4,
    color: '#4b5563',
  },
  grid: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  footnote: {
    fontSize: 10,
    marginTop: 10,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  costSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 4,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  costLabel: {
    fontSize: 12,
    color: '#4b5563',
  },
  costValue: {
    fontSize: 12,
    color: '#4b5563',
    fontFamily: 'Helvetica-Bold',
  },
  packageTitle: {
    fontSize: 16,
    color: '#ef4444',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  packageSubtitle: {
    fontSize: 12,
    color: '#ef4444',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#4b5563',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
});