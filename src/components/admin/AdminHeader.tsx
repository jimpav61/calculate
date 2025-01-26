import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onSignOut: () => void;
}

export const AdminHeader = ({ onSignOut }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Button onClick={onSignOut} variant="outline">Sign Out</Button>
    </div>
  );
};