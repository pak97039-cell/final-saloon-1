# Luxeora Studio | Women-Only Luxury Salon & Aesthetic Atelier

> A sanctuary of bespoke beauty, couture bridal styling, and restorative aesthetic rituals in Super Market, F-6 Markaz, Islamabad, Pakistan.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build & Lint](#production-build--lint)
- [Configuration & Customization](#configuration--customization)
  - [Modifying Studio Facts (`siteConfig.ts`)](#modifying-studio-facts-siteconfigts)
  - [Services & Seed Catalog (`initialData.ts`)](#services--seed-catalog-initialdatats)
- [State Management & Data Reset](#state-management--data-reset)
  - [Storage Versioning](#storage-versioning)
  - [Resetting Data to Factory Defaults](#resetting-data-to-factory-defaults)
- [Accessibility & SEO](#accessibility--seo)

---

## Project Overview

Luxeora Studio is a single-page luxury marketing atelier and an intelligent 4-step appointment booking engine. Built for high-discretion luxury clientele, the application enforces privacy, an all-female artisan team, and bespoke in-studio and at-home concierge services across Islamabad and Rawalpindi.

---

## Key Features

1. **Editorial Luxury Design System**:
   - Typography: *Cormorant Garamond* (editorial serif) paired with *Plus Jakarta Sans* (geometric sans-serif).
   - Palette: Warm alabaster cream (`#FAF8F5`), refined charcoal (`#1A1A1A`), warm sand borders (`#E8E2D8`), and lustrous metallic gold accents (`#D4AF37`).
   - Architectural layout with 1px border dividers, subtle glassmorphism panels, and smooth anchor scrolling.

2. **12 Comprehensive Marketing Sections**:
   - **Hero**: Atmospheric imagery, live atelier metrics, eager-loaded high-priority visuals.
   - **Brand Story**: Philosophy, Kerastase Paris certification, and private suite commitments.
   - **Pillars of Excellence**: Interactive exploration across Hair, Bridal, Makeup, Skin & Aesthetics, Nails & Spa, and At-Home Concierge.
   - **Curated Treatment Directory**: Live search, category filtering, duration tags, PKR pricing, and instant booking hooks.
   - **Private Suites**: Midnight dark-mode architectural section showcasing the women-only sanctuary.
   - **Imperial Bridal Boudoir**: Dynamic package pricing and inclusions connected directly to the service store.
   - **Master Artisans**: Detailed biographies, specialties, ratings, and one-click artist selection.
   - **At-Home Concierge**: Complete sanitization protocol and service radius for Islamabad & Rawalpindi.
   - **Guest Reviews**: Verified reviews, location badges, and live computed rating aggregate.
   - **Formulations & Partners**: Typography wordmarks of luxury formulation partners (Kérastase, Olaplex, Dyson, Dermalogica).
   - **Visual Photographic Archive**: Filterable gallery with a keyboard-navigable lightbox modal (`ESC`, `ArrowLeft`, `ArrowRight`).
   - **Concierge & Location**: Live contact cards, interactive Google Maps directions, and prefilled WhatsApp inquiry dispatch.

3. **4-Step Booking Engine (`BookingModal.tsx`)**:
   - **Step 1 (Sanctuary & Service)**: Toggle In-Studio at F-6 vs. At-Home Concierge; dynamic category filter; optional luxury add-ons with real-time bill preview.
   - **Step 2 (Calendar & Artisan)**: Local calendar constraints (tomorrow up to +90 days); hourly slots (11:00 AM – 8:00 PM); automatic conflict detection (`isSlotTaken`); 9:00 PM closing cutoff validation.
   - **Step 3 (Client Profile)**: Strict Pakistani mobile validation (`+923XXXXXXXXX`, `03XXXXXXXXX`, or `3XXXXXXXXX` normalized to `+923...`), physical address requirement for home concierge mode, inline validation with `aria-invalid`.
   - **Step 4 (Pass & Dispatch)**: Unique reservation pass generator (`LX-YYYY-XXXX`), double-submission guard, one-click WhatsApp concierge dispatch with complete encoded booking dossier.

---

## Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom `@theme` variables (`--font-serif`, `--font-sans`, `--color-gold`, `--color-cream`, `--color-charcoal`, `--color-sand`)
- **Icons**: Lucide React + custom official geometry `WhatsAppIcon`
- **State & Persistence**: React Context API (`SalonContext`) + versioned, resilient `localStorage` with in-memory fallback
- **Accessibility**: Skip link, ARIA landmarks, `role="dialog"` modal focus traps with focus restore, keyboard ESC hierarchy
- **SEO & Structured Data**: Static Schema.org `BeautySalon` JSON-LD matching `siteConfig.ts`, OpenGraph metadata, inline gold sparkle SVG favicon

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm (or pnpm / bun)

### Installation
```bash
# Clone or navigate to the project directory
cd luxeora-studio

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### Production Build & Lint
```bash
# Validate TypeScript strict types
npm run lint

# Compile for production
npm run build

# Preview production build locally
npm run preview
```

---

## Configuration & Customization

### Modifying Studio Facts (`siteConfig.ts`)
All business facts, location details, phone numbers, and operational parameters reside in `/src/config/siteConfig.ts`:

```typescript
export const siteConfig = {
  name: 'Luxeora Studio',
  tagline: 'Haute Aesthetics & Bridal Sanctuary',
  city: 'Islamabad',
  area: 'F-6 Super Market',
  address: 'Suites 14-16, Block B, Super Market, F-6 Markaz, Islamabad, 44000',
  phone: '+92 51 282 3901',
  whatsappNumber: '+923005559812',
  whatsappDisplay: '+92 300 555 9812',
  hours: {
    open: '10:30 AM',
    close: '9:00 PM',
    label: '10:30 AM – 9:00 PM',
    days: 'Monday through Sunday (All 7 Days)',
  },
  geo: {
    latitude: 33.7294,
    longitude: 73.0754,
    googleMapsUrl: 'https://maps.google.com/?q=33.7294,73.0754',
  },
  // ...
};
```

Updating `siteConfig.ts` automatically updates the Navbar, Footer, Contact section, WhatsApp links, and Schema.org metadata reference points.


### Services & Seed Catalog (`initialData.ts`)
To alter the default 21 services, 6 master artists, 6 verified reviews, or 10 gallery archive images, edit `/src/data/initialData.ts`.

---

## State Management & Data Reset

### Storage Versioning
State is safely isolated under the following versioned keys in browser `localStorage`:
- `luxeora:v1:studio`
- `luxeora:v1:services`
- `luxeora:v1:artists`
- `luxeora:v1:appointments`

If `localStorage` is disabled or blocked (e.g. private browsing mode), the state automatically falls back to an in-memory `Map` without throwing unhandled exceptions. Furthermore, a `storage` event listener keeps multiple open browser tabs synchronized in real time.

### Resetting Data to Factory Defaults
To reset application data back to the seed catalog, run the following in the browser console and refresh:
   ```javascript
   Object.keys(localStorage)
     .filter(k => k.startsWith('luxeora:v1:'))
     .forEach(k => localStorage.removeItem(k));
   location.reload();
   ```

---

## Accessibility & SEO

- **Accessible Focus Trap**: Modals (`Modal.tsx`, `BookingModal.tsx`, `AdminDashboard.tsx`, `GalleryLightbox.tsx`) trap focus, restore focus to the previously active element on close, and stack gracefully so that pressing `ESC` only closes the topmost dialog.
- **Scroll Lock**: The document body overflow is preserved and restored cleanly whenever modals open and close.
- **Heading Hierarchy**: Standard document hierarchy starting with a single `<h1>` in the Hero section and logical `<h2>`/`<h3>` tags throughout.
- **High Contrast**: All text styles meet or exceed WCAG AA contrast ratios (minimum 4.5:1 for body copy).
- **Reduced Motion**: Respects the user's `prefers-reduced-motion: reduce` system setting.
