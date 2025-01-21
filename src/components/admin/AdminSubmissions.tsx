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

export const AdminSubmissions = () => {
  const mockData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      minutes: 1000,
      estimate: 50.00,
      date: "2024-02-20",
    },
    // Add more mock data as needed
  ];

  const handleExport = () => {
    // In a real app, this would export data to CSV
    console.log("Exporting data...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User Submissions</h2>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Minutes</TableHead>
            <TableHead>Estimate ($)</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.minutes}</TableCell>
              <TableCell>${row.estimate.toFixed(2)}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};