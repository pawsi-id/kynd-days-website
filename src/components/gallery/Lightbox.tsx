'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 animate-fade-in">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 w-12 h-12"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Navigation */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 w-12 h-12"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 w-12 h-12"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Image Container */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative max-w-4xl w-full">
          {/* Image Placeholder */}
          <div className="aspect-video bg-primary/20 rounded-2xl flex items-center justify-center animate-scale-in">
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
              <p className="text-lg font-medium">{currentImage.title}</p>
              <p className="text-sm text-white/40">{currentImage.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
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
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
