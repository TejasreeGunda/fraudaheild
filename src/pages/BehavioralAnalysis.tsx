import { motion } from "framer-motion";
import { Brain, TrendingUp, Clock, ShoppingBag, AlertTriangle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { cn } from "@/lib/utils";

const spendingPatterns = [
  { day: "Mon", usual: 450, actual: 520 },
  { day: "Tue", usual: 380, actual: 410 },
  { day: "Wed", usual: 500, actual: 12500 },
  { day: "Thu", usual: 420, actual: 390 },
  { day: "Fri", usual: 600, actual: 650 },
  { day: "Sat", usual: 800, actual: 780 },
  { day: "Sun", usual: 350, actual: 300 },
];

const timePatterns = [
  { hour: "6am", normal: 12, current: 10 },
  { hour: "9am", normal: 35, current: 32 },
  { hour: "12pm", normal: 28, current: 30 },
  { hour: "3pm", normal: 22, current: 25 },
  { hour: "6pm", normal: 40, current: 38 },
  { hour: "9pm", normal: 18, current: 15 },
  { hour: "12am", normal: 5, current: 22 },
  { hour: "3am", normal: 2, current: 18 },
];

const merchantCategories = [
  { name: "Groceries", value: 35, fill: "hsl(160, 84%, 44%)" },
  { name: "Dining", value: 20, fill: "hsl(199, 89%, 52%)" },
  { name: "Shopping", value: 15, fill: "hsl(45, 93%, 52%)" },
  { name: "Transport", value: 12, fill: "hsl(280, 65%, 60%)" },
  { name: "Electronics", value: 8, fill: "hsl(0, 84%, 62%)" },
  { name: "Other", value: 10, fill: "hsl(215, 25%, 50%)" },
];

const deviations = [
  { id: "1", flag: "Spending Spike", desc: "User usually spends ₹500–₹2,000 → suddenly ₹50,000 at an electronics store", severity: "high", confidence: 94.2 },
  { id: "2", flag: "Unusual Time", desc: "Transaction at 3:15 AM — user has never transacted between 1 AM–5 AM", severity: "high", confidence: 88.7 },
  { id: "3", flag: "New Merchant Category", desc: "First-ever transaction at a cryptocurrency exchange", severity: "medium", confidence: 72.1 },
  { id: "4", flag: "Frequency Anomaly", desc: "15 transactions in 30 minutes — average is 2 per hour", severity: "high", confidence: 96.5 },
];

export default function BehavioralAnalysis() {
  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Behavioral Analysis</h1>
        </div>
        <p className="text-muted-foreground">AI learns user spending habits, transaction times, and merchant preferences to flag deviations</p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Pattern */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Spending Pattern (This Week)</h3>
          <p className="text-xs text-muted-foreground mb-4">⚠️ Wednesday anomaly: <span className="text-destructive font-semibold">₹12,500</span> vs usual ₹500</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingPatterns} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(215, 25%, 68%)", fontSize: 12 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
                <YAxis tick={{ fill: "hsl(215, 25%, 68%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
                <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                <Bar dataKey="usual" name="Usual" fill="hsl(215, 25%, 40%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="hsl(199, 89%, 52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Time Pattern */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Transaction Time Patterns</h3>
          <p className="text-xs text-muted-foreground mb-4">🚨 Late night activity spike at <span className="text-destructive font-semibold">12 AM–3 AM</span></p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timePatterns}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                <XAxis dataKey="hour" tick={{ fill: "hsl(215, 25%, 68%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
                <YAxis tick={{ fill: "hsl(215, 25%, 68%)", fontSize: 11 }} axisLine={{ stroke: "hsl(217, 33%, 17%)" }} />
                <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                <Line type="monotone" dataKey="normal" name="Normal Pattern" stroke="hsl(215, 25%, 50%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="current" name="Current" stroke="hsl(0, 84%, 62%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Merchant Categories */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Merchant Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={merchantCategories} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {merchantCategories.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Behavioral Deviations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground mb-2">🧠 Flagged Deviations</h3>
          {deviations.map((d) => (
            <div key={d.id} className={cn("p-3 rounded-lg border", d.severity === "high" ? "bg-destructive/5 border-destructive/20" : "bg-warning/5 border-warning/20")}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">{d.flag}</span>
                <span className={cn("text-xs font-bold", d.severity === "high" ? "text-destructive" : "text-warning")}>{d.confidence}% confidence</span>
              </div>
              <p className="text-xs text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
