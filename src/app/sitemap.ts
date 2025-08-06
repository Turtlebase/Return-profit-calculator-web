import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://returnprofit.online';

  const toolPages = [
    'net-profit-calculator',
    'roas-calculator',
    'cod-risk-evaluator',
    'rto-loss-analyzer',
    'discount-impact-calculator',
    'clv-calculator'
  ].map(tool => ({
    url: `${siteUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
        url: `${siteUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
    {
        url: `${siteUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${siteUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    }
  ];

  const blogPageSitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(), // In a real app, this would be the post's actual publication date
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Note: Dynamically generated posts from the admin panel are not included
  // as they are stored in session storage and not available at build time.
  // A database would be needed for them to be included in the sitemap.

  return [
    ...staticPages,
    ...toolPages,
    ...blogPageSitemap,
  ]
}
