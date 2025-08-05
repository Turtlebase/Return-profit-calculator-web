import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import ToolsShowcase from '@/components/landing/tools-showcase';
import ExplainerSection from '@/components/landing/explainer-section';
import BlogSection from '@/components/landing/blog-section';
import NewsletterSignup from '@/components/landing/newsletter-signup';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <ToolsShowcase />
        <ExplainerSection />
        <BlogSection />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}
