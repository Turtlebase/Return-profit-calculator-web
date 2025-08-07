'use client';

import {
  Calculator,
  PackageX,
  ShieldCheck,
  Target,
  Percent,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const tools = [
  {
    id: 'return-profit',
    icon: Calculator,
    title: 'Net Profit Calculator',
    description: 'Calculate net profit after all returns, fees, and costs.',
    href: '/tools/net-profit-calculator',
  },
  {
    id: 'roas',
    icon: Target,
    title: 'Ad Spend ROAS Tool',
    description: 'Find your break-even Return On Ad Spend.',
    href: '/tools/roas-calculator',
  },
  {
    id: 'cod-risk',
    icon: ShieldCheck,
    title: 'COD Risk Evaluator',
    description: 'Use AI to assess fraud risk for Cash on Delivery orders.',
    href: '/tools/cod-risk-evaluator',
  },
  {
    id: 'rto-loss',
    icon: PackageX,
    title: 'RTO Loss Estimator',
    description: 'AI-powered RTO loss prediction and mitigation.',
    href: '/tools/rto-loss-analyzer',
  },
  {
    id: 'discount',
    icon: Percent,
    title: 'Discount Impact Calculator',
    description: 'See how discounts affect your real profit margins.',
    href: '/tools/discount-impact-calculator',
  },
  {
    id: 'clv-calculator',
    icon: HeartHandshake,
    title: 'CLV Calculator',
    description: 'Estimate the lifetime value of your customers.',
    href: '/tools/clv-calculator',
  },
];

const ToolCard = ({ icon: Icon, title, description, href }: (typeof tools)[0]) => (
    <Link href={href} className="group block">
      <Card className="h-full p-6 bg-card/50 dark:bg-card/20 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-2 hover:shadow-primary/5">
        <div className="mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent w-fit border border-primary/20">
              <Icon className="w-7 h-7 text-primary" />
            </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-base mb-4">{description}</p>
        <div className="flex items-center font-semibold text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Open Tool <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </Card>
    </Link>
  );

export default function ToolsShowcase() {
  return (
    <section id="tools" className="py-24 sm:py-32 bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Your D2C Profitability Toolkit</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Free, interactive calculators to help you understand and improve your bottom line. No sign-up required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
