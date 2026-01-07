'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services } from '@/data/services';

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
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Layanan Kami
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-4">
            Pilihan Perawatan Terbaik
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Berbagai pilihan layanan pijat dan refleksi untuk memenuhi kebutuhan
            relaksasi Anda dan keluarga
          </p>
          <div className="decorative-line mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-background-light rounded-2xl p-6 lg:p-8 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {service.isPopular && (
                <Badge className="absolute top-4 right-4 bg-accent text-white border-0">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Populer
                </Badge>
              )}

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {serviceIcons[service.id]}
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl text-primary font-semibold mb-2">
                {service.nameId}
              </h3>
              <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                {service.descriptionId}
              </p>

              {/* Duration & Price */}
              <div className="flex items-center gap-4 text-sm text-foreground/70 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{service.durations[0].minutes}-{service.durations[service.durations.length - 1].minutes} menit</span>
                </div>
                <span className="text-primary font-semibold">
                  Mulai IDR {service.durations[0].price}K
                </span>
              </div>

              {/* CTA */}
              <Link
                href={`/layanan#${service.id}`}
                className="inline-flex items-center text-primary font-medium text-sm group/link"
              >
                Lihat Detail
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/layanan">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white"
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
