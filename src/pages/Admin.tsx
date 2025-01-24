import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminPricing } from "@/components/admin/AdminPricing";
import { AdminSubmissions } from "@/components/admin/AdminSubmissions";
import { AdminCRM } from "@/components/admin/AdminCRM";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      console.log('Checking session:', { session, sessionError });

      if (!session) {
        console.log('No session found, redirecting to login');
        navigate("/login");
        return;
      }

      console.log('Session found for user:', session.user.email);

      // Check if the user is an admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', session.user.email)
        .maybeSingle();

      console.log('Admin check result:', { adminUser, adminError });

      if (adminError) {
        console.error('Admin check error:', adminError);
        toast.error("Error verifying admin status");
        navigate("/login");
        return;
      }

      if (!adminUser) {
        console.log('Not an admin user:', session.user.email);
        toast.error("Access denied. Only admin users can access this page.");
        navigate("/login");
        return;
      }

      console.log('Admin access granted for:', session.user.email);
      setLoading(false);
    } catch (error: any) {
      console.error('Admin check error:', error);
      toast.error("Error checking admin status");
      navigate("/login");
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/"); // Changed from "/login" to "/" to redirect to main app
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || "Error signing out");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>
        
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