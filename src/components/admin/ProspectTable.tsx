import { Table, TableBody } from "@/components/ui/table";
import { Prospect } from "./types";
import { ProspectTableHeader } from "./prospects/ProspectTableHeader";
import { ProspectRow } from "./prospects/ProspectRow";

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
    <div className="border rounded-lg overflow-x-auto w-full">
      <div className="min-w-[800px]">
        <Table>
          <ProspectTableHeader />
          <TableBody>
            {prospects.map((prospect) => (
              <ProspectRow
                key={prospect.id}
                prospect={prospect}
                selectedProspect={selectedProspect}
                newCostPerMinute={newCostPerMinute}
                sending={sending}
                onCostPerMinuteChange={onCostPerMinuteChange}
                onShowPreview={onShowPreview}
                onSendReport={onSendReport}
                onSelectProspect={onSelectProspect}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};