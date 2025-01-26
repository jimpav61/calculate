import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { ClientPricing } from "../types";

interface ExportButtonProps {
  submissions: ClientPricing[];
}

export const ExportButton = ({ submissions }: ExportButtonProps) => {
  const handleExport = () => {
    try {
      const headers = ['Name', 'Company', 'Email', 'Phone', 'Website', 'Minutes', 'Cost/Min', 'Date'];
      const csvContent = [
        headers.join(','),
        ...submissions.map(row => [
          row.client_name,
          row.company_name,
          row.email,
          row.phone || '',
          row.website || '',
          row.minutes,
          row.cost_per_minute,
          new Date(row.created_at).toLocaleDateString()
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `client-submissions-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Export completed successfully");
    } catch (error) {
      toast.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  return (
    <Button onClick={handleExport} variant="outline" className="gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
};