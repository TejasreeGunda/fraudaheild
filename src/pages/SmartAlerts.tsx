import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, Smartphone, Shield, AlertTriangle, CheckCircle, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "fraud" | "suspicious" | "info";
  title: string;
  message: string;
  time: string;
  channels: ("email" | "sms" | "push")[];
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  { id: "1", type: "fraud", title: "⚠️ Suspicious transaction in another city", message: "Transaction of $2,400 detected in New York while your last activity was in Mumbai 10 minutes ago. Confirm now.", time: "2 min ago", channels: ["email", "sms", "push"], acknowledged: false },
  { id: "2", type: "suspicious", title: "Unusual spending pattern detected", message: "User usually spends ₹500–₹2000 → suddenly ₹50,000 at an electronics store.", time: "15 min ago", channels: ["email", "push"], acknowledged: false },
  { id: "3", type: "fraud", title: "Card used at compromised merchant", message: "Your card ending 4829 was used at a merchant flagged for data breaches.", time: "1 hour ago", channels: ["sms", "push"], acknowledged: true },
  { id: "4", type: "info", title: "Weekly fraud report ready", message: "Your weekly transaction security report is now available for review.", time: "3 hours ago", channels: ["email"], acknowledged: true },
];

export default function SmartAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [settings, setSettings] = useState({ email: true, sms: true, push: true, threshold: "medium" });

  const acknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const typeStyles = {
    fraud: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
    suspicious: { icon: Shield, color: "text-warning", bg: "bg-warning/10 border-warning/20" },
    info: { icon: Bell, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  };

  const channelIcons = { email: Mail, sms: Smartphone, push: MessageSquare };

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Smart Alert System</h1>
        <p className="text-muted-foreground">Instant fraud alerts via Email, SMS, and In-App notifications</p>
      </motion.div>

      {/* Alert Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground text-sm">Alert Channels</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["email", "sms", "push"] as const).map((ch) => {
            const Icon = channelIcons[ch];
            const enabled = settings[ch];
            return (
              <button key={ch} onClick={() => setSettings(s => ({ ...s, [ch]: !s[ch] }))} className={cn("flex items-center gap-3 p-3 rounded-lg border transition-all", enabled ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30")}>
                <Icon className={cn("h-5 w-5", enabled ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", enabled ? "text-foreground" : "text-muted-foreground")}>{ch === "sms" ? "SMS" : ch === "push" ? "In-App Push" : "Email"}</span>
                {enabled ? <ToggleRight className="h-5 w-5 text-primary ml-auto" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground ml-auto" />}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const cfg = typeStyles[alert.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
              className={cn("glass-card p-4 border", !alert.acknowledged && cfg.bg)}
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg", cfg.bg)}>
                  <Icon className={cn("h-5 w-5", cfg.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {alert.channels.map(ch => {
                        const ChIcon = channelIcons[ch];
                        return <ChIcon key={ch} className="h-3.5 w-3.5 text-muted-foreground" />;
                      })}
                    </div>
                    {!alert.acknowledged ? (
                      <Button size="sm" variant="outline" onClick={() => acknowledge(alert.id)} className="text-xs border-border bg-muted/50 text-foreground hover:bg-muted">
                        <CheckCircle className="h-3 w-3 mr-1" /> Acknowledge
                      </Button>
                    ) : (
                      <span className="text-xs text-success flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Acknowledged</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
