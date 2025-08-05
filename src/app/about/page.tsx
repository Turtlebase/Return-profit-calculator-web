
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission of Returnprofit.online to empower D2C entrepreneurs with AI-driven tools for sustainable, profitable growth.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                We're on a mission to make D2C profitable.
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Returnprofit.online was born from a simple observation: too many e-commerce founders are flying blind, chasing revenue while their profits quietly disappear. I'm here to change that.
              </p>
            </div>

            <div className="relative isolate overflow-hidden bg-primary/5 px-6 py-24 text-center shadow-xl rounded-3xl sm:px-16 mb-24">
                 <div className="flex flex-col md:flex-row items-center gap-12">
                     <div className="w-full md:w-1/2 text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Our Story
                        </h2>
                        <p className="mt-6 text-muted-foreground">
                            As a D2C operator myself, I was tired of the disconnect between flashy dashboard metrics and the actual health of the business. I built complex spreadsheets and custom tools to get the answers I needed – tools that told me the true break-even points, the real impact of discounts, and which orders were most likely to be returned.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                            I realized these weren't just my problems; they were universal challenges for every D2C brand. That's why I created Returnprofit.online: to put powerful, AI-driven financial intelligence into the hands of every entrepreneur, so you can focus on sustainable growth, not just vanity metrics.
                        </p>
                     </div>
                     <div className="w-full md:w-1/2">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="Founder working on data"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-2xl object-cover"
                            data-ai-hint="founder working data"
                        />
                     </div>
                 </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Goal & Our Tools</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                My goal is simple: to provide accessible, powerful tools that demystify the financial side of e-commerce. From calculating your true break-even ROAS to estimating potential losses from returns, each tool on this site is designed to give you a clear, honest picture of your profitability. This allows you to make data-driven decisions that lead to real, sustainable growth.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
