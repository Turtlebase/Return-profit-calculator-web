"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MailCheck } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});


export default function NewsletterSignup() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsSuccess(false);
    const result = await subscribeToNewsletter(values.email);
    setIsLoading(false);

    if (result.success) {
      setIsSuccess(true);
      toast({
        title: "Subscribed!",
        description: result.message,
      });
      form.reset();
    } else {
      form.setError("email", { type: "manual", message: result.message });
    }
  }


  return (
    <section className="py-24 sm:py-32 bg-secondary/50">
      <div className="container mx-auto">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary to-blue-400 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
           <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get D2C Insights Delivered to You
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Join our newsletter for exclusive tips, tool updates, and strategies to scale your D2C brand profitability.
          </p>
            {isSuccess ? (
                 <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-x-4 text-center text-white">
                    <MailCheck className="h-8 w-8" />
                    <p className="font-semibold">Thank you for subscribing!</p>
                 </div>
            ) : (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-10 flex max-w-md gap-x-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem className="flex-auto">
                            <FormControl>
                                <Input
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="min-w-0 flex-auto rounded-lg border-0 bg-white/90 px-4 py-2 text-foreground shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 h-12"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-left text-white/90"/>
                        </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe'}
                    </Button>
                </form>
                </Form>
            )}
        </div>
      </div>
    </section>
  );
}
