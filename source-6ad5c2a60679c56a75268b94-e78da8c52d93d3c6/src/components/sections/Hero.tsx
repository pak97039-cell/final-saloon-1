import React from 'react';
import { Sparkles, ArrowDown, Shield, Star, Users, Clock } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSalon } from '../../context/SalonContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const Hero: React.FC = () => {
  const { openBooking, artists } = useSalon();

  return (
    <section
      id="hero"
      aria-label="Luxeora Sanctuary Welcome"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#121212] text-[#FAF8F5] pt-24"
    >
      {/* Paper grain noise texture */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Hero Background Image with Ken Burns slow zoom (8s, transform only) & CSS Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80"
          alt="Luxeora luxury private salon interior in Super Market F-6 Islamabad"
          fetchPriority="high"
          width={2000}
          height={1333}
          className="hero-ken-burns hero-parallax-layer w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.08]"
        />
        {/* Soft Gold & Charcoal Gradient Veils */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
        <div className="absolute inset-0 bg-radial-[at_center_top] from-[#C5A059]/10 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 w-full my-auto">
        <div className="max-w-3xl space-y-8">
          {/* Eyebrow Gold Badge (Fades in without hiding LCP) */}
          <div className="hero-badge-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#1E1B18]/85 border border-[#C5A059]/40 backdrop-blur-md shadow-soft-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E5C378]">
              {siteConfig.tagline}
            </span>
          </div>

          {/* Editorial H1 with masked line-by-line reveal */}
          <h1 className="font-serif text-[#FAF8F5] font-normal tracking-tight">
            <span className="hero-line-mask">
              <span className="hero-line-inner hero-line-1 block">
                Quiet Luxury for Women,
              </span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line-inner hero-line-2 block">
                in <span className="font-editorial text-[#E5C378]">Private Suites</span>
              </span>
            </span>
          </h1>

          {/* Subtext (Fades up) */}
          <p className="hero-subtext-in text-base sm:text-lg text-[#FAF8F5]/85 font-sans font-light leading-relaxed max-w-2xl">
            An all-female sanctuary tucked within F-6 Super Market. Certified French hair balayage, clinical dermal rituals, and royal bridal couture administered in absolute acoustic and visual seclusion.
          </p>

          {/* CTAs with Gold Shimmer Sweep & 48px touch targets */}
          <div className="hero-cta-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-gold-primary btn-shimmer group"
            >
              <span>Reserve Sanctuary Suite</span>
              <span className="text-base leading-none text-[#1E1B18] btn-arrow-slide">&rarr;</span>
            </button>

            <a
              href="#services"
              className="btn-outline border-[#FAF8F5]/30 text-[#FAF8F5] hover:bg-[#FAF8F5]/10 hover:border-[#C5A059]"
            >
              <span>Explore Disciplines</span>
            </a>
          </div>
        </div>
      </div>

      {/* Animated Scroll Cue (Hidden on mobile & reduced-motion) */}
      <div className="relative z-10 hidden sm:flex flex-col items-center gap-1.5 scroll-cue pb-3 select-none" aria-hidden="true">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">Scroll</span>
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#C5A059]/60 via-[#C5A059]/30 to-transparent relative overflow-hidden rounded-full">
          <span className="absolute top-0 left-0 w-full h-2.5 bg-[#FAF8F5] rounded-full animate-scroll-dot" />
        </div>
      </div>

      {/* Four Verification Metrics Strip with Animated Counter */}
      <div className="hero-metrics-in relative z-10 border-t border-[#C5A059]/20 bg-[#1E1B18]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Metric 1 */}
            <div className="flex items-center gap-3.5 border-r border-[#FAF8F5]/10 last:border-r-0">
              <div className="w-10 h-10 rounded-sm bg-[#121212] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-medium text-[#FAF8F5]">F-6 Atelier</div>
                <div className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider font-sans">
                  Super Market, Islamabad
                </div>
              </div>
            </div>

            {/* Metric 2: 98% Animated Counter */}
            <div className="flex items-center gap-3.5 border-r border-[#FAF8F5]/10 last:border-r-0">
              <div className="w-10 h-10 rounded-sm bg-[#121212] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-medium text-[#FAF8F5]">
                  <AnimatedCounter value={98} suffix="% Satisfaction" ariaLabel="98 percent satisfaction" />
                </div>
                <div className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider font-sans">
                  Verified Guest Rating
                </div>
              </div>
            </div>

            {/* Metric 3: Derived from data with Animated Counter */}
            <div className="flex items-center gap-3.5 border-r border-[#FAF8F5]/10 last:border-r-0">
              <div className="w-10 h-10 rounded-sm bg-[#121212] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-medium text-[#FAF8F5]">
                  <AnimatedCounter value={artists.length || 6} suffix=" Master Artists" ariaLabel={`${artists.length || 6} Master Artists`} />
                </div>
                <div className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider font-sans">
                  All-Female Team
                </div>
              </div>
            </div>

            {/* Metric 4: From siteConfig */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#121212] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-medium text-[#FAF8F5]">
                  {siteConfig.hours.label}
                </div>
                <div className="text-[11px] text-[#FAF8F5]/60 uppercase tracking-wider font-sans">
                  Private Appointments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
