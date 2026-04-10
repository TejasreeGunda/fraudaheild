import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { fraudDistribution } from "@/lib/mockData";

export default function FraudDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">Fraud vs Genuine Distribution</h3>
      <p className="text-sm text-muted-foreground mb-4">Only <span className="text-destructive font-bold">0.17%</span> of transactions are fraudulent</p>
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={fraudDistribution}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationBegin={200}
              animationDuration={1200}
            >
              {fraudDistribution.map((entry, index) => (
                <Cell key={index} fill={entry.fill} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold text-foreground">284,807</span>
          <span className="text-xs text-muted-foreground">Total Txns</span>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        {fraudDistribution.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ background: d.fill }} />
            <span className="text-sm text-muted-foreground">{d.name}: <span className="text-foreground font-medium">{d.count.toLocaleString()}</span></span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
