import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Starting login process for:', normalizedEmail);

      // First check if the email is in admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('email', normalizedEmail)
        .single();

      console.log('Admin check result:', { adminUser, adminError });

      if (adminError) {
        console.error('Admin check error:', adminError);
        toast.error("Error verifying admin status. Please try again.");
        return;
      }

      if (!adminUser) {
        console.log('Not an admin user:', normalizedEmail);
        toast.error("Access denied. Only admin users can access this application.");
        return;
      }

      console.log('Admin user verified:', adminUser);

      // Get the current origin for the redirect URL
      const origin = window.location.origin;
      const redirectUrl = `${origin}/admin`;
      console.log('Redirect URL:', redirectUrl);

      const { data, error: signInError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: redirectUrl,
        }
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        toast.error(signInError.message);
        return;
      }

      console.log('Magic link sent successfully');
      toast.success("Check your email for the magic link!");

    } catch (error: any) {
      console.error('Login process error:', error);
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