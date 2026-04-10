import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertTriangle, CheckCircle, Info, Zap, Check } from "lucide-react";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";

const iconMap = {
  fraud: AlertTriangle,
  success: CheckCircle,
  info: Info,
  warning: Zap,
};
const colorMap = {
  fraud: "text-destructive",
  success: "text-success",
  info: "text-primary",
  warning: "text-warning",
};

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 glass-card z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border/50 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <Check className="h-3 w-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center p-6">No notifications</p>
                ) : (
                  notifications.map((n) => {
                    const Icon = iconMap[n.type];
                    return (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn("p-3 border-b border-border/20 hover:bg-muted/30 transition-colors cursor-pointer", !n.read && "bg-primary/5")}
                        onClick={() => markAsRead(n.id)}
                      >
                        <div className="flex gap-3">
                          <Icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", colorMap[n.type])} />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{n.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                          </div>
                          {!n.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
