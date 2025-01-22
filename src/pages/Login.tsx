import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First check if the email is in admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')  // Changed from just 'email' to '*' to get full row
        .eq('email', email.toLowerCase().trim())  // Normalize email
        .single();

      console.log('Admin check result:', { adminUser, adminError });

      if (adminError) {
        console.error('Admin check error:', adminError);
        toast({
          title: "Error",
          description: "Failed to verify admin status. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!adminUser) {
        console.log('Access denied - Email not found in admin_users:', email);
        toast({
          title: "Access Denied",
          description: "Only admin users can log in to this application.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // If we get here, the user is an admin
      console.log('Admin access granted for:', email);

      // Send magic link with explicit redirect URL
      const redirectTo = new URL('/admin', window.location.origin).toString();
      console.log('Redirect URL:', redirectTo);

      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase().trim(),
        options: {
          emailRedirectTo: redirectTo,
          data: {
            role: 'admin',
            admin_id: adminUser.id // Include admin ID in the JWT claims
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      toast({
        title: "Check your email",
        description: "We've sent you a magic link to log in.",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
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