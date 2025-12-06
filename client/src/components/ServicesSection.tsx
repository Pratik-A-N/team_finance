import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "mutual-funds",
    icon: TrendingUp,
    title: "Mutual Funds",
    description: "Build long-term wealth with expertly curated mutual fund portfolios tailored to your risk profile and financial goals.",
    features: [
      "SIP & Lump Sum Options",
      "Equity, Debt & Hybrid Funds",
      "Tax-saving ELSS Funds",
      "Regular Portfolio Reviews",
    ],
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "term-insurance",
    icon: Shield,
    title: "Term Insurance",
    description: "Secure your family's financial future with comprehensive term insurance plans offering maximum coverage at affordable premiums.",
    features: [
      "High Sum Assured",
      "Critical Illness Cover",
      "Accidental Death Benefit",
      "Flexible Premium Options",
    ],
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    id: "health-insurance",
    icon: Heart,
    title: "Health Insurance",
    description: "Protect your loved ones with comprehensive health coverage that ensures quality healthcare without financial stress.",
    features: [
      "Cashless Hospitalization",
      "Pre & Post Care Coverage",
      "Family Floater Plans",
      "No Claim Bonus",
    ],
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
  },
];

interface ServicesSectionProps {
  onServiceClick?: (serviceId: string) => void;
}

export default function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial solutions designed to help you achieve your goals
            and protect what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              className="group hover-elevate"
              data-testid={`card-service-${service.id}`}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-md ${service.bgColor} flex items-center justify-center mb-4`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => onServiceClick?.(service.id)}
                  data-testid={`button-learn-${service.id}`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
