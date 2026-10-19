import React from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useSalon } from '../../context/SalonContext';

export const Footer: React.FC = () => {
  const { openBooking } = useSalon();

  return (
    <footer className="bg-[#121212] text-[#FAF8F5] border-t border-[#C5A059]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Paper grain noise */}
      <div className="paper-grain opacity-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Women-Only Sanctuary Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#1E1B18] border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] shadow-soft-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif tracking-[0.2em] uppercase text-xl font-medium text-[#FAF8F5]">
                Luxeora
              </span>
            </div>

            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed font-sans">
              Islamabad&apos;s premier women-only salon and aesthetic atelier. An unhurried sanctuary offering bespoke bridal artistry, French balayage, clinical skincare, and in-suite discretion.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#1E1B18] border border-[#C5A059]/30 text-[11px] text-[#C5A059]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>100% All-Female Team &amp; Private Suites</span>
            </div>
          </div>

          {/* Service Pillars Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059] font-semibold">
              Atelier Rituals
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/70 font-sans">
              <li>
                <a href="#services" className="hover:text-[#FAF8F5] transition-colors">
                  Hair Couture &amp; French Balayage
                </a>
              </li>
              <li>
                <a href="#bridal" className="hover:text-[#FAF8F5] transition-colors">
                  Royal Bridal Atelier &amp; Trousseau
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FAF8F5] transition-colors">
                  Occasion &amp; Red Carpet Makeup
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FAF8F5] transition-colors">
                  Clinical Skin &amp; Hydrafacial
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FAF8F5] transition-colors">
                  Russian Nails &amp; Moroccan Spa
                </a>
              </li>
              <li>
                <a href="#home-salon" className="hover:text-[#FAF8F5] transition-colors">
                  At-Home Salon Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Address & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059] font-semibold">
              Sanctuary Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF8F5]/70 leading-relaxed font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p>{siteConfig.address.full}</p>
                  <a
                    href={siteConfig.geo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#C5A059] hover:underline mt-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FAF8F5] font-medium">{siteConfig.hours.label}</p>
                  <p className="text-[11px] text-[#FAF8F5]/60">{siteConfig.hours.days}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Concierge & Reservations */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059] font-semibold">
              Guest Concierge
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${siteConfig.phone.raw}`}
                className="flex items-center gap-2.5 text-[#FAF8F5]/90 hover:text-[#C5A059] transition-colors"
              >
                <div className="w-7 h-7 rounded-sm bg-[#1E1B18] border border-[#E8DCCF]/20 flex items-center justify-center text-[#C5A059]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.phone.display}</span>
              </a>

              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#25D366] hover:opacity-90 transition-opacity"
              >
                <div className="w-7 h-7 rounded-sm bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                  <WhatsAppIcon size={14} className="text-[#25D366]" />
                </div>
                <span>WhatsApp Guest Inquiries</span>
              </a>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn-luxe btn-gold-primary w-full text-center"
                >
                  Reserve Private Suite
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FAF8F5]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50">
          <p>© {new Date().getFullYear()} Luxeora Studio Islamabad. All rights reserved. Exclusively for women.</p>

          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-[#FAF8F5]/80 transition-colors">
              Privacy &amp; Discretion
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
