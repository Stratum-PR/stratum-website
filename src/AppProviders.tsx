import { useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

/** Context providers shared (the language provider sits inside the router, in AppTree, since the URL decides it) by the browser app (App.tsx) and the prerender (entry-server.tsx). */
export function AppProviders({ children, helmetContext }: { children: ReactNode; helmetContext?: object }) {
  // One client per app instance (the prerender renders many pages in one process)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
