
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Get In Touch
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Have questions about our tools, partnerships, or just want to chat about D2C? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Thompson" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                 <div className="flex items-start gap-4 p-6 bg-card rounded-lg border">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-muted-foreground">Our inbox is always open. We'll get back to you within one business day.</p>
                        <a href="mailto:info@returnprofit.online" className="text-primary font-medium mt-2 block">info@returnprofit.online</a>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-6 bg-card rounded-lg border">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">We are a remote-first company, but our headquarters are in the heart of the city.</p>
                        <p className="font-medium mt-2">123 Commerce St, New Delhi, 110001</p>
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
