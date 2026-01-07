'use client';

import { Users, Award, Clock, Heart, Shield, Sparkles } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Users,
    title: 'Terapis Profesional',
    titleId: 'Terapis Profesional',
    description: 'Tim terapis berpengalaman dan tersertifikasi untuk pelayanan terbaik',
  },
  {
    icon: Heart,
    title: 'Suasana Nyaman',
    titleId: 'Suasana Nyaman',
    description: 'Ruangan yang tenang dan bersih untuk pengalaman relaksasi maksimal',
  },
  {
    icon: Clock,
    title: 'Jam Operasi Panjang',
    titleId: 'Jam Operasi Panjang',
    description: 'Buka setiap hari dari pukul 10:00 hingga 22:00 untuk kenyamanan Anda',
  },
  {
    icon: Award,
    title: 'Produk Berkualitas',
    titleId: 'Produk Berkualitas',
    description: 'Menggunakan minyak esensial dan produk perawatan premium',
  },
  {
    icon: Shield,
    title: 'Higienis & Aman',
    titleId: 'Higienis & Aman',
    description: 'Protokol kebersihan ketat untuk keamanan dan kenyamanan Anda',
  },
  {
    icon: Sparkles,
    title: 'Harga Terjangkau',
    titleId: 'Harga Terjangkau',
    description: 'Layanan premium dengan harga yang ramah di kantong keluarga',
  },
];

export function WhyChooseUs() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-background-light relative overflow-hidden">
      <div className="container-custom relative z-10 px-4 md:px-0">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-8 md:mb-10 lg:mb-16 animate-fade-up',
            headerInView && 'in-view'
          )}
        >
          <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-2 md:mb-3 block">
            Mengapa Kynd Days
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-3 md:mb-4">
            Pengalaman Relaksasi Terbaik
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            Kami berkomitmen memberikan pelayanan terbaik untuk Anda dan keluarga
          </p>
          <div className="decorative-line mx-auto mt-4 md:mt-6" />
        </div>

        {/* Features Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group text-center p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white card-hover animate-fade-up',
                gridInView && 'in-view'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4 md:mb-5 lg:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
                <feature.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-base md:text-lg lg:text-xl text-primary font-semibold mb-2 md:mb-3">
                {feature.titleId}
              </h3>
              <p className="text-foreground/60 text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
