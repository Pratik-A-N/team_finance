import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import logoImage from "@assets/WhatsApp_Image_2025-12-26_at_16.46.12_1766748068781.png";

interface ContactCTAProps {
  onScheduleCall?: () => void;
}

export default function ContactCTA({ onScheduleCall }: ContactCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src={logoImage}
              alt="Team Finance"
              className="h-20 w-auto brightness-0 invert opacity-90"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Take the first step today. Schedule a free consultation with our
            expert advisors and get a personalized financial plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              onClick={onScheduleCall}
              data-testid="cta-button-schedule"
            >
              <Calendar className="w-5 h-5" />
              Schedule Free Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground"
              asChild
            >
              <a href="https://wa.me/919820320216" target="_blank" rel="noopener noreferrer" data-testid="cta-button-call">
                <Phone className="w-5 h-5" />
                +91 9820320216
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm opacity-80">
            <MessageCircle className="w-4 h-4" />
            <span>Or WhatsApp us for instant response</span>
          </div>
        </div>
      </div>
    </section>
  );
}
