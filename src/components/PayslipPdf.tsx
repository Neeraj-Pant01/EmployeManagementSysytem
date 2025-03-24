import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

interface Payslip {
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  taxBreakdown: { type: string; amount: number }[];
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  amount: { fontSize: 12, fontWeight: "bold" },
});

const PayslipPdf: React.FC<{ payslip: Payslip }> = ({ payslip }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Payslip - {payslip.month}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Base Salary: <Text style={styles.amount}>Rs {payslip.baseSalary}</Text></Text>
        <Text style={styles.text}>Bonus: <Text style={styles.amount}>Rs {payslip.bonus}</Text></Text>
        <Text style={styles.text}>Deductions: <Text style={styles.amount}>-Rs {payslip.deductions}</Text></Text>
        <Text style={styles.text}>Net Salary: <Text style={styles.amount}>Rs {payslip.netSalary}</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Tax & Deductions</Text>
        {payslip.taxBreakdown.map((tax, index) => (
          <Text key={index} style={styles.text}>
            {tax.type}: <Text style={styles.amount}>-Rs {tax.amount}</Text>
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PayslipPdf;
