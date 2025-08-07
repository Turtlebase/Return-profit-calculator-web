
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, Image as ImageIcon, BookOpen } from 'lucide-react';
import { generateBlogPost, type GenerateBlogPostOutput } from '@/app/actions';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(10, 'Please enter a title of at least 10 characters.'),
});

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GenerateBlogPostOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedPost(null);
    try {
      const result = await generateBlogPost(values.title);
      setGeneratedPost(result);
      toast({
        title: 'Blog Post Generated!',
        description: 'Review the post below and publish when ready.',
      });
    } catch (error) {
      console.error('Error generating blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'The AI failed to generate a post. Please try a different title.',
      });
    }
    setIsLoading(false);
  }

  const handlePublish = () => {
    if (generatedPost) {
      // We use two separate keys: one for the individual page, one for the feed page.
      // This helps manage state between page navigations.
      sessionStorage.setItem('newBlogPost', JSON.stringify(generatedPost));
      sessionStorage.setItem('newBlogPostForFeed', JSON.stringify(generatedPost));
      router.push(`/blog/${generatedPost.slug}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container max-w-4xl py-16 md:py-24">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Blog Post Generator</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enter a title and our D2C expert AI will write a complete, SEO-optimized article with a unique thumbnail.
            </p>
          </header>

          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="sr-only">Blog Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., How to Optimize Your Product Pages for Conversion" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <><Loader2 className="animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles /> Generate Post</>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {isLoading && (
             <div className="text-center py-12">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">AI is writing, please wait...</p>
             </div>
          )}

          {generatedPost && (
            <Card className="animate-in fade-in-50">
              <CardHeader>
                <CardTitle>{generatedPost.title}</CardTitle>
                <CardDescription>{generatedPost.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><ImageIcon/> Generated Thumbnail</h3>
                  <Image
                    src={generatedPost.image}
                    alt={generatedPost.title}
                    width={600}
                    height={400}
                    className="w-full rounded-lg object-cover border shadow-lg"
                  />
                </div>
                <div>
                   <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><BookOpen/> Generated Content</h3>
                   <div className="prose prose-lg dark:prose-invert max-w-none p-4 border rounded-lg" dangerouslySetInnerHTML={{ __html: generatedPost.content }} />
                </div>
                <Button onClick={handlePublish} size="lg" className="w-full">
                  Publish Post
                </Button>
              </CardContent>
            </Card>
          )}

        </section>
      </main>
      <Footer />
    </div>
  );
}
