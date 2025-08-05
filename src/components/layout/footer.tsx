
import Link from 'next/link';
import { BotMessageSquare, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { name: 'About', href: '#' },
    { name: 'Tools', href: '/#tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BotMessageSquare className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ReturnProfit.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground">Smarter D2C Starts Here.</p>
          </div>
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2">
                  {footerLinks.slice(0,3).map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.slice(3,5).map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>
             <div>
                <h3 className="font-semibold mb-4">Socials</h3>
                <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                        <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-foreground">
                            <social.icon className="h-5 w-5" />
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ReturnProfit.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
