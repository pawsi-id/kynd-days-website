'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goToNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    goToPrevious();
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    goToNext();
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });

  return (
    <section className="section-padding bg-gradient-to-b from-white to-background-light overflow-hidden">
      <div ref={sectionRef} className="container-custom">
        {/* Section Header */}
        <div
          className={cn(
            'text-center mb-12 md:mb-16 animate-fade-up',
            isInView && 'in-view'
          )}
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-3 block">
            Testimoni
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-sm md:text-base">
            Pengalaman pelanggan yang telah merasakan layanan kami
          </p>
          <div className="decorative-line mx-auto mt-6" />
        </div>

        {/* Testimonials Grid - Show all cards on larger screens */}
        <div
          className={cn(
            'hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 animate-fade-up',
            isInView && 'in-view'
          )}
          style={{ transitionDelay: '150ms' }}
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 pt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4 transition-colors',
                      i < testimonial.rating
                        ? 'text-accent fill-accent'
                        : 'text-gray-200'
                    )}
                  />
                ))}
              </div>

              {/* Comment */}
              <blockquote className="text-foreground/80 leading-relaxed mb-6 min-h-[80px]">
                &ldquo;{testimonial.comment}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="font-heading text-lg text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-accent">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div
          className={cn(
            'lg:hidden relative animate-scale',
            isInView && 'in-view'
          )}
          style={{ transitionDelay: '150ms' }}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div
              className={cn(
                'flex transition-transform duration-500 ease-out',
                direction === 'right' ? 'ease-out' : 'ease-out'
              )}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-5 h-5',
                            i < testimonial.rating
                              ? 'text-accent fill-accent'
                              : 'text-gray-200'
                          )}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <blockquote className="text-center text-foreground/80 text-lg leading-relaxed mb-6">
                      &ldquo;{testimonial.comment}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3">
                        <span className="font-heading text-xl text-primary font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-accent">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    'transition-all duration-300 rounded-full',
                    index === currentIndex
                      ? 'w-6 h-2 bg-primary'
                      : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
                  )}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View more link for desktop */}
        <div
          className={cn(
            'hidden lg:block text-center mt-10 animate-fade-up',
            isInView && 'in-view'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-foreground/60 text-sm">
            Lebih dari <span className="font-semibold text-primary">500+</span> pelanggan puas dengan layanan kami
          </p>
        </div>
      </div>
    </section>
  );
}
