import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, ArrowUpDown, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { generateTransaction, Transaction } from "@/lib/mockData";

// Generate a history of 100 transactions
const historyData: (Transaction & { date: string; merchant: string; category: string })[] = Array.from({ length: 100 }, (_, i) => {
  const txn = generateTransaction();
  const date = new Date(Date.now() - i * 3600000 * Math.random() * 5);
  const merchants = ["Amazon", "Starbucks", "Uber", "Netflix", "Walmart", "Apple", "Target", "Shell", "Delta Airlines", "Marriott"];
  const categories = ["Shopping", "Food & Drink", "Transport", "Entertainment", "Groceries", "Tech", "Retail", "Gas", "Travel", "Hotel"];
  return {
    ...txn,
    id: `TXN-${(1000 + i).toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    merchant: merchants[i % merchants.length],
    category: categories[i % categories.length],
  };
});

type SortKey = "date" | "amount" | "probability";

export default function TransactionHistory() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<(typeof historyData)[0] | null>(null);

  const filtered = useMemo(() => {
    let data = historyData.filter((txn) => {
      const matchSearch = txn.id.toLowerCase().includes(search.toLowerCase()) || txn.merchant.toLowerCase().includes(search.toLowerCase());
      const matchRisk = riskFilter === "all" || txn.risk === riskFilter;
      return matchSearch && matchRisk;
    });
    data.sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortBy === "amount") return (a.amount - b.amount) * mul;
      if (sortBy === "probability") return (a.probability - b.probability) * mul;
      return 0; // date is already sorted
    });
    return data;
  }, [search, riskFilter, sortBy, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(!sortAsc);
    else { setSortBy(key); setSortAsc(false); }
  };

  const riskBadge = (risk: string) => {
    const styles = {
      low: "bg-success/10 text-success",
      medium: "bg-warning/10 text-warning",
      high: "bg-destructive/10 text-destructive",
    };
    return <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", styles[risk as keyof typeof styles])}>{risk.toUpperCase()}</span>;
  };

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Transaction History</h1>
        <p className="text-muted-foreground">Browse, search, and drill into past transactions</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID or merchant..." className="pl-10 bg-muted/50 border-border" />
        </div>
        <div className="flex gap-2">
          {(["all", "low", "medium", "high"] as const).map((r) => (
            <Button
              key={r}
              variant={riskFilter === r ? "default" : "outline"}
              size="sm"
              onClick={() => setRiskFilter(r)}
              className={cn(
                riskFilter === r ? "bg-primary text-primary-foreground" : "border-border bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {r === "all" ? "All" : r.charAt(0).toUpperCase() + r.slice(1)}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase">Transaction</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase">Merchant</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground transition-colors" onClick={() => toggleSort("amount")}>
                  <div className="flex items-center gap-1">Amount <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground transition-colors" onClick={() => toggleSort("probability")}>
                  <div className="flex items-center gap-1">Fraud Prob. <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase">Risk</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map((txn, i) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={cn(
                    "border-b border-border/20 hover:bg-muted/30 transition-colors cursor-pointer",
                    txn.isFraud && "bg-destructive/5"
                  )}
                  onClick={() => setSelectedTxn(txn)}
                >
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-mono text-foreground">{txn.id}</p>
                      <p className="text-xs text-muted-foreground">{txn.date} · {txn.time}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">{txn.merchant}</p>
                    <p className="text-xs text-muted-foreground">{txn.category}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-foreground">${txn.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={cn("text-sm font-bold", txn.risk === "low" ? "text-success" : txn.risk === "medium" ? "text-warning" : "text-destructive")}>
                      {(txn.probability * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-4">{riskBadge(txn.risk)}</td>
                  <td className="p-4">
                    {txn.isFraud ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-success" />}
                  </td>
                  <td className="p-4"><Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border/50 text-sm text-muted-foreground">
          Showing {Math.min(30, filtered.length)} of {filtered.length} transactions
        </div>
      </motion.div>

      {/* Drill-down Detail Modal */}
      <AnimatePresence>
        {selectedTxn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedTxn(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Transaction Details</h2>
                <button onClick={() => setSelectedTxn(null)} className="text-muted-foreground hover:text-foreground transition-colors"><X className="h-5 w-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                  <p className="text-sm font-mono text-foreground">{selectedTxn.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Merchant</p>
                  <p className="text-sm text-foreground">{selectedTxn.merchant}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-sm font-bold text-foreground">${selectedTxn.amount.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm text-foreground">{selectedTxn.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm text-foreground">{selectedTxn.date} · {selectedTxn.time}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                  {riskBadge(selectedTxn.risk)}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Fraud Probability</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedTxn.probability * 100}%` }}
                      transition={{ duration: 0.8 }}
                      className={cn("h-full rounded-full", selectedTxn.risk === "low" ? "bg-success" : selectedTxn.risk === "medium" ? "bg-warning" : "bg-destructive")}
                    />
                  </div>
                  <span className={cn("text-lg font-bold", selectedTxn.risk === "low" ? "text-success" : selectedTxn.risk === "medium" ? "text-warning" : "text-destructive")}>
                    {(selectedTxn.probability * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Top Contributing Features</p>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(selectedTxn.features).slice(0, 8).map(([k, v]) => (
                    <div key={k} className="bg-muted/50 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">{k}</p>
                      <p className="text-xs font-mono text-foreground">{v.toFixed(3)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
