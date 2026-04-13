import { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield, BarChart3, Search, Radio, TrendingUp, History, Settings, PieChart, Building2, Bell, MapPin, Brain, Eye, ShieldCheck, Bot, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationCenter from "@/components/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/analytics", label: "Analytics", icon: PieChart },
  { to: "/analyzer", label: "Analyzer", icon: Search },
  { to: "/history", label: "History", icon: History },
  { to: "/insights", label: "Models", icon: TrendingUp },
  { to: "/simulation", label: "Live", icon: Radio },
  { to: "/bank-account", label: "Bank", icon: Building2 },
  { to: "/smart-alerts", label: "Alerts", icon: Bell },
  { to: "/location", label: "Location", icon: MapPin },
  { to: "/behavioral", label: "Behavior", icon: Brain },
  { to: "/explainable-ai", label: "XAI", icon: Eye },
  { to: "/user-actions", label: "Actions", icon: ShieldCheck },
  { to: "/ai-chatbot", label: "AI Chat", icon: Bot },
];

export default function AppNavbar() {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <RouterNavLink to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/30" />
            </div>
            <span className="text-base font-bold gradient-text hidden sm:inline">FraudShield</span>
          </RouterNavLink>

          {/* Desktop nav - scrollable */}
          <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto max-w-[700px] scrollbar-hide">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <RouterNavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <item.icon className="h-3.5 w-3.5 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </RouterNavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <NotificationCenter />
            <RouterNavLink
              to="/settings"
              className={cn(
                "p-1.5 rounded-lg transition-all duration-200",
                location.pathname === "/settings" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Settings className="h-4 w-4" />
            </RouterNavLink>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border/50 bg-card"
          >
            <div className="grid grid-cols-3 gap-1 p-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <RouterNavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors",
                      isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </RouterNavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
