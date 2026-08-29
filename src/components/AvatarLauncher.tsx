import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, X } from 'lucide-react';
import { AVATAR_PROFILES } from '../data/mockData';

interface AvatarLauncherProps {
  onOpenBriefing: () => void;
  speechBubbleText?: string;
}

export const AvatarLauncher: React.FC<AvatarLauncherProps> = ({
  onOpenBriefing,
  speechBubbleText = "Kia ora! Check today's 2.2m swell at the Bar!",
}) => {
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Play audio greeting using browser Web Speech API
  const handleSpeechToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToSay = "Kia ora! Mana here from Port Waikato Boardriders. Check today's surf conditions and bar safety update!";
        const utterance = new SpeechSynthesisUtterance(textToSay);
        utterance.rate = 1.0;
        utterance.pitch = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end group">
      {/* Dynamic Editorial Speech Bubble Indicator */}
      {bubbleVisible && (
        <div className="mb-3 max-w-xs bg-[#E5D3B3] text-[#0A1A2F] p-4 rounded-2xl rounded-br-none border-2 border-[#0A1A2F] shadow-2xl animate-bounce-short relative group-hover:scale-[1.02] transition-transform">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0A1A2F]/70">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Mana • Your Local Host</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBubbleVisible(false);
              }}
              className="text-[#0A1A2F]/60 hover:text-[#0A1A2F] p-0.5 rounded-full hover:bg-black/5 transition-colors"
              title="Dismiss note"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs font-serif italic text-[#0A1A2F] font-semibold leading-snug">
            "{speechBubbleText}"
          </p>

          <div className="mt-3 pt-2 border-t border-[#0A1A2F]/15 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <button
              onClick={onOpenBriefing}
              className="text-[#0A1A2F] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#0A1A2F]" />
              <span>Daily Session</span>
            </button>

            {'speechSynthesis' in window && (
              <button
                onClick={handleSpeechToggle}
                className="text-[#0A1A2F]/70 hover:text-[#0A1A2F] transition-colors flex items-center gap-1"
                title="Voice greeting"
              >
                {isSpeaking ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                <span>{isSpeaking ? 'Mute' : 'Listen'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Avatar Trigger Button in Editorial Style */}
      <button
        onClick={onOpenBriefing}
        className="relative group/btn flex items-center justify-center p-1 rounded-full bg-[#0A1A2F] border-2 border-[#E5D3B3] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Open Port Waikato Surf Host Briefing"
      >
        {/* Animated Outer Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#E5D3B3] opacity-30 blur group-hover/btn:opacity-60 transition duration-300" />

        {/* Avatar Image Circle */}
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#0A1A2F] bg-[#1E3A5F]">
          <img
            src={AVATAR_PROFILES.avatarImage}
            alt={AVATAR_PROFILES.name}
            className="w-full h-full object-cover object-center group-hover/btn:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          {/* Live Status Badge Dot */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0A1A2F] rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </span>
        </div>

        {/* Hover Label Overlay */}
        <div className="absolute right-full mr-3 hidden sm:group-hover/btn:flex items-center gap-1.5 bg-[#E5D3B3] text-[#0A1A2F] px-3.5 py-1.5 rounded-full border border-[#0A1A2F] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#0A1A2F]" />
          <span>The Daily Session</span>
        </div>
      </button>
    </div>
  );
};
