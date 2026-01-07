import Link from 'next/link';
import { Phone, Clock, Instagram } from 'lucide-react';
import { navItems, branches, businessHours } from '@/data/services';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Main Footer */}
      <div className="relative container-custom py-10 md:py-12 lg:py-16 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Brand Column - Hidden on mobile */}
          <div className="hidden md:block space-y-4 md:space-y-5 md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold mb-2 tracking-tight">
                kynd days
              </h3>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="h-px w-6 md:w-8 bg-accent" />
                <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-accent font-medium">
                  Family Massage & Reflexology
                </p>
              </div>
            </div>
            <p className="text-white/80 text-xs md:text-sm lg:text-base leading-relaxed max-w-md">
              Rasakan pengalaman relaksasi terbaik bersama keluarga.
              Kami hadir untuk memberikan pelayanan pijat dan refleksi
              profesional dengan suasana yang nyaman.
            </p>

            {/* Social Media */}
            <div>
              <p className="text-[10px] md:text-xs font-medium text-white/70 mb-2 md:mb-3 uppercase tracking-wider">
                Follow Us
              </p>
              <a
                href="https://www.instagram.com/kynddays.massage/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-5.5 md:h-5.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links - Hidden on mobile */}
          <div className="hidden md:block">
            <h4 className="font-heading text-sm md:text-base lg:text-lg font-semibold mb-4 md:mb-5 lg:mb-6 relative inline-block">
              Menu
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30" />
            </h4>
            <ul className="space-y-2.5 md:space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-accent transition-colors text-xs md:text-sm lg:text-base inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-300 mr-0 group-hover:mr-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <Link
                  href="/reservasi"
                  className="text-accent hover:text-accent-light transition-colors text-xs md:text-sm lg:text-base font-medium inline-flex items-center group"
                >
                  <span className="w-2 h-px bg-accent mr-2" />
                  Reservasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="font-heading text-sm md:text-base lg:text-lg font-semibold mb-4 md:mb-5 lg:mb-6 relative inline-block">
              Hubungi Kami
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30" />
            </h4>
            <ul className="space-y-3 md:space-y-4 mb-5 md:mb-6">
              <li className="flex gap-2 md:gap-3 items-start">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider mb-1">
                    Telepon
                  </p>
                  <a
                    href={`tel:${branches[0].phone}`}
                    className="text-white text-xs md:text-sm lg:text-base font-medium hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {branches[0].phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-2 md:gap-3 items-start">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider mb-1">
                    Jam Operasional
                  </p>
                  <p className="text-white text-xs md:text-sm lg:text-base font-medium">
                    {businessHours.days}
                  </p>
                  <p className="text-white/80 text-[10px] md:text-xs lg:text-sm">
                    {businessHours.open} - {businessHours.close}
                  </p>
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${branches[0].whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 md:px-6 py-3 md:py-3.5 bg-accent hover:bg-accent-light text-primary-dark rounded-xl text-sm md:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 group min-h-[48px]"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container-custom py-5 md:py-6 px-4 md:px-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 text-sm">
            <p className="text-[10px] md:text-xs lg:text-sm text-white/60 text-center sm:text-left">
              © {currentYear} Kynd Days. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/50">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p>Designed with care for your wellness journey</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
