import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get started with WealthWise?",
    answer: "Getting started is easy! Simply fill out our consultation form or call us directly. We'll schedule a free 30-minute call to understand your financial goals and create a personalized plan for you.",
  },
  {
    question: "What is the minimum investment amount for mutual funds?",
    answer: "You can start investing in mutual funds with as little as ₹500 per month through a Systematic Investment Plan (SIP). For lump sum investments, the minimum varies by fund but typically starts at ₹5,000.",
  },
  {
    question: "Are your services free?",
    answer: "Our consultation is completely free of cost!!"
  },
  {
    question: "How do you select mutual funds for my portfolio?",
    answer: "We use a rigorous research process that considers fund performance history, expense ratios, fund manager track record, and risk metrics. We match these with your risk profile and investment horizon to create an optimal portfolio.",
  },
  {
    question: "What documents do I need for buying insurance?",
    answer: "For most insurance policies, you'll need PAN card, Aadhaar card, address proof, passport-size photographs, and bank account details. For health insurance, you may also need medical records depending on your age and sum assured.",
  },
  {
    question: "Can I track my investments online?",
    answer: "Yes! We provide access to a comprehensive dashboard where you can track all your investments, insurance policies, and financial goals in real-time. You'll also receive regular reports and updates.",
  },
  {
    question: "What happens if I want to withdraw my mutual fund investment?",
    answer: "Most mutual funds allow redemption at any time (except for certain lock-in funds like ELSS). The process typically takes 2-3 working days for the amount to be credited to your bank account.",
  },
  {
    question: "Do you offer tax planning services?",
    answer: "Absolutely! Tax planning is an integral part of our financial advisory services. We help you maximize tax savings through ELSS funds, insurance premiums, and other tax-saving instruments under Section 80C and beyond.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
