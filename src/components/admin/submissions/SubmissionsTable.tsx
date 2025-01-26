import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientPricing } from "../types";
import { ExternalLink } from "lucide-react";

interface SubmissionsTableProps {
  submissions: ClientPricing[];
}

export const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  const formatWebsiteUrl = (url: string | null) => {
    if (!url) return '-';
    // Add https:// if not present
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    return (
      <a 
        href={fullUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
      >
        {url}
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  };

  return (
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
              <TableCell>{formatWebsiteUrl(row.website)}</TableCell>
              <TableCell className="text-right">{row.minutes.toLocaleString()}</TableCell>
              <TableCell className="text-right">${row.cost_per_minute.toFixed(2)}</TableCell>
              <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};