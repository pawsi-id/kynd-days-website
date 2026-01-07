'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/data/services';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Logo Icon */}
              <svg
                viewBox="0 0 60 50"
                className="w-10 h-8 text-primary transition-transform duration-300 group-hover:scale-105"
                fill="currentColor"
              >
                <path d="M30 5c-8 0-14.5 6-14.5 13.5S22 32 30 32s14.5-6 14.5-13.5S38 5 30 5zm0 22c-5.5 0-10-4-10-9s4.5-9 10-9 10 4 10 9-4.5 9-10 9z" />
                <ellipse cx="18" cy="18" rx="8" ry="10" />
                <ellipse cx="42" cy="18" rx="8" ry="10" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-primary tracking-wide">
                kynd days
              </span>
              <span className="text-[10px] text-primary-light tracking-[0.2em] uppercase">
                Family Massage & Reflexology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200 hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-foreground/80'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link href="/reservasi">
              <Button
                className="bg-primary hover:bg-primary-dark text-white btn-elegant px-6"
              >
                Reservasi
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background-light p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="font-heading text-lg text-primary">kynd days</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-primary"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 px-6 py-8">
                  <ul className="space-y-4">
                    {navItems.map((item, index) => (
                      <li
                        key={item.href}
                        className="animate-slide-in opacity-0"
                        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'block py-3 text-lg font-medium transition-colors',
                            pathname === item.href
                              ? 'text-primary'
                              : 'text-foreground/70 hover:text-primary'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-border">
                  <Link href="/reservasi" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                      Reservasi Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
