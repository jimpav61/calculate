import { Card } from "@/components/ui/card";
import { AdminPricing } from "@/components/admin/AdminPricing";
import { AdminSubmissions } from "@/components/admin/AdminSubmissions";
import { AdminStats } from "@/components/admin/AdminStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="pricing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pricing">Pricing Settings</TabsTrigger>
          <TabsTrigger value="submissions">User Submissions</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing">
          <Card className="p-6">
            <AdminPricing />
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card className="p-6">
            <AdminSubmissions />
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card className="p-6">
            <AdminStats />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;