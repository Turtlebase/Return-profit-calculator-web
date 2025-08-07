
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/20 via-accent/20 to-secondary/20 animate-gradient-bg"></div>
      <div className="container relative z-10 py-12 sm:py-16 lg:py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-br from-foreground to-foreground/70 text-transparent bg-clip-text animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          Stop Guessing.
          <br />
          Start Growing Profitably.
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
          Free, AI-powered calculators and tools for Direct-to-Consumer founders. Make data-driven decisions that boost your bottom line.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
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
