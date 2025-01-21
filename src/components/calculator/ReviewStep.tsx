import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFReport } from "@/utils/pdfGenerator";
import { Download } from "lucide-react";
import React from "react";

interface ReviewStepProps {
  formData: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    minutes: number;
  };
  costPerMinute: number;
}

export const ReviewStep = ({ formData, costPerMinute }: ReviewStepProps) => {
  const monthlyTotal = formData.minutes * costPerMinute;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 text-left space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Review Your Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{formData.companyName || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Pricing Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Minutes:</span>
                <span>{formData.minutes.toLocaleString()} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Cost per Minute:</span>
                <span>${costPerMinute.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Monthly Total:</span>
                  <span>${monthlyTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <PDFDownloadLink
          document={<PDFReport userData={formData} costPerMinute={costPerMinute} />}
          fileName={`voice-ai-estimate-${formData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`}
        >
          {({ loading }) => (
            <Button
              className="bg-brand hover:bg-brand-dark transition-colors"
              disabled={loading}
              type="button"
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? "Generating PDF..." : "Download PDF Report"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};