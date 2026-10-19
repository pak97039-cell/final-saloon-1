import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

interface Partner {
  name: string;
  tagline: string;
  fontStyle: string;
}

const partners: Partner[] = [
  {
    name: 'KÉRASTASE PARIS',
    tagline: 'Hair Diagnostics & Fusio-Dose',
    fontStyle: 'font-serif tracking-[0.25em] font-medium text-lg sm:text-xl',
  },
  {
    name: 'OLAPLEX',
    tagline: 'Patented Dermal Bond Building',
    fontStyle: 'font-sans tracking-[0.3em] font-bold text-base sm:text-lg',
  },
  {
    name: 'DYSON',
    tagline: 'Supersonic Pro Thermal Engineering',
    fontStyle: 'font-sans tracking-[0.2em] font-semibold text-lg sm:text-xl',
  },
  {
    name: 'dermalogica',
    tagline: 'Clinical Dermal Hydration & Peels',
    fontStyle: 'font-sans tracking-tight font-medium lowercase text-lg sm:text-xl',
  },
  {
    name: "L'ORÉAL PROFESSIONNEL",
    tagline: 'French Ammonia-Free Lighteners',
    fontStyle: 'font-serif tracking-[0.2em] font-medium text-base sm:text-lg',
  },
  {
    name: 'M·A·C',
    tagline: 'Studio Radiance & Bridal HD Pigments',
    fontStyle: 'font-serif tracking-[0.35em] font-light text-xl sm:text-2xl',
  },
];

export const BrandPartners: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#FFFDF9] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          align="center"
          eyebrow="Formulation Integrity"
          title="Curated"
          accent="International Formulations"
          subtitle="Every vial, pigment, and ampoule used in our atelier is 100% authentic, imported directly from authorized European and American beauty houses."
        />

        {/* Wordmarks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="card-luxe p-6 flex flex-col items-center justify-center text-center space-y-2 min-h-[120px]"
            >
              <span className={`text-[#1A1A1A] block ${partner.fontStyle}`}>
                {partner.name}
              </span>
              <span className="text-[10px] text-[#8A6A2F] uppercase tracking-wider font-semibold block">
                {partner.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
