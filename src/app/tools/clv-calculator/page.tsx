import { CLVCalculator } from '@/components/tools/clv-calculator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Customer Lifetime Value (CLV) Calculator',
  description: 'Estimate the total profit your business can expect from a single customer over their entire relationship. Use CLV to inform marketing budgets and retention strategies.',
  alternates: {
    canonical: '/tools/clv-calculator',
  },
}

export default function CLVCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container">
          <section className="py-12 md:py-24">
            <div className="max-w-4xl mx-auto">
              <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Customer Lifetime Value (CLV) Calculator</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  How much is a customer really worth? Understand the long-term value to make smarter acquisition decisions.
                </p>
              </header>

              <Card className="shadow-lg">
                  <CardContent className="p-2 sm:p-4">
                      <CLVCalculator />
                  </CardContent>
              </Card>

              <div className="max-w-4xl mx-auto mt-24">
                   <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                   <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                          <AccordionTrigger>How can I increase my CLV?</AccordionTrigger>
                          <AccordionContent>
                          To increase CLV, you can focus on three areas: 1) Increasing Average Order Value (AOV) through bundling or upsells, 2) Increasing purchase frequency with email marketing and loyalty programs, and 3) Increasing customer lifespan through excellent service and community building.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                          <AccordionTrigger>My business is new. How do I estimate these numbers?</AccordionTrigger>
                          <AccordionContent>
                          If you lack historical data, use industry benchmarks and educated guesses as a starting point. As your business grows and you collect more data, you can refine your calculations for greater accuracy.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                          <AccordionTrigger>Is this a simple or complex CLV model?</AccordionTrigger>
                          <AccordionContent>
                          This is a simple, historical CLV model. More complex predictive models exist, but this approach gives you a powerful and actionable baseline without requiring a data scientist. It's the perfect starting point for any D2C brand.
                          </AccordionContent>
                      </AccordionItem>
                   </Accordion>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
