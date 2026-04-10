import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Notification {
  id: string;
  type: "fraud" | "info" | "success" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "time" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "fraud", title: "High-Risk Transaction Detected", message: "Transaction TXN-8A3F flagged with 94.2% fraud probability", time: "2 min ago", read: false },
    { id: "2", type: "success", title: "Model Retrained", message: "XGBoost model updated with latest data — AUC improved to 0.995", time: "1 hour ago", read: false },
    { id: "3", type: "info", title: "System Update", message: "Real-time monitoring latency reduced to 12ms", time: "3 hours ago", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback((n: Omit<Notification, "id" | "time" | "read">) => {
    setNotifications((prev) => [
      { ...n, id: Date.now().toString(), time: "Just now", read: false },
      ...prev,
    ].slice(0, 50));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
}
