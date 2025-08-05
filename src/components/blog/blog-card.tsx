
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from "next/link";

export const blogPosts = [
  {
    title: "How to reduce RTO by 42% using customer tagging",
    slug: "how-to-reduce-rto-by-42-using-customer-tagging",
    description: "A simple, data-driven strategy to segment customers and drastically cut down on costly returns.",
    category: "RTO Reduction",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "e-commerce logistics",
  },
  {
    title: "Profit ≠ Money: How ad spend kills your D2C cashflow",
    slug: "profit-vs-money-how-ad-spend-kills-d2c-cashflow",
    description: "Understand the critical difference between revenue, profit, and cash flow to avoid scaling into bankruptcy.",
    category: "Profitability",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "business finance",
  },
  {
    title: "The Ultimate Guide to Break-Even ROAS for Shopify Stores",
    slug: "the-ultimate-guide-to-break-even-roas-for-shopify-stores",
    description: "Stop guessing. Calculate the exact Return On Ad Spend you need to be profitable and make smarter marketing decisions.",
    category: "Marketing",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "digital marketing",
  },
];

interface BlogCardProps {
    post: (typeof blogPosts)[0];
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={post.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <Badge variant="secondary" className="mb-2">{post.category}</Badge>
        <Link href={`/blog/${post.slug}`}>
          <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-6 pt-0">
         <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary">Read More &rarr;</Link>
      </CardFooter>
    </Card>
  );
}
