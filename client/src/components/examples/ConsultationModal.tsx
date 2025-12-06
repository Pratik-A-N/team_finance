import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConsultationModal from "../ConsultationModal";

export default function ConsultationModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Consultation Form</Button>
      <ConsultationModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
