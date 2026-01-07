'use client';

import { useState } from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services, additionalServices, vipCoupleRoom, happyHour } from '@/data/services';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'massage', label: 'Pijat' },
  { id: 'reflexology', label: 'Refleksi' },
];

export default function LayananPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showHappyHour, setShowHappyHour] = useState(false);

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Layanan Kami
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-6">
              Pilihan Perawatan Lengkap
            </h1>
            <p className="text-foreground/60 text-lg mb-8">
              Temukan layanan pijat dan refleksi yang sesuai dengan kebutuhan Anda.
              Semua layanan dilakukan oleh terapis profesional berpengalaman.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Toggle Section */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-lg border-b border-border py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-foreground/50" />
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all',
                      activeCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-background-light text-foreground/70 hover:bg-primary/10'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Happy Hour Toggle */}
            <button
              onClick={() => setShowHappyHour(!showHappyHour)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                showHappyHour
                  ? 'bg-accent text-white'
                  : 'bg-accent/20 text-primary hover:bg-accent/30'
              )}
            >
              <Sparkles className="w-4 h-4" />
              Happy Hour {happyHour.discount}% OFF
            </button>
          </div>

          {/* Happy Hour Notice */}
          {showHappyHour && (
            <div className="mt-4 p-3 rounded-xl bg-accent/10 text-sm text-primary animate-fade-in">
              <span className="font-medium">Happy Hour berlaku:</span> {happyHour.days},{' '}
              {happyHour.startTime} - {happyHour.endTime}
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} showHappyHour={showHappyHour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Tambahan
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
              Terapi Tambahan
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Lengkapi pengalaman pijat Anda dengan layanan tambahan berikut
            </p>
            <div className="decorative-line mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalServices.map((item, index) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-background-light card-hover text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="font-heading text-lg text-primary font-semibold mb-2">
                  {item.nameId}
                </h4>
                <p className="text-sm text-foreground/60 mb-3">{item.duration} menit</p>
                <div className="flex items-center justify-center gap-2">
                  {showHappyHour ? (
                    <>
                      <span className="text-xl font-bold text-primary">
                        IDR {item.happyHourPrice}K
                      </span>
                      <span className="text-sm text-foreground/40 line-through">
                        IDR {item.price}K
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-primary">IDR {item.price}K</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* VIP Couple Room */}
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-center">
            <Badge className="bg-accent text-white border-0 mb-4">Premium</Badge>
            <h3 className="font-heading text-2xl font-semibold mb-2">{vipCoupleRoom.nameId}</h3>
            <p className="text-white/80 mb-4 max-w-lg mx-auto">{vipCoupleRoom.descriptionId}</p>
            <p className="text-3xl font-bold">
              +IDR {vipCoupleRoom.price}K
              <span className="text-lg font-normal text-white/60 ml-2">/ sesi</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
            Siap untuk Relaksasi?
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto mb-8">
            Reservasi sekarang dan rasakan pengalaman pijat terbaik bersama Kynd Days
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white px-8"
            asChild
          >
            <a href="/reservasi">Reservasi Sekarang</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
