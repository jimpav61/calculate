import { ExportButton } from "./submissions/ExportButton";
import { SubmissionsTable } from "./submissions/SubmissionsTable";
import { useSubmissions } from "./submissions/useSubmissions";

export const AdminSubmissions = () => {
  const { submissions, loading } = useSubmissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-500">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Client Submissions</h2>
        <ExportButton submissions={submissions} />
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No submissions yet</p>
        </div>
      ) : (
        <SubmissionsTable submissions={submissions} />
      )}
    </div>
  );
};