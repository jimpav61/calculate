import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Prospect } from "../types";

interface ProspectActionsProps {
  prospect: Prospect;
  selectedProspect: Prospect | null;
  newCostPerMinute: number | '';
  sending: boolean;
  onCostPerMinuteChange: (value: number) => void;
  onShowPreview: (show: boolean) => void;
  onSendReport: (prospect: Prospect) => void;
  onSelectProspect: (prospect: Prospect | null) => void;
}

export const ProspectActions = ({
  prospect,
  selectedProspect,
  newCostPerMinute,
  sending,
  onCostPerMinuteChange,
  onShowPreview,
  onSendReport,
  onSelectProspect,
}: ProspectActionsProps) => {
  if (selectedProspect?.id === prospect.id) {
    return (
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
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => onSelectProspect(prospect)}
      size="sm"
    >
      Update & Send
    </Button>
  );
};