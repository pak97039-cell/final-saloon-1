import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const BrandStory: React.FC = () => {
  return (
    <section id="sanctuary" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with SectionHeading component */}
        <SectionHeading
          eyebrow="The Atelier Ethos"
          title="An Unhurried Sanctuary for"
          accent="Elegance & Absolute Privacy"
          subtitle="Quiet luxury crafted exclusively for women in the heart of Islamabad."
        />

        {/* Two-Column Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Column 1: Philosophy & All-Female Sanctuary */}
          <div className="space-y-6 text-[#1A1A1A]/85 font-sans leading-relaxed text-sm sm:text-base">
            <p className="font-serif text-xl sm:text-2xl text-[#1A1A1A] italic leading-snug">
              “We built Luxeora Studio on a singular conviction: luxury is not loud; it is the feeling of absolute peace, uncompromised privacy, and masterful technique.”
            </p>
            <p>
              Tucked within Suites 14–16 in Super Market F-6, Luxeora was architected as an exclusive sanctuary for women and girls only. We eliminate the chaotic bustle common in traditional commercial salons. Here, every appointment is granted generous time in secluded, curtained suites where you can unwind without haste.
            </p>
            <p>
              From our senior hair colorists to aesthetic skin practitioners, our entire team of artisans is all-female. Whether preparing for your Barat, refining your skin barrier with clinical Hydrafacials, or enjoying a restorative scalp ritual, you are in trusted, compassionate hands.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-[#1A1A1A]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs bg-[#FFFDF9] border border-[#E8E2D8] shadow-soft-1">
                <ShieldCheck className="w-4 h-4 text-[#8A6A2F]" />
                Zero Male Staff or Visitors
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs bg-[#FFFDF9] border border-[#E8E2D8] shadow-soft-1">
                <HeartHandshake className="w-4 h-4 text-[#8A6A2F]" />
                Strict Visual Discretion
              </span>
            </div>
          </div>

          {/* Column 2: Rituals, Ethical Sourcing & Clinical Hygiene */}
          <div className="card-luxe p-8 sm:p-10 relative space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E8E2D8]">
              <div className="w-8 h-8 rounded-xs bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#8A6A2F]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A]">Purity &amp; Clinical Discipline</h3>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-[#1A1A1A]/80 font-sans">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-xs bg-[#FAF8F5] text-[#8A6A2F] border border-[#E8E2D8] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-[#1A1A1A] block font-medium">Kérastase Paris Certified Formulations</strong>
                  Original French haircare concentrates and ammonia-free European lighteners mixed in precise ratios for South Asian hair integrity.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-xs bg-[#FAF8F5] text-[#8A6A2F] border border-[#E8E2D8] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-[#1A1A1A] block font-medium">Hospital-Grade Autoclave Sterilization</strong>
                  Every stainless steel manicure instrument and dermal tool undergoes dry-heat medical autoclave sealed pouch sterilization.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-xs bg-[#FAF8F5] text-[#8A6A2F] border border-[#E8E2D8] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-[#1A1A1A] block font-medium">Private Bridal Trousseau Suite</strong>
                  Spacious dressing lounge equipped with calibrated warm &amp; daylight lighting arrays for true-to-life veil draping and jewellery fixing.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-xs bg-[#FAF8F5] text-[#8A6A2F] border border-[#E8E2D8] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-[#1A1A1A] block font-medium">Complimentary Artisan Refreshments</strong>
                  Fresh Kashmiri kahwa brewed with green tea, saffron, crushed almonds, and cardamom served to every guest.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Highlight Stats Row with Animated Counter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          <div className="card-luxe p-6 text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium block">
              <AnimatedCounter value={100} suffix="%" ariaLabel="100 percent" />
            </span>
            <span className="text-xs uppercase tracking-wider text-[#8A6A2F] font-semibold block">All-Female Team</span>
            <span className="text-[11px] text-[#1A1A1A]/60 block font-sans">Artisans, assistants &amp; managers</span>
          </div>

          <div className="card-luxe p-6 text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium block">
              <AnimatedCounter value={4} ariaLabel="4 private suites" />
            </span>
            <span className="text-xs uppercase tracking-wider text-[#8A6A2F] font-semibold block">Private Suites</span>
            <span className="text-[11px] text-[#1A1A1A]/60 block font-sans">Secluded personal chambers</span>
          </div>

          <div className="card-luxe p-6 text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium block">
              <AnimatedCounter value={134} suffix="°C" ariaLabel="134 degrees Celsius" />
            </span>
            <span className="text-xs uppercase tracking-wider text-[#8A6A2F] font-semibold block">Medical Autoclave</span>
            <span className="text-[11px] text-[#1A1A1A]/60 block font-sans">Hospital-standard hygiene</span>
          </div>

          <div className="card-luxe p-6 text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium block">F-6</span>
            <span className="text-xs uppercase tracking-wider text-[#8A6A2F] font-semibold block">Super Market</span>
            <span className="text-[11px] text-[#1A1A1A]/60 block font-sans">{siteConfig.address.line1}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
