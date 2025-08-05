import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calculator, ShieldCheck } from "lucide-react";

const useCases = [
  {
    icon: TrendingUp,
    title: "Know your break-even ROAS",
    description: "Stop guessing. Our calculator tells you the exact Return On Ad Spend you need to be profitable.",
  },
  {
    icon: Calculator,
    title: "Calculate Profit, Not Just Revenue",
    description: "Factor in hidden costs like returns, shipping, taxes, and COD fees to see your true net profit.",
  },
  {
    icon: ShieldCheck,
    title: "Estimate RTO Loss in Seconds",
    description: "Use AI to analyze your data and predict Return-to-Origin losses before they happen.",
  },
]

export default function ExplainerSection() {
  return (
    <section id="use-cases" className="py-24 sm:py-32 bg-card">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">From Data to Decisions, Instantly</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            ReturnProfit.ai transforms complex D2C metrics into actionable insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="bg-background/50 border-white/10 text-center transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <useCase.icon className="w-8 h-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-lg">{useCase.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
