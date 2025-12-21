import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, TrendingUp, Briefcase } from "lucide-react";
import founderImage from "@assets/profile_pic_1766269477626.png";

export default function FounderSection() {
  const achievements = [
    { icon: Briefcase, label: "15+ Years Experience" },
    { icon: Users, label: "100+ Families Guided" },
    { icon: Award, label: "MDRT Awardee" },
    { icon: TrendingUp, label: "2 Cr+ AUM" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Meet Our Founder
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building trust through expertise, ethics, and personalized financial guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={founderImage}
                alt="Sunil Ghayre - Founder"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-primary/20"
                data-testid="img-founder"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Founder & Financial Advisor
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif mb-2" data-testid="text-founder-name">
                Sunil Ghayre
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                MBA in Finance | MDRT Awardee
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground" data-testid="text-founder-bio">
              <p>
                Mr. Sunil Ghayre is an MBA in Finance with over 15 years of experience in the financial services industry. Over the years, he has guided 100+ families in building disciplined, goal-based financial plans covering investments, insurance and long-term wealth creation.
              </p>
              <p>
                He is an MDRT awardee with Axis Max Life Insurance, reflecting consistent excellence in client advisory and ethical practices. Currently managing an AUM of 2 Cr+, He focuses on simplifying personal finance and helping families achieve long-term financial stability and peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {achievements.map((achievement) => (
                <Card key={achievement.label} className="bg-background">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{achievement.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
