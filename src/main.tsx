import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner richColors />
        <App />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
