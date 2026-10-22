export interface StudioHours {
  open: string;
  close: string;
  label: string;
  days: string;
}

export interface StudioGeo {
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
  isSpecial?: boolean;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  pricePKR: number;
  durationMinutes: number;
  pillarId?: 'hair' | 'bridal' | 'makeup' | 'skin' | 'nails' | 'home';
}

export interface SiteConfig {
  name: string;
  tagline: string;
  subheading: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    region: string;
    country: string;
    full: string;
  };
  phone: {
    display: string;
    raw: string;
  };
  whatsapp: {
    number: string;
    defaultMessage: string;
    url: string;
  };
  hours: StudioHours;
  geo: StudioGeo;
  currency: {
    code: string;
    symbol: string;
  };
  navLinks: readonly NavLink[];
  servicePillars: readonly {
    id: string;
    name: string;
    tagline: string;
    description: string;
  }[];
  addOns: readonly ServiceAddOn[];
}

export const siteConfig: SiteConfig = {
  name: 'Luxeora Studio',
  tagline: 'Private Aesthetic Sanctuary for Women',
  subheading: 'Haute Bridal, French Balayage, Clinical Aesthetics & In-Suite Privacy in Islamabad',
  address: {
    line1: 'Suites 14-16, Block B, Super Market',
    line2: 'F-6 Markaz',
    city: 'Islamabad',
    region: 'Islamabad Capital Territory',
    country: 'Pakistan',
    full: 'Suites 14-16, Block B, Super Market, F-6 Markaz, Islamabad',
  },
  phone: {
    display: '+92 312 8664280',
    raw: '+923128664280',
  },
  whatsapp: {
    number: '923128664280',
    defaultMessage: 'Hello Luxeora Studio, I would like to inquire about reserving a private suite appointment.',
    get url(): string {
      return `https://wa.me/923128664280?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },
  hours: {
    open: '10:30 AM',
    close: '9:00 PM',
    label: '10:30 AM – 9:00 PM',
    days: 'Monday through Sunday (Open Daily)',
  },
  geo: {
    latitude: 33.7294,
    longitude: 73.0754,
    googleMapsUrl: 'https://maps.google.com/?q=33.7294,73.0754',
  },
  currency: {
    code: 'PKR',
    symbol: 'PKR',
  },
  navLinks: Object.freeze([
    { label: 'Sanctuary', href: '#sanctuary' },
    { label: 'Services', href: '#services' },
    { label: 'Bridal Atelier', href: '#bridal' },
    { label: 'At-Home Salon', href: '#home-salon' },
    { label: 'Visit', href: '#contact' },
    { label: 'Reserve', href: '#booking', isSpecial: true },
  ]),
  servicePillars: Object.freeze([
    {
      id: 'hair',
      name: 'Hair Couture',
      tagline: 'Precision cuts, French balayage, and restorative keratin treatments',
      description: 'Custom formulation and high-gloss glossing tailored to South Asian hair textures.',
    },
    {
      id: 'bridal',
      name: 'Bridal Atelier',
      tagline: 'Private bridal suites with complete trousseau coordination',
      description: 'Exclusive bridal suites ensuring full privacy, custom veil draping, and heirloom looks.',
    },
    {
      id: 'makeup',
      name: 'Red Carpet & Occasion',
      tagline: 'Luminous skin-focus artistry for Galas, Nikah & Dinners',
      description: 'Sculpted elegance emphasizing radiant, natural skin under warm ambient lighting.',
    },
    {
      id: 'skin',
      name: 'Skin & Aesthetics',
      tagline: 'HydraFacials, microneedling & botanical glow therapy',
      description: 'Clinical-grade facials executed by licensed aesthetic practitioners in sterile suites.',
    },
    {
      id: 'nails',
      name: 'Nails & Spa Sanctuary',
      tagline: 'Russian manicure, Russian gel overlays & aromatherapy pedicures',
      description: 'Ultra-hygienic autoclave sterilization with organic Himalayan herbal soaks.',
    },
    {
      id: 'home',
      name: 'At-Home Salon Concierge',
      tagline: 'Private suite experience transported to your Islamabad residence',
      description: 'Mobile master artisans equipped with portable stations, sterile kits, and ambient lighting.',
    },
  ]),
  addOns: Object.freeze([
    {
      id: 'scalp-aromatherapy',
      name: 'Rose & Sandalwood Scalp Massage',
      description: '15-minute warming acupressure scalp detox using rare botanical oils.',
      pricePKR: 3500,
      durationMinutes: 15,
      pillarId: 'hair',
    },
    {
      id: 'gold-collagen-eye',
      name: '24k Gold Hydrogel Eye & Lip Infusion',
      description: 'Instant de-puffing and fine line softening with marine collagen.',
      pricePKR: 4500,
      durationMinutes: 15,
      pillarId: 'skin',
    },
    {
      id: 'paraffin-hand-wrap',
      name: 'Warm Rosewater Paraffin Hand Cocoon',
      description: 'Intense thermal moisture infusion for velvet-soft hands before manicures.',
      pricePKR: 3000,
      durationMinutes: 20,
      pillarId: 'nails',
    },
    {
      id: 'lash-lift-tint',
      name: 'Organic Keratin Lash Lift & Deep Tint',
      description: 'Semi-permanent lash curl and deep charcoal tint lasting up to 8 weeks.',
      pricePKR: 6500,
      durationMinutes: 30,
      pillarId: 'makeup',
    },
    {
      id: 'express-glass-blowdry',
      name: 'Post-Treatment Glass-Gloss Blowdry',
      description: 'Mirror-finish thermal blowout with humidity-shield serum.',
      pricePKR: 5000,
      durationMinutes: 30,
      pillarId: 'hair',
    },
  ]),
};

export const formatPKR = (amount: number): string => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export const getWhatsAppBookingLink = (serviceName?: string, date?: string): string => {
  let message = siteConfig.whatsapp.defaultMessage;
  if (serviceName) {
    message = `Hello Luxeora Studio, I would like to reserve an appointment for "${serviceName}"${date ? ` on ${date}` : ''} at your F-6 Markaz studio.`;
  }
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
};
