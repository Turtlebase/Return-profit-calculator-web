
import * as React from 'react';
import { ReturnProfitCalculator } from '@/components/tools/return-profit-calculator';
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
import { DollarSign, Package, Truck, CornerDownLeft, Percent, Wallet, MinusCircle, ArrowDown } from 'lucide-react';


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
        description: 'Revenue per sale'
    },
    {
        icon: Package,
        title: 'Cost of Goods (COGS)',
        description: 'Manufacturing cost'
    },
    {
        icon: Truck,
        title: 'Shipping Cost',
        description: 'Forward & reverse'
    },
    {
        icon: Percent,
        title: 'Gateway Fees',
        description: 'Transaction charges'
    },
    {
        icon: CornerDownLeft,
        title: 'Return Loss',
        description: 'Impact of RTO %'
    },
]


const VisualProfitJourney = () => (
    <div className="space-y-4">
        {calculatorInputs.map((item, index) => (
            <React.Fragment key={item.title}>
                <div className="group flex items-center gap-4 transition-all duration-300">
                    <div className="flex-shrink-0 bg-card border rounded-lg p-4 group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300">
                        <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                </div>
                {index < calculatorInputs.length -1 && (
                    <div className="flex items-center justify-center h-16 relative">
                        <div className="absolute w-px h-full bg-border left-1/2 transform -translate-x-1/2"></div>
                        <MinusCircle className="w-8 h-8 text-destructive/50 bg-background z-10" />
                    </div>
                )}
            </React.Fragment>
        ))}
         <div className="flex items-center justify-center h-16 relative">
            <div className="absolute w-px h-full bg-border left-1/2 transform -translate-x-1/2"></div>
            <ArrowDown className="w-8 h-8 text-primary/80 bg-background z-10 animate-bounce" />
        </div>
         <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-primary/20 to-green-400/20 border-2 border-green-400/80 shadow-2xl shadow-green-400/10">
            <h3 className="text-2xl font-bold text-white">True Net Profit</h3>
            <p className="text-green-300/80">The final profit in your bank per order.</p>
        </div>
    </div>
);


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

             <div className="max-w-5xl mx-auto">
                <Card className="shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        <ReturnProfitCalculator />
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-2xl mx-auto mt-24">
                 <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                 <VisualProfitJourney />
            </div>

            <div className="max-w-4xl mx-auto mt-24">
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How can I reduce my return rate?</AccordionTrigger>
                        <AccordionContent>
                        Focus on clear product descriptions, high-quality images, and customer reviews. Proactive communication and a simple, fair return policy can also help. For high-risk COD orders, consider phone call verification before shipping.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is my Break-Even Return Rate so important?</AccordionTrigger>
                        <AccordionContent>
                        This is your danger zone threshold. If your actual return rate climbs above your break-even rate, you are officially losing money on an average order basis. It's a critical health metric for your business that signals when you need to urgently address profitability issues.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What are the biggest hidden costs I should watch out for?</AccordionTrigger>
                        <AccordionContent>
                        The biggest hidden costs are almost always related to returns. It's not just the reverse shipping fee. You also lose the original forward shipping cost, incur restocking labor costs, and sometimes the product is damaged and cannot be resold. This calculator helps model that combined negative impact.
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
