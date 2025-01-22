import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Prospect } from "./types";

interface ProspectTableProps {
  prospects: Prospect[];
  selectedProspect: Prospect | null;
  newCostPerMinute: number | '';
  sending: boolean;
  showPreview: boolean;
  onSelectProspect: (prospect: Prospect | null) => void;
  onCostPerMinuteChange: (value: number) => void;
  onShowPreview: (show: boolean) => void;
  onSendReport: (prospect: Prospect) => void;
}

export const ProspectTable = ({
  prospects,
  selectedProspect,
  newCostPerMinute,
  sending,
  showPreview,
  onSelectProspect,
  onCostPerMinuteChange,
  onShowPreview,
  onSendReport,
}: ProspectTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Minutes</TableHead>
            <TableHead className="text-right">Current Cost/Min</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.map((prospect) => (
            <TableRow key={prospect.id}>
              <TableCell>{prospect.client_name}</TableCell>
              <TableCell>{prospect.company_name}</TableCell>
              <TableCell className="font-mono">{prospect.email}</TableCell>
              <TableCell>{prospect.phone || '-'}</TableCell>
              <TableCell className="text-right">{prospect.minutes.toLocaleString()}</TableCell>
              <TableCell className="text-right">${prospect.cost_per_minute.toFixed(2)}</TableCell>
              <TableCell>
                {selectedProspect?.id === prospect.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="New cost/min"
                      value={newCostPerMinute}
                      onChange={(e) => onCostPerMinuteChange(Number(e.target.value))}
                      className="w-24"
                    />
                    <Button 
                      onClick={() => onShowPreview(true)}
                      disabled={!newCostPerMinute}
                      size="sm"
                    >
                      Preview
                    </Button>
                    <Button 
                      onClick={() => onSendReport(prospect)}
                      disabled={sending || !newCostPerMinute}
                      size="sm"
                    >
                      {sending ? "Sending..." : "Send"}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onSelectProspect(null);
                        onShowPreview(false);
                      }}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => onSelectProspect(prospect)}
                    size="sm"
                  >
                    Update & Send
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};