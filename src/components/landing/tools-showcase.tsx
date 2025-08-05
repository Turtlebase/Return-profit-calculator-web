
'use client';

import {
  Calculator,
  PackageX,
  ShieldCheck,
  Target,
  Percent,
  HeartHandshake
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RTOLossAnalyzer } from '@/components/tools/rto-loss-analyzer';
import { ROASCalculator } from '@/components/tools/roas-calculator';
import { DiscountImpactCalculator } from '@/components/tools/discount-impact-calculator';
import { CODRiskEvaluator } from '@/components/tools/cod-risk-evaluator';
import { ReturnProfitCalculator } from '@/components/tools/return-profit-calculator';
import { CLVCalculator } from '@/components/tools/clv-calculator';

const tools = [
  {
    id: 'rto-loss',
    icon: PackageX,
    title: 'RTO Loss Estimator',
    description: 'AI-powered RTO loss prediction and mitigation.',
    component: <RTOLossAnalyzer />,
  },
  {
    id: 'roas',
    icon: Target,
    title: 'Ad Spend ROAS Tool',
    description: 'Find your break-even Return On Ad Spend.',
    component: <ROASCalculator />,
  },
  {
    id: 'discount',
    icon: Percent,
    title: 'Discount Impact Calculator',
    description: 'See how discounts affect your real profit margins.',
    component: <DiscountImpactCalculator />,
  },
  {
    id: 'cod-risk',
    icon: ShieldCheck,
    title: 'COD Risk Evaluator',
    description: 'Use AI to assess fraud risk for Cash on Delivery orders.',
    component: <CODRiskEvaluator />,
  },
  {
    id: 'return-profit',
    icon: Calculator,
    title: 'Net Profit Calculator',
    description: 'Calculate net profit after all returns, fees, and costs.',
    component: <ReturnProfitCalculator />,
  },
  {
    id: 'clv-calculator',
    icon: HeartHandshake,
    title: 'CLV Calculator',
    description: 'Estimate the lifetime value of your customers.',
    component: <CLVCalculator />,
  },
];

const ToolCard = ({ icon: Icon, title, description, component }: (typeof tools)[0]) => (
  <Dialog>
    <DialogTrigger asChild>
      <div className="group relative cursor-pointer rounded-xl p-px transition-all duration-300 bg-background hover:bg-primary/5">
         <div className="relative h-full rounded-[11px] bg-background p-6">
            <div className="mb-4">
               <div className="p-3 rounded-lg bg-primary/10 w-fit">
                  <Icon className="w-6 h-6 text-primary" />
               </div>
            </div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
            <Button variant="link" className="p-0 h-auto text-primary">Open Tool &rarr;</Button>
         </div>
         <div className="absolute inset-0 rounded-xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary to-accent" aria-hidden="true"></div>
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] bg-background">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2"><Icon className="w-5 h-5" /> {title}</DialogTitle>
      </DialogHeader>
      {component}
    </DialogContent>
  </Dialog>
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
