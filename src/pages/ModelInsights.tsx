import { motion } from "framer-motion";
import { useState } from "react";
import ModelComparisonChart from "@/components/charts/ModelComparisonChart";
import ROCCurveChart from "@/components/charts/ROCCurveChart";
import ConfusionMatrixChart from "@/components/charts/ConfusionMatrixChart";
import FeatureImportanceChart from "@/components/charts/FeatureImportanceChart";
import { modelMetrics } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Brain, Zap, TreePine } from "lucide-react";

const models = [
  { key: "logisticRegression" as const, label: "Logistic Regression", icon: Brain, desc: "Baseline linear model" },
  { key: "randomForest" as const, label: "Random Forest", icon: TreePine, desc: "Ensemble tree model" },
  { key: "xgboost" as const, label: "XGBoost", icon: Zap, desc: "Gradient boosting — best performer" },
];

export default function ModelInsights() {
  const [selectedModel, setSelectedModel] = useState<"logisticRegression" | "randomForest" | "xgboost">("xgboost");

  return (
    <div className="page-container pt-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Model Insights</h1>
        <p className="text-muted-foreground">
          Compare model performance. In fraud detection, <span className="text-warning font-semibold">Recall is king</span> — missing a fraud case is far worse than a false alarm.
        </p>
      </motion.div>

      {/* Model Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((m, i) => (
          <motion.button
            key={m.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedModel(m.key)}
            className={cn(
              "glass-card p-5 text-left transition-all duration-300 cursor-pointer",
              selectedModel === m.key ? "border-primary/50 neon-glow" : "hover:border-primary/20"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <m.icon className={cn("h-5 w-5", selectedModel === m.key ? "text-primary" : "text-muted-foreground")} />
              <span className="font-semibold text-foreground">{m.label}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{m.desc}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-muted-foreground">Recall:</span> <span className="text-warning font-bold">{(modelMetrics[m.key].recall * 100).toFixed(1)}%</span></div>
              <div><span className="text-muted-foreground">AUC:</span> <span className="text-success font-bold">{modelMetrics[m.key].auc}</span></div>
              <div><span className="text-muted-foreground">F1:</span> <span className="text-foreground font-medium">{(modelMetrics[m.key].f1 * 100).toFixed(1)}%</span></div>
              <div><span className="text-muted-foreground">Precision:</span> <span className="text-foreground font-medium">{(modelMetrics[m.key].precision * 100).toFixed(1)}%</span></div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModelComparisonChart />
        <ROCCurveChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfusionMatrixChart model={selectedModel} />
        <FeatureImportanceChart />
      </div>

      {/* Insight callout */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="glass-card p-6 border-warning/20">
        <h3 className="text-lg font-semibold text-warning mb-2">💡 Why Recall Matters Most</h3>
        <p className="text-sm text-muted-foreground">
          A missed fraud (False Negative) costs thousands in chargebacks. A false alarm (False Positive) only costs a brief customer verification.
          XGBoost's <span className="text-success font-semibold">89.1% recall</span> means it catches 438 out of 492 fraudulent transactions — far surpassing Logistic Regression's 61.2%.
        </p>
      </motion.div>
    </div>
  );
}
