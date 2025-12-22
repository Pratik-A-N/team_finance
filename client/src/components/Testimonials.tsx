import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import rajanMokashiImage from "@assets/Screenshot_2025-12-22_224334-removebg-preview_1766423680713.png";
import familyImage from "@assets/generated_images/happy_indian_family_home.png";

const testimonials = [
  {
    id: 1,
    name: "Rajan Mokashi",
    location: "Mumbai",
    profession: "Business Owner",
    image: rajanMokashiImage,
    rating: 5,
    quote: "We are very delighted to associate with Team Financial Services. Mr. Sunil Ghayre has complete knowledge of long term investment be it Protection (insurance), wealth creation, and health insurance. They have worked out complete solution for our finances and taken out all our worries about the same. We highly recommend Team Financial Services as complete personal Financial Solution provider.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Trusted by Families Across India
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't just take our word for it. Here's what our clients have to say
              about their experience with Team Finance.
            </p>
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={familyImage}
                alt="Happy Indian family"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-medium">Join 100+ families</p>
                <p className="text-white/80 text-sm">
                  who trust Team Finance for their financial planning
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-background"
                data-testid={`testimonial-${testimonial.id}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Quote className="w-8 h-8 text-primary/20 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.profession}, {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
