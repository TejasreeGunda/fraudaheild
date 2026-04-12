import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NotificationProvider } from "@/contexts/NotificationContext";
import AppNavbar from "@/components/AppNavbar";
import Index from "./pages/Index";
import TransactionAnalyzer from "./pages/TransactionAnalyzer";
import ModelInsights from "./pages/ModelInsights";
import Analytics from "./pages/Analytics";
import RealTimeSimulation from "./pages/RealTimeSimulation";
import TransactionHistory from "./pages/TransactionHistory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen bg-background">
      <AppNavbar />
      {children}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/analyzer" element={<AppLayout><TransactionAnalyzer /></AppLayout>} />
            <Route path="/history" element={<AppLayout><TransactionHistory /></AppLayout>} />
            <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
            <Route path="/insights" element={<AppLayout><ModelInsights /></AppLayout>} />
            <Route path="/simulation" element={<AppLayout><RealTimeSimulation /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
