import { Shield, AlertTriangle, Activity, DollarSign, Eye, BarChart3, Building2, Bell, MapPin, Brain, ShieldCheck, Bot } from "lucide-react";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/analytics", icon: BarChart3, label: "Analytics & Charts", desc: "Fraud distribution, patterns, model comparisons" },
  { to: "/bank-account", icon: Building2, label: "Bank Accounts", desc: "Link and monitor bank accounts" },
  { to: "/smart-alerts", icon: Bell, label: "Smart Alerts", desc: "Email, SMS, and in-app notifications" },
  { to: "/location", icon: MapPin, label: "Location Detection", desc: "Impossible travel & unusual locations" },
  { to: "/behavioral", icon: Brain, label: "Behavioral Analysis", desc: "Spending habits & pattern deviations" },
  { to: "/explainable-ai", icon: Eye, label: "Explainable AI", desc: "Why transactions are flagged" },
  { to: "/user-actions", icon: ShieldCheck, label: "User Actions", desc: "Approve, report, or block transactions" },
  { to: "/ai-chatbot", icon: Bot, label: "AI Assistant", desc: "Chat with FraudShield AI" },
];

export default function Dashboard() {
  return (
    <div className="page-container pt-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 mb-6">
        <h1 className="text-4xl font-bold gradient-text">Fraud Detection Intelligence</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          <span className="text-foreground font-semibold">99.83%</span> of transactions are genuine, but the remaining{" "}
          <span className="text-destructive font-semibold">0.17%</span> causes millions in losses.
          Our AI catches fraud before it impacts you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Transactions" value="284,807" icon={Activity} variant="primary" delay={0.1} trend={{ value: 12.5, label: "vs last month" }} />
        <StatCard title="Fraud Detected" value="492" icon={AlertTriangle} variant="destructive" delay={0.15} subtitle="Real-time detection active" />
        <StatCard title="Amount Protected" value="$2.1M" icon={DollarSign} variant="success" delay={0.2} trend={{ value: 8.3, label: "saved this quarter" }} />
        <StatCard title="Accuracy" value="99.8%" icon={Shield} variant="primary" delay={0.25} subtitle="XGBoost — Best performer" />
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickLinks.map((link, i) => (
          <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.04 }}>
            <Link to={link.to} className="glass-card-hover p-4 flex items-start gap-3 group block h-full">
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <link.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="glass-card p-8 text-center neon-glow">
        <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
        <h2 className="text-xl font-bold text-foreground mb-2">AI Protects Financial Systems</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Machine learning models detect fraudulent patterns in milliseconds, protecting millions of transactions daily.
          Our XGBoost model achieves <span className="text-success font-semibold">89.1% recall</span> — catching 9 out of 10 fraud cases.
        </p>
      </motion.div>
    </div>
  );
}
