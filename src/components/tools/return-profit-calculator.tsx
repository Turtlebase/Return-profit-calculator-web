"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function ReturnProfitCalculator() {
    const [sellingPrice, setSellingPrice] = useState("1000");
    const [cogs, setCogs] = useState("300");
    const [shippingCost, setShippingCost] = useState("80");
    const [returnRate, setReturnRate] = useState(15);
    const [returnProcessingCost, setReturnProcessingCost] = useState("50");
    const [paymentGatewayFee, setPaymentGatewayFee] = useState("2.5");

    const {
        netProfitPerOrder,
        breakEvenReturnRate,
        profitPerSuccessfulSale,
        lossPerReturnedSale
    } = useMemo(() => {
        const sp = Number(sellingPrice) || 0;
        const c = Number(cogs) || 0;
        const sc = Number(shippingCost) || 0;
        const rr = Number(returnRate) / 100 || 0;
        const rpc = Number(returnProcessingCost) || 0;
        const pgf = Number(paymentGatewayFee) / 100 || 0;

        const numberOfOrders = 100;
        const successfulSales = numberOfOrders * (1 - rr);
        const returnedSales = numberOfOrders * rr;

        const revenueFromSuccessful = successfulSales * sp;
        const pgfCost = revenueFromSuccessful * pgf;
        const totalCogs = numberOfOrders * c;
        const totalForwardShipping = numberOfOrders * sc;
        const totalReturnShippingAndProcessing = returnedSales * (sc + rpc);
        
        const totalCostOfBusiness = totalCogs + totalForwardShipping + totalReturnShippingAndProcessing + pgfCost;
        const netProfitFor100Orders = revenueFromSuccessful - totalCostOfBusiness;
        
        const profitPerOrder = netProfitFor100Orders / numberOfOrders;
        
        const profitPerSale = sp - c - sc - (sp * pgf);
        // Cost of a return is the lost COGS, forward shipping, return shipping, and processing.
        const lossPerReturn = c + sc + rpc; 

        // The break-even rate is where the profit from good sales equals the loss from returned sales.
        const ber = profitPerSale > 0 ? (profitPerSale / (profitPerSale + lossPerReturn)) * 100 : 0;

        return {
            netProfitPerOrder: profitPerOrder,
            breakEvenReturnRate: ber,
            profitPerSuccessfulSale: profitPerSale,
            lossPerReturnedSale: lossPerReturn,
        };
    }, [sellingPrice, cogs, shippingCost, returnRate, returnProcessingCost, paymentGatewayFee]);

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                <div>
                    <Label>Selling Price (₹)</Label>
                    <Input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
                </div>
                <div>
                    <Label>Cost of Goods Sold (COGS) (₹)</Label>
                    <Input type="number" value={cogs} onChange={(e) => setCogs(e.target.value)} />
                </div>
                <div>
                    <Label>Forward Shipping Cost (₹)</Label>
                    <Input type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
                </div>
                <div>
                    <Label>Return Processing & Reverse Shipping (₹)</Label>
                    <Input type="number" value={returnProcessingCost} onChange={(e) => setReturnProcessingCost(e.target.value)} />
                </div>
                <div>
                    <Label>Payment Gateway Fee (%)</Label>
                    <Input type="number" value={paymentGatewayFee} onChange={(e) => setPaymentGatewayFee(e.target.value)} />
                </div>
                <div>
                    <Label>Return Rate - {returnRate}%</Label>
                    <Slider value={[returnRate]} onValueChange={(val) => setReturnRate(val[0])} max={100} step={1} />
                </div>
            </div>
            <div className="space-y-4">
              <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                      <CardTitle>Profit Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                          <span className="text-muted-foreground">True Net Profit Per Order</span>
                          <span className={`font-bold text-xl ${netProfitPerOrder >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                              ₹{netProfitPerOrder.toFixed(2)}
                          </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                          <span className="text-muted-foreground">Profit on a successful sale</span>
                          <span className="font-bold text-md text-green-500">₹{profitPerSuccessfulSale.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-background">
                          <span className="text-muted-foreground">Loss on a returned sale</span>
                          <span className="font-bold text-md text-destructive">-₹{lossPerReturnedSale.toFixed(2)}</span>
                      </div>
                  </CardContent>
              </Card>
              <Alert variant={returnRate > breakEvenReturnRate && breakEvenReturnRate > 0 ? "destructive" : "default"}>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Break-Even Return Rate</AlertTitle>
                  <AlertDescription>
                    Your business breaks even at a <span className="font-bold">{breakEvenReturnRate.toFixed(2)}%</span> return rate. Your current rate is <span className="font-bold">{returnRate}%</span>.
                  </AlertDescription>
              </Alert>
            </div>
        </div>
    );
}
