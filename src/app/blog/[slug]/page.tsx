
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const RtoReductionChart = () => (
    <div className="my-8 h-[300px] bg-card p-4 rounded-lg border">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            { name: 'Q1 (Before)', RTO_Rate: 35 },
            { name: 'Q2 (After)', RTO_Rate: 20 },
          ]}
        >
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
          />
          <Bar dataKey="RTO_Rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-24">
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {post.description}
            </p>
          </header>

          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full rounded-lg object-cover mb-12 border"
            data-ai-hint={post.dataAiHint}
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
             {post.slug === 'how-to-reduce-rto-by-42-using-customer-tagging' && (
                <>
                <p>Return to Origin (RTO) is a silent killer for many Indian D2C brands. It eats into your profits, ties up your inventory, and creates logistical nightmares. While a certain percentage of RTO is unavoidable, many brands unknowingly encourage it through their own policies and lack of customer understanding. But what if you could slash your RTO rate by nearly half with a simple, data-driven strategy? </p>

                <p>This isn't a theoretical exercise. We implemented a customer tagging system for a fashion brand struggling with a 35% RTO rate on their Cash on Delivery (COD) orders. Within one quarter, we brought it down to under 20%. Here’s exactly how we did it.</p>
                
                <h3>The Problem: Treating All COD Customers the Same</h3>
                <p>The root cause of high RTO is often a one-size-fits-all approach to COD. A first-time customer from a high-risk pincode is not the same as a loyal customer with a dozen successful deliveries. By treating them identically, you are exposing yourself to unnecessary risk. The key is to segment customers based on their past behavior and location data.</p>
                
                <h3>The Solution: A 3-Tier Customer Tagging System</h3>
                <p>We created a simple tagging system directly in their Shopify backend. This doesn't require complex software, just a disciplined process.</p>
                
                <ol>
                    <li><strong>Green-Tagged (Low Risk):</strong> These are your VIPs. Customers with a history of 3+ successful prepaid or COD deliveries. They get COD access automatically, no questions asked.</li>
                    <li><strong>Yellow-Tagged (Medium Risk):</strong> First-time customers or those with a mixed history (e.g., one successful delivery, one return). For them, we implemented a rule: COD is only available for orders under ₹1,500. For higher value orders, our customer support would call to confirm, or they would be gently nudged towards prepaid options with a small incentive (like a 5% discount).</li>
                    <li><strong>Red-Tagged (High Risk):</strong> Customers with a previous RTO or those from pincodes with an RTO rate above 40% (you can get this data from your shipping aggregator). These customers are only shown prepaid options at checkout. COD is disabled for them entirely.</li>
                </ol>

                <RtoReductionChart />

                <h4>Executing the Strategy</h4>
                <p>The execution involved two parts. First, a daily routine by the fulfillment team to tag new customers and update existing ones based on delivery reports. Second, a few lines of code were added to the checkout page to show/hide payment options based on customer tags. The result was a dramatic decrease in impulse orders that were likely to be rejected at the doorstep.</p>
                <p>By implementing this tiered system, you shift from a reactive "hope for the best" strategy to a proactive, data-informed approach. You reward your best customers and protect your business from the riskiest ones, turning a major liability into a competitive advantage.</p>
                </>
             )}

             {post.slug === 'profit-vs-money-how-ad-spend-kills-d2c-cashflow' && (
                <>
                <p>Your Shopify dashboard shows soaring sales. Your ad campaigns have a great ROAS. You feel like you're on top of the world. But when you look at your bank account at the end of the month, you're left wondering, "Where did all the money go?"</p>
                <p>This is the most common trap for D2C founders: confusing revenue with profit, and profit with cash flow. They are not the same thing. Understanding the difference is what separates the brands that scale from those that go bust.</p>
                
                <h3>The Cash-Eating Cycle of Ad Spend</h3>
                <p>Let's break down a typical scenario. You spend ₹10,000 on Facebook Ads today. You generate ₹40,000 in sales – a 4x ROAS! Fantastic, right? Not so fast.</p>
                <p>Here’s where that ₹40,000 actually goes:</p>
                <ul>
                    <li><strong>Cost of Goods Sold (COGS):</strong> Let's say your product margin is 60%. So, 40% of the revenue is gone right away. (₹16,000)</li>
                    <li><strong>Ad Spend:</strong> The initial ₹10,000 you spent.</li>
                    <li><strong>Shipping & Fulfillment:</strong> Average of ₹100 per order. If you had 20 orders, that's another ₹2,000.</li>
                    <li><strong>Payment Gateway Fees:</strong> Around 2% on every transaction. That's ₹800.</li>
                    <li><strong>Returns (RTO):</strong> If 15% of your orders are returned, you lose the shipping cost twice and the product is now stuck in transit. This can easily add up to another ₹1,000-₹2,000 in hidden costs.</li>
                </ul>

                <p>Suddenly, your ₹40,000 in revenue has resulted in costs of nearly ₹30,800. Your profit is ₹9,200. That's a 23% net margin, a far cry from the 60% you thought you had. But the real problem is cash flow.</p>

                <h3>When Does the Money Actually Arrive?</h3>
                <p>The money from your sales doesn't hit your account instantly. Payment gateways have a T+2 or T+3 settlement cycle. For COD orders, it can be a week or more. However, you have to pay for your ads *now*. Facebook and Google will charge your card within a few days.</p>
                <p>This creates a dangerous gap. You are spending cash today that you won't recoup for a week or more. If you try to scale your ad spend aggressively, you can run out of operating cash even while being "profitable" on paper. Your growth is literally eating your money.</p>
                <p>The solution is to model your cash flow meticulously. Use a tool like our Net Profit Calculator to understand your true costs per order. Always maintain a cash buffer to cover at least 2-3 weeks of ad spend and operating expenses. Don't let impressive revenue figures blind you to the reality of your bank balance.</p>
                </>
             )}

             {post.slug === 'the-ultimate-guide-to-break-even-roas-for-shopify-stores' && (
                <>
                <p>Return On Ad Spend (ROAS) is the D2C marketer's favorite metric. But a "good" ROAS is meaningless if you aren't profitable. A 5x ROAS can still lose you money if your margins are thin, while a 2.5x ROAS could be fantastically profitable for another brand. The only ROAS that truly matters is your Break-Even ROAS.</p>
                <p>Your Break-Even ROAS is the point at which your revenue from advertising equals your ad spend plus the cost of goods sold (COGS) for the products sold. Anything above this number is profit. Anything below is a loss.</p>
                
                <h3>The Simple Formula Everyone Gets Wrong</h3>
                <p>The basic formula for Break-Even ROAS is:</p>
                <p className="text-center font-mono my-4 p-4 bg-card rounded-lg border">Break-Even ROAS = 1 / Gross Margin %</p>
                <p>So if your Gross Margin is 40% (or 0.4), your Break-Even ROAS is 1 / 0.4 = 2.5x.</p>
                <p>This seems simple, but most founders calculate their gross margin incorrectly. They just do (Selling Price - Landed Cost of Product). They forget all the other variable costs that eat into every single sale.</p>

                <h3>Calculating Your *True* Gross Margin</h3>
                <p>To get your real Break-Even ROAS, you must factor in all variable costs associated with a sale. Your true profit per sale is:</p>
                <p className="text-center font-mono my-4 p-4 bg-card rounded-lg border">True Profit = Avg. Order Value - COGS - Shipping - Payment Gateway Fees - Marketing Costs</p>
                <p>Let's take an example. Your average order value (AOV) is ₹2000.
                    <ul>
                        <li>COGS: ₹800 (40% of AOV)</li>
                        <li>Shipping & Packaging: ₹120</li>
                        <li>Payment Gateway: ₹40 (2% of AOV)</li>
                        <li>Returns & RTO costs (averaged out per order): ₹100</li>
                    </ul>
                </p>
                <p>Your total costs *before* ad spend are ₹1060. This leaves you with ₹940 in profit per order. This means your true margin on each sale is ₹940 / ₹2000 = 47%.</p>
                <p>So your *true* Break-Even ROAS is 1 / 0.47 = **2.13x**.</p>
                <p>This number is your north star. When you're setting campaign budgets and target ROAS in your ad platforms, this is the absolute minimum you must achieve to not lose money. Any marketing agency or team member who doesn't know this number for your business is flying blind.</p>
                <p>Use our Ad Spend ROAS Tool to calculate this for your own business. Don't spend another dollar until you know your number.</p>
                </>
             )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
