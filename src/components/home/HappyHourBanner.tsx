'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { happyHour } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function HappyHourBanner() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary via-primary-dark to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div ref={ref} className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Content */}
          <div
            className={cn(
              'text-center lg:text-left animate-slide-left',
              isInView && 'in-view'
            )}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Promo Terbatas</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-3 md:mb-4">
              Happy Hour{' '}
              <span className="text-accent">{happyHour.discount}% OFF!</span>
            </h2>

            <p className="text-white/80 text-base md:text-lg max-w-xl">
              Nikmati diskon spesial untuk semua layanan pijat dan refleksi.
              Berlaku setiap <span className="text-accent font-medium">{happyHour.days}</span>,
              pukul <span className="text-accent font-medium">{happyHour.startTime} - {happyHour.endTime}</span>.
            </p>
          </div>

          {/* CTA */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 lg:mt-0 animate-slide-right',
              isInView && 'in-view'
            )}
            style={{ transitionDelay: '150ms' }}
          >
            <Link href="/harga">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-light text-primary-dark px-8 py-6 text-lg font-semibold"
              >
                Lihat Harga Happy Hour
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/reservasi">
              <Button
                size="lg"
                className="bg-white text-primary-dark hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                Reservasi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
