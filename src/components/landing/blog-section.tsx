import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from "next/link";

const blogPosts = [
  {
    title: "How to reduce RTO by 42% using customer tagging",
    category: "RTO Reduction",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "e-commerce logistics",
  },
  {
    title: "Profit ≠ Money: How ad spend kills your D2C cashflow",
    category: "Profitability",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "business finance",
  },
  {
    title: "The Ultimate Guide to Break-Even ROAS for Shopify Stores",
    category: "Marketing",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "digital marketing",
  },
];

export default function BlogSection() {
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
          {blogPosts.map((post) => (
            <Card key={post.title} className="flex flex-col overflow-hidden group">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={post.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Link href="#" className="text-sm font-semibold text-primary">Read More &rarr;</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" size="lg">View All Posts</Button>
        </div>
      </div>
    </section>
  );
}
