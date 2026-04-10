import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, AlertTriangle, CheckCircle, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTransaction, Transaction } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function RealTimeSimulation() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [running, setRunning] = useState(true);
  const [stats, setStats] = useState({ total: 0, fraud: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        const txn = generateTransaction();
        setTransactions((prev) => [txn, ...prev].slice(0, 50));
        setStats((prev) => ({ total: prev.total + 1, fraud: prev.fraud + (txn.isFraud ? 1 : 0) }));
      }, 1200);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const riskStyles = {
    low: "text-success",
    medium: "text-warning",
    high: "text-destructive",
  };

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Real-Time Fraud Monitor</h1>
          <p className="text-muted-foreground">Live transaction stream with auto fraud detection</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={cn("h-3 w-3 rounded-full", running ? "bg-success animate-pulse" : "bg-muted-foreground")} />
            <span className="text-sm text-muted-foreground">{running ? "Live" : "Paused"}</span>
          </div>
          <Button onClick={() => setRunning(!running)} variant="outline" size="sm" className="border-border bg-muted/50 text-foreground hover:bg-muted">
            {running ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {running ? "Pause" : "Resume"}
          </Button>
        </div>
      </motion.div>

      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Processed</p>
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Fraud Caught</p>
          <p className="text-2xl font-bold text-destructive">{stats.fraud}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Detection Rate</p>
          <p className="text-2xl font-bold text-success">{stats.total ? ((stats.fraud / stats.total) * 100).toFixed(1) : "0.0"}%</p>
        </div>
      </div>

      {/* Transaction Stream */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground text-sm">Transaction Stream</span>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {transactions.map((txn) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -40, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex items-center justify-between px-4 py-3 border-b border-border/30 transition-colors",
                  txn.isFraud && "bg-destructive/5"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {txn.isFraud ? (
                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-mono text-foreground truncate">{txn.id}</p>
                    <p className="text-xs text-muted-foreground">{txn.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-sm font-medium text-foreground">${txn.amount.toLocaleString()}</span>
                  <span className={cn("text-sm font-bold w-16 text-right", riskStyles[txn.risk])}>
                    {(txn.probability * 100).toFixed(1)}%
                  </span>
                  <span className={cn(
                    "text-xs font-semibold px-2 py-1 rounded-full",
                    txn.risk === "low" ? "bg-success/10 text-success" :
                    txn.risk === "medium" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  )}>
                    {txn.risk.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
