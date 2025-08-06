import { CODRiskEvaluator } from '@/components/tools/cod-risk-evaluator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI COD Order Risk Evaluator for Indian D2C',
  description: 'Use AI to analyze Cash on Delivery (COD) orders and predict the risk of RTO (Return to Origin). Reduce losses by making smarter fulfillment decisions.',
  alternates: {
    canonical: '/tools/cod-risk-evaluator',
  },
}

export default function CODRiskEvaluatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI-Powered COD Risk Evaluator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Should you ship that Cash on Delivery order? Get an instant, data-driven recommendation from our AI.
              </p>
            </header>

            <Card className="shadow-lg">
                <CardContent className="p-2 sm:p-4">
                    <CODRiskEvaluator />
                </CardContent>
            </Card>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-16">
                <h2>The Challenge of Cash on Delivery in India</h2>
                <p>Cash on Delivery (COD) is a double-edged sword for D2C brands in India. While it's essential for reaching a wider audience, it's also the primary driver of Return to Origin (RTO) losses. Fraudulent orders, casual buyers, and delivery issues can lead to a significant financial drain on your business.</p>
                <blockquote>
                    <p>Manually vetting every single COD order is impossible at scale. This AI tool acts as an intelligent risk analyst, helping you identify high-risk orders before you ship them.</p>
                </blockquote>
                
                <h2>How Our AI Analyzes Risk</h2>
                <p>Our tool uses a model trained on e-commerce best practices to assess the risk of an RTO. You provide four key data points:</p>
                <ul>
                    <li><strong>Order Value:</strong> Higher value orders often carry a higher risk if they are returned.</li>
                    <li><strong>Customer History:</strong> The model analyzes whether the customer is new, a loyal repeat buyer, or has a history of returns.</li>
                    <li><strong>Shipping Address:</strong> Certain pincodes and regions historically have higher RTO rates. The AI considers this geographical risk.</li>
                    <li><strong>Product Category:</strong> Categories like high-fashion or electronics can sometimes have higher return rates than other categories.</li>
                </ul>

                <h2>Making Smarter Shipping Decisions</h2>
                <p>Based on your input, the AI provides a clear, actionable risk assessment:</p>
                <ol>
                    <li><strong>Risk Level (Low, Medium, High):</strong> A quick, color-coded assessment of the order's risk profile.</li>
                    <li><strong>Risk Score (0-100):</strong> A granular score for a more detailed understanding of the risk level.</li>
                    <li><strong>Recommendation:</strong> A plain-English suggestion, such as "Approve COD," "Request partial prepayment," or "Convert to prepaid."</li>
                    <li><strong>Contributing Factors:</strong> The tool lists the specific reasons behind its assessment, giving you transparency into its decision-making process.</li>
                </ol>

                <h2>Frequently Asked Questions (FAQ)</h2>
                <Card className="bg-card mt-6">
                    <CardHeader><CardTitle className="text-xl">FAQ</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Is the AI always correct?</h4>
                            <p className="text-sm text-muted-foreground">The AI provides a highly educated recommendation based on the data provided, but it is not a guarantee. It should be used as a decision-support tool to augment your own business logic and fulfillment processes.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">How can I get even more accurate results?</h4>
                            <p className="text-sm text-muted-foreground">The quality of your input determines the quality of the output. Be as specific as possible in the 'Customer History' and 'Shipping Address' fields for the most accurate analysis.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">What should I do for a 'High Risk' order?</h4>
                            <p className="text-sm text-muted-foreground">For high-risk orders, it's often best to contact the customer via WhatsApp or phone call to confirm their intent to receive the order. You can also offer a small discount to convert their order to a prepaid method.</p>
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
