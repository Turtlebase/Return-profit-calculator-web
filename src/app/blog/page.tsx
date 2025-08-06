'use client';

import { useEffect, useState } from 'react';
import { BlogCard } from '@/components/blog/blog-card';
import { blogPosts as initialBlogPosts, type BlogPost } from '@/lib/blog-data';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

// Note: This metadata is for client components and may not be picked up by crawlers.
// For full SEO, this page could be refactored to a server component if needed.
export const metadata: Metadata = {
  title: 'D2C Insights Blog | Returnprofit.online',
  description: 'Actionable insights, tips, and strategies from D2C experts to help you reduce RTO, improve profitability, and scale your e-commerce brand in India.',
  alternates: {
    canonical: '/blog',
  },
};


export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => {
    const posts = [...initialBlogPosts];
    if (typeof window !== 'undefined') {
        const newPostJson = sessionStorage.getItem('newBlogPostForFeed');
        if (newPostJson) {
            try {
                const post = JSON.parse(newPostJson);
                if (!posts.some(p => p.slug === post.slug)) {
                    posts.unshift(post);
                }
            } catch (error) {
                console.error("Failed to parse new blog post from session storage", error);
            }
        }
    }
    return posts;
  });

  const [newPostAlert, setNewPostAlert] = useState<BlogPost | null>(null);

  useEffect(() => {
    // This effect handles showing the alert after navigation
    const newPostJson = sessionStorage.getItem('newBlogPost');
    if (newPostJson) {
      try {
        const post = JSON.parse(newPostJson);
        setNewPostAlert(post);
        // Add the post to the main list if it's not already there
        setAllPosts(prevPosts => {
          if (!prevPosts.some(p => p.slug === post.slug)) {
            sessionStorage.setItem('newBlogPostForFeed', JSON.stringify(post));
            return [post, ...prevPosts];
          }
          return prevPosts;
        });
        sessionStorage.removeItem('newBlogPost');
      } catch (error) {
        console.error("Failed to parse new blog post from session storage", error);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Weekly D2C Hacks
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                No BS, just profits. Actionable insights from our e-commerce
                experts to help you scale.
              </p>
            </div>
            
            {newPostAlert && (
              <Alert className="mb-8 max-w-4xl mx-auto bg-primary/10 border-primary/20 animate-in fade-in-50">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">New Post Published!</AlertTitle>
                <AlertDescription>
                  Your AI-generated article "{newPostAlert.title}" is now live.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
