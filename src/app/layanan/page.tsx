'use client';

import { useState, useRef } from 'react';
import { Filter, Sparkles, Clock, Award, Users } from 'lucide-react';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services, additionalServices, vipCoupleRoom, happyHour } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Semua', count: services.length },
  { id: 'massage', label: 'Pijat', count: services.filter((s) => s.category === 'massage').length },
  { id: 'reflexology', label: 'Refleksi', count: services.filter((s) => s.category === 'reflexology').length },
];

const highlights = [
  { icon: Award, label: 'Terapis Bersertifikat', value: '10+ Tahun' },
  { icon: Users, label: 'Pelanggan Puas', value: '5000+' },
  { icon: Clock, label: 'Jam Operasional', value: '10:00 - 22:00' },
];

export default function LayananPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showHappyHour, setShowHappyHour] = useState(false);
  const servicesGridRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Auto scroll to services grid - subtle scroll to keep filter visible
    setTimeout(() => {
      if (servicesGridRef.current) {
        const headerOffset = 200; // Larger offset = less scroll
        const elementPosition = servicesGridRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.2 });
  const { ref: highlightsRef, isInView: highlightsInView } = useInView({ threshold: 0.2 });
  const { ref: gridHeaderRef, isInView: gridHeaderInView } = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.1 });
  const { ref: additionalHeaderRef, isInView: additionalHeaderInView } = useInView({ threshold: 0.2 });
  const { ref: additionalGridRef, isInView: additionalGridInView } = useInView({ threshold: 0.1 });
  const { ref: vipRef, isInView: vipInView } = useInView({ threshold: 0.2 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-10 md:pt-32 md:pb-20 bg-gradient-to-b from-background via-background to-background-light relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div
            ref={heroRef}
            className={cn(
              'text-center max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-up',
              heroInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-1.5 md:gap-2 text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Layanan Kami
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-4 md:mb-6 leading-tight">
              Pilihan Perawatan
              <span className="block gradient-text">Lengkap untuk Anda</span>
            </h1>
            <p className="text-foreground/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4 md:px-0">
              Temukan layanan pijat dan refleksi yang sesuai dengan kebutuhan Anda.
              Semua layanan dilakukan oleh terapis profesional berpengalaman.
            </p>
          </div>

          {/* Highlights */}
          <div
            ref={highlightsRef}
            className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto"
          >
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  'flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/50 backdrop-blur-sm border border-border/50 animate-fade-up',
                  highlightsInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                <span className="text-sm md:text-lg font-semibold text-primary">{item.value}</span>
                <span className="text-[10px] md:text-xs text-foreground/50 text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Toggle Section */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container-custom py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="hidden sm:flex items-center gap-2 text-foreground/50">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex gap-1 md:gap-2 p-1 bg-background-light rounded-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={cn(
                      'px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 min-h-[40px]',
                      activeCategory === cat.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-foreground/70 hover:text-primary hover:bg-white'
                    )}
                  >
                    {cat.label}
                    <span
                      className={cn(
                        'ml-1 md:ml-1.5 text-[10px] md:text-xs',
                        activeCategory === cat.id ? 'text-white/80' : 'text-foreground/40'
                      )}
                    >
                      ({cat.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Happy Hour Toggle */}
            <button
              onClick={() => setShowHappyHour(!showHappyHour)}
              className={cn(
                'flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 min-h-[40px]',
                showHappyHour
                  ? 'bg-gradient-to-r from-accent to-accent-light text-white shadow-lg shadow-accent/25'
                  : 'bg-accent/10 text-primary hover:bg-accent/20 border border-accent/20'
              )}
            >
              <Sparkles className={cn('w-3.5 h-3.5 md:w-4 md:h-4', showHappyHour && 'animate-pulse')} />
              Happy Hour {happyHour.discount}% OFF
            </button>
          </div>

          {/* Happy Hour Notice */}
          {showHappyHour && (
            <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 animate-fade-in">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-primary">Happy Hour Aktif!</p>
                  <p className="text-xs md:text-sm text-foreground/60">
                    {happyHour.days}, {happyHour.startTime} - {happyHour.endTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesGridRef} className="section-padding bg-gradient-to-b from-background-light to-background">
        <div className="container-custom">
          {/* Section header */}
          <div
            ref={gridHeaderRef}
            className={cn(
              'flex items-center justify-between mb-8 animate-fade-up',
              gridHeaderInView && 'in-view'
            )}
          >
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary font-semibold">
                {activeCategory === 'all'
                  ? 'Semua Layanan'
                  : activeCategory === 'massage'
                    ? 'Layanan Pijat'
                    : 'Layanan Refleksi'}
              </h2>
              <p className="text-foreground/50 text-sm mt-1">
                Menampilkan {filteredServices.length} layanan
              </p>
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className={cn(
                  'animate-fade-up',
                  gridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} showHappyHour={showHappyHour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div
            ref={additionalHeaderRef}
            className={cn(
              'text-center mb-12 animate-fade-up',
              additionalHeaderInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase mb-4 px-4 py-2 bg-accent/10 rounded-full">
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

          <div ref={additionalGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {additionalServices.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'group p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-b from-background-light to-background border border-border/50 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 text-center animate-fade-up',
                  additionalGridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <h4 className="font-heading text-sm md:text-lg text-primary font-semibold mb-1 md:mb-2">
                  {item.nameId}
                </h4>
                <p className="text-xs md:text-sm text-foreground/50 mb-3 md:mb-4">{item.duration} menit</p>
                <div className="flex flex-col items-center gap-0.5 md:gap-1">
                  {showHappyHour ? (
                    <>
                      <span className="text-base md:text-xl font-bold text-primary">
                        IDR {item.happyHourPrice}K
                      </span>
                      <span className="text-xs md:text-sm text-foreground/40 line-through">
                        IDR {item.price}K
                      </span>
                    </>
                  ) : (
                    <span className="text-base md:text-xl font-bold text-primary">IDR {item.price}K</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* VIP Couple Room */}
          <div
            ref={vipRef}
            className={cn(
              'mt-8 md:mt-12 relative overflow-hidden rounded-2xl md:rounded-3xl animate-scale',
              vipInView && 'in-view'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="relative p-6 md:p-12 text-center">
              <Badge className="bg-accent/90 text-white border-0 mb-4 md:mb-6 px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                Pengalaman Premium
              </Badge>
              <h3 className="font-heading text-xl md:text-3xl font-semibold mb-2 md:mb-3 text-white">
                {vipCoupleRoom.nameId}
              </h3>
              <p className="text-white/70 mb-4 md:mb-6 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                {vipCoupleRoom.descriptionId}
              </p>
              <div className="inline-flex items-baseline gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4">
                <span className="text-sm md:text-lg text-white/60">+</span>
                <span className="text-2xl md:text-4xl font-bold text-white">IDR {vipCoupleRoom.price}K</span>
                <span className="text-sm md:text-lg font-normal text-white/60">/ sesi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background to-background-light relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div
            ref={ctaRef}
            className={cn(
              'max-w-2xl mx-auto text-center animate-fade-up',
              ctaInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase mb-6 px-4 py-2 bg-accent/10 rounded-full">
              <Sparkles className="w-4 h-4" />
              Reservasi
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-6 leading-tight">
              Siap untuk Relaksasi?
            </h2>
            <p className="text-foreground/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Reservasi sekarang dan rasakan pengalaman pijat terbaik bersama Kynd Days
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-base btn-elegant"
                asChild
              >
                <a href="/reservasi">Reservasi Sekarang</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-base"
                asChild
              >
                <a href="/kontak">Hubungi Kami</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
