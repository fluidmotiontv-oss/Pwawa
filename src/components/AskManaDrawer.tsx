import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Volume2, VolumeX, MessageSquare, Bot, User, RefreshCw, AlertCircle } from 'lucide-react';
import { AIChatMessage } from '../types';
import { AVATAR_PROFILES } from '../data/mockData';

interface AskManaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskManaDrawer: React.FC<AskManaDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'mana',
      text: "Kia ora! I'm Mana, your digital surf host for Port Waikato. Ask me about today's Sunset Beach swell, Waikato Bar crossing rules, beginner spots, or local club comps!",
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/avatar-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      });

      const data = await response.json();
      const botReply = data.reply || "Kia ora! Today's swell is 2.2m SW at Sunset Beach with offshore ESE winds. Remember to check bar conditions before heading out!";

      const manaMsg: AIChatMessage = {
        id: `mana-${Date.now()}`,
        sender: 'mana',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, manaMsg]);
    } catch (err) {
      console.error('Error getting avatar AI response:', err);
      const fallbackMsg: AIChatMessage = {
        id: `mana-err-${Date.now()}`,
        sender: 'mana',
        text: "Kia ora! Sunset Beach is pumping with a 2.2m SW swell today. Keep an eye out for the ebb tide sweep at the bar!",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    "Is the Bar safe to cross today?",
    "Where is the best spot for beginners?",
    "When is the next PWBC surf comp?",
    "How do I become a financial member?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#0A1A2F] text-white h-full border-l border-[#E5D3B3]/30 shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#132A4A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#E5D3B3] p-0.5 border border-white overflow-hidden">
              <img
                src={AVATAR_PROFILES.avatarImage}
                alt="Mana Avatar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">Mana Avatar</h3>
                <span className="text-[9px] font-bold bg-[#E5D3B3] text-[#0A1A2F] px-1.5 py-0.2 rounded uppercase">
                  AI Surf Host
                </span>
              </div>
              <p className="text-[11px] text-[#E5D3B3] font-serif italic">
                Port Waikato Boardriders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                <span>{msg.sender === 'user' ? 'You' : 'Mana (Local Host)'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-[#E5D3B3] text-[#0A1A2F] font-medium rounded-bl-none shadow-md border border-white/40'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#E5D3B3] p-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#E5D3B3]" />
              <span>Mana is checking the ocean report...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 border-t border-white/10 bg-white/5">
          <span className="text-[10px] uppercase font-bold text-[#E5D3B3] tracking-widest block mb-2">
            Ask Mana Quick Questions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] bg-white/10 hover:bg-[#E5D3B3] hover:text-[#0A1A2F] text-slate-200 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#132A4A] border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Mana about surf, bar safety, tide..."
            className="flex-1 bg-white/10 text-white text-xs rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E5D3B3] placeholder-slate-400 border border-white/10"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] hover:bg-white disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
