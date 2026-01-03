import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/financial_advisor_consulting_clients.png";
import mdrtCertificate from "@assets/WhatsApp_Image_2025-12-26_at_15.32.46_1766746882621.jpeg";
import irdaiCertificate from "@assets/WhatsApp_Image_2025-12-24_at_12.33.58_1766771508052.jpeg";
import sebiCertificate from "@assets/WhatsApp_Image_2025-12-24_at_14.36.20_1766771337769.jpeg";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

const highlights = [
  { text: "SEBI Registered", imageType: "sebi" },
  { text: "MDRT Awardee by Axis Bank", imageType: "mdrt" },
  { text: "IRDAI Licensed", imageType: "nism" },
];

export default function HeroSection({ onGetStarted, onLearnMore }: HeroSectionProps) {
  const [mdrtOpen, setMdrtOpen] = useState(false);
  const [nismOpen, setNismOpen] = useState(false);
  const [sebiOpen, setSebiOpen] = useState(false);

  const handleBadgeClick = (imageType: string | null) => {
    if (imageType === "mdrt") {
      setMdrtOpen(true);
    } else if (imageType === "nism") {
      setNismOpen(true);
    } else if (imageType === "sebi") {
      setSebiOpen(true);
    }
  };

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
              item.imageType ? (
                <button
                  key={item.text}
                  type="button"
                  onClick={() => handleBadgeClick(item.imageType)}
                  className="cursor-pointer"
                >
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 backdrop-blur-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {item.text}
                  </Badge>
                </button>
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
            <p className="text-white/70 text-sm mb-6">Trusted by families across India</p>
            <div className="flex flex-wrap justify-start gap-6 sm:gap-10 md:gap-14">
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">100+</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">₹5Cr+</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">Assets Managed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">15+</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={mdrtOpen} onOpenChange={setMdrtOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>MDRT Award Certificate</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src={mdrtCertificate}
              alt="MDRT Award Certificate"
              className="max-w-full h-auto -rotate-90"
              style={{ maxHeight: "70vh" }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={nismOpen} onOpenChange={setNismOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>IRDAI License Certificate (MAX54783C)</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src={irdaiCertificate}
              alt="IRDAI License Certificate"
              className="max-w-full h-auto -rotate-90"
              style={{ maxHeight: "70vh" }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={sebiOpen} onOpenChange={setSebiOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>SEBI Registration Certificate (NISM-202400176239)</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src={sebiCertificate}
              alt="SEBI Registration Certificate"
              className="max-w-full h-auto"
              style={{ maxHeight: "70vh" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
