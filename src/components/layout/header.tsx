
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, BotMessageSquare, Wrench, Contact, Info, BookText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

export default function Header() {
  const navLinks = [
    { name: "Tools", href: "/#tools", icon: Wrench },
    { name: "About", href: "/about", icon: Info },
    { name: "Blog", href: "/blog", icon: BookText },
    { name: "Contact", href: "/contact", icon: Contact },
    { name: "Admin", href: "/admin", icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BotMessageSquare className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Returnprofit.online</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
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
                <SheetContent side="right" className="w-[240px]">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                 <div className="flex flex-col h-full">
                    <div className="flex items-center p-4 border-b">
                       <Link href="/" className="flex items-center gap-2">
                           <BotMessageSquare className="h-6 w-6 text-primary" />
                          <span className="font-bold">Returnprofit.online</span>
                       </Link>
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                      {navLinks.map((link) => (
                         <SheetClose asChild key={link.name}>
                            <Link
                              href={link.href}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
