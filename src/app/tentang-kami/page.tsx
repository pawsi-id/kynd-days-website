'use client';

import Link from 'next/link';
import { Heart, Users, Award, Shield, Clock, Sparkles, ArrowRight, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Heart,
    title: 'Pelayanan Sepenuh Hati',
    description: 'Setiap sentuhan terapis kami diberikan dengan kasih sayang dan dedikasi penuh untuk kesejahteraan Anda.',
  },
  {
    icon: Users,
    title: 'Kebersamaan Keluarga',
    description: 'Kami menciptakan ruang yang nyaman bagi seluruh keluarga untuk menikmati momen relaksasi bersama.',
  },
  {
    icon: Award,
    title: 'Standar Profesional',
    description: 'Tim terapis kami terlatih dan bersertifikasi untuk memberikan layanan berkualitas tinggi.',
  },
  {
    icon: Shield,
    title: 'Kebersihan Terjamin',
    description: 'Protokol kebersihan ketat diterapkan di setiap sesi untuk keamanan dan kenyamanan Anda.',
  },
];

const stats = [
  { value: '3', label: 'Cabang', icon: MapPin },
  { value: '20+', label: 'Terapis Profesional', icon: Users },
  { value: '5000+', label: 'Pelanggan Puas', icon: Star },
  { value: '12', label: 'Jam Operasi/Hari', icon: Clock },
];

const team = [
  { name: 'Tim Terapis Senior', role: 'Head Therapist', description: '10+ tahun pengalaman dalam pijat tradisional dan modern' },
  { name: 'Tim Terapis', role: 'Massage Therapist', description: 'Bersertifikasi & terlatih dengan teknik terkini' },
  { name: 'Tim Refleksi', role: 'Reflexology Specialist', description: 'Ahli titik refleksi untuk kesehatan optimal' },
];

export default function TentangKamiPage() {
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.2 });
  const { ref: heroImageRef, isInView: heroImageInView } = useInView({ threshold: 0.2 });
  const { ref: statsRef, isInView: statsInView } = useInView({ threshold: 0.2 });
  const { ref: valuesHeaderRef, isInView: valuesHeaderInView } = useInView({ threshold: 0.2 });
  const { ref: valuesGridRef, isInView: valuesGridInView } = useInView({ threshold: 0.1 });
  const { ref: storyRef, isInView: storyInView } = useInView({ threshold: 0.2 });
  const { ref: teamHeaderRef, isInView: teamHeaderInView } = useInView({ threshold: 0.2 });
  const { ref: teamGridRef, isInView: teamGridInView } = useInView({ threshold: 0.1 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-background via-background to-background-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div
              ref={heroRef}
              className={cn('animate-fade-up', heroInView && 'in-view')}
            >
              <span className="inline-flex items-center gap-1.5 md:gap-2 text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 rounded-full">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Tentang Kami
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-4 md:mb-6 leading-tight">
                Kynd Days
                <span className="block gradient-text">Family Wellness</span>
              </h1>
              <p className="text-foreground/70 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                <strong className="text-primary">Kynd Days Family Massage & Reflexology</strong> hadir
                untuk memberikan pengalaman relaksasi terbaik bagi Anda dan keluarga.
                Kami percaya bahwa setiap orang berhak mendapatkan momen ketenangan
                di tengah kesibukan sehari-hari.
              </p>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                Dengan nama &quot;Kynd Days&quot;, kami ingin setiap kunjungan Anda menjadi
                hari yang penuh kebaikan — baik untuk tubuh maupun pikiran.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/reservasi" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark text-white btn-elegant px-6 md:px-8 w-full sm:w-auto min-h-[48px] text-sm md:text-base">
                    Mulai Perjalanan Relaksasi
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/layanan" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 px-6 md:px-8 w-full sm:w-auto min-h-[48px] text-sm md:text-base">
                    Lihat Layanan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Placeholder */}
            <div
              ref={heroImageRef}
              className={cn('relative animate-slide-right', heroImageInView && 'in-view')}
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl" />

                <div className="text-center p-8 relative z-10">
                  {/* Logo Recreation */}
                  <svg
                    viewBox="0 0 120 100"
                    className="w-40 h-32 mx-auto text-primary mb-6"
                    fill="currentColor"
                  >
                    <path d="M60 10c-16 0-29 12-29 27s13 27 29 27 29-12 29-27-13-27-29-27zm0 44c-11 0-20-8-20-18s9-18 20-18 20 8 20 18-9 18-20 18z" />
                    <ellipse cx="36" cy="36" rx="16" ry="20" />
                    <ellipse cx="84" cy="36" rx="16" ry="20" />
                  </svg>
                  <p className="font-heading text-3xl text-primary mb-2">kynd days</p>
                  <p className="text-sm tracking-[0.2em] uppercase text-primary/60">
                    Family Massage & Reflexology
                  </p>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-xl">10:00 - 22:00</p>
                    <p className="text-sm text-foreground/60">Buka Setiap Hari</p>
                  </div>
                </div>
              </div>

              {/* Floating Rating Card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-primary">5.0</span>
                </div>
                <p className="text-xs text-foreground/50 mt-1">1000+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-dark to-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl" />
        </div>

        <div ref={statsRef} className="container-custom relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'text-center animate-fade-up',
                  statsInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <p className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div
            ref={valuesHeaderRef}
            className={cn(
              'text-center mb-16 animate-fade-up',
              valuesHeaderInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase mb-4 px-4 py-2 bg-accent/10 rounded-full">
              Nilai Kami
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
              Filosofi Kynd Days
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Setiap aspek layanan kami didasarkan pada nilai-nilai yang kami percaya
            </p>
            <div className="decorative-line mx-auto mt-6" />
          </div>

          <div ref={valuesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={cn(
                  'group flex gap-6 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-background-light to-background border border-border/50 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 animate-fade-up',
                  valuesGridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gradient-to-b from-background-light to-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div
            ref={storyRef}
            className={cn(
              'max-w-4xl mx-auto animate-fade-up',
              storyInView && 'in-view'
            )}
          >
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase mb-4 px-4 py-2 bg-accent/10 rounded-full">
                Cerita Kami
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
                Mengapa &quot;Kynd Days&quot;?
              </h2>
              <div className="decorative-line mx-auto" />
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
              <div className="space-y-6 text-foreground/70">
                <p className="text-center text-lg leading-relaxed">
                  Nama <strong className="text-primary">&quot;Kynd Days&quot;</strong> berasal dari kata
                  <em className="text-accent"> &quot;Kind&quot;</em> yang berarti baik hati, dan <em className="text-accent">&quot;Days&quot;</em> yang berarti hari-hari.
                  Kami ingin setiap hari yang Anda habiskan bersama kami menjadi hari yang
                  penuh kebaikan — untuk tubuh, pikiran, dan jiwa.
                </p>

                <div className="flex justify-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>

                <p className="text-center text-lg leading-relaxed">
                  Dengan tagline <strong className="text-primary">&quot;Family Massage & Reflexology&quot;</strong>,
                  kami menekankan bahwa layanan kami cocok untuk seluruh anggota keluarga.
                  Dari anak-anak hingga orang tua, semua dapat menikmati perawatan
                  yang aman dan nyaman di tempat kami.
                </p>

                <div className="flex justify-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full" />
                </div>

                <p className="text-center text-lg leading-relaxed">
                  Kami berkomitmen untuk terus meningkatkan kualitas layanan dan
                  memberikan pengalaman relaksasi terbaik bagi setiap pelanggan
                  yang mempercayakan kesejahteraan mereka kepada kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div
            ref={teamHeaderRef}
            className={cn(
              'text-center mb-16 animate-fade-up',
              teamHeaderInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase mb-4 px-4 py-2 bg-accent/10 rounded-full">
              Tim Kami
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
              Terapis Profesional
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Tim terapis kami yang berpengalaman dan bersertifikasi siap melayani Anda
            </p>
            <div className="decorative-line mx-auto mt-6" />
          </div>

          <div ref={teamGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <div
                key={member.role}
                className={cn(
                  'group text-center p-8 lg:p-10 rounded-3xl bg-gradient-to-b from-background-light to-background border border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 animate-fade-up',
                  teamGridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Avatar Placeholder */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-primary font-semibold mb-2">
                  {member.name}
                </h3>
                <p className="inline-block text-accent text-sm font-medium mb-4 px-3 py-1 bg-accent/10 rounded-full">
                  {member.role}
                </p>
                <p className="text-foreground/60 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-primary text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div
            ref={ctaRef}
            className={cn(
              'text-center max-w-2xl mx-auto animate-fade-up',
              ctaInView && 'in-view'
            )}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Siap Merasakan Perbedaannya?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Kunjungi salah satu cabang kami dan rasakan pengalaman relaksasi
              yang tak terlupakan bersama Kynd Days
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reservasi">
                <Button size="lg" className="bg-accent hover:bg-accent-light text-primary-dark px-8 py-6 text-base btn-elegant">
                  Reservasi Sekarang
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/kontak">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base"
                >
                  Kunjungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
