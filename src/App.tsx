import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppNavbar from "@/components/AppNavbar";
import Index from "./pages/Index";
import TransactionAnalyzer from "./pages/TransactionAnalyzer";
import ModelInsights from "./pages/ModelInsights";
import Analytics from "./pages/Analytics";
import RealTimeSimulation from "./pages/RealTimeSimulation";
import TransactionHistory from "./pages/TransactionHistory";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<ProtectedRoute><AppLayout><Index /></AppLayout></ProtectedRoute>} />
              <Route path="/analyzer" element={<ProtectedRoute><AppLayout><TransactionAnalyzer /></AppLayout></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><AppLayout><TransactionHistory /></AppLayout></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><AppLayout><Analytics /></AppLayout></ProtectedRoute>} />
              <Route path="/insights" element={<ProtectedRoute><AppLayout><ModelInsights /></AppLayout></ProtectedRoute>} />
              <Route path="/simulation" element={<ProtectedRoute><AppLayout><RealTimeSimulation /></AppLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
