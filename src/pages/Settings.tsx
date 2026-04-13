import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, LogOut, Mail, Moon, Sun, Monitor, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Moon },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, signOut, isGuest } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [notifSettings, setNotifSettings] = useState({
    fraudAlerts: true,
    modelUpdates: true,
    systemAlerts: false,
    emailDigest: true,
    pushNotifications: true,
  });

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="page-container pt-24 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and notifications</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-2 space-y-1 h-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3 glass-card p-6 space-y-6">
          {activeTab === "profile" && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Profile</h2>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.email || "User"}</p>
                  <p className="text-sm text-muted-foreground">Fraud Analyst</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                  <Input defaultValue="Fraud Analyst" className="bg-muted/50 border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input value={isGuest ? "guest@fraudshield.app" : (user?.email || "")} readOnly className="bg-muted/30 border-border opacity-60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <Input value="Analyst" readOnly className="bg-muted/30 border-border opacity-60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <Input defaultValue="Risk & Compliance" className="bg-muted/50 border-border" />
                </div>
              </div>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Check className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
              <div className="space-y-5">
                {[
                  { key: "fraudAlerts", label: "Fraud Alerts", desc: "Get notified for high-risk transaction detections", icon: Zap },
                  { key: "modelUpdates", label: "Model Updates", desc: "Notifications when models are retrained or improved", icon: Shield },
                  { key: "systemAlerts", label: "System Alerts", desc: "Infrastructure and performance notifications", icon: Monitor },
                  { key: "emailDigest", label: "Email Digest", desc: "Daily summary email of fraud activity", icon: Mail },
                  { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications for critical alerts", icon: Bell },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifSettings[item.key as keyof typeof notifSettings]}
                      onCheckedChange={(val) => setNotifSettings((prev) => ({ ...prev, [item.key]: val }))}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Check className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
            </>
          )}

          {activeTab === "security" && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Security</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-3">
                  <p className="text-sm font-medium text-foreground">Change Password</p>
                  <Input type="password" placeholder="Current password" className="bg-muted/50 border-border" />
                  <Input type="password" placeholder="New password" className="bg-muted/50 border-border" />
                  <Input type="password" placeholder="Confirm new password" className="bg-muted/50 border-border" />
                  <Button onClick={handleSave} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-border bg-muted/50 text-foreground">Enable 2FA</Button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                  <p className="text-sm font-medium text-foreground mb-2">Active Sessions</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <p className="text-xs text-muted-foreground">Current browser · This device</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "appearance" && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Dark", icon: Moon, active: true },
                  { label: "Light", icon: Sun, active: false },
                  { label: "System", icon: Monitor, active: false },
                ].map((t) => (
                  <button key={t.label} className={cn("glass-card p-6 text-center transition-all duration-200 cursor-pointer", t.active ? "border-primary/50 neon-glow" : "hover:border-primary/20")}>
                    <t.icon className={cn("h-6 w-6 mx-auto mb-2", t.active ? "text-primary" : "text-muted-foreground")} />
                    <p className={cn("text-sm font-medium", t.active ? "text-foreground" : "text-muted-foreground")}>{t.label}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
