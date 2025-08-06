import { DiscountImpactCalculator } from '@/components/tools/discount-impact-calculator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Profit Margin Calculator',
  description: 'Analyze how discounts and promotions impact your true profit margins. See the real effect of a sale on your bottom line before you launch your next campaign.',
  alternates: {
    canonical: '/tools/discount-impact-calculator',
  },
}

export default function DiscountImpactCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Discount Impact Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                How much is that discount *really* costing you? Find out before you run your next sale.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <DiscountImpactCalculator />
                </CardContent>
            </Card>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-16">
                <h2>The Hidden Costs of Discounts</h2>
                <p>Discounts are a powerful tool for driving sales, but they can be a dangerous double-edged sword. A simple "10% Off" promotion can have a much larger impact on your net profit than you might think. This calculator is designed to reveal the true financial impact of your promotions.</p>
                <blockquote>
                    <p>Before launching a sale, it's crucial to model how the discount will affect your profit per sale. This allows you to set strategic discount rates that drive volume without destroying your profitability.</p>
                </blockquote>
                
                <h2>How to Use This Calculator</h2>
                <p>Provide three simple inputs to see the full picture:</p>
                <ul>
                    <li><strong>Original Price:</strong> The normal selling price of your product before any discount is applied.</li>
                    <li><strong>Cost of Goods Sold (COGS):</strong> The direct cost to produce or acquire one unit of the product.</li>
                    <li><strong>Discount %:</strong> The percentage discount you are planning to offer to the customer.</li>
                </ul>

                <h2>Understanding the Impact Analysis</h2>
                <p>The tool instantly calculates four key metrics:</p>
                <ol>
                    <li><strong>Discounted Price:</strong> The final price the customer pays after the discount.</li>
                    <li><strong>Profit per Sale:</strong> The absolute amount of profit (in ₹) you make on each discounted sale.</li>
                    <li><strong>Profit Margin:</strong> The percentage of the discounted price that is actual profit. This is a critical indicator of profitability.</li>
                    <li><strong>Change in Profit:</strong> This shows you how much your profit per sale has decreased (as a percentage) compared to a full-price sale. This number is often surprisingly high and is a powerful motivator to be strategic with discounts.</li>
                </ol>

                <h2>Frequently Asked Questions (FAQ)</h2>
                <Card className="bg-card mt-6">
                    <CardHeader><CardTitle className="text-xl">FAQ</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Should I ever run a sale if my profit becomes negative?</h4>
                            <p className="text-sm text-muted-foreground">Sometimes, yes. A "loss leader" strategy can be effective for customer acquisition, where you intentionally lose money on a product to acquire a new customer who you believe will have a high lifetime value (CLV). Use this strategy sparingly and track your numbers carefully.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Does this calculator account for increased sales volume?</h4>
                            <p className="text-sm text-muted-foreground">This calculator focuses on the impact on your profit margin per unit. It does not forecast the potential increase in sales volume. You should use this tool to understand the margin trade-off and then estimate the sales lift required to make the promotion worthwhile.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">What's a healthy profit margin to maintain during a sale?</h4>
                            <p className="text-sm text-muted-foreground">This depends heavily on your industry, business model, and overall financial goals. However, you should always ensure your margin is high enough to cover all other operating costs (salaries, rent, etc.) not included in the COGS. Never discount so heavily that you can't cover your fundamental business costs.</p>
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
