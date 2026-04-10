import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { timeSeriesData } from "@/lib/mockData";

export default function TimeSeriesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">Transaction Volume & Fraud Trends</h3>
      <p className="text-sm text-muted-foreground mb-4">30-day overview</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeSeriesData}>
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradFraud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} interval={4} />
            <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
            <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
            <Area type="monotone" dataKey="total" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#gradTotal)" strokeWidth={2} />
            <Area type="monotone" dataKey="fraud" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#gradFraud)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
