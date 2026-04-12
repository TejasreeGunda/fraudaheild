import { motion } from "framer-motion";
import FraudDistributionChart from "@/components/charts/FraudDistributionChart";
import TransactionScatterChart from "@/components/charts/TransactionScatterChart";
import ModelComparisonChart from "@/components/charts/ModelComparisonChart";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  return (
    <div className="page-container pt-24 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Analytics & Charts</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Visual analysis of transaction patterns, fraud distribution, and model performance trends.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FraudDistributionChart />
        <TransactionScatterChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModelComparisonChart />
        <TimeSeriesChart />
      </div>
    </div>
  );
}
