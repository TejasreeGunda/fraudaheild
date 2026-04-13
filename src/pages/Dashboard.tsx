import { Shield, AlertTriangle, Activity, DollarSign, Eye, BarChart3 } from "lucide-react";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page-container pt-24 space-y-8">
      {/* Story Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 mb-10"
      >
        <h1 className="text-4xl font-bold gradient-text">Fraud Detection Intelligence</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          <span className="text-foreground font-semibold">99.83%</span> of transactions are genuine, but the remaining{" "}
          <span className="text-destructive font-semibold">0.17%</span> causes millions in losses.
          Our AI catches fraud before it impacts you.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Transactions" value="284,807" icon={Activity} variant="primary" delay={0.1} trend={{ value: 12.5, label: "vs last month" }} />
        <StatCard title="Fraud Detected" value="492" icon={AlertTriangle} variant="destructive" delay={0.15} subtitle="Real-time detection active" />
        <StatCard title="Amount Protected" value="$2.1M" icon={DollarSign} variant="success" delay={0.2} trend={{ value: 8.3, label: "saved this quarter" }} />
        <StatCard title="Accuracy" value="99.8%" icon={Shield} variant="primary" delay={0.25} subtitle="XGBoost — Best performer" />
      </div>

      {/* CTA to Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/analytics"
          className="glass-card-hover p-6 flex items-center justify-between group block"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/15">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">View Analytics & Charts</h3>
              <p className="text-sm text-muted-foreground">Explore fraud distribution, transaction patterns, and model comparisons</p>
            </div>
          </div>
          <span className="text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
            Open →
          </span>
        </Link>
      </motion.div>

      {/* Story Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-8 text-center neon-glow"
      >
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
