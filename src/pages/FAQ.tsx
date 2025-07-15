import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What products do you offer?",
    answer: "We offer essential items for college students including comfortable mattresses, quality pillows, and basic toiletries at affordable prices."
  },
  {
    question: "How do I place an order?",
    answer: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payments via QR code scanning for quick and secure transactions."
  },
  {
    question: "Do you deliver to hostels?",
    answer: "Yes, we deliver directly to college hostels and dormitories. Just provide your complete address during checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unused items in their original packaging. Contact us for return instructions."
  },
  {
    question: "How can I track my order?",
    answer: "After placing your order, you'll receive an order number. You can track your order status in the 'Orders' section of your account."
  },
  {
    question: "Are there any delivery charges?",
    answer: "Delivery charges may apply based on your location and order value. Free delivery is available for orders above ₹500."
  },
  {
    question: "Can I modify my order after placing it?",
    answer: "Orders can be modified within 1 hour of placement. After that, please contact our support team for assistance."
  }
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions about College Essentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}