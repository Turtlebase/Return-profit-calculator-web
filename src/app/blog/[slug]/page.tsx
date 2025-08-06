
'use client';
import { notFound, useRouter } from 'next/navigation';
import { blogPosts as staticBlogPosts, type BlogPost } from '@/lib/blog-data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { RtoReductionChart } from '@/components/blog/rto-reduction-chart';
import { Flowchart } from '@/components/blog/flowchart';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to find the post in the static list first
    let foundPost = staticBlogPosts.find((p) => p.slug === params.slug);
    
    // If not found, check session storage for a newly generated post
    if (!foundPost) {
      const newPostJson = sessionStorage.getItem('newBlogPost');
      if (newPostJson) {
        try {
          const sessionPost = JSON.parse(newPostJson);
          if (sessionPost.slug === params.slug) {
            foundPost = sessionPost;
          }
        } catch (error) {
          console.error("Failed to parse blog post from session storage", error);
        }
      }
    }

    setPost(foundPost || null); // Set to found post or null if not found
    setIsLoading(false);

  }, [params.slug]);

  useEffect(() => {
    if (!isLoading && post === null) {
      notFound();
    }
  }, [isLoading, post]);


  const rtoFlowchartData = {
    nodes: [
      { id: '1', label: 'New COD Order Received', type: 'input' },
      { id: '2', label: 'Analyze Customer History & Pincode' },
      { id: '3', label: 'Previous RTO or High-Risk Pincode?' },
      { id: '4', label: 'Green-Tagged: Low Risk' },
      { id: '5', label: 'Yellow-Tagged: Medium Risk' },
      { id: '6', label: 'Red-Tagged: High Risk' },
      { id: '7', label: 'Auto-Approve COD' , type: 'output'},
      { id: '8', label: 'COD Limit < ₹1500 or Nudge to Prepaid', type: 'output' },
      { id: '9', label: 'Disable COD, Allow Only Prepaid', type: 'output' },
    ],
    edges: [
      { from: '1', to: '2' },
      { from: '2', to: '3', label: 'Check Criteria' },
      { from: '3', to: '4', label: 'No (Loyal Customer)' },
      { from: '3', to: '5', label: 'Maybe (New / Mixed History)' },
      { from: '3', to: '6', label: 'Yes (Has RTO History)' },
      { from: '4', to: '7' },
      { from: '5', to: '8' },
      { from: '6', to: '9' },
    ],
  };

  const costBreakdownData = {
    revenue: 40000,
    costs: [
        { label: 'COGS (40%)', value: 16000 },
        { label: 'Ad Spend', value: 10000 },
        { label: 'Shipping', value: 2000 },
        { label: 'Returns', value: 2000 },
        { label: 'Fees', value: 800 },
    ],
    profit: 9200
  }

  const renderContent = () => {
    if (!post || !post.slug) return null;

    if (post.content) {
        // Render dynamically generated content
        return <div className="prose prose-lg dark:prose-invert max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />;
    }

    // Render static content based on slug
    switch (post.slug) {
      case 'how-to-reduce-rto-by-42-using-customer-tagging':
        return (
          <>
            <h3>The Silent Profit Killer</h3>
            <p>Return to Origin (RTO) is one of the most significant challenges for D2C brands in India. It's not just a returned package; it's a cascade of losses: double shipping costs, blocked inventory, operational overhead, and potential damage to the product. While you can't eliminate RTO completely, you can build a powerful system to minimize it.</p>
            <blockquote>
                <p>We implemented a customer tagging system for a fashion brand struggling with a 35% RTO rate on Cash on Delivery (COD) orders. <strong>Within one quarter, we brought it down to under 20%.</strong> Here’s exactly how we did it.</p>
            </blockquote>
            
            <h3>The Flaw in a One-Size-Fits-All Approach</h3>
            <p>The core problem most brands face is treating all COD customers as equals. A first-time buyer from a remote town with a history of high returns is fundamentally different from a loyal customer in a metro city who has made ten successful purchases. By offering COD to everyone without distinction, you're exposing your business to unnecessary and avoidable risk.</p>
            <p>The solution is to move from a reactive to a proactive model. Instead of just shipping and hoping for the best, you need to segment your customers based on data you already have. This is where a customer tagging system comes in.</p>
            
            <h3>The 3-Tier Customer Tagging Framework</h3>
            <p>We developed a simple yet effective 3-tier tagging system that can be implemented directly within your e-commerce platform (like Shopify or WooCommerce) with minimal technical effort. The system categorizes customers into three risk levels:</p>
            
            <ol>
                <li><strong>Green-Tagged (Low Risk):</strong> These are your most reliable customers. They typically have a history of successful deliveries (prepaid or COD) and are located in areas with low RTO rates. For them, COD is enabled without any restrictions.</li>
                <li><strong>Yellow-Tagged (Medium Risk):</strong> This category includes first-time customers, buyers from Tier-2 or Tier-3 cities, or those with a mixed order history (e.g., one return). Here, you can implement a controlled COD policy, such as setting a maximum order value (e.g., ₹1,500) or nudging them towards prepaid options with a small incentive.</li>
                <li><strong>Red-Tagged (High Risk):</strong> This group includes customers with a history of RTOs or those located in pincodes notorious for high return rates. For these customers, COD should be disabled entirely, leaving only prepaid options available at checkout.</li>
            </ol>

            <p>This tiered approach is visualized in the flowchart below, showing the decision-making process for each new COD order.</p>

            <Flowchart title="COD Order Processing Flowchart" data={rtoFlowchartData} />

            <h3>From Theory to Practice: Execution is Key</h3>
            <p>Implementing this system requires a disciplined operational process:</p>
            <ul>
              <li><strong>Data Analysis:</strong> Regularly analyze your shipping data to identify high-risk pincodes. Your shipping aggregator dashboard is a goldmine for this information.</li>
              <li><strong>Team Workflow:</strong> Your fulfillment or customer service team should have a daily SOP to review new customers and update tags based on their delivery history.</li>
              <li><strong>Platform Integration:</strong> Add simple logic to your checkout page to dynamically show or hide payment options based on the customer's tag.</li>
            </ul>

            <h3>The Impact: A Clear Win</h3>
            <p>The results of this strategy are twofold. First, you see a direct and significant reduction in your RTO percentage, as shown in the chart below. Second, it improves your cash flow by encouraging more prepaid orders and reducing losses from failed deliveries.</p>
            
            <RtoReductionChart />

            <p>By implementing a data-driven tagging system, you empower your business to make smarter, more profitable decisions. You reward your best customers with convenience while protecting your bottom line from high-risk orders, turning a major operational headache into a sustainable competitive advantage.</p>
          </>
        );
      case 'profit-vs-money-how-ad-spend-kills-d2c-cashflow':
         return (
                <>
                <h3>The Founder's Dilemma</h3>
                <p>Your Shopify dashboard shows soaring sales. Your ad campaigns have a great ROAS. You feel like you're on top of the world. But when you look at your bank account at the end of the month, you're left wondering, "Where did all the money go?" This is the most common trap for D2C founders: confusing revenue with profit, and profit with cash flow. They are not the same thing. Understanding the difference is what separates the brands that scale from those that go bust.</p>
                
                <h3>The Cash-Eating Cycle of Ad Spend</h3>
                <p>Let's break down a typical scenario for a growing Indian D2C brand. You spend ₹10,000 on Facebook & Instagram Ads today. You generate ₹40,000 in sales – a 4x ROAS! Fantastic, right? Not so fast. Here’s where that ₹40,000 in revenue actually goes:</p>
                
                <div className="p-6 my-6 bg-card rounded-lg border shadow-inner space-y-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Revenue</span>
                        <span>₹{costBreakdownData.revenue.toLocaleString()}</span>
                    </div>
                    <hr className="border-border"/>
                    {costBreakdownData.costs.map(cost => (
                        <div key={cost.label} className="flex justify-between items-center text-muted-foreground">
                            <span>{cost.label}</span>
                            <span>- ₹{cost.value.toLocaleString()}</span>
                        </div>
                    ))}
                    <hr className="border-border"/>
                    <div className="flex justify-between items-center text-lg font-bold text-green-400">
                        <span>Net Profit</span>
                        <span>₹{costBreakdownData.profit.toLocaleString()}</span>
                    </div>
                </div>

                <blockquote>
                  <p>Suddenly, your ₹40,000 in revenue has resulted in a true profit of only ₹9,200. That's a 23% net margin, a far cry from the 60% gross margin you started with. But the real problem isn't just the profit margin; it's the timing.</p>
                </blockquote>

                <h3>When Does the Money Actually Arrive?</h3>
                <p>The money from your sales doesn't hit your account instantly. This timing mismatch is the silent killer of cash flow.</p>
                <ol>
                  <li><strong>Ad Spend:</strong> Facebook and Google will charge your credit card within a few days, or even immediately. This is cash OUT, right now.</li>
                  <li><strong>Prepaid Orders:</strong> Payment gateways like Razorpay or PayU have a T+2 or T+3 settlement cycle. So, you'll get that money in 2-3 business days.</li>
                  <li><strong>COD Orders:</strong> This is where it gets tricky. The cash is collected by the courier, goes to their hub, and is then remitted to you on a weekly or bi-weekly cycle. It can take 7-15 days for that cash to reach your bank.</li>
                </ol>
                
                <p>This creates a dangerous gap. You are spending cash today that you won't recoup for a week or more. If you try to scale your ad spend aggressively based on a "profitable" ROAS, you can run out of operating cash to pay for new inventory, salaries, or even the next ad cycle. Your growth is literally eating your money.</p>
                
                <h3>The Solution: Become a Cash Flow Expert</h3>
                <p>The solution is to model your cash flow meticulously. Use a tool like our <strong>Net Profit Calculator</strong> to understand your true costs per order. Always maintain a cash buffer to cover at least 2-3 weeks of ad spend and operating expenses. Don't let impressive revenue figures on a dashboard blind you to the reality of your bank balance. Focus on Unit Economics and Contribution Margin to ensure every sale is truly making you money.</p>
                </>
             );
      case 'the-ultimate-guide-to-break-even-roas-for-shopify-stores':
        return (
                <>
                <h3>The Most Important Metric You're Probably Ignoring</h3>
                <p>Return On Ad Spend (ROAS) is the D2C marketer's favorite metric. It's simple, satisfying, and easy to flash in a board meeting. But a "good" ROAS is meaningless if you aren't profitable. A 5x ROAS can still lose you money if your margins are thin, while a 2.5x ROAS could be fantastically profitable for another brand. The only ROAS that truly matters is your <strong>Break-Even ROAS</strong>.</p>
                
                <blockquote>
                  <p>Your Break-Even ROAS is the point at which your revenue from advertising exactly covers the cost of that advertising plus the cost of the goods you sold. Anything above this number is profit. Anything below is a loss.</p>
                </blockquote>
                
                <h3>The Simple Formula Everyone Gets Wrong</h3>
                <p>The basic formula for Break-Even ROAS is simple enough:</p>
                <div className="formula-card">Break-Even ROAS = 1 / Gross Margin %</div>
                <p>So if your Gross Margin is 40% (or 0.4), your Break-Even ROAS is 1 / 0.4 = 2.5x. This means you need to make ₹2.50 for every ₹1.00 you spend on ads just to break even.</p>
                <p>This seems simple, but <strong>most founders calculate their gross margin incorrectly.</strong> They just do (Selling Price - Landed Cost of Product). They forget all the other variable costs that eat into every single sale, which gives them a dangerously misleading Break-Even ROAS.</p>

                <h3>Calculating Your *True* Contribution Margin</h3>
                <p>To get your real Break-Even ROAS, you must calculate your true margin per sale after all variable costs are removed. This is often called the Contribution Margin. Your true profit per sale, before marketing costs, is:</p>
                
                <div className="formula-card">Contribution Profit = AOV - COGS - Shipping - Gateway Fees - RTO Loss</div>
                
                <p>Let's take a realistic example for a Shopify store in India:</p>
                <ul>
                    <li><strong>Average Order Value (AOV):</strong> ₹2000</li>
                    <li><strong>Cost of Goods Sold (COGS):</strong> ₹800 (This is 40% of AOV, so your product margin is 60%)</li>
                    <li><strong>Shipping & Packaging:</strong> ₹120 (Average forward shipping + box cost)</li>
                    <li><strong>Payment Gateway & COD Fees:</strong> ₹60 (Averaging 3% across all orders)</li>
                    <li><strong>Returns & RTO costs (averaged out per order):</strong> ₹100 (This is critical! You must account for the cost of failed deliveries)</li>
                </ul>
                <p>Your total variable costs *before* ad spend are ₹800 + ₹120 + ₹60 + ₹100 = <strong>₹1080</strong>.</p>
                <p>This leaves you with a contribution profit of ₹2000 - ₹1080 = <strong>₹920</strong>. This is the actual amount of money you have left from each order to pay for advertising and generate profit.</p>
                <p>Your true margin (Contribution Margin) is ₹920 / ₹2000 = <strong>46%</strong>.</p>
                
                <h3>Finding Your North Star: The Real Break-Even ROAS</h3>
                <p>Now we can calculate our true Break-Even ROAS:</p>
                <div className="formula-card">True Break-Even ROAS = 1 / 0.46 = <strong>2.17x</strong></div>
                
                <p>This number is your north star. When you're setting campaign budgets and target ROAS in your ad platforms, this is the absolute minimum you must achieve to not lose money. Any marketing agency or team member who doesn't know this number for your business is flying blind. Don't spend another dollar until you know your number.</p>
                </>
             );
      default:
        return <p>This blog post is currently being written. Check back soon!</p>;
    }
  };


  if (isLoading || post === undefined) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <article className="container max-w-4xl py-12 md:py-24">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-8" />
                    <Skeleton className="w-full h-[400px] rounded-lg mb-12" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    )
  }

  if (post === null) {
      notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-24">
          <header className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {post.description}
            </p>
          </header>

          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full rounded-lg object-cover mb-12 border shadow-lg"
            data-ai-hint={post.dataAiHint}
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
             {renderContent()}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
