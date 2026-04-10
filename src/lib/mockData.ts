// Simulated ML model results and transaction data

export const modelMetrics = {
  logisticRegression: { accuracy: 0.972, precision: 0.871, recall: 0.612, f1: 0.719, auc: 0.943 },
  randomForest: { accuracy: 0.995, precision: 0.947, recall: 0.783, f1: 0.857, auc: 0.982 },
  xgboost: { accuracy: 0.998, precision: 0.963, recall: 0.891, f1: 0.926, auc: 0.994 },
};

export const fraudDistribution = [
  { name: "Genuine", value: 99.83, count: 284315, fill: "hsl(199, 89%, 48%)" },
  { name: "Fraud", value: 0.17, count: 492, fill: "hsl(0, 84%, 60%)" },
];

export const transactionAmountData = Array.from({ length: 200 }, (_, i) => {
  const isFraud = Math.random() < 0.15;
  return {
    amount: isFraud ? Math.random() * 500 + 1 : Math.random() * 25000 + 10,
    time: Math.random() * 172800,
    isFraud: isFraud ? 1 : 0,
    label: isFraud ? "Fraud" : "Genuine",
  };
});

export const rocCurveData = (() => {
  const points = [];
  for (let i = 0; i <= 100; i += 2) {
    const fpr = i / 100;
    points.push({
      fpr,
      lr: Math.min(1, Math.pow(fpr, 0.3)),
      rf: Math.min(1, Math.pow(fpr, 0.15)),
      xgb: Math.min(1, Math.pow(fpr, 0.08)),
      random: fpr,
    });
  }
  return points;
})();

export const confusionMatrix = {
  xgboost: { tp: 438, fp: 17, fn: 54, tn: 284298 },
  randomForest: { tp: 385, fp: 21, fn: 107, tn: 284294 },
  logisticRegression: { tp: 301, fp: 45, fn: 191, tn: 284270 },
};

export const featureImportance = [
  { feature: "V14", importance: 0.182 },
  { feature: "V17", importance: 0.156 },
  { feature: "V12", importance: 0.134 },
  { feature: "V10", importance: 0.098 },
  { feature: "V16", importance: 0.087 },
  { feature: "V3", importance: 0.076 },
  { feature: "V7", importance: 0.065 },
  { feature: "V11", importance: 0.054 },
  { feature: "Amount", importance: 0.048 },
  { feature: "V4", importance: 0.041 },
];

export const correlationData = (() => {
  const features = ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "Amount", "Time", "Class"];
  const data: { x: string; y: string; value: number }[] = [];
  features.forEach((fx, i) => {
    features.forEach((fy, j) => {
      data.push({
        x: fx,
        y: fy,
        value: i === j ? 1 : parseFloat((Math.random() * 0.6 - 0.3).toFixed(2)),
      });
    });
  });
  return { features, data };
})();

export interface Transaction {
  id: string;
  time: string;
  amount: number;
  isFraud: boolean;
  probability: number;
  risk: "low" | "medium" | "high";
  features: Record<string, number>;
}

export const generateTransaction = (): Transaction => {
  const isFraud = Math.random() < 0.08;
  const probability = isFraud ? 0.65 + Math.random() * 0.34 : Math.random() * 0.3;
  const risk = probability > 0.7 ? "high" : probability > 0.4 ? "medium" : "low";
  const amount = isFraud ? Math.random() * 800 + 5 : Math.random() * 15000 + 20;
  const features: Record<string, number> = {};
  for (let i = 1; i <= 28; i++) features[`V${i}`] = parseFloat((Math.random() * 6 - 3).toFixed(4));
  return {
    id: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    time: new Date().toLocaleTimeString(),
    amount: parseFloat(amount.toFixed(2)),
    isFraud,
    probability: parseFloat(probability.toFixed(4)),
    risk,
    features,
  };
};

export const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  total: Math.floor(8000 + Math.random() * 4000),
  fraud: Math.floor(5 + Math.random() * 20),
}));
