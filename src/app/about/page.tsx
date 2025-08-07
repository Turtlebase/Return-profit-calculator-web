
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Mission to Empower D2C Founders',
  description: 'Learn about the mission of Returnprofit.online to empower D2C entrepreneurs with AI-driven tools for sustainable, profitable growth.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container">
          <section className="py-24 sm:py-32">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Empowering D2C Founders with Data.
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                  Returnprofit.online was born from a simple observation: too many e-commerce founders are forced to navigate the complexities of profitability with confusing spreadsheets and incomplete data. I'm here to change that.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-8 md:p-12 space-y-8">
                   <div>
                      <h2 className="text-3xl font-bold tracking-tight text-foreground">
                          Our Story
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                          As a solo D2C operator, I was tired of the disconnect between flashy top-line revenue numbers and the actual financial health of my business. I built custom tools to get the answers I needed—tools that revealed my true break-even points, the real impact of discounts, and which orders were most likely to result in a loss.
                      </p>
                      <p className="mt-4 text-muted-foreground">
                          I realized these weren't just my problems; they were universal challenges. That's why I created Returnprofit.online: to put powerful, AI-driven financial intelligence into the hands of every entrepreneur, enabling you to build a sustainable, profitable, and resilient business.
                      </p>
                   </div>

                   <div>
                       <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Goal & Our Tools</h2>
                        <p className="mt-4 text-muted-foreground">
                          My goal is to provide accessible, powerful, and free tools that demystify the financial side of e-commerce. From calculating your true break-even ROAS to estimating potential losses from returns, each tool on this site is designed to give you a clear, honest picture of your profitability. This allows you to make data-driven decisions that lead to real, sustainable growth.
                        </p>
                   </div>
              </div>

            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
