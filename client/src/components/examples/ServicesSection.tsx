import ServicesSection from "../ServicesSection";

export default function ServicesSectionExample() {
  return (
    <ServicesSection
      onServiceClick={(id) => console.log(`Service clicked: ${id}`)}
    />
  );
}
