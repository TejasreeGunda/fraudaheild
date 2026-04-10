import { motion } from "framer-motion";
import { confusionMatrix } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface Props {
  model?: "xgboost" | "randomForest" | "logisticRegression";
}

const modelLabels = { xgboost: "XGBoost", randomForest: "Random Forest", logisticRegression: "Logistic Regression" };

export default function ConfusionMatrixChart({ model = "xgboost" }: Props) {
  const cm = confusionMatrix[model];
  const cells = [
    { label: "True Positive", value: cm.tp, row: 0, col: 0, type: "correct" as const },
    { label: "False Positive", value: cm.fp, row: 0, col: 1, type: "error" as const },
    { label: "False Negative", value: cm.fn, row: 1, col: 0, type: "error" as const },
    { label: "True Negative", value: cm.tn, row: 1, col: 1, type: "correct" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">Confusion Matrix — {modelLabels[model]}</h3>
      <p className="text-sm text-muted-foreground mb-6">Predicted vs actual classification results</p>
      
      <div className="flex justify-center">
        <div className="space-y-1">
          <div className="flex gap-1 ml-24">
            <div className="w-32 text-center text-xs text-muted-foreground font-medium">Pred. Fraud</div>
            <div className="w-32 text-center text-xs text-muted-foreground font-medium">Pred. Genuine</div>
          </div>
          {[0, 1].map((row) => (
            <div key={row} className="flex items-center gap-1">
              <div className="w-20 text-right text-xs text-muted-foreground font-medium pr-2">
                {row === 0 ? "Actual Fraud" : "Actual Genuine"}
              </div>
              {cells
                .filter((c) => c.row === row)
                .sort((a, b) => a.col - b.col)
                .map((cell, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + (cell.row * 2 + cell.col) * 0.1 }}
                    className={cn(
                      "w-32 h-24 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105",
                      cell.type === "correct" ? "bg-success/15 border border-success/30" : "bg-destructive/15 border border-destructive/30"
                    )}
                  >
                    <span className={cn("text-2xl font-bold", cell.type === "correct" ? "text-success" : "text-destructive")}>
                      {cell.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">{cell.label}</span>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
