import { RTOLossAnalyzer } from '@/components/tools/rto-loss-analyzer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI RTO Loss Analyzer & Forecaster',
  description: 'Upload your historical sales data and let our AI analyze potential Return to Origin (RTO) losses, identify key risk factors, and recommend mitigation strategies.',
  alternates: {
    canonical: '/tools/rto-loss-analyzer',
  },
}

export default function RTOLossAnalyzerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI RTO Loss Analyzer</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Turn your historical data into a predictive model for RTO losses.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <RTOLossAnalyzer />
                </CardContent>
            </Card>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-16">
                <h2>Unlock the Power of Your Own Data</h2>
                <p>Return to Origin (RTO) is a major profit leak for e-commerce businesses. While every brand tracks returns, few use that historical data to predict and prevent future losses. This tool uses an AI model to analyze your past performance and provide a forward-looking analysis.</p>
                <blockquote>
                    <p>By understanding the patterns in your past RTOs, you can build a proactive strategy to reduce them, saving you money on shipping, operations, and blocked inventory.</p>
                </blockquote>
                
                <h2>How to Use the Analyzer</h2>
                <p>This tool requires two simple inputs to generate its analysis:</p>
                <ul>
                    <li><strong>Historical Sales & Returns Data:</strong> Upload a CSV file containing your order history. For best results, this file should include columns for order ID, customer location (pincode/city), order value, and return status/reason. The more data you provide, the more accurate the AI's analysis will be.</li>
                    <li><strong>Current Market Conditions:</strong> Provide a brief description of what's happening in your market. Are you in a peak holiday season? Is a new competitor running aggressive ads? This context helps the AI refine its predictions.</li>
                </ul>

                <h2>Understanding the AI-Generated Report</h2>
                <p>After processing your data, the AI delivers a concise report with three main components:</p>
                <ol>
                    <li><strong>Predicted RTO Loss:</strong> A forecasted monetary value of potential losses from returns based on your historical data and current market conditions.</li>
                    <li><strong>Key Risk Factors:</strong> The AI identifies the top drivers of RTOs in your data. This could be specific product categories, high-risk pincodes, or patterns in customer behavior.</li>
                    <li><strong>Recommendations:</strong> Actionable strategies to mitigate the identified risks. This could include suggestions like disabling COD for certain areas, running targeted marketing campaigns, or optimizing your delivery process.</li>
                </ol>

                <h2>Frequently Asked Questions (FAQ)</h2>
                <Card className="bg-card mt-6">
                    <CardHeader><CardTitle className="text-xl">FAQ</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Is my data secure?</h4>
                            <p className="text-sm text-muted-foreground">Absolutely. The data you upload is processed securely and is not stored or used for any purpose other than generating your one-time analysis. The entire process is private and confidential.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">What format should my CSV be in?</h4>
                            <p className="text-sm text-muted-foreground">A simple CSV with clear headers is best. Ensure you have columns like 'OrderID', 'Pincode', 'OrderValue', 'ReturnReason'. The AI is flexible and can interpret various structures, but clear data leads to better results.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">How far back should my historical data go?</h4>
                            <p className="text-sm text-muted-foreground">We recommend providing at least 3-6 months of data for a meaningful analysis. More data, especially covering different seasons or sales periods, will yield a more accurate and robust prediction.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
