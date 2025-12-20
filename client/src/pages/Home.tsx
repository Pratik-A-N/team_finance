import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FounderSection from "@/components/FounderSection";
import HowItWorks from "@/components/HowItWorks";
import FinancialCalculator from "@/components/FinancialCalculator";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ThemeToggle from "@/components/ThemeToggle";
import Dashboard from "@/pages/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>
      
      <Header onContactClick={() => setConsultationOpen(true)} />
      
      <main>
        <HeroSection
          onGetStarted={() => setConsultationOpen(true)}
          onLearnMore={scrollToServices}
        />
        <TrustBar />
        <ServicesSection
          onServiceClick={() => setConsultationOpen(true)}
        />
        <WhyChooseUs />
        <FounderSection />
        <HowItWorks />
        <FinancialCalculator 
          onConsultClick={() => setConsultationOpen(true)}
        />
        <Testimonials />
        <FAQSection />
        <ContactCTA onScheduleCall={() => setConsultationOpen(true)} />
      </main>
      
      <Footer />
      
      <ConsultationModal
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
      />
    </div>
  );
}
