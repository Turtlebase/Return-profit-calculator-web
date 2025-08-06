
import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://returnprofit.online';

  const staticPages = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/admin'
  ].map((route) => ({
    url: `${siteUrl}${route === '/' ? '' : route}`,
    lastModified: new Date(),
    priority: route === '/' ? 1 : (route === '/blog' ? 0.9 : 0.8),
  }));

  const blogPageSitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    ...staticPages,
    ...blogPageSitemap,
  ]
}
