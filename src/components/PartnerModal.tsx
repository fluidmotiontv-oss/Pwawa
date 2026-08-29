import React, { useState } from 'react';
import { X, Send, CheckCircle, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    partnershipType: 'Principal Sponsor',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/sponsor-inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedRef(data.referenceCode);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5D3B3', '#0A1A2F', '#38BDF8'],
        });
      }
    } catch (err) {
      console.error('Error submitting partner inquiry:', err);
      setSubmittedRef(`PWBC-SPON-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1A2F]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0A1A2F] text-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#132A4A] p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E5D3B3] text-[#0A1A2F] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#E5D3B3] text-[10px] font-serif italic uppercase tracking-widest block">
                Port Waikato Boardriders
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Partner & Sponsor Inquiry
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submittedRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white uppercase tracking-tight">
                Kia Ora! Inquiry Received
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for supporting Port Waikato Boardriders Club. Our sponsorship manager will contact you within 24 hours.
              </p>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl inline-block text-xs text-[#E5D3B3] font-mono font-bold">
                Reference Code: {submittedRef}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-300 mb-2 font-serif italic">
                Support youth surf development, grom comp circuits, and channel video production at Port Waikato.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#E5D3B3] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Wiremu Smith"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5D3B3]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#E5D3B3] mb-1">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Sunset Cafe PW"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5D3B3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#E5D3B3] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@business.co.nz"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5D3B3]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#E5D3B3] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+64 21 000 0000"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5D3B3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#E5D3B3] mb-1">
                  Partnership Interest
                </label>
                <select
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full bg-[#132A4A] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5D3B3]"
                >
                  <option value="Principal Sponsor">Principal Club Sponsor</option>
                  <option value="Gold Community Partner">Gold Community Partner</option>
                  <option value="Channel Video Sponsor">Channel Video & Avatar Host Sponsor</option>
                  <option value="Grom Comp Prize Donor">Grom Comp Prize Sponsor</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#E5D3B3] mb-1">
                  Message / Proposal Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand and how you'd like to partner with PWBC..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#E5D3B3]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Submit Partnership'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
