import { useState } from "react";
import { Shield, Award, Users, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import nismCertificate from "@assets/SUNIL_GHAYRE_NISM_VA_1766743471322.pdf";
import mdrtCertificate from "@assets/WhatsApp_Image_2025-12-26_at_15.32.46_1766746882621.jpeg";

const trustItems = [
  {
    icon: Award,
    label: "MDRT Awardee",
    description: "by Axis Bank",
    link: null,
    showImage: true,
  },
  {
    icon: Award,
    label: "IRDAI Licensed",
    description: "Insurance Partner",
    link: nismCertificate,
    showImage: false,
  },
  {
    icon: Users,
    label: "100+",
    description: "Families Served",
    link: null,
    showImage: false,
  },
  {
    icon: Clock,
    label: "15+ Years",
    description: "Industry Experience",
    link: null,
    showImage: false,
  },
];

export default function TrustBar() {
  const [mdrtOpen, setMdrtOpen] = useState(false);

  return (
    <section className="bg-card border-y">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item) => {
            const content = (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </>
            );

            if (item.showImage) {
              return (
                <button
                  key={item.label}
                  onClick={() => setMdrtOpen(true)}
                  className="flex items-center gap-3 hover-elevate rounded-md p-1 -m-1 cursor-pointer text-left"
                  data-testid={`trust-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                >
                  {content}
                </button>
              );
            }

            if (item.link) {
              return (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover-elevate rounded-md p-1 -m-1 cursor-pointer"
                  data-testid={`trust-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="flex items-center gap-3"
                data-testid={`trust-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                {content}
              </div>
            );
          })}
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
              className="max-w-full h-auto rotate-90"
              style={{ maxHeight: "70vh" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
