import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      <div className="container relative z-10 py-24 sm:py-32 lg:py-40 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-br from-foreground to-foreground/70 text-transparent bg-clip-text">
          Stop Guessing.
          <br />
          Start Growing Profitably.
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-muted-foreground">
          Free, AI-powered calculators and tools for Direct-to-Consumer founders. Make data-driven decisions that boost your bottom line.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Button size="lg" asChild className="group">
            <Link href="#tools">
              Explore Free Tools
              <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
           <Button size="lg" variant="outline" asChild>
            <Link href="/blog">Read D2C Insights</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
