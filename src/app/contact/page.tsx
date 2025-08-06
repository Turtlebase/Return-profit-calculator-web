
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Returnprofit.online',
  description: 'Get in touch with the Returnprofit.online team. We are here to answer your questions about our D2C profitability tools.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Get In Touch
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Have questions about our tools, partnerships, or just want to chat about D2C? I'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 bg-card p-6 sm:p-8 rounded-lg border">
                <h2 className="text-2xl font-bold mb-6">Send a message</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Alex Thompson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can I help you?" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                 <div className="flex flex-col items-center text-center gap-4 p-6 bg-card rounded-lg border">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Mail className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-sm text-muted-foreground mt-1">My inbox is always open.</p>
                        <a href="mailto:info@returnprofit.online" className="text-primary font-medium mt-2 block break-all">info@returnprofit.online</a>
                    </div>
                 </div>
              </div>

            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
