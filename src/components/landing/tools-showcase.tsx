'use client';

import {
  Calculator,
  PackageX,
  ShieldCheck,
  Target,
  Percent,
  HeartHandshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <Link href={href} className="group relative cursor-pointer overflow-hidden rounded-xl p-px bg-gradient-to-br from-primary/20 to-secondary/20 transition-all duration-300 hover:from-primary/50 hover:to-accent/50 hover:shadow-2xl hover:shadow-primary/20 block">
      <div className="h-full rounded-[11px] bg-background p-6 transition-all duration-300 group-hover:-translate-y-1">
          <div className="mb-4">
              <div className="p-3 rounded-lg bg-primary/10 w-fit">
                <Icon className="w-6 h-6 text-primary" />
              </div>
          </div>
          <h3 className="text-lg font-semibold mb-1 text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <Button variant="link" className="p-0 h-auto text-primary">Open Tool &rarr;</Button>
        </div>
    </Link>
  );

export default function ToolsShowcase() {
  return (
    <section id="tools" className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your D2C Profit Toolkit</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Interactive tools to help you understand and improve your bottom line.
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
