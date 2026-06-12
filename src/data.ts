import { ServiceItem, PricingPackage, ReviewItem, GalleryItem, CateringFoodItem } from './types';

export const HERO_IMAGE_PATH = '/src/assets/images/luxury_wedding_hero_1781245155890.jpg';

export const servicesData: ServiceItem[] = [
  {
    id: 'decor',
    name: 'Event Decoration',
    shortDescription: 'Bespoke grand mandap setups, floral stage design, ambient smart lighting, and curated theme backdrops.',
    fullDescription: 'Our design maestros craft visually arresting, thematic environments. From whimsical fairytale wedding aisles to premium corporate stage backdrops, we cover flowers, custom drapes, mood lighting, and modern geometric structures tailored to your dreams.',
    highlights: [
      'Fresh floral installations from premium growers',
      'Thematic tablescapes with custom linen and premium dinnerware',
      'Intelligent LED lighting, stage cold fires, and fog setups',
      'Fully customizable sangeet backdrops & grand entrance gates'
    ],
    icon: 'Sparkles',
    basePrice: 75000
  },
  {
    id: 'planning',
    name: 'Event Planning & Coordination',
    shortDescription: 'End-to-end milestone structuring, vendor negotiations, minute-by-minute execution checklists.',
    fullDescription: 'Relax and immerse yourself in your key moments. Our professional planners guide you through budget optimization, exhaustive itinerary mapping, guest tracking, and dry-run rehearsals to guarantee a flawlessly executed day.',
    highlights: [
      'Personalized dedicated lead coordinator & on-site crew',
      'Extensive visual dashboard & timeline tracking guides',
      'Vendor negotiation, contracts, and timing setup',
      'Crisis resolution and detailed schedules'
    ],
    icon: 'Calendar',
    basePrice: 50000
  },
  {
    id: 'sangeet',
    name: 'Cultural Activities & Sangeet',
    shortDescription: 'Professional choreography, celebrity artist management, sound integration, and energetic dance teams.',
    fullDescription: 'Turn your sangeet night into a Bollywood style gala. We manage professional audio-visual setups, recruit high-energy choreographers for family rehearsals, coordinate anchors, and hire live musicians or famous DJs.',
    highlights: [
      'Tailored choreography matching varying age groups',
      'Professional sound systems, high-definition LED screens & mics',
      'Live orchestra, instrumentalists, and celebrity artist scheduling',
      'Special grand bridal and groom entering sequence directions'
    ],
    icon: 'Music',
    basePrice: 60000
  },
  {
    id: 'photo',
    name: 'Photography & Videography',
    shortDescription: 'Premium wedding films, candid storytelling portraitures, and modern aerial cinematography.',
    fullDescription: 'Preserve your precious moments into eternal art. Our crew utilizes high-definition cinematic tools, advanced drone gears, and premium portrait lenses to craft story-driven videos and photos with clean professional editing.',
    highlights: [
      'Exquisite, non-intrusive candid photographers & film-makers',
      '4K cinematic highlight videos, drone shots, and teasers',
      'High-grade premium coffee-table physical album layouts',
      'Pre-wedding / post-wedding outdoor location shoots included'
    ],
    icon: 'Camera',
    basePrice: 85000
  },
  {
    id: 'catering',
    name: 'Gourmet Catering Services',
    shortDescription: 'Custom multi-cuisine buffet spreads, creative live interactive counters, and exquisite service staff.',
    fullDescription: 'A gastronomic trail designed to please the senses. We bring culinary experts covering authentic regional specialties, continental fusion, exotic desserts, and live showmanship counters with pristine presentation standards.',
    highlights: [
      'Authentic local, Mughlai, Italian, Asian, and dessert spreads',
      'Interactive live counters (Teppanyaki, wood-fired pizzas, mocktails)',
      'Highly professional silver-service uniformed wait staff',
      'Custom menus tailored for vegetarian, vegan, or special diets'
    ],
    icon: 'UtensilsCrossed',
    basePrice: 90000
  },
  {
    id: 'destination',
    name: 'Destination Planning',
    shortDescription: 'Palace, beach, or hill-station event management with logistical coordination & hospitality help.',
    fullDescription: 'Whether dreaming of a grand Udaipur palace wedding, a breezy Goa sun-kissed beach bash, or a cool mountain retreat, we operate specialized logistics, host guest accommodations, and customize structures remotely.',
    highlights: [
      'Full venue reconnaissance and custom tie-ups with luxury resorts',
      'Guest airport transfers, concierge help, and welcome packages',
      'Multi-vendor logistics across domestic and international locations',
      'Custom-suited beach permits and local council clearances'
    ],
    icon: 'MapPin',
    basePrice: 120000
  },
  {
    id: 'video',
    name: 'Creative Video Editing',
    shortDescription: 'Digital save-the-dates, cinematic family trailers, and immersive social-media reels.',
    fullDescription: 'Captivate your guests long before the event begins. We produce premium customized motion invitations, real-time event recap reels during Sangeet/Wedding intervals, and specialized documentary style post-wedding movies.',
    highlights: [
      '3D digital motion invite designs & WhatsApp teasers',
      'Same-day-edit (SDE) teaser loops played at receptions',
      'Premium sound-mixing & professional color grading',
      'Short vertical-format highlight reels optimized for Instagram'
    ],
    icon: 'Film',
    basePrice: 35000
  },
  {
    id: 'admin',
    name: 'Admin & Guest Desk Support',
    shortDescription: 'RSVP systems, hospitality desks, seat alignment, and personalized concierge support.',
    fullDescription: 'Treat your family and guests to unparalleled hospitality. Our desk team maintains the RSVP databases, manages hotel check-ins, sets up physical greeting points, and implements guest allocations cleanly.',
    highlights: [
      'Dedicated warm greeters stationed at hotel/venue entry desks',
      'Digital RSVP tracking and seating chart organization screens',
      'Personalized emergency gift bag kits (makeup, safety pins, medicines)',
      '24/7 dedicated guest helpline during the entire event weekend'
    ],
    icon: 'Users',
    basePrice: 30000
  }
];

export const packagesData: PricingPackage[] = [
  {
    id: 'basic',
    name: 'Elegant Basic',
    price: 185000,
    guestsCount: 'Up to 150 guests',
    description: 'Perfect for intimate family functions, sangeet gatherings, or elegant pre-wedding rituals with high visual polish.',
    features: [
      'Exquisite Stage & Entry Arch Design with Fresh Accents',
      'Standard Stage Lighting & Ambient LEDs',
      'Experienced Event Coordinator & On-Site Supervisor',
      'Candid & Traditional Photography (Digital Deliverables)',
      '1 Professional Digital Video Highlight (3 minutes)',
      'Standard Multi-cuisine Catering Setup'
    ],
    recommended: false
  },
  {
    id: 'premium',
    name: 'Royal Premium',
    price: 345000,
    guestsCount: '150 - 350 guests',
    description: 'Our signature event management. A luxurious combination of heavy decoration, cinematic trailers, choreography, and premium service.',
    features: [
      'Grand Theme Backdrop Layout (Floral/Fabric mix)',
      'High-grade Sound Setup with customized Lighting design',
      'Dedicated Choreography team for family sangeet',
      'Comprehensive Cinematic wedding film & Candid portraits',
      'Premium Silver-service buffet with 2 live show counters',
      'Dedicated Admin RSVP & Guest welcome concierge desk'
    ],
    recommended: true
  },
  {
    id: 'luxury',
    name: 'Imperial Luxury',
    price: 595000,
    guestsCount: '350 - 700 guests',
    description: 'An elite bespoke event experience. Includes complete palace or premium destination setups, 4K multi-camera drone coverage, and high gourmet food trails.',
    features: [
      'Elite Luxury floral installations & entrance walk trails',
      'Full-stage Led screens, special entering effect cold-pyros',
      'Celebrity Anchor/Emcee & Choreographed sangeet stars',
      'Supreme 4K multi-camera cinematic films + luxury Album',
      'Gourmet Multi-cuisine catering with 5 interactive live counters',
      'Same-day event teaser edits shown during dinner',
      'Full End-to-End hospitality setup and airport pickups'
    ],
    recommended: false
  }
];

export const reviewsData: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Prisha & Rahil',
    role: 'Bride & Groom (Goa Beach Wedding)',
    rating: 5,
    comment: 'The Blue Eye Events made our dream beach wedding a reality! The decor was absolutely magnificent, reflecting the beautiful ocean waves with stunning ivory roses. Every single guest complimented the elite catering.',
    date: 'February 12, 2026',
    avatar: 'PR'
  },
  {
    id: 'rev-2',
    name: 'Dr. Sandeep Malik',
    role: 'Father of the Bride (Grand Sangeet)',
    rating: 5,
    comment: 'I entrusted my daughter’s sangeet and marriage to the Blue Eye Events. Their coordination was seamless. The choreographers, the stage design with professional LED systems, and the admin desk support were exemplary. Highly recommended!',
    date: 'April 29, 2026',
    avatar: 'SM'
  },
  {
    id: 'rev-3',
    name: 'Anjali Sharma',
    role: 'Corporate Gala Planner (Milestone Sangeet)',
    rating: 5,
    comment: 'Exceptional professionalism. Finding an event planner that values deadlines and budgets while generating pristine, artistic output is rare. The floral decor, modern video editing, and host desks were fantastic.',
    date: 'May 18, 2026',
    avatar: 'AS'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Glittering Glass Canopy Canopy',
    category: 'weddings',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    description: 'Stunning glass structure aligned under warm fairytale lighting setups.'
  },
  {
    id: 'gal-2',
    title: 'High-Energy Sangeet Choreography',
    category: 'sangeet',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    description: 'Dynamic family dance performance with coordinated lighting panels.'
  },
  {
    id: 'gal-3',
    title: 'Pre-Wedding Candid Portraits',
    category: 'photography',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Groom and bride emotional smiles captured in natural evening glow.'
  },
  {
    id: 'gal-4',
    title: 'Exotic Teppanyaki Live Counter',
    category: 'catering',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh interactive premium culinary live counter for gourmands.'
  },
  {
    id: 'gal-5',
    title: 'Grand Regal Mandap Setup',
    category: 'decor',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    description: 'Warm gold and ivory floral mandap styled beside royal water bodies.'
  },
  {
    id: 'gal-6',
    title: 'Sunset Beach Wedding Setup',
    category: 'photography',
    imageUrl: 'https://files.catbox.moe/1ag1qe.jpg',
    description: 'Capturing A breathtaking beach wedding arrangement with elegant décor, floral accents, and a stunning sunset backdrop for a magical celebration.'
  },
  {
    id: 'gal-7',
    title: 'Classic Dessert Table Spread',
    category: 'catering',
    imageUrl: 'https://files.catbox.moe/fndbac.jpg',
    description: 'Premium curated selection of elegant macaroons, puddings, and cakes.'
  },
  {
    id: 'gal-8',
    title: 'Aerial Sangeet Drone Sweep',
    category: 'photography',
    imageUrl: 'https://files.catbox.moe/hsw34u.jpg',
    description: 'Capturing magnificent crowds during massive Bollywood level family tracks.'
  },
  {
    id: 'gal-9',
    title: 'Night Ceremony Lightning Design',
    category: 'photography',
    imageUrl: 'https://files.catbox.moe/r0gtv5.jpg',
    description: 'Capturinga magical night ceremony with lighting that truly glows and  Candlelight, uplighting, or fairy lights.'
  },
  {
    id: 'gal-10',
    title: 'Elegant Wedding Stage Decoration',
    category: 'photography',
    imageUrl: 'https://files.catbox.moe/99qjta.jpg',
    description: 'Capturinga a stunning wedding stage featuring elegant pink drapes, floral decorations, and warm lighting for a memorable celebration.'
  },
  {
    id: 'gal-11',
    title: 'Royal Floral Reception Stage',
    category: 'photography',
    imageUrl: 'https://files.catbox.moe/lp5dhh.jpg',
    description: 'Capturinga A sophisticated reception stage adorned with elegant floral décor, warm ambient lighting, and luxurious seating for unforgettable celebrations.'
  },
  {
    id: 'gal-12',
    title: 'Elegant Wedding Welcome Board',
    category: 'photography',
    imageUrl: 'https://files.catbox.moe/cb2xfx.jpg',
    description: 'Capturing A beautifully crafted welcome board with floral accents and warm lighting, creating a charming first impression for guests.'
  },
  
];

export const defaultCateringItems: CateringFoodItem[] = [
  // Welcome Drinks
  { id: 'fd-1', name: 'Fresh Mint Mojito', category: 'drink', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fd-2', name: 'Almond Mango Lassi', category: 'drink', tiers: ['premium', 'gourmet'] },
  { id: 'fd-3', name: 'Chilli Guava Sparkler', category: 'drink', tiers: ['premium', 'gourmet'] },
  { id: 'fd-4', name: 'Kashmiri Kahwa Tea', category: 'drink', tiers: ['gourmet'] },
  { id: 'fd-5', name: 'Royal Blue Lagoon Mocktail', category: 'drink', tiers: ['standard', 'premium', 'gourmet'] },
  
  // Starters
  { id: 'fs-1', name: 'Paneer Tikka Angare', category: 'starter', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fs-2', name: 'Hara Bhara Kabab', category: 'starter', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fs-3', name: 'Chicken Malai Tikka', category: 'starter', tiers: ['premium', 'gourmet'] },
  { id: 'fs-4', name: 'Amritsari Fish Fry', category: 'starter', tiers: ['gourmet'] },
  { id: 'fs-5', name: 'Crispy Lotus Stem in Plum Sauce', category: 'starter', tiers: ['gourmet'] },
  { id: 'fs-6', name: 'Tandoori Mushroom Duet', category: 'starter', tiers: ['premium', 'gourmet'] },

  // Mains
  { id: 'fm-1', name: 'Dal Makhani Bukhara', category: 'main', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fm-2', name: 'Paneer Butter Masala', category: 'main', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fm-3', name: 'Awadhi Veg Biryani with Roasted Raita', category: 'main', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fm-4', name: 'Handi Butter Chicken', category: 'main', tiers: ['premium', 'gourmet'] },
  { id: 'fm-5', name: 'Slow-cooked Mutton Rogan Josh', category: 'main', tiers: ['gourmet'] },
  { id: 'fm-6', name: 'Assorted Tandoori Breads (Naan/Roti)', category: 'main', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fm-7', name: 'Exotic Thai Green Curry with Jasmine Rice', category: 'main', tiers: ['gourmet'] },

  // Desserts
  { id: 'fde-1', name: 'Hot Gulab Jamun with Premium Vanilla', category: 'dessert', tiers: ['standard', 'premium', 'gourmet'] },
  { id: 'fde-2', name: 'Saffron Jalebi with Rabdi', category: 'dessert', tiers: ['premium', 'gourmet'] },
  { id: 'fde-3', name: 'Moong Dal Halwa in Pure Ghee', category: 'dessert', tiers: ['premium', 'gourmet'] },
  { id: 'fde-4', name: 'Gourmet Sizzling Brownie with Fudge', category: 'dessert', tiers: ['gourmet'] },
];

