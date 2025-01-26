import { AdminStats } from "@/components/admin/AdminStats";
import { AdminPricing } from "@/components/admin/AdminPricing";
import { AdminSubmissions } from "@/components/admin/AdminSubmissions";
import { AdminCRM } from "@/components/admin/AdminCRM";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { loading, handleSignOut } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <AdminHeader onSignOut={handleSignOut} />
        
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <AdminStats />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <AdminPricing />
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <AdminSubmissions />
          </TabsContent>

          <TabsContent value="crm" className="space-y-6">
            <AdminCRM />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;