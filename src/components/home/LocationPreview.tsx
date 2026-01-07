'use client';

import Link from 'next/link';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { branches, businessHours } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function LocationPreview() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="section-padding bg-gradient-to-b from-background-light to-background overflow-hidden">
      <div ref={ref} className="container-custom">
        {/* Section Header */}
        <div
          className={cn(
            'text-center mb-8 md:mb-16 animate-fade-up',
            isInView && 'in-view'
          )}
        >
          <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-2 md:mb-3 block">
            Lokasi Kami
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-3 md:mb-4">
            Kunjungi Cabang Terdekat
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4 md:px-0">
            Kynd Days hadir di 3 lokasi strategis untuk melayani Anda
          </p>
          <div className="decorative-line mx-auto mt-4 md:mt-6" />
        </div>

        {/* Operating Hours Banner */}
        <div
          className={cn(
            'flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-14 animate-fade-up',
            isInView && 'in-view'
          )}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-primary text-white shadow-lg">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium text-sm md:text-base">
              Buka {businessHours.days}: {businessHours.open} - {businessHours.close}
            </span>
          </div>
        </div>

        {/* Branches - Mobile Carousel / Desktop Grid */}
        <div
          className={cn(
            'animate-fade-up',
            isInView && 'in-view'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {branches.map((branch, index) => (
                <div
                  key={branch.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0 w-[85%] snap-center"
                >
                  {/* Map Preview Area */}
                  <div className="relative h-32 bg-gradient-to-br from-primary/5 to-accent/10 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <pattern id={`grid-mobile-${branch.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill={`url(#grid-mobile-${branch.id})`} />
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 -z-10" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary font-semibold text-sm shadow-md">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-heading text-base font-semibold text-primary mb-1">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                      {branch.address}
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Halo Kynd Days ${branch.name}, saya ingin bertanya tentang layanan pijat dan reservasi.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-primary text-white text-xs font-medium min-h-[44px]"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </a>
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-primary/10 text-primary text-xs font-medium min-h-[44px]"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Maps
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Swipe Indicator */}
            <div className="flex justify-center gap-1.5 mt-2">
              {branches.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-primary/30" />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Map Preview Area */}
                <div className="relative h-40 bg-gradient-to-br from-primary/5 to-accent/10 overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`grid-${branch.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill={`url(#grid-${branch.id})`} />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 -z-10" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary font-semibold text-sm shadow-md">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    {branch.name}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-2">
                    {branch.address}
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Halo Kynd Days ${branch.name}, saya ingin bertanya tentang layanan pijat dan reservasi.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm min-h-[44px]"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-colors min-h-[44px]"
                    >
                      <Navigation className="w-4 h-4" />
                      Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={cn(
            'mt-12 md:mt-16 text-center animate-fade-up',
            isInView && 'in-view'
          )}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link href="/kontak">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8">
                <Navigation className="w-4 h-4 mr-2" />
                Lihat Peta Lengkap
              </Button>
            </Link>
            <p className="text-sm text-foreground/50">
              Temukan rute tercepat ke cabang terdekat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
