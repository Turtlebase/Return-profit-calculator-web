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
    <section className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <div className="absolute -top-24 left-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7"></circle>
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#14F1FF"></stop>
                  <stop offset="1" stopColor="#8A2BE2" stopOpacity="0"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Weekly D2C Hacks – No BS, Just Profits
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Join our newsletter for exclusive tips, tool updates, and strategies to scale your D2C brand.
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
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 h-11"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-left text-primary-foreground/80"/>
                        </FormItem>
                        )}
                    />
                    <Button type="submit" variant="secondary" className="bg-white/90 text-primary hover:bg-white" disabled={isLoading}>
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
