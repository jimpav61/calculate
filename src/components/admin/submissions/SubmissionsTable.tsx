import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientPricing } from "../types";

interface SubmissionsTableProps {
  submissions: ClientPricing[];
}

export const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
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
              <TableCell>{row.website || '-'}</TableCell>
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