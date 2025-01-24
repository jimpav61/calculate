import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Prospect } from "../types";

interface ProspectRowProps {
  prospect: Prospect;
  selectedProspect: Prospect | null;
  newCostPerMinute: number | '';
  sending: boolean;
  onSelectProspect: (prospect: Prospect | null) => void;
  onCostPerMinuteChange: (value: number) => void;
  onShowPreview: (show: boolean) => void;
  onSendReport: (prospect: Prospect) => void;
}

export const ProspectRow = ({
  prospect,
  selectedProspect,
  newCostPerMinute,
  sending,
  onSelectProspect,
  onCostPerMinuteChange,
  onShowPreview,
  onSendReport,
}: ProspectRowProps) => {
  const isSelected = selectedProspect?.id === prospect.id;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onCostPerMinuteChange(value);
      onSelectProspect(prospect);
    }
  };

  const handlePreview = () => {
    if (!newCostPerMinute) {
      onCostPerMinuteChange(prospect.cost_per_minute);
    }
    onSelectProspect(prospect);
    onShowPreview(true);
  };

  return (
    <TableRow>
      <TableCell>{prospect.client_name}</TableCell>
      <TableCell>{prospect.company_name}</TableCell>
      <TableCell>{prospect.email}</TableCell>
      <TableCell>{prospect.minutes.toLocaleString()}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span>${prospect.cost_per_minute.toFixed(2)}</span>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="New price"
            value={isSelected ? newCostPerMinute : ''}
            onChange={handlePriceChange}
            className="w-24"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            disabled={sending}
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onSendReport(prospect)}
            disabled={!isSelected || sending || !newCostPerMinute}
          >
            {sending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};