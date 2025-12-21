import { Shield, Award, Users, Clock } from "lucide-react";

const trustItems = [
  {
    icon: Award,
    label: "MDRT Awardee",
    description: "by Axis Bank",
  },
  {
    icon: Award,
    label: "IRDAI Licensed",
    description: "Insurance Partner",
  },
  {
    icon: Users,
    label: "100+",
    description: "Families Served",
  },
  {
    icon: Clock,
    label: "15+ Years",
    description: "Industry Experience",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-card border-y">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
              data-testid={`trust-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
