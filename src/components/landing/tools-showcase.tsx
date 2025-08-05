'use client';

import {
  Calculator,
  PackageX,
  ShieldCheck,
  Target,
  Percent,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RTOLossAnalyzer } from '@/components/tools/rto-loss-analyzer';
import { ROASCalculator } from '@/components/tools/roas-calculator';
import { DiscountImpactCalculator } from '@/components/tools/discount-impact-calculator';

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
    description: 'Assess fraud risk for Cash on Delivery orders.',
    component: <div className="p-8 text-center text-muted-foreground">This tool is coming soon!</div>,
    isComingSoon: true,
  },
  {
    id: 'return-profit',
    icon: Calculator,
    title: 'Return Profit Calculator',
    description: 'Calculate net profit after all returns and fees.',
    component: <div className="p-8 text-center text-muted-foreground">This tool is coming soon!</div>,
    isComingSoon: true,
  },
];

const ToolCard = ({ icon: Icon, title, description, component, isComingSoon }: (typeof tools)[0]) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <div className="bg-primary/10 p-3 rounded-lg shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary">
            Open Tool &rarr;
          </Button>
        </CardContent>
      </Card>
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
