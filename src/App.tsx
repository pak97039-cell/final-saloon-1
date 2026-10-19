import React from 'react';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { BrandStory } from './components/sections/BrandStory';
import { ServicesSection } from './components/sections/ServicesSection';
import { FeaturedTreatments } from './components/sections/FeaturedTreatments';
import { PrivateSuites } from './components/sections/PrivateSuites';
import { BridalBoudoir } from './components/sections/BridalBoudoir';
import { ArtistsSection } from './components/sections/ArtistsSection';
import { HomeSalonSection } from './components/sections/HomeSalonSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { BrandPartners } from './components/sections/BrandPartners';
import { GallerySection } from './components/sections/GallerySection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { FloatingWidgets } from './components/layout/FloatingWidgets';
import { BookingModal } from './components/booking/BookingModal';
import { GalleryLightbox } from './components/ui/GalleryLightbox';

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      {/* Accessible Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#1A1A1A] text-[#FAF8F5] px-4 py-2 rounded-xs border border-[#D4AF37] text-xs uppercase tracking-wider font-semibold shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Luxury Layout Framework */}
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4AF37]/25 selection:text-[#1A1A1A] flex flex-col justify-between">
        {/* Fixed & Sticky Navigation */}
        <Navbar />

        {/* Semantic Landmark Main Container */}
        <main id="main-content" tabIndex={-1} className="focus:outline-none flex-1">
          {/* 1. Hero: Displays the single primary <h1> */}
          <Hero />

          {/* 2. Atelier Brand Story & Philosophy */}
          <BrandStory />

          {/* 3. Six Curated Service Pillars */}
          <ServicesSection />

          {/* 4. Live Treatment Directory with Search & Filters */}
          <FeaturedTreatments />

          {/* 5. Midnight Architectural Private Suites */}
          <PrivateSuites />

          {/* 6. Imperial Bridal Boudoir Packages */}
          <BridalBoudoir />

          {/* 7. All-Female Master Artisans Roster */}
          <ArtistsSection />

          {/* 8. At-Home Salon Concierge & Mobile Protocol */}
          <HomeSalonSection />

          {/* 9. Verified Guest Reviews & Ratings */}
          <ReviewsSection />

          {/* 10. Formulations & Brand Partners */}
          <BrandPartners />

          {/* 11. Visual Photographic Archive */}
          <GallerySection />

          {/* 12. Location, Hours & Direct WhatsApp Inquiries */}
          <ContactSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Concierge Bubble */}
        <FloatingWidgets />

        {/* Core Modals & Overlays */}
        <BookingModal />
        <GalleryLightbox />
      </div>
    </ErrorBoundary>
  );
}
