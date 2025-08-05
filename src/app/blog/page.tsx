
import { BlogCard, blogPosts } from '@/components/blog/blog-card';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function BlogPage() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
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
