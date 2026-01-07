'use client';

import { useState } from 'react';
import { Camera, Filter } from 'lucide-react';
import { Lightbox } from '@/components/gallery/Lightbox';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'interior', label: 'Interior' },
  { id: 'services', label: 'Layanan' },
  { id: 'ambiance', label: 'Suasana' },
];

const galleryImages = [
  { id: '1', title: 'Ruang Tunggu', category: 'interior' },
  { id: '2', title: 'Massage Room', category: 'interior' },
  { id: '3', title: 'VIP Couple Room', category: 'interior' },
  { id: '4', title: 'Aromatherapy Session', category: 'services' },
  { id: '5', title: 'Reflexology Treatment', category: 'services' },
  { id: '6', title: 'Hot Stone Massage', category: 'services' },
  { id: '7', title: 'Relaxing Ambiance', category: 'ambiance' },
  { id: '8', title: 'Candle Setting', category: 'ambiance' },
  { id: '9', title: 'Reception Area', category: 'interior' },
  { id: '10', title: 'Thai Massage', category: 'services' },
  { id: '11', title: 'Peaceful Corner', category: 'ambiance' },
  { id: '12', title: 'Treatment Room', category: 'interior' },
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Galeri
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-6">
              Lihat Suasana Kami
            </h1>
            <p className="text-foreground/60 text-lg">
              Jelajahi suasana nyaman dan pelayanan profesional di Kynd Days.
              Setiap sudut dirancang untuk memberikan pengalaman relaksasi terbaik.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-lg border-b border-border py-4">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2">
            <Filter className="w-4 h-4 text-foreground/50" />
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    activeCategory === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-background-light text-foreground/70 hover:bg-primary/10'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-background-light animate-fade-in-up card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-center transition-transform group-hover:scale-105">
                    <Camera className="w-10 h-10 mx-auto mb-2 text-primary/40" />
                    <p className="text-sm text-primary/60 font-medium">{image.title}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{image.title}</p>
                    <p className="text-sm text-white/70 capitalize">{image.category}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full bg-white/90 text-xs font-medium text-primary capitalize">
                    {image.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
              <p className="text-foreground/60">Tidak ada gambar untuk kategori ini</p>
            </div>
          )}
        </div>
      </section>

      {/* Note Section */}
      <section className="py-12 bg-background-light">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-foreground/60 text-sm">
              *Foto-foto di atas merupakan placeholder. Gambar asli akan ditampilkan setelah pemotretan.
            </p>
          </div>
        </div>
      </section>

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
