"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export function CLVCalculator() {
    const [aov, setAov] = useState("1500"); // Average Order Value
    const [apfr, setApfr] = useState("2.5"); // Average Purchase Frequency Rate
    const [gcm, setGcm] = useState(60); // Gross Customer Margin
    const [lifespan, setLifespan] = useState("3"); // Customer Lifespan in years

    const { clv, customerValue } = useMemo(() => {
        const avgOrderValue = Number(aov) || 0;
        const avgPurchaseFreq = Number(apfr) || 0;
        const grossMargin = Number(gcm) / 100 || 0;
        const customerLifespan = Number(lifespan) || 0;

        // Customer Value = Average Order Value * Average Purchase Frequency
        const cv = avgOrderValue * avgPurchaseFreq;
        
        // CLV = Customer Value * Gross Margin * Customer Lifespan
        const calculatedClv = cv * grossMargin * customerLifespan;
        
        return {
            clv: calculatedClv,
            customerValue: cv,
        };
    }, [aov, apfr, gcm, lifespan]);

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <div>
                    <Label>Average Order Value (AOV) (₹)</Label>
                    <Input type="number" value={aov} onChange={(e) => setAov(e.target.value)} />
                </div>
                <div>
                    <Label>Purchases Per Year (Frequency)</Label>
                    <Input type="number" step="0.1" value={apfr} onChange={(e) => setApfr(e.target.value)} />
                </div>
                 <div>
                    <Label>Avg. Customer Lifespan (years)</Label>
                    <Input type="number" value={lifespan} onChange={(e) => setLifespan(e.target.value)} />
                </div>
                <div>
                    <Label>Gross Profit Margin - {gcm}%</Label>
                    <Slider value={[gcm]} onValueChange={(val) => setGcm(val[0])} max={100} step={1} />
                </div>
            </div>
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle>Customer Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex flex-col justify-between items-center p-4 rounded-lg bg-background text-center">
                        <span className="text-muted-foreground mb-1">Estimated CLV</span>
                        <span className="font-bold text-4xl text-primary">
                          ₹{clv.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                        <span className="text-muted-foreground">Annual Customer Value</span>
                        <span className="font-bold text-lg">
                           ₹{customerValue.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center pt-2">
                        This is the total profit your business can expect from a single customer over their entire relationship with you.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
