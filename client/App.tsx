import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sermons from "./pages/Sermons";
import Learn from "./pages/Learn";
import LearnContent from "./pages/LearnContent";
import AITools from "./pages/AITools";
import SubtitleTool from "./pages/SubtitleTool";
import Community from "./pages/Community";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/content" element={<LearnContent />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/tools/subtitles" element={<SubtitleTool />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.hasChildNodes()) {
  createRoot(rootElement).render(<App />);
}
