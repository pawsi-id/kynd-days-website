'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Camera, Filter, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbox } from '@/components/gallery/Lightbox';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Semua', count: 12 },
  { id: 'interior', label: 'Interior', count: 4 },
  { id: 'services', label: 'Layanan', count: 4 },
  { id: 'ambiance', label: 'Suasana', count: 4 },
];

const galleryImages = [
  { id: '1', title: 'Ruang Tunggu', category: 'interior', featured: true },
  { id: '2', title: 'Massage Room', category: 'interior', featured: false },
  { id: '3', title: 'VIP Couple Room', category: 'interior', featured: true },
  { id: '4', title: 'Aromatherapy Session', category: 'services', featured: false },
  { id: '5', title: 'Reflexology Treatment', category: 'services', featured: true },
  { id: '6', title: 'Hot Stone Massage', category: 'services', featured: false },
  { id: '7', title: 'Relaxing Ambiance', category: 'ambiance', featured: true },
  { id: '8', title: 'Candle Setting', category: 'ambiance', featured: false },
  { id: '9', title: 'Reception Area', category: 'interior', featured: false },
  { id: '10', title: 'Thai Massage', category: 'services', featured: false },
  { id: '11', title: 'Peaceful Corner', category: 'ambiance', featured: false },
  { id: '12', title: 'Treatment Room', category: 'ambiance', featured: false },
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryGridRef = useRef<HTMLElement>(null);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Auto scroll to gallery grid
    setTimeout(() => {
      if (galleryGridRef.current) {
        const headerOffset = 140;
        const elementPosition = galleryGridRef.current.getBoundingClientRect().top;
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
  const { ref: galleryRef, isInView: galleryInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="pt-20 pb-32 md:pt-24 md:pb-16">
      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div
            ref={heroRef}
            className={cn(
              'text-center max-w-3xl mx-auto animate-fade-up',
              heroInView && 'in-view'
            )}
          >
            <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4 block">
              Galeri
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-4 md:mb-6">
              Lihat Suasana Kami
            </h1>
            <p className="text-foreground/60 text-sm md:text-lg mb-6 md:mb-8 px-4 md:px-0">
              Jelajahi suasana nyaman dan pelayanan profesional di Kynd Days.
              Setiap sudut dirancang untuk memberikan pengalaman relaksasi terbaik.
            </p>
            <div className="decorative-line mx-auto" />
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-lg border-b border-border/50 py-3 md:py-4 shadow-sm -mt-px">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-2 text-foreground/50 text-sm">
              <Filter className="w-4 h-4" />
              <span>Filter:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    'px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 min-h-[40px]',
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-background-light text-foreground/70 hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  {cat.label}
                  <span
                    className={cn(
                      'text-[10px] md:text-xs px-1 md:px-1.5 py-0.5 rounded-full',
                      activeCategory === cat.id
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 text-primary/70'
                    )}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryGridRef} className="py-8 md:py-16 bg-white">
        <div className="container-custom">
          <div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5"
          >
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className={cn(
                  'group relative rounded-xl md:rounded-2xl bg-background-light animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 aspect-square',
                  galleryInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-xl md:rounded-2xl overflow-hidden">
                  <div className="text-center transition-transform duration-500 group-hover:scale-110">
                    <Camera className="mx-auto mb-1 md:mb-2 text-primary/30 w-6 h-6 md:w-10 md:h-10" />
                    <p className="text-primary/50 font-medium px-2 md:px-4 text-[10px] md:text-sm line-clamp-2">
                      {image.title}
                    </p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-2 md:p-4 rounded-xl md:rounded-2xl">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-heading font-semibold text-white text-xs md:text-lg mb-0.5 md:mb-1 line-clamp-1">
                      {image.title}
                    </p>
                    <p className="text-[10px] md:text-sm text-white/70 capitalize flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      Kynd Days
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm text-primary text-[10px] md:text-xs capitalize shadow-sm px-1.5 md:px-2"
                  >
                    {image.category}
                  </Badge>
                </div>

                {/* Featured Badge */}
                {image.featured && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                    <Badge className="bg-accent text-white text-[10px] md:text-xs border-0 shadow-sm px-1.5 md:px-2">
                      <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                      <span className="hidden sm:inline">Featured</span>
                      <span className="sm:hidden">Star</span>
                    </Badge>
                  </div>
                )}

                {/* Zoom Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-background-light flex items-center justify-center">
                <Camera className="w-10 h-10 text-foreground/30" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">Tidak ada gambar</h3>
              <p className="text-foreground/60">Tidak ada gambar untuk kategori ini</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { value: '3', label: 'Lokasi' },
              { value: '7', label: 'Layanan' },
              { value: '30+', label: 'Ruangan' },
              { value: '100%', label: 'Kepuasan' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'text-center animate-fade-up',
                  galleryInView && 'in-view'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="font-heading text-xl sm:text-2xl md:text-4xl font-bold text-primary mb-0.5 md:mb-1">
                  {stat.value}
                </p>
                <p className="text-foreground/60 text-[10px] sm:text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Desktop */}
      <section className="hidden md:block section-padding bg-white">
        <div
          ref={ctaRef}
          className={cn(
            'container-custom animate-fade-up',
            ctaInView && 'in-view'
          )}
        >
          <div className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
                Ingin Merasakan Langsung?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Kunjungi salah satu cabang kami dan rasakan sendiri suasana nyaman yang kami tawarkan
              </p>
              <div
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up',
                  ctaInView && 'in-view'
                )}
                style={{ transitionDelay: '150ms' }}
              >
                <Link href="/reservasi">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 shadow-lg">
                    Reservasi Sekarang
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/kontak">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                    Lihat Lokasi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-8 bg-background-light md:bg-white">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-foreground/50 text-sm">
              *Foto-foto di atas merupakan placeholder. Gambar asli akan ditampilkan setelah pemotretan.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="container-custom py-4">
          <div className="flex items-center gap-3">
            <Link href="/kontak" className="shrink-0">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white">
                Lokasi
              </Button>
            </Link>
            <Link href="/reservasi" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white shadow-lg">
                Reservasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}
