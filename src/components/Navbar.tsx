import React, { useState } from 'react';
import { Waves, Sparkles, AlertTriangle, MessageSquare } from 'lucide-react';
import { SurfCondition } from '../types';

interface NavbarProps {
  currentCondition: SurfCondition;
  onOpenBriefing: () => void;
  onOpenMarineReport: () => void;
  onOpenAskMana: () => void;
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCondition,
  onOpenBriefing,
  onOpenMarineReport,
  onOpenAskMana,
  onOpenPartner,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0A1A2F]/95 backdrop-blur-md border-b border-white/10 text-white shadow-xl">
      {/* Editorial Top Bar: Live Conditions Ticker */}
      <div className="bg-[#132A4A] px-4 py-1.5 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 bg-[#E5D3B3] text-[#0A1A2F] px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              Bar Alert Active
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="font-medium text-slate-200">
              Sunset Beach: <strong className="text-[#E5D3B3] font-serif italic">{currentCondition.swellHeight}</strong> • {currentCondition.swellDirection} • {currentCondition.windDirection}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenMarineReport}
              className="inline-flex items-center gap-1 text-[#E5D3B3] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Bar Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Club Name in Editorial Style */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#E5D3B3] flex items-center justify-center text-[#0A1A2F] font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                <Waves className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5D3B3] font-serif italic block">
                  Port Waikato
                </span>
                <span className="font-bold text-lg tracking-tighter uppercase text-white block leading-tight">
                  Boardriders
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-slate-300">
            <button
              onClick={onOpenBriefing}
              className="flex items-center gap-2 text-[#E5D3B3] hover:text-white transition-colors py-1.5 px-3 rounded-full bg-white/5 border border-[#E5D3B3]/20 hover:border-[#E5D3B3]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5D3B3]" />
              <span>The Daily Session</span>
            </button>
            <a href="#surf-report" className="hover:text-[#E5D3B3] transition-colors">
              Surf & Bar
            </a>
            <a href="#channel-videos" className="hover:text-[#E5D3B3] transition-colors">
              Videos
            </a>
            <a href="#spokesman" className="hover:text-[#E5D3B3] transition-colors">
              Ask Host
            </a>
            <a href="#sponsors" className="hover:text-[#E5D3B3] transition-colors">
              Partners
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAskMana}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/20 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E5D3B3]" />
              <span>Ask Mana</span>
            </button>

            <button
              onClick={onOpenBriefing}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Host Briefing</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBriefing}
              className="p-2 rounded-full bg-[#E5D3B3] text-[#0A1A2F]"
              title="Open Briefing"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A1A2F] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBriefing();
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#E5D3B3] text-[#0A1A2F] font-bold text-xs uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Host Briefing Modal
            </span>
            <span className="text-[10px] bg-[#0A1A2F] text-white px-2 py-0.5 rounded-full">Open</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMarineReport();
            }}
            className="w-full flex items-center gap-2 p-3 rounded-2xl bg-white/5 text-slate-200 text-xs font-semibold border border-white/10"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Marine & Bar Safety Report</span>
          </button>

          <div className="pt-2 border-t border-white/10 space-y-1 text-xs uppercase tracking-widest text-slate-300">
            <a
              href="#surf-report"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Surf & Bar Conditions
            </a>
            <a
              href="#channel-videos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Channel Videos
            </a>
            <a
              href="#spokesman"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Ask Host Mana
            </a>
            <a
              href="#sponsors"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Sponsors & Partners
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPartner();
              }}
              className="w-full py-2.5 rounded-full bg-[#E5D3B3]/20 text-[#E5D3B3] border border-[#E5D3B3]/40 font-bold text-xs uppercase tracking-wider"
            >
              Partner with PWBC
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
