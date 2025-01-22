import { Card } from "@/components/ui/card";
import { AdminPricing } from "@/components/admin/AdminPricing";
import { AdminSubmissions } from "@/components/admin/AdminSubmissions";
import { AdminStats } from "@/components/admin/AdminStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      toast({
        title: "Configuration Error",
        description: "Please connect your project to Supabase to use the admin dashboard",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    checkUser(supabase);
  }, []);

  const checkUser = async (supabase: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Access Denied",
          description: "Please sign in to access the admin dashboard",
          variant: "destructive",
        });
        navigate("/");
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabaseUrl || !supabaseAnonKey) return;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>
      
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