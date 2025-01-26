import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClientPricing {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  minutes: number;
  cost_per_minute: number;
  created_at: string;
}

export const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<ClientPricing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('client_pricing')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error: any) {
      toast.error("Failed to load submissions");
      console.error("Error fetching submissions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      // Convert submissions to CSV format
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

      // Create and download CSV file
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-500">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Client Submissions</h2>
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No submissions yet</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Website</TableHead>
                <TableHead className="text-right">Minutes</TableHead>
                <TableHead className="text-right">Cost/Min ($)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.client_name}</TableCell>
                  <TableCell>{row.company_name}</TableCell>
                  <TableCell className="font-mono">{row.email}</TableCell>
                  <TableCell>{row.phone || '-'}</TableCell>
                  <TableCell>{row.website || '-'}</TableCell>
                  <TableCell className="text-right">{row.minutes.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${row.cost_per_minute.toFixed(2)}</TableCell>
                  <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};