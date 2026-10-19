import React from 'react';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SectionHeading } from '../ui/SectionHeading';

export const PrivateSuites: React.FC = () => {
  const { studio, openBooking } = useSalon();

  return (
    <section
      id="sanctuary-suites"
      className="py-20 lg:py-28 bg-[#121212] text-[#FAF8F5] relative overflow-hidden border-y border-[#D4AF37]/20"
    >
      {/* Subtle Paper-Grain Noise Overlay (Hero & Midnight only, opacity <= 0.04) */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with SectionHeading component */}
        <SectionHeading
          dark
          eyebrow="Absolute Seclusion & Sanctity"
          title="The Women-Only"
          accent="Private Sanctuary & Suites"
          subtitle="Designed from the ground up for total peace of mind. Luxeora is completely closed to male visitors and staff. Our four signature architectural chambers offer veiled curtains, acoustic isolation, and serene mood lighting."
        />

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 w-full rounded-xs overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                alt="Private bridal chamber and luxury suite interior at Luxeora Studio"
                loading="lazy"
                width={1000}
                height={1250}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover object-center filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xs bg-[#121212]/92 backdrop-blur-md border border-[#D4AF37]/30 shadow-soft-2">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  Chamber No. 1
                </span>
                <p className="font-serif text-lg text-[#FAF8F5] leading-snug">
                  The Imperial Bridal Boudoir
                </p>
                <p className="text-[11px] text-[#FAF8F5]/70 font-sans mt-0.5">
                  Private restroom, mirrored vanity wall, and family lounge suite.
                </p>
              </div>
            </div>
          </div>

          {/* Details & Amenities List (7 columns) */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
                Our Uncompromising <span className="font-editorial text-[#C5A880]">Privacy Promise</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-sans leading-relaxed">
                Whether you observe strict hijab, require an uninterrupted space for pre-wedding bridal preparations, or simply crave quietude after a demanding week, our private suites ensure you are never visible to the main salon floor or corridor.
              </p>
            </div>

            {/* Studio Amenities (Dynamically rendered from studio data) */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Studio Amenities &amp; Discretion Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {studio.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-xs bg-[#1A1A1A]/85 border border-[#FAF8F5]/10 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-xs bg-[#121212] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-xs text-[#FAF8F5]/90 font-medium font-sans leading-snug">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees Box & 48px CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-gold-primary"
              >
                <span>Book a Private Suite</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#121212]" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#FAF8F5]/70 py-1">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Reserved exclusively under your name for uninterrupted service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
