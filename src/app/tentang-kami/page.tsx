import Link from 'next/link';
import { Heart, Users, Award, Shield, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  { value: '3', label: 'Cabang' },
  { value: '20+', label: 'Terapis' },
  { value: '1000+', label: 'Pelanggan Puas' },
  { value: '12', label: 'Jam Operasi/Hari' },
];

const team = [
  { name: 'Tim Terapis Senior', role: 'Head Therapist', description: '10+ tahun pengalaman' },
  { name: 'Tim Terapis', role: 'Massage Therapist', description: 'Bersertifikasi & Terlatih' },
  { name: 'Tim Refleksi', role: 'Reflexology Specialist', description: 'Ahli Titik Refleksi' },
];

export default function TentangKamiPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-background-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
                Tentang Kami
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-6">
                Kynd Days
              </h1>
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                <strong className="text-primary">Kynd Days Family Massage & Reflexology</strong> hadir
                untuk memberikan pengalaman relaksasi terbaik bagi Anda dan keluarga.
                Kami percaya bahwa setiap orang berhak mendapatkan momen ketenangan
                di tengah kesibukan sehari-hari.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-8">
                Dengan nama &quot;Kynd Days&quot;, kami ingin setiap kunjungan Anda menjadi
                hari yang penuh kebaikan — baik untuk tubuh maupun pikiran.
                Tim terapis profesional kami siap membantu Anda melepas penat
                dan kembali segar.
              </p>

              <Link href="/reservasi">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Mulai Perjalanan Relaksasi
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  {/* Logo Recreation */}
                  <svg
                    viewBox="0 0 120 100"
                    className="w-32 h-24 mx-auto text-primary mb-4"
                    fill="currentColor"
                  >
                    <path d="M60 10c-16 0-29 12-29 27s13 27 29 27 29-12 29-27-13-27-29-27zm0 44c-11 0-20-8-20-18s9-18 20-18 20 8 20 18-9 18-20 18z" />
                    <ellipse cx="36" cy="36" rx="16" ry="20" />
                    <ellipse cx="84" cy="36" rx="16" ry="20" />
                  </svg>
                  <p className="font-heading text-2xl text-primary">kynd days</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mt-1">
                    Family Massage & Reflexology
                  </p>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">10:00 - 22:00</p>
                    <p className="text-xs text-foreground/60">Buka Setiap Hari</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="flex gap-6 p-6 rounded-2xl bg-background-light card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary font-semibold mb-2">
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
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
                Cerita Kami
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
                Mengapa &quot;Kynd Days&quot;?
              </h2>
              <div className="decorative-line mx-auto" />
            </div>

            <div className="prose prose-lg mx-auto text-foreground/70">
              <p className="text-center leading-relaxed mb-6">
                Nama <strong className="text-primary">&quot;Kynd Days&quot;</strong> berasal dari kata
                <em> &quot;Kind&quot;</em> yang berarti baik hati, dan <em>&quot;Days&quot;</em> yang berarti hari-hari.
                Kami ingin setiap hari yang Anda habiskan bersama kami menjadi hari yang
                penuh kebaikan — untuk tubuh, pikiran, dan jiwa.
              </p>

              <p className="text-center leading-relaxed mb-6">
                Dengan tagline <strong className="text-primary">&quot;Family Massage & Reflexology&quot;</strong>,
                kami menekankan bahwa layanan kami cocok untuk seluruh anggota keluarga.
                Dari anak-anak hingga orang tua, semua dapat menikmati perawatan
                yang aman dan nyaman di tempat kami.
              </p>

              <p className="text-center leading-relaxed">
                Kami berkomitmen untuk terus meningkatkan kualitas layanan dan
                memberikan pengalaman relaksasi terbaik bagi setiap pelanggan
                yang mempercayakan kesejahteraan mereka kepada kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.role}
                className="text-center p-8 rounded-2xl bg-background-light card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Avatar Placeholder */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-lg text-primary font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
                <p className="text-foreground/60 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Siap Merasakan Perbedaannya?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Kunjungi salah satu cabang kami dan rasakan pengalaman relaksasi
            yang tak terlupakan bersama Kynd Days
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservasi">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-primary-dark px-8">
                Reservasi Sekarang
              </Button>
            </Link>
            <Link href="/kontak">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
              >
                Kunjungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
