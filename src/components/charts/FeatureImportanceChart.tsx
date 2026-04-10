import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { featureImportance } from "@/lib/mockData";

export default function FeatureImportanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">Feature Importance (XGBoost)</h3>
      <p className="text-sm text-muted-foreground mb-4">Top features driving fraud predictions</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis type="number" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <YAxis type="category" dataKey="feature" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} width={60} />
            <Tooltip
              contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }}
              formatter={(v: number) => [(v * 100).toFixed(1) + "%"]}
            />
            <Bar dataKey="importance" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
