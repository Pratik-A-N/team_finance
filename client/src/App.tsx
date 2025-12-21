import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import OnboardingModal from "@/components/OnboardingModal";
import { useAuth } from "@/hooks/useAuth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { user, isAuthenticated, isLoading, isProfileComplete } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isProfileComplete && !onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [isLoading, isAuthenticated, isProfileComplete, onboardingCompleted]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
  };

  return (
    <>
      <Router />
      <OnboardingModal 
        user={user}
        open={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
