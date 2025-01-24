import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QIFqPfE.woff2', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QYFqPfE.woff2', fontWeight: 'bold' }
  ]
});

export const styles = StyleSheet.create({
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