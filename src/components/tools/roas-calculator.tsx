"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export function ROASCalculator() {
  const [adSpend, setAdSpend] = useState("1000");
  const [revenue, setRevenue] = useState("4000");
  const [cogsPercent, setCogsPercent] = useState(30);

  const { roas, profit, breakEvenRoas } = useMemo(() => {
    const spend = Number(adSpend) || 0;
    const rev = Number(revenue) || 0;
    const cogs = Number(cogsPercent) / 100 || 0;

    const calculatedRoas = spend > 0 ? (rev / spend) : 0;
    const calculatedProfit = rev - spend - (rev * cogs);
    const calculatedBreakEvenRoas = cogs < 1 ? 1 / (1 - cogs) : 0;

    return {
      roas: calculatedRoas,
      profit: calculatedProfit,
      breakEvenRoas: calculatedBreakEvenRoas,
    };
  }, [adSpend, revenue, cogsPercent]);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
          <Label htmlFor="adSpend">Total Ad Spend ($)</Label>
          <Input id="adSpend" type="number" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="revenue">Total Revenue ($)</Label>
          <Input id="revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="cogs">Cost of Goods Sold (COGS) - {cogsPercent}%</Label>
          <Slider id="cogs" value={[cogsPercent]} onValueChange={(val) => setCogsPercent(val[0])} max={100} step={1} />
        </div>
      </div>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-background">
            <span className="text-muted-foreground">Your ROAS</span>
            <span className="font-bold text-lg">{roas.toFixed(2)}x</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-background">
            <span className="text-muted-foreground">Break-Even ROAS</span>
            <span className="font-bold text-lg text-amber-500">{breakEvenRoas.toFixed(2)}x</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-background">
            <span className="text-muted-foreground">Net Profit</span>
            <span className={`font-bold text-lg ${profit >= 0 ? 'text-green-500' : 'text-destructive'}`}>
              ${profit.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
