
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
       <CardHeader className="p-0 overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="block">
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
      <CardContent className="p-6 flex-1 flex flex-col">
        <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>
        <Link href={`/blog/${post.slug}`} className="flex-1">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-6 pt-0">
         <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary">Read More &rarr;</Link>
      </CardFooter>
    </Card>
  );
}

