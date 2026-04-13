import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Eye, AlertTriangle, DollarSign, Clock, MapPin, ShoppingBag, Zap, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlaggedTransaction {
  id: string;
  amount: string;
  merchant: string;
  time: string;
  risk: number;
  reasons: { factor: string; icon: any; impact: number; explanation: string }[];
}

const flaggedTxns: FlaggedTransaction[] = [
  {
    id: "TXN-8A3F-K2D9", amount: "$2,400.00", merchant: "Unknown Wire Transfer", time: "2:15 AM", risk: 94.2,
    reasons: [
      { factor: "High Amount", icon: DollarSign, impact: 35, explanation: "Amount is 12x higher than the user's average transaction of $200" },
      { factor: "Unusual Time", icon: Clock, impact: 28, explanation: "Transaction at 2:15 AM — user has never transacted between 1 AM–5 AM" },
      { factor: "New Location", icon: MapPin, impact: 22, explanation: "Transaction from Lagos, Nigeria — user has only transacted from India and USA" },
      { factor: "Wire Transfer", icon: Zap, impact: 15, explanation: "Wire transfers account for only 0.3% of user's transactions but 45% of fraud cases" },
    ],
  },
  {
    id: "TXN-3B7E-M5H1", amount: "$890.00", merchant: "CryptoExchange.io", time: "11:42 PM", risk: 78.5,
    reasons: [
      { factor: "New Merchant Type", icon: ShoppingBag, impact: 40, explanation: "First-ever cryptocurrency transaction — this category has a 23% fraud rate" },
      { factor: "High Amount", icon: DollarSign, impact: 30, explanation: "Amount exceeds 95th percentile of user's spending ($750)" },
      { factor: "Late Evening", icon: Clock, impact: 18, explanation: "90% of user's transactions occur between 8 AM–8 PM" },
      { factor: "Velocity", icon: Zap, impact: 12, explanation: "3rd transaction in 15 minutes — unusual frequency" },
    ],
  },
  {
    id: "TXN-6C2A-R8P4", amount: "$45.99", merchant: "Starbucks", time: "9:30 AM", risk: 12.3,
    reasons: [
      { factor: "Normal Amount", icon: DollarSign, impact: 5, explanation: "Amount is within typical range for this merchant ($8–$55)" },
      { factor: "Regular Time", icon: Clock, impact: 3, explanation: "Transaction during user's peak activity hours" },
      { factor: "Known Merchant", icon: ShoppingBag, impact: 2, explanation: "User has 47 previous transactions at Starbucks" },
      { factor: "Home Location", icon: MapPin, impact: 2, explanation: "Transaction from user's home city — expected location" },
    ],
  },
];

export default function ExplainableAI() {
  const [expanded, setExpanded] = useState<string | null>(flaggedTxns[0].id);

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Eye className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Explainable AI</h1>
        </div>
        <p className="text-muted-foreground">Understand exactly <span className="text-foreground font-semibold">why</span> each transaction is flagged — building trust in AI decisions</p>
      </motion.div>

      <div className="space-y-4">
        {flaggedTxns.map((txn, i) => (
          <motion.div
            key={txn.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden"
          >
            <button className="w-full p-5 flex items-center justify-between text-left" onClick={() => setExpanded(expanded === txn.id ? null : txn.id)}>
              <div className="flex items-center gap-4">
                {txn.risk > 70 ? <AlertTriangle className="h-6 w-6 text-destructive" /> : txn.risk > 40 ? <AlertTriangle className="h-6 w-6 text-warning" /> : <CheckCircle className="h-6 w-6 text-success" />}
                <div>
                  <p className="font-mono text-sm text-foreground">{txn.id}</p>
                  <p className="text-xs text-muted-foreground">{txn.merchant} · {txn.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-foreground">{txn.amount}</span>
                <div className="text-right">
                  <span className={cn("text-lg font-bold", txn.risk > 70 ? "text-destructive" : txn.risk > 40 ? "text-warning" : "text-success")}>{txn.risk}%</span>
                  <p className="text-[10px] text-muted-foreground">fraud score</p>
                </div>
                {expanded === txn.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            <AnimatePresence>
              {expanded === txn.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 space-y-3">
                    <p className="text-xs text-muted-foreground uppercase font-medium">Contributing Factors</p>
                    {txn.reasons.map((reason, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.05 }} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <reason.icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", reason.impact > 25 ? "text-destructive" : reason.impact > 15 ? "text-warning" : "text-muted-foreground")} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-foreground">{reason.factor}</span>
                            <span className={cn("text-xs font-bold", reason.impact > 25 ? "text-destructive" : reason.impact > 15 ? "text-warning" : "text-muted-foreground")}>{reason.impact}% impact</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{reason.explanation}</p>
                          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${reason.impact}%` }} transition={{ duration: 0.6, delay: j * 0.1 }} className={cn("h-full rounded-full", reason.impact > 25 ? "bg-destructive" : reason.impact > 15 ? "bg-warning" : "bg-muted-foreground")} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6 border-primary/20">
        <h3 className="text-lg font-semibold text-primary mb-2">🧾 Why Explainability Matters</h3>
        <p className="text-sm text-muted-foreground">
          Black-box AI decisions erode trust. By showing <span className="text-foreground font-semibold">exactly which factors</span> contributed to a fraud score, we enable analysts to verify decisions, reduce false positives, and build regulatory compliance. Each factor shows its <span className="text-warning font-semibold">percentage impact</span> on the final score.
        </p>
      </motion.div>
    </div>
  );
}
