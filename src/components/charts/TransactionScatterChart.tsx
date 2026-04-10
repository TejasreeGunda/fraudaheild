import { motion } from "framer-motion";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { transactionAmountData } from "@/lib/mockData";

export default function TransactionScatterChart() {
  const genuine = transactionAmountData.filter((d) => !d.isFraud);
  const fraud = transactionAmountData.filter((d) => d.isFraud);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">Transaction Amount vs Time</h3>
      <p className="text-sm text-muted-foreground mb-4">Fraud transactions cluster in <span className="text-warning font-semibold">low amounts</span></p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis dataKey="time" name="Time" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <YAxis dataKey="amount" name="Amount ($)" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <Tooltip
              contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }}
              formatter={(value: number) => [`$${value.toFixed(2)}`]}
            />
            <Scatter name="Genuine" data={genuine} fill="hsl(199, 89%, 48%)" opacity={0.4} />
            <Scatter name="Fraud" data={fraud} fill="hsl(0, 84%, 60%)" opacity={0.9} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
