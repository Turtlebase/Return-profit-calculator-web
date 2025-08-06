
import { ReturnProfitCalculator } from '@/components/tools/return-profit-calculator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DollarSign, Package, Truck, CornerDownLeft, Percent, Wallet } from 'lucide-react';


export const metadata: Metadata = {
  title: 'Net Profit Calculator for D2C Brands',
  description: 'Calculate your true net profit per order by factoring in returns, COGS, shipping, and payment gateway fees. Make data-driven decisions for your e-commerce business.',
  alternates: {
    canonical: '/tools/net-profit-calculator',
  },
}

const calculatorInputs = [
    {
        icon: DollarSign,
        title: 'Selling Price',
        description: 'The final price the customer pays for your product.'
    },
    {
        icon: Package,
        title: 'Cost of Goods Sold (COGS)',
        description: 'The direct cost of producing the product (materials, manufacturing).'
    },
    {
        icon: Truck,
        title: 'Forward Shipping Cost',
        description: 'The cost to ship the product to the customer.'
    },
    {
        icon: CornerDownLeft,
        title: 'Return & Reverse Shipping',
        description: 'Combined cost to get a product back and restock it.'
    },
    {
        icon: Percent,
        title: 'Payment Gateway Fee %',
        description: 'The percentage your payment processor charges per transaction.'
    },
    {
        icon: Wallet,
        title: 'Return Rate %',
        description: 'The percentage of orders that are returned by customers.'
    },
]


export default function NetProfitCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-6xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">True Net Profit Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Go beyond surface-level revenue. Understand your real profit per order after all costs are accounted for.
              </p>
            </header>

            <Card className="shadow-lg overflow-hidden">
                <CardContent className="p-0">
                    <ReturnProfitCalculator />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2>Why True Net Profit Matters</h2>
                  <p>Many D2C brands focus on metrics like Revenue and Return on Ad Spend (ROAS), but these numbers can be misleading. A high revenue figure doesn't guarantee a healthy business if your costs are out of control. The True Net Profit per order is the ultimate measure of your business's financial health and sustainability.</p>
                  <blockquote>
                      <p>Calculating your net profit reveals the real impact of hidden costs like returns, reverse shipping, and payment gateway fees, which can silently erode your margins.</p>
                  </blockquote>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2>How It Works</h2>
                  <p>This tool gives you a clear, honest picture of your profitability. Here's a visual breakdown of the inputs:</p>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
                        {calculatorInputs.map((input) => (
                            <div key={input.title} className="p-4 rounded-lg bg-card border flex flex-col items-center text-center">
                                <input.icon className="w-8 h-8 text-primary mb-2" />
                                <h4 className="font-semibold text-sm">{input.title}</h4>
                            </div>
                        ))}
                   </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-16">
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How can I reduce my return rate?</AccordionTrigger>
                        <AccordionContent>
                        Focus on clear product descriptions, high-quality images, and customer reviews. Proactive communication and a simple, fair return policy can also help.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is this calculator suitable for all e-commerce businesses?</AccordionTrigger>
                        <AccordionContent>
                        Yes, this calculator is designed for any D2C or e-commerce business that ships physical products and deals with returns. It's particularly useful for brands in the Indian market where Cash on Delivery (COD) can lead to higher return rates.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why is my Break-Even Return Rate so low?</AccordionTrigger>
                        <AccordionContent>
                        A low break-even rate is usually a sign of thin profit margins. This means each return has a significant negative impact. To improve this, look at increasing your prices, reducing your COGS, or negotiating better shipping rates.
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
