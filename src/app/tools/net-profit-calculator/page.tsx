import { ReturnProfitCalculator } from '@/components/tools/return-profit-calculator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Net Profit Calculator for D2C Brands',
  description: 'Calculate your true net profit per order by factoring in returns, COGS, shipping, and payment gateway fees. Make data-driven decisions for your e-commerce business.',
  alternates: {
    canonical: '/tools/net-profit-calculator',
  },
}

export default function NetProfitCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">True Net Profit Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Go beyond surface-level revenue. Understand your real profit per order after all costs are accounted for.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <ReturnProfitCalculator />
                </CardContent>
            </Card>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-16">
                <h2>Why True Net Profit Matters</h2>
                <p>Many D2C brands focus on metrics like Revenue and Return on Ad Spend (ROAS), but these numbers can be misleading. A high revenue figure doesn't guarantee a healthy business if your costs are out of control. The True Net Profit per order is the ultimate measure of your business's financial health and sustainability.</p>
                <blockquote>
                    <p>Calculating your net profit reveals the real impact of hidden costs like returns, reverse shipping, and payment gateway fees, which can silently erode your margins.</p>
                </blockquote>
                
                <h2>How to Use This Calculator</h2>
                <p>This tool is designed to give you a clear, honest picture of your profitability on a per-order basis. Here's a breakdown of the inputs:</p>
                <ul>
                    <li><strong>Selling Price:</strong> The final price the customer pays for your product.</li>
                    <li><strong>Cost of Goods Sold (COGS):</strong> The direct cost of producing the product (materials, manufacturing).</li>
                    <li><strong>Forward Shipping Cost:</strong> The cost to ship the product to the customer.</li>
                    <li><strong>Return Processing & Reverse Shipping:</strong> The combined cost to get a product back from a customer and restock it. This is a critical and often underestimated expense.</li>
                    <li><strong>Payment Gateway Fee:</strong> The percentage your payment processor charges per transaction (e.g., 2.5%).</li>
                    <li><strong>Return Rate:</strong> The percentage of orders that are returned by customers.</li>
                </ul>

                <h2>Interpreting the Results</h2>
                <p>The calculator provides four key outputs:</p>
                <ol>
                    <li><strong>True Net Profit Per Order:</strong> This is your blended profit across all orders (including the cost of returns). If this number is negative, your business is losing money on every sale.</li>
                    <li><strong>Profit on a Successful Sale:</strong> How much you make on an order that is not returned.</li>
                    <li><strong>Loss on a Returned Sale:</strong> The total amount you lose when a customer returns an order. This includes the lost COGS and double shipping costs.</li>
                    <li><strong>Break-Even Return Rate:</strong> This is the maximum return rate your business can sustain before it starts losing money. If your actual return rate is higher than this, you must take action to reduce returns or increase margins.</li>
                </ol>

                <h2>Frequently Asked Questions (FAQ)</h2>
                <Card className="bg-card mt-6">
                    <CardHeader><CardTitle className="text-xl">FAQ</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">How can I reduce my return rate?</h4>
                            <p className="text-sm text-muted-foreground">Focus on clear product descriptions, high-quality images, and customer reviews. Proactive communication and a simple, fair return policy can also help.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Is this calculator suitable for all e-commerce businesses?</h4>
                            <p className="text-sm text-muted-foreground">Yes, this calculator is designed for any D2C or e-commerce business that ships physical products and deals with returns. It's particularly useful for brands in the Indian market where Cash on Delivery (COD) can lead to higher return rates.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Why is my Break-Even Return Rate so low?</h4>
                            <p className="text-sm text-muted-foreground">A low break-even rate is usually a sign of thin profit margins. This means each return has a significant negative impact. To improve this, look at increasing your prices, reducing your COGS, or negotiating better shipping rates.</p>
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
