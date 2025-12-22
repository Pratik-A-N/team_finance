import { useState, useEffect } from "react";
import { useSearch } from "wouter";
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

export default function LandingPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const searchString = useSearch();

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const section = params.get("section");
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
        window.history.replaceState({}, "", "/landing");
      }, 100);
    }
  }, [searchString]);

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
