import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('Checking session:', { session, sessionError });

        if (!session) {
          console.log('No session found, redirecting to login');
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
          return;
        }

        if (!adminUser) {
          console.log('Not an admin user:', session.user.email);
          toast.error("Access denied. Only admin users can access this page.");
          return;
        }

        console.log('Admin access granted for:', session.user.email);
        navigate('/admin');
      } catch (error) {
        console.error('Admin check error:', error);
        toast.error("Error checking admin status");
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);

      if (event === 'SIGNED_IN' && session?.user?.email) {
        try {
          const { data: adminUser } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .maybeSingle();

          console.log("Admin check after sign in:", { adminUser });

          if (adminUser) {
            console.log("Admin user found after sign in, redirecting to admin");
            navigate('/admin');
          } else {
            console.log("Not an admin user");
            toast.error("Access denied. Only admin users can access this page.");
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error("Admin check error:", error);
          toast.error("Error checking admin status");
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error);
        if (error.message.includes('rate limit')) {
          toast.error("Too many attempts. Please wait a few minutes before trying again. If you need immediate assistance, please contact support.");
        } else {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-gray-600">Please enter your credentials</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Having trouble? Contact support for assistance.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;