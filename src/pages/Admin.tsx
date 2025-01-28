import { AdminCRM } from "@/components/admin/AdminCRM";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPricing } from "@/components/admin/AdminPricing";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminSubmissions } from "@/components/admin/AdminSubmissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/components/admin/useAdminAuth";

const Admin = () => {
  const navigate = useNavigate();
  const { loading, handleSignOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-2 sm:p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
        <AdminHeader onSignOut={handleSignOut} />
        
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 overflow-hidden">
          <Tabs defaultValue="submissions" className="w-full">
            <TabsList className="w-full max-w-full overflow-x-auto flex-nowrap mb-4 sm:mb-6 gap-2 p-1">
              <TabsTrigger value="submissions" className="flex-shrink-0">Submissions</TabsTrigger>
              <TabsTrigger value="crm" className="flex-shrink-0">CRM</TabsTrigger>
              <TabsTrigger value="pricing" className="flex-shrink-0">Pricing</TabsTrigger>
              <TabsTrigger value="stats" className="flex-shrink-0">Stats</TabsTrigger>
            </TabsList>
            
            <div className="overflow-x-auto">
              <TabsContent value="submissions" className="mt-0">
                <AdminSubmissions />
              </TabsContent>
              
              <TabsContent value="crm" className="mt-0">
                <AdminCRM />
              </TabsContent>
              
              <TabsContent value="pricing" className="mt-0">
                <AdminPricing />
              </TabsContent>
              
              <TabsContent value="stats" className="mt-0">
                <AdminStats />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;