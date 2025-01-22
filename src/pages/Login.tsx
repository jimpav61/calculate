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
      console.log('Attempting login for email:', normalizedEmail);

      // First check if the email is in admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

      console.log('Admin check query result:', { adminUser, adminError });

      if (adminError) {
        console.error('Admin check error:', adminError);
        toast.error("Failed to verify admin status. Please try again.");
        return;
      }

      if (!adminUser) {
        console.log('Access denied - Email not found in admin_users:', normalizedEmail);
        toast.error("Only admin users can log in to this application.");
        return;
      }

      console.log('Admin user found:', adminUser);

      // Send magic link with explicit redirect URL
      const redirectUrl = `${window.location.origin}/admin`;
      console.log('Using redirect URL:', redirectUrl);

      const { data: authData, error: authError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: redirectUrl,
        }
      });

      console.log('Magic link request result:', { authData, authError });

      if (authError) {
        console.error('Auth error:', authError);
        toast.error(authError.message || "Error sending magic link");
        return;
      }

      toast.success("Check your email for the magic link!");
      console.log('Magic link sent successfully to:', normalizedEmail);

    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "An error occurred during login");
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