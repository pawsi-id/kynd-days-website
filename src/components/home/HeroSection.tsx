'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { happyHour } from '@/data/services';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-light to-background" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237D6B5D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Happy Hour Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-primary mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">
              Happy Hour {happyHour.discount}% OFF • {happyHour.days} ({happyHour.startTime}-{happyHour.endTime})
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-primary leading-tight mb-6 animate-fade-in-up">
            Rasakan{' '}
            <span className="relative">
              Ketenangan
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-accent/40"
                viewBox="0 0 200 12"
                fill="currentColor"
              >
                <path d="M0 8 Q50 0 100 8 T200 8" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
            <br />
            Bersama Keluarga
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Pengalaman pijat dan refleksi terbaik dengan terapis profesional
            dalam suasana yang nyaman dan menenangkan
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/reservasi">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg btn-elegant group"
              >
                Reservasi Sekarang
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/layanan">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg"
              >
                Lihat Layanan
              </Button>
            </Link>
          </div>

          {/* Operating Hours */}
          <div className="flex items-center justify-center gap-2 mt-12 text-sm text-foreground/60 animate-fade-in delay-500">
            <Clock className="w-4 h-4" />
            <span>Buka Setiap Hari: 10:00 - 22:00</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-primary/50 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 60C1248 60 1344 72 1392 78L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
