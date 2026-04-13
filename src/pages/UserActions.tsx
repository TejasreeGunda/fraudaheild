import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Lock, AlertTriangle, Shield, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ActionTransaction {
  id: string;
  amount: string;
  merchant: string;
  time: string;
  location: string;
  risk: number;
  status: "pending" | "approved" | "reported" | "blocked";
}

const initialTxns: ActionTransaction[] = [
  { id: "TXN-8A3F", amount: "$2,400.00", merchant: "Unknown Wire Transfer", time: "2:15 AM", location: "Lagos, Nigeria", risk: 94.2, status: "pending" },
  { id: "TXN-3B7E", amount: "$890.00", merchant: "CryptoExchange.io", time: "11:42 PM", location: "Moscow, Russia", risk: 78.5, status: "pending" },
  { id: "TXN-6C2A", amount: "$5,200.00", merchant: "International Wire", time: "3:30 AM", location: "Unknown VPN", risk: 91.0, status: "pending" },
  { id: "TXN-9D5F", amount: "$320.00", merchant: "Amazon.com", time: "2:30 PM", location: "Home City", risk: 15.2, status: "pending" },
];

export default function UserActions() {
  const [transactions, setTransactions] = useState(initialTxns);
  const [cardBlocked, setCardBlocked] = useState(false);

  const updateStatus = (id: string, status: "approved" | "reported" | "blocked") => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    const labels = { approved: "Transaction approved", reported: "Fraud reported — investigation started", blocked: "Transaction blocked" };
    toast.success(labels[status]);
  };

  const blockCard = () => {
    setCardBlocked(true);
    toast.success("Card has been blocked immediately. Contact support to unblock.");
  };

  const statusStyles = {
    pending: { label: "Pending Review", color: "text-warning", bg: "bg-warning/10" },
    approved: { label: "Approved", color: "text-success", bg: "bg-success/10" },
    reported: { label: "Reported as Fraud", color: "text-destructive", bg: "bg-destructive/10" },
    blocked: { label: "Blocked", color: "text-destructive", bg: "bg-destructive/10" },
  };

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold gradient-text">User Action Center</h1>
          </div>
          <p className="text-muted-foreground">Approve, report, or block suspicious transactions in real-time</p>
        </div>
        <Button onClick={blockCard} disabled={cardBlocked} variant="destructive" className={cn(cardBlocked && "opacity-50")}>
          <Lock className="h-4 w-4 mr-1" /> {cardBlocked ? "Card Blocked" : "Block Card"}
        </Button>
      </motion.div>

      {cardBlocked && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 border border-destructive/30 bg-destructive/5 flex items-center gap-3">
          <Lock className="h-5 w-5 text-destructive" />
          <div>
            <p className="text-sm font-semibold text-destructive">Card Blocked</p>
            <p className="text-xs text-muted-foreground">All future transactions will be declined. Contact support to unblock.</p>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {transactions.map((txn, i) => {
          const st = statusStyles[txn.status];
          return (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn("glass-card p-5", txn.risk > 70 && txn.status === "pending" && "border-destructive/20")}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {txn.risk > 70 ? <AlertTriangle className="h-6 w-6 text-destructive" /> : <CreditCard className="h-6 w-6 text-primary" />}
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">{txn.id}</p>
                    <p className="text-sm text-foreground">{txn.merchant}</p>
                    <p className="text-xs text-muted-foreground">{txn.location} · {txn.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{txn.amount}</p>
                    <p className={cn("text-xs font-bold", txn.risk > 70 ? "text-destructive" : txn.risk > 40 ? "text-warning" : "text-success")}>{txn.risk}% risk</p>
                  </div>

                  {txn.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => updateStatus(txn.id, "approved")} className="border-success/30 text-success hover:bg-success/10 bg-transparent">
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateStatus(txn.id, "reported")} className="border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent">
                        <XCircle className="h-4 w-4 mr-1" /> Report Fraud
                      </Button>
                    </div>
                  ) : (
                    <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", st.bg, st.color)}>{st.label}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
