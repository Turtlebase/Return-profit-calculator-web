
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { getRoasAnalysis } from '@/app/actions';
import { type RoasAnalysisOutput } from '@/ai/flows/roas-analyzer';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ROASCalculator() {
  const [adSpend, setAdSpend] = useState("1000");
  const [revenue, setRevenue] = useState("4000");
  const [cogsPercent, setCogsPercent] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RoasAnalysisOutput | null>(null);

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

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
        const result = await getRoasAnalysis({
            adSpend: Number(adSpend),
            revenue: Number(revenue),
            cogsPercent: cogsPercent,
            roas: roas,
            netProfit: profit,
            breakEvenRoas: breakEvenRoas,
        });
        setAnalysis(result);
    } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
          <Label htmlFor="adSpend">Total Ad Spend (₹)</Label>
          <Input id="adSpend" type="number" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="revenue">Total Revenue (₹)</Label>
          <Input id="revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="cogs">Cost of Goods Sold (COGS) - {cogsPercent}%</Label>
          <Slider id="cogs" value={[cogsPercent]} onValueChange={(val) => setCogsPercent(val[0])} max={100} step={1} />
        </div>
      </div>
      <div className="space-y-4">
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
                ₹{profit.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </span>
            </div>
            </CardContent>
        </Card>

        <Button onClick={handleAnalysis} disabled={isLoading} className="w-full">
            {isLoading ? <><Loader2 className="animate-spin" /> Analyzing...</> : <><Sparkles /> Get AI Analysis</>}
        </Button>

        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        
        {analysis && (
            <Card className="animate-in fade-in-50 mt-4">
                <CardHeader>
                    <CardTitle className="text-xl">{analysis.headline}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: analysis.analysis }} />
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="w-5 h-5 text-yellow-400" /> Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                                {analysis.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
