import React, { useState, useMemo } from 'react';
import { Maximize2 } from 'lucide-react';
import { GalleryCategory } from '../../types';
import { useSalon } from '../../context/SalonContext';
import { SectionHeading } from '../ui/SectionHeading';
import { LuxeImage } from '../ui/LuxeImage';

interface FilterOption {
  id: 'all' | GalleryCategory;
  label: string;
}

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Works' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'hair', label: 'Hair' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'skincare', label: 'Skin' },
  { id: 'nails', label: 'Nails' },
  { id: 'interior', label: 'Interior' },
];

export const GallerySection: React.FC = () => {
  const { gallery, openLightbox } = useSalon();
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryCategory>('all');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [gallery, activeCategory]);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
          <SectionHeading
            eyebrow="Visual Archive"
            title="The Atelier"
            accent="Gallery"
            subtitle="A curated photographic record of bespoke bridal transformations, melted French balayage, and serene suite interiors."
          />

          {/* Clean Segmented Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterOptions.map((opt) => {
              const isActive = activeCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveCategory(opt.id)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-all shrink-0 cursor-pointer min-h-[38px] border ${
                    isActive
                      ? 'bg-[#1A1A1A] text-[#FAF8F5] border-[#1A1A1A] shadow-soft-1'
                      : 'bg-[#FFFDF9] text-[#1A1A1A]/70 border-[#E8E2D8] hover:border-[#8A6A2F] hover:text-[#1A1A1A]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid with Soft Scale-In, Sliding Caption on Hover & LuxeImage */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-grid-fade-up"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(item);
                }
              }}
              aria-label={`View enlarged photo: ${item.title}`}
              className="gallery-card group relative aspect-4/5 w-full card-luxe overflow-hidden cursor-pointer"
            >
              <LuxeImage
                src={item.image}
                alt={item.title}
                width={600}
                height={750}
                aspectRatioClass="aspect-4/5"
                className="card-zoom-img"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Category Tag */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-xs bg-[#121212]/80 backdrop-blur-md border border-white/20 text-[9px] uppercase tracking-widest text-[#FAF8F5] font-semibold z-10">
                {item.category}
              </div>

              {/* Zoom Action Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-xs bg-[#FFFDF9]/95 text-[#1A1A1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft-1 z-10">
                <Maximize2 className="w-3.5 h-3.5 text-[#8A6A2F]" />
              </div>

              {/* Card Footer Info sliding up on hover */}
              <div className="gallery-caption absolute bottom-0 left-0 right-0 p-4 space-y-1 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-transparent z-10">
                <h3 className="font-serif text-lg text-white leading-tight">
                  {item.title}
                </h3>
                {item.artistName && (
                  <p className="text-[11px] text-[#D4AF37] font-medium font-sans">
                    Artisan: {item.artistName}
                  </p>
                )}
                <p className="text-[11px] text-[#FAF8F5]/70 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
