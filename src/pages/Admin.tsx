import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      // Check if the user is an admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', session.user.email)
        .maybeSingle();

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
      navigate("/login");
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || "Error signing out");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
        
        <div className="grid gap-6">
          {/* Add your admin features here */}
          <p>Welcome to the admin dashboard. More features coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;