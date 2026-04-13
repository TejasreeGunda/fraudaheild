import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, CreditCard, Plus, Eye, EyeOff, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  last4: string;
  balance: number;
  currency: string;
  status: "active" | "monitoring" | "flagged";
  linkedAt: string;
  recentTransactions: { id: string; desc: string; amount: number; date: string; flagged: boolean }[];
}

const mockAccounts: BankAccount[] = [
  {
    id: "1", bankName: "Chase Bank", accountType: "Checking", last4: "4829", balance: 12450.67, currency: "USD", status: "active", linkedAt: "2024-01-15",
    recentTransactions: [
      { id: "t1", desc: "Amazon Purchase", amount: -149.99, date: "Apr 12", flagged: false },
      { id: "t2", desc: "Salary Deposit", amount: 5200.00, date: "Apr 10", flagged: false },
      { id: "t3", desc: "Unknown Wire Transfer", amount: -2400.00, date: "Apr 9", flagged: true },
      { id: "t4", desc: "Netflix Subscription", amount: -15.99, date: "Apr 8", flagged: false },
    ],
  },
  {
    id: "2", bankName: "Bank of America", accountType: "Savings", last4: "7731", balance: 34200.00, currency: "USD", status: "monitoring", linkedAt: "2024-02-20",
    recentTransactions: [
      { id: "t5", desc: "Interest Credit", amount: 42.18, date: "Apr 11", flagged: false },
      { id: "t6", desc: "Large Withdrawal", amount: -8000.00, date: "Apr 7", flagged: true },
    ],
  },
];

export default function BankAccount() {
  const [accounts, setAccounts] = useState<BankAccount[]>(mockAccounts);
  const [showBalances, setShowBalances] = useState(true);
  const [linking, setLinking] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const flaggedCount = accounts.reduce((s, a) => s + a.recentTransactions.filter(t => t.flagged).length, 0);

  const statusStyles = {
    active: "bg-success/10 text-success",
    monitoring: "bg-warning/10 text-warning",
    flagged: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Bank Accounts</h1>
          <p className="text-muted-foreground">Link and monitor your bank accounts for real-time fraud detection</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowBalances(!showBalances)} className="border-border bg-muted/50 text-foreground">
            {showBalances ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showBalances ? "Hide" : "Show"}
          </Button>
          <Button size="sm" onClick={() => setLinking(true)} className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Link Account
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-foreground">{showBalances ? `$${totalBalance.toLocaleString()}` : "••••••"}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5">
          <p className="text-xs text-muted-foreground mb-1">Linked Accounts</p>
          <p className="text-2xl font-bold text-primary">{accounts.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <p className="text-xs text-muted-foreground mb-1">Flagged Transactions</p>
          <p className="text-2xl font-bold text-destructive">{flaggedCount}</p>
        </motion.div>
      </div>

      {/* Account Cards */}
      {accounts.map((acc, i) => (
        <motion.div
          key={acc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i + 0.3 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-5 flex items-center justify-between border-b border-border/30 cursor-pointer" onClick={() => setSelectedAccount(selectedAccount === acc.id ? null : acc.id)}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{acc.bankName}</p>
                <p className="text-sm text-muted-foreground">{acc.accountType} •••• {acc.last4}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", statusStyles[acc.status])}>
                {acc.status === "active" ? "Active" : acc.status === "monitoring" ? "Monitoring" : "Flagged"}
              </span>
              <p className="text-lg font-bold text-foreground">{showBalances ? `$${acc.balance.toLocaleString()}` : "••••"}</p>
            </div>
          </div>

          <AnimatePresence>
            {selectedAccount === acc.id && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="p-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-3">Recent Transactions</p>
                  {acc.recentTransactions.map((txn) => (
                    <div key={txn.id} className={cn("flex items-center justify-between p-3 rounded-lg", txn.flagged ? "bg-destructive/5 border border-destructive/20" : "bg-muted/30")}>
                      <div className="flex items-center gap-3">
                        {txn.flagged ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-success" />}
                        <div>
                          <p className="text-sm text-foreground">{txn.desc}</p>
                          <p className="text-xs text-muted-foreground">{txn.date}</p>
                        </div>
                      </div>
                      <span className={cn("text-sm font-bold", txn.amount > 0 ? "text-success" : "text-foreground")}>
                        {txn.amount > 0 ? "+" : ""}{txn.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Link Account Modal */}
      <AnimatePresence>
        {linking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setLinking(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-card p-6 max-w-md w-full space-y-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-foreground">Link Bank Account</h2>
              <p className="text-sm text-muted-foreground">Connect via Plaid for secure, real-time transaction monitoring and fraud detection.</p>
              <div className="space-y-3">
                {["Chase", "Bank of America", "Wells Fargo", "Citi", "Capital One"].map((bank) => (
                  <button key={bank} className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left" onClick={() => { setLinking(false); }}>
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{bank}</span>
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full border-border" onClick={() => setLinking(false)}>Cancel</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
