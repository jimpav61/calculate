import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("jimmy.pavlatos@gmail.com");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Starting login process...');

    try {
      // Step 1: Normalize email
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Checking admin status for:', normalizedEmail);

      // Step 2: Query admin_users table
      const { data: adminUsers, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', normalizedEmail);

      console.log('Admin query result:', { adminUsers, adminError });

      if (adminError) {
        console.error('Admin check failed:', adminError);
        toast.error("Error verifying admin status");
        return;
      }

      // Check if the email exists in admin_users
      if (!adminUsers || adminUsers.length === 0) {
        console.log('Access denied: Not an admin user');
        toast.error("Access denied. Only admin users can access this application.");
        return;
      }

      console.log('Admin access granted for:', normalizedEmail);

      // Step 3: Send magic link
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        }
      });

      if (signInError) {
        console.error('Magic link error:', signInError);
        toast.error(signInError.message);
        return;
      }

      console.log('Magic link sent successfully');
      toast.success("Magic link sent! Check your email.");

    } catch (error: any) {
      console.error('Login process failed:', error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
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
      </Card>
    </div>
  );
};

export default Login;