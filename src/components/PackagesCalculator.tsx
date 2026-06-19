import React, { useState, useEffect } from 'react';
import { servicesData, packagesData, defaultCateringItems } from '../data';
import { ServiceItem, PricingPackage } from '../types';
import { Calculator, Check, ArrowRight, Sparkles, Utensils, HelpCircle, ChefHat, Plus, Trash2 } from 'lucide-react';

interface PackagesCalculatorProps {
  selectedServiceIds: string[];
  onToggleServiceId: (id: string) => void;
  onInitiateBooking: (summary: {
    packageName: string;
    guestCount: number;
    cateringTier: string;
    services: string[];
    cost: number;
    packageId: string;
    customMenu?: string[];  // custom catering choices passed along
  }) => void;
}

export default function PackagesCalculator({
  selectedServiceIds,
  onToggleServiceId,
  onInitiateBooking,
  theme = 'dark',
}: PackagesCalculatorProps & { theme?: 'light' | 'dark' }) {
  // Calculator States
  const [activePackageId, setActivePackageId] = useState<string>('premium');
  const [guests, setGuests] = useState<number>(250);
  const [cateringTier, setCateringTier] = useState<'standard' | 'premium' | 'gourmet'>('premium');

  // Custom Catering Menu state
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const [customDishText, setCustomDishText] = useState<string>('');
  const [isCustomizingMenu, setIsCustomizingMenu] = useState<boolean>(false);

  // Sync menu choices with default items of selected catering tier
  useEffect(() => {
    const defaultTierDishes = defaultCateringItems
      .filter((item) => item.tiers.includes(cateringTier))
      .map((item) => item.name);
    setSelectedMenu(defaultTierDishes);
  }, [cateringTier]);

  // Sync package changes to appropriate presets
  useEffect(() => {
    if (activePackageId === 'basic') {
      setGuests(120);
      setCateringTier('standard');
      // basic services preset
      const presets = ['birthday_decor', 'festival_decor'];
      // replace selection logic
      const toRemove = selectedServiceIds.filter(id => !presets.includes(id));
      const toAdd = presets.filter(id => !selectedServiceIds.includes(id));
      toRemove.forEach(id => onToggleServiceId(id));
      toAdd.forEach(id => onToggleServiceId(id));
    } else if (activePackageId === 'premium') {
      setGuests(250);
      setCateringTier('premium');
      // premium services preset
      const presets = ['wedding_decor', 'engagement_decor', 'baby_shower_decor', 'anniversary_decor'];
      const toRemove = selectedServiceIds.filter(id => !presets.includes(id));
      const toAdd = presets.filter(id => !selectedServiceIds.includes(id));
      toRemove.forEach(id => onToggleServiceId(id));
      toAdd.forEach(id => onToggleServiceId(id));
    } else if (activePackageId === 'luxury') {
      setGuests(450);
      setCateringTier('gourmet');
      // all services
      const presets = servicesData.map(s => s.id);
      const toAdd = presets.filter(id => !selectedServiceIds.includes(id));
      toAdd.forEach(id => onToggleServiceId(id));
    }
  }, [activePackageId]);

  // Pricing constants
  const CATERING_RATES = {
    standard: 750, // Rs per plate
    premium: 1450, // Rs per plate
    gourmet: 2450, // Rs per plate
  };

  const getCateringLabel = (tier: string) => {
    if (tier === 'standard') return 'Gourmet Standard (Traditional)';
    if (tier === 'premium') return 'Royal Silver Spread (Multi-cuisine)';
    return 'Imperial Banquets (Signature Elite)';
  };

  // Calculation Logic
  const calculateTotal = () => {
    let price = 0;

    // 1. Base Package Cost Factor (includes preset discounts/premiums)
    const activePkg = packagesData.find((p) => p.id === activePackageId);
    let packageBase = activePkg ? activePkg.price : 0;

    // 2. Services Costs
    const servicesCost = selectedServiceIds.reduce((sum, sId) => {
      const match = servicesData.find((s) => s.id === sId);
      return sum + (match ? match.basePrice : 0);
    }, 0);

    // 3. Catering plate calculation
    const baseCateringRate = CATERING_RATES[cateringTier];
    // Baseline items included without extra fee
    const maxFreeDishes = cateringTier === 'standard' ? 6 : cateringTier === 'premium' ? 8 : 10;
    const extraDishCount = Math.max(0, selectedMenu.length - maxFreeDishes);
    const cateringRateAdjusted = baseCateringRate + (extraDishCount * 65);
    const cateringCost = guests * cateringRateAdjusted;

    // Total combines baseline coordination, services selected, and guests food budget
    // Give a package discount if they take 5+ services
    const quantityDiscount = selectedServiceIds.length >= 5 ? 0.92 : 1.0; 

    price = Math.round((packageBase * 0.4 + servicesCost + cateringCost) * quantityDiscount);
    return {
      total: price,
      cateringCost,
      servicesCost,
      coordinationBase: Math.round(packageBase * 0.4),
      discount: quantityDiscount < 1 ? Math.round((packageBase * 0.4 + servicesCost + cateringCost) * 0.08) : 0,
      extraDishCount,
    };
  };

  const bill = calculateTotal();

  const handleBookingTrigger = () => {
    onInitiateBooking({
      packageName: packagesData.find(p => p.id === activePackageId)?.name || 'Custom Plan',
      guestCount: guests,
      cateringTier: getCateringLabel(cateringTier),
      services: selectedServiceIds.map(id => servicesData.find(s => s.id === id)?.name || id),
      cost: bill.total,
      packageId: activePackageId,
      customMenu: selectedMenu,
    });
  };

  return (
    <section id="calculator" className={`py-20 relative border-b border-brand-gold/15 transition-colors duration-300 ${theme === 'light' ? 'bg-[#FAF7F4]' : 'bg-brand-bg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
            Exclusive Planning Suite
          </span>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold-bright'}`}>
            Interactive Event Cost Estimator
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
          <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-200'}`}>
            Mix and match services, scale guests size, and select catering levels to see an immediate budget breakdown. Transparent, straightforward pricing with premium customization.
          </p>
        </div>

        {/* Calculator Window Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left Column */}
          <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 shadow-xl border space-y-8 transition-colors duration-300 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#111A35] border-brand-gold/25'}`}>
            
            {/* Step 1: Base Package Preset */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider block ${theme === 'light' ? 'text-slate-800' : 'text-brand-gold'}`}>
                  Step 1: Select Baseline Experience
                </label>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${theme === 'light' ? 'text-brand-navy bg-brand-navy/5' : 'text-brand-gold bg-brand-gold/10'}`}>
                  Presets available
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {packagesData.map((pkg) => {
                  const isActive = activePackageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      id={`calc-preset-${pkg.id}`}
                      onClick={() => setActivePackageId(pkg.id)}
                      className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-brand-navy border-brand-gold shadow-md scale-[1.02]'
                          : theme === 'light'
                            ? 'border-slate-200 bg-white hover:bg-slate-50'
                            : 'border-brand-gold/25 bg-brand-navy/30 hover:bg-brand-navy/60'
                      }`}
                    >
                      <p className={`text-xs font-bold leading-snug tracking-wide ${isActive ? 'text-white' : theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                        {pkg.name.split(' ')[1] || pkg.name}
                      </p>
                      <p className={`text-[9px] font-mono mt-1 ${isActive ? 'text-[#F5D76E]' : theme === 'light' ? 'text-slate-500' : 'text-brand-gold/80'}`}>
                        ₹{(pkg.price / 1000).toFixed(0)}k Base
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slider for guest size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'light' ? 'text-slate-800' : 'text-brand-gold'}`}>
                  Step 2: Guest Count
                  <span className={`font-sans font-bold text-lg ml-1 ${theme === 'light' ? 'text-[#AD8B10]' : 'text-brand-gold-bright'}`}>({guests})</span>
                </label>
                <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>Range: 50 - 1000 guests</span>
              </div>
              
              <div className="relative pt-1 pl-1 pr-1">
                <input
                  type="range"
                  id="calc-guest-slider"
                  min="50"
                  max="1000"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#AD8B10]"
                />
                <div className={`flex justify-between text-[10px] font-mono mt-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>
                  <span>52 Intimate RSVP</span>
                  <span>350 Classic Ceremony</span>
                  <span>750 Grand Gala</span>
                  <span>1000 Imperial</span>
                </div>
              </div>
            </div>

            {/* Step 3: Food / Catering Tier */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Utensils className={`w-4 h-4 ${theme === 'light' ? 'text-[#AD8B10]' : 'text-brand-gold'}`} />
                <label className={`text-xs font-mono font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-800' : 'text-brand-gold'}`}>
                  Step 3: Culinary & Catering Standard
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {([
                  { id: 'standard', name: 'Gourmet Standard', rate: 750, desc: 'Classic multi-cuisine buffet' },
                  { id: 'premium', name: 'Royal Silver', rate: 1450, desc: 'Elaborate menu with 2 live stalls' },
                  { id: 'gourmet', name: 'Imperial Elite', rate: 2450, desc: 'Highest standard platter + 5 live stalls' }
                ] as const).map((tier) => {
                  const isActive = cateringTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      id={`calc-catering-${tier.id}`}
                      type="button"
                      onClick={() => setCateringTier(tier.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-navy border-brand-gold shadow-md ring-1 ring-brand-gold/30'
                          : theme === 'light'
                            ? 'border-slate-200 bg-white hover:bg-slate-50'
                            : 'border-brand-gold/25 bg-brand-navy/30 hover:bg-brand-navy/60 text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-bold ${isActive ? 'text-white' : theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                          {tier.name}
                        </span>
                        <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#F5D76E]' : theme === 'light' ? 'text-[#AD8B10]' : 'text-brand-gold'}`}>
                          ₹{tier.rate}/Pl.
                        </span>
                      </div>
                      <p className={`text-[9.5px] leading-normal mt-1.5 ${isActive ? 'text-slate-200' : theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        {tier.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Gourmet Custom Menu Card Container */}
              <div className={`mt-4 border rounded-xl p-4 transition-colors duration-300 ${theme === 'light' ? 'border-brand-gold/25 bg-white/50' : 'border-brand-gold/25 bg-brand-navy/30'}`}>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-navy text-brand-gold p-2 rounded-lg">
                      <ChefHat className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold font-serif ${theme === 'light' ? 'text-brand-navy' : 'text-slate-100'}`}>Signature Menu Builder</p>
                      <p className={`text-[10px] font-mono mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>
                        <span className="text-brand-gold font-bold">Selected: {selectedMenu.length} items</span> ({cateringTier === 'standard' ? 6 : cateringTier === 'premium' ? 8 : 10} included in package)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="toggle-catering-menu-customizer-btn"
                    onClick={() => setIsCustomizingMenu(!isCustomizingMenu)}
                    className="text-[9.5px] font-mono font-bold bg-brand-navy text-brand-gold hover:bg-brand-gold hover:text-brand-navy px-3.5 py-1.5 rounded-lg border border-brand-gold/30 transition-all font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    {isCustomizingMenu ? 'Collapse customizer ✕' : 'Customize Menu Spread ⚙'}
                  </button>
                </div>

                {/* Collapsable customized menu builder list */}
                {isCustomizingMenu && (
                  <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-4.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className={`text-[10px] font-mono italic leading-relaxed ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>
                      * Choose from chef recommendations or draft your own bespoke signature menu. Added items exceeding your tier limit add a nominal ₹65 per plate.
                    </p>

                    {/* Groups by Category */}
                    {(['drink', 'starter', 'main', 'dessert'] as const).map((cat) => {
                      const label = cat === 'drink' ? 'Welcome sips & Mocktails' : cat === 'starter' ? 'Crispy Starters' : cat === 'main' ? 'Royal Mains & Breads' : 'Sweet Desserts';
                      const items = defaultCateringItems.filter((item) => item.category === cat);
                      return (
                        <div key={cat} className="space-y-2">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider bg-brand-navy/5 px-2.5 py-1 rounded inline-block ${theme === 'light' ? 'text-brand-navy bg-brand-navy/5' : 'text-brand-gold bg-brand-gold/10'}`}>
                            {label}
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {items.map((dish) => {
                              const isChecked = selectedMenu.includes(dish.name);
                              return (
                                <button
                                  key={dish.id}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setSelectedMenu(selectedMenu.filter((item) => item !== dish.name));
                                    } else {
                                      setSelectedMenu([...selectedMenu, dish.name]);
                                    }
                                  }}
                                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                                    isChecked
                                      ? `bg-brand-gold/10 border-brand-gold/50 font-bold ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold-bright'}`
                                      : `${theme === 'light' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-brand-navy/35 border-brand-gold/10 text-slate-300 hover:bg-brand-navy/50'}`
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                      isChecked ? 'bg-brand-gold border-brand-gold text-brand-navy' : 'border-slate-300'
                                    }`}>
                                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span className={isChecked ? 'font-bold' : ''}>{dish.name}</span>
                                  </div>
                                  
                                  {dish.tiers.includes(cateringTier) ? (
                                    <span className="text-[8px] font-mono uppercase bg-emerald-50 text-emerald-600 px-1 py-0.5 rounded font-semibold shrink-0">Included</span>
                                  ) : (
                                    <span className={`text-[8px] font-mono uppercase px-1 py-0.5 rounded shrink-0 ${theme === 'light' ? 'bg-brand-navy/5 text-[#AD8B10]' : 'bg-brand-gold/10 text-brand-gold'}`}>+₹65/pl</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Totally Custom Entered Food Form */}
                    <div className={`border border-brand-gold/20 p-3.5 rounded-xl space-y-2 ${theme === 'light' ? 'bg-[#FAF7F4]' : 'bg-brand-navy/30'}`}>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold'}`}>
                        Add Guest Request / Bespoke Recipes
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customDishText}
                          onChange={(e) => setCustomDishText(e.target.value)}
                          placeholder="e.g. Traditional Gujarati Shrikhand, Dal Baati"
                          className="flex-grow text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                        <button
                          type="button"
                          id="btn-add-bespoke-cuisine"
                          onClick={() => {
                            if (!customDishText.trim()) return;
                            setSelectedMenu([...selectedMenu, customDishText.trim()]);
                            setCustomDishText('');
                          }}
                          className="bg-brand-navy hover:bg-brand-gold text-brand-gold hover:text-brand-navy px-4 py-2.5 text-xs font-mono font-bold rounded-lg transition-colors border border-brand-gold/30 cursor-pointer"
                        >
                          Add +
                        </button>
                      </div>
                      <p className={`text-[9px] font-mono leading-snug ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                        Type any custom delicacy or regional specialities. They will print directly inside your verified layout itinerary sheets!
                      </p>
                    </div>

                  </div>
                )}
              </div>
            </div>


            {/* Step 4: Toggle Services checkboxes */}
            <div>
              <label className={`text-xs font-mono font-bold uppercase tracking-wider block mb-4 ${theme === 'light' ? 'text-brand-navy' : 'text-brand-gold'}`}>
                Step 4: Tailored Event Deliverables
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesData.map((service) => {
                  const isChecked = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => onToggleServiceId(service.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-brand-navy/95 border-brand-gold text-brand-white shadow'
                          : theme === 'light'
                            ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                            : 'border-brand-gold/15 bg-brand-navy/35 hover:bg-brand-navy/55 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-brand-gold border-brand-gold text-brand-navy' : 'border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className={`text-xs font-bold tracking-wide ${isChecked ? 'text-white' : theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{service.name}</p>
                          <p className={`text-[9.5px] mt-0.5 ${isChecked ? 'text-brand-gold-bright' : theme === 'light' ? 'text-slate-500' : 'text-brand-gold'}`}>Est. ₹{service.basePrice.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Pricing Summary Invoice Right Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-brand-navy text-brand-white rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/30">
            <div className="p-1 px-4 bg-brand-gold text-brand-navy text-center text-[10px] font-mono font-bold tracking-widest uppercase">
              ★ Active Budget Estimation Sheet ★
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex justify-between items-center pb-4 border-b border-brand-white/10">
                <div className="flex items-center gap-1.5">
                  <Calculator className="w-5 h-5 text-brand-gold" />
                  <span className="font-serif text-lg font-bold tracking-wide">Live Quotation</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono bg-brand-gold/15 py-1 px-2.5 rounded text-brand-gold border border-brand-gold/25">
                  INV-{(90000 + guests).toString()}
                </span>
              </div>

              {/* Itemized list */}
              <div className="space-y-3.5 text-xs font-sans">
                
                <div className="flex justify-between text-brand-ivory/80">
                  <span>Event Base Management baseline:</span>
                  <span className="text-brand-gold-bright font-mono font-semibold">₹{bill.coordinationBase.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-brand-ivory/80">
                  <span>Catering & Banquet ({guests} plates):</span>
                  <span className="text-brand-gold-bright font-mono font-semibold">₹{bill.cateringCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-brand-ivory/80">
                  <span>Selected Signature Features ({selectedServiceIds.length}):</span>
                  <span className="text-brand-gold-bright font-mono font-semibold">
                    {bill.servicesCost > 0 ? `₹${bill.servicesCost.toLocaleString('en-IN')}` : '₹0'}
                  </span>
                </div>

                {bill.discount > 0 && (
                  <div className="flex justify-between text-[#81C784] bg-[#2E7D32]/20 px-2.5 py-1.5 rounded border border-[#2E7D32]/35">
                    <span>Exclusive Package Discount (5+ services):</span>
                    <span className="font-mono font-semibold">- ₹{bill.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                
              </div>

              <div className="pt-5 border-t border-brand-white/15 text-center">
                <span className="text-[10px] tracking-widest font-mono text-brand-gold uppercase block">
                  Estimated Gross Amount
                </span>
                <p className="font-serif text-3xl sm:text-4xl text-brand-white font-bold tracking-wide mt-2">
                  ₹{bill.total.toLocaleString('en-IN')}*
                </p>
                <span className="text-[9px] font-mono text-brand-ivory/50 block mt-1.5">
                  *Excludes standard government GST & custom transport overheads
                </span>
              </div>

              {/* Inclusions summary list */}
              <div className="bg-brand-bg/5 p-4 rounded-xl border border-brand-white/5 space-y-3">
                <p className="text-[10px] tracking-wider font-mono text-brand-gold uppercase font-bold">
                  Active Setup Highlights:
                </p>
                <ul className="space-y-2 text-[11px] text-brand-ivory/85">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                    <span>Custom guest layout built for <span className="font-bold text-brand-gold">{guests} capacity</span></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                    <span>Catering Spread: <span className="font-bold text-white uppercase text-[9px] tracking-wide">{cateringTier} tier</span></span>
                  </li>
                  {selectedMenu.length > 0 && (
                    <li className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                        <span>Bespoke Menu: <span className="font-bold text-brand-gold">{selectedMenu.length} custom choices</span></span>
                      </div>
                      <div className="pl-3 max-h-16 overflow-y-auto mt-0.5 scrollbar-thin scrollbar-thumb-brand-gold/20 pr-1">
                        <p className="text-[9.5px] text-brand-ivory/60 italic font-mono leading-relaxed">
                          {selectedMenu.join(', ')}
                        </p>
                      </div>
                    </li>
                  )}
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                    <span><span className="font-bold text-brand-gold">{selectedServiceIds.length} customized extras</span> toggled active</span>
                  </li>
                </ul>
              </div>

              {/* Call to action booking */}
              <button
                id="calc-book-pkg-btn"
                onClick={handleBookingTrigger}
                className="w-full py-4 bg-brand-gold text-brand-navy font-mono text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-brand-gold-bright hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                BOOK THIS LAYOUT
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
