'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { branches, businessHours } from '@/data/services';
import { cn } from '@/lib/utils';

export default function KontakPage() {
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>();
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', phone: '', email: '', branch: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Hubungi Kami
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-6">
              Kami Siap Membantu
            </h1>
            <p className="text-foreground/60 text-lg">
              Punya pertanyaan atau ingin melakukan reservasi? Hubungi kami melalui
              salah satu cara di bawah ini atau kunjungi cabang terdekat.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Lokasi
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4">
              3 Cabang Siap Melayani
            </h2>
            <p className="text-foreground/60">
              Pilih cabang terdekat dan kunjungi kami
            </p>
            <div className="decorative-line mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className={cn(
                  'p-6 rounded-2xl border-2 transition-all duration-300 card-hover animate-fade-in-up',
                  selectedBranch === branch.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background-light hover:border-primary/30'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Branch Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-primary font-semibold">
                      {branch.name}
                    </h3>
                    <p className="text-sm text-foreground/60">{branch.address}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <a
                    href={`tel:${branch.phone}`}
                    className="flex items-center gap-3 text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent" />
                    {branch.phone}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Clock className="w-4 h-4 text-accent" />
                    {businessHours.open} - {businessHours.close}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
                      `Halo ${branch.name}! Saya ingin bertanya tentang layanan massage.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => setSelectedBranch(branch.id)}
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-0 bg-background-light">
        <div className="container-custom">
          <div className="relative h-[400px] rounded-3xl overflow-hidden bg-primary/10 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-primary/40" />
              <p className="text-primary font-medium mb-2">Peta Interaktif</p>
              <p className="text-foreground/60 text-sm max-w-md mx-auto">
                Google Maps akan ditampilkan di sini dengan lokasi ke-3 cabang Kynd Days
              </p>
            </div>

            {/* Decorative pins */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-soft">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-soft delay-200">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-soft delay-400">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
                Kirim Pesan
              </span>
              <h2 className="font-heading text-3xl text-primary font-semibold mb-6">
                Ada Pertanyaan?
              </h2>
              <p className="text-foreground/60 mb-8">
                Isi formulir di bawah ini dan kami akan menghubungi Anda secepatnya.
              </p>

              {formStatus === 'success' ? (
                <div className="p-8 rounded-2xl bg-green-50 text-center animate-scale-in">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="font-heading text-xl text-green-700 font-semibold mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-green-600">
                    Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nama Lengkap
                      </label>
                      <Input
                        type="text"
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background-light border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        No. Telepon
                      </label>
                      <Input
                        type="tel"
                        placeholder="08xx xxxx xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="bg-background-light border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email (opsional)
                    </label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background-light border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pilih Cabang
                    </label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) => setFormData({ ...formData, branch: value })}
                    >
                      <SelectTrigger className="bg-background-light border-border focus:border-primary">
                        <SelectValue placeholder="Pilih cabang" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pesan
                    </label>
                    <Textarea
                      placeholder="Tulis pesan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-background-light border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
                Informasi Kontak
              </span>
              <h2 className="font-heading text-3xl text-primary font-semibold mb-8">
                Cara Lain Menghubungi Kami
              </h2>

              <div className="space-y-6">
                {/* Operating Hours */}
                <div className="flex gap-4 p-6 rounded-2xl bg-background-light">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Jam Operasional</h4>
                    <p className="text-foreground/70">
                      {businessHours.days}: {businessHours.open} - {businessHours.close}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 p-6 rounded-2xl bg-background-light">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Telepon</h4>
                    <a
                      href={`tel:${branches[0].phone}`}
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      {branches[0].phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-6 rounded-2xl bg-background-light">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Email</h4>
                    <a
                      href="mailto:hello@kynddays.com"
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      hello@kynddays.com
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="p-6 rounded-2xl bg-background-light">
                  <h4 className="font-semibold text-primary mb-4">Ikuti Kami</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://wa.me/${branches[0].whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white font-semibold mb-4">
            Siap untuk Reservasi?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Booking sekarang dan nikmati pengalaman relaksasi terbaik di Kynd Days
          </p>
          <Link href="/reservasi">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-primary-dark px-8">
              Reservasi Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
