import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdminAuth = () => {
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
      await supabase.auth.signOut();
      console.log('Successfully signed out');
      navigate("/login");
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return { loading, handleSignOut };
};