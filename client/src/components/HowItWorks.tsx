import { MessageSquare, FileSearch, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Free Consultation",
    description: "Schedule a free consultation call where we understand your financial goals, current situation, and risk tolerance.",
  },
  {
    icon: FileSearch,
    step: "02",
    title: "Personalized Plan",
    description: "Our experts analyze your needs and create a customized financial plan with specific product recommendations.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Start Investing",
    description: "We help you execute the plan seamlessly and provide ongoing support to track and optimize your portfolio.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with Team Finance is simple. Three easy steps to begin
            your journey towards financial freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative text-center"
              data-testid={`step-${step.step}`}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-border" />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary mb-2">
                  STEP {step.step}
                </span>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
