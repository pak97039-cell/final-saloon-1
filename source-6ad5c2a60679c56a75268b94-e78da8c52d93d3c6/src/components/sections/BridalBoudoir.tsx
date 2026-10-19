import React from 'react';
import { Crown, Clock, Check, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { formatPKR } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';
import { LuxeImage } from '../ui/LuxeImage';

export const BridalBoudoir: React.FC = () => {
  const { services, openBooking } = useSalon();

  // Dynamically resolve bridal services from store so updates reflect in real time
  const baratPackage = services.find((s) => s.id === 'bridal-royal-barat') || {
    id: 'bridal-royal-barat',
    name: 'Royal Barat Couture',
    pricePKR: 65000,
    durationMinutes: 300,
    popular: true,
    description: 'An unhurried 5-hour royal sanctuary experience with HD skin and dupatta draping.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    included: [
      'Dedicated private bridal suite with full privacy',
      'Airbrush HD bridal makeup & mink lash design',
      'Royal dupatta, mathapatti & jewellery setting',
      'Complimentary Kashmiri kahwa & fruit platter',
    ],
  };

  const valimaPackage = services.find((s) => s.id === 'bridal-valima-glow') || {
    id: 'bridal-valima-glow',
    name: 'Valima Ethereal Glow',
    pricePKR: 55000,
    durationMinutes: 270,
    description: 'Modern luminous pastels and sculpted glow designed for contemporary silhouettes.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    included: [
      'Private suite with personal bridal assistant',
      'Luminous glass skin preparation & dewy contour',
      'Contemporary bridal hair sculpting & veil placement',
      'Touch-up kit with matching custom lip tint',
    ],
  };

  const mehndiPackage = services.find((s) => s.id === 'bridal-mehndi-mayun') || {
    id: 'bridal-mehndi-mayun',
    name: 'Mehndi & Mayun Glam',
    pricePKR: 42000,
    durationMinutes: 210,
    description: 'Vibrant, fresh aesthetics with warm floral highlights and braided hair styling.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    included: [
      'Skin revival massage & gold glow primer',
      'Sweat-proof radiant complexion & soft lash fan',
      'Traditional jasmine or baby breath hair styling',
      'Dupatta pin-security & floral jewellery affixing',
    ],
  };

  const trialPackage = services.find((s) => s.id === 'bridal-trial-session');

  const mainBridalPackages = [
    {
      service: baratPackage,
      badge: 'Signature Royal Couture',
      accent: 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-soft-2',
      isHero: true,
    },
    {
      service: valimaPackage,
      badge: 'Modern Ethereal Pastels',
      accent: 'border-[#E8E2D8]',
      isHero: false,
    },
    {
      service: mehndiPackage,
      badge: 'Floral & Joyful Glow',
      accent: 'border-[#E8E2D8]',
      isHero: false,
    },
  ];

  return (
    <section id="bridal" className="py-20 lg:py-28 bg-[#F3E8E0] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <SectionHeading
          eyebrow="Haute Bridal Atelier"
          title="The Imperial"
          accent="Bridal Boudoir"
          subtitle="Your wedding morning should be peaceful, opulent, and utterly unhurried. Each bride is hosted in an exclusive private suite with personal trousseau dressing and master-level artistry."
        />

        {/* 3 Main Bridal Packages with Glow Border on Hover */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {mainBridalPackages.map(({ service, badge, accent, isHero }) => (
            <div
              key={service.id}
              className={`bg-[#FFFDF9] rounded-xs overflow-hidden flex flex-col justify-between shadow-soft-1 bridal-card transition-all duration-300 relative border ${accent}`}
            >
              {isHero && (
                <div className="bg-[#1A1A1A] text-[#121212] font-serif text-[11px] uppercase font-bold tracking-widest py-1.5 px-4 text-center border-b border-[#D4AF37]/30 flex items-center justify-center gap-2 badge-shimmer-once">
                  <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                  <span>Most Celebrated Bridal Experience</span>
                </div>
              )}

              <div>
                {/* Image Banner with LuxeImage */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF8F5]">
                  <LuxeImage
                    src={service.image}
                    alt={service.name}
                    width={700}
                    height={440}
                    aspectRatioClass="aspect-16/10"
                    className="card-zoom-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#121212]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] uppercase tracking-wider text-[#FAF8F5] rounded-xs font-semibold z-10">
                    {badge}
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#121212]/85 backdrop-blur-md text-[#FAF8F5] text-[11px] font-medium rounded-xs flex items-center gap-1.5 z-10">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{service.durationMinutes} mins private suite</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1A1A] tracking-tight">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Included list */}
                  {service.included && service.included.length > 0 && (
                    <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C6F66] font-semibold block">
                        Full Trousseau Inclusions
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#1A1A1A]/85 font-sans">
                        {service.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#8A6A2F] shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action with btn-arrow-slide */}
              <div className="p-6 sm:p-7 pt-4 border-t border-[#E8E2D8] bg-[#FAF8F5]/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6F66] block">
                    Atelier Investment
                  </span>
                  <span className="tabular-price font-serif text-2xl font-medium text-[#1A1A1A]">
                    {formatPKR(service.pricePKR)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking({ serviceId: service.id })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#121212] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded-xs border border-[#D4AF37] transition-all min-h-[44px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37] group"
                >
                  <span>Reserve Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] btn-arrow-slide" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Card: Bridal Trial Session & Consultation Promise */}
        {trialPackage && (
          <div className="card-luxe bridal-card p-6 sm:p-8 border-[#D4AF37]/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#8A6A2F]">
                <Heart className="w-3.5 h-3.5 text-[#8A6A2F]" />
                <span>Pre-Wedding Confidence</span>
              </div>
              <h4 className="font-serif text-2xl text-[#1A1A1A]">
                {trialPackage.name} — Comprehensive Consultation &amp; Trial
              </h4>
              <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
                {trialPackage.description} Bring your dress swatches, veil, and family jewellery to test dual aesthetics under studio and photography lighting before your big day.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#1A1A1A]/80 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8A6A2F]" />
                  {trialPackage.durationMinutes} Minutes Consultation
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A6A2F]" />
                  Senior Bridal Lead Assigned
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#8C6F66] block">
                  Trial Fee
                </span>
                <span className="tabular-price font-serif text-2xl font-medium text-[#1A1A1A]">
                  {formatPKR(trialPackage.pricePKR)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => openBooking({ serviceId: trialPackage.id })}
                className="btn-outline text-xs min-h-[44px] px-6 group"
              >
                <span>Schedule Bridal Trial</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8A6A2F] btn-arrow-slide" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
