"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCodRiskAnalysis } from "@/app/actions";
import { type CodRiskOutput } from "@/ai/flows/cod-risk-evaluator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Zap, ShieldAlert, Lightbulb, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  orderValue: z.coerce.number().min(1, { message: "Order value is required." }),
  customerHistory: z.string().min(3, { message: "Customer history is required." }),
  shippingAddress: z.string().min(10, { message: "Please provide a more detailed address." }),
  productCategory: z.string().min(3, { message: "Product category is required." }),
});

const RiskResult = ({ result }: { result: CodRiskOutput }) => {
  const getRiskColor = (level: string) => {
    if (level === 'Low') return 'text-green-500';
    if (level === 'Medium') return 'text-yellow-500';
    return 'text-destructive';
  }
  
  const getRiskIcon = (level: string) => {
    if (level === 'Low') return <CheckCircle className={`w-12 h-12 ${getRiskColor(level)}`} />;
    if (level === 'Medium') return <AlertTriangle className={`w-12 h-12 ${getRiskColor(level)}`} />;
    return <XCircle className={`w-12 h-12 ${getRiskColor(level)}`} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto">
            {getRiskIcon(result.riskLevel)}
          </div>
          <CardTitle className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>{result.riskLevel} Risk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Risk Score</p>
            <div className="flex items-center gap-2">
              <Progress value={result.riskScore} className="w-full" />
              <span className="font-bold">{result.riskScore}/100</span>
            </div>
          </div>
          <Alert className="text-left bg-primary/5 border-primary/20">
            <Lightbulb className="w-5 h-5 text-primary" />
            <AlertTitle>Recommendation</AlertTitle>
            <AlertDescription>{result.recommendation}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><ShieldAlert className="w-5 h-5 text-destructive" /> Contributing Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
            {result.riskFactors.map((factor, i) => <li key={i}>{factor}</li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export function CODRiskEvaluator() {
  const [result, setResult] = useState<CodRiskOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderValue: 1500,
      customerHistory: "First-time customer",
      shippingAddress: "",
      productCategory: "Fashion",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await getCodRiskAnalysis(values);
      setResult(analysisResult);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4">
      {!result && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="orderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Value (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="customerHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer History</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., First-time customer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 123 MG Road, Sector 14, Gurgaon, Haryana, 122001"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electronics, Fashion, Cosmetics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Evaluating...</>) : (<> <Zap className="mr-2 h-4 w-4" /> Evaluate Risk</>)}
            </Button>
          </form>
        </Form>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Evaluation Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <>
          <RiskResult result={result} />
          <Button onClick={() => { setResult(null); form.reset(); }} variant="outline" className="w-full mt-6">
            Start New Evaluation
          </Button>
        </>
      )}
    </div>
  );
}
