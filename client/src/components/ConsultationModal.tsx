import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import logoImage from "@assets/WhatsApp_Image_2025-12-26_at_16.46.12_1766747848211.jpeg";

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const services = [
  "Mutual Funds",
  "Term Insurance",
  "Health Insurance",
  "Tax Planning",
  "Retirement Planning",
  "Other",
];

const timeSlots = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 7 PM)",
];

export default function ConsultationModal({
  open,
  onOpenChange,
}: ConsultationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    timeSlot: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // todo: remove mock functionality - implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setStep(3);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        timeSlot: "",
        message: "",
      });
    }, 300);
  };

  const isStep1Valid = formData.name && formData.phone && formData.email;
  const isStep2Valid = formData.service && formData.timeSlot;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <img
              src={logoImage}
              alt="Team Finance"
              className="h-10 w-auto"
            />
          </div>
          <DialogTitle className="font-serif">
            {step === 3 ? "Thank You!" : "Schedule Free Consultation"}
          </DialogTitle>
          <DialogDescription>
            {step === 3
              ? "We've received your request and will contact you shortly."
              : "Fill in your details and we'll get back to you within 24 hours."}
          </DialogDescription>
        </DialogHeader>

        {step < 3 && (
          <div className="flex gap-2 mb-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isStep1Valid) setStep(2);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted rounded-md text-sm">
                  +91
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="flex-1"
                  data-testid="input-phone"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                data-testid="input-email"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isStep1Valid}
              data-testid="button-next-step"
            >
              Continue
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service Interest</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
              >
                <SelectTrigger data-testid="select-service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Contact Time</Label>
              <Select
                value={formData.timeSlot}
                onValueChange={(value) => handleInputChange("timeSlot", value)}
              >
                <SelectTrigger data-testid="select-time-slot">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your financial goals..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="resize-none"
                rows={3}
                data-testid="textarea-message"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
                data-testid="button-back"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!isStep2Valid || isSubmitting}
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Your information is secure and will never be shared.
            </p>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Our team will reach out to you at{" "}
              <span className="font-medium text-foreground">
                +91 {formData.phone}
              </span>{" "}
              during your preferred time slot.
            </p>
            <Button onClick={handleClose} data-testid="button-close-modal">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
