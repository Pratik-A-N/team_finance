import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, LineChart, Clock, Headphones, FileCheck, Award } from "lucide-react";
import logoImage from "@assets/WhatsApp_Image_2025-12-26_at_16.46.12_1766747848211.jpeg";

const reasons = [
  {
    icon: UserCheck,
    title: "Personalized Advice",
    description: "Every recommendation is tailored to your unique financial situation, goals, and risk appetite.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Insights",
    description: "We use advanced analytics to optimize your portfolio and maximize returns.",
  },
  {
    icon: Clock,
    title: "Long-Term Partnership",
    description: "We're committed to your financial journey, providing ongoing support and guidance.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get access to expert advisors who are always available to answer your questions.",
  },
  {
    icon: FileCheck,
    title: "Transparent Process",
    description: "No hidden fees or commissions. Complete transparency in all our dealings.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Over 15 years of experience helping families achieve their financial dreams.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={logoImage}
              alt="Team Finance"
              className="h-12 w-auto opacity-90"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Why Choose Team Finance?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're more than just financial advisors. We're your partners in building
            a secure and prosperous future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={reason.title}
              className="bg-background"
              data-testid={`card-reason-${index}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 flex-shrink-0">
                    <reason.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
