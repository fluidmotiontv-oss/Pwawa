import React, { useState, useEffect } from 'react';
import { Waves, Sparkles, AlertTriangle, Play, Users, MessageSquare, ArrowUpRight, ShieldCheck, ChevronRight, Calendar, MapPin, Heart, Share2, Check } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AvatarLauncher } from './components/AvatarLauncher';
import { BriefingModal } from './components/BriefingModal';
import { MarineReportModal } from './components/MarineReportModal';
import { AskManaSection } from './components/AskManaSection';
import { PartnerModal } from './components/PartnerModal';
import { VideoModal } from './components/VideoModal';

import { DEFAULT_SURF_CONDITIONS, MOCK_VIDEOS, MOCK_SPONSORS, MOCK_EVENTS, AVATAR_PROFILES } from './data/mockData';
import { SurfCondition, VideoUpdate, Sponsor, ClubEvent } from './types';
import confetti from 'canvas-confetti';

export default function App() {
  const [surfConditions, setSurfConditions] = useState<SurfCondition[]>(DEFAULT_SURF_CONDITIONS);
  const [videos, setVideos] = useState<VideoUpdate[]>(MOCK_VIDEOS);
  const [sponsors, setSponsors] = useState<Sponsor[]>(MOCK_SPONSORS);
  const [events, setEvents] = useState<ClubEvent[]>(MOCK_EVENTS);

  // Modal States
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [marineModalOpen, setMarineModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoUpdate | null>(null);

  // Selected Surf Spot Detail Filter
  const [selectedSpotId, setSelectedSpotId] = useState<string>('bar-main');
  const [eventRsvp, setEventRsvp] = useState<Record<string, boolean>>({});

  // Check initial load briefing modal dismissal state
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const dismissedDate = localStorage.getItem('pwbc_briefing_dismissed_date');
    if (dismissedDate !== todayStr) {
      // Auto-open briefing modal on initial visit
      const timer = setTimeout(() => {
        setBriefingOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const currentCondition = surfConditions.find((s) => s.id === selectedSpotId) || surfConditions[0];
  const featuredVideo = videos.find((v) => v.featured) || videos[0];
  const featuredSponsor = sponsors[0];

  const handleRsvp = (eventId: string) => {
    setEventRsvp((prev) => {
      const nextState = !prev[eventId];
      if (nextState) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#E5D3B3', '#38BDF8', '#10B981'],
        });
      }
      return { ...prev, [eventId]: nextState };
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-slate-100 flex flex-col font-sans selection:bg-[#E5D3B3] selection:text-[#0A1A2F]">
      
      {/* Top Navbar */}
      <Navbar
        currentCondition={currentCondition}
        onOpenBriefing={() => setBriefingOpen(true)}
        onOpenMarineReport={() => setMarineModalOpen(true)}
        onOpenAskMana={() => {
          const spokesmanEl = document.getElementById('spokesman');
          if (spokesmanEl) spokesmanEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPartner={() => setPartnerModalOpen(true)}
      />

      {/* EDITORIAL HERO SECTION */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        {/* Subtle background graphic ring */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none -mr-20 -mt-20">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-current text-[#E5D3B3]">
            <circle cx="50" cy="50" r="45" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="35" strokeWidth="0.3" fill="none" />
            <circle cx="50" cy="50" r="25" strokeWidth="0.2" fill="none" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Main Hero Layout matching Editorial Aesthetic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Sand Editorial Host Card (#E5D3B3) */}
            <div className="lg:col-span-5 bg-[#E5D3B3] text-[#0A1A2F] p-8 sm:p-10 rounded-3xl border-2 border-[#0A1A2F] shadow-2xl flex flex-col justify-between relative">
              <div>
                <span className="font-serif italic text-2xl text-[#0A1A2F] block mb-2">
                  Port Waikato
                </span>
                <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.9] uppercase tracking-tighter text-[#0A1A2F] mb-6">
                  The<br />Daily<br />Session
                </h1>

                {/* Host Quote Box */}
                <div className="bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-sm mb-6">
                  <div className="w-20 h-20 bg-[#0A1A2F] rounded-full flex items-center justify-center mb-3 overflow-hidden border-2 border-[#0A1A2F]">
                    <img
                      src={AVATAR_PROFILES.avatarImage}
                      alt={AVATAR_PROFILES.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[#0A1A2F] font-serif italic text-base font-medium leading-tight">
                    "Kia ora! I'm {AVATAR_PROFILES.name}. The Bar is looking solid today at {currentCondition.swellHeight}. Watch the outgoing tide stream!"
                  </p>
                  <span className="inline-block mt-3 text-[10px] uppercase tracking-widest text-[#0A1A2F] font-bold opacity-70">
                    Your Local Host & Safety Ambassador
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setBriefingOpen(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#0A1A2F] text-[#E5D3B3] hover:bg-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Launch Briefing Modal</span>
                </button>
              </div>
            </div>

            {/* Right Column: High-Impact Video Spotlight & Telemetry */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Telemetry Bar */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1 block font-bold">
                      Swell
                    </span>
                    <div className="text-3xl font-serif italic font-bold text-white">
                      {currentCondition.swellHeight.split(' ')[0]}
                      <span className="text-sm uppercase not-italic font-sans opacity-60 ml-1">
                        {currentCondition.swellHeight.split(' ')[1] || 'm'}
                      </span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-white/10 hidden sm:block" />

                  <div>
                    <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1 block font-bold">
                      Wind
                    </span>
                    <div className="text-3xl font-serif italic font-bold text-white">
                      {currentCondition.windSpeed.split(' ')[0]}
                      <span className="text-sm uppercase not-italic font-sans opacity-60 ml-1">
                        kts
                      </span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-white/10 hidden sm:block" />

                  <div>
                    <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1 block font-bold">
                      High Tide
                    </span>
                    <div className="text-3xl font-serif italic font-bold text-white">
                      11:15
                      <span className="text-sm uppercase not-italic font-sans opacity-60 ml-1">
                        am
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMarineModalOpen(true)}
                  className="bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 px-4 py-2 rounded-full flex items-center gap-2 transition-colors shrink-0"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider">
                    Bar Warning: Active
                  </span>
                </button>
              </div>

              {/* Featured Hero Video Card */}
              <div
                onClick={() => setActiveVideo(featuredVideo)}
                className="relative flex-1 min-h-[280px] bg-white/5 rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
              >
                <img
                  src={featuredVideo.thumbnailUrl}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/40 to-transparent" />

                {/* Big Editorial Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#E5D3B3] text-[#0A1A2F] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-[#0A1A2F] ml-1" />
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div>
                    <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1 block font-bold">
                      Latest Action Release
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tighter text-white">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-xs text-slate-300 max-w-md mt-1 line-clamp-2 italic font-serif">
                      {featuredVideo.description}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SURF & BAR CONDITIONS SECTION */}
      <section id="surf-report" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#E5D3B3] text-xs font-serif italic uppercase tracking-widest block mb-2">
                Real-Time Coastal Telemetry
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-white">
                Surf & Bar <span className="font-serif italic lowercase font-normal text-[#E5D3B3]">conditions</span>
              </h2>
            </div>

            <button
              onClick={() => setMarineModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-white/5 border border-[#E5D3B3]/40 text-[#E5D3B3] hover:bg-[#E5D3B3] hover:text-[#0A1A2F] font-bold text-xs uppercase tracking-widest transition-all self-start md:self-auto flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Full Marine & Bar Safety Report</span>
            </button>
          </div>

          {/* Spot Selector Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {surfConditions.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedSpotId(spot.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                  selectedSpotId === spot.id
                    ? 'bg-[#E5D3B3] text-[#0A1A2F] shadow-lg scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {spot.spotName}
              </button>
            ))}
          </div>

          {/* Detailed Selected Spot Display */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-[#E5D3B3] text-[#0A1A2F] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {currentCondition.spotName}
                </span>
                <span className="text-xs text-slate-400">{currentCondition.lastUpdated}</span>
              </div>

              {/* Main Swell Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#132A4A] p-5 rounded-2xl border border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E5D3B3] font-bold block mb-1">
                    Swell Height
                  </span>
                  <div className="text-2xl font-serif italic font-bold text-white">
                    {currentCondition.swellHeight}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E5D3B3] font-bold block mb-1">
                    Direction
                  </span>
                  <div className="text-sm font-bold text-white mt-1">
                    {currentCondition.swellDirection}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E5D3B3] font-bold block mb-1">
                    Wind Vector
                  </span>
                  <div className="text-sm font-bold text-white mt-1">
                    {currentCondition.windDirection} ({currentCondition.windSpeed})
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E5D3B3] font-bold block mb-1">
                    Water Temp
                  </span>
                  <div className="text-2xl font-serif italic font-bold text-white">
                    {currentCondition.waterTemp}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-serif italic">
                {currentCondition.barDescription}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setBriefingOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Host Commentary</span>
                </button>
              </div>
            </div>

            {/* Right Side Avatar Commentary Preview */}
            <div className="lg:col-span-5 bg-[#E5D3B3] text-[#0A1A2F] p-6 rounded-2xl border-2 border-[#0A1A2F] relative space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={AVATAR_PROFILES.avatarImage}
                  alt={AVATAR_PROFILES.name}
                  className="w-12 h-12 rounded-full border-2 border-[#0A1A2F] object-cover"
                />
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#0A1A2F]/70 block">
                    Host Avatar Read
                  </span>
                  <h4 className="font-bold text-sm text-[#0A1A2F]">
                    {AVATAR_PROFILES.name}'s Spot Breakdown
                  </h4>
                </div>
              </div>

              <blockquote className="text-xs font-serif italic font-semibold leading-relaxed text-[#0A1A2F]/90">
                "{currentCondition.avatarCommentary}"
              </blockquote>

              <div className="pt-2 text-[10px] font-bold uppercase tracking-widest text-[#0A1A2F]/60">
                Port Waikato Boardriders Safety Network
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CHANNEL VIDEO SPOTLIGHT SECTION */}
      <section id="channel-videos" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[#E5D3B3] text-xs font-serif italic uppercase tracking-widest block mb-2">
              Community Media & Edits
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-white">
              Channel Video Spotlight
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Heavy barrels, grom comp highlights, and bar navigation tutorials from Port Waikato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-[#E5D3B3]/50 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#E5D3B3] text-[#0A1A2F] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-[#0A1A2F] ml-0.5" />
                  </div>

                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[#E5D3B3] text-[10px] font-bold uppercase tracking-widest block">
                    {vid.category} • {vid.date}
                  </span>
                  <h3 className="font-bold text-base text-white uppercase tracking-tight group-hover:text-[#E5D3B3] transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 font-serif italic">
                    {vid.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ASK MANA AI AVATAR SPOKESMAN SECTION */}
      <AskManaSection
        onOpenMarineReport={() => setMarineModalOpen(true)}
        onOpenPartnerInquiry={() => setPartnerModalOpen(true)}
      />

      {/* CLUB EVENTS & GROM CIRCUIT */}
      <section id="club-events" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#E5D3B3] text-xs font-serif italic uppercase tracking-widest block mb-2">
                Community Calendar
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-white">
                Club Events & Comps
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E5D3B3]/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#E5D3B3] text-[#0A1A2F] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {evt.category}
                    </span>
                    {evt.badge && (
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        {evt.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    {evt.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#E5D3B3]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E5D3B3]" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-serif italic leading-relaxed pt-2 border-t border-white/10">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleRsvp(evt.id)}
                    className={`w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      eventRsvp[evt.id]
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white'
                    }`}
                  >
                    {eventRsvp[evt.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Registered for Event</span>
                      </>
                    ) : (
                      <span>Sign Up / RSVP</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LOCAL SPONSORS & PARTNERS SECTION */}
      <section id="sponsors" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D223F]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#E5D3B3] text-xs font-serif italic uppercase tracking-widest block mb-2">
                Local Business Backers
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-white">
                Sponsors & Partners
              </h2>
            </div>

            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white font-bold text-xs uppercase tracking-widest transition-colors self-start md:self-auto"
            >
              Partner with PWBC / Advertise Here
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sponsors.map((spon) => (
              <div
                key={spon.id}
                className="bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[#E5D3B3] text-[10px] uppercase font-bold tracking-widest block mb-1">
                    {spon.tier} • {spon.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {spon.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-serif italic leading-relaxed mb-4">
                    {spon.description}
                  </p>

                  {spon.discountPerk && (
                    <div className="bg-[#E5D3B3] text-[#0A1A2F] text-[11px] font-bold p-2.5 rounded-xl mb-4">
                      {spon.discountPerk}
                    </div>
                  )}
                </div>

                <a
                  href={spon.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E5D3B3] text-xs font-bold uppercase tracking-widest transition-colors block"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071324] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E5D3B3] flex items-center justify-center text-[#0A1A2F] font-serif font-bold">
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wider block">
                Port Waikato Boardriders Club
              </span>
              <span className="text-[10px] text-slate-400">
                Sunset Beach, Port Waikato, New Zealand • VHF Ch. 64
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider font-semibold">
            <button onClick={() => setMarineModalOpen(true)} className="hover:text-[#E5D3B3]">
              Bar Safety
            </button>
            <button onClick={() => setBriefingOpen(true)} className="hover:text-[#E5D3B3]">
              Daily Session Host
            </button>
            <button onClick={() => setPartnerModalOpen(true)} className="hover:text-[#E5D3B3]">
              Sponsorship
            </button>
          </div>

          <div className="text-[10px] opacity-60">
            © {new Date().getFullYear()} Port Waikato Boardriders Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* FLOATING CORNER AVATAR HOST LAUNCHER */}
      <AvatarLauncher
        onOpenBriefing={() => setBriefingOpen(true)}
        speechBubbleText={`Kia ora! Sunset Beach is ${currentCondition.swellHeight} today. Check the Bar report!`}
      />

      {/* POPUP MODALS */}
      <BriefingModal
        isOpen={briefingOpen}
        onClose={() => setBriefingOpen(false)}
        condition={currentCondition}
        featuredVideo={featuredVideo}
        featuredSponsor={featuredSponsor}
        onWatchVideo={(vid) => setActiveVideo(vid)}
        onOpenMarineReport={() => {
          setBriefingOpen(false);
          setMarineModalOpen(true);
        }}
        onOpenPartnerInquiry={() => {
          setBriefingOpen(false);
          setPartnerModalOpen(true);
        }}
      />

      <MarineReportModal
        isOpen={marineModalOpen}
        onClose={() => setMarineModalOpen(false)}
        conditions={surfConditions}
      />

      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

    </div>
  );
}
