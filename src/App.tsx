import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppNavbar from "@/components/AppNavbar";
import Index from "./pages/Index";
import TransactionAnalyzer from "./pages/TransactionAnalyzer";
import ModelInsights from "./pages/ModelInsights";
import RealTimeSimulation from "./pages/RealTimeSimulation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="dark min-h-screen bg-background">
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analyzer" element={<TransactionAnalyzer />} />
            <Route path="/insights" element={<ModelInsights />} />
            <Route path="/simulation" element={<RealTimeSimulation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
