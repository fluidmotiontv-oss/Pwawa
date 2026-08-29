import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerInquiryModal: React.FC<PartnerInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    partnershipType: 'Gold Community Sponsor',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/sponsor-inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccessResponse(data.message);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0A1A2F] text-white rounded-3xl border-2 border-[#E5D3B3]/40 shadow-2xl p-6 sm:p-8 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E5D3B3] text-[#0A1A2F] flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5D3B3] block">
              Section 3: Sponsor & Advertising
            </span>
            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
              Partner with PWBC / Advertise Here
            </h2>
          </div>
        </div>

        {successResponse ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {successResponse}
            </p>
            <button
              onClick={() => {
                setSuccessResponse(null);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:bg-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#E5D3B3] uppercase font-bold text-[10px] tracking-widest mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Wiremu Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E5D3B3]"
                />
              </div>

              <div>
                <label className="block text-[#E5D3B3] uppercase font-bold text-[10px] tracking-widest mb-1">
                  Business / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Sunset Beach Cafe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E5D3B3]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#E5D3B3] uppercase font-bold text-[10px] tracking-widest mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@business.co.nz"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E5D3B3]"
                />
              </div>

              <div>
                <label className="block text-[#E5D3B3] uppercase font-bold text-[10px] tracking-widest mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="021 555 1234"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E5D3B3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#E5D3B3] uppercase font-bold text-[10px] tracking-widest mb-1">
                Partnership Package Level
              </label>
              <select
                value={formData.partnershipType}
                onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                className="w-full bg-[#132A4A] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E5D3B3]"
              >
                <option value="Principal Sponsor">Principal Club Sponsor (Banner + Video Slot)</option>
                <option value="Gold Community Sponsor">Gold Community Partner (Briefing Modal)</option>
                <option value="Event / Grom Comp Sponsor">Grom Competition Sponsor</option>
                <option value="Local Supporter">Local Business Supporter</option>
              </select>
            </div>

            <div>
              <label className="block text-[#E5D3B3] uppercase font-bold text-[10px] tracking-widest mb-1">
                Message or Special Perk for Members
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us how you'd like to support PWBC or offer member discounts..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E5D3B3]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Support local youth & surf culture in Port Waikato
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-[#E5D3B3] text-[#0A1A2F] font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
