import React from 'react';
import { Star, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SectionHeading } from '../ui/SectionHeading';
import { LuxeImage } from '../ui/LuxeImage';

export const ArtistsSection: React.FC = () => {
  const { artists, openBooking } = useSalon();

  // Helper to extract respectful first/display name for the CTA button
  const getArtistDisplayName = (fullName: string): string => {
    if (fullName.startsWith('Dr. ')) {
      const parts = fullName.split(' ');
      return parts.slice(0, 2).join(' '); // "Dr. Ayla"
    }
    return fullName.split(' ')[0]; // "Mahnoor"
  };

  return (
    <section id="artists" className="py-20 lg:py-28 bg-[#FFFDF9] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
          <SectionHeading
            eyebrow="The Atelier Roster"
            title="Meet Our"
            accent="Master Artisans"
            subtitle="An all-female collective of specialized hair colorists, clinical skin practitioners, and haute bridal stylists with 6 to 18 years of refined experience."
          />

          <div className="text-xs text-[#8A6A2F] uppercase tracking-widest font-semibold">
            6 Specialized Masters • F-6 Islamabad
          </div>
        </div>

        {/* 6 Artist Cards Grid with Card Interactive Lift & Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => {
            const displayName = getArtistDisplayName(artist.name);

            return (
              <div
                key={artist.id}
                className="card-luxe card-interactive overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Portrait with Rating & Experience overlay + LuxeImage blur up */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FAF8F5]">
                    <LuxeImage
                      src={artist.image}
                      alt={`Master artisan ${artist.name}`}
                      width={600}
                      height={450}
                      aspectRatioClass="aspect-4/3"
                      className="card-zoom-img filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-transparent to-transparent pointer-events-none" />

                    {/* Featured Star Badge */}
                    {artist.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#D4AF37] text-[#121212] text-[10px] uppercase font-bold tracking-widest rounded-xs shadow-soft-1 flex items-center gap-1 z-10">
                        <Sparkles className="w-3 h-3" />
                        <span>Lead Artisan</span>
                      </div>
                    )}

                    {/* Rating & Reviews */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#121212]/85 backdrop-blur-md text-[#FAF8F5] text-[11px] font-medium rounded-xs flex items-center gap-1.5 shadow-soft-1 z-10">
                      <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <span>{artist.rating.toFixed(1)}</span>
                      <span className="text-[#FAF8F5]/60 text-[10px]">({artist.reviewCount})</span>
                    </div>

                    {/* Experience Badge */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#FFFDF9]/95 backdrop-blur-md text-[#1A1A1A] text-[11px] font-semibold rounded-xs flex items-center gap-1 shadow-soft-1 z-10">
                      <Award className="w-3 h-3 text-[#8A6A2F]" />
                      <span>{artist.experienceYears} Years Exp</span>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="p-6 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A2F] font-semibold block mb-0.5">
                        {artist.role}
                      </span>
                      <h3 className="font-serif text-2xl text-[#1A1A1A]">
                        {artist.name}
                      </h3>
                      <p className="text-xs font-medium text-[#8C6F66] mt-1 italic font-serif">
                        Specialty: {artist.specialty}
                      </p>
                    </div>

                    <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed pt-1">
                      {artist.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Action with Arrow Slide */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => openBooking({ artistId: artist.id })}
                    className="btn-outline w-full text-xs min-h-[46px] justify-center group"
                  >
                    <span>Book with {displayName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8A6A2F] btn-arrow-slide" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
