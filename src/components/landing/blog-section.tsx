
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";


export default function BlogSection() {
  const topPosts = blogPosts.slice(0, 3);
  return (
    <section id="blog" className="py-24 sm:py-32 bg-card">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Weekly D2C Hacks</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            No BS, just profits. Insights from our e-commerce experts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
