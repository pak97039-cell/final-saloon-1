import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Phone,
  Menu,
  X,
  Clock,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useSalon } from '../../context/SalonContext';

export const Navbar: React.FC = () => {
  const { openBooking } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#services');

  // Mobile drawer states to allow smooth exit animations before unmount
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Bridal Atelier', href: '#bridal' },
    { label: 'Master Artists', href: '#artists' },
    { label: 'At-Home Salon', href: '#home-salon' },
    { label: 'Editorial Gallery', href: '#gallery' },
    { label: 'Guest Reviews', href: '#reviews' },
    { label: 'Visit Sanctuary', href: '#contact' },
  ];

  // 1. Passive, rAF-throttled scroll listener for 24px shrink & 2px scroll progress bar
  useEffect(() => {
    let ticking = false;

    const onScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 24);

          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress =
            docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 2. IntersectionObserver scrollspy for active nav link (no scroll-tick math)
  useEffect(() => {
    const sectionIds = [
      'services',
      'treatments',
      'bridal',
      'artists',
      'home-salon',
      'gallery',
      'reviews',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'treatments') {
              setActiveSection('#services');
            } else {
              setActiveSection(`#${id}`);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Mobile drawer animation handlers
  const openMobileMenu = (): void => {
    setIsDrawerMounted(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsDrawerVisible(true);
      });
    });
  };

  const closeMobileMenu = (): void => {
    setIsDrawerVisible(false);
    setTimeout(() => {
      setIsDrawerMounted(false);
    }, 300);
  };

  // Close mobile drawer on ESC key
  useEffect(() => {
    if (!isDrawerMounted) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerMounted]);

  // Lock body scroll when mobile menu is mounted
  useEffect(() => {
    if (isDrawerMounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerMounted]);

  return (
    <>
      {/* Fixed 2px Gold Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#C5A059] z-[60] origin-left pointer-events-none transition-none shadow-xs"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      {/* Top Concierge Header Strip */}
      <div className="bg-[#121212] text-[#FAF8F5] text-xs border-b border-[#C5A059]/20 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#FAF8F5]/80 font-normal">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{siteConfig.hours.label} • Women-Only Atelier</span>
            </span>
            <a
              href={`tel:${siteConfig.phone.raw}`}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#FAF8F5]/90 hover:text-[#C5A059] transition-colors focus-visible:outline-[#C5A059]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{siteConfig.phone.display}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#25D366] hover:text-[#25D366]/80 font-medium transition-colors focus-visible:outline-[#25D366]"
            >
              <WhatsAppIcon size={13} className="text-[#25D366]" />
              <span className="hidden xs:inline">WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar: 4-Column Grid on Mobile, Flex on Desktop */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ease-luxe w-full max-w-full ${
          isScrolled
            ? 'glass-panel border-b border-[#E8DCCF] shadow-soft-1'
            : 'bg-[#FAF8F5] border-b border-[#E8DCCF]/70'
        }`}
      >
        <div
          className={`header-nav-container ${
            isScrolled ? 'lg:h-16' : 'lg:h-20'
          }`}
        >
          {/* Column 1 & 2: Brand Link (uses display: contents on mobile so Logo=Col 1, Brand=Col 2) */}
          <a
            href="#"
            className="header-brand-link focus-visible:outline-[#8A6A2F]"
            aria-label="Luxeora Atelier Home"
          >
            {/* Column 1: Logo (fixed 40px square, no extra margin, flex-shrink 0) */}
            <div className="header-logo-icon rounded-sm bg-[#1E1B18] text-[#C5A059] flex items-center justify-center border border-[#C5A059]/30 hover:border-[#C5A059] transition-colors shadow-soft-1 shrink-0">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>

            {/* Column 2: Brand Block (the only part allowed to shrink) */}
            <div className="header-brand-block">
              <span className="header-brand-title">
                Luxeora
              </span>
              <span className="header-brand-tagline">
                Atelier • F-6 Islamabad
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (hidden on mobile, centered on desktop) */}
          <nav
            className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link-item py-1 focus-visible:outline-[#8A6A2F] ${
                    isActive
                      ? 'active text-[#8A6A2F] font-bold'
                      : 'text-[#1E1B18]/80 hover:text-[#8A6A2F]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Column 3: Book Visit Button (single button in DOM with responsive CSS) */}
          <button
            type="button"
            onClick={() => openBooking()}
            aria-label="Book a visit"
            className="header-book-btn btn-luxe btn-outline text-xs uppercase tracking-widest font-semibold cursor-pointer rounded-sm border border-[#C5A059]/60 hover:border-[#C5A059] text-[#1E1B18] bg-[#FFFDF9]"
          >
            <Calendar className="book-btn-calendar w-4 h-4 text-[#8A6A2F]" aria-hidden="true" />
            <span className="book-btn-text">
              <span>BOOK</span>
              <span className="book-btn-visit"> VISIT</span>
            </span>
            <ArrowRight className="book-btn-arrow w-3.5 h-3.5 text-[#8A6A2F] ml-1.5" aria-hidden="true" />
          </button>

          {/* Column 4: Mobile Hamburger Button (hidden on desktop) */}
          <button
            type="button"
            onClick={openMobileMenu}
            className="header-menu-btn lg:hidden rounded-sm border border-[#E8DCCF] bg-[#FFFDF9] text-[#1E1B18] hover:bg-[#FAF8F5] transition-colors focus-visible:outline-[#8A6A2F] cursor-pointer"
            aria-label="Open navigation menu"
            aria-expanded={isDrawerMounted}
          >
            <Menu className="w-5 h-5 text-[#1E1B18]" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer with Staggered Links & Exit Animation */}
      {isDrawerMounted && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop with Fade In / Fade Out */}
          <div
            className={`fixed inset-0 bg-[#121212]/60 backdrop-blur-xs transition-opacity duration-300 ease-luxe ${
              isDrawerVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer Container with Slide In / Slide Out */}
          <div
            ref={mobileMenuRef}
            className={`fixed inset-y-0 right-0 max-w-[85vw] sm:max-w-sm w-full max-w-[100vw] box-border bg-[#FAF8F5] border-l border-[#E8DCCF] p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-luxe ${
              isDrawerVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DCCF]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-sm bg-[#1E1B18] text-[#C5A059] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-serif tracking-widest uppercase text-lg text-[#1E1B18]">
                    Luxeora
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="w-10 h-10 flex items-center justify-center rounded-sm border border-[#E8DCCF] text-[#1E1B18] hover:bg-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Anchor Links with 60ms Staggered Slide In */}
              <nav className="py-6 space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeMobileMenu}
                      style={{
                        transitionDelay: isDrawerVisible ? `${idx * 60}ms` : '0ms',
                      }}
                      className={`block px-3 py-3 text-sm uppercase tracking-wider rounded-sm transition-all duration-300 ease-luxe ${
                        isActive
                          ? 'text-[#8A6A2F] bg-white font-semibold shadow-xs'
                          : 'text-[#1E1B18] hover:text-[#8A6A2F] hover:bg-white/60 font-medium'
                      } ${
                        isDrawerVisible
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-4'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Actions Footer */}
            <div className="pt-6 border-t border-[#E8DCCF] space-y-3">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openBooking();
                }}
                className="btn-luxe btn-gold-primary w-full text-center"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1E1B18]" />
              </button>

              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe btn-outline w-full text-center inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={16} className="text-[#25D366]" />
                <span>WhatsApp Atelier</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
