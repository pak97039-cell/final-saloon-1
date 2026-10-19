import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Tag } from 'lucide-react';
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

  // Keyboard navigation: Escape to close, Left/Right arrow keys to navigate
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, handleNext, handlePrev]);

  // Lock background page scroll while lightbox is open
  useEffect(() => {
    if (!lightbox.isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lightbox.isOpen]);

  // Mobile Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent): void => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Detect intentional horizontal swipe (min 40px delta, more horizontal than vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNext(); // Swiped left -> next photo
      } else {
        handlePrev(); // Swiped right -> prev photo
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!lightbox.isOpen || !currentItem || typeof document === 'undefined') {
    return null;
  }

  const hasTitle = Boolean(currentItem.title && currentItem.title.trim().length > 0);
  const hasDescription = Boolean(
    currentItem.description && currentItem.description.trim().length > 0
  );
  const hasCaption = hasTitle || hasDescription;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        paddingTop: 'max(8px, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(8px, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(8px, env(safe-area-inset-right, 0px))',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title || 'Image Lightbox Preview'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#121212]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={closeLightbox}
        aria-hidden="true"
      />

      {/* Lightbox Box: shrink-to-fit picture with no white/empty space */}
      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-[#121212] transition-all duration-300"
        style={{
          width: 'fit-content',
          maxWidth: 'min(calc(100vw - 16px), 1100px)',
          maxHeight: '90dvh',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Relative Image Container with Inset Overlays */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            maxWidth: '100%',
            maxHeight: hasCaption ? 'calc(90dvh - 54px)' : '90dvh',
          }}
        >
          {/* Top-Left: Category Tag */}
          {currentItem.category && (
            <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold pointer-events-none select-none">
              <Tag className="w-3 h-3 text-[#D4AF37]" />
              <span>{currentItem.category}</span>
            </div>
          )}

          {/* Top-Right: 44x44px Round Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Left: Previous Navigation Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right: Next Navigation Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Bottom-Left: Image Counter */}
          <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-xs border border-white/15 text-[11px] text-[#FAF8F5]/90 font-mono pointer-events-none select-none">
            {currentIndex + 1} / {gallery.length}
          </div>

          {/* Main Artwork Image */}
          <img
            key={currentItem.id}
            src={currentItem.image}
            alt={currentItem.title || 'Gallery item'}
            className="block select-none"
            style={{
              maxWidth: '100%',
              maxHeight: hasCaption ? 'calc(90dvh - 54px)' : '90dvh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Bottom: Slim Caption Strip (Rendered only when title or description exists) */}
        {hasCaption && (
          <div className="w-full bg-[#121212]/95 border-t border-white/10 px-4 py-2.5 text-left shrink-0">
            {hasTitle && (
              <h3 className="font-serif text-sm sm:text-base text-[#FAF8F5] leading-snug font-medium">
                {currentItem.title}
              </h3>
            )}
            {hasDescription && (
              <p className="text-[11px] sm:text-xs text-[#FAF8F5]/70 font-sans leading-relaxed mt-0.5 line-clamp-2">
                {currentItem.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
