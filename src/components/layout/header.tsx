
"use client";

import Link from "next/link";
import { Menu, Wrench, Info, BookText, HomeIcon, ChevronDown, Contact, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function Header() {
  const pathname = usePathname();

  const mainNavLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Tools", href: "/#tools", icon: Wrench },
    { name: "Blog", href: "/blog", icon: BookText },
  ];

  const infoNavLinks = [
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Contact },
    { name: "Privacy", href: "/privacy", icon: Lock },
    { name: "Terms of Use", href: "/terms", icon: FileText },
  ]

  const mobileNavLinks = [...mainNavLinks, ...infoNavLinks];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Returnprofit.online Logo" width={32} height={32} />
          <span className="text-xl font-bold">
            <span className="text-primary">Return</span>
            <span className="text-accent">profit</span>
            <span className="text-foreground">.online</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "bg-secondary text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none data-[state=open]:bg-secondary data-[state=open]:text-foreground">
                    Info <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {infoNavLinks.map((link) => (
                         <DropdownMenuItem key={link.name} asChild>
                            <Link href={link.href} className="flex items-center gap-2">
                                <link.icon className="h-4 w-4 text-muted-foreground" />
                                {link.name}
                            </Link>
                         </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] p-0">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                 <div className="flex flex-col h-full">
                    <div className="flex items-center p-4 border-b">
                       <Link href="/" className="flex items-center gap-2">
                           <Image src="/logo.png" alt="Returnprofit.online Logo" width={24} height={24} />
                           <span className="font-bold">
                            <span className="text-primary">Return</span>
                            <span className="text-accent">profit</span>
                            <span className="text-foreground">.online</span>
                           </span>
                       </Link>
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                      {mobileNavLinks.map((link) => (
                         <SheetClose asChild key={link.name}>
                            <Link
                              href={link.href}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
                            >
                              <link.icon className="h-4 w-4" />
                              {link.name}
                            </Link>
                         </SheetClose>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
