import {
  SalonService,
  Studio,
  Artist,
  Addon,
  Appointment,
  Review,
  GalleryItem,
} from '../types';

export const services: SalonService[] = [
  // --- HAIR ---
  {
    id: 'hair-sig-cut',
    name: 'Signature Cut & Blow-Dry',
    category: 'hair',
    pricePKR: 6500,
    durationMinutes: 60,
    description:
      'Architectural hair shaping tailored to face geometry, followed by a deeply nourishing wash and high-velocity blowout.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    included: [
      'Tailored consultation & texture diagnostic',
      'Purifying botanical shampoo & scalp massage',
      'Precision shears cut & texturizing',
      'Luminous round-brush blowout styling',
    ],
  },
  {
    id: 'hair-balayage-gloss',
    name: 'Balayage & Gloss',
    category: 'hair',
    pricePKR: 28000,
    durationMinutes: 240,
    popular: true,
    description:
      'Hand-painted sunlit dimensions using ammonia-free French lighteners, sealed with an ultra-gloss conditioning glaze.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    included: [
      'Bespoke tonal mapping & sectioning',
      'Bond-protecting premium French lightener',
      'Customized post-lightening gloss toner',
      'Thermal moisture shield & velvet blowdry',
    ],
  },
  {
    id: 'hair-kerastase-fusio',
    name: 'Kerastase Fusio-Dose Ritual',
    category: 'hair',
    pricePKR: 9500,
    durationMinutes: 75,
    description:
      'Hyper-concentrated personalized hair transformation mixing custom boosters for instant shine, density, and fibre repair.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    included: [
      'Digital hair & scalp micro-camera analysis',
      'Custom blended Fusio-Dose concentrate',
      'Aromatherapy steam infusion canopy',
      'Detangling scalp brush & sleek finish',
    ],
  },
  {
    id: 'hair-keratin-smoothing',
    name: 'Keratin Smoothing',
    category: 'hair',
    pricePKR: 22000,
    durationMinutes: 180,
    description:
      'Formaldehyde-free smoothing therapy that eliminates frizz, restores moisture balance, and seals silkiness for 4 months.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    included: [
      'Clarifying pre-treatment wash',
      'Bio-keratin thermal infusion',
      'Titanium plate micro-sealing',
      'Post-care home maintenance briefing',
    ],
  },

  // --- BRIDAL ---
  {
    id: 'bridal-royal-barat',
    name: 'Royal Barat Couture',
    category: 'bridal',
    pricePKR: 65000,
    durationMinutes: 300,
    popular: true,
    description:
      'An unhurried 5-hour royal sanctuary experience. Flawless HD skin, heirloom dupatta draping, and customized traditional hair.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    included: [
      'Dedicated private bridal suite with full privacy',
      'Airbrush HD bridal makeup & mink lash design',
      'Royal dupatta, mathapatti & jewellery setting',
      'Complimentary Kashmiri kahwa & fruit platter',
    ],
  },
  {
    id: 'bridal-valima-glow',
    name: 'Valima Ethereal Glow',
    category: 'bridal',
    pricePKR: 55000,
    durationMinutes: 270,
    description:
      'Modern, luminous pastels and sculpted glow designed for modern Western and contemporary Pakistani Valima silhouettes.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    included: [
      'Private suite with personal bridal assistant',
      'Luminous glass skin preparation & dewy contour',
      'Contemporary bridal hair sculpting & veil placement',
      'Touch-up kit with matching custom lip tint',
    ],
  },
  {
    id: 'bridal-mehndi-mayun',
    name: 'Mehndi & Mayun Glam',
    category: 'bridal',
    pricePKR: 42000,
    durationMinutes: 210,
    description:
      'Vibrant, fresh aesthetics with warm floral highlights, playful braided hair ornamentation, and sweat-resistant complexion.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    included: [
      'Skin revival massage & gold glow primer',
      'Sweat-proof radiant complexion & soft lash fan',
      'Traditional jasmine or baby breath hair styling',
      'Dupatta pin-security & floral jewellery affixing',
    ],
  },
  {
    id: 'bridal-trial-session',
    name: 'Bridal Trial Session',
    category: 'bridal',
    pricePKR: 12000,
    durationMinutes: 120,
    description:
      'A comprehensive pre-wedding consultation exploring two makeup aesthetics, lighting adjustments, and dupatta anchor testing.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    included: [
      '60-minute color palette & dress swatch match',
      'Half-face dual aesthetic comparison',
      'Skin preparation protocol prescription',
      'Full photo trial under warm and cool studio lights',
    ],
  },

  // --- MAKEUP ---
  {
    id: 'makeup-evening-glam',
    name: 'Evening Glam',
    category: 'makeup',
    pricePKR: 12000,
    durationMinutes: 90,
    description:
      'Sophisticated red-carpet makeup featuring seamless skin sculpting, bespoke winged or smoky eye, and velvet finish.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    included: [
      'Hydrating sheet mask prep',
      'Camera-ready long-wear foundation',
      'Artisan false lash customization',
      'All-day transfer-proof setting mist',
    ],
  },
  {
    id: 'makeup-nikkah-soft',
    name: 'Nikkah Soft Glam',
    category: 'makeup',
    pricePKR: 30000,
    durationMinutes: 150,
    description:
      'Delicate, angelic elegance focusing on pearl undertones, soft blush draping, fluttery lashes, and demure styling.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    included: [
      'Illuminating 24k gold essence preparation',
      'Feathered brows & soft bronze-pink lids',
      'Velvet petal lips & translucent powder bake',
      'Dupatta setting & headpiece anchor',
    ],
  },
  {
    id: 'makeup-party-duo',
    name: 'Party Hair & Makeup Duo',
    category: 'makeup',
    pricePKR: 18000,
    durationMinutes: 150,
    description:
      'The definitive party package combining radiant festive makeup with luxury Hollywood waves or textured updo.',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    included: [
      'Complete event makeup with individual lashes',
      'Hot tool styling (curls, waves or French chignon)',
      'Setting spray & frizz lock treatment',
      'Dupatta or stole pin styling',
    ],
  },

  // --- SKINCARE ---
  {
    id: 'skin-hydrafacial',
    name: 'Hydrafacial Radiance',
    category: 'skincare',
    pricePKR: 14000,
    durationMinutes: 75,
    popular: true,
    description:
      'Medical-grade vortex vacuum extraction followed by hyaluronic acid and peptide bath for an instant glass-skin radiance.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    included: [
      'Vortex-cleansing & gentle lactic exfoliation',
      'Painless blackhead & sebum vacuum extraction',
      'Antioxidant & hyaluronic acid cocktail infusion',
      'Calming blue/red LED light therapy canopy',
    ],
  },
  {
    id: 'skin-gold-facial',
    name: '24K Gold Illuminating Facial',
    category: 'skincare',
    pricePKR: 11000,
    durationMinutes: 80,
    description:
      'Pure Egyptian 24K gold foil application combined with lymphatic drainage massage to boost collagen and impart regal glow.',
    image: 'https://images.unsplash.com/photo-1512290900672-1f55a1d7c385?auto=format&fit=crop&w=800&q=80',
    included: [
      'Double enzymatic exfoliation',
      'Lymphatic facial contouring with cold jade',
      '24-karat gold leaf mask application',
      'Colloidal gold brightening serum seal',
    ],
  },
  {
    id: 'skin-dermaplaning-peel',
    name: 'Dermaplaning & Glow Peel',
    category: 'skincare',
    pricePKR: 9000,
    durationMinutes: 60,
    description:
      'Surgical blade resurfacing that eliminates dead stratum corneum and vellus hair, followed by a gentle AHA botanical glow peel.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    included: [
      'Surgical steel sterile dermaplaning',
      'Fruit acid brightening peel (no downtime)',
      'Cryo-globe soothing calm treatment',
      'Broad spectrum physical SPF application',
    ],
  },
  {
    id: 'skin-prebridal-program',
    name: 'Pre-Bridal Skin Program',
    category: 'skincare',
    pricePKR: 36000,
    durationMinutes: 90,
    description:
      'Comprehensive high-performance aesthetic overhaul targeting hyperpigmentation, pore refinement, and dermal plumping.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    included: [
      'Clinical skin diagnostic scan',
      'Custom triple-phase micro-exfoliation',
      'High-potency vitamin C mesotherapy ampoule',
      'Neck, décolleté & hand radiance envelope',
    ],
  },

  // --- NAILS-SPA ---
  {
    id: 'nails-gel-manicure',
    name: 'Gel Manicure',
    category: 'nails-spa',
    pricePKR: 3500,
    durationMinutes: 45,
    description:
      'Clean dry Russian cuticle refinement, nail shaping, and chip-free premium European gel polish cured under low-heat LED.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    included: [
      'Precision e-file cuticle detailing',
      'Architectural nail shaping & buffing',
      'Strengthening rubber base layer',
      'High-shine gel color & organic cuticle nectar',
    ],
  },
  {
    id: 'nails-spa-pedicure',
    name: 'Spa Pedicure',
    category: 'nails-spa',
    pricePKR: 4500,
    durationMinutes: 60,
    description:
      'Mineral-rich Himalayan salt soak, organic lavender sugar scrub, heel callus softening, and deep acupressure reflex massage.',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
    included: [
      'Warm Himalayan pink salt foot bath',
      'Botanical callus smoothing treatment',
      'Exfoliating brown sugar & sweet almond scrub',
      'Cooling mint mask with heated towel wraps',
    ],
  },
  {
    id: 'nails-art-extensions',
    name: 'Nail Art Extensions',
    category: 'nails-spa',
    pricePKR: 8000,
    durationMinutes: 120,
    description:
      'Sculpted hard gel or soft gel tips with customized hand-painted French, ombre, chrome, or delicate crystal embellishments.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    included: [
      'Full nail extension application & shaping',
      'Reinforced apex sculpting for longevity',
      'Custom nail art design on up to 10 nails',
      'Scratch-resistant diamond topcoat',
    ],
  },
  {
    id: 'nails-moroccan-bath',
    name: 'Moroccan Bath Ritual',
    category: 'nails-spa',
    pricePKR: 15000,
    durationMinutes: 90,
    description:
      'Private steam chamber ritual with traditional black eucalyptus soap, vigorous Kessa mitt scrub, and argan oil hydration.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    included: [
      'Private heated steam bath session',
      'Traditional Beldi black soap application',
      'Full body Kessa glove exfoliation',
      'Pure cold-pressed Moroccan argan oil massage',
    ],
  },

  // --- HOME-SALON ---
  {
    id: 'home-glam-duo',
    name: 'Glam at Home (Hair + Makeup)',
    category: 'home-salon',
    pricePKR: 22000,
    durationMinutes: 150,
    description:
      'Our senior stylists arrive at your Islamabad residence with portable vanity lighting, sanitized kit, and full makeup bar.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    included: [
      'Travel across Islamabad urban sectors included',
      'Complete studio-grade makeup setup in your home',
      'Hot tool hair styling & volume setting',
      'Sanitized single-use applicators & brushes',
    ],
  },
  {
    id: 'home-bridal-team',
    name: 'Bridal at Home Team',
    category: 'home-salon',
    pricePKR: 85000,
    durationMinutes: 360,
    description:
      'A dedicated mobile squad of 3 master artists deploying to your home or wedding venue for bride and immediate bridal entourage.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    included: [
      '3-member senior artist entourage',
      'Complete bride Barat or Valima transformation',
      '2 additional family occasion makeups',
      'Full trousseau dressing & on-location coordinator',
    ],
  },
];

export const studio: Studio = {
  id: 'luxeora-f6',
  name: 'Luxeora Studio',
  address: 'Suites 14-16, Block B, Super Market, F-6 Markaz',
  area: 'F-6 Markaz, Islamabad',
  phone: '+92 312 8664280',
  whatsapp: '923128664280',
  hours: '10:30 AM - 9:00 PM daily',
  amenities: [
    'Private Women-Only Bridal Suites',
    '100% All-Female Master Team',
    'Hospital-Grade Autoclave Instrument Sterilization',
    'Artisan Kashmiri Kahwa & Herbal Infusion Bar',
    'Complimentary Valet Parking & Driver Rest Lounge',
    'High-Speed Private Wi-Fi & Device Charging Stations',
  ],
  image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  googleMapsUrl: 'https://maps.google.com/?q=33.7294,73.0754',
  coordinates: {
    latitude: 33.7294,
    longitude: 73.0754,
  },
};

export const artists: Artist[] = [
  {
    id: 'artist-mahnoor',
    name: 'Mahnoor Tariq',
    role: 'Bridal Makeup Lead',
    specialty: 'High-definition bridal contours & heirloom royal draping',
    experienceYears: 14,
    bio: 'Internationally certified master bridal artist celebrated across Islamabad for signature dewy skin and timeless Barat brides.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 280,
    featured: true,
  },
  {
    id: 'artist-zara',
    name: 'Zara Qureshi',
    role: 'Master Colour Specialist',
    specialty: 'French balayage, babylights & tone correction',
    experienceYears: 11,
    bio: 'Trained in Paris and Dubai, Zara specializes in seamless tonal blends crafted specifically for dark South Asian hair bases.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 210,
    featured: true,
  },
  {
    id: 'artist-ayla',
    name: 'Dr. Ayla Siddiqui',
    role: 'Clinical Aesthetician & Skin Therapist',
    specialty: 'Hydrafacial protocols, chemical resurfacing & barrier repair',
    experienceYears: 9,
    bio: 'Medical aesthetician dedicated to non-invasive dermal rehabilitation and luminous pre-wedding skincare regimens.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 165,
    featured: true,
  },
  {
    id: 'artist-hania',
    name: 'Hania Malik',
    role: 'Senior Hair Couture Stylist',
    specialty: 'Precision cuts, Keratin smoothing & red carpet blowouts',
    experienceYears: 8,
    bio: 'Expert in textured cuts and voluminous blowouts, delivering effortless bounce and long-lasting smoothness.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 195,
  },
  {
    id: 'artist-sehrish',
    name: 'Sehrish Khan',
    role: 'Master Nail Artisan & Spa Specialist',
    specialty: 'Russian e-file manicures & bespoke gel nail art',
    experienceYears: 6,
    bio: 'Meticulous perfectionist in sterile dry cuticle detailing, architectural nail shaping, and long-wear European gel overlays.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 140,
  },
  {
    id: 'artist-fatima',
    name: 'Fatima Naqvi',
    role: 'Senior Occasion & Red Carpet Makeup Artist',
    specialty: 'Nikkah soft glam, evening eyes & photography finishes',
    experienceYears: 10,
    bio: 'Renowned for radiant minimalism, soft-focused smoke eyes, and feather-light foundation that looks immaculate in natural daylight.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 185,
  },
];

export const addons: Addon[] = [
  {
    id: 'addon-scalp-booster',
    name: 'Kerastase Intensive Scalp Detox Booster',
    pricePKR: 2500,
  },
  {
    id: 'addon-eye-patch',
    name: '24K Collagen Hydrating Eye Patch Treatment',
    pricePKR: 1500,
  },
  {
    id: 'addon-palette',
    name: 'Deluxe Touch-Up Mini Palette',
    pricePKR: 3500,
  },
];

// Helper to compute dates dynamically in local time (Asia/Karachi)
const computeLocalDate = (dayOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const initialAppointments: Appointment[] = [
  {
    id: 'LX-8901',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    customerName: 'Ayesha Kamal',
    customerPhone: '+92 301 555 4920',
    customerEmail: 'ayesha.kamal@example.com',
    serviceId: 'hair-balayage-gloss',
    artistId: 'artist-zara',
    date: computeLocalDate(-3),
    timeSlot: '11:00 AM',
    mode: 'studio',
    notes: 'Prefers cool ash undertones with honey ends.',
    status: 'completed',
    totalPricePKR: 30500,
    addonIds: ['addon-scalp-booster'],
  },
  {
    id: 'LX-8902',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    customerName: 'Zainab Rehman',
    customerPhone: '+92 322 884 1029',
    customerEmail: 'zainab.r@example.com',
    serviceId: 'nails-spa-pedicure',
    artistId: 'artist-sehrish',
    date: computeLocalDate(-1),
    timeSlot: '04:00 PM',
    mode: 'studio',
    notes: 'Flight delay caused cancellation.',
    status: 'cancelled',
    totalPricePKR: 4500,
    addonIds: [],
  },
  {
    id: 'LX-8903',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    customerName: 'Maryam Bilgrami',
    customerPhone: '+92 333 421 9870',
    customerEmail: 'maryam.b@example.com',
    serviceId: 'skin-hydrafacial',
    artistId: 'artist-ayla',
    date: computeLocalDate(0),
    timeSlot: '02:00 PM',
    mode: 'studio',
    notes: 'Sensitive skin barrier protocol requested.',
    status: 'confirmed',
    totalPricePKR: 15500,
    addonIds: ['addon-eye-patch'],
  },
  {
    id: 'LX-8904',
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    customerName: 'Dr. Fatima Abbasi',
    customerPhone: '+92 300 918 2741',
    customerEmail: 'f.abbasi@example.com',
    serviceId: 'bridal-royal-barat',
    artistId: 'artist-mahnoor',
    date: computeLocalDate(1),
    timeSlot: '12:00 PM',
    mode: 'studio',
    notes: 'Private suite booked for bride and mother. Heavy antique crimson velvet dupatta.',
    status: 'confirmed',
    totalPricePKR: 70000,
    addonIds: ['addon-eye-patch, addon-palette'],
  },
  {
    id: 'LX-8905',
    createdAt: new Date().toISOString(),
    customerName: 'Sanaullah Durrani',
    customerPhone: '+92 345 612 8839',
    customerEmail: 'sana.durrani@example.com',
    serviceId: 'home-glam-duo',
    artistId: 'artist-fatima',
    date: computeLocalDate(2),
    timeSlot: '05:30 PM',
    mode: 'home',
    homeAddress: 'House 42, Street 18, Sector F-7/2, Islamabad',
    notes: 'Evening gala styling. Ring security gate intercom upon arrival.',
    status: 'pending',
    totalPricePKR: 25500,
    addonIds: ['addon-palette'],
  },
];

export const reviews: Review[] = [
  {
    id: 'rev-01',
    author: 'Nimra Chaudhry',
    city: 'Islamabad',
    serviceName: 'Royal Barat Couture',
    rating: 5,
    comment:
      'Luxeora Studio gave me the calmest, most magical wedding morning imaginable. Having a private suite in F-6 with Mahnoor and the team meant zero stress, complete privacy, and makeup that did not budge through 8 hours of photography.',
    date: '2026-09-28',
    verifiedVisit: true,
  },
  {
    id: 'rev-02',
    author: 'Samina Jahangir',
    city: 'Islamabad',
    serviceName: 'Balayage & Gloss',
    rating: 5,
    comment:
      'Zara is unmatched in Pakistan for French balayage. My dark hair transitioned into the softest melted caramel without any brassiness or damage. The salon ambiance is serene and beautifully quiet.',
    date: '2026-10-02',
    verifiedVisit: true,
  },
  {
    id: 'rev-03',
    author: 'Anum Khokhar',
    city: 'Rawalpindi',
    serviceName: 'Hydrafacial Radiance',
    rating: 5,
    comment:
      'Dr. Ayla took time to analyze my skin barrier before touching a machine. The Hydrafacial left my face intensely clean, plump, and luminous. Worth traveling from Rawalpindi for.',
    date: '2026-10-05',
    verifiedVisit: true,
  },
  {
    id: 'rev-04',
    author: 'Hiba Sheraz',
    city: 'Islamabad',
    serviceName: 'Gel Manicure',
    rating: 5,
    comment:
      'Sehrish does true Russian manicures with medical-grade sterile tools. The cuticle clean-up was painless and so clean. Three weeks later and my polish has not chipped an ounce.',
    date: '2026-10-08',
    verifiedVisit: true,
  },
  {
    id: 'rev-05',
    author: 'Mehak Rizvi',
    city: 'Islamabad',
    serviceName: 'Glam at Home (Hair + Makeup)',
    rating: 5,
    comment:
      'Their At-Home concierge is extraordinary. The artists arrived 10 minutes early at our F-7 residence with lighted studio mirrors and fresh sanitized brushes. Flawless look for our family dinner.',
    date: '2026-10-10',
    verifiedVisit: true,
  },
  {
    id: 'rev-06',
    author: 'Mariam Zubair',
    city: 'Rawalpindi',
    serviceName: 'Nikkah Soft Glam',
    rating: 5,
    comment:
      'Understated luxury at its finest. Fatima created the softest petal skin and delicate winged eyes for my morning Nikkah. The compliments have not stopped.',
    date: '2026-10-11',
    verifiedVisit: true,
  },
];

export const gallery: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Heirloom Crimson Barat Bride',
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Mahnoor Tariq',
    description: 'Traditional crimson velvet ensemble with warm gold lids and velvet crimson lips.',
  },
  {
    id: 'gal-02',
    title: 'Sunlit Caramel French Balayage',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Zara Qureshi',
    description: 'Dimensional warm honey highlights hand-painted over dark espresso natural base.',
  },
  {
    id: 'gal-03',
    title: 'Nikkah Pearl Radiant Complexion',
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Fatima Naqvi',
    description: 'Glass-finish skin, feathered brows, and pearlescent blush draping for daytime Nikkah.',
  },
  {
    id: 'gal-04',
    title: 'The Private Bridal Sanctuary Suite',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    description: 'Architectural secluded suite featuring warm amber mood lights and plush velvet seating.',
  },
  {
    id: 'gal-05',
    title: '24K Gold Cellular Dermal Infusion',
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Dr. Ayla Siddiqui',
    description: 'Clinical hydration and vortex extraction delivering instant high-definition clarity.',
  },
  {
    id: 'gal-06',
    title: 'Pastel Valima Ethereal Silhouette',
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Mahnoor Tariq',
    description: 'Sculpted dewy makeup designed to complement silver-grey and champagne bridal crystals.',
  },
  {
    id: 'gal-07',
    title: 'Minimalist Russian Almond Nails',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Sehrish Khan',
    description: 'Flawless dry cuticle detailing with milky sheer ombre and subtle gold flake accents.',
  },
  {
    id: 'gal-08',
    title: 'Silk Press & Hollywood Waves',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Hania Malik',
    description: 'Thermal mirror-shine blowout finished with sculpted Hollywood waves.',
  },
  {
    id: 'gal-09',
    title: 'Red Carpet Matte Bronze Contour',
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
    artistName: 'Fatima Naqvi',
    description: 'Warm terracotta tones with smoky diffused shadow and nude silk pout.',
  },
  {
    id: 'gal-10',
    title: 'Sanctuary Tea Lounge & Refreshments',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    description: 'Calming consultation lounge serving artisan Kashmiri kahwa and herbal infusions.',
  },
];
