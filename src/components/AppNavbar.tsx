import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield, BarChart3, Search, Radio, TrendingUp, History, Settings } from "lucide-react";
import { motion } from "framer-motion";
import NotificationCenter from "@/components/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/analyzer", label: "Analyzer", icon: Search },
  { to: "/history", label: "History", icon: History },
  { to: "/insights", label: "Insights", icon: TrendingUp },
  { to: "/simulation", label: "Live", icon: Radio },
];

export default function AppNavbar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <RouterNavLink to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Shield className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/30" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:inline">FraudShield</span>
          </RouterNavLink>

          <div className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <RouterNavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <item.icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10 hidden md:inline">{item.label}</span>
                </RouterNavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <NotificationCenter />
            <RouterNavLink
              to="/settings"
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                location.pathname === "/settings" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Settings className="h-5 w-5" />
            </RouterNavLink>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
}
