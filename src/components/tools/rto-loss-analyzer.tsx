"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getRtoLossAnalysis } from "@/app/actions";
import { type AnalyzeRtoLossOutput } from "@/ai/flows/rto-loss-analyzer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Zap, ShieldAlert, Lightbulb, Upload } from "lucide-react";

const formSchema = z.object({
  historicalData: z.string().min(1, { message: "Please upload a CSV file." }),
  marketConditions: z.string().min(20, { message: "Please describe market conditions." }),
});

export function RTOLossAnalyzer() {
  const [result, setResult] = useState<AnalyzeRtoLossOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalData: "",
      marketConditions: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        form.setValue("historicalData", text);
      };
      reader.readAsText(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await getRtoLossAnalysis(values);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="historicalData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Sales & Returns Data</FormLabel>
                  <FormControl>
                    <div>
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary">
                          <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg">
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                              <p className="mt-1 text-sm text-muted-foreground">{fileName ? fileName : 'Click to upload a .csv file'}</p>
                            </div>
                          </div>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Market Conditions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., High competition in our niche, upcoming festive season, supply chain delays, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>) : (<> <Zap className="mr-2 h-4 w-4" /> Analyze RTO Loss</>)}
            </Button>
          </form>
        </Form>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in-50">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-lg text-primary">Predicted RTO Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center">
                ${result.predictedRtoLoss.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><ShieldAlert className="w-5 h-5 text-destructive" /> Key Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  {result.riskFactors.map((factor, i) => <li key={i}>{factor}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="w-5 h-5 text-yellow-400" /> Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
           <Button onClick={() => { setResult(null); form.reset(); setFileName(""); }} variant="outline" className="w-full">
            Start New Analysis
          </Button>
        </div>
      )}
    </div>
  );
}
