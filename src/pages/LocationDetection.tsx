import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Clock, Navigation, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const locationEvents = [
  { id: "1", type: "impossible_travel" as const, from: "Mumbai, India", to: "New York, USA", timeDiff: "10 min", risk: "critical", amount: "$2,400", time: "2 min ago" },
  { id: "2", type: "unusual_location" as const, from: "Lagos, Nigeria", to: "", timeDiff: "", risk: "high", amount: "$890", time: "15 min ago" },
  { id: "3", type: "impossible_travel" as const, from: "London, UK", to: "Tokyo, Japan", timeDiff: "25 min", risk: "critical", amount: "$5,200", time: "1 hour ago" },
  { id: "4", type: "unusual_location" as const, from: "Rural Alaska, USA", to: "", timeDiff: "", risk: "medium", amount: "$125", time: "3 hours ago" },
  { id: "5", type: "normal" as const, from: "San Francisco, USA", to: "", timeDiff: "", risk: "low", amount: "$45.99", time: "4 hours ago" },
];

const riskColors = {
  critical: "text-destructive bg-destructive/10 border-destructive/20",
  high: "text-destructive bg-destructive/5 border-destructive/10",
  medium: "text-warning bg-warning/5 border-warning/10",
  low: "text-success bg-success/5 border-success/10",
};

const heatmapData = [
  { city: "Mumbai", lat: 19.07, lng: 72.87, count: 124, fraud: 18 },
  { city: "New York", lat: 40.71, lng: -74.00, count: 89, fraud: 12 },
  { city: "London", lat: 51.51, lng: -0.12, count: 156, fraud: 8 },
  { city: "Lagos", lat: 6.45, lng: 3.39, count: 34, fraud: 15 },
  { city: "Tokyo", lat: 35.68, lng: 139.69, count: 67, fraud: 3 },
  { city: "São Paulo", lat: -23.55, lng: -46.63, count: 45, fraud: 9 },
];

export default function LocationDetection() {
  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Location-Based Fraud Detection</h1>
        </div>
        <p className="text-muted-foreground">Track transaction locations and detect impossible travel and unusual patterns</p>
      </motion.div>

      {/* Fraud Heatmap - Simulated */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> Fraud Heatmap by Location</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {heatmapData.map((loc) => {
            const fraudRate = ((loc.fraud / loc.count) * 100);
            return (
              <div key={loc.city} className={cn("rounded-xl p-4 text-center border", fraudRate > 30 ? "border-destructive/30 bg-destructive/5" : fraudRate > 10 ? "border-warning/30 bg-warning/5" : "border-success/30 bg-success/5")}>
                <p className="text-xs text-muted-foreground">{loc.city}</p>
                <p className={cn("text-xl font-bold mt-1", fraudRate > 30 ? "text-destructive" : fraudRate > 10 ? "text-warning" : "text-success")}>{fraudRate.toFixed(0)}%</p>
                <p className="text-[10px] text-muted-foreground mt-1">{loc.fraud}/{loc.count} flagged</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Location Events */}
      <div className="space-y-3">
        {locationEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
            className={cn("glass-card p-4 border", riskColors[event.risk as keyof typeof riskColors])}
          >
            <div className="flex items-start gap-4">
              <div className={cn("p-2 rounded-lg", event.type === "impossible_travel" ? "bg-destructive/10" : event.type === "unusual_location" ? "bg-warning/10" : "bg-success/10")}>
                {event.type === "impossible_travel" ? <Navigation className="h-5 w-5 text-destructive" /> : event.type === "unusual_location" ? <AlertTriangle className="h-5 w-5 text-warning" /> : <MapPin className="h-5 w-5 text-success" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">
                    {event.type === "impossible_travel" ? "🚨 Impossible Travel Detected" : event.type === "unusual_location" ? "⚠️ Unusual Location" : "✅ Normal Transaction"}
                  </h4>
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.type === "impossible_travel"
                    ? `${event.from} → ${event.to} in just ${event.timeDiff}`
                    : `Transaction from ${event.from}`}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-bold text-foreground">{event.amount}</span>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", riskColors[event.risk as keyof typeof riskColors])}>{event.risk.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-6 border-primary/20">
        <h3 className="text-lg font-semibold text-primary mb-2">📍 How Location Detection Works</h3>
        <p className="text-sm text-muted-foreground">
          Our system tracks the geolocation of every transaction. When a card is used in <span className="text-destructive font-semibold">India at 2:00 PM</span> and then in <span className="text-destructive font-semibold">USA at 2:10 PM</span>, it's physically impossible — the transaction is immediately flagged and blocked. This stops <span className="text-warning font-semibold">95%</span> of stolen card misuse.
        </p>
      </motion.div>
    </div>
  );
}
