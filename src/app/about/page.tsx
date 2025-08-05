
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { BotMessageSquare, Users, Target } from 'lucide-react';

const teamMembers = [
    {
        name: 'Alex Thompson',
        role: 'Founder & CEO',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'professional portrait',
        bio: 'Alex is a seasoned e-commerce entrepreneur with over a decade of experience scaling D2C brands from zero to eight figures. He started ReturnProfit.ai to solve the profitability puzzle he faced every day.'
    },
    {
        name: 'Priya Sharma',
        role: 'Lead Data Scientist',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'professional woman',
        bio: 'Priya holds a Ph.D. in Machine Learning and specializes in predictive analytics for retail. She is the architect behind our AI-powered estimation and recommendation engines.'
    },
    {
        name: 'Ben Carter',
        role: 'Head of Engineering',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'male engineer',
        bio: 'Ben is a full-stack engineering leader with a passion for building scalable, user-centric applications. He ensures our tools are fast, reliable, and a joy to use.'
    }
]

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
                ReturnProfit.ai was born from a simple observation: too many e-commerce founders are flying blind, chasing revenue while their profits quietly disappear. We're here to change that.
              </p>
            </div>

            <div className="relative isolate overflow-hidden bg-primary/5 px-6 py-24 text-center shadow-xl rounded-3xl sm:px-16 mb-24">
                 <div className="flex flex-col md:flex-row items-center gap-12">
                     <div className="w-full md:w-1/2 text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Our Story
                        </h2>
                        <p className="mt-6 text-muted-foreground">
                            As former D2C operators, we were tired of the disconnect between flashy dashboard metrics and the actual health of our business. We built complex spreadsheets and custom tools to get the answers we needed – tools that told us our true break-even points, the real impact of discounts, and which orders were most likely to be returned.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                            We realized these weren't just our problems; they were universal challenges for every D2C brand. That's why we created ReturnProfit.ai: to put powerful, AI-driven financial intelligence into the hands of every entrepreneur, so you can focus on sustainable growth, not just vanity metrics.
                        </p>
                     </div>
                     <div className="w-full md:w-1/2">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="Team working on data"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-2xl object-cover"
                            data-ai-hint="team collaboration"
                        />
                     </div>
                 </div>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet the Team</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                We are a small, passionate team of entrepreneurs, data scientists, and engineers dedicated to your success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center p-6 bg-card rounded-lg border transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-1">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 border-4 border-primary/20"
                    data-ai-hint={member.dataAiHint}
                  />
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
