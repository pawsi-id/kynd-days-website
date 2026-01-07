'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
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
          <Link href="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-primary tracking-wide transition-transform duration-300 group-hover:scale-105">
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
              <Button variant="ghost" size="icon" className="text-primary min-h-[44px] min-w-[44px]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm bg-background-light p-0 border-r-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header with Logo */}
                <div className="flex items-center p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-semibold text-primary">
                      kynd days
                    </span>
                    <span className="text-[9px] text-primary-light tracking-[0.15em] uppercase">
                      Massage & Reflexology
                    </span>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 py-4 overflow-y-auto">
                  <ul className="space-y-1 px-3">
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
                            'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all min-h-[48px]',
                            pathname === item.href
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground/70 hover:bg-primary/5 hover:text-primary active:bg-primary/10'
                          )}
                        >
                          {pathname === item.href && (
                            <span className="w-1 h-5 bg-primary rounded-full" />
                          )}
                          <span className={pathname === item.href ? '' : 'pl-4'}>
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-border/50 bg-gradient-to-t from-primary/5 to-transparent">
                  <Link href="/reservasi" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white min-h-[48px] text-base font-medium shadow-md">
                      Reservasi Sekarang
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Buka setiap hari 10:00 - 22:00
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
