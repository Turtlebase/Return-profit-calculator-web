import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Advanced AI Reports",
  "Shopify Store Integration",
  "Real-time Data Sync",
  "Premium Dashboard Access",
  "AI Chatbot for Suggestions"
];

export default function PremiumFeatures() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Unlock The Full Potential</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Go beyond calculators. Our upcoming premium features will automate your profit optimization.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-8 relative overflow-hidden bg-primary/5 border-primary/20">
          <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5" style={{ maskImage: "linear-gradient(to bottom, transparent, black, transparent)"}}></div>
          <div className="relative z-10">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl text-center">Coming Soon: Premium Suite</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button size="lg">Join The Waitlist</Button>
                <p className="text-xs text-muted-foreground mt-2">Get notified and receive an early-bird discount.</p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
