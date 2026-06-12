import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ServiceDetailModal from './components/ServiceDetailModal';
import PackagesCalculator from './components/PackagesCalculator';
import BookingWizard from './components/BookingWizard';
import GalleryGrid from './components/GalleryGrid';
import ReviewsSection from './components/ReviewsSection';
import { servicesData, packagesData, HERO_IMAGE_PATH } from './data';
import { ServiceItem, PricingPackage } from './types';

// Import Icons cleanly
import {
  Sparkles,
  Calendar,
  Music,
  Camera,
  UtensilsCrossed,
  MapPin,
  Film,
  Users,
  ChevronRight,
  Calculator,
  Mail,
  Phone,
  Clock,
  Heart,
  Award,
  Compass,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2
} from 'lucide-react';

// Icon mapper for simple dynamic resolution
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Calendar,
  Music,
  Camera,
  UtensilsCrossed,
  MapPin,
  Film,
  Users,
};

export default function App() {
  // Global States
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['decor', 'planning', 'photo']);
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    packageName: string;
    guestCount: number;
    cateringTier: string;
    services: string[];
    cost: number;
    packageId: string;
    customMenu?: string[];
  } | null>(null);

  // Quick contact back message state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Toggle active service selection
  const handleToggleServiceId = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Trigger Booking wizard with specific context
  const handleInitiateBooking = (summary: {
    packageName: string;
    guestCount: number;
    cateringTier: string;
    services: string[];
    cost: number;
    packageId: string;
    customMenu?: string[];
  }) => {
    setBookingInitialData(summary);
    setIsBookingOpen(true);
  };

  // Trigger empty Booking from Navbar CTA
  const handleOpenGeneralBooking = () => {
    setBookingInitialData(null);
    setIsBookingOpen(true);
  };

  const handleOpenCalculatorTab = () => {
    const calcSec = document.getElementById('calculator');
    if (calcSec) {
      calcSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync stationary pricing card clicks with Calculator presets
  const handleSelectStaticPackage = (pkg: PricingPackage) => {
    // Scroll down to the calculator
    const calcSec = document.getElementById('calculator');
    if (calcSec) {
      calcSec.scrollIntoView({ behavior: 'smooth' });
    }
    // Set baseline calculator preset
    const presetBtn = document.getElementById(`calc-preset-${pkg.id}`);
    if (presetBtn) {
      presetBtn.click();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert('Kindly fill in all marked fields to send your request.');
      return;
    }
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMsg('');
    setTimeout(() => {
      setContactSuccess(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy">
      
      {/* 1. Header Navigation */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenCalculator={handleOpenCalculatorTab}
      />

      {/* 2. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Generated Premium Image Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE_PATH}
            alt="The Blue Eye Events Luxury Wedding Reception"
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Golden/Blue overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/35 blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-navy/45" />
        </div>

        {/* Hero Interactive Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-brand-white">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/15 border border-brand-gold/40 rounded-full animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-brand-gold">
                Elite Wedding & Celebration Designers
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none text-brand-ivory">
              Creating <span className="text-brand-gold font-serif">Unforgettable</span> Memories
            </h1>

            <p className="text-sm sm:text-lg text-brand-ivory/85 leading-relaxed max-w-2xl font-sans tracking-wide">
              From majestic palace marriages to energetic family sangeets, gourmet menu pathways, and digital cinematic photography—we structure every celebrate milestone with absolute visual perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-book-btn"
                onClick={handleOpenGeneralBooking}
                className="px-8 py-4 bg-brand-gold text-brand-navy font-mono text-xs font-bold tracking-wider rounded-full hover:bg-brand-gold-bright hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 uppercase flex items-center justify-center gap-2"
              >
                BOOK EXQUISITE EVENT
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-scroll-services-btn"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-transparent border-2 border-brand-ivory/60 hover:border-brand-gold text-brand-ivory hover:text-brand-gold font-mono text-xs font-bold tracking-wider rounded-full transition-all duration-300 uppercase"
              >
                EXPLORE DELIVERABLES
              </button>
            </div>

            {/* Micro Badges inside Hero banner bottom */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-brand-white/10 max-w-lg text-left hidden sm:grid">
              <div className="space-y-1">
                <span className="text-brand-gold font-serif text-xl font-bold">100%</span>
                <p className="text-[9px] font-mono tracking-widest opacity-80 uppercase">Custom Designs</p>
              </div>
              <div className="space-y-1">
                <span className="text-brand-gold font-serif text-xl font-bold">Premium</span>
                <p className="text-[9px] font-mono tracking-widest opacity-80 uppercase">Catering Plating</p>
              </div>
              <div className="space-y-1">
                <span className="text-brand-gold font-serif text-xl font-bold">Udaipur & Goa</span>
                <p className="text-[9px] font-mono tracking-widest opacity-80 uppercase">Active Destinations</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section id="about" className="py-20 bg-brand-bg relative border-b border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual side photo (5 columns) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-brand-gold scale-95 translate-x-4 translate-y-4 rounded-2xl opacity-15" />
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80"
                alt="The Blue Eye Events Planners Working"
                className="relative z-10 w-full h-[450px] object-cover rounded-2xl shadow-xl border border-brand-gold/25"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-brand-navy text-brand-gold p-4.5 rounded-xl border border-brand-gold/30 shadow-lg font-mono text-center max-w-[170px] hidden sm:block">
                <Award className="w-7 h-7 mx-auto stroke-[1.5]" />
                <p className="font-serif font-bold text-base text-brand-white mt-1">Elegance</p>
                <p className="text-[8px] uppercase tracking-wider opacity-85 mt-0.5">And Perfection Combined</p>
              </div>
            </div>

            {/* Core Text Copy write (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
                OUR CORPORATE LEGACY
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight">
                Authentic Craftsmanship, Flawless Coordinates.
              </h2>
              
              <div className="w-16 h-1 bg-brand-gold rounded-full" />
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At <span className="font-serif font-bold text-brand-navy">The Blue Eye Events</span>, we conceive that every milestone is an exquisite canvas of family heritage. Specializing in marriages, dazzling pre-wedding sangeets, cinematic media, and fine dining, we handle variables from initial ideations to final guest farewells.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our approach emphasizes grand aesthetic output without incurring exorbitant overheads. By operating directly through our owned decor warehouse arrays, specialized choreography crews, and elite master chefs, we maintain premium standards at sensible pricing brackets.
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-navy block">Budget Integrity</span>
                    <span className="text-[#666]">Fully itemized transparent invoicing sheets. No hidden costs.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-navy block">Dedicated Directors</span>
                    <span className="text-[#666]">A single point of contact desk with round-the-clock availability.</span>
                  </div>
                </div>
              </div>

              {/* Company Director Call out block */}
              <div className="border-l-4 border-brand-gold pl-4 py-1 italic text-xs text-slate-500 mt-6 bg-brand-ivory/60 p-3 rounded-r-xl">
                "We do not merely coordinate chairs and flower stems; we curate a fluid sensory path where families can focus perfectly on celebrating the visual warmth of eternal bonding."
                <span className="block font-bold text-brand-navy mt-1.5 font-sans not-italic text-[10px] uppercase tracking-wider">— Bhagyalakshmi, Chief Curator</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-20 bg-[#FAF7F4] relative border-b border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
              OUR LUXURY PORTFOLIO OPTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mt-3 leading-tight">
              Bespoke Event Capabilities
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base">
              We manage weddings, family sangeets, catering, and destination planning. Tap cards to see deep specifications and live pricing elements.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => {
              const IconComponent = ICON_MAP[service.icon] || Sparkles;
              const isSelected = selectedServiceIds.includes(service.id);
              
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="bg-brand-white border border-brand-gold/15 hover:border-brand-gold/45 rounded-2xl p-6.5 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Top Icon Block and status */}
                    <div className="flex justify-between items-start mb-4.5">
                      <div className="w-10 h-10 bg-brand-navy/5 border border-brand-gold/30 rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-navy group-hover:text-brand-gold-bright transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <button
                        onClick={() => handleToggleServiceId(service.id)}
                        className={`text-[9px] font-mono px-2.5 py-1 rounded font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#EBF5EE] text-[#2E7D32] border border-[#2E7D32]/20'
                            : 'bg-brand-navy/5 text-brand-navy border border-brand-navy/15 hover:bg-brand-gold hover:text-brand-navy'
                        }`}
                      >
                        {isSelected ? '✓ SELECTED' : '+ ADD TO CALC'}
                      </button>
                    </div>

                    <h3 className="font-serif text-base font-bold text-brand-navy tracking-wide">
                      {service.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-[#888]">
                      From ₹{(service.basePrice / 1000).toFixed(0)}k
                    </span>
                    
                    <button
                      onClick={() => setActiveServiceDetail(service)}
                      className="text-[10px] font-mono font-bold text-brand-gold hover:text-brand-navy uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      LEARN DETAILS
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Packages Section */}
      <section id="packages" className="py-20 bg-brand-bg relative border-b border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
              DESIGN LAYOUT BUNDLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mt-3 leading-tight">
              Pre-composed Celebrations
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base">
              Explore our structured event profiles compiled by master planners. Tap "Customize" on any card to load its parameters directly inside our budget simulator!
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                id={`static-pkg-${pkg.id}`}
                className={`rounded-2xl p-6.5 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.recommended
                    ? 'bg-brand-navy text-brand-white border-2 border-brand-gold shadow-2xl scale-[1.04] lg:scale-[1.03] z-10'
                    : 'bg-brand-white text-brand-charcoal border border-slate-200/80 shadow-md hover:border-brand-gold/30'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 right-6 px-3.5 py-1 bg-brand-gold text-brand-navy text-[9px] font-mono font-bold tracking-widest rounded-full uppercase border border-brand-white/25 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-brand-navy text-brand-navy" />
                    RECOMMENDED BUNDLE
                  </span>
                )}

                <div>
                  <div className="pb-4 border-b border-slate-100/10">
                    <span className={`text-[9px] font-mono uppercase tracking-widest ${
                      pkg.recommended ? 'text-brand-gold' : 'text-[#888]'
                    }`}>
                      {pkg.guestsCount}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1.5">{pkg.name}</h3>
                    <p className={`text-xs mt-2 leading-relaxed ${
                      pkg.recommended ? 'text-brand-ivory/80' : 'text-slate-500'
                    }`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-5">
                    <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                      pkg.recommended ? 'text-brand-gold/80' : 'text-[#999]'
                    }`}>
                      Investment baseline
                    </span>
                    <p className="font-serif text-3xl font-bold tracking-wide mt-1">
                      ₹{pkg.price.toLocaleString('en-IN')}*
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider font-bold">Key Inclusions:</p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-sans">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.recommended ? 'text-brand-gold' : 'text-brand-navy'
                          }`} />
                          <span className={pkg.recommended ? 'text-brand-ivory/90' : 'text-slate-700'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-4 border-t border-slate-100/10">
                  <button
                    onClick={() => handleSelectStaticPackage(pkg)}
                    className={`w-full py-3.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.recommended
                        ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold-bright hover:shadow-lg'
                        : 'bg-brand-navy text-brand-ivory hover:bg-brand-gold hover:text-brand-navy border border-brand-gold/15'
                    }`}
                  >
                    TAILOR THIS PACKAGE
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Dynamic Interactive Calculator suite */}
      <PackagesCalculator
        selectedServiceIds={selectedServiceIds}
        onToggleServiceId={handleToggleServiceId}
        onInitiateBooking={handleInitiateBooking}
      />

      {/* 7. Gallery Grid visualizer */}
      <GalleryGrid />

      {/* 8. Client Testimonials slide */}
      <ReviewsSection />

      {/* 9. Contact form & Location details */}
      <section id="contact" className="py-20 bg-brand-bg relative border-b border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Location & Context Desk (5 columns) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
                  GET IN TOUCH WITH DESIGN LEADERS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-navy mt-3 leading-tight">
                  Headquarters & Consultation Desk
                </h2>
                <div className="w-16 h-1 bg-brand-gold mt-4 rounded-full" />
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We accept physical consultation visits strictly via prior ticketing. Contact our primary support desks or plan a virtual layout meet with our visual architects below.
              </p>

              {/* Informative Grid Blocks */}
              <div className="space-y-4">
                
                {/* Phones */}
                <div className="flex items-center gap-3.5 bg-brand-white border border-brand-gold/15 p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block">Direct Booking Hotline</span>
                    <p className="font-sans font-bold text-sm text-brand-navy mt-0.5">+91 98765 43210</p>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-center gap-3.5 bg-brand-white border border-brand-gold/15 p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block">Official Mailbox</span>
                    <p className="font-sans font-bold text-sm text-brand-navy mt-0.5">consult@theblueeyeevents.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5 bg-brand-white border border-brand-gold/15 p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block">Creative Headquarters</span>
                    <p className="font-sans font-bold text-xs text-brand-navy mt-0.5">The Blue Eye Pavilion, Imperial Ring Road, Jodhpur, RJ</p>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#888] font-bold mb-3">FOLLOW OUR DESIGNS ON SOCIALS</p>
                <div className="flex gap-2.5">
                  <a href="https://instagram.com" className="w-9 h-9 rounded-full bg-brand-white text-brand-navy border border-[#ddd] hover:text-brand-gold hover:border-brand-gold flex items-center justify-center hover:-translate-y-1 transition-all shadow-sm">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" className="w-9 h-9 rounded-full bg-brand-white text-brand-navy border border-[#ddd] hover:text-brand-gold hover:border-brand-gold flex items-center justify-center hover:-translate-y-1 transition-all shadow-sm">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://youtube.com" className="w-9 h-9 rounded-full bg-brand-white text-brand-navy border border-[#ddd] hover:text-brand-gold hover:border-brand-gold flex items-center justify-center hover:-translate-y-1 transition-all shadow-sm">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* General Contact Form (7 columns) */}
            <div className="lg:col-span-7 bg-brand-white border border-brand-gold/15 rounded-2xl p-6 sm:p-8 shadow-xl">
              {contactSuccess ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-navy">Request Registered</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    We have received your message with gold priority protocols. A member of the curation advisory panel will call you or reply soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Compass className="w-5 h-5 text-brand-gold" />
                    <h3 className="font-serif text-lg font-bold text-brand-navy">Quick Callback Registration</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name-input"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="E.g., Devrajsinh Jadeja"
                        className="w-full text-xs p-3 bg-[#FAF7F4] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contact-email-input"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className="w-full text-xs p-3 bg-[#FAF7F4] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                      Direct Contact Line
                    </label>
                    <input
                      type="tel"
                      id="contact-phone-input"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full text-xs p-3 bg-[#FAF7F4] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                      Discuss Your Dream Concept *
                    </label>
                    <textarea
                      id="contact-msg-input"
                      rows={4}
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Share what type of wedding decoration, sangeet program choreographies, photography coverage, or dynamic food banquets you would like. Our team loves specific design briefs!"
                      className="w-full text-xs p-3 bg-[#FAF7F4] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-4 bg-brand-navy hover:bg-brand-gold text-brand-ivory hover:text-brand-navy font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all border border-brand-gold/15 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    SEND MESSAGE
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 10. Luxurious Master Footer */}
      <footer className="bg-brand-navy text-brand-white pt-16 pb-10 border-t border-brand-gold/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-brand-white/10">
            
            {/* Column A: Logo / Motto */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-bold text-brand-white tracking-widest uppercase">
                  THE BLUE EYE
                </span>
              </div>
              <p className="text-[11px] text-brand-ivory/70 leading-relaxed font-mono">
                Award-winning event decorators, royal sangeet coordinators, culinary caterers, and cinematic photography. Perfection from ideation to lasting smile.
              </p>
            </div>

            {/* Column B: Interactive Services links */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-4.5">
                Signature Services
              </p>
              <ul className="space-y-2 text-[11px] text-brand-ivory/80 font-sans">
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Event Sangeet Preparation</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Bespoke Floral Decor</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Cinematic Film Coverages</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Gourmet Catering spreads</a></li>
              </ul>
            </div>

            {/* Column C: Custom Navigation */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-4.5">
                Quick Pathing
              </p>
              <ul className="space-y-2 text-[11px] text-brand-ivory/80 font-sans">
                <li><a href="#about" className="hover:text-brand-gold transition-colors block">Corporate Legacy</a></li>
                <li><a href="#calculator" className="hover:text-brand-gold transition-colors block">Interactive Calculator Suite</a></li>
                <li><a href="#gallery" className="hover:text-brand-gold transition-colors block">Celebration Portfolios</a></li>
                <li><a href="#reviews" className="hover:text-brand-gold transition-colors block">Client Stories</a></li>
              </ul>
            </div>

            {/* Column D: Support Hour indicators */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-4.5">
                Consultation hours
              </p>
              <ul className="space-y-2 text-[11px] text-brand-ivory/70 font-mono leading-relaxed">
                <li className="flex justify-between"><span>Mon — Sat:</span> <span>09:00 — 21:00 IST</span></li>
                <li className="flex justify-between"><span>Sunday Desk:</span> <span>10:00 — 17:00 IST</span></li>
                <li className="pt-2 border-t border-brand-white/10 flex justify-between text-brand-gold">
                  <span>Emergency Desk:</span> <span>24 Hours Active</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright & Sign off indicators */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-brand-ivory/55 gap-4">
            <p>
              Copyright © 2026 The Blue Eye Events Private Limited. All Rights Reserved.
            </p>
            <p className="flex items-center gap-1">
              Constructed with <Heart className="w-3 h-3 fill-brand-gold text-brand-gold" /> for Bhagyalakshmi
            </p>
          </div>

        </div>
      </footer>

      {/* 11. Overlays: Service Details Modal */}
      <ServiceDetailModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onSelectService={handleToggleServiceId}
        isSelectedInCalculator={
          activeServiceDetail ? selectedServiceIds.includes(activeServiceDetail.id) : false
        }
      />

      {/* 12. Overlays: Dynamic Step-by-Step Booking appointment wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
      />

    </div>
  );
}
