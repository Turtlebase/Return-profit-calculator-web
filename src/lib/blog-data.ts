
export interface BlogPost {
    title: string;
    slug: string;
    description: string;
    category: string;
    image: string;
    dataAiHint: string;
    content?: string; // Optional: for statically defined posts
}

export const blogPosts: BlogPost[] = [
  {
    title: "How to reduce RTO by 42% using customer tagging",
    slug: "how-to-reduce-rto-by-42-using-customer-tagging",
    description: "A simple, data-driven strategy to segment customers and drastically cut down on costly returns.",
    category: "RTO Reduction",
    image: "https://placehold.co/1200x600.png",
    dataAiHint: "ecommerce logistics",
  },
  {
    title: "Profit ≠ Money: How ad spend kills your D2C cashflow",
    slug: "profit-vs-money-how-ad-spend-kills-d2c-cashflow",
    description: "Understand the critical difference between revenue, profit, and cash flow to avoid scaling into bankruptcy.",
    category: "Profitability",
    image: "https://placehold.co/1200x600.png",
    dataAiHint: "business finance",
  },
  {
    title: "The Ultimate Guide to Break-Even ROAS for Shopify Stores",
    slug: "the-ultimate-guide-to-break-even-roas-for-shopify-stores",
    description: "Stop guessing. Calculate the exact Return On Ad Spend you need to be profitable and make smarter marketing decisions.",
    category: "Marketing",
    image: "https://placehold.co/1200x600.png",
    dataAiHint: "digital marketing",
  },
];
