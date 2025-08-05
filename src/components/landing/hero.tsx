import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute h-[500px] w-[500px] bg-primary/10 rounded-full -top-64 -left-64 blur-3xl"></div>
        <div className="absolute h-[400px] w-[400px] bg-accent/10 rounded-full -bottom-64 -right-64 blur-3xl"></div>
      </div>
      <div className="container relative z-10 py-24 sm:py-32 lg:py-40 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-br from-foreground to-foreground/70 text-transparent bg-clip-text">
          Maximize D2C Profits.
          <br />
          Minimize RTO Losses.
        </h1>
        <p className="mt-6 text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground">
          AI-powered tools & calculators for Direct-to-Consumer entrepreneurs.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="#tools">Try Free Tools</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Get Report
          </Button>
        </div>
      </div>
    </section>
  );
}
