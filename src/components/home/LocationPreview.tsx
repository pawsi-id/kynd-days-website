'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { branches, businessHours } from '@/data/services';

export function LocationPreview() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Lokasi Kami
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-6">
              Kunjungi Cabang Terdekat
            </h2>
            <p className="text-foreground/60 mb-8 leading-relaxed">
              Kynd Days hadir di 3 lokasi strategis untuk melayani Anda.
              Temukan cabang terdekat dan rasakan pengalaman relaksasi terbaik.
            </p>

            {/* Operating Hours */}
            <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-accent/10">
              <Clock className="w-6 h-6 text-accent" />
              <div>
                <p className="font-medium text-primary">Jam Operasional</p>
                <p className="text-sm text-foreground/70">
                  {businessHours.days}: {businessHours.open} - {businessHours.close}
                </p>
              </div>
            </div>

            {/* Branches List */}
            <div className="space-y-4 mb-8">
              {branches.map((branch, index) => (
                <div
                  key={branch.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary mb-1">{branch.name}</h4>
                    <p className="text-sm text-foreground/60 mb-2">{branch.address}</p>
                    <a
                      href={`tel:${branch.phone}`}
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-light"
                    >
                      <Phone className="w-3 h-3" />
                      {branch.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/kontak">
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Lihat Semua Lokasi
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-background-light relative">
              {/* Decorative Map Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  {/* Map Icon */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-foreground/60 text-sm">
                    Peta interaktif akan ditampilkan di halaman Kontak
                  </p>
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-1 text-primary font-medium mt-4 hover:text-primary-dark"
                  >
                    Buka Peta
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-accent/20 animate-pulse-soft" />
              <div className="absolute bottom-12 left-12 w-12 h-12 rounded-full bg-primary/20 animate-pulse-soft delay-300" />
              <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-accent/30 animate-float" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs animate-fade-in delay-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">3 Cabang</p>
                  <p className="text-xs text-foreground/60">Siap Melayani Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
