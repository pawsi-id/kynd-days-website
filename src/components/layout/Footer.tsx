import Link from 'next/link';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import { navItems, branches, businessHours } from '@/data/services';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-2">kynd days</h3>
              <p className="text-xs tracking-[0.2em] uppercase text-white/70">
                Family Massage & Reflexology
              </p>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Rasakan pengalaman relaksasi terbaik bersama keluarga.
              Kami hadir untuk memberikan pelayanan pijat dan refleksi
              profesional dengan suasana yang nyaman.
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Menu</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservasi"
                  className="text-accent hover:text-accent-light transition-colors text-sm font-medium"
                >
                  Reservasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Lokasi Kami</h4>
            <ul className="space-y-4">
              {branches.map((branch) => (
                <li key={branch.id} className="flex gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-medium">{branch.name}</p>
                    <p className="text-white/70 text-xs">{branch.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium">Telepon</p>
                  <p className="text-white/70 text-xs">{branches[0].phone}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium">Jam Operasional</p>
                  <p className="text-white/70 text-xs">
                    {businessHours.days}: {businessHours.open} - {businessHours.close}
                  </p>
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${branches[0].whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-accent hover:bg-accent-light text-primary-dark rounded-full text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {currentYear} Kynd Days. All rights reserved.</p>
            <p className="text-xs">
              Designed with care for your wellness journey
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
