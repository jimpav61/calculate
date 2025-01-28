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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <AdminHeader onSignOut={handleSignOut} />
        
        <div className="w-full overflow-x-auto">
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="w-full flex-wrap justify-start">
              <TabsTrigger value="stats" className="flex-shrink-0">Statistics</TabsTrigger>
              <TabsTrigger value="pricing" className="flex-shrink-0">Pricing</TabsTrigger>
              <TabsTrigger value="submissions" className="flex-shrink-0">Submissions</TabsTrigger>
              <TabsTrigger value="crm" className="flex-shrink-0">CRM</TabsTrigger>
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
    </div>
  );
};

export default Admin;