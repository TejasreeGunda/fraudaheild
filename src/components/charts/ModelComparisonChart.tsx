import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { modelMetrics } from "@/lib/mockData";

const chartData = [
  { metric: "Accuracy", lr: modelMetrics.logisticRegression.accuracy, rf: modelMetrics.randomForest.accuracy, xgb: modelMetrics.xgboost.accuracy },
  { metric: "Precision", lr: modelMetrics.logisticRegression.precision, rf: modelMetrics.randomForest.precision, xgb: modelMetrics.xgboost.precision },
  { metric: "Recall ⭐", lr: modelMetrics.logisticRegression.recall, rf: modelMetrics.randomForest.recall, xgb: modelMetrics.xgboost.recall },
  { metric: "F1-Score", lr: modelMetrics.logisticRegression.f1, rf: modelMetrics.randomForest.f1, xgb: modelMetrics.xgboost.f1 },
];

export default function ModelComparisonChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">Model Performance Comparison</h3>
      <p className="text-sm text-muted-foreground mb-4">
        <span className="text-warning font-semibold">Recall</span> is the most important metric for fraud detection
      </p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis dataKey="metric" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <YAxis domain={[0, 1]} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <Tooltip
              contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }}
              formatter={(value: number) => [(value * 100).toFixed(1) + "%"]}
            />
            <Legend wrapperStyle={{ color: "hsl(215, 20%, 55%)" }} />
            <Bar dataKey="lr" name="Logistic Reg." fill="hsl(215, 20%, 55%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rf" name="Random Forest" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="xgb" name="XGBoost" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
