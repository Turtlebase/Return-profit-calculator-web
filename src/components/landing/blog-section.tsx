
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function BlogSection() {
  const topPosts = blogPosts.slice(0, 3);
  return (
    <section id="blog" className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Weekly D2C Hacks</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            No BS, just profits. Actionable insights from our e-commerce
            experts to help you scale your brand.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center mt-16">
            <Button variant="outline" size="lg" asChild className="group">
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
