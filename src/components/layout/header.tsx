
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, BotMessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

export default function Header() {
  const navLinks = [
    { name: "Tools", href: "/#tools" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Login</Button>
          <Button>Get Report</Button>
        </div>

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
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2">
                     <SheetClose asChild>
                        <BotMessageSquare className="h-6 w-6 text-primary" />
                     </SheetClose>
                      <span className="font-bold">Returnprofit.online</span>
                   </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          className="text-lg font-medium"
                        >
                          {link.name}
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t flex flex-col gap-2">
                   <SheetClose asChild>
                      <Button variant="ghost">Login</Button>
                   </SheetClose>
                   <SheetClose asChild>
                      <Button>Get Report</Button>
                   </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
