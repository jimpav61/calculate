import { ProspectTable } from "./ProspectTable";
import { useProspects } from "./useProspects";
import { PreviewReportDialog } from "./PreviewReportDialog";

export const AdminCRM = () => {
  const {
    prospects,
    loading,
    selectedProspect,
    newCostPerMinute,
    sending,
    showPreview,
    setSelectedProspect,
    setNewCostPerMinute,
    setShowPreview,
    handleSendReport,
  } = useProspects();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-500">Loading prospects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-semibold">CRM Dashboard</h2>
      
      {prospects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No prospects yet</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <ProspectTable
            prospects={prospects}
            selectedProspect={selectedProspect}
            newCostPerMinute={newCostPerMinute}
            sending={sending}
            showPreview={showPreview}
            onSelectProspect={setSelectedProspect}
            onCostPerMinuteChange={setNewCostPerMinute}
            onShowPreview={setShowPreview}
            onSendReport={handleSendReport}
          />
        </div>
      )}

      {selectedProspect && showPreview && (
        <PreviewReportDialog
          open={showPreview}
          onOpenChange={setShowPreview}
          prospect={selectedProspect}
          newCostPerMinute={Number(newCostPerMinute)}
        />
      )}
    </div>
  );
};