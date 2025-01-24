import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ProspectTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead className="text-right">Minutes</TableHead>
        <TableHead className="text-right">Individual Cost/Min</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};