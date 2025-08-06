import { DiscountImpactCalculator } from '@/components/tools/discount-impact-calculator';
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
  title: 'Discount Profit Margin Calculator',
  description: 'Analyze how discounts and promotions impact your true profit margins. See the real effect of a sale on your bottom line before you launch your next campaign.',
  alternates: {
    canonical: '/tools/discount-impact-calculator',
  },
}

export default function DiscountImpactCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Discount Impact Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                How much is that discount *really* costing you? Find out before you run your next sale.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <DiscountImpactCalculator />
                </CardContent>
            </Card>

            <div className="max-w-4xl mx-auto mt-24">
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Should I ever run a sale if my profit becomes negative?</AccordionTrigger>
                        <AccordionContent>
                        Sometimes, yes. A "loss leader" strategy can be effective for customer acquisition, where you intentionally lose money on a product to acquire a new customer who you believe will have a high lifetime value (CLV). Use this strategy sparingly and track your numbers carefully.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this calculator account for increased sales volume?</AccordionTrigger>
                        <AccordionContent>
                        This calculator focuses on the impact on your profit margin per unit. It does not forecast the potential increase in sales volume. You should use this tool to understand the margin trade-off and then estimate the sales lift required to make the promotion worthwhile.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What's a healthy profit margin to maintain during a sale?</AccordionTrigger>
                        <AccordionContent>
                        This depends heavily on your industry, business model, and overall financial goals. However, you should always ensure your margin is high enough to cover all other operating costs (salaries, rent, etc.) not included in the COGS. Never discount so heavily that you can't cover your fundamental business costs.
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
