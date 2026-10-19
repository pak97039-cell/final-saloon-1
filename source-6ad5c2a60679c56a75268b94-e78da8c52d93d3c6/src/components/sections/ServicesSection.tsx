import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceCategory } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { LuxeImage } from '../ui/LuxeImage';

interface PillarItem {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

const pillars: PillarItem[] = [
  {
    id: 'hair',
    title: 'Hair Couture',
    subtitle: 'French Balayage, Precision Cuts & Keratin',
    description: 'Custom formulation tailored for dark South Asian hair, delivering sunlit gloss without brassiness.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    tag: 'Balayage & Repair',
  },
  {
    id: 'bridal',
    title: 'Bridal Atelier',
    subtitle: 'Royal Barat, Valima & Trousseau Dressing',
    description: 'Dedicated private bridal suites ensuring unhurried artistry, custom veil draping, and heirloom looks.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    tag: 'Private Suites',
  },
  {
    id: 'makeup',
    title: 'Red Carpet & Occasion',
    subtitle: 'Nikkah Soft Glam & Velvet complexions',
    description: 'Sculpted skin-focus artistry engineered to look breathtaking in photography and daylight alike.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    tag: 'Camera-Ready',
  },
  {
    id: 'skincare',
    title: 'Skin & Aesthetics',
    subtitle: 'Hydrafacial, Dermaplaning & Gold Peels',
    description: 'Clinical dermal therapies administered in sterile suites by certified aesthetic practitioners.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    tag: 'Clinical Glow',
  },
  {
    id: 'nails-spa',
    title: 'Nails & Spa Sanctuary',
    subtitle: 'Russian Dry Manicure & Moroccan Bath',
    description: 'Autoclave-sterilized precision cuticle clean-up, chip-free gel overlays, and sensory herbal steam.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    tag: 'Medical Hygiene',
  },
  {
    id: 'home-salon',
    title: 'At-Home Concierge',
    subtitle: 'Private Suite Experience at Your Residence',
    description: 'Senior stylists arrive at your Islamabad home with portable illuminated vanities and sterile kits.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    tag: 'Mobile Suite',
  },
];

interface ServicesSectionProps {
  onSelectCategory?: (category: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectCategory }) => {
  const handlePillarClick = (category: ServiceCategory): void => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }

    // Also dispatch global event in case treatment directory is isolated
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('luxeora:select-category', { detail: category })
      );
    }

    // Smooth scroll to directory
    const target = document.getElementById('treatments');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FFFDF9] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
          <SectionHeading
            eyebrow="Six Disciplines of Beauty"
            title="Curated"
            accent="Service Pillars"
            subtitle="Each discipline is housed in dedicated private suites led by specialized female master artisans. Select a pillar to filter treatments."
          />

          <div className="text-xs text-[#8A6A2F] uppercase tracking-widest font-semibold hidden md:block">
            Explore All Disciplines ↓
          </div>
        </div>

        {/* 6 Pillar Cards Grid with Step 14 Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => handlePillarClick(pillar.id)}
              className="card-luxe pillar-card group relative overflow-hidden flex flex-col cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePillarClick(pillar.id);
                }
              }}
              aria-label={`View ${pillar.title} treatments`}
            >
              {/* Image Container with Zoom effect & Deepening Veil */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF8F5]">
                <LuxeImage
                  src={pillar.image}
                  alt={pillar.title}
                  width={800}
                  height={500}
                  aspectRatioClass="aspect-16/10"
                  className="card-zoom-img"
                />
                <div className="pillar-veil" />

                {/* Badge Tag */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#121212]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] uppercase tracking-widest text-[#FAF8F5] rounded-xs font-semibold z-10">
                  {pillar.tag}
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xs bg-[#FFFDF9]/95 text-[#1A1A1A] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shadow-soft-1 z-10">
                  <ArrowUpRight className="w-4 h-4 text-[#8A6A2F]" />
                </div>

                {/* Overlay Title shifts up 6px on hover to reveal Explore label */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <span className="font-serif text-2xl text-white block pillar-title">
                    {pillar.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium block pillar-action">
                    Explore &rarr;
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#8A6A2F] uppercase tracking-wider">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-medium text-[#1A1A1A]">
                  <span className="text-[11px] uppercase tracking-wider text-[#1A1A1A]/60 group-hover:text-[#1A1A1A] transition-colors">
                    Browse Treatments
                  </span>
                  <span className="text-[#8A6A2F] font-semibold text-xs btn-arrow-slide">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
