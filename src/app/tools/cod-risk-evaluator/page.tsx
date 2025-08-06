import { CODRiskEvaluator } from '@/components/tools/cod-risk-evaluator';
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
  title: 'AI COD Order Risk Evaluator for Indian D2C',
  description: 'Use AI to analyze Cash on Delivery (COD) orders and predict the risk of RTO (Return to Origin). Reduce losses by making smarter fulfillment decisions.',
  alternates: {
    canonical: '/tools/cod-risk-evaluator',
  },
}

export default function CODRiskEvaluatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI-Powered COD Risk Evaluator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Should you ship that Cash on Delivery order? Get an instant, data-driven recommendation from our AI.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <CODRiskEvaluator />
                </CardContent>
            </Card>

            <div className="max-w-4xl mx-auto mt-24">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold">How Our AI Analyzes Risk</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Our AI model acts as an intelligent risk analyst, helping you identify high-risk orders before you ship them by analyzing key data points.
                    </p>
                 </div>
            </div>

            <div className="max-w-4xl mx-auto mt-16">
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is the AI always correct?</AccordionTrigger>
                        <AccordionContent>
                        The AI provides a highly educated recommendation based on the data provided, but it is not a guarantee. It should be used as a decision-support tool to augment your own business logic and fulfillment processes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I get even more accurate results?</AccordionTrigger>
                        <AccordionContent>
                        The quality of your input determines the quality of the output. Be as specific as possible in the 'Customer History' and 'Shipping Address' fields for the most accurate analysis.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What should I do for a 'High Risk' order?</AccordionTrigger>
                        <AccordionContent>
                        For high-risk orders, it's often best to contact the customer via WhatsApp or phone call to confirm their intent to receive the order. You can also offer a small discount to convert their order to a prepaid method.
                        </AccordionContent>
                    </AccordionItem>
                 </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
