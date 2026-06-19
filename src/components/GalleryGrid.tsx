import React, { useState } from 'react';
import { galleryData } from '../data';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, X, Image as ImageIcon } from 'lucide-react';

export default function GalleryGrid() {
  const [filter, setFilter] = useState<string>('all');
  const [zoomedImage, setZoomedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { label: 'All Decor', id: 'all' },
    { label: 'Wedding Decor', id: 'wedding' },
    { label: 'Birthday Decor', id: 'birthday' },
    { label: 'Engagement Decor', id: 'engagement' },
    { label: 'Corporate Events', id: 'corporate' },
    { label: 'Baby Shower Events', id: 'babyshower' },
    { label: 'Anniversary Celebrations', id: 'anniversary' },
    { label: 'Reception Decor', id: 'reception' },
    { label: 'Haldi Decor', id: 'haldi' },
  ];

  const filteredItems = filter === 'all'
    ? galleryData
    : galleryData.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-brand-bg relative border-b border-brand-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold flex justify-center items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-brand-gold" />
            VISUAL PORTFOLIO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight animate-fade-in">
            A Glimpse of Perfection
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Every snapshot tells a story of dedicated craftsmanship. Browse our high-end decor configurations, lively sangeets, and pristine culinary setups.
          </p>
        </div>

        {/* Categories Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-${cat.id}`}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider font-semibold uppercase transition-all duration-300 border cursor-pointer ${
                filter === cat.id
                  ? 'bg-brand-navy text-brand-gold border-brand-gold shadow-md'
                  : 'bg-brand-white text-slate-600 border-slate-200/60 hover:border-brand-gold/45 hover:text-brand-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Visual Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setZoomedImage(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-brand-navy border border-brand-gold/15 shadow-md flex h-72 animate-in fade-in transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-gold/40"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Photo */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-75"
                referrerPolicy="no-referrer"
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/95 via-[#0A1128]/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 z-10" />

              {/* Text Hover card */}
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                <span className="text-[10px] font-mono font-bold text-brand-gold uppercase tracking-widest block drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  {item.category}
                </span>
                <p className="font-serif text-[15px] font-semibold text-white tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {item.title}
                </p>
                <p className="text-[11px] text-gray-200 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  {item.description}
                </p>
              </div>

              {/* Hover indicator max button */}
              <div className="absolute top-4 right-4 p-2 bg-brand-white/10 backdrop-blur-md rounded-full border border-brand-gold/20 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Blank state if no items folder category */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-brand-white rounded-2xl border border-slate-200/70">
            <ImageIcon className="w-12 h-12 text-brand-gold mx-auto opacity-50" />
            <p className="font-mono text-sm font-semibold tracking-wider text-brand-navy mt-4">
              More Memories Arriving Soon
            </p>
            <p className="text-xs text-slate-500 mt-1">We are compiling photos from recent luxurious weddings!</p>
          </div>
        )}

        {/* Zoom Lightbox Modal overlay */}
        {zoomedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-brand-navy/85 backdrop-blur-md transition-opacity duration-300"
              onClick={() => setZoomedImage(null)}
            />
            
            <div className="relative max-w-3xl w-full bg-brand-ivory border border-brand-gold rounded-2xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
              
              {/* Image banner */}
              <div className="relative aspect-video">
                <img
                  src={zoomedImage.imageUrl}
                  alt={zoomedImage.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button overlay */}
                <button
                  onClick={() => setZoomedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-brand-navy text-brand-gold hover:bg-brand-gold hover:text-brand-navy rounded-full transition-colors font-bold shadow border border-brand-gold/40 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content description base */}
              <div className="p-6 bg-brand-ivory text-brand-navy">
                <span className="px-2 py-0.5 bg-brand-navy/5 text-brand-gold text-[9px] font-mono font-bold tracking-widest uppercase rounded">
                  {zoomedImage.category}
                </span>
                <h4 className="font-serif text-xl font-bold tracking-wide mt-2">
                  {zoomedImage.title}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {zoomedImage.description}
                </p>
                <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-[#888] border-t border-slate-100 pt-3">
                  <span>Planners: The Blue Eye Events Staff</span>
                  <span>Copyright © 2026</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
