import { CLVCalculator } from '@/components/tools/clv-calculator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Lifetime Value (CLV) Calculator',
  description: 'Estimate the total profit your business can expect from a single customer over their entire relationship. Use CLV to inform marketing budgets and retention strategies.',
  alternates: {
    canonical: '/tools/clv-calculator',
  },
}

export default function CLVCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Customer Lifetime Value (CLV) Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                How much is a customer really worth? Understand the long-term value to make smarter acquisition decisions.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <CLVCalculator />
                </CardContent>
            </Card>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-16">
                <h2>What is Customer Lifetime Value (CLV)?</h2>
                <p>Customer Lifetime Value (CLV or LTV) is a prediction of the net profit attributed to the entire future relationship with a customer. It's one of the most important metrics for a D2C brand because it shifts your focus from short-term transactions to long-term relationships.</p>
                <blockquote>
                    <p>Knowing your CLV helps you determine how much you can afford to spend to acquire a new customer (your Customer Acquisition Cost, or CAC) while remaining profitable.</p>
                </blockquote>
                
                <h2>How This Calculator Works</h2>
                <p>This calculator uses a simple yet powerful formula to estimate your CLV. Here's a guide to the inputs:</p>
                <ul>
                    <li><strong>Average Order Value (AOV):</strong> The average amount a customer spends in a single transaction. Calculated as (Total Revenue / Total Orders).</li>
                    <li><strong>Purchases Per Year (Frequency):</strong> The average number of times a customer makes a purchase from you in a one-year period.</li>
                    <li><strong>Avg. Customer Lifespan (years):</strong> The average number of years a customer continues to purchase from your brand. For new businesses, 1-3 years is a common estimate.</li>
                    <li><strong>Gross Profit Margin %:</strong> Your profit margin before marketing and operating expenses. Calculated as ((Revenue - COGS) / Revenue) * 100.</li>
                </ul>

                <h2>Understanding Your CLV Results</h2>
                <p>The tool provides two key figures:</p>
                <ol>
                    <li><strong>Estimated CLV:</strong> This is the main result. It represents the total profit you can reasonably expect from an average customer over their entire time with your brand.</li>
                    <li><strong>Annual Customer Value:</strong> This is the value a customer brings to your business in a single year, before accounting for their entire lifespan.</li>
                </ol>
                <p>A healthy D2C business should have a CLV that is at least 3 times its Customer Acquisition Cost (CAC). For example, if your CLV is ₹9000, you should aim to spend no more than ₹3000 to acquire a new customer.</p>

                <h2>Frequently Asked Questions (FAQ)</h2>
                <Card className="bg-card mt-6">
                    <CardHeader><CardTitle className="text-xl">FAQ</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">How can I increase my CLV?</h4>
                            <p className="text-sm text-muted-foreground">To increase CLV, you can focus on three areas: 1) Increasing Average Order Value (AOV) through bundling or upsells, 2) Increasing purchase frequency with email marketing and loyalty programs, and 3) Increasing customer lifespan through excellent service and community building.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">My business is new. How do I estimate these numbers?</h4>
                            <p className="text-sm text-muted-foreground">If you lack historical data, use industry benchmarks and educated guesses as a starting point. As your business grows and you collect more data, you can refine your calculations for greater accuracy.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Is this a simple or complex CLV model?</h4>
                            <p className="text-sm text-muted-foreground">This is a simple, historical CLV model. More complex predictive models exist, but this approach gives you a powerful and actionable baseline without requiring a data scientist. It's the perfect starting point for any D2C brand.</p>
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
