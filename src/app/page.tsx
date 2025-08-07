
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import ToolsShowcase from '@/components/landing/tools-showcase';
import BlogSection from '@/components/landing/blog-section';
import NewsletterSignup from '@/components/landing/newsletter-signup';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returnprofit.online - D2C Profit & RTO Calculators',
  description: 'Free, AI-powered tools for D2C entrepreneurs in India. Calculate net profit, break-even ROAS, COD risk, and reduce RTO losses to scale profitably.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto">
            <ToolsShowcase />
            <BlogSection />
            <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
}
