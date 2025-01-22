import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./report/ReportPDF";
import { Loader2 } from "lucide-react";

interface DetailedReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    minutes: number;
  };
  costPerMinute: number;
}

export function DetailedReportDialog({
  open,
  onOpenChange,
  formData,
  costPerMinute,
}: DetailedReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Your Detailed Cost Report</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Download your personalized Voice AI cost analysis report
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
              <h3 className="text-base sm:text-lg font-medium mb-3">Report Summary</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <span className="text-gray-600">Name:</span>{" "}
                  <span className="font-medium">{formData.name}</span>
                </p>
                <p>
                  <span className="text-gray-600">Company:</span>{" "}
                  <span className="font-medium">{formData.companyName}</span>
                </p>
                <p>
                  <span className="text-gray-600">Monthly Minutes:</span>{" "}
                  <span className="font-medium">{formData.minutes}</span>
                </p>
                <p>
                  <span className="text-gray-600">Monthly Cost:</span>{" "}
                  <span className="font-medium">
                    ${(formData.minutes * costPerMinute).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <PDFDownloadLink
                document={<ReportPDF formData={formData} costPerMinute={costPerMinute} />}
                fileName="voice-ai-cost-report.pdf"
                className="w-full"
              >
                {({ loading }) => (
                  <Button
                    className="w-full bg-brand hover:bg-brand-dark text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      "Download PDF Report"
                    )}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};