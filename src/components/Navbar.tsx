import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarDays, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export default function Navbar({ onOpenBooking, onOpenCalculator }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Calculator', href: '#calculator', badge: 'Interactive' },
    { label: 'Packages', href: '#packages' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-md py-3 border-b border-brand-gold/25'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#home" className="group flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center border-2 border-brand-gold shadow-md">
                <Sparkles className="w-5 h-5 text-brand-gold group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-gold-bright rounded-full animate-ping" />
              </div>
              <div className="flex flex-col ml-1">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors">
                  The Blue Eye
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#666] font-mono leading-none">
                  E v e n t s
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium tracking-wide text-brand-navy hover:text-brand-gold transition-all duration-200 group"
              >
                {item.label}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 text-[8px] bg-brand-gold text-brand-navy font-bold rounded-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
                {/* Underline Hover effect */}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
            ))}
          </div>

          {/* Booking CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              id="nav-calc-btn"
              onClick={onOpenCalculator}
              className="px-4 py-2 text-xs font-mono tracking-wider font-semibold border-2 border-brand-gold text-brand-navy rounded-full bg-transparent hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
            >
              ESTIMATE COST
            </button>
            <button
              id="nav-book-btn"
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-brand-navy text-brand-ivory text-xs font-semibold tracking-wider font-mono border border-brand-gold/30 rounded-full hover:bg-brand-gold hover:text-brand-navy shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              PLAN MY EVENT
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              id="nav-mobile-calc-btn"
              onClick={onOpenCalculator}
              className="px-3 py-1.5 text-[10px] font-mono border border-brand-gold text-brand-navy rounded-full bg-brand-ivory hover:bg-brand-gold hover:text-brand-navy transition-all"
            >
              Calculator
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-navy hover:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-md"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-brand-ivory border-b border-brand-gold/30 shadow-lg">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-brand-navy hover:bg-brand-navy hover:text-brand-gold transition-colors duration-200"
            >
              {item.label}
              {item.badge && (
                <span className="ml-2 px-1.5 py-0.5 text-[8px] tracking-widest bg-brand-gold text-brand-navy rounded font-bold uppercase">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center bg-brand-navy text-brand-ivory font-semibold text-sm tracking-wide rounded-md shadow hover:bg-brand-gold hover:text-brand-navy transition-all flex items-center justify-center gap-2 border border-brand-gold/50"
            >
              <CalendarDays className="w-4 h-4" />
              PLAN MY EVENT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
