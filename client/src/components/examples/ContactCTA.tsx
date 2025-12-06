import ContactCTA from "../ContactCTA";

export default function ContactCTAExample() {
  return <ContactCTA onScheduleCall={() => console.log("Schedule call clicked")} />;
}
