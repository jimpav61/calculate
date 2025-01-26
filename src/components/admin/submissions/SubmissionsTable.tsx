import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientPricing } from "../types";
import { ExternalLink, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SubmissionsTableProps {
  submissions: ClientPricing[];
}

export const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  const formatWebsiteUrl = (url: string | null) => {
    if (!url) return '-';
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

  const handlePhoneClick = (phone: string | null, type: 'call' | 'ai') => {
    if (!phone) return;
    
    // Remove all non-numeric characters except plus sign for the tel: link
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    if (type === 'call') {
      window.location.href = `tel:${cleanPhone}`;
    } else {
      toast.info("AI calling feature coming soon!");
    }
  };

  const formatPhoneCell = (phone: string | null) => {
    if (!phone) return '-';
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 p-0"
          onClick={() => handlePhoneClick(phone, 'call')}
        >
          <Phone className="h-4 w-4 mr-1" />
          {phone}
        </Button>
      </div>
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
              <TableCell>{formatPhoneCell(row.phone)}</TableCell>
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