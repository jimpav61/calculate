import { TableCell, TableRow } from "@/components/ui/table";
import { Prospect } from "../types";
import { ProspectActions } from "./ProspectActions";

interface ProspectRowProps {
  prospect: Prospect;
  selectedProspect: Prospect | null;
  newCostPerMinute: number | '';
  sending: boolean;
  onCostPerMinuteChange: (value: number) => void;
  onShowPreview: (show: boolean) => void;
  onSendReport: (prospect: Prospect) => void;
  onSelectProspect: (prospect: Prospect | null) => void;
}

export const ProspectRow = ({
  prospect,
  selectedProspect,
  newCostPerMinute,
  sending,
  onCostPerMinuteChange,
  onShowPreview,
  onSendReport,
  onSelectProspect,
}: ProspectRowProps) => {
  return (
    <TableRow key={prospect.id}>
      <TableCell>{prospect.client_name}</TableCell>
      <TableCell>{prospect.company_name}</TableCell>
      <TableCell className="font-mono">{prospect.email}</TableCell>
      <TableCell>{prospect.phone || '-'}</TableCell>
      <TableCell className="text-right">{prospect.minutes.toLocaleString()}</TableCell>
      <TableCell className="text-right">${prospect.cost_per_minute.toFixed(2)}</TableCell>
      <TableCell>
        <ProspectActions
          prospect={prospect}
          selectedProspect={selectedProspect}
          newCostPerMinute={newCostPerMinute}
          sending={sending}
          onCostPerMinuteChange={onCostPerMinuteChange}
          onShowPreview={onShowPreview}
          onSendReport={onSendReport}
          onSelectProspect={onSelectProspect}
        />
      </TableCell>
    </TableRow>
  );
};