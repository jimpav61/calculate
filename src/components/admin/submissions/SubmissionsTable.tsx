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
    
    // Remove all non-numeric characters for the tel: link
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (type === 'call') {
      window.location.href = `tel:+1${cleanPhone}`;
    } else {
      toast.info("AI calling feature coming soon!");
    }
  };

  const formatPhoneCell = (phone: string | null) => {
    if (!phone) return '-';

    // Ensure phone number is in the correct format
    const formatPhoneDisplay = (phoneNumber: string) => {
      // Remove all non-numeric characters
      const cleaned = phoneNumber.replace(/\D/g, '');
      
      // Take only the last 10 digits if there are more
      const last10Digits = cleaned.slice(-10);
      
      // Format the number
      return `+1 ${last10Digits.slice(0,3)} ${last10Digits.slice(3,6)} ${last10Digits.slice(6)}`;
    };

    const formattedPhone = formatPhoneDisplay(phone);

    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 p-0"
          onClick={() => handlePhoneClick(formattedPhone, 'call')}
        >
          <Phone className="h-4 w-4 mr-1" />
          {formattedPhone}
        </Button>
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Company</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Phone</TableHead>
            <TableHead className="whitespace-nowrap">Website</TableHead>
            <TableHead className="text-right whitespace-nowrap">Minutes</TableHead>
            <TableHead className="text-right whitespace-nowrap">Cost/Min ($)</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="whitespace-nowrap">{row.client_name}</TableCell>
              <TableCell className="whitespace-nowrap">{row.company_name}</TableCell>
              <TableCell className="font-mono break-all">{row.email}</TableCell>
              <TableCell className="whitespace-nowrap">{formatPhoneCell(row.phone)}</TableCell>
              <TableCell className="break-all">{formatWebsiteUrl(row.website)}</TableCell>
              <TableCell className="text-right whitespace-nowrap">{row.minutes.toLocaleString()}</TableCell>
              <TableCell className="text-right whitespace-nowrap">${row.cost_per_minute.toFixed(2)}</TableCell>
              <TableCell className="whitespace-nowrap">{new Date(row.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};