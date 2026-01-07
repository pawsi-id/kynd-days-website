'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services, additionalServices, vipCoupleRoom, happyHour } from '@/data/services';
import { cn } from '@/lib/utils';

export default function HargaPage() {
  const [showHappyHour, setShowHappyHour] = useState(false);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Daftar Harga
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-6">
              Harga Transparan
            </h1>
            <p className="text-foreground/60 text-lg mb-8">
              Harga yang jelas tanpa biaya tersembunyi.
              Pilih layanan sesuai kebutuhan dan budget Anda.
            </p>

            {/* Happy Hour Toggle */}
            <div className="inline-flex items-center gap-4 p-2 rounded-full bg-white shadow-md">
              <button
                onClick={() => setShowHappyHour(false)}
                className={cn(
                  'px-6 py-3 rounded-full text-sm font-medium transition-all',
                  !showHappyHour
                    ? 'bg-primary text-white'
                    : 'text-foreground/70 hover:bg-background-light'
                )}
              >
                Harga Normal
              </button>
              <button
                onClick={() => setShowHappyHour(true)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all',
                  showHappyHour
                    ? 'bg-accent text-white'
                    : 'text-foreground/70 hover:bg-background-light'
                )}
              >
                <Sparkles className="w-4 h-4" />
                Happy Hour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Hour Banner */}
      {showHappyHour && (
        <section className="py-6 bg-gradient-to-r from-accent to-accent-light animate-fade-in">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <Sparkles className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-semibold text-lg">
                  Hemat {happyHour.discount}% dengan Happy Hour!
                </p>
                <p className="text-white/80 text-sm">
                  Berlaku {happyHour.days}, pukul {happyHour.startTime} - {happyHour.endTime}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Price Tables */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="relative bg-background-light rounded-2xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading text-xl text-primary font-semibold">
                        {service.nameId}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-1">{service.descriptionId}</p>
                    </div>
                    {service.isPopular && (
                      <Badge className="bg-accent text-white border-0 shrink-0">Populer</Badge>
                    )}
                  </div>
                </div>

                {/* Price Table */}
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="text-foreground/50 text-sm">
                        <th className="text-left pb-3 font-medium">Durasi</th>
                        <th className="text-right pb-3 font-medium">
                          {showHappyHour ? 'Harga Normal' : 'Harga'}
                        </th>
                        {showHappyHour && (
                          <th className="text-right pb-3 font-medium text-accent">Happy Hour</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {service.durations.map((duration, dIndex) => (
                        <tr
                          key={duration.minutes}
                          className={cn(
                            'border-t border-border/30',
                            dIndex === 0 && 'font-medium'
                          )}
                        >
                          <td className="py-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary/60" />
                            {duration.minutes} menit
                          </td>
                          <td
                            className={cn(
                              'text-right py-4',
                              showHappyHour ? 'text-foreground/40 line-through' : 'text-primary font-semibold'
                            )}
                          >
                            IDR {duration.price}K
                          </td>
                          {showHappyHour && (
                            <td className="text-right py-4 text-accent font-semibold">
                              IDR {duration.happyHourPrice}K
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Book Button */}
                  <Link href={`/reservasi?service=${service.id}`} className="block mt-4">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      Reservasi
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Terapi Tambahan
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
              Additional Therapy
            </h2>
            <p className="text-foreground/60">Lengkapi sesi pijat Anda dengan terapi tambahan</p>
            <div className="decorative-line mx-auto mt-6" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary/5">
                  <tr className="text-foreground/70 text-sm">
                    <th className="text-left p-4 font-medium">Layanan</th>
                    <th className="text-center p-4 font-medium">Durasi</th>
                    <th className="text-right p-4 font-medium">
                      {showHappyHour ? 'Normal' : 'Harga'}
                    </th>
                    {showHappyHour && (
                      <th className="text-right p-4 font-medium text-accent">Happy Hour</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {additionalServices.map((item, index) => (
                    <tr
                      key={item.id}
                      className={cn(
                        'border-t border-border/30 animate-fade-in',
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4 font-medium text-primary">{item.nameId}</td>
                      <td className="text-center p-4 text-foreground/60">{item.duration} menit</td>
                      <td
                        className={cn(
                          'text-right p-4',
                          showHappyHour ? 'text-foreground/40 line-through' : 'text-primary font-semibold'
                        )}
                      >
                        IDR {item.price}K
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
          </div>
        </div>
      </section>

      {/* VIP Couple Room */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-accent text-white border-0 mb-6">Premium Upgrade</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
              {vipCoupleRoom.nameId}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {vipCoupleRoom.descriptionId}
            </p>
            <div className="inline-flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold">+IDR {vipCoupleRoom.price}K</span>
              <span className="text-white/60">/ sesi</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Check className="w-5 h-5 text-accent" />
                <span>Ruangan privat</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Check className="w-5 h-5 text-accent" />
                <span>2 bed massage</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Check className="w-5 h-5 text-accent" />
                <span>Ambiance romantis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading text-xl text-primary font-semibold mb-6 text-center">
              Ketentuan Harga
            </h3>
            <ul className="space-y-3 text-foreground/70 text-sm">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Harga sudah termasuk semua perlengkapan dan handuk bersih</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Happy Hour berlaku {happyHour.days}, pukul {happyHour.startTime} - {happyHour.endTime}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Terapi tambahan dapat dikombinasikan dengan layanan utama</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>VIP Couple Room dapat direservasi untuk pasangan atau keluarga</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
            Ada Pertanyaan?
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto mb-8">
            Hubungi kami untuk informasi lebih lanjut atau reservasi langsung
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservasi">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8">
                Reservasi Sekarang
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
    </div>
  );
}
