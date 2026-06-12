import React from 'react';
import { X, CheckCircle2, ChevronRight, Clock, Star, Heart } from 'lucide-react';
import { ServiceItem } from '../types';
import * as Icons from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectService: (id: string) => void;
  isSelectedInCalculator: boolean;
}

// Visual placeholders tied directly to our services for luxury appeal
const SERVICE_IMAGES: Record<string, string> = {
  decor: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  planning: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  sangeet: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  photo: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
  catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  destination: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  video: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
  admin: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
};

export default function ServiceDetailModal({
  service,
  onClose,
  onSelectService,
  isSelectedInCalculator,
}: ServiceDetailModalProps) {
  if (!service) return null;

  // Dynamically resolve Icon component
  const IconComponent = (Icons as any)[service.icon] || Icons.Sparkles;
  const imageSrc = SERVICE_IMAGES[service.id] || SERVICE_IMAGES.decor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-brand-ivory border-2 border-brand-gold/35 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 z-10">
        
        {/* Banner/Photo Left Pane */}
        <div className="relative w-full md:w-5/12 h-48 md:h-auto bg-brand-navy flex flex-col justify-between p-6 overflow-hidden">
          {/* Background image covering */}
          <div className="absolute inset-0">
            <img
              src={imageSrc}
              alt={service.name}
              className="w-full h-full object-cover opacity-45 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider font-mono text-brand-gold bg-brand-white/10 uppercase border border-brand-gold/20">
              <Star className="w-3 h-3 fill-brand-gold text-brand-gold" /> Premium Service Item
            </span>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="w-12 h-12 bg-brand-gold/15 border border-brand-gold text-brand-gold rounded-xl flex items-center justify-center mb-3">
              <IconComponent className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-ivory tracking-wide leading-tight">
              {service.name}
            </h3>
            <p className="text-brand-gold font-mono text-sm font-semibold tracking-wide mt-1">
              Est. Cost From ₹{service.basePrice.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Details Content Right Pane */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-none flex flex-col">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors z-20 bg-brand-ivory/80 shadow border border-slate-200/55"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-5 flex-grow">
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-[#888] uppercase">
                Detailed Overview
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                {service.fullDescription}
              </p>
            </div>

            <hr className="border-brand-gold/20" />

            {/* Highlights Inclusions */}
            <div>
              <h4 className="text-[11px] font-mono tracking-widest text-[#888] uppercase mb-3.5">
                Included Deliverables & Excellence
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-brand-dark">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold relative top-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction Banner */}
            <div className="bg-brand-bg/55 border border-brand-gold/20 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy shrink-0">
                <Heart className="w-4 h-4 fill-brand-navy text-brand-navy" />
              </div>
              <div className="text-[11px] leading-relaxed text-slate-600">
                <span className="font-bold text-brand-navy">The Blue Eye Signature standard</span>: includes an expert event director, 24/7 dedicated support, back-up power planning, and professional vendor insurance.
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onSelectService(service.id);
                onClose();
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                isSelectedInCalculator
                  ? 'bg-[#EBF5EE] text-[#2E7D32] border border-[#2E7D32]/30 hover:bg-[#E1EFEB]'
                  : 'bg-brand-navy text-brand-ivory hover:bg-brand-gold hover:text-brand-navy border border-brand-gold/15'
              }`}
            >
              {isSelectedInCalculator ? '✓ SELECTED FOR QUOTE' : 'ADD TO QUOTE CALCULATOR'}
            </button>
            <a
              href="#calculator"
              onClick={onClose}
              className="py-3 px-5 text-center bg-transparent hover:bg-slate-50 text-brand-navy border border-brand-navy/35 rounded-xl text-xs font-mono font-bold tracking-wider uppercase"
            >
              VIEW CALCULATION
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
