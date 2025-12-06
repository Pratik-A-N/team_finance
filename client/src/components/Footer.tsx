import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import { SiLinkedin, SiX, SiYoutube, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const services = [
  { name: "Mutual Funds", href: "#mutual-funds" },
  { name: "Term Insurance", href: "#term-insurance" },
  { name: "Health Insurance", href: "#health-insurance" },
  { name: "Tax Planning", href: "#" },
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
  { name: "LinkedIn", icon: SiLinkedin, href: "#" },
  { name: "Twitter", icon: SiX, href: "#" },
  { name: "YouTube", icon: SiYoutube, href: "#" },
  { name: "Facebook", icon: SiFacebook, href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // todo: remove mock functionality - implement actual newsletter subscription
      console.log("Newsletter subscription:", email);
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl">WealthWise</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your trusted partner for personalized financial advice. Helping
              Indian families build wealth and secure their future since 2009.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-primary"
                  data-testid="footer-phone"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a
                  href="mailto:hello@wealthwise.in"
                  className="hover:text-primary"
                  data-testid="footer-email"
                >
                  hello@wealthwise.in
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  123 Finance Tower, BKC
                  <br />
                  Mumbai, Maharashtra 400051
                </span>
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
                  <a href={item.href} aria-label={item.name}>
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
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid={`footer-link-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </a>
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
              © 2024 WealthWise Financial Services. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground max-w-2xl">
              SEBI Registration No: INA000012345 | IRDAI License No: 123456789.
              Mutual Fund investments are subject to market risks. Please read
              all scheme related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
