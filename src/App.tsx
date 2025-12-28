import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RocketCursor from "./components/CursorDot";

const queryClient = new QueryClient();

const App = () => (
  <SmoothScrollProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <RocketCursor />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SmoothScrollProvider>
);

export default App;
