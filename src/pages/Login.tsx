import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("jimmy.pavlatos@gmail.com");
  const [loading, setLoading] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          return;
        }

        if (session?.user) {
          const { data: adminUser, error: adminError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .single();

          if (adminError) {
            console.error('Admin check error:', adminError);
            toast.error("Error verifying admin status");
            await supabase.auth.signOut();
            return;
          }

          if (adminUser) {
            console.log('Admin user found, redirecting to admin');
            navigate('/admin');
          } else {
            console.log('Not an admin user');
            toast.error("Access denied. Only admin users can access this page.");
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setInitialCheckDone(true);
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);

      if (event === 'SIGNED_IN' && session) {
        try {
          const { data: adminUser, error: adminError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .single();

          if (adminError) {
            console.error('Admin check error:', adminError);
            toast.error("Error verifying admin status");
            await supabase.auth.signOut();
            return;
          }

          if (adminUser) {
            console.log('Admin user found, redirecting to admin');
            navigate('/admin');
          } else {
            console.log('Not an admin user');
            toast.error("Access denied. Only admin users can access this page.");
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error('Error during auth state change:', error);
          toast.error("An error occurred during authentication");
          await supabase.auth.signOut();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase().trim(),
      });

      if (error) {
        console.error('Login error:', error);
        toast.error(error.message || "Failed to send magic link");
        return;
      }

      toast.success("Magic link sent! Check your email.");
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!initialCheckDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600">Enter your email to receive a magic link</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending magic link..." : "Send Magic Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;