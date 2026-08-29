import React from 'react';
import { AlertTriangle, ShieldAlert, Waves, Compass, Wind, Thermometer, PhoneCall, Radio, X, CheckCircle2 } from 'lucide-react';
import { SurfCondition } from '../types';

interface MarineReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  conditions: SurfCondition[];
}

export const MarineReportModal: React.FC<MarineReportModalProps> = ({
  isOpen,
  onClose,
  conditions,
}) => {
  if (!isOpen) return null;

  const mainCondition = conditions[0] || {
    spotName: 'Port Waikato Bar & Sunset Beach',
    swellHeight: '2.2 m',
    swellDirection: 'SW 215°',
    windSpeed: '10 knots',
    windDirection: 'Offshore ESE',
    waterTemp: '15.8°C',
    tideCurrent: 'Rising Tide (2.8m at 11:15 AM)',
    tideNext: 'High Tide 11:15 AM | Low Tide 5:30 PM',
    barCondition: 'MODERATE',
    barDescription: 'Clean groundswell. River mouth bar crossing requires extreme caution during outgoing tide.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1A2F]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0A1A2F] text-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#132A4A] p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[#E5D3B3] text-[10px] font-serif italic uppercase tracking-widest block">
                Official PWBC Marine Briefing
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                Port Waikato Bar & Ocean Safety Report
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Active Bar Status Alert Card */}
          <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                  CURRENT BAR HAZARD LEVEL: {mainCondition.barCondition}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {mainCondition.barDescription}
              </p>
            </div>

            <div className="shrink-0 bg-red-500/20 text-red-300 text-xs font-bold px-4 py-2 rounded-xl border border-red-500/30">
              VHF Channel 64
            </div>
          </div>

          {/* Marine Metrics Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5D3B3] mb-3">
              Live Marine Telemetry & Weather Vectors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Waves className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Swell Height</span>
                </div>
                <div className="text-2xl font-serif italic font-bold text-white">
                  {mainCondition.swellHeight}
                </div>
                <span className="text-[10px] text-slate-400">{mainCondition.swellDirection}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Wind className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Wind Speed</span>
                </div>
                <div className="text-2xl font-serif italic font-bold text-white">
                  {mainCondition.windSpeed}
                </div>
                <span className="text-[10px] text-slate-400">{mainCondition.windDirection}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Compass className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Tide Current</span>
                </div>
                <div className="text-lg font-serif italic font-bold text-white leading-tight mt-1">
                  High 11:15 AM
                </div>
                <span className="text-[10px] text-slate-400">2.8m High Slack</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Thermometer className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Water Temp</span>
                </div>
                <div className="text-2xl font-serif italic font-bold text-white">
                  {mainCondition.waterTemp}
                </div>
                <span className="text-[10px] text-slate-400">4/3mm Wetsuit Rec.</span>
              </div>
            </div>
          </div>

          {/* Bar Crossing Rules & Safety Checklist */}
          <div className="bg-[#E5D3B3] text-[#0A1A2F] p-6 rounded-2xl border-2 border-[#0A1A2F] space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#0A1A2F]" />
              <h4 className="font-extrabold uppercase tracking-tight text-base">
                Mandatory Port Waikato Bar Safety Protocols
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium">
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span><strong>Check Tide & Stream:</strong> Never attempt bar crossings on a strong outgoing ebb tide.</span>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span><strong>Coastguard Log:</strong> Log your bar transit with Coastguard PW on VHF Ch 64 or *500 on mobile.</span>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span><strong>Lifejacket Rules:</strong> Approved lifejackets MUST be worn by all vessel occupants when crossing the bar.</span>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span><strong>Surfer Buddy System:</strong> Boardriders surfing near the river mouth channel must never surf alone.</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <Radio className="w-6 h-6 text-[#E5D3B3]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E5D3B3] block">Coastguard Port Waikato</span>
                <span className="text-sm font-bold text-white">VHF Ch. 64 • Mobile *500</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <PhoneCall className="w-6 h-6 text-[#E5D3B3]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E5D3B3] block">Sunset Beach Lifesaving</span>
                <span className="text-sm font-bold text-white">Emergency 111 (Surf Rescue)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#132A4A] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#E5D3B3] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
          >
            I Understand Bar Safety
          </button>
        </div>

      </div>
    </div>
  );
};
