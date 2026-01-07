'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, Check, ArrowRight, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { services, additionalServices, vipCoupleRoom, happyHour } from '@/data/services';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export default function HargaPage() {
  const [showHappyHour, setShowHappyHour] = useState(false);
  const happyHourBannerRef = useRef<HTMLElement>(null);
  const priceTableRef = useRef<HTMLElement>(null);

  const handlePriceToggle = (isHappyHour: boolean) => {
    setShowHappyHour(isHappyHour);
    // Auto scroll to Happy Hour banner (if active) or price tables
    setTimeout(() => {
      const targetRef = isHappyHour ? happyHourBannerRef.current : priceTableRef.current;
      if (targetRef) {
        const headerOffset = 100;
        const elementPosition = targetRef.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Animation refs
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.2 });
  const { ref: servicesHeaderRef, isInView: servicesHeaderInView } = useInView({ threshold: 0.2 });
  const { ref: servicesGridRef, isInView: servicesGridInView } = useInView({ threshold: 0.1 });
  const { ref: additionalRef, isInView: additionalInView } = useInView({ threshold: 0.2 });
  const { ref: additionalTableRef, isInView: additionalTableInView } = useInView({ threshold: 0.1 });
  const { ref: vipRef, isInView: vipInView } = useInView({ threshold: 0.2 });
  const { ref: notesRef, isInView: notesInView } = useInView({ threshold: 0.2 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

  const formatPrice = (price: number, isHappyHour?: boolean) => {
    if (showHappyHour && !isHappyHour) {
      return <span className="text-foreground/40 line-through">IDR {price}K</span>;
    }
    return <span className={cn(isHappyHour ? 'text-accent' : 'text-primary', 'font-semibold')}>IDR {price}K</span>;
  };

  return (
    <div className="pt-20 pb-32 md:pt-24 md:pb-16">
      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div
            ref={heroRef}
            className={cn(
              'text-center max-w-3xl mx-auto animate-fade-up px-4 md:px-0',
              heroInView && 'in-view'
            )}
          >
            <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4 block">
              Daftar Harga
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-4 md:mb-6">
              Harga Transparan
            </h1>
            <p className="text-foreground/60 text-sm md:text-lg mb-6 md:mb-10">
              Harga yang jelas tanpa biaya tersembunyi.
              Pilih layanan sesuai kebutuhan dan budget Anda.
            </p>

            {/* Happy Hour Toggle */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 p-1 md:p-1.5 rounded-full bg-white shadow-lg border border-border/50">
              <button
                onClick={() => handlePriceToggle(false)}
                className={cn(
                  'px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 min-h-[44px]',
                  !showHappyHour
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground/70 hover:bg-background-light'
                )}
              >
                Harga Normal
              </button>
              <button
                onClick={() => handlePriceToggle(true)}
                className={cn(
                  'flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 min-h-[44px]',
                  showHappyHour
                    ? 'bg-gradient-to-r from-accent to-accent-light text-white shadow-md'
                    : 'text-foreground/70 hover:bg-background-light'
                )}
              >
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Happy Hour</span>
                <span className="sm:hidden">Promo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Hour Banner */}
      {showHappyHour && (
        <section ref={happyHourBannerRef} className="py-4 md:py-5 bg-gradient-to-r from-accent via-accent-light to-accent relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          <div className="container-custom relative">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base md:text-lg">
                    Hemat {happyHour.discount}% dengan Happy Hour!
                  </p>
                  <p className="text-white/80 text-xs md:text-sm">
                    {happyHour.days}, pukul {happyHour.startTime} - {happyHour.endTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Price Tables */}
      <section ref={priceTableRef} className="py-8 md:py-16 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div
            ref={servicesHeaderRef}
            className={cn(
              'text-center mb-8 md:mb-12 px-4 md:px-0 animate-fade-up',
              servicesHeaderInView && 'in-view'
            )}
          >
            <h2 className="font-heading text-xl md:text-2xl lg:text-3xl text-primary font-semibold mb-2 md:mb-3">
              Layanan Pijat
            </h2>
            <p className="text-foreground/60 text-sm md:text-base">Pilih layanan yang sesuai dengan kebutuhan Anda</p>
            <div className="decorative-line mx-auto mt-3 md:mt-4" />
          </div>

          {/* Services Grid - 3 columns on large screens */}
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className={cn(
                  'relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full animate-fade-up',
                  service.isPopular && 'ring-2 ring-accent ring-offset-2',
                  servicesGridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {service.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-accent text-white text-[10px] md:text-xs font-medium px-2 md:px-3 py-1 md:py-1.5 rounded-bl-lg flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                      Populer
                    </div>
                  </div>
                )}

                <CardHeader className="pb-2 px-4 md:px-6 pt-4 md:pt-6">
                  <CardTitle className="font-heading text-base md:text-lg text-primary pr-12 md:pr-16">
                    {service.nameId}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm line-clamp-2">
                    {service.descriptionId}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 px-4 md:px-6 pb-4 md:pb-6 flex flex-col flex-1">
                  {/* Price List */}
                  <div className="space-y-0 divide-y divide-border/50 flex-1">
                    {service.durations.map((duration, dIndex) => (
                      <div
                        key={duration.minutes}
                        className={cn(
                          'flex items-center justify-between py-2.5 md:py-3',
                          dIndex === 0 && 'pt-0'
                        )}
                      >
                        <div className="flex items-center gap-1.5 md:gap-2 text-foreground/70">
                          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/50" />
                          <span className="text-xs md:text-sm">{duration.minutes} menit</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                          {formatPrice(duration.price)}
                          {showHappyHour && (
                            <span className="text-accent font-semibold">
                              IDR {duration.happyHourPrice}K
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Book Button */}
                  <Link href={`/reservasi?service=${service.id}`} className="block mt-3 md:mt-4">
                    <Button
                      variant="outline"
                      className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary group text-xs md:text-sm min-h-[44px]"
                    >
                      Reservasi
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-8 md:py-16 bg-background-light">
        <div className="container-custom">
          <div
            ref={additionalRef}
            className={cn(
              'text-center mb-6 md:mb-10 px-4 md:px-0 animate-fade-up',
              additionalInView && 'in-view'
            )}
          >
            <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-2 md:mb-3 block">
              Terapi Tambahan
            </span>
            <h2 className="font-heading text-xl md:text-2xl lg:text-3xl text-primary font-semibold mb-2 md:mb-3">
              Additional Therapy
            </h2>
            <p className="text-foreground/60 text-sm md:text-base">Lengkapi sesi pijat Anda dengan terapi tambahan</p>
            <div className="decorative-line mx-auto mt-3 md:mt-4" />
          </div>

          <div
            ref={additionalTableRef}
            className={cn(
              'max-w-3xl mx-auto animate-scale',
              additionalTableInView && 'in-view'
            )}
          >
            <Card className="border-0 shadow-lg overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/30">
                      <th className="text-left p-4 font-medium text-foreground/70 text-sm">Layanan</th>
                      <th className="text-center p-4 font-medium text-foreground/70 text-sm">Durasi</th>
                      <th className="text-right p-4 font-medium text-foreground/70 text-sm">
                        {showHappyHour ? 'Normal' : 'Harga'}
                      </th>
                      {showHappyHour && (
                        <th className="text-right p-4 font-medium text-accent text-sm">Happy Hour</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {additionalServices.map((item, index) => (
                      <tr
                        key={item.id}
                        className={cn(
                          'transition-colors hover:bg-background-light/50',
                          index !== additionalServices.length - 1 && 'border-b border-border/30'
                        )}
                      >
                        <td className="p-4 font-medium text-primary">{item.nameId}</td>
                        <td className="text-center p-4 text-foreground/60">{item.duration} menit</td>
                        <td className="text-right p-4">
                          {formatPrice(item.price)}
                        </td>
                        {showHappyHour && (
                          <td className="text-right p-4 text-accent font-semibold">
                            IDR {item.happyHourPrice}K
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden divide-y divide-border/30">
                {additionalServices.map((item) => (
                  <div key={item.id} className="p-3 md:p-4">
                    <div className="flex items-center justify-between mb-1.5 md:mb-2">
                      <span className="font-medium text-primary text-sm">{item.nameId}</span>
                      <Badge variant="secondary" className="text-[10px] md:text-xs">
                        {item.duration} menit
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end gap-2 md:gap-3 text-xs md:text-sm">
                      {formatPrice(item.price)}
                      {showHappyHour && (
                        <span className="text-accent font-semibold">
                          IDR {item.happyHourPrice}K
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* VIP Couple Room */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/50 rounded-full" />
        </div>

        <div className="container-custom relative px-4 md:px-0">
          <div
            ref={vipRef}
            className={cn(
              'max-w-3xl mx-auto text-center text-white animate-fade-up',
              vipInView && 'in-view'
            )}
          >
            <div
              className={cn(
                'inline-flex items-center gap-1.5 md:gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 animate-scale',
                vipInView && 'in-view'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              <Crown className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <span className="text-xs md:text-sm font-medium text-accent-light">Premium Upgrade</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 md:mb-4">
              {vipCoupleRoom.nameId}
            </h2>
            <p className="text-white/80 text-sm md:text-lg mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed">
              {vipCoupleRoom.descriptionId}
            </p>

            <div
              className={cn(
                'inline-flex items-baseline gap-1.5 md:gap-2 mb-6 md:mb-8 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-8 py-3 md:py-4 animate-scale',
                vipInView && 'in-view'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-lg md:text-2xl text-white/60">+</span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">IDR {vipCoupleRoom.price}K</span>
              <span className="text-white/60 text-xs md:text-base">/ sesi</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                'Ruangan privat',
                '2 bed massage',
                'Ambiance romantis'
              ].map((feature, index) => (
                <div
                  key={feature}
                  className={cn(
                    'flex items-center gap-1.5 md:gap-2 text-white/90 text-xs md:text-base animate-fade-up',
                    vipInView && 'in-view'
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent/30 flex items-center justify-center">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container-custom px-4 md:px-0">
          <div
            ref={notesRef}
            className={cn(
              'max-w-3xl mx-auto animate-fade-up',
              notesInView && 'in-view'
            )}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-3 md:pb-4 pt-4 md:pt-6">
                <CardTitle className="font-heading text-base md:text-xl text-primary">
                  Ketentuan Harga
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    'Harga sudah termasuk semua perlengkapan dan handuk bersih',
                    `Happy Hour berlaku ${happyHour.days}, pukul ${happyHour.startTime} - ${happyHour.endTime}`,
                    'Terapi tambahan dapat dikombinasikan dengan layanan utama',
                    'VIP Couple Room dapat direservasi untuk pasangan atau keluarga',
                    'Harga dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu',
                  ].map((note, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start gap-2 md:gap-3 text-foreground/70 text-xs md:text-sm animate-fade-up',
                        notesInView && 'in-view'
                      )}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent" />
                      </div>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA - Desktop */}
      <section className="hidden md:block section-padding bg-gradient-to-b from-background to-background-light">
        <div
          ref={ctaRef}
          className={cn(
            'container-custom text-center animate-fade-up',
            ctaInView && 'in-view'
          )}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
            Ada Pertanyaan?
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto mb-8">
            Hubungi kami untuk informasi lebih lanjut atau reservasi langsung
          </p>
          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up',
              ctaInView && 'in-view'
            )}
            style={{ transitionDelay: '150ms' }}
          >
            <Link href="/reservasi">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 shadow-lg hover:shadow-xl transition-all">
                Reservasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/kontak">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="container-custom py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/kontak" className="shrink-0">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white min-h-[44px] text-sm">
                Kontak
              </Button>
            </Link>
            <Link href="/reservasi" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white shadow-lg min-h-[44px] text-sm">
                Reservasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
