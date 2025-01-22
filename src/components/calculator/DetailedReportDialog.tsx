import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./report/ReportPDF";
import { CostAnalysis } from "./report/CostAnalysis";

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

export const DetailedReportDialog = ({
  open,
  onOpenChange,
  formData,
  costPerMinute,
}: DetailedReportDialogProps) => {
  const calculations = {
    standardAICost: formData.minutes * costPerMinute,
    premiumAICost: formData.minutes * (costPerMinute * 1.2),
    humanOperatorCost: formData.minutes * (costPerMinute * 1.5),
    standardSavings:
      formData.minutes * (costPerMinute * 1.5) - formData.minutes * costPerMinute,
    premiumSavings:
      formData.minutes * (costPerMinute * 1.5) -
      formData.minutes * (costPerMinute * 1.2),
    standardSavingsPercentage: (
      ((formData.minutes * (costPerMinute * 1.5) -
        formData.minutes * costPerMinute) /
        (formData.minutes * (costPerMinute * 1.5))) *
      100
    ).toFixed(1),
    premiumSavingsPercentage: (
      ((formData.minutes * (costPerMinute * 1.5) -
        formData.minutes * (costPerMinute * 1.2)) /
        (formData.minutes * (costPerMinute * 1.5))) *
      100
    ).toFixed(1),
    callMetrics: {
      humanCallsPerMonth: Math.floor((formData.minutes / 5) * 0.8),
      aiCallsPerMonth: Math.floor(formData.minutes / 5),
      aiSimultaneousCalls: Math.ceil(formData.minutes / (22 * 8 * 60)),
    },
  };

  const reportData = {
    formData,
    calculations,
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="space-y-6 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Detailed Cost Analysis</h2>
            <PDFDownloadLink
              document={<ReportPDF data={reportData} />}
              fileName={`voice-ai-report-${formData.name
                .toLowerCase()
                .replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading }) => (
                <Button disabled={loading}>
                  {loading ? "Generating PDF..." : "Download PDF Report"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>

          <CostAnalysis
            minutes={formData.minutes}
            standardAICost={calculations.standardAICost}
            premiumAICost={calculations.premiumAICost}
            humanOperatorCost={calculations.humanOperatorCost}
            standardSavings={calculations.standardSavings}
            premiumSavings={calculations.premiumSavings}
            standardSavingsPercentage={calculations.standardSavingsPercentage}
            premiumSavingsPercentage={calculations.premiumSavingsPercentage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};