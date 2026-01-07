'use client';

import { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LightboxProps {
  images: { id: string; title: string; category: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onPrevious, onNext]
  );

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }
    setTouchStart(null);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent safe-area-inset-top">
        <div className="flex items-center justify-between p-3 md:p-4">
          <div className="text-white min-w-0 flex-1">
            <h3 className="font-heading font-semibold text-base md:text-lg truncate">{currentImage.title}</h3>
            <p className="text-xs md:text-sm text-white/60 capitalize">{currentImage.category}</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-white hover:bg-white/10 w-11 h-11 md:w-10 md:h-10"
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white hover:bg-white/10 w-11 h-11 md:w-10 md:h-10"
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10 w-11 h-11 md:w-10 md:h-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Image Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-16 pt-20 pb-32">
        <div
          className={cn(
            'relative w-full h-full max-w-5xl transition-transform duration-300',
            isZoomed && 'scale-150 cursor-zoom-out'
          )}
          onClick={() => isZoomed && setIsZoomed(false)}
        >
          {/* Image Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white/60">
              <svg
                className="w-24 h-24 mx-auto mb-4 text-white/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
              <p className="text-xl font-heading font-semibold">{currentImage.title}</p>
              <p className="text-sm text-white/40 capitalize mt-1">{currentImage.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent safe-area-inset-bottom">
        <div className="p-3 md:p-4">
          {/* Counter */}
          <div className="text-center text-white/70 text-xs md:text-sm mb-3 md:mb-4">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnails - Hide on very small screens */}
          <div className="hidden sm:flex justify-center items-center gap-2 md:gap-3 overflow-x-auto py-2 px-4 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  const diff = index - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else {
                    for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                  }
                }}
                className={cn(
                  'shrink-0 transition-all duration-200 rounded-lg min-w-[44px] min-h-[44px]',
                  index === currentIndex
                    ? 'w-14 h-14 md:w-16 md:h-16 border-2 border-white'
                    : 'w-12 h-12 md:w-14 md:h-14 border-2 border-transparent opacity-50 hover:opacity-80'
                )}
              >
                <div className="w-full h-full rounded-md bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-white/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Navigation - Show on small screens */}
          <div className="sm:hidden flex items-center justify-center gap-4">
            <button
              onClick={onPrevious}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <p className="text-white/60 text-xs">Geser untuk navigasi</p>
            <button
              onClick={onNext}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
