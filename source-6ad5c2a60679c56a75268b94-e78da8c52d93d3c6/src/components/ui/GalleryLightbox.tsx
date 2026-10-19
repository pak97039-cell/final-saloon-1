import React, { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, User, Tag } from 'lucide-react';
import { Modal } from './Modal';
import { useSalon } from '../../context/SalonContext';

export const GalleryLightbox: React.FC = () => {
  const { lightbox, closeLightbox, openLightbox, gallery } = useSalon();
  const currentItem = lightbox.item;

  const currentIndex = currentItem
    ? gallery.findIndex((item) => item.id === currentItem.id)
    : -1;

  const handleNext = useCallback((): void => {
    if (gallery.length === 0 || currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % gallery.length;
    openLightbox(gallery[nextIndex]);
  }, [gallery, currentIndex, openLightbox]);

  const handlePrev = useCallback((): void => {
    if (gallery.length === 0 || currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    openLightbox(gallery[prevIndex]);
  }, [gallery, currentIndex, openLightbox]);

  // Arrow key keyboard navigation
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, handleNext, handlePrev]);

  if (!currentItem) return null;

  return (
    <Modal
      isOpen={lightbox.isOpen}
      onClose={closeLightbox}
      maxWidth="4xl"
      showCloseButton={true}
      ariaLabel={currentItem.title}
      className="overflow-hidden bg-[#121212] text-[#FAF8F5] border-[#D4AF37]/30 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row gap-6 -m-5 sm:-m-6">
        {/* Large Image Container with cross-fade image transition */}
        <div className="relative aspect-4/3 lg:aspect-4/3 w-full lg:w-2/3 bg-black flex items-center justify-center overflow-hidden">
          <img
            key={currentItem.id}
            src={currentItem.image}
            alt={currentItem.title}
            width={1200}
            height={900}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover object-center animate-grid-fade-up"
          />

          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#121212]/80 hover:bg-[#121212] text-white border border-[#D4AF37]/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-[#D4AF37] cursor-pointer"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-5 h-5 text-[#FAF8F5]" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#121212]/80 hover:bg-[#121212] text-white border border-[#D4AF37]/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-[#D4AF37] cursor-pointer"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-5 h-5 text-[#FAF8F5]" />
          </button>

          {/* Index Counter */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#121212]/80 backdrop-blur-md rounded-xs border border-white/10 text-[11px] text-[#FAF8F5]/80 font-mono">
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>

        {/* Sidebar Info Panel */}
        <div className="p-6 sm:p-8 lg:w-1/3 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#1A1A1A] border border-[#D4AF37]/30 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              <Tag className="w-3 h-3" />
              <span>{currentItem.category}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] leading-snug">
              {currentItem.title}
            </h3>

            {currentItem.artistName && (
              <div className="flex items-center gap-2 text-xs text-[#FAF8F5]/80 pt-1">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  Artisan Lead: <strong className="text-[#FAF8F5]">{currentItem.artistName}</strong>
                </span>
              </div>
            )}

            <p className="text-xs text-[#FAF8F5]/70 font-sans leading-relaxed pt-2 border-t border-[#FAF8F5]/10">
              {currentItem.description}
            </p>
          </div>

          <div className="pt-4 border-t border-[#FAF8F5]/10 flex items-center justify-between text-xs text-[#FAF8F5]/50">
            <span>Use &larr; &rarr; arrow keys</span>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
