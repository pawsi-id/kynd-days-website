'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/services';

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Testimoni
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Pengalaman pelanggan yang telah merasakan layanan kami
          </p>
          <div className="decorative-line mx-auto mt-6" />
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden rounded-3xl bg-background-light p-8 md:p-12 pt-12">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 text-center px-4"
                >
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? 'text-accent fill-accent'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <blockquote className="font-heading text-xl md:text-2xl text-primary leading-relaxed mb-8">
                    &ldquo;{testimonial.comment}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    {/* Avatar Placeholder */}
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <span className="font-heading text-xl text-primary font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:-mx-16 pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border-0 hover:bg-primary hover:text-white pointer-events-auto"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border-0 hover:bg-primary hover:text-white pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-primary'
                    : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
