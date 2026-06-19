import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ServiceDetailModal from './components/ServiceDetailModal';
import PackagesCalculator from './components/PackagesCalculator';
import BookingWizard from './components/BookingWizard';
import GalleryGrid from './components/GalleryGrid';
import ReviewsSection from './components/ReviewsSection';
import Chatbot from './components/Chatbot';
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
  CheckCircle2,
  Gift,
  Briefcase
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
  Gift,
  Heart,
  Briefcase,
  Award,
  Compass,
};

export default function App() {
  // Global States
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['wedding_decor', 'engagement_decor']);
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
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
    <div className={`min-h-screen ${theme === 'light' ? 'light-mode bg-[#FAF7F4]' : 'bg-brand-bg'} text-brand-dark overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300`}>
      
      {/* 1. Header Navigation */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenCalculator={handleOpenCalculatorTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
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
              Transforming Your Special Moments into <span className="text-brand-gold font-serif">Unforgettable</span> Memories.
            </h1>

            <p className="text-sm sm:text-lg text-brand-ivory/85 leading-relaxed max-w-2xl font-sans tracking-wide">
              The Blue Eyes serves as a modern event planning and decoration platform. We assist customers in discovering pristine decoration ideas, custom layouts, and securing premium bookings effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-book-btn"
                onClick={handleOpenGeneralBooking}
                className="px-8 py-4 bg-[#F5D76E] text-[#0B1633] font-mono text-xs font-bold tracking-wider rounded-full hover:bg-[#FFF38F] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Event
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-scroll-services-btn"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-transparent border-2 border-brand-ivory/60 hover:border-brand-gold text-brand-ivory hover:text-brand-gold font-mono text-xs font-bold tracking-wider rounded-full transition-all duration-300 uppercase cursor-pointer"
              >
                Explore Services
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
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-gold-bright leading-tight">
                Authentic Craftsmanship, Flawless Coordinates.
              </h2>
              
              <div className="w-16 h-1 bg-brand-gold rounded-full" />
              
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                At <span className="font-serif font-bold text-brand-gold-bright underline decoration-brand-gold/45 decoration-2">The Blue Eye Events</span>, we conceive that every milestone is an exquisite canvas of family heritage. Specializing in marriages, dazzling pre-wedding sangeets, cinematic media, and fine dining, we handle variables from initial ideations to final guest farewells.
              </p>

              <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                Our approach emphasizes grand aesthetic output without incurring exorbitant overheads. By operating directly through our owned decor warehouse arrays, specialized choreography crews, and elite master chefs, we maintain premium standards at sensible pricing brackets.
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-[13.5px] tracking-wide mb-1">Budget Integrity</span>
                    <span className="text-slate-300 leading-relaxed block">Fully itemized transparent invoicing sheets. No hidden costs.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-[13.5px] tracking-wide mb-1">Dedicated Directors</span>
                    <span className="text-slate-300 leading-relaxed block">A single point of contact desk with round-the-clock availability.</span>
                  </div>
                </div>
              </div>

              {/* Company Director Call out block */}
              <div className="border-l-4 border-brand-gold pl-4 py-3.5 italic text-xs text-white mt-6 bg-[#18264e] p-4 rounded-r-xl">
                "We do not merely coordinate chairs and flower stems; we curate a fluid sensory path where families can focus perfectly on celebrating the visual warmth of eternal bonding."
                <span className="block font-bold text-brand-gold mt-2 font-sans not-italic text-[10.5px] uppercase tracking-wider">— Bhagyalakshmi, Chief Curator</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-brand-navy border-y border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,215,110,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5D76E] block">1,500+</span>
              <span className="text-[10px] font-mono tracking-widest text-[#B8C4E0] uppercase block">Decorations Completed</span>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5D76E] block">15+</span>
              <span className="text-[10px] font-mono tracking-widest text-[#B8C4E0] uppercase block">Project Directors</span>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5D76E] block">5+</span>
              <span className="text-[10px] font-mono tracking-widest text-[#B8C4E0] uppercase block">Active Metros & States</span>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5D76E] block">100%</span>
              <span className="text-[10px] font-mono tracking-widest text-[#B8C4E0] uppercase block">Delivery Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section id="categories" className={`py-20 relative border-b border-brand-gold/15 transition-colors duration-300 ${theme === 'light' ? 'bg-[#FAF7F4]' : 'bg-brand-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold block">
              SIGNATURE CELEBRATION THEMES
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold-bright'}`}>
              A Wide Spectrum of Joyous Categories
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
            <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-200'}`}>
              The Blue Eyes specializes in custom decoration architectures tailored precisely for every milestone celebration. Click any card to instantly plan or view gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Wedding Decoration', desc: 'Divine drapes, mandaps, grand royal walkways, and palace alters.', image: 'https://files.catbox.moe/un7phl.jpg', anchor: '#services' },
              { title: 'Birthday Decoration', desc: 'Vibrant custom backgrounds, themed organic balloon cascades.', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80', anchor: '#services' },
              { title: 'Engagement Decoration', desc: 'Elegant rings framing, pastel linens, and candlelit walk paths.', image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=400&q=80', anchor: '#services' },
              { title: 'Corporate Events', desc: 'Sleek modular keynote staging, branding backdrop boards.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80', anchor: '#services' },
              { title: 'Baby Shower Decor', desc: 'Soft pastel baby clouds ceiling, sweet gypsophila cradles.', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=400&q=80', anchor: '#services' },
              { title: 'Anniversary Decor', desc: 'Romantic memories walkway, gold tablescapes, crimson walls.', image: 'https://files.catbox.moe/psdpwf.jpg', anchor: '#services' },
              { title: 'Reception Decor', desc: 'Suspended wisteria trails, glamorous seating, fog effects.', image: 'https://files.catbox.moe/sknx59.jpg', anchor: '#services' },
              { title: 'Haldi Decoration', desc: 'Vibrant marigold garlands, elegant yellow drapes, and traditional seating.', image: 'https://files.catbox.moe/rn9evn.jpg', anchor: '#services' }
            ].map((cat, idx) => (
              <div key={idx} className={`border border-brand-gold/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between ${theme === 'light' ? 'bg-white' : 'bg-[#111A35]'}`}>
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />
                    <span className="absolute bottom-3 left-3 text-white font-serif text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] z-20">{cat.title}</span>
                  </div>
                  <div className="p-5">
                    <p className={`text-[11.5px] leading-relaxed font-sans ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>{cat.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <a href={cat.anchor} className={`text-[10px] font-mono font-bold hover:text-brand-gold uppercase tracking-wider flex items-center justify-between border-t pt-3 ${theme === 'light' ? 'text-brand-navy border-slate-100' : 'text-slate-200 border-brand-gold/10'}`}>
                    <span>EXPLORE THEME</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className={`py-20 relative border-b border-brand-gold/15 transition-colors duration-300 ${theme === 'light' ? 'bg-[#FAF7F4]' : 'bg-brand-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
              OUR LUXURY PORTFOLIO OPTIONS
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold-bright'}`}>
              Bespoke Event Capabilities
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
            <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-200'}`}>
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
                  className={`border border-brand-gold/15 hover:border-brand-gold/45 rounded-2xl p-6.5 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 group ${theme === 'light' ? 'bg-white' : 'bg-[#111A35]'}`}
                >
                  <div>
                    {/* Top Icon Block and status */}
                    <div className="flex justify-between items-start mb-4.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${theme === 'light' ? 'bg-brand-navy/5 border-brand-gold/30 text-brand-gold group-hover:bg-brand-navy group-hover:text-brand-gold-bright' : 'bg-brand-navy/30 border-brand-gold/20 text-brand-gold group-hover:bg-brand-navy group-hover:text-brand-gold-bright'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <button
                        onClick={() => handleToggleServiceId(service.id)}
                        className={`text-[9px] font-mono px-2.5 py-1 rounded font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#EBF5EE] text-[#2E7D32] border border-[#2E7D32]/20'
                            : theme === 'light'
                              ? 'bg-brand-navy/5 text-brand-navy border border-brand-navy/15 hover:bg-brand-gold hover:text-brand-navy'
                              : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/25 hover:bg-brand-gold hover:text-brand-navy'
                        }`}
                      >
                        {isSelected ? '✓ SELECTED' : '+ ADD TO CALC'}
                      </button>
                    </div>

                    <h3 className={`font-serif text-base font-bold tracking-wide ${theme === 'light' ? 'text-brand-navy' : 'text-slate-100'}`}>
                      {service.name}
                    </h3>
                    
                    <p className={`text-xs mt-2.5 leading-relaxed line-clamp-3 ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className={`mt-6 pt-4 border-t flex justify-between items-center ${theme === 'light' ? 'border-slate-100' : 'border-brand-gold/10'}`}>
                    <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-[#888]' : 'text-slate-300'}`}>
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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-gold-bright mt-3 leading-tight">
              Pre-composed Celebrations
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
            <p className="text-slate-200 text-sm sm:text-base">
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
        theme={theme}
      />

      {/* 7. Gallery Grid visualizer */}
      <GalleryGrid />

      {/* 8. Client Testimonials slide */}
      <ReviewsSection theme={theme} />

      {/* 9. Contact form & Location details */}
      <section id="contact" className={`py-20 relative border-b border-brand-gold/15 transition-colors duration-300 ${theme === 'light' ? 'bg-[#FAF7F4]' : 'bg-brand-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Location & Context Desk (5 columns) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
                  GET IN TOUCH WITH DESIGN LEADERS
                </span>
                <h2 className={`font-serif text-3xl sm:text-4xl font-bold mt-3 leading-tight ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold-bright'}`}>
                  Headquarters & Consultation Desk
                </h2>
                <div className="w-16 h-1 bg-brand-gold mt-4 rounded-full" />
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-200'}`}>
                We accept physical consultation visits strictly via prior ticketing. Contact our primary support desks or plan a virtual layout meet with our visual architects below.
              </p>

              {/* Informative Grid Blocks */}
              <div className="space-y-4">
                
                {/* Phones */}
                <div className={`flex items-center gap-3.5 border border-brand-gold/15 p-4 rounded-xl shadow-sm transition-colors duration-300 ${theme === 'light' ? 'bg-white' : 'bg-[#111A35]'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-brand-navy/5 text-brand-navy' : 'bg-brand-navy/30 text-brand-gold'}`}>
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block">Direct Booking Hotline</span>
                    <p className={`font-sans font-bold text-sm mt-0.5 ${theme === 'light' ? 'text-brand-navy' : 'text-white'}`}>+91 98765 43210</p>
                  </div>
                </div>

                {/* Emails */}
                <div className={`flex items-center gap-3.5 border border-brand-gold/15 p-4 rounded-xl shadow-sm transition-colors duration-300 ${theme === 'light' ? 'bg-white' : 'bg-[#111A35]'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-brand-navy/5 text-brand-navy' : 'bg-brand-navy/30 text-brand-gold'}`}>
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block">Official Mailbox</span>
                    <p className={`font-sans font-bold text-sm mt-0.5 ${theme === 'light' ? 'text-brand-navy' : 'text-white'}`}>consult@theblueeyeevents.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className={`flex items-center gap-3.5 border border-brand-gold/15 p-4 rounded-xl shadow-sm transition-colors duration-300 ${theme === 'light' ? 'bg-white' : 'bg-[#111A35]'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-brand-navy/5 text-brand-navy' : 'bg-brand-navy/30 text-brand-gold'}`}>
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-wider block">Creative Headquarters</span>
                    <p className={`font-sans font-bold text-xs mt-0.5 ${theme === 'light' ? 'text-brand-navy' : 'text-white'}`}>The Blue Eye Pavilion, Imperial Ring Road, Jodhpur, RJ</p>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#888] font-bold mb-3">FOLLOW OUR DESIGNS ON SOCIALS</p>
                <div className="flex gap-2.5">
                  <a href="https://instagram.com" className={`w-9 h-9 rounded-full border flex items-center justify-center hover:-translate-y-1 transition-all shadow-sm ${theme === 'light' ? 'bg-white text-brand-navy border-slate-200 hover:text-brand-gold hover:border-brand-gold' : 'bg-[#111A35] text-slate-200 border-brand-gold/20 hover:text-brand-gold hover:hover:border-brand-gold'}`}>
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" className={`w-9 h-9 rounded-full border flex items-center justify-center hover:-translate-y-1 transition-all shadow-sm ${theme === 'light' ? 'bg-white text-brand-navy border-slate-200 hover:text-brand-gold hover:border-brand-gold' : 'bg-[#111A35] text-slate-200 border-brand-gold/20 hover:text-brand-gold hover:hover:border-brand-gold'}`}>
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://youtube.com" className={`w-9 h-9 rounded-full border flex items-center justify-center hover:-translate-y-1 transition-all shadow-sm ${theme === 'light' ? 'bg-white text-brand-navy border-slate-200 hover:text-brand-gold hover:border-brand-gold' : 'bg-[#111A35] text-slate-200 border-brand-gold/20 hover:text-brand-gold hover:hover:border-brand-gold'}`}>
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* General Contact Form (7 columns) */}
            <div className={`lg:col-span-7 border border-brand-gold/15 rounded-2xl p-6 sm:p-8 shadow-xl transition-colors duration-300 ${theme === 'light' ? 'bg-white' : 'bg-[#111A35]'}`}>
              {contactSuccess ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-gold-bright">Request Registered</h3>
                  <p className={`text-xs max-w-sm mx-auto leading-relaxed ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>
                    We have received your message with gold priority protocols. A member of the curation advisory panel will call you or reply soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-brand-gold/15 pb-3">
                    <Compass className="w-5 h-5 text-brand-gold animate-spin-slow" />
                    <h3 className={`font-serif text-xl font-bold tracking-wide ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold-bright'}`}>Quick Callback Registration</h3>
                  </div>
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-mono font-bold uppercase tracking-widest block mb-1.5 ${theme === 'light' ? 'text-brand-navy' : 'text-slate-300'}`}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name-input"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="E.g., Devrajsinh Jadeja"
                        className={`w-full text-xs p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all duration-200 font-semibold border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-brand-bg/50 border-brand-gold/30 text-white placeholder-slate-300'}`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-mono font-bold uppercase tracking-widest block mb-1.5 ${theme === 'light' ? 'text-brand-navy' : 'text-slate-300'}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contact-email-input"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className={`w-full text-xs p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all duration-200 font-semibold border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-brand-bg/50 border-brand-gold/30 text-white placeholder-slate-300'}`}
                      />
                    </div>
                  </div>
 
                  <div>
                    <label className={`text-xs font-mono font-bold uppercase tracking-widest block mb-1.5 ${theme === 'light' ? 'text-brand-navy' : 'text-slate-300'}`}>
                      Direct Contact Line
                    </label>
                    <input
                      type="tel"
                      id="contact-phone-input"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className={`w-full text-xs p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all duration-200 font-semibold border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-brand-bg/50 border-brand-gold/30 text-white placeholder-slate-300'}`}
                    />
                  </div>
 
                  <div>
                    <label className={`text-xs font-mono font-bold uppercase tracking-widest block mb-1.5 ${theme === 'light' ? 'text-brand-navy' : 'text-slate-300'}`}>
                      Discuss Your Dream Concept *
                    </label>
                    <textarea
                      id="contact-msg-input"
                      rows={4}
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Share what type of wedding decoration, sangeet program choreographies, photography coverage, or dynamic food banquets you would like. Our team loves specific design briefs!"
                      className={`w-full text-xs p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all duration-200 font-semibold border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-brand-bg/50 border-brand-gold/30 text-white placeholder-slate-300'}`}
                    />
                  </div>
 
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className={`w-full py-4 font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all border flex items-center justify-center gap-2 cursor-pointer ${theme === 'light' ? 'bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy border-brand-gold/10' : 'bg-brand-gold text-brand-navy hover:bg-[#F5D76E] border-brand-gold/10'}`}
                  >
                    SEND MESSAGE
                    <Send className="w-3.5 h-3.5 animate-pulse" />
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

      {/* 13. AI-Powered Concierge Chatbot Widget */}
      <Chatbot />

    </div>
  );
}
