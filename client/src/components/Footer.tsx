import { Mail, Phone, MapPin } from "lucide-react";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import logoImage from "@assets/WhatsApp_Image_2025-12-26_at_16.46.12_1766748068781.png";

const services = [
  { name: "Mutual Funds", href: "#mutual-funds" },
  { name: "Term Insurance", href: "#term-insurance" },
  { name: "Health Insurance", href: "#health-insurance" },
  { name: "Financial Calculator", href: "#calculator" },
  { name: "Retirement Planning", href: "#" },
];

const company = [
  { name: "About Us", href: "#about" },
  { name: "Our Team", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact", href: "#contact" },
];

const resources = [
  { name: "Blog", href: "#" },
  { name: "FAQs", href: "#faq" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const social = [
  { name: "LinkedIn", icon: SiLinkedin, href: "https://www.linkedin.com/company/team-financial-services/" },
  { name: "Instagram", icon: SiInstagram, href: "https://www.instagram.com/team.financial_services?igsh=MjZoM3AzcHM2NDlu" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [location, setLocation] = useLocation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // todo: remove mock functionality - implement actual newsletter subscription
      console.log("Newsletter subscription:", email);
    }
  };

  const navigateToSection = (href: string) => {
    if (href === "#") return;
    const sectionId = href.replace("#", "");
    
    const isHomePage = location === "/" || location === "/landing";
    
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      window.location.href = `/landing?section=${sectionId}`;
    }
  };

  const navigateHome = () => {
    const isHomePage = location === "/" || location === "/landing";
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/landing";
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <button onClick={navigateHome} className="flex items-center gap-2 mb-4">
              <img
                src={logoImage}
                alt="Team Finance Logo"
                className="h-20 w-auto"
              />
            </button>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Growing Your Wealth. Your trusted partner for personalized financial
              advice. Helping Indian families build wealth and secure their future.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a
                  href="https://wa.me/919820320216"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                  data-testid="footer-phone"
                >
                  +91 9820320216
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a
                  href="mailto:info@theteamfinance.com"
                  className="hover:text-primary"
                  data-testid="footer-email"
                >
                  info@theteamfinance.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=114+New+India+Industrial+Estate+Mahakali+Caves+Road+Andheri+East+Mumbai+400093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  data-testid="footer-address"
                >
                  114, New India Industrial Estate,
                  <br />
                  Off, Mahakali Caves Road, Andheri (E)
                  <br />
                  Mumbai - 400 093
                </a>
              </div>
            </div>

            <div className="flex gap-2">
              {social.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  data-testid={`footer-social-${item.name.toLowerCase()}`}
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                    <item.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground text-left"
                    data-testid={`footer-link-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get financial tips and market updates delivered to your inbox.
            </p>
            {subscribed ? (
              <p className="text-sm text-primary">
                Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  className="w-full"
                  data-testid="button-newsletter-subscribe"
                >
                  Subscribe
                </Button>
              </form>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 Team Finance. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground max-w-2xl">
              SEBI Registration No: NISM-202400176239 | IRDAI License No: MAX54783C.
              Mutual Fund investments are subject to market risks. Please read
              all scheme related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
