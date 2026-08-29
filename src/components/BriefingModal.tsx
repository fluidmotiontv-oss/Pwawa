import React, { useState } from 'react';
import { Volume2, VolumeX, AlertTriangle, Play, Sparkles, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SurfCondition, VideoUpdate, Sponsor } from '../types';
import { AVATAR_PROFILES } from '../data/mockData';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  condition: SurfCondition;
  featuredVideo: VideoUpdate;
  featuredSponsor: Sponsor;
  onWatchVideo: (video: VideoUpdate) => void;
  onOpenMarineReport: () => void;
  onOpenPartnerInquiry: () => void;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({
  isOpen,
  onClose,
  condition,
  featuredVideo,
  featuredSponsor,
  onWatchVideo,
  onOpenMarineReport,
  onOpenPartnerInquiry,
}) => {
  const [dontShowToday, setDontShowToday] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const handleDismiss = () => {
    if (dontShowToday) {
      const todayStr = new Date().toISOString().split('T')[0];
      localStorage.setItem('pwbc_briefing_dismissed_date', todayStr);
    }
    onClose();
  };

  const handleVoicePlay = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const text = `${AVATAR_PROFILES.greeting} Today at Port Waikato, swell is ${condition.swellHeight}, wind is ${condition.windDirection} at ${condition.windSpeed}. Tide is ${condition.tideCurrent}. ${condition.barDescription}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.98;
        utterance.pitch = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A1A2F]/80 backdrop-blur-lg animate-fade-in">
      {/* Modal Container in Editorial Aesthetic Style */}
      <div className="relative w-full max-w-5xl bg-[#0A1A2F] text-white rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh]">
        
        {/* ASIDE: Sand Editorial Host Card (#E5D3B3) */}
        <aside className="w-full md:w-1/3 bg-[#E5D3B3] text-[#0A1A2F] p-6 sm:p-8 flex flex-col justify-between relative shrink-0 border-b md:border-b-0 md:border-r border-[#0A1A2F]/20">
          <div className="z-10">
            <span className="text-[#0A1A2F] font-serif italic text-lg sm:text-xl block mb-1">
              Port Waikato
            </span>
            <h1 className="text-[#0A1A2F] font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[0.92] uppercase tracking-tighter mb-4 sm:mb-6">
              The<br />Daily<br />Session
            </h1>
          </div>

          {/* Avatar Character Card */}
          <div className="z-10 bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0A1A2F] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#0A1A2F] shrink-0">
                <img
                  src={AVATAR_PROFILES.avatarImage}
                  alt={AVATAR_PROFILES.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#0A1A2F]/70 block">
                  Your Local Host
                </span>
                <h3 className="font-bold text-lg text-[#0A1A2F] leading-tight">
                  {AVATAR_PROFILES.name}
                </h3>
                <span className="text-xs font-serif italic text-[#0A1A2F]/80 block">
                  PWBC Safety Ambassador
                </span>
              </div>
            </div>

            <p className="text-[#0A1A2F] text-xs font-serif italic font-medium leading-relaxed mb-3">
              "{condition.avatarCommentary}"
            </p>

            {'speechSynthesis' in window && (
              <button
                onClick={handleVoicePlay}
                className="w-full py-2 px-3 rounded-full bg-[#0A1A2F] text-[#E5D3B3] hover:bg-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span>Mute Audio Greeting</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen to Host Voice</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#0A1A2F]/15 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold opacity-70">
            <span>{condition.lastUpdated}</span>
            <span>VHF Ch. 64</span>
          </div>
        </aside>

        {/* MAIN BRIEFING CONTENT */}
        <main className="w-full md:w-2/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          {/* SECTION 1: Daily Surf & Safety Snapshot */}
          <section className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/10">
              <div>
                <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest font-bold block">
                  Section 01 • Conditions Snapshot
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Sunset Beach & Bar Conditions
                </h3>
              </div>

              {/* Bar Warning Badge */}
              <button
                onClick={onOpenMarineReport}
                className="bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider">
                  Bar Warning: Active
                </span>
              </button>
            </div>

            {/* Metric Displays (Editorial Style) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex flex-col">
                <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1">
                  Swell Height
                </span>
                <div className="text-xl sm:text-3xl font-serif italic font-bold text-white leading-tight">
                  {condition.swellHeight.split(' ')[0]}
                  <span className="text-xs sm:text-sm uppercase not-italic font-sans opacity-60 ml-1">
                    {condition.swellHeight.split(' ')[1] || 'm'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {condition.swellDirection}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1">
                  Offshore Wind
                </span>
                <div className="text-xl sm:text-3xl font-serif italic font-bold text-white leading-tight">
                  {condition.windSpeed.split(' ')[0]}
                  <span className="text-xs sm:text-sm uppercase not-italic font-sans opacity-60 ml-1">
                    kts
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {condition.windDirection}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-1">
                  High Tide
                </span>
                <div className="text-xl sm:text-3xl font-serif italic font-bold text-white leading-tight">
                  11:15
                  <span className="text-xs sm:text-sm uppercase not-italic font-sans opacity-60 ml-1">
                    am
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  2.8m Rising
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <p className="line-clamp-2 text-slate-300 italic">
                {condition.barDescription}
              </p>
              <button
                onClick={onOpenMarineReport}
                className="shrink-0 ml-3 text-[#E5D3B3] hover:underline font-bold uppercase text-[11px] flex items-center gap-1"
              >
                <span>Full Marine Report</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* SECTION 2: Channel Video Spotlight */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest font-bold">
                Section 02 • Channel Spotlight
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {featuredVideo.duration} • {featuredVideo.category}
              </span>
            </div>

            <div
              onClick={() => onWatchVideo(featuredVideo)}
              className="relative h-36 sm:h-44 bg-white/5 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
            >
              <img
                src={featuredVideo.thumbnailUrl}
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/40 to-transparent" />

              {/* Play Overlay Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#E5D3B3] text-[#0A1A2F] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-[#0A1A2F] ml-0.5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest font-bold mb-0.5 block">
                    Latest Video Release
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight line-clamp-1">
                    {featuredVideo.title}
                  </h4>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatchVideo(featuredVideo);
                  }}
                  className="hidden sm:flex bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 3: Sponsor & Advertising Space */}
          <section className="space-y-3">
            <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest font-bold block">
              Section 03 • Local Community Partner
            </span>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Active Sponsor Card */}
              <div className="flex-1 bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[#E5D3B3] text-[10px] uppercase tracking-widest mb-0.5 block font-bold">
                    {featuredSponsor.tier} Partner
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {featuredSponsor.name}
                  </h4>
                  <p className="text-xs text-slate-300 italic line-clamp-1">
                    {featuredSponsor.discountPerk || featuredSponsor.tagline}
                  </p>
                </div>
                <a
                  href={featuredSponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ml-3 transition-colors"
                >
                  Visit
                </a>
              </div>

              {/* Partner CTA Box */}
              <button
                onClick={onOpenPartnerInquiry}
                className="sm:w-44 bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl p-4 flex flex-col justify-center items-center text-center group transition-colors"
              >
                <div className="w-7 h-7 border border-dashed border-[#E5D3B3] rounded-full mb-1 flex items-center justify-center text-[#E5D3B3] group-hover:scale-110 transition-transform">
                  <span className="text-base leading-none font-bold">+</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#E5D3B3]">
                  Partner With PWBC
                </span>
                <span className="text-[9px] text-slate-400">Advertise Here</span>
              </button>
            </div>
          </section>

          {/* BOTTOM CONTROLS & DISMISS */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-[#E5D3B3] focus:ring-[#E5D3B3]"
              />
              <span>Don't show this briefing again today</span>
            </label>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDismiss}
                className="px-5 py-2 rounded-full bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
              >
                Close & Enter Site
              </button>
            </div>
          </div>

        </main>

        {/* Top Floating Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#0A1A2F]/80 hover:bg-[#0A1A2F] border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          title="Close Briefing Modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
