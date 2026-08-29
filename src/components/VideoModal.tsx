import React from 'react';
import { X, Play, Share2, Eye, Calendar, User } from 'lucide-react';
import { VideoUpdate } from '../types';

interface VideoModalProps {
  video: VideoUpdate | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1A2F]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0A1A2F] text-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#132A4A] p-4 px-6 border-b border-white/10 flex items-center justify-between">
          <span className="text-[#E5D3B3] text-[10px] uppercase font-bold tracking-widest">
            Channel Video Spotlight • {video.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`${video.videoUrl}?autoplay=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {video.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#E5D3B3]" />
                  <span>{video.surfer}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#E5D3B3]" />
                  <span>{video.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#E5D3B3]" />
                  <span>{video.views.toLocaleString()} Views</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-[#E5D3B3] flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Clip</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-serif italic border-t border-white/10 pt-3">
            {video.description}
          </p>
        </div>

      </div>
    </div>
  );
};
