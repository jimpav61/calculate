import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./report/ReportPDF";
import { Loader2 } from "lucide-react";

export const IntroductionStep = () => {
  const sampleData = {
    name: "John Smith",
    companyName: "Tech Solutions Inc.",
    email: "john@techsolutions.com",
    phone: "(555) 123-4567",
    minutes: 1000
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <Card className="p-4 sm:p-6 text-left space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">How Voice AI Pricing Works</h2>
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
          <p>
            Our Voice AI pricing is simple and transparent. You only pay for the minutes you use:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pay per minute of voice AI interaction</li>
            <li>No hidden fees or setup costs</li>
            <li>Scale up or down based on your needs</li>
            <li>Premium voice quality and natural conversations</li>
          </ul>
          <p className="mt-3 sm:mt-4 font-medium">
            Ready to get started? Click Next to calculate your estimated costs.
          </p>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 text-left space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Sample Cost Report</h3>
        <p className="text-sm text-gray-600">Download a sample report to see how our pricing works:</p>
        
        <div className="flex justify-start">
          <PDFDownloadLink
            document={<ReportPDF formData={sampleData} costPerMinute={0.05} />}
            fileName="sample-voice-ai-cost-report.pdf"
          >
            {({ loading }) => (
              <Button
                className="bg-brand hover:bg-brand-dark text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Sample PDF...
                  </>
                ) : (
                  "Download Sample Report"
                )}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </Card>
    </div>
  );
};