'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/types';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  showHappyHour?: boolean;
}

export function ServiceCard({ service, showHappyHour = false }: ServiceCardProps) {
  const [selectedDuration, setSelectedDuration] = useState(service.durations[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPriceRef = useRef(selectedDuration.price);

  const handleDurationChange = (duration: typeof selectedDuration) => {
    if (duration.minutes !== selectedDuration.minutes) {
      setIsAnimating(true);
      prevPriceRef.current = selectedDuration.price;
      setSelectedDuration(duration);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div
      id={service.id}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-32"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-background-light to-background overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 3c-1.5 2-3 3.5-3 6 0 2.5 1.5 4 3 4s3-1.5 3-4c0-2.5-1.5-4-3-6z" />
              <path d="M12 13v8" />
              <path d="M8 17h8" />
            </svg>
          </div>
        </div>

        {/* Popular Badge */}
        {service.isPopular && (
          <Badge className="absolute top-4 right-4 bg-accent text-white border-0">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Populer
          </Badge>
        )}

        {/* Decorative overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl text-primary font-semibold mb-2">
          {service.nameId}
        </h3>
        <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
          {service.descriptionId}
        </p>

        {/* Duration Options */}
        <div className="space-y-2 mb-4">
          <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
            Pilih Durasi
          </p>
          <div className="flex flex-wrap gap-2">
            {service.durations.map((duration) => (
              <button
                key={duration.minutes}
                onClick={() => handleDurationChange(duration)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  selectedDuration.minutes === duration.minutes
                    ? 'bg-primary text-white'
                    : 'bg-background-light text-foreground/70 hover:bg-primary/10'
                )}
              >
                {duration.minutes} menit
              </button>
            ))}
          </div>
        </div>

        {/* Price Display */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-foreground/50 mb-1">Harga</p>
            <div className="flex items-baseline gap-2 overflow-hidden h-8">
              {showHappyHour ? (
                <>
                  <span
                    key={selectedDuration.happyHourPrice}
                    className={cn(
                      "text-2xl font-bold text-primary inline-block",
                      isAnimating && "animate-price-scroll"
                    )}
                  >
                    IDR {selectedDuration.happyHourPrice}K
                  </span>
                  <span
                    key={`strike-${selectedDuration.price}`}
                    className={cn(
                      "text-sm text-foreground/40 line-through inline-block",
                      isAnimating && "animate-price-scroll"
                    )}
                  >
                    IDR {selectedDuration.price}K
                  </span>
                </>
              ) : (
                <span
                  key={selectedDuration.price}
                  className={cn(
                    "text-2xl font-bold text-primary inline-block",
                    isAnimating && "animate-price-scroll"
                  )}
                >
                  IDR {selectedDuration.price}K
                </span>
              )}
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm text-foreground/60",
            isAnimating && "animate-price-scroll"
          )}>
            <Clock className="w-4 h-4" />
            {selectedDuration.minutes} menit
          </div>
        </div>

        {/* CTA */}
        <Link href={`/reservasi?service=${service.id}&duration=${selectedDuration.minutes}`}>
          <Button className="w-full bg-primary hover:bg-primary-dark text-white">
            Reservasi Sekarang
          </Button>
        </Link>
      </div>
    </div>
  );
}
