import React, { useState, useEffect } from 'react';
import { X, Calendar, Gift, Users, Mail, Phone, UserCheck, CheckCircle2, Ticket, Printer, ArrowRight } from 'lucide-react';
import { BookingRequest } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    packageName: string;
    guestCount: number;
    cateringTier: string;
    services: string[];
    cost: number;
    packageId: string;
    customMenu?: string[];
  } | null;
}

export default function BookingWizard({ isOpen, onClose, initialData }: BookingWizardProps) {
  // Input form structures
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('Marriage');
  const [guests, setGuests] = useState(150);
  const [customNotes, setCustomNotes] = useState('');

  // Sourced calculation params
  const [selectedPack, setSelectedPack] = useState('Royal Premium');
  const [cost, setCost] = useState(345000);
  const [services, setServices] = useState<string[]>([]);
  const [catering, setCatering] = useState('Royal Silver Spread (Multi-cuisine)');
  const [menuItems, setMenuItems] = useState<string[]>([]);

  // Success state container
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial parameters when triggered from packages/calculator
  useEffect(() => {
    if (initialData) {
      setSelectedPack(initialData.packageName);
      setGuests(initialData.guestCount);
      setServices(initialData.services);
      setCost(initialData.cost);
      setCatering(initialData.cateringTier);
      if (initialData.customMenu) {
        setMenuItems(initialData.customMenu);
      } else {
        setMenuItems([]);
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !date) {
      alert('Kindly complete your name, email, contact number, and selected event date.');
      return;
    }

    setIsSubmitting(true);

    // Generate luxurious Booking Invoice registry
    const refCode = `BEE-${Math.floor(100000 + Math.random() * 90000)}`;
    const docId = `book-${Date.now()}`;
    const newBooking: BookingRequest = {
      id: docId,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      eventDate: date,
      eventType: eventType,
      guestCount: guests,
      selectedPackageId: selectedPack,
      selectedServices: services,
      customMessage: customNotes,
      estimatedCost: cost,
      bookingRef: refCode,
      timestamp: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      customMenu: menuItems,
    };

    const submitToFirestore = async () => {
      try {
        await setDoc(doc(db, 'bookings', docId), {
          clientName: newBooking.clientName,
          clientEmail: newBooking.clientEmail,
          clientPhone: newBooking.clientPhone,
          eventDate: newBooking.eventDate,
          eventType: newBooking.eventType,
          guestCount: Number(newBooking.guestCount),
          selectedPackageId: newBooking.selectedPackageId,
          selectedServices: newBooking.selectedServices || [],
          customMessage: newBooking.customMessage || '',
          estimatedCost: Number(newBooking.estimatedCost),
          bookingRef: newBooking.bookingRef,
          timestamp: newBooking.timestamp,
          customMenu: newBooking.customMenu || []
        });

        // Save persistent fallback to localStorage
        const saved = JSON.parse(localStorage.getItem('bee_bookings') || '[]');
        saved.push(newBooking);
        localStorage.setItem('bee_bookings', JSON.stringify(saved));

        setConfirmedBooking(newBooking);
      } catch (error) {
        console.error("Failed to post booking reference to Firestore:", error);
        
        // Local state graceful fallback
        const saved = JSON.parse(localStorage.getItem('bee_bookings') || '[]');
        saved.push(newBooking);
        localStorage.setItem('bee_bookings', JSON.stringify(saved));
        setConfirmedBooking(newBooking);

        handleFirestoreError(error, OperationType.CREATE, `bookings/${docId}`);
      } finally {
        setIsSubmitting(false);
      }
    };

    submitToFirestore();
  };


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main card box */}
      <div className="relative w-full max-w-2xl bg-brand-ivory border-2 border-brand-gold/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10 max-h-[92vh] flex flex-col">
        
        {/* Banner header top */}
        <div className="bg-brand-navy p-6 border-b border-brand-gold/20 flex justify-between items-center relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-brand-gold bg-brand-white/10 px-2.5 py-1 rounded-sm uppercase">
              The Blue Eye Core Experience
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-white tracking-wide mt-2">
              {confirmedBooking ? 'Your Luxury Appointment Secured' : 'Plan Your Unforgettable Memory'}
            </h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Ticket layout */
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow printable">
            
            <div className="text-center py-4 bg-brand-bg/50 border border-brand-gold/25 rounded-2xl p-4">
              <div className="w-14 h-14 bg-[#2E7D32]/10 border border-[#2E7D32] rounded-full mx-auto flex items-center justify-center text-[#2E7D32]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-sm font-mono uppercase tracking-widest text-brand-navy font-bold mt-3">
                Event Booking Reference Generated
              </p>
              <h4 className="font-serif text-3xl font-bold text-[#2E7D32] tracking-wide mt-1.5 font-mono">
                {confirmedBooking.bookingRef}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1">
                A personal event director will contact you within 12 hours via email or phone.
              </p>
            </div>

            {/* Ticket Card Details */}
            <div className="border border-brand-gold/20 rounded-xl bg-brand-white overflow-hidden shadow-inner">
              <div className="p-4 bg-brand-navy/5 border-b border-slate-100 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-navy">
                  Consultation Itinerary Ticket
                </span>
              </div>
              
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[#888] font-mono uppercase text-[9px] tracking-wide">Client Patron</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{confirmedBooking.clientName}</p>
                </div>
                <div>
                  <p className="text-[#888] font-mono uppercase text-[9px] tracking-wide">Event Date</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{new Date(confirmedBooking.eventDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</p>
                </div>
                <div>
                  <p className="text-[#888] font-mono uppercase text-[9px] tracking-wide">Celebration Type</p>
                  <p className="font-serif font-bold text-brand-navy text-sm mt-0.5">{confirmedBooking.eventType}</p>
                </div>
                <div>
                  <p className="text-[#888] font-mono uppercase text-[9px] tracking-wide">Guest Attendance size</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{confirmedBooking.guestCount} RSVP guests planned</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[#888] font-mono uppercase text-[9px] tracking-wide">Experience baseline selected</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    {confirmedBooking.selectedPackageId} package {confirmedBooking.selectedServices.length > 0 ? `(+ ${confirmedBooking.selectedServices.length} custom modules)` : ''}
                  </p>
                </div>
                {confirmedBooking.customMenu && confirmedBooking.customMenu.length > 0 && (
                  <div className="sm:col-span-2 bg-[#FAF7F4] border border-brand-gold/25 p-3.5 rounded-xl">
                    <p className="text-brand-navy font-mono uppercase text-[9px] tracking-wide font-bold">Personalized Banqueting Menu</p>
                    <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-serif italic">
                      {confirmedBooking.customMenu.join(' • ')}
                    </p>
                  </div>
                )}
                <div className="sm:col-span-2 border-t border-dashed border-slate-200 pt-3.5 mt-1.5 flex justify-between items-center">
                  <div>
                    <p className="text-[#888] font-mono uppercase text-[9px] tracking-wide">Verified Booking Total</p>
                    <p className="text-brand-navy font-bold font-serif text-lg mt-0.5">₹{confirmedBooking.estimatedCost.toLocaleString('en-IN')}*</p>
                  </div>
                  <span className="text-[9px] bg-[#EBF5EE] text-[#2E7D32] px-2 py-1 rounded font-bold uppercase tracking-wider font-mono border border-[#2E7D32]/20">
                    Active / Tentative Quote
                  </span>
                </div>
              </div>
            </div>

            {/* Print trigger and exit */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Printer className="w-4 h-4" />
                PRINT TICKET
              </button>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onClose();
                }}
                className="flex-1 py-3 bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-brand-ivory font-mono text-xs font-bold uppercase rounded-xl transition-all border border-brand-gold/30"
              >
                FINISH PLANNING
              </button>
            </div>

          </div>
        ) : (
          /* Submission Input Form layout */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-grow">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Client Name */}
              <div>
                <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <UserCheck className="w-4 h-4 text-brand-gold" />
                  </span>
                  <input
                    type="text"
                    id="book-name-input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Devrajsinh Jadej"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              {/* Event Date */}
              <div>
                <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                  Desired Event Date *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Calendar className="w-4 h-4 text-brand-gold" />
                  </span>
                  <input
                    type="date"
                    id="book-date-input"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Mail className="w-4 h-4 text-brand-gold" />
                  </span>
                  <input
                    type="email"
                    id="book-email-input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@luxuryevent.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              {/* Phone Line */}
              <div>
                <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Phone className="w-4 h-4 text-brand-gold" />
                  </span>
                  <input
                    type="tel"
                    id="book-phone-input"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              {/* Event Category dropdown */}
              <div>
                <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                  Event Category
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Gift className="w-4 h-4 text-brand-gold" />
                  </span>
                  <select
                    id="book-type-select"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  >
                    <option value="Wedding Function">Wedding / Marriage Ceremony</option>
                    <option value="Grand Sangeet">Grand Sangeet Night</option>
                    <option value="Family Celebrations">Mehendi or Pre-wedding Ritual</option>
                    <option value="Corporate Gala">Corporate / High-society Gala</option>
                    <option value="Elite Photography">Elite Portrait photoshoot</option>
                    <option value="Private Dinner Catering">Intimate Private Catering Banquet</option>
                    <option value="Birthdays & Milestone">Grand Birthday / Anniversary</option>
                  </select>
                </div>
              </div>

              {/* Guest Count slider/input */}
              <div>
                <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                  Event Guest Size
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Users className="w-4 h-4 text-brand-gold" />
                  </span>
                  <input
                    type="number"
                    id="book-guests-input"
                    min="10"
                    max="2000"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

            </div>

            {/* Custom Notes text area */}
            <div>
              <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                Special Requests or Custom Details
              </label>
              <textarea
                id="book-notes-input"
                rows={3}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Share any structural expectations, location ideas, floral choices, or particular caterer cuisines you have in mind..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            {/* Dynamic calculator summary card preview inside booking popup */}
            <div className="bg-brand-navy/5 border border-brand-gold/25 rounded-2xl p-4.5 flex justify-between items-center">
              <div>
                <p className="text-[#888] font-mono uppercase text-[9px]">Calculated Itinerary Estimate</p>
                <p className="text-[13px] font-serif font-bold text-brand-navy mt-1">
                  {selectedPack} {services.length > 0 ? `(with ${services.length} extras)` : ''}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Catering: {catering.split(' ')[0]} tier</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 font-mono block">Estimated gross</span>
                <span className="text-black font-serif text-lg font-bold">₹{cost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[9.5px] italic text-[#777] leading-tight">
              By submitting this planning sheet, you book a private virtual or face-to-face consultation session with our design leaders. Dates are hold reserved tentatively subject to confirmation.
            </p>

            {/* Submit buttons */}
            <button
              type="submit"
              id="book-submit-btn"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-navy hover:bg-brand-gold text-brand-ivory hover:text-brand-navy font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 border border-brand-gold/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Securing Celebration Appointment...' : 'SECURE EVENT APPOINTMENT'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
