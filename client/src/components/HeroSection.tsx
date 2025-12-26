import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/financial_advisor_consulting_clients.png";
import nismCertificate from "@assets/SUNIL_GHAYRE_NISM_VA_1766743471322.pdf";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

const highlights = [
  { text: "MDRT Awardee by Axis Bank", link: null },
  { text: "IRDAI Licensed", link: nismCertificate },
  { text: "100+ Clients", link: null },
];

export default function HeroSection({ onGetStarted, onLearnMore }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Financial advisor consulting with clients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-6">
            {highlights.map((item) => (
              item.link ? (
                <a key={item.text} href={item.link} target="_blank" rel="noopener noreferrer">
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 backdrop-blur-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {item.text}
                  </Badge>
                </a>
              ) : (
                <Badge
                  key={item.text}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {item.text}
                </Badge>
              )
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-serif">
            Growing Your Wealth
          </h1>
          
          <p className="text-2xl md:text-3xl text-secondary font-semibold mb-6">
            Personalized Financial Advisory
          </p>

          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Get expert guidance on mutual funds, insurance, and wealth planning.
            Team Finance helps Indian families build wealth with transparency and trust.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="gap-2"
              data-testid="hero-button-get-started"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onLearnMore}
              className="bg-white/10 text-white border-white/30 backdrop-blur-sm"
              data-testid="hero-button-learn-more"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">Trusted by families across India</p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">100+</p>
                <p className="text-white/70 text-sm">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">₹500Cr+</p>
                <p className="text-white/70 text-sm">Assets Managed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">15+</p>
                <p className="text-white/70 text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
