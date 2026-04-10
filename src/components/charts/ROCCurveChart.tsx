import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { rocCurveData } from "@/lib/mockData";

export default function ROCCurveChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">ROC Curve — Model Comparison</h3>
      <p className="text-sm text-muted-foreground mb-4">XGBoost achieves <span className="text-success font-semibold">AUC = 0.994</span></p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rocCurveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis dataKey="fpr" label={{ value: "False Positive Rate", position: "bottom", fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <YAxis label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
            <Legend wrapperStyle={{ color: "hsl(215, 20%, 55%)" }} />
            <Line type="monotone" dataKey="random" name="Random (0.5)" stroke="hsl(215, 20%, 35%)" strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="lr" name="Logistic (0.943)" stroke="hsl(215, 20%, 55%)" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="rf" name="Random Forest (0.982)" stroke="hsl(199, 89%, 48%)" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="xgb" name="XGBoost (0.994)" stroke="hsl(160, 84%, 39%)" dot={false} strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
