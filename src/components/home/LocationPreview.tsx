'use client';

import { useState, useCallback, useEffect } from 'react';
import { MapPin, Clock, Navigation, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { branches, businessHours } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function LocationPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const { ref: carouselRef, isInView: carouselInView } = useInView({ threshold: 0.1 });

  const currentBranch = branches[currentIndex];

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? branches.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === branches.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning, currentIndex]);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isTransitioning, goToNext]);

  return (
    <section className="overflow-hidden">
      {/* Branch Carousel - Full Width */}
      <div
        ref={carouselRef}
        className={cn(
          'animate-fade-up',
          carouselInView && 'in-view'
        )}
      >
        <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
            {/* Left - Image Placeholder (flipped) */}
            <div className="relative bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 order-1 min-h-[300px] md:min-h-[350px] lg:min-h-full lg:col-span-3 overflow-hidden">
              {/* Animated background elements */}
              <div
                className={cn(
                  "absolute top-1/3 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-accent/15 rounded-full blur-3xl transition-all duration-1000",
                  isTransitioning ? "scale-75 opacity-50" : "scale-100 opacity-100"
                )}
                style={{ transform: `translate(${-currentIndex * 15}px, ${currentIndex * 10}px)` }}
              />
              <div
                className={cn(
                  "absolute bottom-1/3 left-1/4 w-32 h-32 md:w-56 md:h-56 bg-primary/15 rounded-full blur-3xl transition-all duration-1000 delay-100",
                  isTransitioning ? "scale-75 opacity-50" : "scale-100 opacity-100"
                )}
                style={{ transform: `translate(${currentIndex * 12}px, ${-currentIndex * 8}px)` }}
              />
              <div
                className={cn(
                  "absolute top-1/2 left-1/3 w-24 h-24 md:w-40 md:h-40 bg-accent/10 rounded-full blur-2xl transition-all duration-1000 delay-200",
                  isTransitioning ? "scale-50 opacity-0" : "scale-100 opacity-100"
                )}
              />

              {/* Map grid pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid-pattern" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary/30" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid-pattern)" />
                </svg>
              </div>

              {/* Content */}
              <div
                key={`image-${currentBranch.id}`}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                  isTransitioning
                    ? cn(
                        'opacity-0 scale-95',
                        direction === 'next' ? '-translate-x-12' : 'translate-x-12'
                      )
                    : 'opacity-100 scale-100 translate-x-0'
                )}
              >
                {/* Placeholder content - Map pin */}
                <div className="relative z-10 text-center p-6">
                  <div className="relative">
                    <div className="w-28 h-28 md:w-40 md:h-40 mx-auto mb-4 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/50">
                      <MapPin className="w-14 h-14 md:w-20 md:h-20 text-primary" />
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 w-28 h-28 md:w-40 md:h-40 mx-auto rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>
                  <p className="text-primary/50 text-sm md:text-base font-medium mt-4">
                    Foto Cabang
                  </p>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
                <button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto disabled:opacity-50 border border-white/50"
                  aria-label="Cabang sebelumnya"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto disabled:opacity-50 border border-white/50"
                  aria-label="Cabang berikutnya"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                </button>
              </div>
            </div>

            {/* Right - Description (flipped) */}
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 xl:p-16 order-2 lg:col-span-2">
              <div
                key={currentBranch.id}
                className={cn(
                  'transition-all duration-500 ease-out',
                  isTransitioning
                    ? cn(
                        'opacity-0',
                        direction === 'next' ? 'translate-y-8' : '-translate-y-8'
                      )
                    : 'opacity-100 translate-y-0'
                )}
              >
                {/* Section label */}
                <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-4 block">
                  Lokasi Kami
                </span>

                {/* Branch Number */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm md:text-base">
                    {currentIndex + 1}
                  </span>
                  <span className="text-foreground/50 text-sm">dari {branches.length} cabang</span>
                </div>

                {/* Branch Name */}
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-3 md:mb-4">
                  {currentBranch.name}
                </h3>

                {/* Address */}
                <p className="text-foreground/60 text-sm md:text-base lg:text-lg mb-6 leading-relaxed">
                  {currentBranch.address}
                </p>

                {/* Operating Hours */}
                <div className="flex items-center gap-3 mb-6 p-3 md:p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Jam Operasional</p>
                    <p className="text-xs md:text-sm text-foreground/60">
                      {businessHours.days}: {businessHours.open} - {businessHours.close}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 mb-8">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-foreground/70 text-sm md:text-base">{currentBranch.phone}</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(`Halo Kynd Days ${currentBranch.name}, saya ingin bertanya tentang layanan pijat dan reservasi.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white min-h-[44px] text-sm md:text-base group">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(currentBranch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white min-h-[44px] text-sm md:text-base group">
                      <Navigation className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                      Buka Maps
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-8 right-1/2 translate-x-1/2 flex items-center gap-3 lg:right-16 lg:translate-x-0 lg:bottom-10">
            {branches.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-3 rounded-full transition-all duration-500 ease-out',
                  index === currentIndex
                    ? 'bg-primary w-10 md:w-12 shadow-lg'
                    : 'bg-primary/30 hover:bg-primary/50 w-3'
                )}
                aria-label={`Lihat cabang ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
            <div
              className="h-full bg-primary transition-all duration-300 ease-linear"
              style={{ width: `${((currentIndex + 1) / branches.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
