import { ServiceItem, PricingPackage, ReviewItem, GalleryItem, CateringFoodItem } from './types';

export const HERO_IMAGE_PATH = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80';

// Redesigned 8 premium decoration services as requested
export const servicesData: ServiceItem[] = [
  {
    id: 'wedding_decor',
    name: 'Wedding Decoration',
    shortDescription: 'Grand mandap structures, bespoke floral pathways, divine stage setups, and majestic gate entries for royal weddings.',
    fullDescription: 'Our hallmark wedding experience combines traditional heritage aesthetics with contemporary luxury. We craft breathtaking flower mandaps, ornate stage backdrops, luxurious aisle runners, and welcoming arches tailored to your unique theme.',
    highlights: [
      'Bespoken, hand-carved mandaps and holy alters',
      'Premium fresh floral installations (Roses, Lilies, Orchids)',
      'Royal walkthrough aisle carpet setups',
      'Ambient spotlighting and dynamic stage effects'
    ],
    icon: 'Sparkles',
    basePrice: 150000
  },
  {
    id: 'birthday_decor',
    name: 'Birthday Decoration',
    shortDescription: 'Whimsical themes, colorful backdrop frames, interactive balloon structures, and custom dessert table corners.',
    fullDescription: 'Make birthdays outstanding for any age! From enchanted fairy forest arches and cartoon character panels for children to sleek gold-sequin walls and premium neon bar installations for adults, we build fun, playful environments.',
    highlights: [
      'Stunning organic balloon arches and clusters',
      'Thematic printed panels and custom text banners',
      'Aesthetic dessert tables with matching linen',
      'Interactive visual photo booths with fun props'
    ],
    icon: 'Gift',
    basePrice: 45000
  },
  {
    id: 'engagement_decor',
    name: 'Engagement Decoration',
    shortDescription: 'Elegant stages, delicate rose arches, geometric ring exchange nests, and candlelit walkthroughs.',
    fullDescription: 'An intimate occasion deserves stunning visual warmth. Our team designs gorgeous minimalist staging, bespoke circular or hexagonal flower rings, romantic pastel drapes, and soft lighting setups that highlight your ring exchange moment.',
    highlights: [
      'Chic hexagonal or circular floral hoops',
      'Soft pastel drapes (Peach, Ivory, Blushing pink)',
      'Romantic candle lantern paths',
      'Beautiful couple sofa styling options'
    ],
    icon: 'Heart',
    basePrice: 75000
  },
  {
    id: 'corporate_decor',
    name: 'Corporate Event Decoration',
    shortDescription: 'Sleek stage configs, modern geometric panels, professional branding elements, and crisp backdrop lighting.',
    fullDescription: 'Elevate your brand presence at conferences, keynotes, award ceremonies, and annual galas. We construct neat, sleek, geometric stages, customized step-and-repeat banner arrays, professional registration desks, and VIP lounges.',
    highlights: [
      'Advanced high-definition branding backdrops',
      'Modern metal and geometric panel stages',
      'Custom registration desks and podium decor',
      'Pristine VIP lounge setups with matching branding'
    ],
    icon: 'Briefcase',
    basePrice: 110000
  },
  {
    id: 'baby_shower_decor',
    name: 'Baby Shower Decoration',
    shortDescription: 'Delightful pastel cloud ceilings, floral cradles, gender-reveal balloon cascades, and custom swings.',
    fullDescription: 'Celebrate new beginnings with whimsical cuteness. We curate soft, cozy designs centering dreamlike pastel colors, beautiful floral cradles, decorated swings for the parents, and charming cloud-like overhead hangings.',
    highlights: [
      'Handcrafted swings covered with sweet gypsophila',
      'Gender-reveal transition balloon drops',
      'Beautiful pastel colors (Eggshell, Powder Blue, Lavender)',
      'Whimsical clouds, stars, and moon overhead hangings'
    ],
    icon: 'Sparkles',
    basePrice: 50000
  },
  {
    id: 'anniversary_decor',
    name: 'Anniversary Decoration',
    shortDescription: 'Romantic candlelit pathways, photo-memory walk panels, opulent gold tablescapes, and rose backdrops.',
    fullDescription: 'Honoring years of love requires timeless elegance. We design lovely candle-adorned dining areas, suspended fairy-light curtains, red-carpet photo lines displaying historical couple photos, and beautiful floral stage pieces.',
    highlights: [
      'Historical photo walkboards and memory frames',
      'Candlelit paths and table runners',
      'Floating floral centerpieces',
      'Opulent gold and crimson color palettes'
    ],
    icon: 'Calendar',
    basePrice: 65000
  },
  {
    id: 'reception_decor',
    name: 'Reception Decoration',
    shortDescription: 'Glamorous reception backdrops, crystal chandeliers, grand sofa settings, and majestic ambient illumination.',
    fullDescription: 'Set a stunning final impression. Our reception designs focus on glittering luxury—combining suspended crystal chandeliers, massive floral stage backdrops, sparkling pyrotechnics, and glamorous, modern stage seats for couples.',
    highlights: [
      'Suspended crystal chandeliers and wisteria grids',
      'Bespoke grand couple sofa podium designs',
      'Cold fireworks and heavy fog systems',
      'Glow-in-the-dark LED neon integrations'
    ],
    icon: 'Award',
    basePrice: 125000
  },
  {
    id: 'festival_decor',
    name: 'Festival Decoration',
    shortDescription: 'Traditional fresh marigold garlands, handcrafted brass clay diyas, ethnic drapes, and temple bells.',
    fullDescription: 'Embrace religious and ethnic joy with authentic Indian festive setups. We dress courtyards, entrances, and stages with vibrant yellow marigolds, traditional mango leaves, brass elements, warm oil lamps, and beautiful fabric hangings.',
    highlights: [
      'Fresh orange and gold marigold walls',
      'Hand-designed flower rangolis and brass bowls',
      'Authentic ethnic drapes and suspended lamps',
      'Temples bells and warm fairy-light streams'
    ],
    icon: 'Compass',
    basePrice: 55000
  }
];

// 3 premium package bundles for users
export const packagesData: PricingPackage[] = [
  {
    id: 'basic',
    name: 'Elegant Simplicity',
    price: 185000,
    guestsCount: 'Up to 150 guests',
    description: 'Perfect for intimate family functions, birthdays, or elegant pre-wedding rituals with high visual polish.',
    features: [
      'Vibrant Stage Backdrop Setup with Floral Highlights',
      'Classic Entryway Arch with Soft Fairy Lights',
      'Professional Lighting Rig (LED Parcans & Spotlights)',
      '1 On-Site Supervisor to coordinate timeline',
      'Capping at 150 RSVP guests maximum'
    ],
    recommended: false
  },
  {
    id: 'premium',
    name: 'Royal Majesty',
    price: 345000,
    guestsCount: '150 - 350 guests',
    description: 'Our signature package. A luxurious combination of grand decoration setups, crystal lighting, and custom layouts.',
    features: [
      'Bespoken Mandap or Stage Theme Backdrop (Floral & Fabric)',
      'Grand Visual Walkway Entrance with Rose Petal Runners',
      'Intelligent LED Uplighting & Stage Moving Heads',
      'Dedicated Event Director & On-Site Coordinating Crew',
      'Customized seating, stage sofas, and table linens',
      'Glow-in-the-dark LED accent integration'
    ],
    recommended: true
  },
  {
    id: 'luxury',
    name: 'Imperial Luxury',
    price: 595000,
    guestsCount: '350 - 700 guests',
    description: 'An elite bespoke event experience. Includes complete palace or premium destination setups with supreme floral trails.',
    features: [
      'Elite Premium floral installations across the entire venue',
      'Cascading crystal chandeliers or hanging wisteria curtains',
      'Full-stage backdrop with custom wooden craft panels',
      'High-end lighting design with cold flares and fog machines',
      'Grand red-carpet pathways with entrance floral archways',
      'Full End-to-End venue logistics support and seating maps'
    ],
    recommended: false
  }
];

// Excellent Reviews with star ratings and profile icons
export const reviewsData: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Prisha & Rahil Jadeja',
    role: 'Bride & Groom (Grand Palace Wedding)',
    rating: 5,
    comment: 'The Blue Eyes made our dream wedding a absolute fairytale! The wedding main mandap and floral walkway were magnificent, reflecting ultimate luxury. A perfect final year score for their professionalism!',
    date: 'February 12, 2026',
    avatar: 'PR'
  },
  {
    id: 'rev-2',
    name: 'Dr. Sandeep Malik',
    role: 'Father of the Bride (Royal Reception)',
    rating: 5,
    comment: 'I entrusted my daughter’s grand reception to The Blue Eyes team. The stage, the beautiful crystal lighting, and the warm welcome entry board exceeded all expectations. Flawless coordinates throughout.',
    date: 'April 29, 2026',
    avatar: 'SM'
  },
  {
    id: 'rev-3',
    name: 'Anjali Sharma',
    role: 'Corporate Gala Planner (Tech Summit Meet)',
    rating: 5,
    comment: 'Spectacular modular stage design and branding boards. Finding an event coordinator with this level of meticulous eye for detail is rare. The corporate setup was crisp and elegant.',
    date: 'May 18, 2026',
    avatar: 'AS'
  },
  {
    id: 'rev-4',
    name: 'Kabir & Meera Roy',
    role: 'Parents (Intimate Baby Shower)',
    rating: 5,
    comment: 'The pastel cloud backdrop and floral cradle swing they made for our daughter-to-be baby shower was adorable! Highly creative decorators and very easy to book online.',
    date: 'June 05, 2026',
    avatar: 'KM'
  }
];

// Diversified gallery containing exactly 10 categories as requested.
// Show at least 3-4 unique realistic images per category. No duplicate images!
export const galleryData: GalleryItem[] = [
  // 1. Wedding Decorations ('wedding') - 4 unique images
  {
    id: 'gal-wed-1',
    title: 'Grand Palace Mandap Setup',
    category: 'wedding',
    imageUrl: 'https://files.catbox.moe/un7phl.jpg',
    description: 'A breathtakingly grand royal wedding mandap featuring intricate floral designs, soft gold drapery, and a royal carpet pathway.'
  },
  {
    id: 'gal-wed-2',
    title: 'Oceanfront Sunset Floral Altar',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'A premium circular altar wedding canopy sitting beautifully by the ocean lawn with orchids, lilies, and floating white drapes.'
  },
  {
    id: 'gal-wed-3',
    title: 'Majestic Palace Marriage Stage',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    description: 'An elite stage setup with heavy pink and white rose arches, grand crystal chandeliers, and luxurious golden couple chairs.'
  },
  {
    id: 'gal-wed-4',
    title: 'Bespoke Vintage Forest Canopy',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    description: 'A romantic outdoor forest wedding altar framed with high-end rustic oak structures, flowing cream fabrics, and hanging wisteria.'
  },

  // 2. Birthday Decorations ('birthday') - 4 unique images
  {
    id: 'gal-bday-1',
    title: 'Vibrant Organic Balloon Cascade',
    category: 'birthday',
    imageUrl: 'https://files.catbox.moe/0xrpog.jpg',
    description: 'A colorful, playful birthday installation centering an organic balloon arch, golden confetti, and themed character frames.'
  },
  {
    id: 'gal-bday-2',
    title: 'Sequin Glow & Custom Neon Sign',
    category: 'birthday',
    imageUrl: 'https://files.catbox.moe/9hoa6v.jpg',
    description: 'A premium birthday party backdrop with a dazzling gold-sequin wall, custom party neon lights, and multi-colored floating streamers.'
  },
  {
    id: 'gal-bday-3',
    title: 'Royal Birthday Banquet table',
    category: 'birthday',
    imageUrl: 'https://files.catbox.moe/ozuq2p.jpg',
    description: 'A luxury kid or adult birthday display table with tiered dessert platforms, custom floral centerpieces, and glowing candles.'
  },
  {
    id: 'gal-bday-4',
    title: 'Enchanted Teepee & Pastel Ball Pit',
    category: 'birthday',
    imageUrl: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=800&q=80',
    description: 'A wonderful colorful canvas teepee tent for children’s birthday parties, decorated with sweet pillows and pastel balloon vines.'
  },

  // 3. Engagement Decorations ('engagement') - 4 unique images
  {
    id: 'gal-eng-1',
    title: 'Premium Velour Ring Exchange Nest',
    category: 'engagement',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    description: 'A close-up of a luxury satin and velvet ring presentation tray nestled inside fresh white roses and sparkling crystals.'
  },
  {
    id: 'gal-eng-2',
    title: 'Indian Grass Circular Arch',
    category: 'engagement',
    imageUrl: 'https://files.catbox.moe/rbnzih.jpg',
    description: 'A modern bohemian concentric circular ring arch heavily decorated with pampas plumes and eucalyptus leaves for ring ceremonies.'
  },
  {
    id: 'gal-eng-3',
    title: 'Romantic  Rose Canopy',
    category: 'engagement',
    imageUrl: 'https://files.catbox.moe/99qjta.jpg',
    description: 'Delicate light pink curtains combined with cascading white wisteria flower strings and a sleek couple exchange stage.'
  },
  {
    id: 'gal-eng-4',
    title: 'Starlit Canopy Elegances',
    category: 'engagement',
    imageUrl: 'https://files.catbox.moe/364zce.jpg',
    description: 'An enchanting outdoor setup featuring flowing drapes and warm fairy lights, creating a magical celebration atmosphere.'
  },

  // 4. Corporate Events ('corporate') - 4 unique images
  {
    id: 'gal-corp-1',
    title: 'Sleek Keynote Seminar Stage',
    category: 'corporate',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    description: 'Professional high-contrast panel stage incorporating modern blue LED uplighting, digital podiums, and clean branding board frames.'
  },
  {
    id: 'gal-corp-2',
    title: 'Grand Conference Congress Hall',
    category: 'corporate',
    imageUrl: 'https://files.catbox.moe/rw1nkc.jpg',
    description: 'A majestic corporate keynote layout featuring precise multi-screen presentations, panel discussion chairs, and clean lines.'
  },
  {
    id: 'gal-corp-3',
    title: 'Dynamic indian Night Staging',
    category: 'corporate',
    imageUrl: 'https://files.catbox.moe/s4snmg.jpg',
    description: 'A high-impact corporate award stage illuminated by custom spotlights, moving head lasers, and high-tech backdrops.'
  },
  {
    id: 'gal-corp-4',
    title: 'Executive Branding Lounge Corner',
    category: 'corporate',
    imageUrl: 'https://files.catbox.moe/zohbsr.png',
    description: 'A clean, minimalist executive networking lounge styled with premium modern velvet stools and corporate logo placements.'
  },

  // 5. Baby Shower Events ('babyshower') - 4 unique images
  {
    id: 'gal-baby-1',
    title: 'Sweet Floral Garland Wood Cradle',
    category: 'babyshower',
    imageUrl: 'https://files.catbox.moe/u53p8q.jpg',
    description: 'A handcrafted baby cradle fully wrapped with fresh white margheritas, baby breath, and gold satin satin drapes.'
  },
  {
    id: 'gal-baby-2',
    title: 'Dreamy Teddy Baby Shower Setup',
    category: 'babyshower',
    imageUrl: 'https://files.catbox.moe/gl1zp5.jpg',
    description: 'An adorable sky-theme shower setup with suspended fluffy cotton clouds, pastel-blue balloons, and giant plush teddies.'
  },
  
  // 6. Anniversary Celebrations ('anniversary') - 4 unique images
  {
    id: 'gal-ann-1',
    title: 'Romantic Candlelit Pathway Sensation',
    category: 'anniversary',
    imageUrl: 'https://files.catbox.moe/psdpwf.jpg',
    description: 'A dreamy couple anniversary walkway surrounded by hundreds of floating cylinder candles and climbing crimson roses.'
  },
  {
    id: 'gal-ann-2',
    title: 'Rose Wall Memories Backdrop',
    category: 'anniversary',
    imageUrl: 'https://files.catbox.moe/k5jgw6.jpg',
    description: 'An elegant celebration stage featuring intertwined floral heart arches, vibrant red roses, and romantic lighting, creating a perfect backdrop for memorable moments.'
  },
  {
    id: 'gal-ann-3',
    title: 'Fairy-light Forest Canopy Dining',
    category: 'anniversary',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    description: 'A cozy anniversary outdoor dinner setting below majestic oak trees wrapped completely with shimmering fairy strings.'
  },
  {
    id: 'gal-ann-4',
    title: 'Luxury Glass Marquee Corridor',
    category: 'anniversary',
    imageUrl: 'https://files.catbox.moe/op2car.jpg',
    description: 'An evening celebration inside a crystal glasshouse structure adorned with warm table candelabras and modern white drapes.'
  },

  // 7. Reception Decorations ('reception') - 4 unique images
  {
    id: 'gal-rec-1',
    title: 'Royal Floral Reception Stage',
    category: 'reception',
    imageUrl: 'https://files.catbox.moe/pmd45w.jpg',
    description: 'An elegant reception stage featuring a luxurious floral arch, crystal chandeliers, premium seating, and sophisticated décor for unforgettable celebrations.'
  },
  {
    id: 'gal-rec-2',
    title: 'Grand Champagne Tower Stage',
    category: 'reception',
    imageUrl: 'https://files.catbox.moe/sknx59.jpg',
    description: 'A glowing champagne fountain positioned beside the couple stage, framed by spectacular color-changing laser backlighting.'
  },
  
  //haldi decorations
  { 
    id: 'gal-haldi-1',
    title: 'Golden Haldi Bliss Setup',
    category: 'haldi',
    imageUrl: 'https://files.catbox.moe/rn9evn.jpg',
    description: 'A vibrant haldi celebration backdrop featuring marigold garlands, elegant drapes, floral arrangements, and traditional décor that radiates joy and cultural charm.',
  },
  { 
    id: 'gal-haldi-2',
    title: 'Nature-Inspired Haldi Haven',
    category: 'haldi',
    imageUrl: 'https://files.catbox.moe/k3a3k2.jpg',
    description: 'Blending natural greenery with traditional floral elements, this haldi décor creates a serene and festive atmosphere perfect for joyful pre-wedding rituals.',
  },
  
    // 8.sangeet decorations
  { 
    id: 'gal-sangeet-1',
    title: 'Moonlight Sangeet Spectacle',
    category: 'sangeet',
    imageUrl: 'https://files.catbox.moe/m8zy47.jpg',
    description: 'An enchanting evening sangeet setup featuring dazzling lights, elegant stage décor, vibrant floral accents, and a lively atmosphere for unforgettable musical celebrations.',
  },
  //9.mehendi decorations
 { 
    id: 'gal-mehendi-1',
    title: 'Mehendi Garden Elegance',
    category: 'mehendi',
    imageUrl: 'https://files.catbox.moe/f7vrd8.jpg',
    description: 'vibrant mehendi celebration setup featuring colorful floral décor, traditional elements, and lively seating arrangements that create a joyful pre-wedding atmospher.',
  },
  

];

// Food categories remain unchanged for the custom PackagesCalculator component
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
