'use client';

import { Users, Award, Clock, Heart, Shield, Sparkles } from 'lucide-react';

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
  return (
    <section className="section-padding bg-background-light relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Mengapa Kynd Days
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-4">
            Pengalaman Relaksasi Terbaik
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pelayanan terbaik untuk Anda dan keluarga
          </p>
          <div className="decorative-line mx-auto mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center p-8 rounded-2xl bg-white card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl text-primary font-semibold mb-3">
                {feature.titleId}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
