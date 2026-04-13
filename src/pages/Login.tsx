import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signInAsGuest } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/");
    }
  };

  const handleGuestLogin = () => {
    signInAsGuest();
    toast({ title: "Welcome, Guest!", description: "You're browsing in guest mode." });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative glass-card p-8 w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center neon-glow"
          >
            <Shield className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your FraudShield account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10 bg-muted/50 border-border h-12"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-muted/50 border-border h-12"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? (
              <div className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Signing in...</div>
            ) : (
              <div className="flex items-center gap-2">Sign In <ArrowRight className="h-4 w-4" /></div>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or</span></div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGuestLogin}
          className="w-full h-12 text-base font-semibold border-border bg-muted/30 text-foreground hover:bg-muted/60 hover:border-primary/40"
        >
          <div className="flex items-center gap-2"><UserCheck className="h-4 w-4" /> Continue as Guest</div>
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-medium">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
