
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
      <div className="container py-16 text-center">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <BotMessageSquare className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Returnprofit.online</span>
            </Link>
        </div>
        <p className="max-w-xl mx-auto text-sm text-muted-foreground mb-8">
            AI-powered tools & calculators for Direct-to-Consumer entrepreneurs to maximize profits and minimize losses.
        </p>

        <div className="flex justify-center gap-6 flex-wrap mb-8">
            {mainLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                    {link.name}
                </Link>
            ))}
        </div>

        <div className="border-t pt-8">
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
