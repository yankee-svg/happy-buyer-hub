import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { CLERK_PUBLISHABLE_KEY } from "@/lib/clerk";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Doctors from "./pages/Doctors";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ClerkProvider>
  </QueryClientProvider>
);

const MissingClerkKey = () => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="max-w-lg w-full">
      <div className="rounded-lg border border-border bg-card shadow-sm p-8 space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Clerk not configured</h1>
        <p className="text-muted-foreground">
          Add your Clerk publishable key to the environment to run the app.
        </p>
        <div className="text-left text-sm bg-muted/50 rounded-md p-4 font-mono">
          <p className="opacity-70 mb-2">.env</p>
          <pre>VITE_CLERK_PUBLISHABLE_KEY="pk_test_xxx..."</pre>
        </div>
        <p className="text-sm text-muted-foreground">
          Get your key from your Clerk Dashboard → API Keys.
        </p>
      </div>
    </div>
  </div>
);

const App = () => {
  const hasClerkKey = Boolean(CLERK_PUBLISHABLE_KEY);
  return hasClerkKey ? <AppContent /> : <MissingClerkKey />;
};

export default App;
