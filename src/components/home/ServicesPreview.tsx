'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const serviceIcons: Record<string, React.ReactNode> = {
  'signature-massage': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3c-1.5 2-3 3.5-3 6 0 2.5 1.5 4 3 4s3-1.5 3-4c0-2.5-1.5-4-3-6z" />
      <path d="M12 13v8" />
      <path d="M8 17h8" />
    </svg>
  ),
  'thai-massage': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M8 21l4-10 4 10" />
      <path d="M6 11h12" />
    </svg>
  ),
  'aromatherapy-massage': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3c0 4-4 6-4 10a4 4 0 108 0c0-4-4-6-4-10z" />
      <path d="M12 17v4" />
    </svg>
  ),
  'reflexology': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C8 2 5 5 5 9c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  ),
  'hot-stone-massage': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="18" rx="8" ry="3" />
      <ellipse cx="12" cy="14" rx="6" ry="2" />
      <ellipse cx="12" cy="10" rx="4" ry="2" />
    </svg>
  ),
  'dry-massage': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3h12l-6 8h6l-8 10 2-7H6l6-8H6z" />
    </svg>
  ),
};

export function ServicesPreview() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="container-custom px-4 md:px-0">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-8 md:mb-12 lg:mb-16 animate-fade-up',
            headerInView && 'in-view'
          )}
        >
          <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-2 md:mb-3 block">
            Layanan Kami
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-3 md:mb-4">
            Pilihan Perawatan Terbaik
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            Berbagai pilihan layanan pijat dan refleksi untuk memenuhi kebutuhan
            relaksasi Anda dan keluarga
          </p>
          <div className="decorative-line mx-auto mt-4 md:mt-6" />
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                'group relative bg-background-light rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 card-hover animate-fade-up',
                gridInView && 'in-view'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {service.isPopular && (
                <Badge className="absolute top-3 right-3 md:top-4 md:right-4 bg-accent text-white border-0 text-[10px] md:text-xs">
                  <Star className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1 fill-current" />
                  Populer
                </Badge>
              )}

              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 md:mb-5 lg:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {serviceIcons[service.id]}
              </div>

              {/* Content */}
              <h3 className="font-heading text-base md:text-lg lg:text-xl text-primary font-semibold mb-1.5 md:mb-2">
                {service.nameId}
              </h3>
              <p className="text-foreground/60 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                {service.descriptionId}
              </p>

              {/* Duration & Price */}
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-foreground/70 mb-4 md:mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                  <span>{service.durations[0].minutes}-{service.durations[service.durations.length - 1].minutes} menit</span>
                </div>
                <span className="text-primary font-semibold">
                  Mulai IDR {service.durations[0].price}K
                </span>
              </div>

              {/* CTA */}
              <Link
                href={`/layanan#${service.id}`}
                className="inline-flex items-center text-primary font-medium text-xs md:text-sm group/link"
              >
                Lihat Detail
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={cn(
            'text-center mt-8 md:mt-10 lg:mt-12 animate-fade-up',
            gridInView && 'in-view'
          )}
          style={{ transitionDelay: '600ms' }}
        >
          <Link href="/layanan">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white min-h-[44px] text-sm md:text-base"
            >
              Lihat Semua Layanan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
