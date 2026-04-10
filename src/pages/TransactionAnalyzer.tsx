import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TransactionAnalyzer() {
  const [amount, setAmount] = useState("149.62");
  const [time, setTime] = useState("43000");
  const [result, setResult] = useState<null | { probability: number; risk: "low" | "medium" | "high"; prediction: string }>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const amt = parseFloat(amount) || 0;
      // Simulate: low amounts + specific time ranges = higher fraud probability
      const base = amt < 200 ? 0.4 : amt < 1000 ? 0.15 : 0.05;
      const prob = Math.min(0.99, base + Math.random() * 0.3);
      const risk = prob > 0.7 ? "high" : prob > 0.4 ? "medium" : "low";
      setResult({ probability: prob, risk, prediction: prob > 0.5 ? "Fraud" : "Genuine" });
      setLoading(false);
    }, 1500);
  };

  const riskConfig = {
    low: { color: "text-success", bg: "bg-success/10 border-success/30", icon: CheckCircle, label: "Low Risk" },
    medium: { color: "text-warning", bg: "bg-warning/10 border-warning/30", icon: AlertCircle, label: "Medium Risk" },
    high: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", icon: AlertTriangle, label: "High Risk" },
  };

  return (
    <div className="page-container pt-24 max-w-4xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Transaction Analyzer</h1>
        <p className="text-muted-foreground">Input transaction details to detect potential fraud using our XGBoost model.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Transaction Amount ($)</label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="149.62" className="bg-muted/50 border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Time (seconds from start)</label>
            <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="43000" className="bg-muted/50 border-border" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">PCA Features (V1–V28)</label>
          <p className="text-xs text-muted-foreground">Auto-generated from anonymized transaction data</p>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i} className="text-center">
                <span className="text-[10px] text-muted-foreground">V{i + 1}</span>
                <div className="bg-muted/50 rounded px-1 py-1 text-xs text-foreground font-mono">
                  {(Math.random() * 6 - 3).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={analyze} disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold">
          {loading ? (
            <div className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Analyzing...</div>
          ) : (
            <div className="flex items-center gap-2"><Search className="h-4 w-4" /> Analyze Transaction</div>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn("glass-card p-8 border", riskConfig[result.risk].bg)}
          >
            <div className="flex items-center gap-4 mb-6">
              {(() => { const Icon = riskConfig[result.risk].icon; return <Icon className={cn("h-10 w-10", riskConfig[result.risk].color)} />; })()}
              <div>
                <h3 className={cn("text-2xl font-bold", riskConfig[result.risk].color)}>{riskConfig[result.risk].label}</h3>
                <p className="text-sm text-muted-foreground">Prediction: <span className="font-semibold text-foreground">{result.prediction}</span></p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fraud Probability</span>
                  <span className={cn("text-lg font-bold", riskConfig[result.risk].color)}>{(result.probability * 100).toFixed(2)}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.probability * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", result.risk === "low" ? "bg-success" : result.risk === "medium" ? "bg-warning" : "bg-destructive")}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
