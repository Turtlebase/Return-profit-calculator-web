import { ROASCalculator } from '@/components/tools/roas-calculator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Break-Even ROAS Calculator for D2C & E-commerce',
  description: 'Determine the exact Return On Ad Spend (ROAS) your business needs to be profitable. Stop guessing and make data-driven marketing decisions to scale effectively.',
  alternates: {
    canonical: '/tools/roas-calculator',
  },
}

export default function ROASCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Ad Spend ROAS Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Find your break-even point and ensure your advertising is truly profitable.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <ROASCalculator />
                </CardContent>
            </Card>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-16">
                <h2>What is ROAS and Why is Break-Even ROAS Critical?</h2>
                <p>Return On Ad Spend (ROAS) is a marketing metric that measures the amount of revenue your business earns for each dollar it spends on advertising. While a high ROAS might seem good, it doesn't tell the whole story. The only ROAS that truly matters is your <strong>Break-Even ROAS</strong>.</p>
                <blockquote>
                    <p>Your Break-Even ROAS is the point where your revenue from ads exactly covers your ad spend plus the cost of the goods sold. Anything above this number is profit. Anything below is a loss.</p>
                </blockquote>
                
                <h2>How This Calculator Works</h2>
                <p>This tool simplifies the calculation of your advertising profitability. Here's what the inputs mean:</p>
                <ul>
                    <li><strong>Total Ad Spend:</strong> The total amount of money you spent on your advertising campaigns (e.g., on Facebook, Google, etc.).</li>
                    <li><strong>Total Revenue:</strong> The total revenue generated directly from those ad campaigns.</li>
                    <li><strong>Cost of Goods Sold (COGS) %:</strong> The percentage of your revenue that goes towards the direct cost of producing your products. This is your product cost, not including marketing or shipping.</li>
                </ul>

                <h2>Understanding the Results</h2>
                <p>The calculator provides three key outputs to guide your marketing strategy:</p>
                <ol>
                    <li><strong>Your ROAS:</strong> This is your current Return On Ad Spend based on the figures you entered. It's calculated as (Revenue / Ad Spend).</li>
                    <li><strong>Break-Even ROAS:</strong> This is the minimum ROAS you need to achieve to not lose money. It is calculated as 1 / (1 - COGS %). This is your most important metric.</li>
                    <li><strong>Net Profit:</strong> This is the true profit you've made from your ad campaigns after accounting for ad spend and the cost of goods.</li>
                </ol>

                <h2>Frequently Asked Questions (FAQ)</h2>
                <Card className="bg-card mt-6">
                    <CardHeader><CardTitle className="text-xl">FAQ</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">My ROAS is lower than my Break-Even ROAS. What should I do?</h4>
                            <p className="text-sm text-muted-foreground">You are currently losing money on your ads. You should either work on improving your ad campaign's efficiency to increase revenue, or find ways to lower your COGS to reduce your break-even point.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Does this calculator include shipping or other fees?</h4>
                            <p className="text-sm text-muted-foreground">This is a simplified ROAS calculator that focuses on product costs (COGS). For a more comprehensive view of profitability that includes shipping, returns, and other fees, please use our <a href="/tools/net-profit-calculator">True Net Profit Calculator</a>.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">How can I improve my ROAS?</h4>
                            <p className="text-sm text-muted-foreground">Improve your ad targeting, optimize your landing pages for conversion, use more compelling ad creatives, and test different offers. Increasing your Average Order Value (AOV) through upsells or bundles can also significantly boost ROAS.</p>
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
