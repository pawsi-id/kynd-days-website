'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { happyHour } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-light to-background" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237D6B5D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div ref={ref} className="container-custom relative z-10 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 px-4 md:px-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Happy Hour Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-accent/20 text-primary mb-4 md:mb-6 lg:mb-8 animate-fade-up',
              isInView && 'in-view'
            )}
          >
            <span className="text-xs md:text-sm font-medium">
              Happy Hour {happyHour.discount}% OFF • {happyHour.days} ({happyHour.startTime}-{happyHour.endTime})
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={cn(
              'font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-primary leading-tight mb-4 md:mb-6 animate-fade-up',
              isInView && 'in-view'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            A Japanese{' '}
            <span className="relative inline-block">
              Family Massage
              <span className="absolute -bottom-0.5 md:-bottom-1 left-0 w-full h-0.5 md:h-1 bg-accent/40 rounded-full" />
            </span>
            <br />
            & Reflexology
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              'text-sm md:text-base lg:text-lg xl:text-xl text-foreground/70 max-w-2xl mx-auto mb-6 md:mb-8 lg:mb-10 leading-relaxed animate-fade-up',
              isInView && 'in-view'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Pengalaman pijat dan refleksi terbaik dengan terapis profesional
            dalam suasana yang nyaman dan menenangkan
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-2.5 md:gap-3 lg:gap-4 animate-fade-up',
              isInView && 'in-view'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <Link href="/reservasi" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-5 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-sm md:text-base lg:text-lg group w-full sm:w-auto min-h-[48px]"
              >
                Reservasi Sekarang
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/layanan" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-5 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-sm md:text-base lg:text-lg w-full sm:w-auto min-h-[48px]"
              >
                Lihat Layanan
              </Button>
            </Link>
          </div>

          {/* Operating Hours */}
          <div
            className={cn(
              'flex items-center justify-center gap-1.5 md:gap-2 mt-8 md:mt-10 lg:mt-12 text-xs md:text-sm text-foreground/60 animate-fade-up',
              isInView && 'in-view'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Buka Setiap Hari: 10:00 - 22:00</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave - Animated */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 overflow-hidden">
        {/* Third wave - slowest, back */}
        <svg
          viewBox="0 0 2880 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-[200%] h-full animate-wave-slowest"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90C120 90 180 60 360 60C540 60 600 120 720 120C840 120 900 70 1080 70C1260 70 1320 110 1440 110C1560 110 1620 60 1800 60C1980 60 2040 120 2160 120C2280 120 2340 70 2520 70C2700 70 2760 90 2880 90V240H0V90Z"
            className="fill-primary/10"
          />
        </svg>
        {/* Second wave - medium speed */}
        <svg
          viewBox="0 0 2880 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-[200%] h-full animate-wave-slow"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120C120 120 180 85 360 85C540 85 600 155 720 155C840 155 900 95 1080 95C1260 95 1320 145 1440 145C1560 145 1620 85 1800 85C1980 85 2040 155 2160 155C2280 155 2340 95 2520 95C2700 95 2760 120 2880 120V240H0V120Z"
            fill="white"
            fillOpacity="0.35"
          />
        </svg>
        {/* Front wave - fastest */}
        <svg
          viewBox="0 0 2880 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          preserveAspectRatio="none"
        >
          <path
            d="M0 150C120 150 180 110 360 110C540 110 600 190 720 190C840 190 900 120 1080 120C1260 120 1320 175 1440 175C1560 175 1620 110 1800 110C1980 110 2040 190 2160 190C2280 190 2340 120 2520 120C2700 120 2760 150 2880 150V240H0V150Z"
            fill="white"
            fillOpacity="0.6"
          />
        </svg>
      </div>
    </section>
  );
}
