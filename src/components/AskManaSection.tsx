import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Volume2, VolumeX, ShieldCheck, RefreshCw, Bot } from 'lucide-react';
import { AIChatMessage } from '../types';
import { AVATAR_PROFILES } from '../data/mockData';

interface AskManaSectionProps {
  onOpenMarineReport: () => void;
  onOpenPartnerInquiry: () => void;
}

export const AskManaSection: React.FC<AskManaSectionProps> = ({
  onOpenMarineReport,
  onOpenPartnerInquiry,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'm-1',
      sender: 'mana',
      text: "Kia ora! Mana here, your local host at Port Waikato Boardriders. Ask me anything about today's 2.2m SW swell, river mouth bar transit safety, tide times, or joining the club!",
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const presetQuestions = [
    "Is the River Mouth Bar safe right now?",
    "Best tide to surf Sunset Beach today?",
    "What gear is recommended for Port Waikato winter swells?",
    "How do I become a financial club member?",
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/avatar-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: textToSend,
          userLevel: 'Intermediate',
          spot: 'Port Waikato Bar',
        }),
      });

      const data = await response.json();
      const manaReplyText = data.reply || "Kia ora! Sunset Beach is pumping with 2.2m SW swell today. Keep safe near the bar!";

      const manaMsg: AIChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'mana',
        text: manaReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, manaMsg]);
    } catch (err) {
      console.error('Error asking Mana:', err);
      const fallbackMsg: AIChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'mana',
        text: "Kia ora! Today Sunset Beach has solid 2.2m clean waves with ESE offshore winds. Watch out for the outgoing river mouth current!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeakingId === msgId) {
        window.speechSynthesis.cancel();
        setIsSpeakingId(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 0.95;
        utterance.onend = () => setIsSpeakingId(null);
        utterance.onerror = () => setIsSpeakingId(null);
        window.speechSynthesis.speak(utterance);
        setIsSpeakingId(msgId);
      }
    }
  };

  return (
    <section id="spokesman" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1A2F]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-[#E5D3B3] text-xs font-serif italic uppercase tracking-widest block mb-2">
            Local Digital Host & Spokesman
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-white">
            Ask Mana <span className="font-serif italic lowercase font-normal text-[#E5D3B3]">the</span> Surf Host
          </h2>
          <p className="text-slate-300 text-sm mt-3">
            Real-time Kiwi surf guidance, river mouth safety reads, and club info powered by our AI Avatar Host.
          </p>
        </div>

        {/* Chat Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Avatar Profile & Safety Card */}
          <div className="lg:col-span-4 bg-[#E5D3B3] text-[#0A1A2F] p-6 sm:p-8 rounded-3xl border-2 border-[#0A1A2F] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-[#0A1A2F] rounded-full overflow-hidden border-2 border-[#0A1A2F] shadow-md shrink-0">
                  <img
                    src={AVATAR_PROFILES.avatarImage}
                    alt={AVATAR_PROFILES.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#0A1A2F]/70 block">
                    Digital Spokesman
                  </span>
                  <h3 className="text-2xl font-bold leading-tight">
                    {AVATAR_PROFILES.name}
                  </h3>
                  <p className="text-xs font-serif italic font-medium text-[#0A1A2F]/80">
                    PWBC Local Host & Surf Guide
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A1A2F]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Bar Safety Knowledge Engine</span>
                </div>
                <p className="text-xs text-[#0A1A2F]/80 leading-relaxed font-serif italic">
                  "I monitor marine buoy data, wind direction vectors, and Waikato River ebb tide rates to give you authentic West Coast advice."
                </p>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <button
                  onClick={onOpenMarineReport}
                  className="w-full py-2.5 px-4 rounded-full bg-[#0A1A2F] text-[#E5D3B3] hover:bg-black uppercase tracking-wider text-[11px] font-bold flex items-center justify-between transition-colors"
                >
                  <span>Open Full Bar Report</span>
                  <span>→</span>
                </button>
                <button
                  onClick={onOpenPartnerInquiry}
                  className="w-full py-2.5 px-4 rounded-full bg-white/40 hover:bg-white/70 text-[#0A1A2F] border border-[#0A1A2F]/30 uppercase tracking-wider text-[10px] font-bold flex items-center justify-between transition-colors"
                >
                  <span>Sponsor Mana's Updates</span>
                  <span>+</span>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#0A1A2F]/15 text-[10px] font-bold uppercase tracking-widest text-[#0A1A2F]/60 flex items-center justify-between">
              <span>Port Waikato, NZ</span>
              <span>VHF 64 Coastguard</span>
            </div>
          </div>

          {/* Right Column: Interactive Chat Stream */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col h-[520px]">
            
            {/* Preset Query Chips */}
            <div className="mb-4 pb-3 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-[#E5D3B3] font-bold block mb-2">
                Quick Prompts for Mana:
              </span>
              <div className="flex flex-wrap gap-2">
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-xs bg-white/5 hover:bg-[#E5D3B3] hover:text-[#0A1A2F] text-slate-200 py-1.5 px-3 rounded-full border border-white/15 transition-all text-left truncate max-w-xs"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {msg.sender === 'mana' ? (
                    <div className="w-9 h-9 rounded-full bg-[#E5D3B3] text-[#0A1A2F] flex items-center justify-center shrink-0 overflow-hidden border border-white/20">
                      <img
                        src={AVATAR_PROFILES.avatarImage}
                        alt="Mana"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/10 text-[#E5D3B3] flex items-center justify-center font-bold text-xs shrink-0 border border-white/20">
                      YOU
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-4 rounded-2xl ${
                      msg.sender === 'mana'
                        ? 'bg-[#132A4A] text-white border border-white/10 rounded-tl-none'
                        : 'bg-[#E5D3B3] text-[#0A1A2F] font-medium rounded-tr-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          msg.sender === 'mana' ? 'text-[#E5D3B3]' : 'text-[#0A1A2F]/70'
                        }`}
                      >
                        {msg.sender === 'mana' ? 'Mana • Host Avatar' : 'You'}
                      </span>
                      <span className="text-[9px] opacity-60">{msg.timestamp}</span>
                    </div>

                    <p className={`text-xs leading-relaxed ${msg.sender === 'mana' ? 'font-serif italic' : ''}`}>
                      {msg.text}
                    </p>

                    {'speechSynthesis' in window && msg.sender === 'mana' && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => handleSpeakText(msg.id, msg.text)}
                          className="text-[10px] text-[#E5D3B3] hover:underline flex items-center gap-1 font-bold"
                        >
                          {isSpeakingId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-red-400 animate-pulse" />
                              <span>Stop Speech</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>Listen Voice</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E5D3B3] flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-[#0A1A2F] animate-spin" />
                  </div>
                  <div className="bg-[#132A4A] p-3 rounded-2xl border border-white/10 text-xs text-slate-300 italic">
                    Mana is checking today's marine forecast...
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 pt-2 border-t border-white/10"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Mana about swell, bar safety, tides, gear, or club rules..."
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E5D3B3]"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="bg-[#E5D3B3] hover:bg-white text-[#0A1A2F] font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
