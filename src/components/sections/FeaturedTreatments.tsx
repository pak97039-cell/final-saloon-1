import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Clock, Check, X, ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../../types';
import { useSalon } from '../../context/SalonContext';
import { formatPKR } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';
import { LuxeImage } from '../ui/LuxeImage';

interface CategoryPill {
  id: 'all' | ServiceCategory;
  label: string;
}

const categoryPills: CategoryPill[] = [
  { id: 'all', label: 'All Treatments' },
  { id: 'hair', label: 'Hair Couture' },
  { id: 'bridal', label: 'Bridal Atelier' },
  { id: 'makeup', label: 'Occasion & Makeup' },
  { id: 'skincare', label: 'Skin & Aesthetics' },
  { id: 'nails-spa', label: 'Nails & Spa' },
  { id: 'home-salon', label: 'At-Home Salon' },
];

export const FeaturedTreatments: React.FC = () => {
  const { services, openBooking } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sliding pill indicator ref & state
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Listen to category selection from pillar clicks
  useEffect(() => {
    const handleCategoryEvent = (e: Event): void => {
      const customEvent = e as CustomEvent<ServiceCategory>;
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail);
      }
    };

    window.addEventListener('luxeora:select-category', handleCategoryEvent);
    return () => window.removeEventListener('luxeora:select-category', handleCategoryEvent);
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLButtonElement>(
      `button[data-category="${selectedCategory}"]`
    );

    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [selectedCategory]);

  // Filtered treatment list
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesCategory =
        selectedCategory === 'all' || srv.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        srv.name.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q) ||
        srv.category.toLowerCase().includes(q) ||
        (srv.included && srv.included.some((item) => item.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const handleClearFilters = (): void => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header and Live Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <SectionHeading
            eyebrow="Sanctuary Directory"
            title="Bespoke"
            accent="Treatments & Rituals"
            subtitle="Transparent pricing in PKR, standardized ritual durations, and comprehensive inclusions for every appointment."
          />

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C6F66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, rituals..."
                className="input-luxe w-full pl-10 pr-9 py-2.5 text-xs placeholder:text-[#8C6F66]/60"
                aria-label="Search salon services"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C6F66] hover:text-[#1A1A1A] p-1 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 7 Category Filter Controls with Smooth Sliding Indicator */}
        <div
          ref={tabsContainerRef}
          className="relative flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8E2D8] pt-2"
        >
          {/* Sliding Gold Indicator (transforms smoothly, no layout jump) */}
          {indicatorStyle.width > 0 && (
            <div
              className="absolute h-[38px] top-2 rounded-xs bg-[#1A1A1A] transition-all duration-300 ease-luxe shadow-soft-1 pointer-events-none z-0"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
              aria-hidden="true"
            />
          )}

          {categoryPills.map((pill) => {
            const isActive = selectedCategory === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                data-category={pill.id}
                onClick={() => setSelectedCategory(pill.id)}
                className={`relative z-10 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors duration-200 shrink-0 cursor-pointer min-h-[42px] border ${
                  isActive
                    ? 'text-[#FAF8F5] border-transparent'
                    : 'bg-[#FFFDF9] text-[#1A1A1A]/70 border-[#E8E2D8] hover:border-[#8A6A2F] hover:text-[#1A1A1A]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Result Counter (Accessible aria-live region) */}
        <div
          aria-live="polite"
          className="text-xs text-[#8C6F66] flex items-center justify-between"
        >
          <span>
            Showing <strong className="text-[#1A1A1A]">{filteredServices.length}</strong>{' '}
            {filteredServices.length === 1 ? 'treatment' : 'treatments'}
            {selectedCategory !== 'all' && (
              <span>
                {' '}
                in <strong className="text-[#8A6A2F]">{categoryPills.find((p) => p.id === selectedCategory)?.label}</strong>
              </span>
            )}
            {searchQuery && (
              <span>
                {' '}
                matching &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </span>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[#8A6A2F] hover:underline uppercase text-[11px] font-semibold tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Treatment Cards Grid with Stagger & Key for Re-triggering Entrance */}
        {filteredServices.length > 0 ? (
          <div
            key={`${selectedCategory}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-grid-fade-up"
          >
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
                className="card-luxe card-interactive overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo with duration & popular badge + LuxeImage */}
                  <div className="relative aspect-16/9 w-full overflow-hidden bg-[#FAF8F5]">
                    <LuxeImage
                      src={service.image}
                      alt={service.name}
                      width={600}
                      height={340}
                      aspectRatioClass="aspect-16/9"
                      className="card-zoom-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-transparent to-transparent pointer-events-none" />

                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#D4AF37] text-[#121212] text-[10px] uppercase font-bold tracking-widest rounded-xs shadow-soft-1 z-10">
                        Most Requested
                      </div>
                    )}

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#121212]/85 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-[11px] font-medium rounded-xs flex items-center gap-1.5 shadow-soft-1 z-10">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{service.durationMinutes} mins</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A2F] font-semibold block mb-1">
                        {service.category.replace('-', ' ')}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed mt-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Inclusions List */}
                    {service.included && service.included.length > 0 && (
                      <div className="pt-3 border-t border-[#E8E2D8] space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C6F66] font-semibold block">
                          Ritual Inclusions
                        </span>
                        <ul className="space-y-1 text-[11px] text-[#1A1A1A]/80 font-sans">
                          {service.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#8A6A2F] shrink-0 mt-0.5" />
                              <span className="leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Price & CTA with btn-arrow-slide */}
                <div className="p-6 pt-4 border-t border-[#E8E2D8] bg-[#F4EFEB]/40 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C6F66] block">
                      Investment
                    </span>
                    <span className="tabular-price font-serif text-lg sm:text-xl font-medium text-[#1A1A1A]">
                      {formatPKR(service.pricePKR)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBooking({ serviceId: service.id })}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#121212] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded-xs border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all min-h-[42px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37] group"
                  >
                    <span>Book This</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] btn-arrow-slide" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center card-luxe p-8 space-y-4">
            <div className="w-12 h-12 rounded-xs bg-[#FAF8F5] border border-[#E8E2D8] text-[#8A6A2F] flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-[#1A1A1A]">No treatments found</h3>
              <p className="text-xs text-[#8C6F66] max-w-md mx-auto">
                No matching rituals were found for your search query. Try clearing your filters or exploring our other disciplines.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn-outline text-xs min-h-[40px] px-6"
            >
              <span>Clear filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
