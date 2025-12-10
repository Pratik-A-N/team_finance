import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import FinancialCalculator from "@/components/FinancialCalculator";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);

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
