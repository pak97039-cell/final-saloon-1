import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useSalon } from '../../context/SalonContext';

export const FloatingWidgets: React.FC = () => {
  const { bookingModal, lightbox } = useSalon();

  // Hide the floating CTAs if any modal or lightbox is active
  const isAnyModalActive = bookingModal.isOpen || lightbox.isOpen;

  if (isAnyModalActive) {
    return null;
  }

  return (
    <aside
      aria-label="Quick Concierge Access"
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none transition-all duration-300"
    >
      {/* WhatsApp Concierge Bubble */}
      <a
        href={siteConfig.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-soft-2 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] group"
      >
        <WhatsAppIcon size={24} className="text-white drop-shadow-xs" />
        <span className="sr-only">Chat on WhatsApp</span>
        {/* Tooltip on desktop */}
        <span className="hidden sm:group-hover:block absolute right-14 bg-[#1E1B18] text-[#FAF8F5] text-[11px] font-medium px-2.5 py-1 rounded-sm whitespace-nowrap shadow-soft-2 border border-[#C5A059]/30">
          WhatsApp Concierge
        </span>
      </a>

    </aside>
  );
};
