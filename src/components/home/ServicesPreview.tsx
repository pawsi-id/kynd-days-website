'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function ServicesPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const { ref: carouselRef, isInView: carouselInView } = useInView({ threshold: 0.1 });

  const currentService = services[currentIndex];

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
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
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning, goToNext]);

  return (
    <section className="overflow-hidden">
      {/* Service Carousel - Full Width */}
      <div
        ref={carouselRef}
        className={cn(
          'animate-fade-up',
          carouselInView && 'in-view'
        )}
      >
        <div className="relative bg-gradient-to-br from-background-light via-white to-accent/5">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
            {/* Left - Description */}
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 xl:p-16 order-2 lg:order-1 lg:col-span-2">
              <div
                key={currentService.id}
                className={cn(
                  'transition-all duration-500 ease-out',
                  isTransitioning
                    ? cn(
                        'opacity-0',
                        direction === 'next' ? '-translate-y-8' : 'translate-y-8'
                      )
                    : 'opacity-100 translate-y-0'
                )}
              >
                {/* Popular Badge */}
                {currentService.isPopular && (
                  <Badge className="mb-4 bg-accent text-white border-0 text-[10px] md:text-xs w-fit">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1 fill-current" />
                    Populer
                  </Badge>
                )}

                {/* Service Name */}
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-3 md:mb-4">
                  {currentService.nameId}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
                  {currentService.descriptionId}
                </p>

                {/* Duration & Price Info */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 text-sm md:text-base text-foreground/70">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                    <span>
                      {currentService.durations[0].minutes} - {currentService.durations[currentService.durations.length - 1].minutes} menit
                    </span>
                  </div>
                  <div className="text-primary font-semibold text-lg md:text-xl">
                    Mulai IDR {currentService.durations[0].price}K
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/layanan#${currentService.id}`}>
                  <Button className="bg-primary hover:bg-primary-dark text-white min-h-[44px] text-sm md:text-base group">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Image Placeholder */}
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 order-1 lg:order-2 min-h-[300px] md:min-h-[350px] lg:min-h-full lg:col-span-3 overflow-hidden">
              {/* Animated background elements */}
              <div
                className={cn(
                  "absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl transition-all duration-1000",
                  isTransitioning ? "scale-75 opacity-50" : "scale-100 opacity-100"
                )}
                style={{ transform: `translate(${currentIndex * 10}px, ${currentIndex * 5}px)` }}
              />
              <div
                className={cn(
                  "absolute bottom-1/4 right-1/4 w-32 h-32 md:w-56 md:h-56 bg-accent/20 rounded-full blur-3xl transition-all duration-1000 delay-100",
                  isTransitioning ? "scale-75 opacity-50" : "scale-100 opacity-100"
                )}
                style={{ transform: `translate(${-currentIndex * 8}px, ${currentIndex * 8}px)` }}
              />
              <div
                className={cn(
                  "absolute top-1/2 right-1/3 w-24 h-24 md:w-40 md:h-40 bg-primary/5 rounded-full blur-2xl transition-all duration-1000 delay-200",
                  isTransitioning ? "scale-50 opacity-0" : "scale-100 opacity-100"
                )}
              />

              {/* Content */}
              <div
                key={`image-${currentService.id}`}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                  isTransitioning
                    ? cn(
                        'opacity-0 scale-95',
                        direction === 'next' ? 'translate-x-12' : '-translate-x-12'
                      )
                    : 'opacity-100 scale-100 translate-x-0'
                )}
              >
                {/* Placeholder content */}
                <div className="relative z-10 text-center p-6">
                  <div className="w-24 h-24 md:w-36 md:h-36 mx-auto mb-4 rounded-3xl bg-white/70 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/50">
                    <span className="text-4xl md:text-5xl font-light text-primary/30">
                      {currentIndex + 1}
                    </span>
                  </div>
                  <p className="text-primary/40 text-sm md:text-base font-medium">
                    Gambar Layanan
                  </p>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
                <button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto disabled:opacity-50 border border-white/50"
                  aria-label="Layanan sebelumnya"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto disabled:opacity-50 border border-white/50"
                  aria-label="Layanan berikutnya"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 lg:left-16 lg:translate-x-0 lg:bottom-10">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-3 rounded-full transition-all duration-500 ease-out',
                  index === currentIndex
                    ? 'bg-primary w-10 md:w-12 shadow-lg'
                    : 'bg-primary/30 hover:bg-primary/50 w-3'
                )}
                aria-label={`Lihat layanan ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
            <div
              className="h-full bg-primary transition-all duration-300 ease-linear"
              style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
