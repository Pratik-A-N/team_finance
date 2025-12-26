import { useState } from "react";
import { Shield, Award, Users, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import mdrtCertificate from "@assets/WhatsApp_Image_2025-12-26_at_15.32.46_1766746882621.jpeg";
import irdaiCertificate from "@assets/WhatsApp_Image_2025-12-24_at_12.33.58_1766771508052.jpeg";
import sebiCertificate from "@assets/WhatsApp_Image_2025-12-24_at_14.36.20_1766771337769.jpeg";

const trustItems = [
  {
    icon: Shield,
    label: "SEBI Registered",
    description: "Investment Advisor",
    link: null,
    showImage: "sebi",
  },
  {
    icon: Award,
    label: "MDRT Awardee",
    description: "by Axis Bank",
    link: null,
    showImage: "mdrt",
  },
  {
    icon: Award,
    label: "IRDAI Licensed",
    description: "Insurance Partner",
    link: null,
    showImage: "nism",
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
  const [nismOpen, setNismOpen] = useState(false);
  const [sebiOpen, setSebiOpen] = useState(false);

  const handleClick = (imageType: string | boolean) => {
    if (imageType === "mdrt") {
      setMdrtOpen(true);
    } else if (imageType === "nism") {
      setNismOpen(true);
    } else if (imageType === "sebi") {
      setSebiOpen(true);
    }
  };

  return (
    <>
      <section className="bg-card border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
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
                    type="button"
                    onClick={() => handleClick(item.showImage)}
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
      </section>

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
            <DialogTitle>IRDAI License Certificate</DialogTitle>
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
            <DialogTitle>SEBI Registration Certificate</DialogTitle>
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
    </>
  );
}
