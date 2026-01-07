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
    description: 'Bukan sekadar pijat — setiap sesi adalah waktu khusus untuk memulihkan tubuh dan pikiran Anda.',
  },
  {
    icon: Users,
    title: 'Ramah untuk Keluarga',
    description: 'Dari anak-anak hingga orang tua, semua bisa rileks bersama di tempat yang nyaman dan aman.',
  },
  {
    icon: Award,
    title: 'Terapis Tersertifikasi',
    description: 'Tim kami menguasai teknik pijat tradisional Jepang dan refleksi modern yang terbukti efektif.',
  },
  {
    icon: Shield,
    title: 'Bersih & Higienis',
    description: 'Handuk bersih, ruangan steril, dan peralatan yang selalu disanitasi sebelum setiap sesi.',
  },
];

const stats = [
  { value: '3', label: 'Cabang', icon: MapPin },
  { value: '20+', label: 'Terapis Profesional', icon: Users },
  { value: '5000+', label: 'Pelanggan Puas', icon: Star },
  { value: '12', label: 'Jam Operasi/Hari', icon: Clock },
];

const team = [
  { name: 'Terapis Berpengalaman', role: 'Senior Therapist', description: 'Menguasai teknik shiatsu, Thai massage, dan pijat tradisional Indonesia' },
  { name: 'Terapis Profesional', role: 'Massage Therapist', description: 'Tersertifikasi dengan pelatihan rutin untuk teknik terbaru' },
  { name: 'Spesialis Refleksi', role: 'Reflexologist', description: 'Ahli titik refleksi kaki dan tangan untuk keseimbangan tubuh' },
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
                <span className="block gradient-text">Relaksasi untuk Keluarga</span>
              </h1>
              <p className="text-foreground/70 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                Lelah setelah bekerja? Butuh waktu berkualitas bersama keluarga?
                <strong className="text-primary"> Kynd Days</strong> adalah tempat di mana
                Anda bisa melepas penat dan memulihkan energi — dengan sentuhan terapis profesional
                dalam suasana yang tenang dan nyaman.
              </p>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                Kami percaya setiap orang berhak mendapat hari yang baik.
                Itulah mengapa kami hadir — untuk membuat hari Anda lebih <em>kynd</em>.
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

                <div className="text-center p-6 md:p-8 relative z-10">
                  {/* Logo Recreation */}
                  <svg
                    viewBox="0 0 120 100"
                    className="w-28 h-24 md:w-40 md:h-32 mx-auto text-primary mb-4 md:mb-6"
                    fill="currentColor"
                  >
                    <path d="M60 10c-16 0-29 12-29 27s13 27 29 27 29-12 29-27-13-27-29-27zm0 44c-11 0-20-8-20-18s9-18 20-18 20 8 20 18-9 18-20 18z" />
                    <ellipse cx="36" cy="36" rx="16" ry="20" />
                    <ellipse cx="84" cy="36" rx="16" ry="20" />
                  </svg>
                  <p className="font-heading text-2xl md:text-3xl text-primary mb-2">kynd days</p>
                  <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-primary/60">
                    Family Massage & Reflexology
                  </p>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 left-2 md:-bottom-6 md:-left-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-5 border border-border/50">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 md:w-7 md:h-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm md:text-xl">10:00 - 22:00</p>
                    <p className="text-xs md:text-sm text-foreground/60">Buka Setiap Hari</p>
                  </div>
                </div>
              </div>

              {/* Floating Rating Card */}
              <div className="absolute -top-2 right-2 md:-top-4 md:-right-4 bg-white rounded-xl md:rounded-2xl shadow-xl p-2.5 md:p-4 border border-border/50">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 md:w-4 md:h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-primary">5.0</span>
                </div>
                <p className="text-[10px] md:text-xs text-foreground/50 mt-0.5 md:mt-1">1000+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary via-primary-dark to-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl" />
        </div>

        <div ref={statsRef} className="container-custom relative px-4 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'text-center animate-fade-up',
                  statsInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <p className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative px-4 md:px-0">
          <div
            ref={valuesHeaderRef}
            className={cn(
              'text-center mb-10 md:mb-16 animate-fade-up',
              valuesHeaderInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-2 text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 rounded-full">
              Nilai Kami
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-3 md:mb-4">
              Filosofi Kynd Days
            </h2>
            <p className="text-foreground/60 text-sm md:text-base max-w-2xl mx-auto">
              Setiap aspek layanan kami didasarkan pada nilai-nilai yang kami percaya
            </p>
            <div className="decorative-line mx-auto mt-4 md:mt-6" />
          </div>

          <div ref={valuesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={cn(
                  'group flex gap-4 md:gap-6 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-background-light to-background border border-border/50 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 animate-fade-up',
                  valuesGridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
                  <value.icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading text-base md:text-xl text-primary font-semibold mb-1.5 md:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60 text-sm md:text-base leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gradient-to-b from-background-light to-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative px-4 md:px-0">
          <div
            ref={storyRef}
            className={cn(
              'max-w-4xl mx-auto animate-fade-up',
              storyInView && 'in-view'
            )}
          >
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-flex items-center gap-2 text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 rounded-full">
                Cerita Kami
              </span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-3 md:mb-4">
                Mengapa &quot;Kynd Days&quot;?
              </h2>
              <div className="decorative-line mx-auto" />
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 shadow-sm border border-border/50">
              <div className="space-y-5 md:space-y-6 text-foreground/70">
                <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed">
                  <strong className="text-primary">&quot;Kynd&quot;</strong> berasal dari kata <em className="text-accent">&quot;Kind&quot;</em> —
                  kebaikan. Kami ingin setiap kunjungan Anda menjadi pengalaman yang menyenangkan,
                  bukan sekadar treatment biasa. Dari sambutan hangat hingga sentuhan terapis,
                  semuanya dirancang untuk membuat Anda merasa dihargai.
                </p>

                <div className="flex justify-center">
                  <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>

                <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed">
                  Kami memadukan teknik pijat tradisional Jepang dengan sentuhan modern.
                  Hasilnya? Relaksasi mendalam yang tidak hanya meredakan pegal,
                  tapi juga menyegarkan pikiran. Cocok untuk Anda yang butuh
                  <em className="text-accent"> me-time </em> atau quality time bersama keluarga.
                </p>

                <div className="flex justify-center">
                  <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full" />
                </div>

                <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed">
                  Dengan 3 cabang di Jakarta dan tim 20+ terapis berpengalaman,
                  kami siap melayani Anda setiap hari dari pagi hingga malam.
                  Karena kami percaya — hari yang baik dimulai dari tubuh yang sehat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative px-4 md:px-0">
          <div
            ref={teamHeaderRef}
            className={cn(
              'text-center mb-10 md:mb-16 animate-fade-up',
              teamHeaderInView && 'in-view'
            )}
          >
            <span className="inline-flex items-center gap-2 text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 rounded-full">
              Tim Kami
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-3 md:mb-4">
              Terapis Profesional
            </h2>
            <p className="text-foreground/60 text-sm md:text-base max-w-2xl mx-auto">
              Tim terapis kami yang berpengalaman dan bersertifikasi siap melayani Anda
            </p>
            <div className="decorative-line mx-auto mt-4 md:mt-6" />
          </div>

          <div ref={teamGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {team.map((member, index) => (
              <div
                key={member.role}
                className={cn(
                  'group text-center p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-b from-background-light to-background border border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 animate-fade-up',
                  teamGridInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <Users className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                </div>
                <h3 className="font-heading text-base md:text-xl text-primary font-semibold mb-1.5 md:mb-2">
                  {member.name}
                </h3>
                <p className="inline-block text-accent text-xs md:text-sm font-medium mb-3 md:mb-4 px-2.5 md:px-3 py-1 bg-accent/10 rounded-full">
                  {member.role}
                </p>
                <p className="text-foreground/60 text-xs md:text-sm leading-relaxed">{member.description}</p>
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

        <div className="container-custom relative px-4 md:px-0">
          <div
            ref={ctaRef}
            className={cn(
              'text-center max-w-2xl mx-auto animate-fade-up',
              ctaInView && 'in-view'
            )}
          >
            <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-5 md:mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-accent" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 md:mb-6 leading-tight">
              Waktunya Memanjakan Diri
            </h2>
            <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed">
              Tubuh Anda sudah bekerja keras. Sekarang giliran kami yang merawatnya.
              Reservasi sekarang dan rasakan perbedaannya.
            </p>
            <Link href="/reservasi">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-primary-dark px-6 md:px-8 py-5 md:py-6 text-sm md:text-base btn-elegant min-h-[48px]">
                Reservasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
