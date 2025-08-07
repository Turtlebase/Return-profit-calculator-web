
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { getDiscountAnalysis } from '@/app/actions';
import { type DiscountAnalysisOutput } from '@/ai/flows/discount-analyzer';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function DiscountImpactCalculator() {
    const [price, setPrice] = useState("1000");
    const [discount, setDiscount] = useState(10);
    const [cogs, setCogs] = useState("300");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<DiscountAnalysisOutput | null>(null);

    const { discountedPrice, profitMargin, profitAmount, originalProfit, profitChange } = useMemo(() => {
        const p = Number(price) || 0;
        const d = Number(discount) / 100 || 0;
        const c = Number(cogs) || 0;

        const finalPrice = p * (1 - d);
        const profit = finalPrice - c;
        const margin = finalPrice > 0 ? (profit / finalPrice) * 100 : 0;
        const origProfit = p - c;
        const change = origProfit !== 0 ? ((profit - origProfit) / Math.abs(origProfit)) * 100 : (profit > 0 ? 100 : 0);
        
        return {
            discountedPrice: finalPrice,
            profitMargin: margin,
            profitAmount: profit,
            originalProfit: origProfit,
            profitChange: change,
        };
    }, [price, discount, cogs]);

    const handleAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await getDiscountAnalysis({
                originalPrice: Number(price),
                cogs: Number(cogs),
                discountPercentage: discount,
                profitAfterDiscount: profitAmount,
                profitMarginAfterDiscount: profitMargin,
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
                    <Label htmlFor="price">Original Price (₹)</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="cogsValue">Cost of Goods Sold (₹)</Label>
                    <Input id="cogsValue" type="number" value={cogs} onChange={(e) => setCogs(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="discount">Discount - {discount}%</Label>
                    <Slider id="discount" value={[discount]} onValueChange={(val) => setDiscount(val[0])} max={100} step={1} />
                </div>
            </div>
            <div className="space-y-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle>Impact Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                            <span className="text-muted-foreground">Discounted Price</span>
                            <span className="font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                            <span className="text-muted-foreground">Profit per Sale</span>
                            <span className={`font-bold text-lg ${profitAmount >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                                ₹{profitAmount.toFixed(2)}
                            </span>
                        </div>
                         <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                            <span className="text-muted-foreground">Profit Margin</span>
                            <span className={`font-bold text-lg ${profitMargin >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                                {profitMargin.toFixed(2)}%
                            </span>
                        </div>
                         <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                            <span className="text-muted-foreground">Change in Profit</span>
                            <span className={`font-bold text-lg ${profitChange >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                                {profitChange >= 0 ? '+' : ''}{profitChange.toFixed(2)}%
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
