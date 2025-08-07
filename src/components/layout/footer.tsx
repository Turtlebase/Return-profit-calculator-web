import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';

export default function Footer() {
  const mainLinks = [
    { name: 'Tools', href: '/#tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-4">
                <Link href="/" className="flex items-center gap-2">
                  <BotMessageSquare className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold">Returnprofit.online</span>
                </Link>
                <p className="text-sm text-muted-foreground max-w-xs">
                    AI-powered tools & calculators for Direct-to-Consumer entrepreneurs to maximize profits and minimize losses.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-2">
                <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Tools</h4>
                    <ul className="space-y-2">
                        <li><Link href="/tools/net-profit-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Net Profit</Link></li>
                        <li><Link href="/tools/roas-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">ROAS</Link></li>
                        <li><Link href="/tools/cod-risk-evaluator" className="text-sm text-muted-foreground hover:text-primary transition-colors">COD Risk</Link></li>
                        <li><Link href="/tools/rto-loss-analyzer" className="text-sm text-muted-foreground hover:text-primary transition-colors">RTO Loss</Link></li>
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Resources</h4>
                    <ul className="space-y-2">
                        <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Company</h4>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                        <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="border-t pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Returnprofit.online. All rights reserved.</p>
                <div className="flex gap-4">
                     {legalLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </footer>
  );
}
