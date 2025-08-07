import { RTOLossAnalyzer } from '@/components/tools/rto-loss-analyzer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
        <div className="container">
          <section className="py-12 md:py-24">
            <div className="max-w-4xl mx-auto">
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

              <div className="max-w-4xl mx-auto mt-24">
                   <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                   <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                          <AccordionTrigger>Is my data secure?</AccordionTrigger>
                          <AccordionContent>
                          Absolutely. The data you upload is processed securely and is not stored or used for any purpose other than generating your one-time analysis. The entire process is private and confidential.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                          <AccordionTrigger>What format should my CSV be in?</AccordionTrigger>
                          <AccordionContent>
                          A simple CSV with clear headers is best. Ensure you have columns like 'OrderID', 'Pincode', 'OrderValue', 'ReturnReason'. The AI is flexible and can interpret various structures, but clear data leads to better results.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                          <AccordionTrigger>How far back should my historical data go?</AccordionTrigger>
                          <AccordionContent>
                          We recommend providing at least 3-6 months of data for a meaningful analysis. More data, especially covering different seasons or sales periods, will yield a more accurate and robust prediction.
                          </AccordionContent>
                      </AccordionItem>
                   </Accordion>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
