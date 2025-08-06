import { ROASCalculator } from '@/components/tools/roas-calculator';
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
  title: 'Break-Even ROAS Calculator for D2C & E-commerce',
  description: 'Determine the exact Return On Ad Spend (ROAS) your business needs to be profitable. Stop guessing and make data-driven marketing decisions to scale effectively.',
  alternates: {
    canonical: '/tools/roas-calculator',
  },
}

export default function ROASCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Ad Spend ROAS Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Find your break-even point and ensure your advertising is truly profitable.
              </p>
            </header>

            <div className="max-w-5xl mx-auto">
                <Card className="shadow-lg overflow-hidden">
                    <CardContent className="p-2 sm:p-4">
                        <ROASCalculator />
                    </CardContent>
                </Card>
            </div>
            
            <div className="max-w-4xl mx-auto mt-24">
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>My ROAS is lower than my Break-Even ROAS. What should I do?</AccordionTrigger>
                        <AccordionContent>
                        You are currently losing money on your ads. You should either work on improving your ad campaign's efficiency to increase revenue, or find ways to lower your COGS to reduce your break-even point.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this calculator include shipping or other fees?</AccordionTrigger>
                        <AccordionContent>
                        This is a simplified ROAS calculator that focuses on product costs (COGS). For a more comprehensive view of profitability that includes shipping, returns, and other fees, please use our <a href="/tools/net-profit-calculator" className="text-primary underline">True Net Profit Calculator</a>.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I improve my ROAS?</AccordionTrigger>
                        <AccordionContent>
                        Improve your ad targeting, optimize your landing pages for conversion, use more compelling ad creatives, and test different offers. Increasing your Average Order Value (AOV) through upsells or bundles can also significantly boost ROAS.
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
